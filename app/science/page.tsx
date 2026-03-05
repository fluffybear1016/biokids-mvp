'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Nav from '@/components/Nav';
import { Child, GrowthWindow, getGrowthStage, stageInfo, createClient } from '@/lib/supabase';

// ── Articles data (merged from Learn page) ──────────────────────────
const articles = [
  {
    slug: 'growth-blockers-to-avoid',
    title: '18 Growth Blockers to Avoid',
    summary: 'Sleep disruptors, endocrine disruptors, nutritional blockers, and more — a checklist of targets to remove.',
    category: 'toxins',
    readTime: '10 min',
    citation: null,
  },
  {
    slug: 'raw-milk-tallest-people',
    title: 'Raw Milk and the Tallest People on Earth',
    summary: 'Why elite athletes and the world\'s tallest populations share one common childhood factor — raw milk access during their growth years.',
    category: 'nutrition',
    readTime: '8 min',
    citation: '[Hoppe C. Eur J Clin Nutr. 2004]',
  },
  {
    slug: 'glyphosate-oats-grains',
    title: 'Why Oats and Grains May Be Sabotaging Your Child\'s Growth',
    summary: 'Glyphosate quietly disrupts hormones and gut function — the two systems most critical for height.',
    category: 'toxins',
    readTime: '5 min',
    citation: '[Mills PJ. JAMA. 2017]',
  },
  {
    slug: 'gh-igf1-axis',
    title: 'How Your Child Actually Grows: The GH-IGF-1 Axis Explained',
    summary: 'Understanding the biological system that controls your child\'s height — and how to optimize it.',
    category: 'science',
    readTime: '6 min',
    citation: '[Van Cauter E. JAMA. 2000]',
  },
  {
    slug: 'dennis-rodman-growth',
    title: 'The Dennis Rodman Growth Story',
    summary: 'How delayed puberty and a sudden nutrition upgrade created one of the most dramatic growth spurts in sports history.',
    category: 'science',
    readTime: '7 min',
    citation: '[Günther AL. Am J Clin Nutr. 2010]',
  },
  {
    slug: 'keep-growth-plates-open',
    title: 'How to Keep Growth Plates Open a Little Longer',
    summary: 'The science of extending your child\'s growth window through strategic nutrition — crucifers, mushrooms, and polyphenols.',
    category: 'nutrition',
    readTime: '7 min',
    citation: '[Nilsson O. Endocrine Reviews. 2005]',
  },
  {
    slug: 'glycine-secret-weapon',
    title: 'Glycine: The Secret Weapon',
    summary: 'How the simplest amino acid can boost growth hormone, deepen sleep, and build stronger bones.',
    category: 'nutrition',
    readTime: '8 min',
    citation: '[Kasai K. Metabolism. 1980]',
  },
  {
    slug: 'a1-vs-a2-milk',
    title: 'A1 vs A2 Milk: Why the Type Matters',
    summary: 'The hidden difference in milk proteins that could be affecting your child\'s gut, inflammation, and height potential.',
    category: 'nutrition',
    readTime: '8 min',
    citation: '[Ramadhan MR. Nutrients. 2023]',
  },
  {
    slug: 'how-your-child-grows',
    title: 'How Your Child Actually Grows',
    summary: 'The complete guide to the biological cascade that determines your child\'s growth — and exactly how to optimize it.',
    category: 'science',
    readTime: '10 min',
    citation: '[Giustina A. Endocrine Reviews. 1998]',
  },
  {
    slug: 'milk-nutrient-profile',
    title: 'Milk\'s Nutrient Profile: The Ultimate Growth Food',
    summary: 'A complete breakdown of what\'s actually in milk — and why quality matters for your child\'s growth.',
    category: 'nutrition',
    readTime: '9 min',
    citation: '[Millward DJ. Am J Clin Nutr. 2008]',
  },
  {
    slug: 'sprinting-growth-hormone',
    title: 'Sprinting: The Most Powerful Natural Growth Hormone Trigger',
    summary: 'Why 30-second sprints can raise GH by 700% — and how to use this for your child.',
    category: 'exercise',
    readTime: '7 min',
    citation: '[Stokes KA. J Appl Physiol. 2002]',
  },
  {
    slug: 'jamaican-sprinter-model',
    title: 'The Jamaican Sprinter Model: Why They Never Lift Weights',
    summary: 'How a small island builds the world\'s fastest humans — without a single barbell.',
    category: 'exercise',
    readTime: '8 min',
    citation: '[Caine D. Sports Med. 2006]',
  },
  {
    slug: 'fava-beans-growth-hormone',
    title: 'Fava Beans: The Natural Growth Hormone Trigger',
    summary: 'How a humble Mediterranean bean can stimulate your child\'s GH release — backed by decades of clinical research.',
    category: 'nutrition',
    readTime: '9 min',
    citation: '[Boyd AE. N Engl J Med. 1970]',
  },
  {
    slug: 'zinc-gh-igf1-axis',
    title: 'Zinc and the GH–IGF‑1 Axis: Why This Mineral Controls Three Stages of Growth',
    summary: 'Zinc is required at every level of the growth hormone pathway — pituitary secretion, liver IGF‑1 production, and growth plate signaling.',
    category: 'nutrition',
    readTime: '6 min',
    citation: '[Brown KH. Am J Clin Nutr. 2002]',
  },
];

