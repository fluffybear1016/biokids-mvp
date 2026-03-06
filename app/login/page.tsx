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
        let hasSubscription = false;
        let hasChild = false;

        try {
          const stateRes = await fetch(`/api/auth/user-state?userId=${authData.user.id}`);
          const state = await stateRes.json();
          hasSubscription = state.profile?.subscription_status === 'active' || state.profile?.subscription_status === 'trial';
          hasChild = state.children && state.children.length > 0;

          // Restore child name to localStorage from server (survives cross-device login)
          if (hasChild && state.children[0].name) {
            localStorage.setItem('childName', state.children[0].name);
          }
        } catch {
          // API failed — fall through to localStorage check
        }

        // Also try auth user metadata for child name
        if (!localStorage.getItem('childName') && authData.user.user_metadata?.child_name) {
          localStorage.setItem('childName', authData.user.user_metadata.child_name);
        }

        const hasLocalChild = !!localStorage.getItem('childName');

        if (hasSubscription) {
          const redirectTo = searchParams.get('redirect') || '/home';
          router.push(redirectTo);
        } else if (hasLocalChild) {
          // User started onboarding but may not have paid — send to Stripe step
          router.push('/onboarding?step=6');
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
    <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e7e5e4', padding: '14px 18px' }}>
      <h1 style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '1.5rem', color: '#1c1917', fontWeight: 800, marginBottom: '0.5rem', textAlign: 'center' }} className="sm:text-3xl">Welcome back</h1>
      <p style={{ fontSize: '0.875rem', color: '#57534e', marginBottom: '1.5rem', textAlign: 'center', lineHeight: 1.75 }} className="sm:text-base">Continue optimizing your child's growth.</p>

      {kickedMessage && (
        <div style={{ background: '#fff', border: '1px solid #e7e5e4', color: '#a8a29e', padding: '0.75rem 1rem', borderRadius: '10px', fontSize: '0.875rem', marginBottom: '1.5rem', fontFamily: "'Courier New', Courier, monospace" }}>
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{kickedMessage}</span>
          </div>
        </div>
      )}

      {error && (
        <div style={{ background: '#fff', color: '#dc2626', padding: '0.75rem 1rem', borderRadius: '10px', fontSize: '0.875rem', marginBottom: '1.5rem', border: '1px solid #e7e5e4', fontFamily: "'Courier New', Courier, monospace" }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#57534e', marginBottom: '0.5rem', fontFamily: "'Courier New', Courier, monospace" }}>Email</label>
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
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#57534e', marginBottom: '0.5rem', fontFamily: "'Courier New', Courier, monospace" }}>Password</label>
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
          style={{ background: '#065f46', color: 'white', borderRadius: '10px', fontFamily: "'Courier New', Courier, monospace", fontWeight: 600, padding: '0.75rem 1rem', fontSize: '1rem', width: '100%', border: 'none', cursor: 'pointer' }}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Log in'}
        </button>
      </form>

      <div className="flex justify-between items-center mt-6 text-sm">
        <Link href="/forgot-password" style={{ color: '#a8a29e', textDecoration: 'none', fontFamily: "'Courier New', Courier, monospace", fontSize: '0.875rem' }}>
          Forgot password?
        </Link>
        <Link href="/onboarding" style={{ color: '#065f46', fontWeight: 500, textDecoration: 'none', fontFamily: "'Courier New', Courier, monospace", fontSize: '0.875rem' }}>
          Create account
        </Link>
      </div>
    </div>
  );
}

export default function Login() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fafaf9', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--p-4, 1rem)' }} className="sm:p-8">
      <div className="w-full max-w-md">
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: "'Courier New', Courier, monospace", fontSize: 'var(--text-lg, 1.125rem)', color: '#065f46', marginBottom: 'var(--mb-8, 2rem)', justifyContent: 'center' }} className="sm:mb-12">
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

        <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#a8a29e', marginTop: '1.5rem', fontFamily: "'Courier New', Courier, monospace" }} className="sm:mt-8">
          Your data stays private. We never sell or share your information.
        </p>
      </div>
    </div>
  );
}
