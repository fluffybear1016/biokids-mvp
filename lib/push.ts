import webPush from 'web-push';
import { createClient } from '@supabase/supabase-js';

// Initialize web-push with VAPID credentials
export function initWebPush() {
  const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  const privateKey = process.env.VAPID_PRIVATE_KEY;
  const email = process.env.VAPID_EMAIL || 'mailto:hello@biokids.me';

  if (!publicKey || !privateKey) {
    throw new Error('VAPID keys not configured');
  }

  webPush.setVapidDetails(email, publicKey, privateKey);
}

// Get Supabase client for server-side operations
function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error('Supabase not configured');
  }

  return createClient(url, key);
}

export type PushPayload = {
  title: string;
  body: string;
  url?: string;
  tag?: string; // Prevents duplicate notifications
};

// Send push notification to all subscribers
export async function sendPushToAll(payload: PushPayload): Promise<{ sent: number; failed: number; total: number }> {
  initWebPush();
  const supabase = getSupabase();

  const { data: subs, error } = await supabase
    .from('push_subscriptions')
    .select('*');

  if (error) {
    console.error('Failed to fetch subscriptions:', error);
    throw error;
  }

  if (!subs || subs.length === 0) {
    console.log('No subscriptions found.');
    return { sent: 0, failed: 0, total: 0 };
  }

  const body = JSON.stringify({
    title: payload.title,
    body: payload.body,
    url: payload.url || '/home',
    tag: payload.tag || 'biokids-protocol',
  });

  let sent = 0;
  let failed = 0;

  for (const sub of subs) {
    const subscription = {
      endpoint: sub.endpoint,
      keys: {
        p256dh: sub.keys_p256dh,
        auth: sub.keys_auth,
      },
    };

    try {
      await webPush.sendNotification(subscription, body);
      sent++;
    } catch (err: unknown) {
      failed++;
      const error = err as { statusCode?: number };
      // Remove expired/invalid subscriptions
      if (error.statusCode === 410 || error.statusCode === 404) {
        await supabase
          .from('push_subscriptions')
          .delete()
          .eq('endpoint', sub.endpoint);
        console.log('Removed expired subscription:', sub.endpoint.slice(0, 50));
      } else {
        console.error('Push failed:', error);
      }
    }
  }

  console.log(`Push: ${sent} sent, ${failed} failed, ${subs.length} total`);
  return { sent, failed, total: subs.length };
}
