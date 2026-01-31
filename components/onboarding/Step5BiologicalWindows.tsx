'use client';

import { OnboardingData } from '@/lib/onboarding-store';
import {
  getBiologicalWindows,
  getAgeFromBirthDate,
  formatRemainingTime,
  getStatusBadgeClass,
  getProgressBarColor,
} from '@/lib/biological-windows';

interface Props {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step5BiologicalWindows({ data, onNext, onBack }: Props) {
  // Get the first non-pregnancy child for display
  const child = data.children.find(c => !c.isPregnancy && c.birthDate);

  if (!child) {
    onNext();
    return null;
  }

  const { years, months } = getAgeFromBirthDate(child.birthDate);
  const windows = getBiologicalWindows(child.birthDate);
  const remainingTime = formatRemainingTime(child.birthDate);

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6 py-12">
      <div className="max-w-lg w-full">
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
          Here's where {child.name} is right now
        </h1>

        {/* Age Display */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
          <div className="text-center">
            <p className="text-4xl font-display text-forest mb-2">
              {years} years, {months} months
            </p>
            <p className="text-gray-500">{remainingTime}</p>
          </div>
        </div>

        {/* Biological Windows */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">Biological Windows</h3>

          <div className="space-y-4">
            {windows.map((window) => (
              <div key={window.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">{window.name}</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusBadgeClass(window.status)}`}>
                      {window.status === 'open' ? 'Open' : window.status === 'closing' ? 'Closing' : 'Closed'}
                    </span>
                  </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${getProgressBarColor(window.status)}`}
                    style={{ width: `${window.percentageDeveloped}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500">{window.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Urgency Message */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8">
          <p className="text-center text-gray-800">
            <span className="font-semibold">{child.name}</span> still has time.
            <br />
            <span className="text-amber-700 font-medium">The question is: will you use it?</span>
          </p>
        </div>

        <button
          onClick={onNext}
          className="btn-primary w-full py-4 text-lg"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
