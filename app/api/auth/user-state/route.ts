import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function GET(request: Request) {
  try {
    const supabase = getSupabaseAdmin();
    if (!supabase) {
      return NextResponse.json({ error: 'Server not configured' }, { status: 503 });
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
    }

    const [{ data: profile }, { data: children }] = await Promise.all([
      supabase
        .from('profiles')
        .select('id, email, subscription_status')
        .eq('id', userId)
        .single(),
      supabase
        .from('children')
        .select('*')
        .eq('user_id', userId),
    ]);

    return NextResponse.json({
      profile: profile || null,
      children: children || [],
    });
  } catch (error) {
    console.error('User state error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
