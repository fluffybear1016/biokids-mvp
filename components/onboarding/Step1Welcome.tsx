'use client';

import { OnboardingData } from '@/lib/onboarding-store';

interface Props {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step1Welcome({ onNext }: Props) {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6 py-12">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-10">
          <h1 className="font-display text-4xl md:text-5xl text-gray-900 mb-4">
            Unlock Your Child's<br />
            <span className="text-forest">Full Potential</span>
          </h1>
          <p className="text-lg text-gray-600">
            A small change can make a big difference.
          </p>
        </div>

        {/* Growth Trajectory Graph */}
        <div className="bg-white rounded-3xl p-8 shadow-lg mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-900">Growth Trajectory</h3>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 bg-gray-300 rounded-full"></span>
                Average
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 bg-forest rounded-full"></span>
                bioKid
              </span>
            </div>
          </div>

          <div className="relative h-48 mb-4">
            <svg viewBox="0 0 400 160" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <pattern id="onboarding-grid" width="40" height="32" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 32" fill="none" stroke="#f5f5f5" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#onboarding-grid)" />

              {/* Average child curve */}
              <path
                d="M 20 140 Q 100 130, 150 110 Q 200 90, 250 75 Q 300 60, 380 50"
                fill="none"
                stroke="#d1d5db"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* bioKid curve */}
              <path
                d="M 20 140 Q 100 120, 150 85 Q 200 50, 250 30 Q 300 18, 380 12"
                fill="none"
                stroke="#2D5A47"
                strokeWidth="3"
                strokeLinecap="round"
              />

              <circle cx="20" cy="140" r="5" fill="#2D5A47" />
              <circle cx="380" cy="50" r="4" fill="#d1d5db" />
              <circle cx="380" cy="12" r="5" fill="#2D5A47" />

              <line x1="385" y1="50" x2="385" y2="12" stroke="#E8A849" strokeWidth="2" strokeDasharray="4,4" />
            </svg>

            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-400 px-2">
              <span>Birth</span>
              <span>Age 5</span>
              <span>Age 10</span>
              <span>Age 15</span>
              <span>Age 25</span>
            </div>
          </div>

          <p className="text-center text-sm text-gray-500">
            Same starting point. Different protocol. Different outcome.
          </p>
        </div>

        {/* Evidence Hook */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
              🧬
            </div>
            <div>
              <p className="font-semibold text-gray-900 mb-1">Did you know?</p>
              <p className="text-gray-700">
                30-second sprints trigger a <span className="font-bold text-amber-700">771% growth hormone spike</span>.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                [Stokes KA. Sports Med. 2002]
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={onNext}
          className="btn-primary w-full text-lg py-4"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
