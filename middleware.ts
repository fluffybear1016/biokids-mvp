import { NextResponse } from 'next/server';

// FREE MODE - all content is public. No auth, no subscription, no signup.
//
// The protocol, windows, science, and every other page are open to everyone.
// Middleware is a pass-through so that:
//   1. Every route renders for anonymous visitors (no login wall, no paywall).
//   2. The site serves content even when Supabase is paused/unreachable - no
//      page render depends on a database round-trip in middleware anymore.
//
// To re-enable gating later, restore the auth/subscription logic from git history.

export function middleware() {
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
