// Analytics wrapper — dual-sends to Mixpanel + Firebase Analytics
// Tracks key acquisition metrics: MAU, DAU, retention, engagement
// Includes retry mechanism to handle CDN load race condition

import { logEvent, setUserId, setUserProperties } from 'firebase/analytics';
import { getFirebaseAnalytics } from './firebase';

declare global {
  interface Window {
    mixpanel?: {
      track: (event: string, properties?: Record<string, unknown>) => void;
      identify: (id: string) => void;
      people: {
        set: (properties: Record<string, unknown>) => void;
        set_once: (properties: Record<string, unknown>) => void;
        increment: (property: string, value?: number) => void;
      };
      register: (properties: Record<string, unknown>) => void;
    };
  }
}

// Waits for Mixpanel CDN to load, polling every 100ms for up to 5 seconds.
// This fixes the critical race condition where analytics.identify() fires
// before the Mixpanel script tag in layout.tsx has finished loading.
function waitForMixpanel(timeoutMs = 5000): Promise<Window['mixpanel'] | null> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(null);
      return;
    }

    // Already loaded — return immediately
    if (window.mixpanel && typeof window.mixpanel.track === 'function') {
      resolve(window.mixpanel);
      return;
    }

    const interval = 100;
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += interval;
      if (window.mixpanel && typeof window.mixpanel.track === 'function') {
        clearInterval(timer);
        resolve(window.mixpanel);
      } else if (elapsed >= timeoutMs) {
        clearInterval(timer);
        console.warn('[analytics] Mixpanel CDN did not load within', timeoutMs, 'ms');
        resolve(null);
      }
    }, interval);
  });
}

// Synchronous check — use for non-critical, fire-and-forget events
function mp() {
  if (typeof window !== 'undefined' && window.mixpanel && typeof window.mixpanel.track === 'function') {
    return window.mixpanel;
  }
  return null;
}

// Firebase helper — fire-and-forget event logging
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
export const analytics = {
  // Identify user (call after login/signup)
  // CRITICAL: Uses waitForMixpanel() because this fires on OAuth redirect
  // before the CDN script has loaded. Without the wait, identify silently
  // fails and the user never gets an email attached in Mixpanel.
  async identify(userId: string, email?: string) {
    // Wait for Mixpanel CDN — this is the most important call to get right
    const m = await waitForMixpanel();
    if (m) {
      m.identify(userId);
      if (email) {
        m.people.set({ $email: email });
      }
      m.people.set_once({ 'First Seen': new Date().toISOString() });
    }
    // Firebase — also async, no race condition
    fbSetUser(userId, email ? { email } : undefined);
  },

  // Track signup — also uses wait since it fires right after identify on redirect
  async signup(method: 'email' | 'google' | 'apple', email: string) {
    const m = await waitForMixpanel();
    if (m) {
      m.track('Signup', { method, email_domain: email.split('@')[1] });
      m.people.set({ 'Signup Method': method, 'Signup Date': new Date().toISOString() });
    }
    // Firebase
    fb('sign_up', { method, email_domain: email.split('@')[1] });
  },

  // Track login — also uses wait since it fires right after auth
  async login(method: 'email' | 'google') {
    const m = await waitForMixpanel();
    if (m) {
      m.track('Login', { method });
    }
    fb('login', { method });
  },

  // Track onboarding step completion
  onboardingStep(step: number, stepName: string) {
    mp()?.track('Onboarding Step', { step, step_name: stepName });
    fb('onboarding_step', { step: String(step), step_name: stepName });
  },

  // Track onboarding complete
  onboardingComplete() {
    mp()?.track('Onboarding Complete');
    mp()?.people.set({ 'Onboarding Complete': true, 'Onboarding Date': new Date().toISOString() });
    fb('tutorial_complete');
  },

  // Track child info (for segmentation)
  setChildInfo(data: { age_months?: number; gender?: string; goal?: string }) {
    mp()?.people.set({
      'Child Age Months': data.age_months,
      'Child Gender': data.gender,
      'Growth Goal': data.goal,
    });
    mp()?.register({ child_gender: data.gender, child_age_months: data.age_months });
    // Firebase user properties
    fbSetUser('', {
      child_age_months: String(data.age_months ?? ''),
      child_gender: data.gender ?? '',
      growth_goal: data.goal ?? '',
    });
  },

  // Track checklist engagement (core DAU driver)
  checklistToggle(itemId: string, completed: boolean, period: string) {
    mp()?.track('Checklist Toggle', { item_id: itemId, completed, period });
    if (completed) {
      mp()?.people.increment('Total Items Completed');
    }
    fb('checklist_toggle', { item_id: itemId, completed: String(completed), period });
  },

  // Track daily protocol completion
  dailyProtocolProgress(completedCount: number, totalCount: number) {
    const pct = Math.round((completedCount / totalCount) * 100);
    mp()?.track('Daily Progress', { completed: completedCount, total: totalCount, percent: pct });
    mp()?.people.set({ 'Last Active': new Date().toISOString(), 'Last Progress Pct': pct });
    fb('daily_progress', { completed: String(completedCount), total: String(totalCount), percent: String(pct) });
  },

  // Track citation tap (science engagement)
  citationTap(citationId: string) {
    mp()?.track('Citation Tap', { citation_id: citationId });
    fb('select_content', { content_type: 'citation', item_id: citationId });
  },

  // Track newsletter subscription
  newsletterSubscribe(source: string) {
    mp()?.track('Newsletter Subscribe', { source });
    mp()?.people.set({ 'Newsletter Subscribed': true });
    fb('newsletter_subscribe', { source });
  },

  // Track page view
  pageView(page: string) {
    mp()?.track('Page View', { page });
    fb('page_view', { page_title: page });
  },

  // Track session start (for DAU/MAU calculation)
  sessionStart() {
    mp()?.track('Session Start');
    mp()?.people.set({ 'Last Session': new Date().toISOString() });
    mp()?.people.increment('Total Sessions');
    fb('session_start');
  },
};
