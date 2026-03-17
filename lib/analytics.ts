// Analytics wrapper — dual-sends to Mixpanel + Firebase Analytics
// Tracks key acquisition metrics: MAU, DAU, retention, engagement

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

function mp() {
  if (typeof window !== 'undefined' && window.mixpanel) {
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
  identify(userId: string, email?: string) {
    const m = mp();
    if (m) {
      m.identify(userId);
      if (email) {
        m.people.set({ $email: email });
      }
      m.people.set_once({ 'First Seen': new Date().toISOString() });
    }
    // Firebase
    fbSetUser(userId, email ? { email } : undefined);
  },

  // Track signup
  signup(method: 'email' | 'google' | 'apple', email: string) {
    mp()?.track('Signup', { method, email_domain: email.split('@')[1] });
    mp()?.people.set({ 'Signup Method': method, 'Signup Date': new Date().toISOString() });
    // Firebase
    fb('sign_up', { method, email_domain: email.split('@')[1] });
  },

  // Track login
  login(method: 'email' | 'google') {
    mp()?.track('Login', { method });
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
