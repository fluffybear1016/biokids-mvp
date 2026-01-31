'use client';

import { OnboardingData } from '@/lib/onboarding-store';

interface Props {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step6HabitsMatter({ onNext, onBack }: Props) {
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
          Your Habits Shape Their Growth
        </h1>
        <p className="text-gray-500 mb-8">
          Without the right habits, most children never reach their biological potential.
        </p>

        {/* Diverging Growth Curves Graph */}
        <div className="bg-white rounded-3xl p-8 shadow-lg mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-900">Growth Trajectory</h3>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 bg-coral rounded-full"></span>
                Poor Habits
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 bg-forest rounded-full"></span>
                Optimized
              </span>
            </div>
          </div>

          <div className="relative h-48 mb-4">
            <svg viewBox="0 0 400 160" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <pattern id="habits-grid" width="40" height="32" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 32" fill="none" stroke="#f5f5f5" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#habits-grid)" />

              {/* Poor habits curve - lower trajectory */}
              <path
                d="M 20 80 Q 80 78, 120 85 Q 180 95, 240 110 Q 300 125, 380 135"
                fill="none"
                stroke="#E07B6B"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Optimized curve - higher trajectory */}
              <path
                d="M 20 80 Q 80 65, 120 50 Q 180 32, 240 22 Q 300 15, 380 12"
                fill="none"
                stroke="#2D5A47"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Starting point */}
              <circle cx="20" cy="80" r="5" fill="#2D5A47" />

              {/* End points */}
              <circle cx="380" cy="135" r="4" fill="#E07B6B" />
              <circle cx="380" cy="12" r="5" fill="#2D5A47" />

              {/* Divergence arrow */}
              <line x1="200" y1="40" x2="200" y2="100" stroke="#E8A849" strokeWidth="2" strokeDasharray="4,4" />
              <text x="210" y="75" fontSize="11" fill="#E8A849" fontWeight="600">The Gap</text>
            </svg>

            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-400 px-2">
              <span>Today</span>
              <span>Year 1</span>
              <span>Year 5</span>
              <span>Year 10</span>
              <span>Year 18</span>
            </div>
          </div>

          <p className="text-center text-sm text-gray-500">
            Small daily habits compound into massive differences over time.
          </p>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {[
            { value: '70%', label: 'of GH during sleep' },
            { value: '771%', label: 'GH spike from sprints' },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-xl p-4 text-center shadow-sm">
              <p className="font-display text-2xl text-forest mb-1">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

        <button
          onClick={onNext}
          className="btn-primary w-full py-4 text-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
}
