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

// Shared style tokens
const font = "'Courier New', Courier, monospace";
const col = {
  bg: '#fafaf9',
  title: '#1c1917',
  body: '#57534e',
  light: '#a8a29e',
  green: '#059669',
  card: '#fff',
  border: '#e7e5e4',
  sigBorder: '#a7f3d0',
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
      <div style={{ minHeight: '100vh', background: col.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontFamily: font, color: col.body }}>Loading...</div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: col.bg }}>
      <Nav currentChild={child} />

      <div style={{ maxWidth: 540, margin: '0 auto', padding: '0 20px', paddingTop: 32, paddingBottom: 64 }}>

        {/* Search Bar */}
        <form
          onSubmit={(e) => { e.preventDefault(); if (searchQuery.trim()) router.push(`/jarvis?q=${encodeURIComponent(searchQuery.trim())}`); }}
          style={{ marginBottom: 44 }}
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Ask anything about growth optimization..."
            style={{
              width: '100%',
              padding: '14px 16px',
              fontSize: 14,
              fontFamily: font,
              color: col.title,
              background: col.card,
              border: `1px solid ${col.border}`,
              borderRadius: 14,
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </form>

        {/* Page Title */}
        <h1 style={{
          fontFamily: font,
          fontSize: 22,
          fontWeight: 800,
          color: col.title,
          letterSpacing: '-0.02em',
          marginBottom: 8,
        }}>
          {stageData.label}
        </h1>
        <p style={{
          fontFamily: font,
          fontSize: 14,
          color: col.body,
          lineHeight: 1.75,
          marginBottom: 44,
        }}>
          {stage === 'infancy' && `The foundation is being built. ${childName}'s growth hormone system is establishing its rhythm — this is when receptor sensitivity and nutritional foundations are set for everything that follows.`}
          {stage === 'early-childhood' && `${childName}'s growth velocity is among the highest it will ever be. The habits you build now — sleep, nutrition, movement — wire the GH system for the next decade.`}
          {stage === 'mid-childhood' && `${childName}'s growth hormone system is running at full capacity. This is the steady-state window where consistent daily actions compound quietly into real results.`}
          {stage === 'pre-puberty' && `This is prime time. ${childName}'s growth plates are wide open and the pre-puberty window is the highest-leverage stage for supporting natural growth. Small consistent actions now make a big difference.`}
          {stage === 'early-puberty' && `${childName} is entering the growth acceleration phase. Puberty amplifies everything — sleep quality, nutrition, and movement all have an outsized impact on peak growth velocity right now.`}
          {stage === 'active-puberty' && `${childName} is in the peak growth velocity window. Every month matters. The protocols you follow now determine how much of ${childName}'s genetic potential is expressed before the growth plates begin to close.`}
          {stage === 'late-growth' && `${childName}'s growth plates are in their final phase. There is still meaningful opportunity — spinal health, posture optimization, and hormonal support can add real height even now.`}
          {(stage === 'prenatal' || stage === 'adult') && `${childName} is in the ${stageData.label.toLowerCase()} stage. Every action you take supports long-term growth potential.`}
        </p>

        {/* Window Status */}
        <div style={{
          background: col.card,
          border: `2px solid ${col.sigBorder}`,
          borderRadius: 20,
          padding: '14px 18px',
          marginBottom: 44,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}>
          <span style={{
            width: 8,
            height: 8,
            background: col.green,
            borderRadius: '50%',
            display: 'inline-block',
          }} />
          <span style={{ fontFamily: font, fontSize: 14, fontWeight: 800, color: col.green }}>
            Window is OPEN
          </span>
          <span style={{ fontFamily: font, fontSize: 14, color: col.body, marginLeft: 'auto' }}>
            Where {childName} is right now
          </span>
        </div>

        {/* Category Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 44 }}>
          {[
            { href: '/windows/sleep-circadian', label: 'Sleep' },
            { href: '/windows/nutrition', label: 'Nutrition' },
            { href: '/windows/physical-activity', label: 'Movement' },
          ].map(({ href, label }) => (
            <Link key={href} href={href} style={{
              background: col.card,
              border: `1px solid ${col.border}`,
              borderRadius: 14,
              padding: '16px 12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              fontFamily: font,
              fontSize: 14,
              fontWeight: 800,
              color: col.title,
            }}>
              {label}
            </Link>
          ))}
        </div>

        <Link
          href="/stage"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            fontFamily: font,
            fontSize: 14,
            fontWeight: 800,
            color: col.green,
            textDecoration: 'none',
            marginBottom: 44,
          }}
        >
          See what matters most →
        </Link>

        {/* Active Now */}
        <div style={{
          background: col.card,
          border: `2px solid ${col.sigBorder}`,
          borderRadius: 20,
          padding: '14px 18px',
          marginBottom: 44,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <span style={{ fontFamily: font, fontSize: 11, fontWeight: 800, color: col.light, textTransform: 'uppercase' as const, letterSpacing: '0.05em' }}>Active Now</span>
            <span style={{
              fontFamily: font,
              fontSize: 11,
              fontWeight: 800,
              color: col.green,
              background: '#ecfdf5',
              padding: '2px 8px',
              borderRadius: 99,
            }}>Live</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
            <span style={{ fontSize: 24 }}>{activePhase.emoji}</span>
            <div>
              <div style={{ fontFamily: font, fontSize: 14, fontWeight: 800, color: col.title }}>{activePhase.title}</div>
              <div style={{ fontFamily: font, fontSize: 14, color: col.light }}>{activePhase.subtitle}</div>
            </div>
          </div>
          <p style={{ fontFamily: font, fontSize: 14, color: col.body, lineHeight: 1.75 }}>
            {activePhase.tip}
          </p>
        </div>

        {/* Why We're Confident */}
        <div style={{
          background: col.card,
          border: `1px solid ${col.border}`,
          borderRadius: 14,
          padding: '14px 18px',
          marginBottom: 44,
        }}>
          <div style={{ fontFamily: font, fontSize: 11, fontWeight: 800, color: col.light, textTransform: 'uppercase' as const, letterSpacing: '0.05em', marginBottom: 14 }}>Why We're Confident</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontFamily: font, fontSize: 14, color: col.body }}>Studies indexed</span>
            <span style={{ fontFamily: 'Georgia, serif', fontWeight: 800, color: col.green }}>312</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <span style={{ fontFamily: font, fontSize: 14, color: col.body }}>Research hours</span>
            <span style={{ fontFamily: 'Georgia, serif', fontWeight: 800, color: col.green }}>2,400+</span>
          </div>
          <div style={{ borderTop: `1px solid ${col.border}`, paddingTop: 14 }}>
            <p style={{ fontFamily: font, fontSize: 14, color: col.light, lineHeight: 1.75 }}>
              Every recommendation is backed by high end academic peer-reviewed research.
            </p>
          </div>
        </div>

        {/* Growth Secret of the Day */}
        <div style={{
          background: col.card,
          border: `1px solid ${col.border}`,
          borderRadius: 14,
          padding: '14px 18px',
          marginBottom: 44,
        }}>
          <div style={{ fontFamily: font, fontSize: 11, fontWeight: 800, color: col.light, textTransform: 'uppercase' as const, letterSpacing: '0.05em', marginBottom: 14 }}>Growth Secret</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <span style={{ fontSize: 20 }}>{currentSecret.icon}</span>
            <span style={{ fontFamily: font, fontSize: 14, fontWeight: 800, color: col.title }}>{currentSecret.title}</span>
          </div>
          <p style={{ fontFamily: font, fontSize: 14, color: col.body, lineHeight: 1.75, marginBottom: 10 }}>
            {currentSecret.text}
          </p>
          <p style={{ fontFamily: font, fontSize: 14, color: col.light }}>
            {currentSecret.citation}
          </p>
          <div style={{ borderTop: `1px solid ${col.border}`, marginTop: 14, paddingTop: 10 }}>
            <span style={{ fontFamily: font, fontSize: 14, color: col.light }}>Daily tip · Refreshes tomorrow</span>
          </div>
        </div>

      </div>
    </div>
  );
}
