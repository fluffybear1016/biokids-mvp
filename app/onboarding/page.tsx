'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Script from 'next/script';
import { createClient } from '@/lib/supabase';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 26 }, (_, i) => currentYear - i);

// CDC BMI-for-age obesity threshold (simplified: >= 95th percentile)
// Uses approximate 95th percentile BMI cutoffs by age
function isObeseByCDC(ageYears: number, bmi: number): boolean {
  const thresholds: Record<number, number> = {
    2: 19.3, 3: 18.2, 4: 17.8, 5: 17.9, 6: 18.4, 7: 19.2,
    8: 20.1, 9: 21.0, 10: 22.1, 11: 23.2, 12: 24.2, 13: 25.1,
    14: 25.9, 15: 26.8, 16: 27.5, 17: 28.2, 18: 28.9, 19: 29.7,
    20: 30.0, 21: 30.0, 22: 30.0, 23: 30.0, 24: 30.0, 25: 30.0,
  };
  const closest = Object.keys(thresholds)
    .map(Number)
    .reduce((prev, curr) => Math.abs(curr - ageYears) < Math.abs(prev - ageYears) ? curr : prev);
  return bmi >= thresholds[closest];
}

function OnboardingForm() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);

  // Step 1: Child info
  const [childName, setChildName] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [heightFt, setHeightFt] = useState('');
  const [heightIn, setHeightIn] = useState('');
  const [weight, setWeight] = useState('');
  const [useMetric, setUseMetric] = useState(false);
  const [heightCm, setHeightCm] = useState('');
  const [weightKg, setWeightKg] = useState('');

  // Step 2: Quick questions
  const [sleepHours, setSleepHours] = useState('');
  const [dairy, setDairy] = useState('');
  const [activity, setActivity] = useState('');
  const [screenTime, setScreenTime] = useState('');

  const [userId, setUserId] = useState<string | null>(null);
  const totalSteps = 4;

  useEffect(() => {
    const stepParam = searchParams.get('step');
    if (stepParam) {
      const n = parseInt(stepParam);
      if (n >= 1 && n <= totalSteps) setStep(n);
    }

    const supabase = createClient();
    if (supabase) {
      supabase.auth.getUser().then(({ data: { user } }) => {
        if (user) setUserId(user.id);
      });
    }
  }, [searchParams]);

  // Compute BMI internally
  const computeBMI = (): { bmi: number; obese: boolean } | null => {
    let heightInches = 0;
    let weightLbs = 0;

    if (useMetric) {
      if (!heightCm || !weightKg) return null;
      heightInches = parseFloat(heightCm) / 2.54;
      weightLbs = parseFloat(weightKg) * 2.205;
    } else {
      if (!heightFt || !weight) return null;
      heightInches = parseFloat(heightFt) * 12 + (parseFloat(heightIn) || 0);
      weightLbs = parseFloat(weight);
    }

    if (heightInches <= 0 || weightLbs <= 0) return null;
    const bmi = (weightLbs / (heightInches * heightInches)) * 703;

    let ageYears = 8;
    if (birthYear) {
      const monthNum = birthMonth ? MONTHS.indexOf(birthMonth) : 0;
      const birthDate = new Date(parseInt(birthYear), monthNum, 15);
      ageYears = (Date.now() - birthDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
    }

    return { bmi: Math.round(bmi * 10) / 10, obese: isObeseByCDC(Math.round(ageYears), bmi) };
  };

  const handleStep1Continue = () => {
    // Store child data + BMI to localStorage for personalization
    const bmiData = computeBMI();
    const data = {
      name: childName,
      birthMonth,
      birthYear,
      birthDate: birthYear ? `${birthYear}-${String(MONTHS.indexOf(birthMonth) + 1).padStart(2, '0')}-15` : '',
      heightFt, heightIn, heightCm, weight, weightKg, useMetric,
      bmi: bmiData?.bmi || null,
      obeseFlag: bmiData?.obese || false,
      sleepHours: '', dairy: '', activity: '', screenTime: '',
    };
    localStorage.setItem('child_data', JSON.stringify(data));
    setStep(2);
  };

  const handleStep2Continue = () => {
    // Update localStorage with questionnaire answers
    const existing = localStorage.getItem('child_data');
    if (existing) {
      const data = JSON.parse(existing);
      data.sleepHours = sleepHours;
      data.dairy = dairy;
      data.activity = activity;
      data.screenTime = screenTime;
      localStorage.setItem('child_data', JSON.stringify(data));
    }
    setStep(3);
  };

  const displayName = childName || 'your child';

  const step1Valid = childName && birthMonth && birthYear;
  const step2Valid = sleepHours && dairy && activity && screenTime;

  const inputClass = 'w-full px-4 py-3 border-2 border-gray-300 rounded-xl font-mono text-black text-base focus:outline-none focus:border-forest';
  const selectClass = 'flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl font-mono text-black text-base focus:outline-none focus:border-forest bg-white appearance-none';

  return (
    <div className="min-h-screen bg-cream">
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 font-display text-lg sm:text-xl text-forest">
            <span className="text-xl sm:text-2xl">🌿</span>
            bioKids
          </Link>
          <span className="text-xs sm:text-sm text-black font-mono">Step {step} of {totalSteps}</span>
        </div>
        <div className="h-1 bg-gray-200">
          <div className="h-full bg-forest transition-all duration-300" style={{ width: `${(step / totalSteps) * 100}%` }} />
        </div>
      </header>

      <main className="max-w-xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

        {/* STEP 1: Child Info */}
        {step === 1 && (
          <div className="space-y-6 sm:space-y-8">
            <div>
              <h1 className="font-display text-2xl sm:text-3xl text-black mb-2 sm:mb-3">Tell us about your child.</h1>
              <p className="font-mono text-sm sm:text-base text-black">We use this to personalize the growth hormone system to their stage.</p>
            </div>

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-black mb-1">Name or initial</label>
                <p className="text-xs font-mono text-gray-500 mb-2">For privacy, consider using just your child's first initial.</p>
                <input
                  type="text"
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  className={inputClass}
                  placeholder="e.g., Emma or E"
                />
              </div>

              {/* Month & Year */}
              <div>
                <label className="block text-sm font-semibold text-black mb-1">Born</label>
                <div className="flex gap-3">
                  <select
                    value={birthMonth}
                    onChange={(e) => setBirthMonth(e.target.value)}
                    className={selectClass}
                  >
                    <option value="">Month</option>
                    {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                  <select
                    value={birthYear}
                    onChange={(e) => setBirthYear(e.target.value)}
                    className={selectClass}
                  >
                    <option value="">Year</option>
                    {YEARS.map(y => <option key={y} value={String(y)}>{y}</option>)}
                  </select>
                </div>
              </div>

              {/* Height */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm font-semibold text-black">Height <span className="font-normal text-gray-500">(optional)</span></label>
                  <button onClick={() => setUseMetric(!useMetric)} className="text-xs font-mono text-forest underline">
                    Switch to {useMetric ? 'ft/in' : 'cm'}
                  </button>
                </div>
                {useMetric ? (
                  <input type="number" value={heightCm} onChange={(e) => setHeightCm(e.target.value)} className={inputClass} placeholder="Height in cm" />
                ) : (
                  <div className="flex gap-3">
                    <input type="number" value={heightFt} onChange={(e) => setHeightFt(e.target.value)} className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl font-mono text-black text-base focus:outline-none focus:border-forest" placeholder="Feet" />
                    <input type="number" value={heightIn} onChange={(e) => setHeightIn(e.target.value)} className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl font-mono text-black text-base focus:outline-none focus:border-forest" placeholder="Inches" />
                  </div>
                )}
              </div>

              {/* Weight */}
              <div>
                <label className="text-sm font-semibold text-black">Weight <span className="font-normal text-gray-500">(optional)</span></label>
                {useMetric ? (
                  <input type="number" value={weightKg} onChange={(e) => setWeightKg(e.target.value)} className={inputClass + ' mt-1'} placeholder="Weight in kg" />
                ) : (
                  <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className={inputClass + ' mt-1'} placeholder="Weight in lbs" />
                )}
              </div>
            </div>

            <button
              onClick={handleStep1Continue}
              disabled={!step1Valid}
              className="w-full bg-forest text-white py-3.5 sm:py-4 rounded-xl font-semibold text-base sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-forest-dark transition-colors"
            >
              Continue
            </button>
          </div>
        )}

        {/* STEP 2: Quick Questions */}
        {step === 2 && (
          <div className="space-y-6 sm:space-y-8">
            <div>
              <h1 className="font-display text-2xl sm:text-3xl text-black mb-2 sm:mb-3">A few quick questions.</h1>
              <p className="font-mono text-sm sm:text-base text-black">This helps us personalize {displayName}'s protocol.</p>
            </div>

            <div className="space-y-6">
              {/* Sleep */}
              <div>
                <label className="block text-sm font-semibold text-black mb-3">How many hours of sleep does {displayName} get each night?</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: '8_or_less', label: '8 or less' },
                    { value: '9-10', label: '9-10' },
                    { value: '11-12', label: '11-12' },
                    { value: '12+', label: '12+' },
                  ].map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => setSleepHours(opt.value)}
                      className={`py-3 rounded-xl font-semibold border-2 transition-colors text-sm sm:text-base ${
                        sleepHours === opt.value
                          ? 'bg-forest text-white border-forest'
                          : 'bg-white text-black border-gray-300 hover:border-forest'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dairy */}
              <div>
                <label className="block text-sm font-semibold text-black mb-3">Does {displayName} consume dairy daily?</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'yes', label: 'Yes' },
                    { value: 'sometimes', label: 'Sometimes' },
                    { value: 'no', label: 'No' },
                  ].map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => setDairy(opt.value)}
                      className={`py-3 rounded-xl font-semibold border-2 transition-colors text-sm sm:text-base ${
                        dairy === opt.value
                          ? 'bg-forest text-white border-forest'
                          : 'bg-white text-black border-gray-300 hover:border-forest'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Activity */}
              <div>
                <label className="block text-sm font-semibold text-black mb-3">How often does {displayName} run or play hard?</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'daily', label: 'Daily' },
                    { value: 'few_times', label: 'Few times a week' },
                    { value: 'rarely', label: 'Rarely' },
                  ].map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => setActivity(opt.value)}
                      className={`py-3 rounded-xl font-semibold border-2 transition-colors text-sm sm:text-base ${
                        activity === opt.value
                          ? 'bg-forest text-white border-forest'
                          : 'bg-white text-black border-gray-300 hover:border-forest'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Screen time */}
              <div>
                <label className="block text-sm font-semibold text-black mb-3">Screen time before bed?</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'none', label: 'None' },
                    { value: 'some', label: 'Some' },
                    { value: 'a_lot', label: 'A lot' },
                  ].map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => setScreenTime(opt.value)}
                      className={`py-3 rounded-xl font-semibold border-2 transition-colors text-sm sm:text-base ${
                        screenTime === opt.value
                          ? 'bg-forest text-white border-forest'
                          : 'bg-white text-black border-gray-300 hover:border-forest'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-3.5 sm:py-4 rounded-xl font-semibold text-base border-2 border-gray-300 text-black hover:border-forest transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleStep2Continue}
                disabled={!step2Valid}
                className="flex-1 bg-forest text-white py-3.5 sm:py-4 rounded-xl font-semibold text-base sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-forest-dark transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Protocol Ready */}
        {step === 3 && (
          <div className="space-y-6 sm:space-y-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-forest/10 rounded-full mb-6">
                <span className="text-3xl">🧬</span>
              </div>
              <h1 className="font-display text-2xl sm:text-3xl text-black mb-4">{displayName}'s protocol is ready.</h1>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 space-y-4">
              <p className="font-mono text-sm sm:text-base text-black leading-relaxed">
                Most parents don't know that <strong>70% of growth happens during sleep</strong>, or that a set of 30-second sprints can <strong>boost growth hormone by 700%</strong>, or that <strong>fava beans</strong> are one of the strongest natural growth hormone stimulators.
              </p>
              <p className="font-mono text-sm sm:text-base text-black leading-relaxed">
                We'll show you how to optimize all of this and much more to harness it for maximizing <strong>{displayName}'s</strong> potential.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-3.5 sm:py-4 rounded-xl font-semibold text-base border-2 border-gray-300 text-black hover:border-forest transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => setStep(4)}
                className="flex-1 bg-forest text-white py-3.5 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:bg-forest-dark transition-colors"
              >
                Start your free trial
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Stripe Pricing Table */}
        {step === 4 && (
          <div className="space-y-6 sm:space-y-8">
            <div>
              <button
                onClick={() => setStep(3)}
                className="flex items-center gap-2 text-gray-500 hover:text-forest mb-4 text-sm font-mono"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>
              <h1 className="font-display text-2xl sm:text-3xl text-black mb-2 sm:mb-3">Choose your plan.</h1>
              <p className="font-mono text-sm sm:text-base text-black">Cancel anytime, online.</p>
            </div>
            <Script src="https://js.stripe.com/v3/pricing-table.js" strategy="lazyOnload" />
            {/* @ts-expect-error Stripe pricing table is a custom element */}
            <stripe-pricing-table
              pricing-table-id="prctbl_1T21I73eI33ypy3JzXLrhay1"
              publishable-key="pk_live_51Sw3RG3eI33ypy3JUaKVJ6RY9Xw5ear1j1eQQOp81v6YSc63XuihA4vSoANrCMLemY13GxAi0fT3x7JgFglHmGTn00W88YoFKE"
            />
          </div>
        )}

      </main>
    </div>
  );
}

export default function Onboarding() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-forest font-mono">Loading...</div>
      </div>
    }>
      <OnboardingForm />
    </Suspense>
  );
}
