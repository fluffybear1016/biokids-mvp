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

export default function PsychologicalWindow() {
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
        <header className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-3xl p-10 text-white mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 text-[150px] opacity-15">🧠</div>
          <div className="flex justify-between items-start mb-5 relative">
            <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-semibold">🧠 Psychological</span>
            <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full" />
              Optimal
            </span>
          </div>
          <h1 className="font-display text-5xl mb-4 relative">Psychological</h1>
          <p className="text-lg text-white/90 max-w-xl relative">
            Chronic stress elevates cortisol, which directly suppresses GH secretion. Emotional security and low-stress environments optimize the hormonal milieu for growth.
          </p>
          <div className="flex gap-8 mt-8 pt-6 border-t border-white/20">
            <div>
              <span className="font-display text-4xl">↓ GH</span>
              <span className="text-sm text-white/80 ml-2">with chronic cortisol</span>
            </div>
            <div>
              <span className="font-display text-4xl">Secure</span>
              <span className="text-sm text-white/80 ml-2">attachment = growth</span>
            </div>
          </div>
        </header>

        {/* Child Status */}
        <section className="card border-2 border-blue-100 mb-6">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-light to-amber rounded-xl flex items-center justify-center text-2xl">
              {child.gender === 'female' ? '👧' : '👦'}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{child.name}'s Stress Profile</h3>
              <p className="text-sm text-gray-500">Pre-Puberty Window · Age 8</p>
            </div>
            <span className="badge-optimal">Optimal</span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: 'Low', label: 'Stress Level', note: '✓ Favorable' },
              { value: 'Secure', label: 'Attachment Style', note: '✓ Healthy' },
              { value: '8hr', label: 'Play Time/Week', note: '✓ Adequate' },
            ].map((stat) => (
              <div key={stat.label} className="bg-cream rounded-xl p-4 text-center">
                <div className="font-display text-2xl text-forest">{stat.value}</div>
                <div className="text-xs text-gray-500">{stat.label}</div>
                {stat.note && <div className="text-xs text-green-600 font-semibold mt-1">{stat.note}</div>}
              </div>
            ))}
          </div>
        </section>

        {/* The Science */}
        <section className="card mb-6">
          <h2 className="font-display text-2xl mb-4">The Science</h2>
          <p className="text-gray-600 mb-6">
            Understanding the stress-growth connection and psychosocial dwarfism.
          </p>
          <div className="bg-pink-50 rounded-2xl p-6">
            <div className="text-xs font-bold text-pink-600 uppercase tracking-wider mb-2">Mechanism</div>
            <p className="text-gray-800 leading-relaxed">
              Cortisol (stress hormone) directly inhibits GH secretion and blocks GH receptor signaling. Chronic stress creates persistently elevated cortisol, continuously suppressing growth.
              "Psychosocial dwarfism" is a documented phenomenon where children in high-stress environments show stunted growth despite adequate nutrition.
              Secure attachment, emotional safety, and play activate parasympathetic nervous system — the "rest and digest" state where growth happens.
            </p>
          </div>
        </section>

        {/* How to Optimize */}
        <section className="card mb-6">
          <h2 className="font-display text-2xl mb-6">How to Optimize</h2>
          <div className="space-y-4">
            {[
              { text: 'Secure attachment — emotional safety enables growth', citation: '[Bowlby J. Attachment Theory. 1969]' },
              { text: 'Unstructured play time — reduces cortisol naturally', citation: '[Gray P. Am J Play. 2011]' },
              { text: 'Consistent routines — predictability reduces stress', citation: '[Spagnola M. Infants Young Child. 2007]' },
              { text: 'Adequate sleep — sleep deprivation raises cortisol', citation: '[Leproult R. Sleep. 1997]' },
              { text: 'Nature exposure — lowers cortisol within 20 minutes', citation: '[Hunter MR. Front Psychol. 2019]' },
            ].map((item) => (
              <div key={item.text} className="flex items-start gap-4 p-4 bg-cream rounded-xl hover:bg-cream-dark transition-colors">
                <div className="w-6 h-6 bg-pink-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
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
        </section>

        {/* Avoid */}
        <section className="bg-coral-light rounded-3xl p-8 mb-6">
          <div className="text-sm font-bold text-coral uppercase tracking-wider mb-5">⚠️ Avoid</div>
          <div className="space-y-3">
            {[
              'Chronic family conflict — persistent cortisol elevation',
              'Over-scheduling — no downtime increases stress hormones',
              'Academic pressure beyond ability — chronic stress response',
              'Sleep deprivation — amplifies cortisol and suppresses GH',
              'Social isolation — humans need connection for optimal development',
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
