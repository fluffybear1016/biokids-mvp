'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Script from 'next/script';
import GoalSelection from '@/components/GoalSelection';
import type { GoalType } from '@/components/GoalSelection';
import { createClient } from '@/lib/supabase';
import { Suspense } from 'react';

function OnboardingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);

  // Step 1: Goal
  const [goal, setGoal] = useState<GoalType | ''>('');

  // Step 2: Child Info
  const [name, setName] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [heightFt, setHeightFt] = useState('');
  const [heightIn, setHeightIn] = useState('');
  const [weight, setWeight] = useState('');
  const [childGender, setChildGender] = useState<'boy' | 'girl' | ''>('');

  // Step 3: Quick Questions
  const [sleepHours, setSleepHours] = useState('');
  const [dairy, setDairy] = useState('');
  const [exercise, setExercise] = useState('');
  const [screenTime, setScreenTime] = useState('');

  // Step 4: Height Potential
  const [motherHeightFt, setMotherHeightFt] = useState('');
  const [motherHeightIn, setMotherHeightIn] = useState('');
  const [fatherHeightFt, setFatherHeightFt] = useState('');
  const [fatherHeightIn, setFatherHeightIn] = useState('');
  const [showScience, setShowScience] = useState(false);

  // Step 5: Account Creation
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Auth state (set after account creation)
  const [userEmail, setUserEmail] = useState('');
  const [userId, setUserId] = useState('');

  // Handle ?step= URL param for resuming (only steps 5+ if auth exists)
  useEffect(() => {
    const stepParam = searchParams.get('step');
    if (stepParam) {
      const parsed = parseInt(stepParam, 10);
      if (parsed >= 5 && parsed <= 7) {
        // Only allow resuming post-auth steps if we have auth
        const supabase = createClient();
        if (supabase) {
          supabase.auth.getSession().then(({ data: { session } }) => {
            if (session?.user) {
              setUserEmail(session.user.email || '');
              setUserId(session.user.id);
              setName(localStorage.getItem('childName') || '');
              setStep(parsed);
            }
          });
        } else {
          const savedUserId = localStorage.getItem('biokids_auth_user_id');
          if (savedUserId) {
            setUserEmail(localStorage.getItem('biokids_auth_email') || '');
            setUserId(savedUserId);
            setName(localStorage.getItem('childName') || '');
            setStep(parsed);
          }
        }
      }
    }
  }, [searchParams]);

  // Year/month options
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 26 }, (_, i) => currentYear - i);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Height calculation helpers
  const toInches = (ft: string, inches: string) => (parseInt(ft) * 12) + parseInt(inches);
  const toCm = (totalInches: number) => totalInches * 2.54;
  const cmToFtIn = (cm: number) => {
    const totalIn = Math.round(cm / 2.54);
    return `${Math.floor(totalIn / 12)}'${totalIn % 12}"`;
  };
  const formatParentHeight = (ft: string, inches: string) => `${ft}'${inches}"`;

  const calculateBMI = () => {
    if (!heightFt || !heightIn || !weight) return null;
    const totalInches = (parseInt(heightFt) * 12) + parseInt(heightIn);
    const heightM = totalInches * 0.0254;
    const weightKg = parseInt(weight) * 0.453592;
    return weightKg / (heightM * heightM);
  };

  const canCalculateHeight = childGender && motherHeightFt && motherHeightIn && fatherHeightFt && fatherHeightIn;

  const geneticTargetCm = canCalculateHeight ? (() => {
    const motherCm = toCm(toInches(motherHeightFt, motherHeightIn));
    const fatherCm = toCm(toInches(fatherHeightFt, fatherHeightIn));
    if (childGender === 'boy') return (fatherCm + (motherCm + 13)) / 2;
    return ((fatherCm - 13) + motherCm) / 2;
  })() : null;

  // Step handlers
  const handleGoalSelect = (selectedGoal: GoalType) => {
    setGoal(selectedGoal);
    setStep(2);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const handleStep3Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(4);
  };

  const handleStep4Submit = () => {
    setStep(5);
  };

  const handleAccountCreate = async (e: React.FormEvent) => {
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

      // 1. Create Supabase account
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }

      if (!data.user) {
        setError('Account creation failed. Please try again.');
        setLoading(false);
        return;
      }

      const newUserId = data.user.id;
      setUserEmail(email);
      setUserId(newUserId);

      // 2. Create profile row
      await fetch('/api/auth/create-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: newUserId, email }),
      });

      // 3. Save child to children table
      const birthDate = birthYear && birthMonth
        ? `${birthYear}-${birthMonth.padStart(2, '0')}-01`
        : null;
      await fetch('/api/auth/save-child', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: newUserId, name, birthDate }),
      });

      // 4. Save all onboarding data to auth metadata
      const bmi = calculateBMI();
      await supabase.auth.updateUser({
        data: {
          child_name: name,
          goal,
          sleepHours,
          dairy,
          exercise,
          screenTime,
          childGender,
          motherHeight: `${motherHeightFt}'${motherHeightIn}"`,
          fatherHeight: `${fatherHeightFt}'${fatherHeightIn}"`,
          geneticTarget: geneticTargetCm?.toString() || '',
        },
      });

      // 5. Write all values to localStorage
      localStorage.setItem('childName', name);
      localStorage.setItem('childBirthMonth', birthMonth);
      localStorage.setItem('childBirthYear', birthYear);
      if (bmi) localStorage.setItem('childBMI', bmi.toString());
      localStorage.setItem('sleepHours', sleepHours);
      localStorage.setItem('dairy', dairy);
      localStorage.setItem('exercise', exercise);
      localStorage.setItem('screenTime', screenTime);
      localStorage.setItem('biokids_goal', JSON.stringify({ goal, date: new Date().toISOString() }));
      localStorage.setItem('childGender', childGender);
      if (motherHeightFt && motherHeightIn) {
        localStorage.setItem('motherHeight', `${motherHeightFt}'${motherHeightIn}"`);
      }
      if (fatherHeightFt && fatherHeightIn) {
        localStorage.setItem('fatherHeight', `${fatherHeightFt}'${fatherHeightIn}"`);
      }
      if (geneticTargetCm) {
        localStorage.setItem('geneticTarget', geneticTargetCm.toString());
      }
      localStorage.setItem('biokids_onboarding_complete', 'true');
      localStorage.setItem('biokids_auth_email', email);
      localStorage.setItem('biokids_auth_user_id', newUserId);

      // 6. Advance to Stripe checkout
      setStep(6);
    } catch (err) {
      console.error('Account creation error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const totalSteps = 7;

  return (
    <div className="min-h-screen bg-[#FFFDF7] flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Progress Bar */}
        {step <= 6 && (
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {Array.from({ length: totalSteps }, (_, i) => i + 1).map((s) => (
                <div
                  key={s}
                  className={`flex-1 h-2 rounded-full mx-0.5 ${
                    s <= step ? 'bg-emerald-600' : 'bg-stone-200'
                  }`}
                />
              ))}
            </div>
            <p className="text-center text-sm text-stone-500">Step {step} of {totalSteps}</p>
          </div>
        )}

        {/* Step 1: Goal Selection */}
        {step === 1 && (
          <GoalSelection onSelect={handleGoalSelect} />
        )}

        {/* Step 2: Child Info */}
        {step === 2 && (
          <form onSubmit={handleStep2Submit} className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6">
            <h2 className="text-2xl font-semibold text-stone-900 mb-2">Tell us about your child</h2>
            <p className="text-sm text-stone-500 mb-6">
              For privacy, consider using just your child's first initial.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Name or Initial</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="E.g., Emma or E"
                  className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Birth Month</label>
                  <select
                    value={birthMonth}
                    onChange={(e) => setBirthMonth(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  >
                    <option value="">Month</option>
                    {months.map((month, i) => (
                      <option key={month} value={i + 1}>{month}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Birth Year</label>
                  <select
                    value={birthYear}
                    onChange={(e) => setBirthYear(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  >
                    <option value="">Year</option>
                    {years.map((year) => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Height (ft)</label>
                  <select
                    value={heightFt}
                    onChange={(e) => setHeightFt(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  >
                    <option value="">Ft</option>
                    {[2, 3, 4, 5, 6].map((ft) => (
                      <option key={ft} value={ft}>{ft}&apos;</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Height (in)</label>
                  <select
                    value={heightIn}
                    onChange={(e) => setHeightIn(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  >
                    <option value="">In</option>
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i} value={i}>{i}&quot;</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Weight (lbs)</label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="lbs"
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  />
                </div>
              </div>

              {/* Sex */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Sex</label>
                <div className="grid grid-cols-2 gap-2">
                  {[{ value: 'girl' as const, label: 'Female' }, { value: 'boy' as const, label: 'Male' }].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setChildGender(option.value)}
                      className={`py-3 px-4 rounded-lg border text-sm font-medium transition-colors ${
                        childGender === option.value
                          ? 'bg-emerald-50 border-emerald-600 text-emerald-700'
                          : 'border-stone-300 text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={!childGender}
              className="w-full mt-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors disabled:bg-stone-300 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </form>
        )}

        {/* Step 3: Quick Questions */}
        {step === 3 && (
          <form onSubmit={handleStep3Submit} className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6">
            <h2 className="text-2xl font-semibold text-stone-900 mb-2">A few quick questions</h2>
            <p className="text-sm text-stone-500 mb-6">
              This helps us personalize {name || 'your child'}&apos;s protocol.
            </p>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  How many hours of sleep does {name || 'your child'} get each night?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['8 or less', '9-10', '11-12', '12+'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setSleepHours(option)}
                      className={`py-3 px-4 rounded-lg border text-sm font-medium transition-colors ${
                        sleepHours === option
                          ? 'bg-emerald-50 border-emerald-600 text-emerald-700'
                          : 'border-stone-300 text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Does {name || 'your child'} consume dairy daily?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Yes', 'Sometimes', 'No'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setDairy(option)}
                      className={`py-3 px-4 rounded-lg border text-sm font-medium transition-colors ${
                        dairy === option
                          ? 'bg-emerald-50 border-emerald-600 text-emerald-700'
                          : 'border-stone-300 text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  How often does {name || 'your child'} run or play hard?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {['Daily', 'Few times a week', 'Rarely'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setExercise(option)}
                      className={`py-3 px-4 rounded-lg border text-sm font-medium transition-colors ${
                        exercise === option
                          ? 'bg-emerald-50 border-emerald-600 text-emerald-700'
                          : 'border-stone-300 text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Screen time before bed?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['None', 'Some', 'A lot'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setScreenTime(option)}
                      className={`py-3 px-4 rounded-lg border text-sm font-medium transition-colors ${
                        screenTime === option
                          ? 'bg-emerald-50 border-emerald-600 text-emerald-700'
                          : 'border-stone-300 text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={!sleepHours || !dairy || !exercise || !screenTime}
              className="w-full mt-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors disabled:bg-stone-300 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </form>
        )}

        {/* Step 4: Height Potential */}
        {step === 4 && (
          <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6">
            <h2 className="text-2xl font-semibold text-stone-900 mb-2">{name || 'Your child'}&apos;s growth potential</h2>
            <p className="text-sm text-stone-500 mb-6">
              Enter parent heights to see {name || 'your child'}&apos;s predicted range.
            </p>

            <div className="space-y-4">
              {/* Mother's Height */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Mother&apos;s height</label>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={motherHeightFt}
                    onChange={(e) => setMotherHeightFt(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="">Ft</option>
                    {[4, 5, 6].map((ft) => (
                      <option key={ft} value={ft}>{ft}&apos;</option>
                    ))}
                  </select>
                  <select
                    value={motherHeightIn}
                    onChange={(e) => setMotherHeightIn(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="">In</option>
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i} value={i}>{i}&quot;</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Father's Height */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Father&apos;s height</label>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={fatherHeightFt}
                    onChange={(e) => setFatherHeightFt(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="">Ft</option>
                    {[5, 6, 7].map((ft) => (
                      <option key={ft} value={ft}>{ft}&apos;</option>
                    ))}
                  </select>
                  <select
                    value={fatherHeightIn}
                    onChange={(e) => setFatherHeightIn(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
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
              <div className="mt-8">
                {/* Vertical Bar Chart */}
                <div className="relative flex items-end gap-4 mb-6 h-[340px] sm:h-[280px]">
                  {/* Labels column */}
                  <div className="flex flex-col justify-end h-full w-20 text-right pr-2 text-xs text-stone-500 relative">
                    <div className="absolute" style={{ bottom: '0%' }}>
                      {cmToFtIn(geneticTargetCm)}
                    </div>
                    <div className="absolute" style={{ bottom: '15%' }}>
                      {cmToFtIn(geneticTargetCm + 2 * 2.54)}
                    </div>
                    <div className="absolute" style={{ bottom: '75%' }}>
                      {cmToFtIn(geneticTargetCm + 8 * 2.54)}
                    </div>
                  </div>

                  {/* Bar */}
                  <div className="flex-1 h-full flex flex-col rounded-xl overflow-hidden border border-stone-200">
                    {/* bioKids zone (top - dominant) */}
                    <div className="bg-gradient-to-t from-emerald-500 to-emerald-300 flex items-center justify-center" style={{ height: '65%' }}>
                      <div className="text-center px-2">
                        <p className="text-sm font-bold text-emerald-950">bioKids zone</p>
                        <p className="text-xs text-emerald-800 mt-1">+2&quot; to +8&quot; above target</p>
                        <p className="text-[10px] text-emerald-700 mt-0.5">Maximum Potential</p>
                      </div>
                    </div>
                    {/* Standard Range zone (narrow) */}
                    <div className="bg-stone-200 flex items-center justify-center" style={{ height: '15%' }}>
                      <div className="text-center px-2">
                        <p className="text-[10px] font-semibold text-stone-600">Standard Range · +2&quot; above target</p>
                      </div>
                    </div>
                    {/* Genetic Target zone (bottom) */}
                    <div className="bg-stone-100 flex items-center justify-center border-t-2 border-stone-400" style={{ height: '20%' }}>
                      <div className="text-center px-2">
                        <p className="text-xs font-semibold text-stone-600">Genetic Target</p>
                        <p className="text-sm font-bold text-stone-900">{cmToFtIn(geneticTargetCm)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Percentile Table */}
                <div className="mb-6">
                  <p className="text-sm font-semibold text-stone-800 mb-2">Height Potential Breakdown</p>
                  <div className="border border-stone-200 rounded-lg overflow-hidden text-xs">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-stone-100 text-stone-600">
                          <th className="py-2 px-3 text-left font-medium">vs target</th>
                          <th className="py-2 px-3 text-left font-medium">Height</th>
                          <th className="py-2 px-3 text-left font-medium">Percentile</th>
                          <th className="py-2 px-3 text-right font-medium"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { offset: 2, pct: '~84th', bio: false },
                          { offset: 3, pct: '~93rd', bio: true },
                          { offset: 4, pct: '~97.5th', bio: true },
                          { offset: 5, pct: '~99.4th', bio: true },
                          { offset: 6, pct: '~99.9th', bio: true },
                          { offset: 7, pct: '~99.95th', bio: true },
                          { offset: 8, pct: '~99.997th', bio: true },
                        ].map((row) => (
                          <tr key={row.offset} className={row.bio ? 'bg-emerald-50' : 'bg-white'}>
                            <td className="py-1.5 px-3 text-stone-700">+{row.offset}&quot;</td>
                            <td className="py-1.5 px-3 font-medium text-stone-900">{cmToFtIn(geneticTargetCm + row.offset * 2.54)}</td>
                            <td className="py-1.5 px-3 text-stone-600">{row.pct}</td>
                            <td className="py-1.5 px-3 text-right">
                              {row.bio && <span className="text-emerald-700 font-semibold">bioKids</span>}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Copy */}
                <div className="space-y-3 text-sm text-stone-700">
                  <p>
                    With parents at {formatParentHeight(motherHeightFt, motherHeightIn)} and {formatParentHeight(fatherHeightFt, fatherHeightIn)}, {name || 'your child'}&apos;s genetic target is around <span className="font-bold text-stone-900">{cmToFtIn(geneticTargetCm)}</span>.
                  </p>
                  <p>
                    Most children finish within about 2 inches of their genetic target.
                  </p>
                  <p>
                    However, when sleep, nutrition, exercise and hormones align optimally, children can express their genetics to the maximum of their potential—up to 8 inches above target. This natural &quot;maximal gene expression&quot; zone is documented in peer reviewed literature and is the key target of bioKids.
                  </p>
                  <p className="font-semibold text-emerald-700">
                    bioKids helps you avoid leaving inches on the table.
                  </p>
                  <p>
                    The real goal is not to &quot;force tallness,&quot; but to remove avoidable limitations so each child can grow into the best version of their own biology.
                  </p>
                </div>

                {/* See the science */}
                <button
                  type="button"
                  onClick={() => setShowScience(!showScience)}
                  className="mt-4 text-xs text-emerald-700 font-medium hover:text-emerald-900 transition-colors"
                >
                  {showScience ? '▼' : '▶'} See the science
                </button>
                {showScience && (
                  <div className="mt-2 bg-emerald-50 rounded-lg p-3 space-y-2 font-mono">
                    <p className="text-[11px] text-emerald-800">
                      Standard band based on <a href="https://www.nature.com/articles/pr1998502" target="_blank" rel="noopener noreferrer" className="underline hover:text-emerald-950">Luo/Wang et al. 1998</a> and <a href="https://www.aafp.org/pubs/afp/issues/2015/0701/p43.html" target="_blank" rel="noopener noreferrer" className="underline hover:text-emerald-950">AAFP pediatric guidelines</a>.
                    </p>
                    <p className="text-[11px] text-emerald-800">
                      Maximal expression (+3-4 SD) documented in <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11352326/" target="_blank" rel="noopener noreferrer" className="underline hover:text-emerald-950">Zeevi et al. 2024</a> study of healthy families.
                    </p>
                  </div>
                )}
              </div>
            )}

            <button
              type="button"
              onClick={handleStep4Submit}
              disabled={!canCalculateHeight}
              className="w-full mt-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors disabled:bg-stone-300 disabled:cursor-not-allowed"
            >
              {canCalculateHeight ? `Unlock ${name || 'Your Child'}'s Protocol →` : 'Enter parent heights to continue'}
            </button>
          </div>
        )}

        {/* Step 5: Create Account */}
        {step === 5 && (
          <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6">
            <h2 className="text-2xl font-semibold text-stone-900 mb-2 text-center">Create your account</h2>
            <p className="text-sm text-stone-500 mb-6 text-center">
              Save {name || 'your child'}&apos;s personalized protocol
            </p>

            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleAccountCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="At least 8 characters"
                  required
                  minLength={8}
                />
              </div>
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-stone-300 text-emerald-600 focus:ring-emerald-500"
                  required
                />
                <span className="text-sm text-gray-600">
                  I agree to the{' '}
                  <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-emerald-600 font-medium hover:underline">Terms of Service</a>
                  {' '}and{' '}
                  <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-emerald-600 font-medium hover:underline">Privacy Policy</a>
                </span>
              </label>
              <button
                type="submit"
                disabled={loading || !agreedToTerms}
                className="w-full py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors disabled:bg-stone-300 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
              Already have an account?{' '}
              <Link href="/login" className="text-emerald-600 font-medium hover:underline">Log in</Link>
            </p>
          </div>
        )}

        {/* Step 6: Stripe Checkout */}
        {step === 6 && (
          <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6">
            <h2 className="text-2xl font-semibold text-stone-900 mb-4 text-center">
              Start Your 7-Day Free Trial
            </h2>
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
            <div className="mt-6 text-center">
              <button
                onClick={() => router.push('/dashboard?checkout_success=true')}
                className="text-sm text-emerald-700 font-medium hover:text-emerald-900 hover:underline transition-colors"
              >
                Already paid? Go to Dashboard →
              </button>
            </div>
          </div>
        )}

        {/* Step 7: Welcome */}
        {step === 7 && (
          <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8 text-center">
            <div className="text-5xl mb-4">🌿</div>
            <h2 className="font-display text-3xl text-forest mb-3">Welcome to bioKids!</h2>
            <p className="text-stone-600 mb-8">
              {name || 'Your child'}&apos;s personalized growth protocol is ready.
            </p>
            <button
              onClick={() => router.push('/dashboard')}
              className="w-full py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Go to Dashboard →
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
      <div className="min-h-screen bg-[#FFFDF7] flex items-center justify-center p-4">
        <div className="w-full max-w-md text-center text-stone-500">Loading...</div>
      </div>
    }>
      <OnboardingContent />
    </Suspense>
  );
}
