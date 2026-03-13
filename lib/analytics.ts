// Analytics wrapper for Mixpanel
// Tracks key acquisition metrics: MAU, DAU, retention, engagement

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

// Core events for acquisition metrics
export const analytics = {
  // Identify user (call after login/signup)
  identify(userId: string, email?: string) {
    const m = mp();
    if (!m) return;
    m.identify(userId);
    if (email) {
      m.people.set({ $email: email });
    }
    m.people.set_once({ 'First Seen': new Date().toISOString() });
  },

  // Track signup
  signup(method: 'email' | 'google' | 'apple', email: string) {
    mp()?.track('Signup', { method, email_domain: email.split('@')[1] });
    mp()?.people.set({ 'Signup Method': method, 'Signup Date': new Date().toISOString() });
  },

  // Track login
  login(method: 'email' | 'google') {
    mp()?.track('Login', { method });
  },

  // Track onboarding step completion
  onboardingStep(step: number, stepName: string) {
    mp()?.track('Onboarding Step', { step, step_name: stepName });
  },

  // Track onboarding complete
  onboardingComplete() {
    mp()?.track('Onboarding Complete');
    mp()?.people.set({ 'Onboarding Complete': true, 'Onboarding Date': new Date().toISOString() });
  },

  // Track child info (for segmentation)
  setChildInfo(data: { age_months?: number; gender?: string; goal?: string }) {
    mp()?.people.set({
      'Child Age Months': data.age_months,
      'Child Gender': data.gender,
      'Growth Goal': data.goal,
    });
    mp()?.register({ child_gender: data.gender, child_age_months: data.age_months });
  },

  // Track checklist engagement (core DAU driver)
  checklistToggle(itemId: string, completed: boolean, period: string) {
    mp()?.track('Checklist Toggle', { item_id: itemId, completed, period });
    if (completed) {
      mp()?.people.increment('Total Items Completed');
    }
  },

  // Track daily protocol completion
  dailyProtocolProgress(completedCount: number, totalCount: number) {
    const pct = Math.round((completedCount / totalCount) * 100);
    mp()?.track('Daily Progress', { completed: completedCount, total: totalCount, percent: pct });
    mp()?.people.set({ 'Last Active': new Date().toISOString(), 'Last Progress Pct': pct });
  },

  // Track citation tap (science engagement)
  citationTap(citationId: string) {
    mp()?.track('Citation Tap', { citation_id: citationId });
  },

  // Track newsletter subscription
  newsletterSubscribe(source: string) {
    mp()?.track('Newsletter Subscribe', { source });
    mp()?.people.set({ 'Newsletter Subscribed': true });
  },

  // Track page view
  pageView(page: string) {
    mp()?.track('Page View', { page });
  },

  // Track session start (for DAU/MAU calculation)
  sessionStart() {
    mp()?.track('Session Start');
    mp()?.people.set({ 'Last Session': new Date().toISOString() });
    mp()?.people.increment('Total Sessions');
  },
};
