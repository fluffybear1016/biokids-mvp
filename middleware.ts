import { NextRequest, NextResponse } from 'next/server';
import { createMiddlewareSupabaseClient } from '@/lib/supabase-server';

const PROTECTED_PREFIXES = [
  '/dashboard',
  '/windows',
  '/jarvis',
  '/protocol',
  '/learn',
  '/stage',
];

function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_PREFIXES.some(
    prefix => pathname === prefix || pathname.startsWith(prefix + '/')
  );
}

// Routes where logged-in users with active subscriptions should be redirected to /dashboard
const REDIRECT_IF_AUTHED = ['/', '/login', '/signup'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = isProtectedRoute(pathname);
  const shouldRedirectIfAuthed = REDIRECT_IF_AUTHED.includes(pathname);

  // Skip routes that don't need any auth check
  if (!isProtected && !shouldRedirectIfAuthed) {
    return NextResponse.next();
  }

  const response = NextResponse.next({
    request: { headers: request.headers },
  });

  const supabase = createMiddlewareSupabaseClient(request, response);

  // Validate session server-side (also refreshes expired tokens)
  const { data: { user }, error } = await supabase.auth.getUser();

  // For public pages: if not logged in, just show the page
  if (shouldRedirectIfAuthed) {
    if (!user || error) return response;

    // User is logged in — check if they have an active subscription
    const { data: profile } = await supabase
      .from('profiles')
      .select('subscription_status')
      .eq('id', user.id)
      .single();

    const status = profile?.subscription_status;
    if (status === 'active' || status === 'trial') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return response;
  }

  // For protected pages: require auth + subscription
  if (!user || error) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Check subscription status
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('subscription_status')
    .eq('id', user.id)
    .single();

  // If the query fails (RLS issue, no row, etc.), let authenticated users through
  // rather than blocking paying customers
  if (profileError) {
    return response;
  }

  const status = profile?.subscription_status;

  if (status !== 'active' && status !== 'trial') {
    return NextResponse.redirect(new URL('/onboarding', request.url));
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
