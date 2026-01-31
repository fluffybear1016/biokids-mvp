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

export default function BaselineScreeningWindow() {
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
        <header className="bg-gradient-to-br from-slate-500 to-slate-600 rounded-3xl p-10 text-white mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 text-[150px] opacity-15">🔬</div>
          <div className="flex justify-between items-start mb-5 relative">
            <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-semibold">🔬 Baseline Assessment</span>
            <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-300 rounded-full" />
              Pending
            </span>
          </div>
          <h1 className="font-display text-5xl mb-4 relative">Baseline Screening</h1>
          <p className="text-lg text-white/90 max-w-xl relative">
            Establish your child's growth baseline with bone age X-ray, IGF-1 levels, and key hormone markers. This data personalizes the protocol.
          </p>
          <div className="flex gap-8 mt-8 pt-6 border-t border-white/20">
            <div>
              <span className="font-display text-4xl">5</span>
              <span className="text-sm text-white/80 ml-2">key tests</span>
            </div>
            <div>
              <span className="font-display text-4xl">1x/yr</span>
              <span className="text-sm text-white/80 ml-2">recommended</span>
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
              <h3 className="font-semibold text-lg">{child.name}'s Screening Status</h3>
              <p className="text-sm text-gray-500">Pre-Puberty Window · Age 8</p>
            </div>
            <span className="badge-check">Pending</span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: '—', label: 'Bone Age', note: 'Not tested' },
              { value: '—', label: 'IGF-1 Level', note: 'Not tested' },
              { value: '—', label: 'Growth Velocity', note: 'Needs data' },
            ].map((stat) => (
              <div key={stat.label} className="bg-cream rounded-xl p-4 text-center">
                <div className="font-display text-2xl text-forest">{stat.value}</div>
                <div className="text-xs text-gray-500">{stat.label}</div>
                {stat.note && <div className="text-xs text-amber-600 font-semibold mt-1">{stat.note}</div>}
              </div>
            ))}
          </div>
        </section>

        {/* The Science */}
        <section className="card mb-6">
          <h2 className="font-display text-2xl mb-4">The Science</h2>
          <p className="text-gray-600 mb-6">
            Understanding baseline metrics helps predict growth potential and optimize interventions.
          </p>
          <div className="bg-slate-50 rounded-2xl p-6">
            <div className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Mechanism</div>
            <p className="text-gray-800 leading-relaxed">
              Bone age X-rays reveal skeletal maturity vs. chronological age. Children with bone age younger than their actual age have more growth potential remaining.
              IGF-1 levels indicate GH axis activity. Growth velocity (cm/year) tracks whether interventions are working.
              These metrics together predict adult height within 2-3cm accuracy.
            </p>
          </div>
        </section>

        {/* How to Optimize */}
        <section className="card mb-6">
          <h2 className="font-display text-2xl mb-6">Recommended Tests</h2>
          <div className="space-y-4">
            {[
              { text: 'Bone age X-ray (left hand/wrist) — reveals skeletal maturity', citation: '[Greulich & Pyle method]' },
              { text: 'IGF-1 blood test — indicates growth hormone axis activity', citation: '[Consensus Guidelines, 2016]' },
              { text: 'Height measurement (stadiometer) — track growth velocity', citation: '[WHO Growth Standards]' },
              { text: 'Thyroid panel (TSH, T4) — thyroid affects growth', citation: '[Pediatric Endocrine Society]' },
              { text: 'Vitamin D level — essential for bone growth', citation: '[Holick MF. NEJM. 2007]' },
            ].map((item) => (
              <div key={item.text} className="flex items-start gap-4 p-4 bg-cream rounded-xl hover:bg-cream-dark transition-colors">
                <div className="w-6 h-6 bg-slate-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
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
          <div className="text-sm font-bold text-coral uppercase tracking-wider mb-5">⚠️ Important Notes</div>
          <div className="space-y-3">
            {[
              'Don\'t delay screening — earlier data enables better optimization',
              'Avoid comparing to population averages without bone age context',
              'Single measurements are less useful than trends over time',
              'Don\'t panic about IGF-1 — many factors influence it',
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
