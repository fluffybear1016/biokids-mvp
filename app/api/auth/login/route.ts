import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { serverAnalytics } from '@/lib/posthog-server';

// Lazy initialization of Supabase client
function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key || url.includes('your-project')) {
    return null;
  }

  return createClient(url, key);
}

export async function POST(request: Request) {
  try {
    const supabase = getSupabaseClient();

    if (!supabase) {
      return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 });
    }

    const { email, password } = await request.json();

    // Authenticate with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 401 });
    }

    if (!authData.user) {
      return NextResponse.json({ error: 'Login failed' }, { status: 401 });
    }

    // Ensure user profile exists with trial subscription_status
    // (app is free during beta — every user gets trial access)
    await supabase
      .from('profiles')
      .upsert({
        id: authData.user.id,
        email: authData.user.email,
        subscription_status: 'trial',
      }, { onConflict: 'id' });

    // Server-side PostHog tracking — guaranteed to fire even if client is ad-blocked
    serverAnalytics.login(authData.user.id, email, 'email');
    await serverAnalytics.flush();

    return NextResponse.json({
      user: authData.user,
      session: authData.session,
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
