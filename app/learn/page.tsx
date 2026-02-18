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
    icon: '⚠️',
    citation: null,
  },
  {
    slug: 'sleep-timing-vs-duration',
    title: '70% of GH Is Released in the First 3 Hours of Sleep',
    summary: 'It\'s not just about how long your child sleeps — it\'s when. The science of sleep architecture and growth hormone.',
    category: 'sleep',
    readTime: '5 min',
    icon: '🌙',
    citation: '[Van Cauter E. Sleep. 2000]',
  },
  {
    slug: 'insulin-gh-antagonism',
    title: 'Eating Before Bed Suppresses GH by Up to 80%',
    summary: 'Insulin and growth hormone are antagonists. Understanding why meal timing matters as much as what you eat.',
    category: 'nutrition',
    readTime: '4 min',
    icon: '🍽️',
    citation: '[Ho KY. J Clin Endocrinol Metab. 1988]',
  },
  {
    slug: 'sprint-protocol',
    title: 'The 771% GH Sprint Protocol',
    summary: '30-second sprints trigger massive growth hormone spikes. High-intensity exercise causes acute GH release that steady cardio can\'t match.',
    category: 'exercise',
    readTime: '6 min',
    icon: '🏃',
    citation: '[Stokes KA. Sports Med. 2002]',
  },
  {
    slug: 'morning-sunlight-science',
    title: 'Morning Sunlight Sets the GH Clock',
    summary: '10-30 minutes of morning light synchronizes the master clock and sets the stage for optimal GH release 14 hours later.',
    category: 'circadian',
    readTime: '4 min',
    icon: '☀️',
    citation: '[Roenneberg T. Curr Biol. 2007]',
  },
  {
    slug: 'body-fat-estrogen-connection',
    title: 'Excess Body Fat Accelerates Plate Closure',
    summary: 'Fat tissue produces estrogen via aromatase. Why body composition directly impacts how long growth plates stay open.',
    category: 'height',
    readTime: '5 min',
    icon: '⚖️',
    citation: '[Nilsson O. Endocr Rev. 2005]',
  },
  {
    slug: 'raw-milk-tallest-people',
    title: 'Raw Milk and the Tallest People on Earth',
    summary: 'Why elite athletes and the world\'s tallest populations share one common childhood factor — raw milk access during their growth years.',
    category: 'nutrition',
    readTime: '8 min',
    icon: '🥛',
    citation: '[Hoppe C. Eur J Clin Nutr. 2004]',
  },
  {
    slug: 'milk-flooding-protocol',
    title: 'Why the Dutch Are the Tallest People on Earth',
    summary: 'A2 milk proteins support IGF-1 production. The milk flooding protocol and how to implement it.',
    category: 'nutrition',
    readTime: '6 min',
    icon: '🥛',
    citation: '[Hoppe C. Am J Clin Nutr. 2004]',
  },
  {
    slug: 'sleep-architecture-deep-dive',
    title: 'Sleep Architecture & GH: The Deep Dive',
    summary: 'Growth hormone is released in pulses during slow-wave sleep. Understanding N3 sleep and how to maximize it.',
    category: 'sleep',
    readTime: '8 min',
    icon: '🧠',
    citation: '[Sassin et al., Science 1969]',
  },
  {
    slug: 'exercise-induced-gh',
    title: 'Exercise-Induced GH: Intensity Is Everything',
    summary: 'High-intensity exercise triggers acute GH release up to 771% above baseline. The effect is intensity-dependent.',
    category: 'exercise',
    readTime: '6 min',
    icon: '💪',
    citation: '[Wideman et al., Endocrine Reviews 2002]',
  },
  {
    slug: 'adiposity-gh-suppression',
    title: 'Adiposity & GH Suppression',
    summary: 'Excess body fat reduces GH secretion by 50-70%. Visceral fat increases aromatase activity and accelerates closure.',
    category: 'height',
    readTime: '5 min',
    icon: '📉',
    citation: '[Veldhuis et al., J Clin Endocrinol 1995]',
  },
  {
    slug: 'screen-time-gh-impact',
    title: 'Screen Time After Sunset: The Hidden Cost',
    summary: 'Blue light suppresses melatonin, and melatonin gates GH release. The cascade effect most parents miss.',
    category: 'circadian',
    readTime: '4 min',
    icon: '📱',
    citation: '[Gooley JJ. J Clin Endocrinol Metab. 2011]',
  },
  {
    slug: 'glyphosate-oats-grains',
    title: 'Why Oats and Grains May Be Sabotaging Your Child\'s Growth',
    summary: 'Glyphosate quietly disrupts hormones and gut function — the two systems most critical for height.',
    category: 'toxins',
    readTime: '5 min',
    icon: '🌾',
    citation: '[Mills PJ. JAMA. 2017]',
  },
  {
    slug: 'gh-igf1-axis',
    title: 'How Your Child Actually Grows: The GH-IGF-1 Axis Explained',
    summary: 'Understanding the biological system that controls your child\'s height — and how to optimize it.',
    category: 'science',
    readTime: '6 min',
    icon: '🧬',
    citation: '[Van Cauter E. JAMA. 2000]',
  },
  {
    slug: 'dennis-rodman-growth',
    title: 'The Dennis Rodman Growth Story',
    summary: 'How delayed puberty and a sudden nutrition upgrade created one of the most dramatic growth spurts in sports history.',
    category: 'science',
    readTime: '7 min',
    icon: '🏀',
    citation: '[Günther AL. Am J Clin Nutr. 2010]',
  },
  {
    slug: 'keep-growth-plates-open',
    title: 'How to Keep Growth Plates Open a Little Longer',
    summary: 'The science of extending your child\'s growth window through strategic nutrition — crucifers, mushrooms, and polyphenols.',
    category: 'nutrition',
    readTime: '7 min',
    icon: '🦴',
    citation: '[Nilsson O. Endocrine Reviews. 2005]',
  },
  {
    slug: 'glycine-secret-weapon',
    title: 'Glycine: The Secret Weapon',
    summary: 'How the simplest amino acid can boost growth hormone, deepen sleep, and build stronger bones.',
    category: 'nutrition',
    readTime: '8 min',
    icon: '🧪',
    citation: '[Kasai K. Metabolism. 1980]',
  },
  {
    slug: 'a1-vs-a2-milk',
    title: 'A1 vs A2 Milk: Why the Type Matters',
    summary: 'The hidden difference in milk proteins that could be affecting your child\'s gut, inflammation, and height potential.',
    category: 'nutrition',
    readTime: '8 min',
    icon: '🥛',
    citation: '[Ramadhan MR. Nutrients. 2023]',
  },
  {
    slug: 'how-your-child-grows',
    title: 'How Your Child Actually Grows',
    summary: 'The complete guide to the biological cascade that determines your child\'s growth — and exactly how to optimize it.',
    category: 'science',
    readTime: '10 min',
    icon: '📈',
    citation: '[Giustina A. Endocrine Reviews. 1998]',
  },
  {
    slug: 'milk-nutrient-profile',
    title: 'Milk\'s Nutrient Profile: The Ultimate Growth Food',
    summary: 'A complete breakdown of what\'s actually in milk — and why quality matters for your child\'s growth.',
    category: 'nutrition',
    readTime: '9 min',
    icon: '🥛',
    citation: '[Millward DJ. Am J Clin Nutr. 2008]',
  },
  {
    slug: 'sprinting-growth-hormone',
    title: 'Sprinting: The Most Powerful Natural Growth Hormone Trigger',
    summary: 'Why 30-second sprints can raise GH by 700% — and how to use this for your child.',
    category: 'exercise',
    readTime: '7 min',
    icon: '🏃',
    citation: '[Stokes KA. J Appl Physiol. 2002]',
  },
  {
    slug: 'jamaican-sprinter-model',
    title: 'The Jamaican Sprinter Model: Why They Never Lift Weights',
    summary: 'How a small island builds the world\'s fastest humans — without a single barbell.',
    category: 'exercise',
    readTime: '8 min',
    icon: '🇯🇲',
    citation: '[Caine D. Sports Med. 2006]',
  },
  {
    slug: 'fava-beans-growth-hormone',
    title: 'Fava Beans: The Natural Growth Hormone Trigger',
    summary: 'How a humble Mediterranean bean can stimulate your child\'s GH release — backed by decades of clinical research.',
    category: 'nutrition',
    readTime: '9 min',
    icon: '🫘',
    citation: '[Boyd AE. N Engl J Med. 1970]',
  },
];

