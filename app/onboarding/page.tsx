'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';

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

  // Step 2: Questions
  const [sleepHours, setSleepHours] = useState('');
  const [bedtime, setBedtime] = useState('');
  const [dairy, setDairy] = useState('');
  const [exercise, setExercise] = useState('');
  const [screenTime, setScreenTime] = useState('');
  const [processedFoods, setProcessedFoods] = useState('');

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

        {/* Step 3: Protocol Ready */}
        {step === 3 && (
          <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6 text-center">
            <div className="text-5xl mb-4">🌱</div>
            <h2 className="text-2xl font-semibold text-stone-900 mb-4">
              {name}'s Natural Growth Protocol is Ready
            </h2>

            {/* Growth Trajectory Graph */}
            <div className="bg-stone-50 rounded-2xl p-4 sm:p-6 mb-6 text-left">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 mb-4">
                <h3 className="font-semibold text-stone-900 text-sm sm:text-base">Growth Trajectory</h3>
                <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-stone-700 font-medium">
                  <span className="flex items-center gap-1.5 sm:gap-2">
                    <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-gray-400 rounded-full"></span>
                    Average Child
                  </span>
                  <span className="flex items-center gap-1.5 sm:gap-2">
                    <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-emerald-600 rounded-full"></span>
                    bioKid
                  </span>
                </div>
              </div>

              <div className="relative h-48 sm:h-56">
                <svg viewBox="0 0 400 200" className="w-full h-full" preserveAspectRatio="none">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e7e5e4" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />

                  {/* Average child curve */}
                  <path
                    d="M 20 180 Q 50 170, 80 155 Q 120 135, 180 115 Q 250 95, 320 85 Q 360 82, 380 80"
                    fill="none"
                    stroke="#d1d5db"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  {/* bioKid curve */}
                  <path
                    d="M 20 180 Q 50 165, 80 140 Q 120 100, 180 60 Q 250 30, 320 18 Q 360 12, 380 10"
                    fill="none"
                    stroke="#059669"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  {/* Start point */}
                  <circle cx="20" cy="180" r="6" fill="#059669" />

                  {/* End points */}
                  <circle cx="380" cy="80" r="5" fill="#d1d5db" />
                  <circle cx="380" cy="10" r="6" fill="#059669" />
                </svg>

                <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[10px] sm:text-xs text-stone-500 px-2 sm:px-4">
                  <span>Birth</span>
                  <span className="hidden sm:inline">Age 5</span>
                  <span className="sm:hidden">5</span>
                  <span className="hidden sm:inline">Age 10</span>
                  <span className="sm:hidden">10</span>
                  <span className="hidden sm:inline">Age 15</span>
                  <span className="sm:hidden">15</span>
                  <span className="hidden sm:inline">Age 25</span>
                  <span className="sm:hidden">25</span>
                </div>
              </div>

              <p className="text-center text-xs sm:text-sm text-stone-500 mt-4">
                Same genes, different environment: a structured growth hormone-supportive system changes the growth curve.
              </p>
            </div>

            <p className="text-stone-600 mb-6 leading-relaxed">
              Most parents don't know that 70-80% of daily growth hormone pulses occur during slow-wave sleep (usually in the first 3 hours of sleep), or that a set of 30-second sprints can boost growth hormone by 700%, or that fava beans are one of the strongest natural growth hormone stimulators.
            </p>

            <p className="text-stone-900 font-medium mb-6">
              We'll show you how to optimize all of this and much more. You are going to win.
            </p>

            <button
              onClick={() => setStep(4)}
              className="w-full py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Start your free trial
            </button>
          </div>
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
            />
          </div>
        )}

      </div>
    </div>
  );
}
