import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');

  if (code) {
    const cookieStore = await cookies();

    // Read redirect destination from cookie (set before OAuth redirect)
    const postAuthRedirect = cookieStore.get('post_auth_redirect')?.value;
    const next = searchParams.get('next') ?? postAuthRedirect ?? '/home';

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          },
        },
      }
    );

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error && data.user) {
      // Create profile for OAuth users (first-time sign-in)
      try {
        await fetch(`${origin}/api/auth/create-profile`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: data.user.id,
            email: data.user.email,
          }),
        });
      } catch {
        // Profile may already exist — that's fine
      }

      // Clear the redirect cookie after use
      const response = NextResponse.redirect(`${origin}${next}`);
      response.cookies.set('post_auth_redirect', '', { path: '/', maxAge: 0 });
      return response;
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth`);
}
