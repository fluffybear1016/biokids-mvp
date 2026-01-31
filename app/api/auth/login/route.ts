import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: Request) {
  try {
    const { email, password, deviceFingerprint } = await request.json();

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

    const userId = authData.user.id;
    const sessionToken = crypto.randomUUID();

    // Get request IP
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : '127.0.0.1';

    // Invalidate all other sessions
    await supabase
      .from('user_sessions')
      .update({ is_active: false })
      .eq('user_id', userId)
      .eq('is_active', true);

    // Create new session
    await supabase.from('user_sessions').insert({
      user_id: userId,
      session_token: sessionToken,
      device_fingerprint: deviceFingerprint || null,
      ip_address: ip,
      user_agent: request.headers.get('user-agent'),
      is_active: true,
    });

    // Update user profile
    await supabase
      .from('user_profiles')
      .upsert({
        id: userId,
        active_session_token: sessionToken,
        last_login_ip: ip,
        last_device_fingerprint: deviceFingerprint || null,
        last_login_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

    return NextResponse.json({
      user: authData.user,
      session: authData.session,
      sessionToken,
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
