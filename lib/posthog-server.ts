// Server-side PostHog client for tracking events from API routes
// This ensures signups/logins are tracked even if the client-side script
// is blocked by ad blockers (the main reason Mixpanel was missing signups)

import { PostHog } from 'posthog-node';

let posthogClient: PostHog | null = null;

function getPostHogServer(): PostHog | null {
  if (posthogClient) return posthogClient;

  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';

  if (!key) {
    console.warn('[posthog-server] NEXT_PUBLIC_POSTHOG_KEY not set');
    return null;
  }

  posthogClient = new PostHog(key, { host });
  return posthogClient;
}

// Server-side event tracking — call from API routes
export const serverAnalytics = {
  // Track signup from the server (guaranteed to fire, no ad blocker issues)
  signup(userId: string, email: string, method: 'email' | 'google' | 'apple') {
    const ph = getPostHogServer();
    if (!ph) return;

    ph.identify({
      distinctId: userId,
      properties: {
        email,
        first_seen: new Date().toISOString(),
        signup_method: method,
        signup_date: new Date().toISOString(),
      },
    });

    ph.capture({
      distinctId: userId,
      event: 'Signup',
      properties: {
        method,
        email_domain: email.split('@')[1],
        source: 'server', // Distinguishes from client-side events
      },
    });
  },

  // Track login from the server
  login(userId: string, email: string, method: 'email' | 'google') {
    const ph = getPostHogServer();
    if (!ph) return;

    ph.identify({
      distinctId: userId,
      properties: {
        email,
        last_login: new Date().toISOString(),
      },
    });

    ph.capture({
      distinctId: userId,
      event: 'Login',
      properties: {
        method,
        source: 'server',
      },
    });
  },

  // Track profile creation (new user)
  profileCreated(userId: string, email: string) {
    const ph = getPostHogServer();
    if (!ph) return;

    ph.capture({
      distinctId: userId,
      event: 'Profile Created',
      properties: {
        email_domain: email.split('@')[1],
        source: 'server',
      },
    });
  },

  // Flush events — call at the end of API routes to ensure events are sent
  async flush() {
    const ph = getPostHogServer();
    if (ph) await ph.flush();
  },
};
