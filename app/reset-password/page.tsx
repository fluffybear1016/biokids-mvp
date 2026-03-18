'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';

export default function ResetPassword() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Supabase automatically handles the token from the URL hash
    // when using the default auth flow
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      setLoading(false);
      return;
    }

    try {
      const supabase = createClient();

      if (!supabase) {
        setError('Password reset is not available at this time.');
        setLoading(false);
        return;
      }

      const { error: updateError } = await supabase.auth.updateUser({
        password: password,
      });

      if (updateError) {
        setError(updateError.message);
        setLoading(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } catch (err) {
      console.error('Password update error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fafaf9', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--p-4, 1rem)' }} className="sm:p-8">
      <div className="w-full max-w-md">
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: "'Courier New', Courier, monospace", fontSize: 'var(--text-lg, 1.125rem)', color: '#065f46', marginBottom: 'var(--mb-8, 2rem)', justifyContent: 'center', textDecoration: 'none' }} className="sm:mb-12">
          bioKids
        </Link>

        <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e7e5e4', padding: '14px 18px' }} className="sm:p-8">
          {success ? (
            <>
              <div className="flex justify-center mb-6">
                <div style={{ width: '4rem', height: '4rem', background: 'rgba(5, 150, 105, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{ color: '#065f46' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h1 style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '1.5rem', color: '#1c1917', fontWeight: 800, marginBottom: '0.5rem', textAlign: 'center' }} className="sm:text-3xl">Password updated</h1>
              <p style={{ fontSize: '0.875rem', color: '#57534e', marginBottom: '1.5rem', textAlign: 'center', fontFamily: "'Courier New', Courier, monospace", lineHeight: 1.75 }} className="sm:text-base">
                Your password has been reset successfully. Redirecting to login...
              </p>
              <Link href="/login" style={{ background: '#065f46', color: 'white', borderRadius: '10px', fontFamily: "'Courier New', Courier, monospace", fontWeight: 600, padding: '0.75rem 1rem', fontSize: '1rem', width: '100%', border: 'none', cursor: 'pointer', display: 'block', textAlign: 'center', textDecoration: 'none' }}>
                Go to login
              </Link>
            </>
          ) : (
            <>
              <h1 style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '1.5rem', color: '#1c1917', fontWeight: 800, marginBottom: '0.5rem', textAlign: 'center' }} className="sm:text-3xl">Set new password</h1>
              <p style={{ fontSize: '0.875rem', color: '#57534e', marginBottom: '1.5rem', textAlign: 'center', fontFamily: "'Courier New', Courier, monospace", lineHeight: 1.75 }} className="sm:text-base">
                Enter your new password below.
              </p>

              {error && (
                <div style={{ background: '#fff', color: '#dc2626', padding: '0.75rem 1rem', borderRadius: '10px', fontSize: '0.875rem', marginBottom: '1.5rem', border: '1px solid #e7e5e4', fontFamily: "'Courier New', Courier, monospace" }}>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#57534e', marginBottom: '0.5rem', fontFamily: "'Courier New', Courier, monospace" }}>New password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input"
                    placeholder="At least 8 characters"
                    required
                    minLength={8}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#57534e', marginBottom: '0.5rem', fontFamily: "'Courier New', Courier, monospace" }}>Confirm password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="input"
                    placeholder="Confirm your password"
                    required
                    minLength={8}
                  />
                </div>
                <button
                  type="submit"
                  style={{ background: '#065f46', color: 'white', borderRadius: '10px', fontFamily: "'Courier New', Courier, monospace", fontWeight: 600, padding: '0.75rem 1rem', fontSize: '1rem', width: '100%', border: 'none', cursor: 'pointer' }}
                  disabled={loading}
                >
                  {loading ? 'Updating...' : 'Update password'}
                </button>
              </form>

              <p style={{ textAlign: 'center', fontSize: '0.875rem', color: '#57534e', marginTop: '1.5rem', fontFamily: "'Courier New', Courier, monospace" }}>
                <Link href="/login" style={{ color: '#065f46', fontWeight: 500, textDecoration: 'none' }}>Back to login</Link>
              </p>
            </>
          )}
        </div>

        <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#57534e', marginTop: '1.5rem', fontFamily: "'Courier New', Courier, monospace" }} className="sm:mt-8">
          Your data stays private. We never sell or share your information.
        </p>
      </div>
    </div>
  );
}
