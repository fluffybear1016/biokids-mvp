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

  // Auth info for Stripe
  const [userEmail, setUserEmail] = useState('');
  const [userId, setUserId] = useState('');

  // Step 2: Questions
  const [sleepHours, setSleepHours] = useState('');
  const [bedtime, setBedtime] = useState('');
  const [dairy, setDairy] = useState('');
  const [exercise, setExercise] = useState('');
  const [screenTime, setScreenTime] = useState('');
  const [processedFoods, setProcessedFoods] = useState('');

  // Fetch authenticated user info for Stripe
  useEffect(() => {
    const supabase = createClient();
    if (!supabase) return;
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUserEmail(session.user.email || '');
        setUserId(session.user.id);
      }
    });
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

  return (
    <div className="min-h-screen bg-[#FFFDF7] flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`w-1/4 h-2 rounded-full mx-1 ${
                  s <= step ? 'bg-emerald-600' : 'bg-stone-200'
                }`}
              />
            ))}
          </div>
          <p className="text-center text-sm text-stone-500">Step {step} of 4</p>
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

        {/* Step 2: Quick Questions */}
        {step === 2 && (
          <form onSubmit={handleStep2Submit} className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6">
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

        {/* Step 3: Goal Selection */}
        {step === 3 && (
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
        )}

        {/* Step 4: Stripe Pricing Table */}
        {step === 4 && (
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
