import { NextResponse } from 'next/server';
import { sendPushToAll } from '@/lib/push';

// Test endpoint — manually trigger a push notification
// Usage: GET /api/cron/test-push
// This verifies the full pipeline: VAPID keys → Supabase → web-push → device
export async function GET(request: Request) {
  // Only allow in development or with CRON_SECRET
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const result = await sendPushToAll({
      title: "bioKids test notification",
      body: "Push notifications are working! You'll get protocol reminders throughout the day.",
      tag: "biokids-test",
    });

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (err) {
    console.error('Test push error:', err);
    return NextResponse.json(
      { error: 'Failed to send test notification', details: String(err) },
      { status: 500 }
    );
  }
}
