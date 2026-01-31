'use client';

import { useState } from 'react';
import { OnboardingData } from '@/lib/onboarding-store';

interface Props {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

type EmailFrequency = 'daily' | '2x_week' | 'weekly' | 'none';

const frequencyOptions: { value: EmailFrequency; label: string; description: string }[] = [
  { value: 'daily', label: 'Daily', description: 'Quick tips every morning' },
  { value: '2x_week', label: '2x per week', description: 'Tuesday & Friday digests' },
  { value: 'weekly', label: 'Weekly', description: 'One comprehensive update' },
  { value: 'none', label: 'No emails', description: 'App only, no emails' },
];

export default function Step7EmailPreferences({ data, updateData, onNext, onBack }: Props) {
  const [email, setEmail] = useState(data.email);
  const [frequency, setFrequency] = useState<EmailFrequency>(data.emailFrequency);

  const handleContinue = () => {
    updateData({
      email,
      emailFrequency: frequency,
    });
    onNext();
  };

  const isValid = email.includes('@') || frequency === 'none';

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

        <h1 className="font-display text-3xl text-gray-900 mb-2">Stay on Track</h1>
        <p className="text-gray-500 mb-8">
          Get gentle reminders and tips to keep optimizing.
        </p>

        {/* Frequency Options */}
        <div className="space-y-3 mb-6">
          {frequencyOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setFrequency(option.value)}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                frequency === option.value
                  ? 'border-forest bg-green-50'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    frequency === option.value ? 'border-forest' : 'border-gray-300'
                  }`}
                >
                  {frequency === option.value && (
                    <div className="w-2.5 h-2.5 rounded-full bg-forest" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{option.label}</p>
                  <p className="text-sm text-gray-500">{option.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Email Input */}
        {frequency !== 'none' && (
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              placeholder="you@example.com"
            />
          </div>
        )}

        <button
          onClick={handleContinue}
          disabled={!isValid}
          className={`w-full py-4 rounded-xl text-lg font-semibold transition-all ${
            isValid
              ? 'bg-forest text-white hover:bg-forest-dark'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
