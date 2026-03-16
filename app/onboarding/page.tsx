'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import GoalSelection from '@/components/GoalSelection';
import HeightPotentialCalculator from '@/components/HeightPotentialCalculator';
import { createClient } from '@/lib/supabase';
import { analytics } from '@/lib/analytics';
import { Suspense } from 'react';

// Shared styles
const mono = "'Courier New', Courier, monospace";

function OnboardingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);

  // Check if height data already exists from landing page calculator
  const [hasHeightData, setHasHeightData] = useState(false);

  // Account Creation (Step 1)
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);
  const [signupError, setSignupError] = useState('');

  // Auth info for Stripe
  const [userEmail, setUserEmail] = useState('');
  const [userId, setUserId] = useState('');

  // Child Info (Step 3)
  const [name, setName] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [heightFt, setHeightFt] = useState('');
  const [heightIn, setHeightIn] = useState('');
  const [weight, setWeight] = useState('');

  // Daily Habits (Step 4)
  const [sleepHours, setSleepHours] = useState('');
  const [bedtime, setBedtime] = useState('');
  const [dairy, setDairy] = useState('');
  const [exercise, setExercise] = useState('');
  const [screenTime, setScreenTime] = useState('');
  const [processedFoods, setProcessedFoods] = useState('');

  // Height Potential (Step 6 — skipped if from landing page)
  const [childGender, setChildGender] = useState<'boy' | 'girl' | ''>('');
  const [motherHeightFt, setMotherHeightFt] = useState('');
  const [motherHeightIn, setMotherHeightIn] = useState('');
  const [fatherHeightFt, setFatherHeightFt] = useState('');
  const [fatherHeightIn, setFatherHeightIn] = useState('');

  // Newsletter opt-in
  const [newsletterOptIn, setNewsletterOptIn] = useState(true);

  // Total steps: 1=Account, 2=ChildInfo, 3=Habits, 4=Goals, 5=Height (if needed)
  // App is 100% free — just sign up
  const totalSteps = hasHeightData ? 4 : 5;

  // Check for existing height data from landing page
  useEffect(() => {
    const fromLanding = localStorage.getItem('biokids_from_landing');
    const geneticTarget = localStorage.getItem('geneticTarget');
    if (fromLanding && geneticTarget) {
      setHasHeightData(true);
    }
  }, []);

  // Read ?step= URL param to allow resuming onboarding
  useEffect(() => {
    const stepParam = searchParams.get('step');
    if (stepParam) {
      const parsed = parseInt(stepParam, 10);
      if (parsed >= 1 && parsed <= 6) {
        setStep(parsed);
        const savedName = localStorage.getItem('childName');
        if (savedName) setName(savedName);
      }
    }
  }, [searchParams]);

  // Fetch authenticated user info for Stripe + auto-advance OAuth users past step 1
  useEffect(() => {
    const supabase = createClient();
    if (supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          setUserEmail(session.user.email || '');
          setUserId(session.user.id);
          // If user is already authenticated (e.g. via Google OAuth) and still on step 1,
          // skip account creation and go straight to child info
          if (step === 1) {
            setStep(2);
          }
          return;
        }
        setUserEmail(localStorage.getItem('biokids_auth_email') || '');
        setUserId(localStorage.getItem('biokids_auth_user_id') || '');
      });
    } else {
      setUserEmail(localStorage.getItem('biokids_auth_email') || '');
      setUserId(localStorage.getItem('biokids_auth_user_id') || '');
    }
  }, []);

  // Save newsletter subscription
  const saveNewsletterSubscription = async (email: string, uid: string) => {
    if (!newsletterOptIn) return;
    try {
      await fetch('/api/auth/subscribe-newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, userId: uid }),
      });
    } catch {}
  };

  // Generate year options
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 26 }, (_, i) => currentYear - i);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const calculateBMI = () => {
    if (!heightFt || !heightIn || !weight) return null;
    const totalInches = (parseInt(heightFt) * 12) + parseInt(heightIn);
    const heightM = totalInches * 0.0254;
    const weightKg = parseInt(weight) * 0.453592;
    return weightKg / (heightM * heightM);
  };

  // Step 1: Account Creation
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupLoading(true);
    setSignupError('');

    try {
      const supabase = createClient();

      if (!supabase) {
        setSignupError('Authentication not configured');
        setSignupLoading(false);
        return;
      }

      const { data, error: signUpError } = await supabase.auth.signUp({
        email: signupEmail,
        password: signupPassword,
      });

      if (signUpError) {
        setSignupError(signUpError.message);
        setSignupLoading(false);
        return;
      }

      if (data.user) {
        // Create profile row via server API (bypasses RLS)
        await fetch('/api/auth/create-profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: data.user.id, email: signupEmail }),
        });

        // Save auth info for Stripe
        setUserEmail(signupEmail);
        setUserId(data.user.id);
        localStorage.setItem('biokids_auth_email', signupEmail);
        localStorage.setItem('biokids_auth_user_id', data.user.id);

        // Save newsletter subscription
        saveNewsletterSubscription(signupEmail, data.user.id);

        // Track analytics
        analytics.identify(data.user.id, signupEmail);
        analytics.signup('email', signupEmail);
        analytics.onboardingStep(1, 'Account Created');
        if (newsletterOptIn) analytics.newsletterSubscribe('onboarding');

        setStep(2); // → Child Info
      }
    } catch (err) {
      console.error('Signup error:', err);
      setSignupError('An error occurred. Please try again.');
    } finally {
      setSignupLoading(false);
    }
  };

  // Step 2: Child Info — save and advance
  const saveChildInfo = () => {
    const bmi = calculateBMI();
    if (bmi) localStorage.setItem('childBMI', bmi.toString());
    localStorage.setItem('childName', name);
    localStorage.setItem('childBirthMonth', birthMonth);
    localStorage.setItem('childBirthYear', birthYear);

    const supabase = createClient();
    if (supabase) {
      supabase.auth.updateUser({ data: { child_name: name } }).catch(() => {});
    }
    if (userId) {
      const birthDate = birthYear && birthMonth
        ? `${birthYear}-${birthMonth.padStart(2, '0')}-01`
        : null;
      fetch('/api/auth/save-child', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, name, birthDate }),
      }).catch(() => {});
    }
    // Track child info for segmentation
    analytics.onboardingStep(2, 'Child Info');
    if (birthYear && birthMonth) {
      const ageMonths = ((new Date().getFullYear() - parseInt(birthYear)) * 12) + (new Date().getMonth() + 1 - parseInt(birthMonth));
      analytics.setChildInfo({ age_months: ageMonths });
    }
    setStep(3);
  };

  // Auto-advance Step 2 when all fields filled
  useEffect(() => {
    if (step === 2 && name && birthMonth && birthYear && heightFt && heightIn && weight) {
      const t = setTimeout(saveChildInfo, 600);
      return () => clearTimeout(t);
    }
  }, [step, name, birthMonth, birthYear, heightFt, heightIn, weight]);

  // Step 3: Daily Habits — save and advance
  const saveHabits = () => {
    localStorage.setItem('sleepHours', sleepHours);
    localStorage.setItem('bedtime', bedtime);
    localStorage.setItem('dairy', dairy);
    localStorage.setItem('exercise', exercise);
    localStorage.setItem('screenTime', screenTime);
    localStorage.setItem('processedFoods', processedFoods);
    analytics.onboardingStep(3, 'Daily Habits');
    setStep(4);
  };

  // Auto-advance Step 3 when all selections made
  useEffect(() => {
    if (step === 3 && sleepHours && bedtime && dairy && exercise && screenTime && processedFoods) {
      const t = setTimeout(saveHabits, 600);
      return () => clearTimeout(t);
    }
  }, [step, sleepHours, bedtime, dairy, exercise, screenTime, processedFoods]);

  // Height calculation helpers
  const toInches = (ft: string, inches: string) => (parseInt(ft) * 12) + parseInt(inches);
  const toCm = (totalInches: number) => totalInches * 2.54;

  const canCalculateHeight = childGender && motherHeightFt && motherHeightIn && fatherHeightFt && fatherHeightIn;

  const geneticTargetCm = canCalculateHeight ? (() => {
    const motherCm = toCm(toInches(motherHeightFt, motherHeightIn));
    const fatherCm = toCm(toInches(fatherHeightFt, fatherHeightIn));
    if (childGender === 'boy') return (fatherCm + (motherCm + 13)) / 2;
    return ((fatherCm - 13) + motherCm) / 2;
  })() : null;

  // Ensure the profile has trial subscription_status so the middleware allows access
  const ensureProfileAccess = async () => {
    const email = userEmail || localStorage.getItem('biokids_auth_email') || '';
    const uid = userId || localStorage.getItem('biokids_auth_user_id') || '';
    if (uid && email) {
      try {
        await fetch('/api/auth/create-profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: uid, email }),
        });
      } catch {}
    }
  };

  // Step 5: Height Potential — save and go to home
  const handleHeightSubmit = async () => {
    if (geneticTargetCm) {
      localStorage.setItem('childGender', childGender);
      localStorage.setItem('motherHeight', `${motherHeightFt}'${motherHeightIn}"`);
      localStorage.setItem('fatherHeight', `${fatherHeightFt}'${fatherHeightIn}"`);
      localStorage.setItem('geneticTarget', geneticTargetCm.toString());
    }
    localStorage.setItem('biokids_onboarding_complete', 'true');
    analytics.onboardingStep(5, 'Height Potential');
    analytics.onboardingComplete();
    if (childGender) analytics.setChildInfo({ gender: childGender });
    await ensureProfileAccess();
    router.push('/home');
  };

  // Auto-advance Step 5 when all height fields filled
  useEffect(() => {
    if (step === 5 && canCalculateHeight && geneticTargetCm) {
      const t = setTimeout(handleHeightSubmit, 1200); // slightly longer to show result
      return () => clearTimeout(t);
    }
  }, [step, canCalculateHeight, geneticTargetCm]);

  // Complete onboarding (when height data already exists from landing page)
  const completeOnboarding = async () => {
    localStorage.setItem('biokids_onboarding_complete', 'true');
    await ensureProfileAccess();
    router.push('/home');
  };

  // Shared styles
  const inputStyle: React.CSSProperties = {
    fontFamily: mono, fontSize: 14, width: '100%',
    padding: '0.75rem 1rem', borderRadius: 10,
    border: '1px solid #d6d3d1', outline: 'none',
    color: '#1c1917', background: '#fff',
  };
  const labelStyle: React.CSSProperties = {
    fontFamily: mono, fontSize: 12, fontWeight: 600,
    color: '#57534e', display: 'block', marginBottom: 4,
  };
  const chipStyle = (active: boolean): React.CSSProperties => ({
    fontFamily: mono, fontSize: 13, fontWeight: 600,
    padding: '0.75rem 1rem', borderRadius: 10, cursor: 'pointer',
    border: active ? '2px solid #065f46' : '1px solid #d6d3d1',
    background: active ? '#ecfdf5' : '#fff',
    color: active ? '#065f46' : '#57534e',
    transition: 'all 0.2s ease', textAlign: 'center',
  });
  const btnStyle = (disabled?: boolean): React.CSSProperties => ({
    fontFamily: mono, fontSize: 15, fontWeight: 700,
    width: '100%', padding: '0.875rem', borderRadius: 12,
    border: 'none', cursor: disabled ? 'not-allowed' : 'pointer',
    background: disabled ? '#d6d3d1' : '#065f46',
    color: disabled ? '#a8a29e' : '#fff',
    transition: 'all 0.2s ease', marginTop: 24,
  });

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fafaf9', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <style>{`
        @keyframes stepPulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.15); }
          100% { transform: scale(1); }
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div style={{ width: '100%', maxWidth: 440 }}>

        {/* Progress Bar */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 6, marginBottom: 8 }}>
            {Array.from({ length: totalSteps }, (_, i) => i + 1).map((s) => (
              <div
                key={s}
                style={{
                  flex: 1, height: 6, borderRadius: 3,
                  background: s < step ? '#065f46' : s === step ? '#065f46' : '#e7e5e4',
                  opacity: s < step ? 0.5 : s === step ? 1 : 0.4,
                  transition: 'all 0.4s ease',
                  animation: s === step ? 'stepPulse 0.5s ease' : 'none',
                }}
              />
            ))}
          </div>
          <p style={{ textAlign: 'center', fontSize: 11, color: '#a8a29e', fontFamily: mono }}>Step {step} of {totalSteps}</p>
        </div>

        {/* ========== Step 1: Create Account ========== */}
        {step === 1 && (
          <div style={{
            background: '#fff', borderRadius: 20, border: '1px solid #e7e5e4',
            padding: '2rem 1.5rem', animation: 'fadeSlideIn 0.4s ease',
          }}>
            <h2 style={{ fontFamily: mono, fontSize: 20, fontWeight: 800, color: '#1c1917', marginBottom: 6, textAlign: 'center' }}>
              Create your account
            </h2>
            <span style={{ display: 'inline-block', fontSize: 9, fontWeight: 700, color: '#fff', background: '#065f46', borderRadius: 4, padding: '2px 6px', letterSpacing: '0.08em', marginBottom: 12 }}>BETA</span>
            <p style={{ fontFamily: mono, fontSize: 12, color: '#78716c', marginBottom: 24, textAlign: 'center', lineHeight: 1.6 }}>
              Free access to the full protocol. No credit card needed.
            </p>

            {/* Social Login Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
              <button
                type="button"
                onClick={async () => {
                  const supabase = createClient();
                  if (!supabase) return;
                  // Store redirect destination in cookie (Supabase rejects query params in redirectTo)
                  document.cookie = 'post_auth_redirect=/onboarding?step=2; path=/; max-age=600; SameSite=Lax';
                  await supabase.auth.signInWithOAuth({
                    provider: 'google',
                    options: { redirectTo: `${window.location.origin}/auth/callback` },
                  });
                }}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  width: '100%', padding: '0.75rem', borderRadius: 12,
                  border: '1px solid #d6d3d1', background: '#fff',
                  fontFamily: mono, fontSize: 14, fontWeight: 600,
                  color: '#1c1917', cursor: 'pointer', transition: 'all 0.2s',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
                Continue with Google
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ flex: 1, height: 1, background: '#e7e5e4' }} />
              <span style={{ fontFamily: mono, fontSize: 11, color: '#a8a29e' }}>or</span>
              <div style={{ flex: 1, height: 1, background: '#e7e5e4' }} />
            </div>

            {signupError && (
              <div style={{ background: '#fef2f2', color: '#dc2626', padding: '0.75rem 1rem', borderRadius: 12, fontSize: 13, fontFamily: mono, marginBottom: 20 }}>
                {signupError}
              </div>
            )}

            <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={labelStyle}>Email</label>
                <input
                  type="email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  style={inputStyle}
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div>
                <label style={labelStyle}>Password</label>
                <input
                  type="password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  style={inputStyle}
                  placeholder="At least 8 characters"
                  required
                  minLength={8}
                />
              </div>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: 8, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  style={{ marginTop: 3, width: 16, height: 16, accentColor: '#065f46' }}
                  required
                />
                <span style={{ fontFamily: mono, fontSize: 12, color: '#78716c', lineHeight: 1.5 }}>
                  I agree to the{' '}
                  <Link href="/terms" target="_blank" rel="noopener noreferrer" style={{ color: '#065f46', fontWeight: 600, textDecoration: 'none' }}>Terms</Link>
                  {' '}and{' '}
                  <Link href="/privacy" target="_blank" rel="noopener noreferrer" style={{ color: '#065f46', fontWeight: 600, textDecoration: 'none' }}>Privacy Policy</Link>
                </span>
              </label>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: 8, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={newsletterOptIn}
                  onChange={(e) => setNewsletterOptIn(e.target.checked)}
                  style={{ marginTop: 3, width: 16, height: 16, accentColor: '#065f46' }}
                />
                <span style={{ fontFamily: mono, fontSize: 12, color: '#78716c', lineHeight: 1.5 }}>
                  Send me weekly growth tips and protocol updates
                </span>
              </label>
              <button
                type="submit"
                style={btnStyle(signupLoading || !agreedToTerms)}
                disabled={signupLoading || !agreedToTerms}
              >
                {signupLoading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>

            <p style={{ textAlign: 'center', fontFamily: mono, fontSize: 12, color: '#a8a29e', marginTop: 20 }}>
              Already have an account?{' '}
              <Link href="/login" style={{ color: '#065f46', fontWeight: 600, textDecoration: 'none' }}>Log in</Link>
            </p>
          </div>
        )}

        {/* ========== Step 2: Child Info ========== */}
        {step === 2 && (
          <div style={{
            background: '#fff', borderRadius: 20, border: '1px solid #e7e5e4',
            padding: '2rem 1.5rem', animation: 'fadeSlideIn 0.4s ease',
          }}>
            <h2 style={{ fontFamily: mono, fontSize: 20, fontWeight: 800, color: '#1c1917', marginBottom: 6 }}>Tell us about your child</h2>
            <p style={{ fontFamily: mono, fontSize: 12, color: '#a8a29e', marginBottom: 24 }}>
              For privacy, consider using just a first initial.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={labelStyle}>Name or Initial</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="E.g., Emma or E"
                  style={inputStyle}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={labelStyle}>Birth Month</label>
                  <select value={birthMonth} onChange={(e) => setBirthMonth(e.target.value)} style={inputStyle} required>
                    <option value="">Month</option>
                    {months.map((month, i) => (
                      <option key={month} value={i + 1}>{month}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Birth Year</label>
                  <select value={birthYear} onChange={(e) => setBirthYear(e.target.value)} style={inputStyle} required>
                    <option value="">Year</option>
                    {years.map((year) => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                <div>
                  <label style={labelStyle}>Height (ft)</label>
                  <select value={heightFt} onChange={(e) => setHeightFt(e.target.value)} style={inputStyle} required>
                    <option value="">Ft</option>
                    {[2, 3, 4, 5, 6].map((ft) => (
                      <option key={ft} value={ft}>{ft}&apos;</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Height (in)</label>
                  <select value={heightIn} onChange={(e) => setHeightIn(e.target.value)} style={inputStyle} required>
                    <option value="">In</option>
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i} value={i}>{i}&quot;</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Weight (lbs)</label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="lbs"
                    style={inputStyle}
                    required
                  />
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ========== Step 3: Daily Habits ========== */}
        {step === 3 && (
          <div style={{
            background: '#fff', borderRadius: 20, border: '1px solid #e7e5e4',
            padding: '2rem 1.5rem', animation: 'fadeSlideIn 0.4s ease',
          }}>
            <h2 style={{ fontFamily: mono, fontSize: 20, fontWeight: 800, color: '#1c1917', marginBottom: 6 }}>
              Help us understand {name || 'your child'}&apos;s day
            </h2>
            <p style={{ fontFamily: mono, fontSize: 12, color: '#a8a29e', marginBottom: 24 }}>
              You know {name || 'your child'} best. This helps us tailor the protocol.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <label style={labelStyle}>How many hours of sleep does {name || 'your child'} get?</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {['8 or less', '9-10', '11-12', '12+'].map((option) => (
                    <button key={option} type="button" onClick={() => setSleepHours(option)} style={chipStyle(sleepHours === option)}>
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={labelStyle}>Usual bedtime?</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                  {['Before 8pm', '8-9pm', 'After 9pm'].map((option) => (
                    <button key={option} type="button" onClick={() => setBedtime(option)} style={chipStyle(bedtime === option)}>
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={labelStyle}>Does {name || 'your child'} have dairy daily?</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                  {['Yes', 'Sometimes', 'No'].map((option) => (
                    <button key={option} type="button" onClick={() => setDairy(option)} style={chipStyle(dairy === option)}>
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={labelStyle}>How often does {name || 'your child'} run or play hard?</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                  {['Daily', 'Few times/wk', 'Rarely'].map((option) => (
                    <button key={option} type="button" onClick={() => setExercise(option)} style={chipStyle(exercise === option)}>
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={labelStyle}>Screen time before bed?</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                  {['None', 'Some', 'A lot'].map((option) => (
                    <button key={option} type="button" onClick={() => setScreenTime(option)} style={chipStyle(screenTime === option)}>
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={labelStyle}>How often does {name || 'your child'} eat processed foods?</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                  {['Rarely', 'Sometimes', 'Often'].map((option) => (
                    <button key={option} type="button" onClick={() => setProcessedFoods(option)} style={chipStyle(processedFoods === option)}>
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ========== Step 4: Goal Selection ========== */}
        {step === 4 && (
          <div style={{ animation: 'fadeSlideIn 0.4s ease' }}>
            <GoalSelection
              childName={name || 'Your child'}
              onSelect={(goal) => {
                localStorage.setItem('biokids_goal', JSON.stringify({
                  goal,
                  date: new Date().toISOString(),
                }));
                analytics.onboardingStep(4, 'Goal Selection');
                analytics.setChildInfo({ goal });
                if (hasHeightData) {
                  // Height data already saved from landing page — go straight to home
                  completeOnboarding();
                } else {
                  setStep(5); // → Height Potential
                }
              }}
            />
          </div>
        )}

        {/* ========== Step 5: Height Potential (only if not from landing page) ========== */}
        {step === 5 && !hasHeightData && (
          <div style={{
            background: '#fff', borderRadius: 20, border: '1px solid #e7e5e4',
            padding: '2rem 1.5rem', animation: 'fadeSlideIn 0.4s ease',
          }}>
            <p style={{ fontFamily: mono, fontSize: 10, color: '#065f46', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: 8 }}>
              This is what&apos;s possible
            </p>
            <h2 style={{ fontFamily: mono, fontSize: 22, fontWeight: 800, color: '#1c1917', marginBottom: 6 }}>
              {name || 'Your child'}&apos;s growth potential
            </h2>
            <p style={{ fontFamily: mono, fontSize: 12, color: '#78716c', marginBottom: 24, lineHeight: 1.6 }}>
              Enter parent heights and we&apos;ll show you where {name || 'your child'} could land.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={labelStyle}>Child&apos;s gender</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {[{ value: 'boy' as const, label: 'Boy' }, { value: 'girl' as const, label: 'Girl' }].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setChildGender(option.value)}
                      style={chipStyle(childGender === option.value)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={labelStyle}>Mother&apos;s height</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  <select value={motherHeightFt} onChange={(e) => setMotherHeightFt(e.target.value)} style={inputStyle}>
                    <option value="">Ft</option>
                    {[4, 5, 6].map((ft) => (
                      <option key={ft} value={ft}>{ft}&apos;</option>
                    ))}
                  </select>
                  <select value={motherHeightIn} onChange={(e) => setMotherHeightIn(e.target.value)} style={inputStyle}>
                    <option value="">In</option>
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i} value={i}>{i}&quot;</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label style={labelStyle}>Father&apos;s height</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  <select value={fatherHeightFt} onChange={(e) => setFatherHeightFt(e.target.value)} style={inputStyle}>
                    <option value="">Ft</option>
                    {[5, 6, 7].map((ft) => (
                      <option key={ft} value={ft}>{ft}&apos;</option>
                    ))}
                  </select>
                  <select value={fatherHeightIn} onChange={(e) => setFatherHeightIn(e.target.value)} style={inputStyle}>
                    <option value="">In</option>
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i} value={i}>{i}&quot;</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {geneticTargetCm && (
              <HeightPotentialCalculator
                geneticTargetCm={geneticTargetCm}
                motherHeight={`${motherHeightFt}'${motherHeightIn}"`}
                fatherHeight={`${fatherHeightFt}'${fatherHeightIn}"`}
              />
            )}

            <button
              type="button"
              onClick={handleHeightSubmit}
              disabled={!canCalculateHeight}
              style={btnStyle(!canCalculateHeight)}
            >
              See my protocol
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default function Onboarding() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', backgroundColor: '#fafaf9', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
        <div style={{ fontFamily: "'Courier New', Courier, monospace", color: '#a8a29e', fontSize: 13 }}>Loading...</div>
      </div>
    }>
      <OnboardingContent />
    </Suspense>
  );
}
