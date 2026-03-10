/**
 * Send push notifications to all subscribed users
 *
 * Setup:
 * 1. Generate VAPID keys:    npx web-push generate-vapid-keys
 * 2. Set in .env.local:
 *    NEXT_PUBLIC_VAPID_PUBLIC_KEY=<public key>
 *    VAPID_PRIVATE_KEY=<private key>
 *    VAPID_EMAIL=mailto:your@email.com
 *
 * 3. Create Supabase table:
 *    CREATE TABLE push_subscriptions (
 *      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
 *      endpoint TEXT UNIQUE NOT NULL,
 *      keys_p256dh TEXT NOT NULL,
 *      keys_auth TEXT NOT NULL,
 *      created_at TIMESTAMPTZ DEFAULT now(),
 *      updated_at TIMESTAMPTZ DEFAULT now()
 *    );
 *
 * Usage:
 *   npx ts-node scripts/send-push.ts
 *   npx ts-node scripts/send-push.ts "Custom notification title" "Custom body text"
 *
 * For daily reminders, set up a cron job or use Supabase Edge Functions:
 *   0 7 * * * cd /path/to/biokids-mvp && npx ts-node scripts/send-push.ts
 */

import webPush from 'web-push';
import { createClient } from '@supabase/supabase-js';

const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!;
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY!;
const VAPID_EMAIL = process.env.VAPID_EMAIL || 'mailto:hello@biokids.me';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Morning reminder messages — rotate daily
const MORNING_MESSAGES = [
  { title: "Good morning!", body: "Time to start today's height protocol. The Growth Bowl is waiting." },
  { title: "Rise and shine!", body: "Every day counts. Let's check off today's height protocol." },
  { title: "New day, new gains.", body: "Morning sunlight + Growth Bowl = height protocol started right." },
  { title: "The streak continues!", body: "Don't break the chain. Start today's height protocol now." },
  { title: "Your child's height window is open.", body: "Make today count. Open the protocol checklist." },
];

async function sendPush() {
  webPush.setVapidDetails(VAPID_EMAIL, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

  // Get all subscriptions
  const { data: subs, error } = await supabase
    .from('push_subscriptions')
    .select('*');

  if (error) {
    console.error('Failed to fetch subscriptions:', error);
    return;
  }

  if (!subs || subs.length === 0) {
    console.log('No subscriptions found.');
    return;
  }

  // Use custom message or pick random morning message
  const customTitle = process.argv[2];
  const customBody = process.argv[3];
  const msg = customTitle
    ? { title: customTitle, body: customBody || '' }
    : MORNING_MESSAGES[Math.floor(Math.random() * MORNING_MESSAGES.length)];

  const payload = JSON.stringify({
    title: msg.title,
    body: msg.body,
    url: '/home',
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
      await webPush.sendNotification(subscription, payload);
      sent++;
    } catch (err: unknown) {
      failed++;
      const error = err as { statusCode?: number };
      // Remove expired subscriptions
      if (error.statusCode === 410 || error.statusCode === 404) {
        await supabase
          .from('push_subscriptions')
          .delete()
          .eq('endpoint', sub.endpoint);
        console.log('Removed expired subscription:', sub.endpoint.slice(0, 50));
      }
    }
  }

  console.log(`Push sent: ${sent} success, ${failed} failed, ${subs.length} total`);
}

sendPush().catch(console.error);
