'use client';

import { useState } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';

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

const categories = [
  { key: 'all', label: 'All Topics' },
  { key: 'sleep', label: 'Sleep' },
  { key: 'nutrition', label: 'Nutrition' },
  { key: 'exercise', label: 'Exercise' },
  { key: 'circadian', label: 'Circadian' },
  { key: 'height', label: 'Height' },
  { key: 'toxins', label: 'Toxins' },
  { key: 'science', label: 'Science' },
];

const F = "'Courier New', Courier, monospace";
const C = {
  bg: '#fafaf9', title: '#1c1917', body: '#57534e', light: '#a8a29e',
  green: '#065f46', card: '#fff', border: '#e7e5e4', sigBorder: '#86efac',
};

export default function Learn() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredArticles = activeCategory === 'all'
    ? articles
    : articles.filter(a => a.category === activeCategory);

  return (
    <div style={{ minHeight: '100vh', background: C.bg, fontFamily: F }}>
      <Nav />

      <main style={{ maxWidth: 540, margin: '0 auto', padding: '32px 16px' }}>

        {/* Header */}
        <header style={{ marginBottom: 32 }}>
          <h1 style={{ fontFamily: F, fontSize: 22, fontWeight: 700, color: C.title, margin: 0, marginBottom: 6 }}>Learn</h1>
          <p style={{ fontSize: 13, color: C.light, margin: 0 }}>Deep dives into the science of natural growth hormone optimization.</p>
        </header>

        {/* Category Filter */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 24 }}>
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              style={{
                display: 'flex', alignItems: 'center', gap: 5,
                padding: '5px 12px', borderRadius: 20, fontSize: 11, fontWeight: 600, fontFamily: F,
                background: activeCategory === cat.key ? C.card : C.card,
                color: activeCategory === cat.key ? C.green : C.body,
                border: `1px solid ${activeCategory === cat.key ? C.green : C.border}`,
                cursor: 'pointer', transition: 'all 0.15s',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Featured Article */}
        <Link href="/learn/how-your-child-grows" style={{
          display: 'block', background: C.card, borderRadius: 16, padding: 24,
          border: `2px solid ${C.sigBorder}`, marginBottom: 24, textDecoration: 'none', position: 'relative', overflow: 'hidden',
        }}>
          <span style={{ display: 'inline-block', background: '#ecfdf5', color: C.green, padding: '3px 10px', borderRadius: 20, fontSize: 9, fontWeight: 800, fontFamily: F, textTransform: 'uppercase', letterSpacing: 1 }}>Featured</span>
          <h2 style={{ fontFamily: F, fontSize: 18, fontWeight: 700, color: C.title, margin: '12px 0 8px' }}>How Your Child Actually Grows</h2>
          <p style={{ fontSize: 13, color: C.body, margin: '0 0 16px', lineHeight: 1.5, maxWidth: 400 }}>
            The complete guide to the biological cascade that determines your child's growth — and exactly how to optimize it.
          </p>
          <span style={{ display: 'inline-block', background: C.green, color: '#fff', padding: '8px 18px', borderRadius: 10, fontSize: 12, fontWeight: 700, fontFamily: F }}>
            Read the Guide
          </span>
        </Link>

        {/* Articles List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filteredArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/learn/${article.slug}`}
              style={{
                display: 'block', background: C.card, borderRadius: 14, padding: 16,
                border: `1px solid ${C.border}`, textDecoration: 'none', transition: 'all 0.15s',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                  <span style={{ fontSize: 9, fontWeight: 800, color: C.green, textTransform: 'uppercase', letterSpacing: 1, fontFamily: F }}>
                    {categories.find(c => c.key === article.category)?.label}
                  </span>
                  <span style={{ fontSize: 9, color: C.light }}>·</span>
                  <span style={{ fontSize: 11, color: C.light, fontFamily: F }}>{article.readTime}</span>
                </div>
                <h3 style={{ fontFamily: F, fontSize: 14, fontWeight: 700, color: C.title, margin: '0 0 4px' }}>
                  {article.title}
                </h3>
                <p style={{ fontSize: 12, color: C.body, margin: 0, lineHeight: 1.5 }}>
                  {article.summary}
                </p>
                {article.citation && (
                  <span style={{ fontSize: 10, color: C.green, fontStyle: 'italic', fontFamily: F }}>{article.citation}</span>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredArticles.length === 0 && (
          <div style={{ textAlign: 'center', padding: '48px 0' }}>
            <h3 style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: C.title, marginBottom: 6 }}>No articles in this category yet</h3>
            <p style={{ fontSize: 13, color: C.light }}>Check back soon — we're adding new content regularly.</p>
          </div>
        )}

        {/* Bottom CTA */}
        <section style={{ marginTop: 40, background: '#fffbeb', borderRadius: 16, padding: 28, textAlign: 'center' }}>
          <h3 style={{ fontFamily: F, fontSize: 18, fontWeight: 700, color: C.title, marginBottom: 6 }}>Have a specific question?</h3>
          <p style={{ fontSize: 13, color: C.body, marginBottom: 18 }}>Ask Jarvis — our AI assistant knows the science inside and out.</p>
          <a href="/jarvis" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: C.green, color: '#fff', padding: '10px 22px', borderRadius: 10,
            fontSize: 13, fontWeight: 700, fontFamily: F, textDecoration: 'none',
          }}>
            Ask Jarvis
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </section>

      </main>
    </div>
  );
}
