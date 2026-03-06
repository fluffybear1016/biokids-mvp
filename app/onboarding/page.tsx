'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Script from 'next/script';
import GoalSelection from '@/components/GoalSelection';
import HeightPotentialCalculator from '@/components/HeightPotentialCalculator';
import { createClient } from '@/lib/supabase';
import { Suspense } from 'react';

// Shared styles
const mono = "'Courier New', Courier, monospace";

function OnboardingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);

  // Step 1: Child Info
  const [name, setName] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [heightFt, setHeightFt] = useState('');
  const [heightIn, setHeightIn] = useState('');
  const [weight, setWeight] = useState('');

  // Step 2: Questions
  const [userEmail, setUserEmail] = useState('');
  const [userId, setUserId] = useState('');

  // Auth info for Stripe
  const [sleepHours, setSleepHours] = useState('');
  const [bedtime, setBedtime] = useState('');
  const [dairy, setDairy] = useState('');
  const [exercise, setExercise] = useState('');
  const [screenTime, setScreenTime] = useState('');
  const [processedFoods, setProcessedFoods] = useState('');

  // Step 4: Height Potential
  const [childGender, setChildGender] = useState<'boy' | 'girl' | ''>('');
  const [motherHeightFt, setMotherHeightFt] = useState('');
  const [motherHeightIn, setMotherHeightIn] = useState('');
  const [fatherHeightFt, setFatherHeightFt] = useState('');
  const [fatherHeightIn, setFatherHeightIn] = useState('');
  // Step 5: Account Creation
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);
  const [signupError, setSignupError] = useState('');

  // Read ?step= URL param to allow resuming onboarding
  useEffect(() => {
    const stepParam = searchParams.get('step');
    if (stepParam) {
      const parsed = parseInt(stepParam, 10);
      if (parsed >= 1 && parsed <= 6) {
        setStep(parsed);
        // Restore child name from localStorage for display in later steps
        const savedName = localStorage.getItem('childName');
        if (savedName) setName(savedName);
      }
    }
  }, [searchParams]);

  // Fetch authenticated user info for Stripe
  useEffect(() => {
    const supabase = createClient();
    if (supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          setUserEmail(session.user.email || '');
          setUserId(session.user.id);
          return;
        }
        // Fallback to localStorage if session not available (e.g. email confirmation pending)
        setUserEmail(localStorage.getItem('biokids_auth_email') || '');
        setUserId(localStorage.getItem('biokids_auth_user_id') || '');
      });
    } else {
      setUserEmail(localStorage.getItem('biokids_auth_email') || '');
      setUserId(localStorage.getItem('biokids_auth_user_id') || '');
    }
  }, []);

  // Generate year options (current year down to 25 years ago)
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

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store BMI for personalization (not shown to user)
    const bmi = calculateBMI();
    if (bmi) {
      localStorage.setItem('childBMI', bmi.toString());
    }
    localStorage.setItem('childName', name);
    localStorage.setItem('childBirthMonth', birthMonth);
    localStorage.setItem('childBirthYear', birthYear);

    // Save child name to Supabase auth metadata so it persists across devices
    const supabase = createClient();
    if (supabase) {
      supabase.auth.updateUser({ data: { child_name: name } }).catch(() => {});
    }

    // Also save to children table
    if (userId) {
      const birthDate = birthYear && birthMonth
        ? `${birthYear}-${birthMonth.padStart(2, '0')}-01`
        : null;
      fetch('/api/auth/save-child', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, name, birthDate }),
      }).catch(() => {}); // fire-and-forget
    }

    setStep(2);
  };

  const toInches = (ft: string, inches: string) => (parseInt(ft) * 12) + parseInt(inches);
  const toCm = (totalInches: number) => totalInches * 2.54;

  const canCalculateHeight = childGender && motherHeightFt && motherHeightIn && fatherHeightFt && fatherHeightIn;

  const geneticTargetCm = canCalculateHeight ? (() => {
    const motherCm = toCm(toInches(motherHeightFt, motherHeightIn));
    const fatherCm = toCm(toInches(fatherHeightFt, fatherHeightIn));
    if (childGender === 'boy') return (fatherCm + (motherCm + 13)) / 2;
    return ((fatherCm - 13) + motherCm) / 2;
  })() : null;

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('sleepHours', sleepHours);
    localStorage.setItem('bedtime', bedtime);
    localStorage.setItem('dairy', dairy);
    localStorage.setItem('exercise', exercise);
    localStorage.setItem('screenTime', screenTime);
    localStorage.setItem('processedFoods', processedFoods);
    setStep(3);
  };

  const handleStep4Submit = () => {
    if (geneticTargetCm) {
      localStorage.setItem('childGender', childGender);
      localStorage.setItem('motherHeight', `${motherHeightFt}'${motherHeightIn}"`);
      localStorage.setItem('fatherHeight', `${fatherHeightFt}'${fatherHeightIn}"`);
      localStorage.setItem('geneticTarget', geneticTargetCm.toString());
    }
    // Mark onboarding as complete (user is about to see account creation)
    localStorage.setItem('biokids_onboarding_complete', 'true');
    setStep(5);
  };

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

        // Save child name to Supabase auth metadata
        supabase.auth.updateUser({ data: { child_name: name } }).catch(() => {});

        // Save child to children table
        const birthDate = birthYear && birthMonth
          ? `${birthYear}-${birthMonth.padStart(2, '0')}-01`
          : null;
        fetch('/api/auth/save-child', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: data.user.id, name, birthDate }),
        }).catch(() => {});

        setStep(6);
      }
    } catch (err) {
      console.error('Signup error:', err);
      setSignupError('An error occurred. Please try again.');
    } finally {
      setSignupLoading(false);
    }
  };

  // Shared input style
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

        {/* Progress Bar — micro-interactions */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 6, marginBottom: 8 }}>
            {[1, 2, 3, 4, 5, 6].map((s) => (
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
          <p style={{ textAlign: 'center', fontSize: 11, color: '#a8a29e', fontFamily: mono }}>Step {step} of 6</p>
        </div>

        {/* Step 1: Child Info */}
        {step === 1 && (
          <form onSubmit={handleStep1Submit} style={{
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

            <button type="submit" style={btnStyle()}>
              Continue
            </button>
          </form>
        )}

        {/* Step 2: Understanding their day */}
        {step === 2 && (
          <form onSubmit={handleStep2Submit} style={{
            background: '#fff', borderRadius: 20, border: '1px solid #e7e5e4',
            padding: '2rem 1.5rem', animation: 'fadeSlideIn 0.4s ease',
          }}>
            <h2 style={{ fontFamily: mono, fontSize: 20, fontWeight: 800, color: '#1c1917', marginBottom: 6 }}>
              Help us understand {name}&apos;s day
            </h2>
            <p style={{ fontFamily: mono, fontSize: 12, color: '#a8a29e', marginBottom: 24 }}>
              You know {name} best. This helps us tailor the protocol.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <label style={labelStyle}>How many hours of sleep does {name} get?</label>
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
                <label style={labelStyle}>Does {name} have dairy daily?</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                  {['Yes', 'Sometimes', 'No'].map((option) => (
                    <button key={option} type="button" onClick={() => setDairy(option)} style={chipStyle(dairy === option)}>
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={labelStyle}>How often does {name} run or play hard?</label>
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
                <label style={labelStyle}>How often does {name} eat processed foods?</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                  {['Rarely', 'Sometimes', 'Often'].map((option) => (
                    <button key={option} type="button" onClick={() => setProcessedFoods(option)} style={chipStyle(processedFoods === option)}>
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={!sleepHours || !bedtime || !dairy || !exercise || !screenTime || !processedFoods}
              style={btnStyle(!sleepHours || !bedtime || !dairy || !exercise || !screenTime || !processedFoods)}
            >
              Continue
            </button>
          </form>
        )}

        {/* Step 3: Goal Selection */}
        {step === 3 && (
          <div style={{ animation: 'fadeSlideIn 0.4s ease' }}>
            <GoalSelection
              childName={name || 'Your child'}
              onSelect={(goal) => {
                localStorage.setItem('biokids_goal', JSON.stringify({
                  goal,
                  date: new Date().toISOString(),
                }));
                setStep(4);
              }}
            />
          </div>
        )}

        {/* Step 4: Height Potential — the emotional peak */}
        {step === 4 && (
          <div style={{
            background: '#fff', borderRadius: 20, border: '1px solid #e7e5e4',
            padding: '2rem 1.5rem', animation: 'fadeSlideIn 0.4s ease',
          }}>
            <p style={{ fontFamily: mono, fontSize: 10, color: '#065f46', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: 8 }}>
              This is what&apos;s possible
            </p>
            <h2 style={{ fontFamily: mono, fontSize: 22, fontWeight: 800, color: '#1c1917', marginBottom: 6 }}>
              {name}&apos;s growth potential
            </h2>
            <p style={{ fontFamily: mono, fontSize: 12, color: '#78716c', marginBottom: 24, lineHeight: 1.6 }}>
              Enter parent heights and we&apos;ll show you where {name} could land.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Gender */}
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

              {/* Mother's Height */}
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

              {/* Father's Height */}
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

            {/* Height Visualization */}
            {geneticTargetCm && (
              <HeightPotentialCalculator
                geneticTargetCm={geneticTargetCm}
                motherHeight={`${motherHeightFt}'${motherHeightIn}"`}
                fatherHeight={`${fatherHeightFt}'${fatherHeightIn}"`}
              />
            )}

            <button
              type="button"
              onClick={handleStep4Submit}
              disabled={!canCalculateHeight}
              style={btnStyle(!canCalculateHeight)}
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 5: Create Account */}
        {step === 5 && (
          <div style={{
            background: '#fff', borderRadius: 20, border: '1px solid #e7e5e4',
            padding: '2rem 1.5rem', animation: 'fadeSlideIn 0.4s ease',
          }}>
            <h2 style={{ fontFamily: mono, fontSize: 20, fontWeight: 800, color: '#1c1917', marginBottom: 6, textAlign: 'center' }}>
              Create your account
            </h2>
            <p style={{ fontFamily: mono, fontSize: 12, color: '#78716c', marginBottom: 24, textAlign: 'center', lineHeight: 1.6 }}>
              One last step before we build {name || 'your child'}&apos;s protocol.
            </p>

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

        {/* Step 6: Stripe Pricing Table */}
        {step === 6 && (
          <div style={{
            background: '#fff', borderRadius: 20, border: '1px solid #e7e5e4',
            padding: '2rem 1.5rem', animation: 'fadeSlideIn 0.4s ease',
          }}>
            <h2 style={{ fontFamily: mono, fontSize: 20, fontWeight: 800, color: '#1c1917', marginBottom: 6, textAlign: 'center' }}>
              Start {name || 'your child'}&apos;s protocol
            </h2>
            <p style={{ fontFamily: mono, fontSize: 12, color: '#78716c', textAlign: 'center', marginBottom: 20, lineHeight: 1.6 }}>
              7-day free trial. Cancel anytime.
            </p>
            <Script
              async
              src="https://js.stripe.com/v3/pricing-table.js"
              strategy="lazyOnload"
            />
            {/* @ts-expect-error Stripe pricing table is a custom element */}
            <stripe-pricing-table
              pricing-table-id="prctbl_1T21I73eI33ypy3JzXLrhay1"
              publishable-key="pk_live_51Sw3RG3eI33ypy3JUaKVJ6RY9Xw5ear1j1eQQOp81v6YSc63XuihA4vSoANrCMLemY13GxAi0fT3x7JgFglHmGTn00W88YoFKE"
              customer-email={userEmail || undefined}
              client-reference-id={userId || undefined}
            />
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
