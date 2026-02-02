'use client';

import { useState } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';

type AccordionItem = {
  id: string;
  title: string;
  points: {
    text: string;
    citation?: string;
  }[];
};

const accordionData: AccordionItem[] = [
  {
    id: 'growth-plates',
    title: 'Growth plates are still responsive',
    points: [
      {
        text: 'Epiphyseal plates contain chondrocytes that respond to GH/IGF-1 signaling',
      },
      {
        text: 'Plates close when estrogen rises (girls 14-16, boys 16-18)',
      },
      {
        text: 'Nilsson O. Endocr Rev. 2005',
        citation: 'Nilsson O. Endocr Rev. 2005',
      },
    ],
  },
  {
    id: 'gh-pulses',
    title: 'GH pulses are sleep-gated',
    points: [
      {
        text: '70% of daily GH released in first 3 hours of sleep during slow-wave phases',
      },
      {
        text: 'Disrupted sleep = disrupted GH pulses',
      },
      {
        text: 'Van Cauter E. JAMA 2000',
        citation: 'Van Cauter E. JAMA 2000',
      },
    ],
  },
  {
    id: 'mechanical-load',
    title: 'Mechanical load signals bone elongation',
    points: [
      {
        text: 'Impact and stretching stimulate chondrocyte activity in growth plates',
      },
      {
        text: 'Sprint intervals spike GH 450-771%',
      },
      {
        text: 'Stokes KA. Sports Med. 2002',
        citation: 'Stokes KA. Sports Med. 2002',
      },
    ],
  },
];

export default function StagePage() {
  const [openSection, setOpenSection] = useState<string | null>('growth-plates');

  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-cream">
      <Nav />

      <main className="max-w-2xl mx-auto px-4 py-12 sm:py-20">
        {/* Back link */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-forest hover:text-forest-dark transition-colors mb-8 sm:mb-12"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </Link>

        {/* Header */}
        <header className="mb-12 sm:mb-16">
          <h1 className="font-display text-3xl sm:text-4xl text-gray-900 mb-4">
            Why This Stage Matters
          </h1>
          <p className="text-lg sm:text-xl text-gray-600">
            This stage is governed by three biological facts:
          </p>
        </header>

        {/* Accordion */}
        <div className="space-y-4">
          {accordionData.map((item, index) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => toggleSection(item.id)}
                className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="w-8 h-8 sm:w-10 sm:h-10 bg-forest/10 text-forest rounded-full flex items-center justify-center font-semibold text-sm sm:text-base">
                    {index + 1}
                  </span>
                  <h2 className="font-semibold text-base sm:text-lg text-gray-900">
                    {item.title}
                  </h2>
                </div>
                <svg
                  className={`w-5 h-5 text-gray-400 transition-transform ${openSection === item.id ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {openSection === item.id && (
                <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
                  <div className="pl-12 sm:pl-14 space-y-4">
                    {item.points.map((point, pointIndex) => (
                      <div key={pointIndex} className="flex items-start gap-3">
                        {point.citation ? (
                          <span className="text-sm text-gray-400 italic">
                            [{point.citation}]
                          </span>
                        ) : (
                          <>
                            <span className="w-1.5 h-1.5 bg-forest rounded-full mt-2 flex-shrink-0" />
                            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                              {point.text}
                            </p>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 sm:mt-16 p-6 sm:p-8 bg-forest rounded-2xl text-white text-center">
          <h3 className="font-display text-xl sm:text-2xl mb-3">
            The window is open now.
          </h3>
          <p className="text-white/80 mb-6 max-w-md mx-auto">
            Every day matters during this stage. The protocol is designed to maximize every opportunity.
          </p>
          <Link
            href="/protocol"
            className="inline-flex items-center gap-2 bg-white text-forest px-6 py-3 rounded-xl font-semibold hover:bg-cream transition-colors"
          >
            View the Protocol
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </main>
    </div>
  );
}
