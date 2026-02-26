'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const supabase = createClient();

      if (!supabase) {
        setError('Password reset is not available at this time.');
        setLoading(false);
        return;
      }

      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
      });

      if (resetError) {
        setError(resetError.message);
        setLoading(false);
        return;
      }

      setSuccess(true);
    } catch (err) {
      console.error('Password reset error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center gap-2 font-display text-lg sm:text-xl text-forest mb-8 sm:mb-12 justify-center">
          <span className="text-xl sm:text-2xl">🌿</span>
          bioKids
        </Link>

        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg">
          {success ? (
            <>
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-forest/10 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-forest" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <h1 className="font-display text-2xl sm:text-3xl text-gray-900 mb-2 text-center">Check your email</h1>
              <p className="text-sm sm:text-base text-gray-500 mb-6 text-center">
                We sent a password reset link to <strong>{email}</strong>
              </p>
              <p className="text-xs text-gray-400 text-center mb-6">
                Didn't receive the email? Check your spam folder or try again.
              </p>
              <Link href="/login" className="btn-primary w-full block text-center">
                Back to login
              </Link>
            </>
          ) : (
            <>
              <h1 className="font-display text-2xl sm:text-3xl text-gray-900 mb-2 text-center">Reset your password</h1>
              <p className="text-sm sm:text-base text-gray-500 mb-6 sm:mb-8 text-center">
                Enter your email and we'll send you a reset link.
              </p>

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
                <button
                  type="submit"
                  className="btn-primary w-full"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send reset link'}
                </button>
              </form>

              <p className="text-center text-sm text-gray-500 mt-6">
                Remember your password?{' '}
                <Link href="/login" className="text-forest font-medium hover:underline">Log in</Link>
              </p>
            </>
          )}
        </div>

        <p className="text-center text-xs text-gray-400 mt-6 sm:mt-8">
          Your data stays private. We never sell or share your information.
        </p>
      </div>
    </div>
  );
}
