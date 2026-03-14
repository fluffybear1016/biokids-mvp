import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error('Supabase not configured');
  return createClient(url, key);
}

// GET: Retrieve notification preference for a subscription endpoint
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get('endpoint');

  if (!endpoint) {
    return NextResponse.json({ error: 'Missing endpoint param' }, { status: 400 });
  }

  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('push_subscriptions')
      .select('notify_every_hours')
      .eq('endpoint', endpoint)
      .single();

    if (error || !data) {
      return NextResponse.json({ notify_every_hours: 1 });
    }

    return NextResponse.json({ notify_every_hours: data.notify_every_hours ?? 1 });
  } catch {
    return NextResponse.json({ notify_every_hours: 1 });
  }
}

// POST: Update notification frequency for a subscription endpoint
export async function POST(request: Request) {
  try {
    const { endpoint, notify_every_hours } = await request.json();

    if (!endpoint || typeof notify_every_hours !== 'number') {
      return NextResponse.json({ error: 'Missing endpoint or notify_every_hours' }, { status: 400 });
    }

    // Validate: 0 = off, 1 = every hour, 2 = every 2h, 4 = every 4h
    const valid = [0, 1, 2, 4];
    if (!valid.includes(notify_every_hours)) {
      return NextResponse.json({ error: 'Invalid frequency. Valid: 0, 1, 2, 4' }, { status: 400 });
    }

    const supabase = getSupabase();
    const { error } = await supabase
      .from('push_subscriptions')
      .update({ notify_every_hours })
      .eq('endpoint', endpoint);

    if (error) {
      console.error('Failed to update preference:', error);
      return NextResponse.json({ error: 'Update failed' }, { status: 500 });
    }

    return NextResponse.json({ success: true, notify_every_hours });
  } catch (err) {
    console.error('Notification preferences error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
