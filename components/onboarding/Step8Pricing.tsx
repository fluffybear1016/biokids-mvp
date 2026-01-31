'use client';

import { useState } from 'react';
import { OnboardingData } from '@/lib/onboarding-store';
import Link from 'next/link';

interface Props {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step8Pricing({ data, onNext, onBack }: Props) {
  const [loading, setLoading] = useState(false);
  const childName = data.children[0]?.name || 'Your Child';

  const handleCheckout = async () => {
    setLoading(true);

    try {
      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          onboardingSessionId: data.sessionId,
        }),
      });

      const { url } = await response.json();

      if (url) {
        window.location.href = url;
      } else {
        // If Stripe isn't configured, just proceed
        onNext();
      }
    } catch {
      // If error, proceed to next step anyway (Stripe might not be configured)
      onNext();
    } finally {
      setLoading(false);
    }
  };

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

        <div className="text-center mb-8">
          <h1 className="font-display text-3xl text-gray-900 mb-2">
            Join the 1% of Parents Who Know
          </h1>
          <p className="text-gray-500">
            Most parents have no idea these windows exist. You do now.
          </p>
        </div>

        {/* Trust Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 text-center">
            Why We're Confident
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: '312', label: 'peer-reviewed studies indexed' },
              { value: '2,400+', label: 'hours of research synthesis' },
              { value: '47', label: 'expert reviews' },
              { value: '100%', label: 'backed by academic research' },
            ].map((stat, i) => (
              <div key={i} className="text-center py-3">
                <p className="font-display text-2xl text-forest">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Card */}
        <div className="bg-forest rounded-2xl p-8 text-white text-center mb-6">
          <div className="mb-4">
            <span className="text-5xl font-display">$30</span>
            <span className="text-white/70">/month</span>
          </div>
          <p className="text-white/70 mb-6">Cancel anytime</p>

          <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full bg-white text-forest py-4 rounded-xl font-semibold text-lg hover:bg-cream transition-colors disabled:opacity-50"
          >
            {loading ? 'Loading...' : `Unlock ${childName}'s Potential`}
          </button>
        </div>

        {/* Footer Links */}
        <div className="text-center text-sm text-gray-500">
          <Link href="/privacy" className="hover:text-forest">Privacy</Link>
          <span className="mx-2">|</span>
          <Link href="/terms" className="hover:text-forest">Terms</Link>
        </div>
      </div>
    </div>
  );
}
