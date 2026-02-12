'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';

export default function Signup() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [childName, setChildName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | ''>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState<string | null>(null);

  const handleSubmitAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const supabase = createClient();

      if (!supabase) {
        setError('Authentication not configured');
        setLoading(false);
        return;
      }

      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }

      if (data.user) {
        setUserId(data.user.id);
        setStep(2);
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitChild = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const supabase = createClient();

      if (!supabase || !userId) {
        // If no Supabase, save to localStorage and redirect
        try {
          localStorage.setItem('onboarding_complete', 'true');
          localStorage.setItem('child_data', JSON.stringify({
            name: childName,
            birthDate,
            sex: gender,
          }));
        } catch { /* continue */ }
        router.push('/dashboard');
        return;
      }

      // Save child to Supabase
      await supabase.from('children').insert({
        user_id: userId,
        name: childName,
        birth_date: birthDate,
        gender: gender || null,
      });

      // Save to localStorage as backup
      try {
        localStorage.setItem('onboarding_complete', 'true');
        localStorage.setItem('child_data', JSON.stringify({
          name: childName,
          birthDate,
          sex: gender,
        }));
      } catch { /* continue */ }

      router.push('/dashboard');
    } catch {
      // Continue anyway
      router.push('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Link href="/" className="flex items-center gap-2 font-display text-xl text-forest mb-12">
            <span className="text-2xl">🌿</span>
            bioKids
          </Link>

          {step === 1 ? (
            <>
              <h1 className="font-display text-3xl text-gray-900 mb-2">Create your account</h1>
              <p className="text-gray-500 mb-8">Start optimizing your child's natural growth hormone today.</p>

              {error && (
                <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm mb-6">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmitAuth} className="space-y-5">
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
                <button
                  type="submit"
                  className="btn-primary w-full"
                  disabled={loading}
                >
                  {loading ? 'Creating account...' : 'Continue →'}
                </button>
              </form>

              <p className="text-center text-sm text-gray-500 mt-8">
                Already have an account?{' '}
                <Link href="/login" className="text-forest font-medium hover:underline">Log in</Link>
              </p>
            </>
          ) : (
            <>
              <h1 className="font-display text-3xl text-gray-900 mb-2">Add your child</h1>
              <p className="text-gray-500 mb-8">We'll personalize the protocol for their growth stage.</p>

              {error && (
                <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm mb-6">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmitChild} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Child's name (or initial)</label>
                  <input
                    type="text"
                    value={childName}
                    onChange={(e) => setChildName(e.target.value)}
                    className="input"
                    placeholder="Emma"
                    required
                  />
                  <p className="text-xs text-gray-400 mt-1">You can use just an initial for privacy</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Birth date</label>
                  <input
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="input"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender (optional)</label>
                  <div className="flex gap-3">
                    {[
                      { value: 'female', label: '👧 Girl' },
                      { value: 'male', label: '👦 Boy' },
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setGender(option.value as 'male' | 'female')}
                        className={`flex-1 py-3 px-4 rounded-xl border-2 text-sm font-medium transition-all ${
                          gender === option.value
                            ? 'border-forest bg-green-50 text-forest'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn-primary w-full"
                  disabled={loading}
                >
                  {loading ? 'Setting up...' : 'Start Protocol →'}
                </button>
              </form>

              <p className="text-xs text-gray-400 text-center mt-6">
                🔒 Your data stays private. We never sell or share your information.
              </p>
            </>
          )}
        </div>
      </div>

      {/* Right side - Visual */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-forest to-forest-light items-center justify-center p-12">
        <div className="max-w-md text-white">
          <div className="text-6xl mb-8">🌱</div>
          <h2 className="font-display text-4xl mb-6">Every day the growth window gets smaller.</h2>
          <p className="text-lg text-white/80 mb-8">
            Growth plates close at puberty. The time to optimize is now — while the window is still open.
          </p>
          <div className="space-y-4">
            {[
              '70% of GH released during sleep',
              '771% GH spike from sprints',
              'Pre-puberty = highest leverage',
            ].map((stat) => (
              <div key={stat} className="flex items-center gap-3 text-white/90">
                <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {stat}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
