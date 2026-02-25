'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import GoalSelection from '@/components/GoalSelection';
import { createClient } from '@/lib/supabase';

export default function Onboarding() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // Step 1: Child Info
  const [name, setName] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [heightFt, setHeightFt] = useState('');
  const [heightIn, setHeightIn] = useState('');
  const [weight, setWeight] = useState('');

  // Step 2: Height Potential
  const [childGender, setChildGender] = useState<'boy' | 'girl' | ''>('');
  const [motherHeightFt, setMotherHeightFt] = useState('');
  const [motherHeightIn, setMotherHeightIn] = useState('');
  const [fatherHeightFt, setFatherHeightFt] = useState('');
  const [fatherHeightIn, setFatherHeightIn] = useState('');
  const [showScience, setShowScience] = useState(false);

  // Auth info for Stripe
  const [userEmail, setUserEmail] = useState('');
  const [userId, setUserId] = useState('');

  // Step 3: Questions
  const [sleepHours, setSleepHours] = useState('');
  const [bedtime, setBedtime] = useState('');
  const [dairy, setDairy] = useState('');
  const [exercise, setExercise] = useState('');
  const [screenTime, setScreenTime] = useState('');
  const [processedFoods, setProcessedFoods] = useState('');

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
    setStep(2);
  };

  const toInches = (ft: string, inches: string) => (parseInt(ft) * 12) + parseInt(inches);
  const toCm = (totalInches: number) => totalInches * 2.54;
  const cmToFtIn = (cm: number) => {
    const totalIn = Math.round(cm / 2.54);
    return `${Math.floor(totalIn / 12)}'${totalIn % 12}"`;
  };
  const formatParentHeight = (ft: string, inches: string) => `${ft}'${inches}"`;

  const canCalculateHeight = childGender && motherHeightFt && motherHeightIn && fatherHeightFt && fatherHeightIn;

  const geneticTargetCm = canCalculateHeight ? (() => {
    const motherCm = toCm(toInches(motherHeightFt, motherHeightIn));
    const fatherCm = toCm(toInches(fatherHeightFt, fatherHeightIn));
    if (childGender === 'boy') return (fatherCm + (motherCm + 13)) / 2;
    return ((fatherCm - 13) + motherCm) / 2;
  })() : null;

  const handleStep2Submit = () => {
    if (geneticTargetCm) {
      localStorage.setItem('childGender', childGender);
      localStorage.setItem('motherHeight', `${motherHeightFt}'${motherHeightIn}"`);
      localStorage.setItem('fatherHeight', `${fatherHeightFt}'${fatherHeightIn}"`);
      localStorage.setItem('geneticTarget', geneticTargetCm.toString());
    }
    setStep(3);
  };

  const handleStep3Submit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('sleepHours', sleepHours);
    localStorage.setItem('bedtime', bedtime);
    localStorage.setItem('dairy', dairy);
    localStorage.setItem('exercise', exercise);
    localStorage.setItem('screenTime', screenTime);
    localStorage.setItem('processedFoods', processedFoods);
    setStep(4);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF7] flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <div
                key={s}
                className={`w-1/5 h-2 rounded-full mx-1 ${
                  s <= step ? 'bg-emerald-600' : 'bg-stone-200'
                }`}
              />
            ))}
          </div>
          <p className="text-center text-sm text-stone-500">Step {step} of 5</p>
        </div>

        {/* Step 1: Child Info */}
        {step === 1 && (
          <form onSubmit={handleStep1Submit} className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6">
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
                      <option key={ft} value={ft}>{ft}'</option>
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
                      <option key={i} value={i}>{i}"</option>
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
            </div>

            <button
              type="submit"
              className="w-full mt-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Continue
            </button>
          </form>
        )}

        {/* Step 2: Height Potential */}
        {step === 2 && (
          <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6">
            <h2 className="text-2xl font-semibold text-stone-900 mb-2">{name}'s growth potential</h2>
            <p className="text-sm text-stone-500 mb-6">
              Enter parent heights to see {name}'s predicted range.
            </p>

            <div className="space-y-4">
              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Child's gender</label>
                <div className="grid grid-cols-2 gap-2">
                  {[{ value: 'boy' as const, label: 'Boy' }, { value: 'girl' as const, label: 'Girl' }].map((option) => (
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

              {/* Mother's Height */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Mother's height</label>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={motherHeightFt}
                    onChange={(e) => setMotherHeightFt(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="">Ft</option>
                    {[4, 5, 6].map((ft) => (
                      <option key={ft} value={ft}>{ft}'</option>
                    ))}
                  </select>
                  <select
                    value={motherHeightIn}
                    onChange={(e) => setMotherHeightIn(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="">In</option>
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i} value={i}>{i}"</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Father's Height */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Father's height</label>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={fatherHeightFt}
                    onChange={(e) => setFatherHeightFt(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="">Ft</option>
                    {[5, 6, 7].map((ft) => (
                      <option key={ft} value={ft}>{ft}'</option>
                    ))}
                  </select>
                  <select
                    value={fatherHeightIn}
                    onChange={(e) => setFatherHeightIn(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="">In</option>
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i} value={i}>{i}"</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Height Visualization */}
            {geneticTargetCm && (
              <div className="mt-8">
                {/* Vertical Bar Chart */}
                <div className="relative flex items-end gap-4 mb-6" style={{ height: '240px' }}>
                  {/* Labels column */}
                  <div className="flex flex-col justify-end h-full w-24 text-right pr-2 text-xs text-stone-500 relative">
                    <div className="absolute" style={{ bottom: '0%' }}>
                      {cmToFtIn(geneticTargetCm - 10)}
                    </div>
                    <div className="absolute" style={{ bottom: '25%' }}>
                      {cmToFtIn(geneticTargetCm)}
                    </div>
                    <div className="absolute" style={{ bottom: '50%' }}>
                      {cmToFtIn(geneticTargetCm + 10)}
                    </div>
                    <div className="absolute" style={{ bottom: '85%' }}>
                      {cmToFtIn(geneticTargetCm + 20)}
                    </div>
                  </div>

                  {/* Bar */}
                  <div className="flex-1 h-full flex flex-col justify-end rounded-xl overflow-hidden border border-stone-200">
                    {/* Maximum Potential zone (top) */}
                    <div className="bg-gradient-to-t from-emerald-400 to-emerald-300 flex items-center justify-center" style={{ height: '35%' }}>
                      <div className="text-center px-2">
                        <p className="text-xs font-bold text-emerald-900">Maximum Potential</p>
                        <p className="text-[10px] text-emerald-800">+6-8" above target</p>
                        <p className="text-[10px] font-semibold text-emerald-900 mt-0.5">bioKids zone</p>
                      </div>
                    </div>
                    {/* Standard Range zone (middle) */}
                    <div className="bg-stone-200 flex items-center justify-center" style={{ height: '40%' }}>
                      <div className="text-center px-2">
                        <p className="text-xs font-semibold text-stone-700">Standard Range (95%)</p>
                        <p className="text-[10px] text-stone-600">{'\u00B1'}4" of target</p>
                        <p className="text-[10px] text-stone-500">Where most children finish</p>
                      </div>
                    </div>
                    {/* Genetic Target zone (bottom) */}
                    <div className="bg-stone-100 flex items-center justify-center border-t-2 border-stone-400" style={{ height: '25%' }}>
                      <div className="text-center px-2">
                        <p className="text-xs font-semibold text-stone-600">Genetic Target</p>
                        <p className="text-sm font-bold text-stone-900">{cmToFtIn(geneticTargetCm)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Copy */}
                <div className="space-y-3 text-sm text-stone-700">
                  <p>
                    With parents at {formatParentHeight(motherHeightFt, motherHeightIn)} and {formatParentHeight(fatherHeightFt, fatherHeightIn)}, your child's genetic target is around <span className="font-bold text-stone-900">{cmToFtIn(geneticTargetCm)}</span>.
                  </p>
                  <p>
                    Most children finish within about 4 inches of their genetic target (the standard 95% range).
                  </p>
                  <p>
                    However, when sleep, nutrition, exercise and hormones align optimally, children can express their genetics to the maximum of their potential—up to 8 inches above target. This natural "maximal gene expression" zone is documented in peer reviewed literature and is the key target of bioKids.
                  </p>
                  <p className="font-semibold text-emerald-700">
                    bioKids helps you avoid leaving inches on the table.
                  </p>
                  <p>
                    The real goal is not to "force tallness," but to remove avoidable limitations so each child can grow into the best version of their own biology.
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
                  <div className="mt-2 bg-emerald-50 rounded-lg p-3 space-y-2">
                    <p className="text-[11px] text-emerald-800">
                      Standard band based on Luo/Wang et al. 1998 and AAFP pediatric guidelines.
                    </p>
                    <p className="text-[11px] text-emerald-800">
                      Maximal expression (+3-4 SD) documented in Zeevi et al. 2024 study of healthy families.
                    </p>
                  </div>
                )}
              </div>
            )}

            <button
              type="button"
              onClick={handleStep2Submit}
              disabled={!canCalculateHeight}
              className="w-full mt-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors disabled:bg-stone-300 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 3: Quick Questions */}
        {step === 3 && (
          <form onSubmit={handleStep3Submit} className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6">
            <h2 className="text-2xl font-semibold text-stone-900 mb-2">A few quick questions</h2>
            <p className="text-sm text-stone-500 mb-6">
              This helps us personalize {name}'s protocol.
            </p>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  How many hours of sleep does {name} get each night?
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
                  What time does {name} usually go to bed?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Before 8pm', '8-9pm', 'After 9pm'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setBedtime(option)}
                      className={`py-3 px-4 rounded-lg border text-sm font-medium transition-colors ${
                        bedtime === option
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
                  Does {name} consume dairy daily?
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
                  How often does {name} run or play hard?
                </label>
                <div className="grid grid-cols-3 gap-2">
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

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  How often does {name} eat processed/packaged foods?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Rarely', 'Sometimes', 'Often'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setProcessedFoods(option)}
                      className={`py-3 px-4 rounded-lg border text-sm font-medium transition-colors ${
                        processedFoods === option
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
              disabled={!sleepHours || !bedtime || !dairy || !exercise || !screenTime || !processedFoods}
              className="w-full mt-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors disabled:bg-stone-300 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </form>
        )}

        {/* Step 4: Goal Selection */}
        {step === 4 && (
          <GoalSelection
            childName={name || 'Your child'}
            onSelect={(goal) => {
              localStorage.setItem('biokids_goal', JSON.stringify({
                goal,
                date: new Date().toISOString(),
              }));
              setStep(5);
            }}
          />
        )}

        {/* Step 5: Stripe Pricing Table */}
        {step === 5 && (
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
          </div>
        )}

      </div>
    </div>
  );
}
