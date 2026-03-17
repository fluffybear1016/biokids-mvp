// Analytics wrapper — PostHog (primary) + Firebase Analytics (backup)
// Tracks key acquisition metrics: MAU, DAU, retention, engagement
// PostHog provides: events, session replays, feature flags, funnels
// Server-side tracking via posthog-node ensures ad blockers can't kill signups

import posthog from 'posthog-js';
import { logEvent, setUserId, setUserProperties } from 'firebase/analytics';
import { getFirebaseAnalytics } from './firebase';

// PostHog initialization (client-side only)
let posthogInitialized = false;

export function initPostHog() {
  if (typeof window === 'undefined') return;
  if (posthogInitialized) return;

  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';

  if (!key) {
    console.warn('[analytics] NEXT_PUBLIC_POSTHOG_KEY not set — analytics disabled');
    return;
  }

  posthog.init(key, {
    api_host: host,
    person_profiles: 'identified_only',
    capture_pageview: true,           // Auto-track page views (replaces Mixpanel track_pageview)
    capture_pageleave: true,          // Track when users leave pages
    autocapture: true,                // Auto-capture clicks, form submits, etc.
    session_recording: {
      maskAllInputs: true,            // Privacy — mask form inputs in replays
      maskTextSelector: '[data-mask]', // Mask elements with data-mask attribute
    },
    persistence: 'localStorage+cookie', // Persist identity across sessions
    loaded: (ph) => {
      // In development, enable debug mode
      if (process.env.NODE_ENV === 'development') {
        ph.debug();
      }
    },
  });

  posthogInitialized = true;
}

// Safe PostHog accessor — returns null if not initialized or SSR
function ph() {
  if (typeof window === 'undefined') return null;
  if (!posthogInitialized) return null;
  return posthog;
}

// Firebase helper — fire-and-forget event logging (backup analytics)
async function fb(eventName: string, params?: Record<string, unknown>) {
  try {
    const a = await getFirebaseAnalytics();
    if (a) logEvent(a, eventName, params as Record<string, string>);
  } catch {
    // Silently fail — Firebase is secondary analytics
  }
}

async function fbSetUser(userId: string, properties?: Record<string, string>) {
  try {
    const a = await getFirebaseAnalytics();
    if (a) {
      setUserId(a, userId);
      if (properties) setUserProperties(a, properties);
    }
  } catch {
    // Silently fail
  }
}

// Core events for acquisition metrics
// API surface is identical to the old Mixpanel wrapper so all call sites stay the same
export const analytics = {
  // Identify user (call after login/signup)
  // PostHog identify is synchronous — no CDN race condition like Mixpanel had
  async identify(userId: string, email?: string) {
    const p = ph();
    if (p) {
      p.identify(userId, {
        email,
        first_seen: new Date().toISOString(),
      });
    }
    // Firebase — also async, no race condition
    fbSetUser(userId, email ? { email } : undefined);
  },

  // Track signup
  async signup(method: 'email' | 'google' | 'apple', email: string) {
    const p = ph();
    if (p) {
      p.capture('Signup', {
        method,
        email_domain: email.split('@')[1],
      });
      p.setPersonProperties({
        signup_method: method,
        signup_date: new Date().toISOString(),
      });
    }
    // Firebase
    fb('sign_up', { method, email_domain: email.split('@')[1] });
  },

  // Track login
  async login(method: 'email' | 'google') {
    const p = ph();
    if (p) {
      p.capture('Login', { method });
    }
    fb('login', { method });
  },

  // Track onboarding step completion
  onboardingStep(step: number, stepName: string) {
    ph()?.capture('Onboarding Step', { step, step_name: stepName });
    fb('onboarding_step', { step: String(step), step_name: stepName });
  },

  // Track onboarding complete
  onboardingComplete() {
    ph()?.capture('Onboarding Complete');
    ph()?.setPersonProperties({
      onboarding_complete: true,
      onboarding_date: new Date().toISOString(),
    });
    fb('tutorial_complete');
  },

  // Track child info (for segmentation)
  setChildInfo(data: { age_months?: number; gender?: string; goal?: string }) {
    ph()?.setPersonProperties({
      child_age_months: data.age_months,
      child_gender: data.gender,
      growth_goal: data.goal,
    });
    // Register as super-properties (sent with every future event)
    if (data.gender) ph()?.register({ child_gender: data.gender });
    if (data.age_months) ph()?.register({ child_age_months: data.age_months });
    // Firebase user properties
    fbSetUser('', {
      child_age_months: String(data.age_months ?? ''),
      child_gender: data.gender ?? '',
      growth_goal: data.goal ?? '',
    });
  },

  // Track checklist engagement (core DAU driver)
  checklistToggle(itemId: string, completed: boolean, period: string) {
    ph()?.capture('Checklist Toggle', { item_id: itemId, completed, period });
    fb('checklist_toggle', { item_id: itemId, completed: String(completed), period });
  },

  // Track daily protocol completion
  dailyProtocolProgress(completedCount: number, totalCount: number) {
    const pct = Math.round((completedCount / totalCount) * 100);
    ph()?.capture('Daily Progress', { completed: completedCount, total: totalCount, percent: pct });
    ph()?.setPersonProperties({
      last_active: new Date().toISOString(),
      last_progress_pct: pct,
    });
    fb('daily_progress', { completed: String(completedCount), total: String(totalCount), percent: String(pct) });
  },

  // Track citation tap (science engagement)
  citationTap(citationId: string) {
    ph()?.capture('Citation Tap', { citation_id: citationId });
    fb('select_content', { content_type: 'citation', item_id: citationId });
  },

  // Track newsletter subscription
  newsletterSubscribe(source: string) {
    ph()?.capture('Newsletter Subscribe', { source });
    ph()?.setPersonProperties({ newsletter_subscribed: true });
    fb('newsletter_subscribe', { source });
  },

  // Track page view (explicit — PostHog also auto-tracks)
  pageView(page: string) {
    ph()?.capture('$pageview', { page });
    fb('page_view', { page_title: page });
  },

  // Track session start (for DAU/MAU calculation)
  sessionStart() {
    ph()?.capture('Session Start');
    ph()?.setPersonProperties({
      last_session: new Date().toISOString(),
    });
    fb('session_start');
  },
};
