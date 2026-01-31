'use client';

import Link from 'next/link';

interface Props {
  currentStep: number;
  totalSteps: number;
}

export default function OnboardingProgress({ currentStep, totalSteps }: Props) {
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-6 py-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-3">
          <Link href="/" className="flex items-center gap-2 font-display text-xl text-forest">
            <span className="text-2xl">🌿</span>
            bioKids
          </Link>
          <span className="text-sm text-gray-500">
            Step {currentStep} of {totalSteps}
          </span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-forest rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
