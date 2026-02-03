'use client';

import { useState } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';

type AccordionItem = {
  id: string;
  title: string;
  intro: string;
  explanation: string;
  flow: string;
  citation: string;
};

const accordionData: AccordionItem[] = [
  {
    id: 'growth-signals',
    title: 'How growth signals are made',
    intro: 'GH is released primarily during deep sleep — about 70% of daily GH comes out in the first 3 hours after falling asleep.',
    explanation: "Think of your child's brain as having a 'growth broadcast' that only turns on during deep sleep. The hypothalamus sends a signal (GHRH) that tells the pituitary to release a big pulse of growth hormone. But here's the catch — if there's insulin in the bloodstream from a recent meal, it jams the signal. The broadcast gets blocked. That's why eating before bed can cut GH release by up to 80%. Morning sunlight sets the timer for when this broadcast happens — miss the light, and the whole schedule drifts.",
    flow: 'Morning light → Sets internal clock → Deep sleep triggers GH broadcast → (Insulin blocks it)',
    citation: 'Van Cauter E. JAMA. 2000',
  },
  {
    id: 'signals-reach-body',
    title: 'How those signals reach the body',
    intro: "GH receptors are mature and efficient. The key now is making sure each GH pulse 'counts.'",
    explanation: "GH is the message, but your child's liver is the translator. When GH hits the liver, it flips a switch (JAK2-STAT5) that produces IGF-1 — the actual growth molecule that reaches bones and muscles. Protein is the raw material for this translation. Low protein = weak translation, even if GH is fine. Inflammation from junk food or excess body fat installs a 'dimmer switch' (called SOCS) that weakens the signal. This is why two kids with identical GH levels can grow at totally different rates.",
    flow: 'GH → Liver switch (JAK2-STAT5) → IGF-1 production → (Protein amplifies; Inflammation dims)',
    citation: 'Hoppe C. Am J Clin Nutr. 2004',
  },
  {
    id: 'bones-grow',
    title: 'How bones actually grow',
    intro: 'Growth plates are fully open and highly responsive. Activity type matters — impact loading signals bones to grow.',
    explanation: "Growth plates are like construction sites at the ends of bones. IGF-1 is the foreman telling workers (chondrocytes) to build. But there's a second signal: mechanical force. Every time your child jumps, sprints, or lands hard, sensors in the growth plate detect it and say 'we need more structure here.' That's why jumping and sprinting grow bones more than swimming or cycling — impact is information. The plates stay open until estrogen shows up and tells the workers to go home permanently. More body fat = more estrogen = earlier shutdown.",
    flow: 'IGF-1 + Impact → Growth plate builds → Estrogen eventually closes the site (fat accelerates this)',
    citation: 'Stokes KA. Sports Med. 2002; Nilsson O. Endocr Rev. 2005',
  },
];

export default function StagePage() {
  const [openSection, setOpenSection] = useState<string | null>('growth-signals');
  const [showStages, setShowStages] = useState(false);

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
                <div className="px-5 sm:px-6 pb-6 sm:pb-8 pt-0">
                  <div className="pl-12 sm:pl-14 space-y-5">
                    {/* Intro */}
                    <p className="text-gray-900 font-medium text-sm sm:text-base leading-relaxed">
                      {item.intro}
                    </p>

                    {/* Explanation */}
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                      {item.explanation}
                    </p>

                    {/* Flow diagram */}
                    <div className="bg-forest/5 rounded-xl p-4 border border-forest/10">
                      <p className="text-forest text-sm font-mono leading-relaxed">
                        {item.flow}
                      </p>
                    </div>

                    {/* Citation */}
                    <p className="text-gray-400 text-sm italic">
                      [{item.citation}]
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* See all stages */}
        <div className="mt-8">
          <button
            onClick={() => setShowStages(!showStages)}
            className="flex items-center gap-2 text-forest hover:text-forest-dark transition-colors font-medium"
          >
            <span>See all stages</span>
            <svg
              className={`w-4 h-4 transition-transform ${showStages ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showStages && (
            <div className="mt-4 bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="font-medium text-gray-900">Pre-Puberty (Ages 7-11)</span>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Current</span>
              </div>
              <p className="text-sm text-gray-500 italic">More stages coming soon</p>
            </div>
          )}
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
