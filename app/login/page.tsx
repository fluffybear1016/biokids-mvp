'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import { analytics } from '@/lib/analytics';
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

        // Restore child name from server or auth metadata
        try {
          const stateRes = await fetch(`/api/auth/user-state?userId=${authData.user.id}`);
          const state = await stateRes.json();
          if (state.children?.length > 0 && state.children[0].name) {
            localStorage.setItem('childName', state.children[0].name);
          }
        } catch {}

        if (!localStorage.getItem('childName') && authData.user.user_metadata?.child_name) {
          localStorage.setItem('childName', authData.user.user_metadata.child_name);
        }

        // Track login analytics
        analytics.identify(authData.user.id, email);
        analytics.login('email');
        analytics.sessionStart();

        // Go straight to home (app is free during beta)
        const redirectTo = searchParams.get('redirect') || '/home';
        router.push(redirectTo);
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

      {/* Social Login Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
        <button
          type="button"
          onClick={async () => {
            const supabase = createClient();
            if (!supabase) return;
            // Store redirect destination in cookie (Supabase rejects query params in redirectTo)
            document.cookie = 'post_auth_redirect=/home; path=/; max-age=600; SameSite=Lax';
            await supabase.auth.signInWithOAuth({
              provider: 'google',
              options: { redirectTo: `${window.location.origin}/auth/callback` },
            });
          }}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            width: '100%', padding: '0.75rem', borderRadius: 10,
            border: '1px solid #e7e5e4', background: '#fff',
            fontFamily: "'Courier New', Courier, monospace", fontSize: 14, fontWeight: 600,
            color: '#1c1917', cursor: 'pointer', transition: 'all 0.2s',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
          Continue with Google
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <div style={{ flex: 1, height: 1, background: '#e7e5e4' }} />
        <span style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: 11, color: '#a8a29e' }}>or</span>
        <div style={{ flex: 1, height: 1, background: '#e7e5e4' }} />
      </div>

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
