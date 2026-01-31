'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { OnboardingData, clearOnboardingData } from '@/lib/onboarding-store';
import { createClient } from '@/lib/supabase';
import { createSession } from '@/lib/session-manager';

interface Props {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step9AccountCreation({ data, onBack }: Props) {
  const router = useRouter();
  const [email, setEmail] = useState(data.email);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();

      // Create the user account
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
        setLoading(false);
        return;
      }

      if (authData.user) {
        // Create session for anti-account-sharing
        await createSession(authData.user.id);

        // Save children to database
        for (const child of data.children) {
          if (!child.isPregnancy) {
            await supabase.from('children').insert({
              user_id: authData.user.id,
              name: child.name,
              birth_date: child.birthDate,
              gender: child.gender,
            });

            // Save measurements if provided
            if (child.heightCm || child.weightKg) {
              const { data: childData } = await supabase
                .from('children')
                .select('id')
                .eq('user_id', authData.user.id)
                .eq('name', child.name)
                .single();

              if (childData) {
                await supabase.from('measurements').insert({
                  child_id: childData.id,
                  measured_at: new Date().toISOString(),
                  height_cm: child.heightCm,
                  weight_kg: child.weightKg,
                });
              }
            }
          }
        }

        // Save user profile with email preferences
        await supabase.from('user_profiles').upsert({
          id: authData.user.id,
          email_frequency: data.emailFrequency,
          onboarding_completed: true,
        });

        // Clear onboarding data
        clearOnboardingData();

        // Redirect to dashboard
        router.push('/dashboard');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const isValid = email.includes('@') && password.length >= 8 && password === confirmPassword;

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-forest mb-8 text-sm"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        <h1 className="font-display text-3xl text-gray-900 mb-2">Create Your Account</h1>
        <p className="text-gray-500 mb-8">
          Final step - set up your login credentials.
        </p>

        <form onSubmit={handleCreateAccount} className="space-y-5">
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
              placeholder="At least 8 characters"
              required
              minLength={8}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
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

          {error && (
            <div className="p-3 bg-coral-light text-coral rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={!isValid || loading}
            className={`w-full py-4 rounded-xl text-lg font-semibold transition-all ${
              isValid && !loading
                ? 'bg-forest text-white hover:bg-forest-dark'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {loading ? 'Creating Account...' : 'Create Account & Start'}
          </button>
        </form>

        <p className="text-xs text-gray-400 text-center mt-6">
          By creating an account, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
