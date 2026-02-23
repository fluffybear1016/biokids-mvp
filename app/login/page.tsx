'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import { generateDeviceFingerprint, storeSessionToken, SESSION_KICKED_MESSAGE } from '@/lib/session-manager';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [kickedMessage, setKickedMessage] = useState('');

  useEffect(() => {
    // Check if user was kicked from another session
    if (searchParams.get('kicked') === 'true') {
      setKickedMessage(SESSION_KICKED_MESSAGE);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setKickedMessage('');

    try {
      const supabase = createClient();
      const fingerprint = generateDeviceFingerprint();

      if (!supabase) {
        setError('Authentication is not configured. Please try again later.');
        setLoading(false);
        return;
      }

      // Sign in with Supabase
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
        setLoading(false);
        return;
      }

      if (authData.user) {
        // Create session via API (handles invalidating other sessions)
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            password,
            deviceFingerprint: fingerprint,
          }),
        });

        const result = await response.json();

        if (result.sessionToken) {
          storeSessionToken(result.sessionToken);
        }

        // Check user state via server API (bypasses RLS)
        const stateRes = await fetch(`/api/auth/user-state?userId=${authData.user.id}`);
        const state = await stateRes.json();

        const hasSubscription = state.profile?.subscription_status === 'active' || state.profile?.subscription_status === 'trial';
        const hasChild = state.children && state.children.length > 0;

        if (hasChild && hasSubscription) {
          const redirectTo = searchParams.get('redirect') || '/dashboard';
          router.push(redirectTo);
        } else if (hasSubscription && !hasChild) {
          router.push('/onboarding?step=4');
        } else if (hasChild && !hasSubscription) {
          router.push('/onboarding?step=2');
        } else {
          router.push('/onboarding');
        }
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg">
      <h1 className="font-display text-2xl sm:text-3xl text-gray-900 mb-2 text-center">Welcome back</h1>
      <p className="text-sm sm:text-base text-gray-500 mb-6 sm:mb-8 text-center">Continue optimizing your child's growth.</p>

      {kickedMessage && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-xl text-sm mb-6">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{kickedMessage}</span>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            placeholder="you@example.com"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            placeholder="Your password"
            required
          />
        </div>
        <button
          type="submit"
          className="btn-primary w-full"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Log in'}
        </button>
      </form>

      <div className="flex justify-between items-center mt-6 text-sm">
        <Link href="/forgot-password" className="text-gray-500 hover:text-forest">
          Forgot password?
        </Link>
        <Link href="/signup" className="text-forest font-medium hover:underline">
          Create account
        </Link>
      </div>
    </div>
  );
}

export default function Login() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center gap-2 font-display text-lg sm:text-xl text-forest mb-8 sm:mb-12 justify-center">
          <span className="text-xl sm:text-2xl">🌿</span>
          bioKids
        </Link>

        <Suspense fallback={
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-8"></div>
              <div className="space-y-5">
                <div className="h-12 bg-gray-200 rounded"></div>
                <div className="h-12 bg-gray-200 rounded"></div>
                <div className="h-12 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        }>
          <LoginForm />
        </Suspense>

        <p className="text-center text-xs text-gray-400 mt-6 sm:mt-8">
          Your data stays private. We never sell or share your information.
        </p>
      </div>
    </div>
  );
}
