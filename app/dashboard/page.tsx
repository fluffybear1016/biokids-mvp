'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';
import { Child, GrowthWindow, getGrowthStage, stageInfo, formatAge } from '@/lib/supabase';

// Right sidebar secrets - rotates daily
const sidebarSecrets = [
  "Kids are wired for whole foods until sugar rewires them. Never let junk compete. Fruit first, fill up on protein/milk/vegetables. Result: No food battles.",
  "70% of growth hormone is released in the first 3 hours of sleep. An 8:30pm bedtime captures the critical 10pm-1am surge.",
  "30-second sprints trigger 771% GH increase. Steady cardio doesn't come close.",
  "Eating within 2 hours of sleep suppresses GH by up to 80%.",
  "Morning sunlight within 30 min of waking sets the master clock for optimal GH release.",
  "Excess body fat produces estrogen, signaling growth plates to close earlier.",
];

// Growth Secrets - rotates daily
const growthSecrets = [
  {
    icon: '🌙',
    title: '70% of GH in the First 3 Hours',
    text: 'Growth hormone is released in pulses during deep sleep, with 70% occurring in the first 3 sleep cycles. An 8:30pm bedtime captures the critical 10pm-1am surge.',
    citation: '[Van Cauter E. Sleep. 2000]',
  },
  {
    icon: '🍽️',
    title: 'The Insulin-GH Trade-off',
    text: 'Eating within 2 hours of sleep spikes insulin, which suppresses growth hormone by up to 80%. That bedtime snack? It\'s costing inches.',
    citation: '[Ho KY. J Clin Endocrinol Metab. 1988]',
  },
  {
    icon: '🏃',
    title: 'The 771% Sprint Effect',
    text: '30-second all-out sprints trigger GH release up to 771% above baseline. Steady-state cardio doesn\'t come close. Six sprints, 3x per week.',
    citation: '[Stokes KA. Sports Med. 2002]',
  },
  {
    icon: '🥛',
    title: 'Why the Dutch Are Tallest',
    text: 'The Netherlands has the tallest population on Earth — and the highest milk consumption. A2 casein proteins directly support IGF-1 production.',
    citation: '[Hoppe C. Am J Clin Nutr. 2004]',
  },
  {
    icon: '⚖️',
    title: 'Fat Closes Growth Plates',
    text: 'Excess body fat produces estrogen via aromatase. Elevated estrogen signals growth plates to ossify (close) earlier — potentially costing years of growth.',
    citation: '[Nilsson O. Endocr Rev. 2005]',
  },
  {
    icon: '☀️',
    title: 'Morning Light Sets the Clock',
    text: '10-30 minutes of sunlight within 30 minutes of waking synchronizes the master clock, which controls melatonin timing — and melatonin gates GH release.',
    citation: '[Roenneberg T. Curr Biol. 2007]',
  },
];

