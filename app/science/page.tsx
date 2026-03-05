'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Nav from '@/components/Nav';
import { Child, getGrowthStage, stageInfo, createClient } from '@/lib/supabase';

// ── Articles data ──────────────────────────
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
    title: 'Zinc and the GH–IGF\u20111 Axis: Why This Mineral Controls Three Stages of Growth',
    summary: 'Zinc is required at every level of the growth hormone pathway — pituitary secretion, liver IGF\u20111 production, and growth plate signaling.',
    category: 'nutrition',
    readTime: '6 min',
    citation: '[Brown KH. Am J Clin Nutr. 2002]',
  },
];

const articleCategories = [
  { key: 'all', label: 'All' },
  { key: 'nutrition', label: 'Nutrition' },
  { key: 'exercise', label: 'Exercise' },
  { key: 'toxins', label: 'Toxins' },
  { key: 'science', label: 'Science' },
];

// Shared style tokens
const F = "'Courier New', Courier, monospace";
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

  // Time-based active phase
  const getActivePhase = (hour: number) => {
    if (hour >= 6 && hour < 10) {
      return { title: 'Morning Light', tip: 'Get 10-30 min of direct sunlight within 30 min of waking to set the master clock.' };
    } else if (hour >= 10 && hour < 14) {
      return { title: 'Peak Activity', tip: 'Ideal time for sprint intervals — 6x30s all-out efforts trigger up to 771% GH increase.' };
    } else if (hour >= 14 && hour < 18) {
      return { title: 'Active Play', tip: 'Encourage jumping, climbing, and active play. Impact activities stimulate bone growth.' };
    } else if (hour >= 18 && hour < 20) {
      return { title: 'Wind Down', tip: 'Dim lights, finish dinner, avoid screens. Blue light after sunset suppresses melatonin.' };
    } else if (hour >= 20 && hour < 22) {
      return { title: 'Golden Sleep', tip: 'Maintain consistent bedtime. Consider magnesium-rich foods or a warm bath for deeper sleep.' };
    } else {
      return { title: 'Deep Sleep', tip: '70% of growth hormone is released in the first 3 hours of sleep. Protect this window.' };
    }
  };

  const activePhase = getActivePhase(currentHour);

  useEffect(() => {
    const interval = setInterval(() => setCurrentHour(new Date().getHours()), 60000);
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

  const filteredArticles = activeCategory === 'all' ? articles : articles.filter(a => a.category === activeCategory);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: col.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontFamily: F, color: col.body }}>Loading...</div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: col.bg, fontFamily: F }}>
      <Nav currentChild={child} />

      <div style={{ maxWidth: 540, margin: '0 auto', padding: '0 20px', paddingTop: 32, paddingBottom: 64 }}>

        {/* Search → Jarvis */}
        <form
          onSubmit={(e) => { e.preventDefault(); if (searchQuery.trim()) router.push(`/jarvis?q=${encodeURIComponent(searchQuery.trim())}`); }}
          style={{ marginBottom: 44 }}
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Ask anything about growth..."
            style={{
              width: '100%', padding: '14px 16px', fontSize: 14, fontFamily: F, color: col.title,
              background: col.card, border: `1px solid ${col.border}`, borderRadius: 14,
              outline: 'none', boxSizing: 'border-box',
            }}
          />
        </form>

        {/* Stage Title */}
        <h1 style={{ fontFamily: F, fontSize: 22, fontWeight: 800, color: col.title, letterSpacing: '-0.02em', marginBottom: 8 }}>
          {stageData.label}
        </h1>
        <p style={{ fontFamily: F, fontSize: 14, color: col.body, lineHeight: 1.75, marginBottom: 32 }}>
          {stage === 'infancy' && `${childName}'s growth hormone system is establishing its rhythm. Receptor sensitivity and nutritional foundations are being set for everything that follows.`}
          {stage === 'early-childhood' && `${childName}'s growth velocity is among the highest it will ever be. The habits you build now wire the GH system for the next decade.`}
          {stage === 'mid-childhood' && `${childName}'s growth hormone system is at full capacity. Consistent daily actions compound quietly into real results.`}
          {stage === 'pre-puberty' && `This is prime time. ${childName}'s growth plates are wide open — small consistent actions now make the biggest difference.`}
          {stage === 'early-puberty' && `${childName} is entering growth acceleration. Sleep, nutrition, and movement all have outsized impact on peak velocity right now.`}
          {stage === 'active-puberty' && `${childName} is in peak growth velocity. Every month matters — the protocols you follow now determine how much genetic potential is expressed.`}
          {stage === 'late-growth' && `${childName}'s growth plates are in their final phase. Spinal health, posture, and hormonal support can still add real height.`}
          {(stage === 'prenatal' || stage === 'adult') && `${childName} is in the ${stageData.label.toLowerCase()} stage. Every action supports long-term growth potential.`}
        </p>

        {/* Active Now — the one dynamic element */}
        <div style={{
          background: col.card, border: `2px solid ${col.sigBorder}`, borderRadius: 20,
          padding: '18px 20px', marginBottom: 44,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <span style={{ width: 8, height: 8, background: col.green, borderRadius: '50%', display: 'inline-block' }} />
            <span style={{ fontFamily: F, fontSize: 11, fontWeight: 800, color: col.green, textTransform: 'uppercase' as const, letterSpacing: '0.05em' }}>
              Right Now
            </span>
          </div>
          <div style={{ fontFamily: F, fontSize: 15, fontWeight: 800, color: col.title, marginBottom: 6 }}>
            {activePhase.title}
          </div>
          <p style={{ fontFamily: F, fontSize: 14, color: col.body, lineHeight: 1.75, margin: 0 }}>
            {activePhase.tip}
          </p>
        </div>

        {/* Three Pillars */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 44 }}>
          {[
            { href: '/windows/sleep-circadian', label: 'Sleep' },
            { href: '/windows/nutrition', label: 'Nutrition' },
            { href: '/windows/physical-activity', label: 'Movement' },
          ].map(({ href, label }) => (
            <Link key={href} href={href} style={{
              background: col.card, border: `1px solid ${col.border}`, borderRadius: 14,
              padding: '16px 12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              textDecoration: 'none', fontFamily: F, fontSize: 13, fontWeight: 700, color: col.title,
            }}>
              {label}
            </Link>
          ))}
        </div>

        {/* Stage Deep Dive */}
        <Link
          href="/stage"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: col.card, border: `1px solid ${col.border}`, borderRadius: 14,
            padding: '14px 18px', marginBottom: 44, textDecoration: 'none',
          }}
        >
          <div>
            <div style={{ fontFamily: F, fontSize: 14, fontWeight: 700, color: col.title }}>
              What matters most at this stage
            </div>
            <div style={{ fontFamily: F, fontSize: 12, color: col.light, marginTop: 2 }}>
              Priorities for the {stageData.label.toLowerCase()} window
            </div>
          </div>
          <svg style={{ width: 16, height: 16, color: col.green, flexShrink: 0 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>

        {/* ── Research ── */}
        <div ref={articlesRef} id="articles">
          <h2 style={{ fontFamily: F, fontSize: 18, fontWeight: 800, color: col.title, marginBottom: 6 }}>
            Research
          </h2>
          <p style={{ fontFamily: F, fontSize: 13, color: col.light, marginBottom: 20 }}>
            {articles.length} peer-reviewed deep dives. Every claim cited.
          </p>

          {/* Filter Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 24 }}>
            {articleCategories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                style={{
                  padding: '5px 12px', borderRadius: 20, fontSize: 11, fontWeight: 600, fontFamily: F,
                  background: activeCategory === cat.key ? col.green : col.card,
                  color: activeCategory === cat.key ? '#fff' : col.body,
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
            display: 'block', background: col.card, borderRadius: 16, padding: 20,
            border: `2px solid ${col.sigBorder}`, marginBottom: 16, textDecoration: 'none',
          }}>
            <span style={{ display: 'inline-block', background: '#ecfdf5', color: col.green, padding: '3px 10px', borderRadius: 20, fontSize: 9, fontWeight: 800, fontFamily: F, textTransform: 'uppercase', letterSpacing: 1 }}>
              Start Here
            </span>
            <h3 style={{ fontFamily: F, fontSize: 16, fontWeight: 700, color: col.title, margin: '10px 0 6px' }}>
              How Your Child Actually Grows
            </h3>
            <p style={{ fontFamily: F, fontSize: 13, color: col.body, margin: 0, lineHeight: 1.5 }}>
              The biological cascade that determines height — and how to optimize it.
            </p>
          </Link>

          {/* Article Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filteredArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/learn/${article.slug}`}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: 14, background: col.card, borderRadius: 14,
                  padding: '14px 16px', border: `1px solid ${col.border}`, textDecoration: 'none',
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <span style={{ fontSize: 9, fontWeight: 800, color: col.green, textTransform: 'uppercase', letterSpacing: 1, fontFamily: F }}>
                      {articleCategories.find(c => c.key === article.category)?.label}
                    </span>
                    <span style={{ fontSize: 9, color: col.light }}>·</span>
                    <span style={{ fontSize: 11, color: col.light, fontFamily: F }}>{article.readTime}</span>
                  </div>
                  <h3 style={{ fontFamily: F, fontSize: 14, fontWeight: 700, color: col.title, margin: '0 0 4px' }}>
                    {article.title}
                  </h3>
                  <p style={{ fontFamily: F, fontSize: 12, color: col.body, margin: 0, lineHeight: 1.5 }}>
                    {article.summary}
                  </p>
                </div>
                <svg style={{ width: 16, height: 16, color: col.light, flexShrink: 0, marginTop: 4 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {filteredArticles.length === 0 && (
            <div style={{ textAlign: 'center', padding: '48px 0' }}>
              <h3 style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: col.title, marginBottom: 6 }}>No articles in this category yet</h3>
              <p style={{ fontFamily: F, fontSize: 13, color: col.light }}>Check back soon.</p>
            </div>
          )}
        </div>

        {/* Closing */}
        <div style={{ textAlign: 'center', marginTop: 44 }}>
          <p style={{ fontFamily: F, fontSize: 12, color: col.light, lineHeight: 1.7 }}>
            Every recommendation backed by peer-reviewed research. Have a question? <Link href="/jarvis" style={{ color: col.green, fontWeight: 700, textDecoration: 'none' }}>Ask Jarvis</Link>
          </p>
        </div>

      </div>
    </div>
  );
}
