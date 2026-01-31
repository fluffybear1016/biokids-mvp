'use client';

import { useState } from 'react';
import { OnboardingData, OnboardingChild } from '@/lib/onboarding-store';

interface Props {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step2AddChild({ data, updateData, onNext, onBack }: Props) {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | null>(null);

  const handleContinue = () => {
    if (!name.trim() || !birthDate) return;

    const newChild: OnboardingChild = {
      id: crypto.randomUUID(),
      name: name.trim(),
      birthDate,
      gender,
      heightCm: null,
      weightKg: null,
      isPregnancy: false,
    };

    updateData({
      children: [...data.children, newChild],
      currentChildIndex: data.children.length,
    });

    onNext();
  };

  const isValid = name.trim() && birthDate;

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

        <h1 className="font-display text-3xl text-gray-900 mb-2">Add your child</h1>
        <p className="text-gray-500 mb-8">
          We're asking this to show you relevant content for their growth stage.
        </p>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name or initial
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
              placeholder="Emma or E"
            />
            <p className="text-xs text-gray-400 mt-1">
              For privacy, you can use just their first initial.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Birth date
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="input"
              max={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender
            </label>
            <div className="flex gap-3">
              {[
                { value: 'female' as const, label: 'Female' },
                { value: 'male' as const, label: 'Male' },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setGender(option.value)}
                  className={`flex-1 py-3 px-4 rounded-xl border-2 text-sm font-medium transition-all ${
                    gender === option.value
                      ? 'border-forest bg-green-50 text-forest'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={handleContinue}
          disabled={!isValid}
          className={`w-full mt-8 py-4 rounded-xl text-lg font-semibold transition-all ${
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