const categories = [
  { key: 'all', label: 'All Topics', icon: '📚' },
  { key: 'sleep', label: 'Sleep', icon: '🌙' },
  { key: 'nutrition', label: 'Nutrition', icon: '🍽️' },
  { key: 'exercise', label: 'Exercise', icon: '🏃' },
  { key: 'circadian', label: 'Circadian', icon: '☀️' },
  { key: 'height', label: 'Height', icon: '📈' },
  { key: 'toxins', label: 'Toxins', icon: '⚠️' },
  { key: 'science', label: 'Science', icon: '🧬' },
];

export default function Learn() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredArticles = activeCategory === 'all' 
    ? articles 
    : articles.filter(a => a.category === activeCategory);

  return (
    <div className="min-h-screen bg-cream">
      <Nav />
      
      <main className="max-w-5xl mx-auto px-4 py-12">
        
        {/* Header */}
        <header className="mb-10">
          <h1 className="font-display text-4xl text-gray-900 mb-2">Learn</h1>
          <p className="text-gray-500">Deep dives into the science of natural growth hormone optimization.</p>
        </header>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.key
                  ? 'bg-forest text-white'
                  : 'bg-white text-gray-600 hover:bg-cream-dark'
              }`}
            >
              <span>{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Featured Article */}
        <Link href="/learn/how-your-child-grows" className="block bg-gradient-to-br from-forest to-forest-light rounded-3xl p-10 text-white mb-8 relative overflow-hidden hover:shadow-xl transition-all no-underline">
          <div className="absolute top-0 right-0 text-[120px] opacity-10">🧬</div>
          <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">Featured</span>
          <h2 className="font-display text-3xl mt-4 mb-3">How Your Child Actually Grows</h2>
          <p className="text-white/80 max-w-lg mb-6">
            The complete guide to the biological cascade that determines your child's growth — and exactly how to optimize it.
          </p>
          <span className="bg-white text-forest px-6 py-3 rounded-xl font-semibold hover:bg-cream transition-colors inline-block">
            Read the Guide →
          </span>
        </Link>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {filteredArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/learn/${article.slug}`}
              className="card hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group block no-underline"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-cream rounded-xl flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                  {article.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold text-forest uppercase tracking-wider">
                      {categories.find(c => c.key === article.category)?.label}
                    </span>
                    <span className="text-xs text-gray-400">·</span>
                    <span className="text-xs text-gray-400">{article.readTime}</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-forest transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-2">
                    {article.summary}
                  </p>
                  {article.citation && (
                    <span className="text-xs text-forest italic">{article.citation}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="font-semibold text-lg mb-2">No articles in this category yet</h3>
            <p className="text-gray-500">Check back soon — we're adding new content regularly.</p>
          </div>
        )}

        {/* Bottom CTA */}
        <section className="mt-12 bg-amber-50 rounded-3xl p-8 text-center">
          <div className="text-4xl mb-4">🤖</div>
          <h3 className="font-display text-2xl mb-2">Have a specific question?</h3>
          <p className="text-gray-600 mb-6">Ask Jarvis — our AI assistant knows the science inside and out.</p>
          <a href="/jarvis" className="btn-primary inline-flex items-center gap-2">
            Ask Jarvis
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </section>

      </main>
    </div>
  );
}