const articleCategories = [
  { key: 'all', label: 'All Topics' },
  { key: 'sleep', label: 'Sleep' },
  { key: 'nutrition', label: 'Nutrition' },
  { key: 'exercise', label: 'Exercise' },
  { key: 'circadian', label: 'Circadian' },
  { key: 'height', label: 'Height' },
  { key: 'toxins', label: 'Toxins' },
  { key: 'science', label: 'Science' },
];

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
    icon: '',
    title: '70% of GH in the First 3 Hours',
    text: 'Growth hormone is released in pulses during deep sleep, with 70% occurring in the first 3 sleep cycles. An 8:30pm bedtime captures the critical 10pm-1am surge.',
    citation: '[Van Cauter E. Sleep. 2000]',
  },
  {
    icon: '',
    title: 'The Insulin-GH Trade-off',
    text: 'Eating within 2 hours of sleep spikes insulin, which suppresses growth hormone by up to 80%. That bedtime snack? It\'s costing inches.',
    citation: '[Ho KY. J Clin Endocrinol Metab. 1988]',
  },
  {
    icon: '',
    title: 'The 771% Sprint Effect',
    text: '30-second all-out sprints trigger GH release up to 771% above baseline. Steady-state cardio doesn\'t come close. Six sprints, 3x per week.',
    citation: '[Stokes KA. Sports Med. 2002]',
  },
  {
    icon: '',
    title: 'Why the Dutch Are Tallest',
    text: 'The Netherlands has the tallest population on Earth — and the highest milk consumption. A2 casein proteins directly support IGF-1 production.',
    citation: '[Hoppe C. Am J Clin Nutr. 2004]',
  },
  {
    icon: '',
    title: 'Fat Closes Growth Plates',
    text: 'Excess body fat produces estrogen via aromatase. Elevated estrogen signals growth plates to ossify (close) earlier — potentially costing years of growth.',
    citation: '[Nilsson O. Endocr Rev. 2005]',
  },
  {
    icon: '',
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
  const [activeCategory, setActiveCategory] = useState('all');
  const articlesRef = useRef<HTMLDivElement>(null);

  // Handle hash scroll on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#articles') {
      setTimeout(() => articlesRef.current?.scrollIntoView({ behavior: 'smooth' }), 300);
    }
  }, [loading]);

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
        emoji: '',
        title: 'Morning Light',
        subtitle: 'Circadian rhythm syncing',
        tip: 'Get 10-30 minutes of direct sunlight within 30 minutes of waking to set the master clock.',
      };
    } else if (hour >= 10 && hour < 14) {
      return {
        emoji: '',
        title: 'Peak Activity',
        subtitle: 'Growth hormone primed',
        tip: 'Ideal time for sprint intervals — 6x30 second all-out efforts trigger up to 771% GH increase.',
      };
    } else if (hour >= 14 && hour < 18) {
      return {
        emoji: '',
        title: 'Active Play',
        subtitle: 'Movement window open',
        tip: 'Encourage jumping, climbing, and active play. Impact activities stimulate bone growth.',
      };
    } else if (hour >= 18 && hour < 20) {
      return {
        emoji: '',
        title: 'Wind Down',
        subtitle: 'Preparing for GH release',
        tip: 'Dim lights, finish dinner, and avoid screens. Blue light after sunset suppresses melatonin.',
      };
    } else if (hour >= 20 && hour < 22) {
      return {
        emoji: '',
        title: 'Golden Sleep',
        subtitle: 'Growth hormone releasing',
        tip: 'Maintain consistent bedtime. Consider magnesium-rich foods or bath for deeper sleep.',
      };
    } else {
      return {
        emoji: '',
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

        {/* ── Articles Section ── */}
        <div ref={articlesRef} id="articles" style={{ borderTop: `1px solid ${col.border}`, marginTop: 20, paddingTop: 32 }}>
          <h2 style={{
            fontFamily: font,
            fontSize: 22,
            fontWeight: 800,
            color: col.title,
            marginBottom: 6,
          }}>
            Articles
          </h2>
          <p style={{ fontFamily: font, fontSize: 13, color: col.light, marginBottom: 20 }}>
            Deep dives into the science of natural growth hormone optimization.
          </p>

          {/* Category Filter Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 24 }}>
            {articleCategories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 5,
                  padding: '5px 12px', borderRadius: 20, fontSize: 11, fontWeight: 600, fontFamily: font,
                  background: col.card,
                  color: activeCategory === cat.key ? col.green : col.body,
                  border: `1px solid ${activeCategory === cat.key ? col.green : col.border}`,
                  cursor: 'pointer', transition: 'all 0.15s',
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Featured Article */}
          <Link href="/learn/how-your-child-grows" style={{
            display: 'block', background: col.card, borderRadius: 16, padding: 24,
            border: `2px solid ${col.sigBorder}`, marginBottom: 24, textDecoration: 'none', position: 'relative', overflow: 'hidden',
          }}>
            <span style={{ display: 'inline-block', background: '#ecfdf5', color: col.green, padding: '3px 10px', borderRadius: 20, fontSize: 9, fontWeight: 800, fontFamily: font, textTransform: 'uppercase', letterSpacing: 1 }}>Featured</span>
            <h3 style={{ fontFamily: font, fontSize: 18, fontWeight: 700, color: col.title, margin: '12px 0 8px' }}>How Your Child Actually Grows</h3>
            <p style={{ fontFamily: font, fontSize: 13, color: col.body, margin: '0 0 16px', lineHeight: 1.5, maxWidth: 400 }}>
              The complete guide to the biological cascade that determines your child&apos;s growth — and exactly how to optimize it.
            </p>
            <span style={{ display: 'inline-block', background: col.green, color: '#fff', padding: '8px 18px', borderRadius: 10, fontSize: 12, fontWeight: 700, fontFamily: font }}>
              Read the Guide
            </span>
          </Link>

          {/* Article Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {(activeCategory === 'all' ? articles : articles.filter(a => a.category === activeCategory)).map((article) => (
              <Link
                key={article.slug}
                href={`/learn/${article.slug}`}
                style={{
                  display: 'block', background: col.card, borderRadius: 14, padding: 16,
                  border: `1px solid ${col.border}`, textDecoration: 'none', transition: 'all 0.15s',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <span style={{ fontSize: 9, fontWeight: 800, color: col.green, textTransform: 'uppercase', letterSpacing: 1, fontFamily: font }}>
                      {articleCategories.find(c => c.key === article.category)?.label}
                    </span>
                    <span style={{ fontSize: 9, color: col.light }}>·</span>
                    <span style={{ fontSize: 11, color: col.light, fontFamily: font }}>{article.readTime}</span>
                  </div>
                  <h3 style={{ fontFamily: font, fontSize: 14, fontWeight: 700, color: col.title, margin: '0 0 4px' }}>
                    {article.title}
                  </h3>
                  <p style={{ fontFamily: font, fontSize: 12, color: col.body, margin: 0, lineHeight: 1.5 }}>
                    {article.summary}
                  </p>
                  {article.citation && (
                    <span style={{ fontSize: 10, color: col.green, fontStyle: 'italic', fontFamily: font }}>{article.citation}</span>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {(activeCategory !== 'all' && articles.filter(a => a.category === activeCategory).length === 0) && (
            <div style={{ textAlign: 'center', padding: '48px 0' }}>
              <h3 style={{ fontFamily: font, fontSize: 15, fontWeight: 700, color: col.title, marginBottom: 6 }}>No articles in this category yet</h3>
              <p style={{ fontFamily: font, fontSize: 13, color: col.light }}>Check back soon — we&apos;re adding new content regularly.</p>
            </div>
          )}

          {/* Bottom CTA */}
          <section style={{ marginTop: 40, background: '#fffbeb', borderRadius: 16, padding: 28, textAlign: 'center' }}>
            <h3 style={{ fontFamily: font, fontSize: 18, fontWeight: 700, color: col.title, marginBottom: 6 }}>Have a specific question?</h3>
            <p style={{ fontFamily: font, fontSize: 13, color: col.body, marginBottom: 18 }}>Ask Jarvis — our AI assistant knows the science inside and out.</p>
            <a href="/jarvis" style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: col.green, color: '#fff', padding: '10px 22px', borderRadius: 10,
              fontSize: 13, fontWeight: 700, fontFamily: font, textDecoration: 'none',
            }}>
              Ask Jarvis
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </section>
        </div>

      </div>
    </div>
  );
}
