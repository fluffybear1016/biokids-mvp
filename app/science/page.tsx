'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Nav from '@/components/Nav';
import { Child, GrowthWindow, getGrowthStage, stageInfo, createClient } from '@/lib/supabase';

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

const defaultGrowthWindow: GrowthWindow = {
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
  const router = useRouter();
  const [child, setChild] = useState<Child | null>(null);
  const [growthWindow, setGrowthWindow] = useState<GrowthWindow>(defaultGrowthWindow);
  const [currentHour, setCurrentHour] = useState(new Date().getHours());
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch child data via server API
  useEffect(() => {
    const supabase = createClient();
    if (!supabase) { setLoading(false); return; }

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session?.user) { setLoading(false); return; }

      fetch(`/api/auth/user-state?userId=${session.user.id}`)
        .then(res => res.json())
        .then(data => {
          if (data.children && data.children.length > 0) {
            const c = data.children[0];
            setChild({
              id: c.id,
              user_id: session.user.id,
              name: c.name,
              birth_date: c.birth_date,
              gender: null,
              created_at: c.created_at,
              updated_at: c.created_at,
            });
          }
        })
        .catch(err => console.error('Fetch child error:', err))
        .finally(() => setLoading(false));
    });
  }, []);

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

  const birthDate = child?.birth_date || (typeof window !== 'undefined' ? (() => {
    const m = localStorage.getItem('childBirthMonth');
    const y = localStorage.getItem('childBirthYear');
    return m && y ? `${y}-${m.padStart(2, '0')}-01` : null;
  })() : null);
  const stage = getGrowthStage(birthDate);
  const stageData = stageInfo[stage];
  const childName = child?.name || (typeof window !== 'undefined' && localStorage.getItem('childName')) || 'Your child';

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-forest font-mono">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <Nav currentChild={child} />

      <div className="flex">
        {/* Main Content */}
        <main className="flex-1 max-w-4xl mx-auto px-4 py-6 sm:py-12">

        {/* Search Bar */}
        <form
          onSubmit={(e) => { e.preventDefault(); if (searchQuery.trim()) router.push(`/jarvis?q=${encodeURIComponent(searchQuery.trim())}`); }}
          style={{ marginBottom: 24 }}
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Ask anything about growth optimization..."
            style={{ width: '100%', padding: '14px 16px', fontSize: 14, color: '#1B4332', background: 'white', border: '1px solid #e5e5e5', borderRadius: 10, outline: 'none' }}
          />
        </form>

        {/* Stage Hero */}
        <section className="bg-gradient-to-br from-forest to-forest-light rounded-2xl sm:rounded-3xl p-5 sm:p-10 text-white mb-6 sm:mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-radial from-white/10 to-transparent opacity-50" />

          <div className="flex justify-between items-start mb-4 sm:mb-6 relative">
            <span className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/20 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">
              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-green-400 rounded-full animate-pulse-dot" />
              Window is OPEN
            </span>
          </div>

          <div className="relative">
            <div className="text-xs sm:text-sm text-white/70 mb-1 sm:mb-2">Where {childName} is right now</div>
            <h1 className="font-display text-3xl sm:text-5xl mb-2 sm:mb-3">{stageData.label}</h1>
            <p className="text-sm sm:text-base text-white/60 mb-4 sm:mb-5">
              You have time. {childName} is in the optimal window.
            </p>
            <p className="text-sm sm:text-lg text-white/90 max-w-lg">
              This is the highest-leverage stage for supporting natural growth. Small consistent actions now make a big difference.
            </p>
            <Link
              href="/stage"
              className="inline-flex items-center gap-2 bg-white text-forest px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold mt-4 sm:mt-6 hover:bg-cream transition-colors text-sm sm:text-base"
            >
              See what matters most →
            </Link>
          </div>
        </section>

        {/* Category Cards */}
        <section className="grid grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <Link href="/windows/sleep-circadian" style={{ background: 'white', border: '1px solid #e5e5e5', borderRadius: 10, padding: '16px 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', fontFamily: "'Courier New', Courier, monospace", fontSize: 14, fontWeight: 600, color: '#1B4332', transition: 'all 0.2s' }} className="hover:shadow-lg hover:-translate-y-1">
            Sleep
          </Link>
          <Link href="/windows/nutrition" style={{ background: 'white', border: '1px solid #e5e5e5', borderRadius: 10, padding: '16px 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', fontFamily: "'Courier New', Courier, monospace", fontSize: 14, fontWeight: 600, color: '#1B4332', transition: 'all 0.2s' }} className="hover:shadow-lg hover:-translate-y-1">
            Nutrition
          </Link>
          <Link href="/windows/physical-activity" style={{ background: 'white', border: '1px solid #e5e5e5', borderRadius: 10, padding: '16px 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', fontFamily: "'Courier New', Courier, monospace", fontSize: 14, fontWeight: 600, color: '#1B4332', transition: 'all 0.2s' }} className="hover:shadow-lg hover:-translate-y-1">
            Movement
          </Link>
        </section>

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
