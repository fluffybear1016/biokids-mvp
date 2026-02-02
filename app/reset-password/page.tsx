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
                  <svg className="w-8 h-8 text-forest" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h1 className="font-display text-2xl sm:text-3xl text-gray-900 mb-2 text-center">Password updated</h1>
              <p className="text-sm sm:text-base text-gray-500 mb-6 text-center">
                Your password has been reset successfully. Redirecting to login...
              </p>
              <Link href="/login" className="btn-primary w-full block text-center">
                Go to login
              </Link>
            </>
          ) : (
            <>
              <h1 className="font-display text-2xl sm:text-3xl text-gray-900 mb-2 text-center">Set new password</h1>
              <p className="text-sm sm:text-base text-gray-500 mb-6 sm:mb-8 text-center">
                Enter your new password below.
              </p>

              {error && (
                <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm mb-6">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">New password</label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm password</label>
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
                  className="btn-primary w-full"
                  disabled={loading}
                >
                  {loading ? 'Updating...' : 'Update password'}
                </button>
              </form>

              <p className="text-center text-sm text-gray-500 mt-6">
                <Link href="/login" className="text-forest font-medium hover:underline">Back to login</Link>
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
