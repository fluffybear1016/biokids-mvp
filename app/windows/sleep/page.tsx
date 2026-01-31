'use client';

import Link from 'next/link';
import Nav from '@/components/Nav';
import { Child } from '@/lib/supabase';

const mockChild: Child = {
  id: '1',
  user_id: '1',
  name: 'Emma',
  birth_date: '2017-03-15',
  gender: 'female',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export default function SleepWindow() {
  const child = mockChild;

  return (
    <div className="min-h-screen bg-cream">
      <Nav currentChild={child} />
      
      <main className="max-w-3xl mx-auto px-4 py-12">
        
        {/* Back Link */}
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-forest mb-6">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </Link>

        {/* Header */}
        <header className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-10 text-white mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 text-[150px] opacity-15">🌙</div>
          <div className="flex justify-between items-start mb-5 relative">
            <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-semibold">🌙 Growth Window</span>
            <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full" />
              Peak Phase
            </span>
          </div>
          <h1 className="font-display text-5xl mb-4 relative">Golden Sleep Window</h1>
          <p className="text-lg text-white/90 max-w-xl relative">
            Growth hormone is released in pulses during deep sleep, with 70% occurring in the first 3 sleep cycles. Peak secretion happens 1-2 hours after sleep onset.
          </p>
          <div className="flex gap-8 mt-8 pt-6 border-t border-white/20">
            <div>
              <span className="font-display text-4xl">70%</span>
              <span className="text-sm text-white/80 ml-2">of daily GH released during sleep</span>
            </div>
            <div>
              <span className="font-display text-4xl">1-2hr</span>
              <span className="text-sm text-white/80 ml-2">after sleep onset = peak</span>
            </div>
          </div>
        </header>

        {/* Child Status */}
        <section className="card border-2 border-green-100 mb-6">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-light to-amber rounded-xl flex items-center justify-center text-2xl">
              {child.gender === 'female' ? '👧' : '👦'}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{child.name}'s Sleep Status</h3>
              <p className="text-sm text-gray-500">Last 7 days average</p>
            </div>
            <span className="badge-optimal">Optimal</span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: '9.2h', label: 'Avg Sleep Duration' },
              { value: '8:24p', label: 'Avg Bedtime' },
              { value: '6/7', label: 'Nights On Protocol' },
            ].map((stat) => (
              <div key={stat.label} className="bg-cream rounded-xl p-4 text-center">
                <div className="font-display text-2xl text-forest">{stat.value}</div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* The Science */}
        <section className="card mb-6">
          <h2 className="font-display text-2xl mb-4">The Science</h2>
          <p className="text-gray-600 mb-6">
            Understanding why sleep timing matters more than duration for growth hormone optimization.
          </p>
          <div className="bg-purple-50 rounded-2xl p-6">
            <div className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-2">Mechanism</div>
            <p className="text-gray-800 leading-relaxed">
              GHRH from the hypothalamus triggers pituitary GH release during slow-wave sleep (N3). 
              Melatonin gates this release — without proper melatonin signaling, GH pulses are blunted by up to 70%. 
              This is why sleep timing and light exposure before bed matter as much as total sleep duration.
            </p>
          </div>
        </section>

        {/* How to Optimize */}
        <section className="card mb-6">
          <h2 className="font-display text-2xl mb-6">How to Optimize</h2>
          <div className="space-y-4">
            {[
              { text: 'Bedtime by 9pm (before 10pm GH surge window)', citation: '[Van Cauter E. Sleep. 2000]' },
              { text: 'Complete darkness — even dim light suppresses melatonin', citation: '[Gooley JJ. J Clin Endocrinol Metab. 2011]' },
              { text: 'Bedtime milk 30 min before sleep — casein releases tryptophan over 3-7 hours', citation: '[Madziva MT. Nutrients. 2023]' },
              { text: 'Room temperature 65-68°F (18-20°C) for optimal sleep architecture', citation: '[Okamoto-Mizuno K. J Physiol Anthropol. 2012]' },
              { text: 'No food 2-3 hours before bed — insulin suppresses GH', citation: '[Ho KY. J Clin Endocrinol Metab. 1988]' },
            ].map((item) => (
              <div key={item.text} className="flex items-start gap-4 p-4 bg-cream rounded-xl hover:bg-cream-dark transition-colors">
                <div className="w-6 h-6 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium">{item.text}</div>
                  <div className="text-sm text-forest font-medium">{item.citation}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-cream-dark pt-6 mt-6">
            <div className="flex flex-wrap gap-4 text-sm text-forest">
              <span>[Van Cauter E. Sleep. 2000]</span>
              <span>[Takahashi Y. J Clin Invest. 1968]</span>
            </div>
          </div>
        </section>

        {/* Avoid */}
        <section className="bg-coral-light rounded-3xl p-8 mb-6">
          <div className="text-sm font-bold text-coral uppercase tracking-wider mb-5">⚠️ Avoid</div>
          <div className="space-y-3">
            {[
              'Caffeine after noon — blocks adenosine, fragments sleep',
              'Blue light screens 2 hours before bed',
              'Sugar before bed — insulin spike suppresses GH for 2+ hours',
              'Inconsistent bedtimes — fragments GH release by up to 70%',
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <div className="w-5 h-5 bg-coral rounded-md flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <span className="text-gray-800">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-6 border-t border-cream-dark">
          <button className="flex items-center gap-2 px-5 py-3 bg-cream rounded-xl text-sm font-semibold hover:bg-cream-dark transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            Save
          </button>
          <button className="flex items-center gap-2 px-5 py-3 bg-cream rounded-xl text-sm font-semibold hover:bg-cream-dark transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Share
          </button>
          <button className="flex items-center gap-2 px-5 py-3 bg-forest text-white rounded-xl text-sm font-semibold hover:bg-forest-dark transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Ask Jarvis
          </button>
        </div>

      </main>
    </div>
  );
}
