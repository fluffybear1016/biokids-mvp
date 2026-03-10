import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Store push subscription in Supabase
// Table: push_subscriptions (id, user_id, endpoint, keys_p256dh, keys_auth, created_at)
export async function POST(request: Request) {
  try {
    const subscription = await request.json();

    // Validate subscription object
    if (!subscription.endpoint || !subscription.keys) {
      return NextResponse.json({ error: 'Invalid subscription' }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      // If no Supabase, just log and acknowledge
      console.log('Push subscription received (no DB configured):', subscription.endpoint.slice(0, 50));
      return NextResponse.json({ success: true, stored: false });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Upsert subscription (update if same endpoint exists)
    const { error } = await supabase
      .from('push_subscriptions')
      .upsert({
        endpoint: subscription.endpoint,
        keys_p256dh: subscription.keys.p256dh,
        keys_auth: subscription.keys.auth,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'endpoint',
      });

    if (error) {
      console.error('Failed to store subscription:', error);
      return NextResponse.json({ error: 'Storage failed' }, { status: 500 });
    }

    return NextResponse.json({ success: true, stored: true });
  } catch (err) {
    console.error('Push subscribe error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