// Mock data for now - will be replaced with Supabase
const mockChild: Child = {
  id: '1',
  user_id: '1',
  name: 'Emma',
  birth_date: '2017-03-15',
  gender: 'female',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const mockGrowthWindow: GrowthWindow = {
  id: '1',
  child_id: '1',
  sleep_avg_hours: 9.2,
  sleep_avg_bedtime: '20:24:00',
  sleep_nights_on_protocol: 6,
  sleep_status: 'optimal',
  height_percentile: 78,
  height_previous_percentile: 65,
  circadian_days_aligned: 6,
  circadian_avg_wake_time: '06:45:00',
  circadian_morning_sunlight_days: 4,
  circadian_status: 'check',
  week_of: '2026-01-27',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export default function Dashboard() {
  const [child, setChild] = useState<Child>(mockChild);
  const [growthWindow, setGrowthWindow] = useState<GrowthWindow>(mockGrowthWindow);
  const [todayProtocol, setTodayProtocol] = useState({
    morning_protein: true,
    sprints: false,
    dinner_early: false,
    lights_out: false,
  });
  const [currentHour, setCurrentHour] = useState(new Date().getHours());

  // Time-based active phase data
  const getActivePhase = (hour: number) => {
    if (hour >= 6 && hour < 10) {
      return {
        emoji: '☀️',
        title: 'Morning Light',
        subtitle: 'Circadian rhythm syncing',
        tip: 'Get 10-30 minutes of direct sunlight within 30 minutes of waking to set the master clock.',
      };
    } else if (hour >= 10 && hour < 14) {
      return {
        emoji: '🏃',
        title: 'Peak Activity',
        subtitle: 'Growth hormone primed',
        tip: 'Ideal time for sprint intervals — 6x30 second all-out efforts trigger up to 771% GH increase.',
      };
    } else if (hour >= 14 && hour < 18) {
      return {
        emoji: '⚽',
        title: 'Active Play',
        subtitle: 'Movement window open',
        tip: 'Encourage jumping, climbing, and active play. Impact activities stimulate bone growth.',
      };
    } else if (hour >= 18 && hour < 20) {
      return {
        emoji: '🌅',
        title: 'Wind Down',
        subtitle: 'Preparing for GH release',
        tip: 'Dim lights, finish dinner, and avoid screens. Blue light after sunset suppresses melatonin.',
      };
    } else if (hour >= 20 && hour < 22) {
      return {
        emoji: '🌙',
        title: 'Golden Sleep',
        subtitle: 'Growth hormone releasing',
        tip: 'Maintain consistent bedtime. Consider magnesium-rich foods or bath for deeper sleep.',
      };
    } else {
      return {
        emoji: '💤',
        title: 'Deep Sleep',
        subtitle: 'Peak GH secretion',
        tip: 'Avoid waking them — 70% of growth hormone is released in the first 3 hours of sleep.',
      };
    }
  };

  const activePhase = getActivePhase(currentHour);

  // Rotate secret based on day of year
  const [currentSecret, setCurrentSecret] = useState(growthSecrets[0]);
  const [sidebarSecret, setSidebarSecret] = useState(sidebarSecrets[0]);

  useEffect(() => {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    const secretIndex = dayOfYear % growthSecrets.length;
    const sidebarSecretIndex = dayOfYear % sidebarSecrets.length;
    setCurrentSecret(growthSecrets[secretIndex]);
    setSidebarSecret(sidebarSecrets[sidebarSecretIndex]);

    // Update current hour every minute
    const interval = setInterval(() => {
      setCurrentHour(new Date().getHours());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const stage = getGrowthStage(child.birth_date);
  const stageData = stageInfo[stage];

  const toggleProtocol = (key: keyof typeof todayProtocol) => {
    setTodayProtocol(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const completedCount = Object.values(todayProtocol).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-cream">
      <Nav currentChild={child} />

      <div className="flex">
        {/* Main Content */}
        <main className="flex-1 max-w-4xl mx-auto px-4 py-12">

        {/* Window Status Hero */}
        <section className="bg-gradient-to-br from-forest to-forest-light rounded-3xl p-10 text-white mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-radial from-white/10 to-transparent opacity-50" />
          
          <div className="flex justify-between items-start mb-6 relative">
            <span className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm font-semibold">
              <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse-dot" />
              Window is OPEN
            </span>
            <div className="text-right">
              <div className="font-semibold">{child.name}</div>
              <div className="text-sm text-white/70">Age {formatAge(child.birth_date)}</div>
            </div>
          </div>
          
          <div className="relative">
            <div className="text-sm uppercase tracking-wider text-white/70 mb-2">Current Stage</div>
            <h1 className="font-display text-5xl mb-4">{stageData.label} Window</h1>
            <p className="text-lg text-white/90 max-w-lg">
              This is the highest-leverage period for natural GH optimization. Growth plates are fully open and highly responsive to lifestyle inputs.
            </p>
            <Link 
              href="/protocol" 
              className="inline-flex items-center gap-2 bg-white text-forest px-6 py-3 rounded-xl font-semibold mt-6 hover:bg-cream transition-colors"
            >
              See Full Protocol
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </section>

        {/* Eight Category Windows */}
        <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Link href="/windows/baseline-screening" className="card hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-slate-400 to-slate-600 rounded-xl flex items-center justify-center text-xl mb-3">🔬</div>
            <h3 className="font-semibold text-base">Baseline Screening</h3>
          </Link>

          <Link href="/windows/sleep-circadian" className="card hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-xl flex items-center justify-center text-xl mb-3">🌙</div>
            <h3 className="font-semibold text-base">Sleep/Circadian</h3>
          </Link>

          <Link href="/windows/nutrition" className="card hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center text-xl mb-3">🥛</div>
            <h3 className="font-semibold text-base">Nutrition</h3>
          </Link>

          <Link href="/windows/body-composition" className="card hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-xl flex items-center justify-center text-xl mb-3">⚖️</div>
            <h3 className="font-semibold text-base">Body Composition</h3>
          </Link>

          <Link href="/windows/physical-activity" className="card hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center text-xl mb-3">🏃</div>
            <h3 className="font-semibold text-base">Physical Activity</h3>
          </Link>

          <Link href="/windows/psychological" className="card hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-pink-600 rounded-xl flex items-center justify-center text-xl mb-3">🧠</div>
            <h3 className="font-semibold text-base">Psychological</h3>
          </Link>

          <Link href="/windows/toxins" className="card hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex items-center justify-center text-xl mb-3">🛡️</div>
            <h3 className="font-semibold text-base">Toxins</h3>
          </Link>

          <Link href="/windows/gut-health" className="card hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center text-xl mb-3">🦠</div>
            <h3 className="font-semibold text-base">Gut Health</h3>
          </Link>
        </section>

        {/* Today's Protocol */}
        <section className="card mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-display text-2xl">Today's Protocol</h2>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">{completedCount} of 4 done</span>
              <div className="w-24 progress-bar">
                <div 
                  className="progress-bar-fill bg-green-500" 
                  style={{ width: `${(completedCount / 4) * 100}%` }} 
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            {[
              { key: 'morning_protein', icon: '🥛', title: 'Morning protein + raw milk', desc: 'A2 casein + amino acids support IGF-1 axis', time: 'Morning' },
              { key: 'sprints', icon: '🏃', title: 'Sprint intervals (6x30sec)', desc: 'High-intensity triggers 771% GH spike', time: 'After school' },
              { key: 'dinner_early', icon: '🍽️', title: 'Finish dinner by 6:00pm', desc: '2.5hr fast before bed preserves nocturnal GH', time: '6:00 PM' },
              { key: 'lights_out', icon: '🌙', title: 'Lights out by 8:30pm', desc: 'Catch the 10pm-1am deep sleep GH surge', time: '8:30 PM' },
            ].map((item) => (
              <div 
                key={item.key}
                onClick={() => toggleProtocol(item.key as keyof typeof todayProtocol)}
                className={`flex items-center gap-4 p-5 bg-cream rounded-2xl cursor-pointer transition-all hover:bg-cream-dark ${
                  todayProtocol[item.key as keyof typeof todayProtocol] ? 'opacity-60' : ''
                }`}
              >
                <div className={`checkbox-custom ${todayProtocol[item.key as keyof typeof todayProtocol] ? 'checked' : ''}`}>
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center text-xl">{item.icon}</div>
                <div className="flex-1">
                  <div className="font-semibold">{item.title}</div>
                  <div className="text-sm text-gray-500">{item.desc}</div>
                </div>
                <span className="text-sm font-semibold text-forest bg-white px-3 py-1.5 rounded-full">{item.time}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Row */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Jarvis */}
          <section className="bg-forest rounded-3xl p-7 text-white">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-11 h-11 bg-white/15 rounded-xl flex items-center justify-center text-xl">🤖</div>
              <div>
                <h3 className="font-display text-xl">Ask Jarvis</h3>
                <p className="text-sm text-white/70">Your GH optimization AI</p>
              </div>
            </div>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Ask anything..." 
                className="w-full px-5 py-4 pr-14 bg-white/10 border border-white/20 rounded-2xl text-white placeholder:text-white/50 focus:outline-none focus:bg-white/15 focus:border-white/40"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-xl flex items-center justify-center hover:scale-105 transition-transform">
                <svg className="w-5 h-5 text-forest" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {['Why 8:30pm bedtime?', 'Best GH foods', 'Sprint alternatives'].map((q) => (
                <span key={q} className="px-3 py-1.5 bg-white/10 border border-white/15 rounded-full text-xs text-white/90 cursor-pointer hover:bg-white/20">
                  {q}
                </span>
              ))}
            </div>
          </section>

          {/* Growth Secret */}
          <section className="bg-gradient-to-br from-amber-light to-amber rounded-3xl p-7 relative overflow-hidden">
            <div className="absolute bottom-0 right-0 text-8xl opacity-15">{currentSecret.icon}</div>
            <div className="relative">
              <div className="text-xs font-bold text-forest-dark uppercase tracking-wider mb-3">🔬 Growth Secret</div>
              <h3 className="font-display text-2xl text-forest-dark mb-3">{currentSecret.title}</h3>
              <p className="text-sm text-forest-dark/85 leading-relaxed mb-3">
                {currentSecret.text}
              </p>
              <span className="text-xs text-forest-dark/60">{currentSecret.citation}</span>
              <div className="flex gap-3 mt-5">
                <Link href="/learn" className="px-4 py-2 bg-white rounded-xl text-sm font-semibold text-forest hover:shadow-md transition-shadow">
                  📖 Learn More
                </Link>
                <button className="px-4 py-2 bg-white rounded-xl text-sm font-semibold text-forest hover:shadow-md transition-shadow">
                  📤 Share
                </button>
              </div>
            </div>
          </section>
        </div>

      </main>

        {/* Right Sidebar - xl screens only */}
        <aside className="hidden xl:block sticky top-0 h-screen w-72 flex-shrink-0 p-4 space-y-4 overflow-y-auto">
          {/* Active Now */}
          <div className="bg-white rounded-2xl p-5 border-l-4 border-green-500 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Active Now</span>
              <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-semibold">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                Live
              </span>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center text-2xl">
                {activePhase.emoji}
              </div>
              <div>
                <h3 className="font-semibold text-forest">{activePhase.title}</h3>
                <p className="text-xs text-gray-500">{activePhase.subtitle}</p>
              </div>
            </div>
            <div className="bg-green-50 rounded-lg p-3 border border-green-100">
              <p className="text-xs text-green-800 leading-relaxed">
                <span className="font-semibold">💡</span> {activePhase.tip}
              </p>
            </div>
          </div>

          {/* Why We're Confident */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Why We're Confident</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Studies indexed</span>
                <span className="font-semibold text-forest">312</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Research hours</span>
                <span className="font-semibold text-forest">2,400+</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Expert reviews</span>
                <span className="font-semibold text-forest">47</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4 pt-4 border-t border-gray-100 leading-relaxed">
              Every recommendation is backed by high end academic peer-reviewed research.
            </p>
          </div>

          {/* Growth Secrets */}
          <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200">
            <h3 className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-4 flex items-center gap-2">
              🔒 Growth Secrets
            </h3>
            <p className="text-sm text-amber-900 leading-relaxed">
              {sidebarSecret}
            </p>
            <div className="mt-4 pt-3 border-t border-amber-200">
              <span className="text-xs text-amber-600">💡 Daily tip • Refreshes tomorrow</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
