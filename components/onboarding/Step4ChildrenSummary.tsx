'use client';

import { OnboardingData, OnboardingChild } from '@/lib/onboarding-store';
import { getAgeFromBirthDate } from '@/lib/biological-windows';

interface Props {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

function formatAge(birthDate: string): string {
  const { years, months } = getAgeFromBirthDate(birthDate);
  if (years === 0) {
    return `${months} month${months === 1 ? '' : 's'}`;
  }
  return `${years} year${years === 1 ? '' : 's'}`;
}

export default function Step4ChildrenSummary({ data, updateData, onNext, onBack }: Props) {
  const handleRemoveChild = (id: string) => {
    const updatedChildren = data.children.filter(c => c.id !== id);
    updateData({ children: updatedChildren });
  };

  const handleAddChild = () => {
    // Go back to step 2 to add another child
    updateData({ currentStep: 2 });
  };

  const handleAddPregnancy = () => {
    const newChild: OnboardingChild = {
      id: crypto.randomUUID(),
      name: 'Baby',
      birthDate: '',
      gender: null,
      heightCm: null,
      weightKg: null,
      isPregnancy: true,
      dueDate: '',
    };

    updateData({
      children: [...data.children, newChild],
    });
  };

  const canContinue = data.children.length > 0;

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

        <h1 className="font-display text-3xl text-gray-900 mb-2">Your children</h1>
        <p className="text-gray-500 mb-8">
          Review and add more children if needed.
        </p>

        {/* Children List */}
        <div className="space-y-3 mb-6">
          {data.children.map((child) => (
            <div
              key={child.id}
              className="bg-white rounded-xl p-4 flex items-center justify-between shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-forest/10 rounded-full flex items-center justify-center text-lg">
                  {child.isPregnancy ? '' : child.gender === 'female' ? '' : child.gender === 'male' ? '' : ''}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{child.name}</p>
                  <p className="text-sm text-gray-500">
                    {child.isPregnancy
                      ? child.dueDate
                        ? `Due ${child.dueDate}`
                        : 'Expecting'
                      : formatAge(child.birthDate)}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleRemoveChild(child.id)}
                className="text-gray-400 hover:text-coral p-2"
                title="Remove"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Add Buttons */}
        <div className="flex gap-3 mb-8">
          <button
            onClick={handleAddChild}
            className="flex-1 py-3 px-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-forest hover:text-forest transition-colors text-sm font-medium"
          >
            + Add Child
          </button>
          <button
            onClick={handleAddPregnancy}
            className="flex-1 py-3 px-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-forest hover:text-forest transition-colors text-sm font-medium"
          >
            + Add Pregnancy
          </button>
        </div>

        <button
          onClick={onNext}
          disabled={!canContinue}
          className={`w-full py-4 rounded-xl text-lg font-semibold transition-all ${
            canContinue
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
