'use client';

import { useState, useEffect } from 'react';
import { OnboardingData } from '@/lib/onboarding-store';
import {
  feetInchesToCm,
  cmToFeetInches,
  lbsToKg,
  kgToLbs,
} from '@/lib/unit-conversions';

interface Props {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step3Measurements({ data, updateData, onNext, onBack }: Props) {
  const currentChild = data.children[data.currentChildIndex];
  const [heightUnit, setHeightUnit] = useState<'imperial' | 'metric'>('imperial');
  const [weightUnit, setWeightUnit] = useState<'imperial' | 'metric'>('imperial');

  const [feet, setFeet] = useState('');
  const [inches, setInches] = useState('');
  const [cm, setCm] = useState('');
  const [lbs, setLbs] = useState('');
  const [kg, setKg] = useState('');

  // Sync height between units
  useEffect(() => {
    if (heightUnit === 'imperial' && feet && inches) {
      const cmValue = feetInchesToCm(parseInt(feet) || 0, parseInt(inches) || 0);
      setCm(cmValue.toString());
    }
  }, [feet, inches, heightUnit]);

  useEffect(() => {
    if (heightUnit === 'metric' && cm) {
      const { feet: f, inches: i } = cmToFeetInches(parseFloat(cm) || 0);
      setFeet(f.toString());
      setInches(i.toString());
    }
  }, [cm, heightUnit]);

  // Sync weight between units
  useEffect(() => {
    if (weightUnit === 'imperial' && lbs) {
      const kgValue = lbsToKg(parseFloat(lbs) || 0);
      setKg(kgValue.toString());
    }
  }, [lbs, weightUnit]);

  useEffect(() => {
    if (weightUnit === 'metric' && kg) {
      const lbsValue = kgToLbs(parseFloat(kg) || 0);
      setLbs(lbsValue.toString());
    }
  }, [kg, weightUnit]);

  const handleContinue = () => {
    const heightCm = cm ? parseFloat(cm) : null;
    const weightKg = kg ? parseFloat(kg) : null;

    const updatedChildren = [...data.children];
    updatedChildren[data.currentChildIndex] = {
      ...currentChild,
      heightCm,
      weightKg,
    };

    updateData({ children: updatedChildren });
    onNext();
  };

  if (!currentChild) {
    onBack();
    return null;
  }

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

        <h1 className="font-display text-3xl text-gray-900 mb-2">
          Track {currentChild.name}'s Starting Point
        </h1>
        <p className="text-gray-500 mb-8">
          Measurements help us personalize recommendations. Body composition affects GH optimization strategy.
        </p>

        <div className="space-y-6">
          {/* Height */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">Height</label>
              <button
                onClick={() => setHeightUnit(heightUnit === 'imperial' ? 'metric' : 'imperial')}
                className="text-sm text-forest hover:underline"
              >
                Switch to {heightUnit === 'imperial' ? 'cm' : 'ft/in'}
              </button>
            </div>

            {heightUnit === 'imperial' ? (
              <div className="flex gap-3">
                <div className="flex-1">
                  <div className="relative">
                    <input
                      type="number"
                      value={feet}
                      onChange={(e) => setFeet(e.target.value)}
                      className="input pr-12"
                      placeholder="0"
                      min="0"
                      max="7"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">ft</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="relative">
                    <input
                      type="number"
                      value={inches}
                      onChange={(e) => setInches(e.target.value)}
                      className="input pr-12"
                      placeholder="0"
                      min="0"
                      max="11"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">in</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative">
                <input
                  type="number"
                  value={cm}
                  onChange={(e) => setCm(e.target.value)}
                  className="input pr-12"
                  placeholder="0"
                  min="0"
                  max="250"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">cm</span>
              </div>
            )}
          </div>

          {/* Weight */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">Weight</label>
              <button
                onClick={() => setWeightUnit(weightUnit === 'imperial' ? 'metric' : 'imperial')}
                className="text-sm text-forest hover:underline"
              >
                Switch to {weightUnit === 'imperial' ? 'kg' : 'lbs'}
              </button>
            </div>

            {weightUnit === 'imperial' ? (
              <div className="relative">
                <input
                  type="number"
                  value={lbs}
                  onChange={(e) => setLbs(e.target.value)}
                  className="input pr-12"
                  placeholder="0"
                  min="0"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">lbs</span>
              </div>
            ) : (
              <div className="relative">
                <input
                  type="number"
                  value={kg}
                  onChange={(e) => setKg(e.target.value)}
                  className="input pr-12"
                  placeholder="0"
                  min="0"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">kg</span>
              </div>
            )}
          </div>
        </div>

        <p className="text-xs text-gray-400 mt-6 text-center">
          These fields are optional. You can skip and add later.
        </p>

        <button
          onClick={handleContinue}
          className="btn-primary w-full mt-6 py-4 text-lg"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
