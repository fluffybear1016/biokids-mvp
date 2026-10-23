'use client';

import { useState } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';

const F = "'Courier New', Courier, monospace";

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

const col = {
  bg: '#fafaf9',
  title: '#1c1917',
  body: '#57534e',
  light: '#57534e',
  green: '#065f46',
  card: '#fff',
  border: '#e7e5e4',
  sigBorder: '#86efac',
};


export default function Articles() {
  const [activeCategory, setActiveCategory] = useState('all');
  const filtered = activeCategory === 'all' ? articles : articles.filter(a => a.category === activeCategory);

  return (
    <div style={{ minHeight: '100vh', background: col.bg, fontFamily: F }}>
      <Nav />
      <main style={{ maxWidth: 680, margin: '0 auto', padding: '0 20px', paddingTop: 40, paddingBottom: 80 }}>
        <h1 style={{ fontFamily: F, fontSize: 30, fontWeight: 900, color: col.title, letterSpacing: '-0.02em', marginBottom: 8 }}>Articles</h1>
        <div style={{ width: 32, height: 3, background: col.green, borderRadius: 2, marginBottom: 12 }} />
        <p style={{ fontFamily: F, fontSize: 14, color: col.body, marginBottom: 24, lineHeight: 1.7, maxWidth: 560 }}>
          {articles.length} peer-reviewed deep dives. Every statement cited. Read in any order.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 24 }}>
          {articleCategories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              style={{
                padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 700, fontFamily: F,
                background: activeCategory === cat.key ? col.green : col.card,
                color: activeCategory === cat.key ? '#fff' : col.body,
                border: '1px solid ' + (activeCategory === cat.key ? col.green : col.border),
                cursor: 'pointer', transition: 'all 0.15s',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {filtered.map((article) => (
            <Link
              key={article.slug}
              href={'/learn/' + article.slug}
              style={{ display: 'flex', alignItems: 'flex-start', gap: 14, background: col.card, borderRadius: 14, padding: '16px 18px', border: '1px solid ' + col.border, textDecoration: 'none' }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: col.green, flexShrink: 0 }} />
                  <span style={{ fontSize: 9, fontWeight: 800, color: col.green, textTransform: 'uppercase', letterSpacing: 1, fontFamily: F }}>
                    {articleCategories.find(c => c.key === article.category)?.label}
                  </span>
                  <span style={{ fontSize: 9, color: col.light }}>&middot;</span>
                  <span style={{ fontSize: 11, color: col.light, fontFamily: F }}>{article.readTime}</span>
                </div>
                <h3 style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: col.title, margin: '0 0 4px' }}>{article.title}</h3>
                <p style={{ fontFamily: F, fontSize: 12.5, color: col.body, margin: 0, lineHeight: 1.55 }}>{article.summary}</p>
              </div>
              <svg style={{ width: 16, height: 16, color: col.light, flexShrink: 0, marginTop: 4 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '48px 0' }}>
            <h3 style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: col.title, marginBottom: 6 }}>No articles in this category yet</h3>
            <p style={{ fontFamily: F, fontSize: 13, color: col.light }}>Check back soon.</p>
          </div>
        )}
      </main>
    </div>
  );
}
