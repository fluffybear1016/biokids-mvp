'use client';

import Link from 'next/link';
import Nav from '@/components/Nav';

export default function DennisRodmanArticle() {
  return (
    <div className="min-h-screen bg-cream">
      <Nav />

      <main className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
        {/* Back link */}
        <Link href="/learn" className="inline-flex items-center gap-2 text-sm text-forest font-medium mb-6 hover:underline">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Articles
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-semibold text-forest uppercase tracking-wider">Science</span>
            <span className="text-xs text-gray-400">&middot;</span>
            <span className="text-xs text-gray-400">7 min read</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl text-black mb-3">The Dennis Rodman Growth Story</h1>
          <p className="text-base sm:text-lg text-gray-600 font-mono">How delayed puberty and a sudden nutrition upgrade created one of the most dramatic growth spurts in sports history.</p>
        </div>

        {/* Article content */}
        <article className="prose prose-lg max-w-none">

          {/* The Extraordinary Claim */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">The Extraordinary Claim</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
              Dennis Rodman, the NBA Hall of Famer, claims he was about 5&apos;8&rdquo;&ndash;5&apos;9&rdquo; after high school and then grew to roughly 6&apos;8&rdquo; by around age 19&ndash;20.
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              A one-foot gain that late sounds impossible. But the biology actually checks out.
            </p>
          </section>

          {/* Understanding the Growth Window */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">Understanding the Growth Window</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-5">
              To understand Rodman&apos;s story, you need to understand two systems:
            </p>

            <h3 className="font-semibold text-black text-base mb-2">1. The HPG Axis (Puberty System)</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              The hypothalamic&ndash;pituitary&ndash;gonadal (HPG) axis controls puberty. When it activates:
            </p>
            <ul className="space-y-1 mb-2">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Sex hormones (testosterone, estrogen) rise</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>The growth spurt begins</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500 font-bold">&#8226;</span><strong>But estrogen also starts closing growth plates</strong></li>
            </ul>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-1">
              The earlier puberty hits, the sooner growth plates fuse and height gains stop.
            </p>
            <p className="text-xs text-forest italic mb-5">[Nilsson O. et al. Endocrine Reviews. 2005]</p>

            <h3 className="font-semibold text-black text-base mb-2">2. The GH&ndash;IGF-1 Axis (Growth System)</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-1">
              Growth hormone (GH) is released during deep sleep. The liver converts it to IGF-1, which makes bones longer &mdash; <strong>but only while growth plates are still open.</strong>
            </p>
            <p className="text-xs text-forest italic mb-4">[Yakar S. et al. Journal of Clinical Investigation. 2002]</p>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-sm sm:text-base text-amber-900 leading-relaxed font-medium">
                The key insight: If puberty is delayed, growth plates stay open longer, and the GH&ndash;IGF-1 system has more time to add height.
              </p>
            </div>
          </section>

          {/* Rodman's Childhood */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">Rodman&apos;s Childhood: The Setup</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-5">
              Rodman grew up in poverty in Dallas. By his own account, his childhood nutrition was inconsistent and resource-limited &mdash; likely dominated by cheap staples like beans, grains, and limited meat.
            </p>

            <h3 className="font-semibold text-black text-base mb-2">Plant Protein vs. Animal Protein</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              Large cohort studies show something surprising:
            </p>
            <ul className="space-y-2 mb-2">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Total protein (animal + plant) raises IGF-1 and supports growth</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span><strong>But higher animal-protein intake at ages 3&ndash;6 is associated with earlier puberty</strong></li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>A higher fraction of plant protein at the same total intake is associated with <strong>later puberty</strong></li>
            </ul>
            <p className="text-xs text-forest italic mb-5">[G&uuml;nther AL. et al. American Journal of Clinical Nutrition. 2010]</p>

            <h3 className="font-semibold text-black text-base mb-2">What This Means</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              A childhood with adequate but plant-heavy protein can:
            </p>
            <ul className="space-y-1">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Support IGF-1 and linear growth</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Exert <strong>less upward pressure on the HPG axis</strong> than a meat- and dairy-heavy diet</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Delay the &ldquo;puberty switch&rdquo;</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Keep growth plates open longer</li>
            </ul>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mt-3">
              This appears to be exactly what happened to Rodman.
            </p>
          </section>

          {/* The Trigger */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">The Trigger: &ldquo;Jail Food Made Me Grow&rdquo;</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
              Rodman has said that jail food made him grow. This sounds like a joke, but there&apos;s real biology here.
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              In late adolescence, Rodman went through institutional settings &mdash; jail, then structured environments with regular meals. This likely meant a <strong>sudden step-change</strong> in nutrition:
            </p>
            <ul className="space-y-1">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Consistent meat and dairy</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Regular calories</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Sustained animal protein</li>
            </ul>
            <p className="text-xs text-forest italic mt-3">[Hoppe C. et al. American Journal of Clinical Nutrition. 2004]</p>
          </section>

          {/* The Perfect Storm */}
          <section className="bg-forest/5 rounded-2xl p-6 sm:p-8 mb-6 border border-forest/20">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">The Perfect Storm</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
              Here&apos;s what happened biologically:
            </p>
            <ol className="space-y-3 list-decimal list-inside">
              <li className="text-sm sm:text-base text-gray-700"><strong>Late HPG activation</strong> &mdash; Rodman&apos;s puberty was delayed, likely due to childhood nutrition patterns</li>
              <li className="text-sm sm:text-base text-gray-700"><strong>Growth plates still open</strong> &mdash; Because puberty came late, his plates hadn&apos;t fused yet at 17&ndash;19</li>
              <li className="text-sm sm:text-base text-gray-700"><strong>GH secretion still high</strong> &mdash; Late adolescence is when GH output is near its peak</li>
              <li className="text-sm sm:text-base text-gray-700"><strong>Sudden protein and calorie upgrade</strong> &mdash; Institutional food provided consistent animal protein and energy</li>
              <li className="text-sm sm:text-base text-gray-700"><strong>IGF-1 surge</strong> &mdash; The liver finally had the amino acids to convert all that GH into IGF-1</li>
              <li className="text-sm sm:text-base text-gray-700"><strong>Compressed growth spurt</strong> &mdash; All the conditions aligned in a narrow window</li>
            </ol>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mt-4">
              The result: a dramatic one-foot growth spurt between roughly 17&ndash;20 years old.
            </p>
            <p className="text-xs text-forest italic mt-3">[Juul A. et al. Journal of Clinical Endocrinology &amp; Metabolism. 1994]</p>
          </section>

          {/* What This Means for Parents */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">What This Means for Parents</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-5">
              Rodman&apos;s story is extreme, but the principles apply to every child:
            </p>

            <h3 className="font-semibold text-black text-base mb-2">1. Puberty Timing Matters</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              Earlier puberty = shorter growth window. Factors that may trigger early puberty:
            </p>
            <ul className="space-y-1 mb-2">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span>Excess body fat (increases estrogen)</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span>High animal protein very early in childhood</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span>Endocrine disruptors (plastics, chemicals)</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span>Obesity</li>
            </ul>
            <p className="text-xs text-forest italic mb-5">[He Q. et al. Journal of Clinical Endocrinology &amp; Metabolism. 2004]</p>

            <h3 className="font-semibold text-black text-base mb-2">2. Protein Type and Timing Matter</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              The research suggests:
            </p>
            <ul className="space-y-2 mb-2">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span><strong>Early childhood (0&ndash;6):</strong> A balanced mix with adequate but not excessive animal protein may support growth while avoiding early puberty triggers</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span><strong>Later childhood and adolescence:</strong> Higher animal protein supports the growth spurt once it begins</li>
            </ul>
            <p className="text-xs text-forest italic mb-5">[G&uuml;nther AL. et al. American Journal of Clinical Nutrition. 2010]</p>

            <h3 className="font-semibold text-black text-base mb-2">3. Consistent Nutrition During the Growth Window</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              Once puberty begins, the clock is ticking. This is when:
            </p>
            <ul className="space-y-1">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Protein intake should be optimized (1.2&ndash;1.5g/kg)</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Sleep should be maximized (GH release)</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Every growth factor should be in place</li>
            </ul>
          </section>

          {/* Bottom Line */}
          <section className="bg-forest text-white rounded-2xl p-6 sm:p-8 mb-6">
            <h2 className="font-display text-xl sm:text-2xl mb-4">The Bottom Line</h2>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed mb-4">
              Dennis Rodman&apos;s growth story isn&apos;t magic &mdash; it&apos;s biology.
            </p>
            <p className="text-sm sm:text-base text-white font-semibold leading-relaxed mb-4">
              Delayed puberty + sustained GH output + sudden nutrition upgrade + open growth plates = extraordinary late growth.
            </p>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed">
              For parents, the lesson is clear: <strong>protect the growth window.</strong> Avoid factors that trigger early puberty, ensure adequate nutrition throughout childhood, and optimize everything once the growth spurt begins. You can&apos;t replicate Rodman&apos;s exact circumstances, but you can understand the same biological principles and apply them strategically.
            </p>
          </section>

          {/* References */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200">
            <h2 className="font-display text-lg text-black mb-4">References</h2>
            <ul className="space-y-3 text-xs sm:text-sm text-gray-500 leading-relaxed">
              <li>Nilsson O, et al. Endocrine regulation of the growth plate. <em>Endocrine Reviews</em>. 2005;26(1):114-146.</li>
              <li>Yakar S, et al. Normal growth and development in the absence of hepatic insulin-like growth factor I. <em>Journal of Clinical Investigation</em>. 2002;109(9):1279-1288.</li>
              <li>G&uuml;nther AL, et al. Dietary protein intake and later height in children. <em>American Journal of Clinical Nutrition</em>. 2010;91(6):1684-1692.</li>
              <li>Hoppe C, et al. High intakes of milk, but not meat, increase s-insulin and insulin resistance in 8-year-old boys. <em>American Journal of Clinical Nutrition</em>. 2004;80(2):447-452.</li>
              <li>Juul A, et al. Serum levels of insulin-like growth factor I and its binding proteins in health and disease. <em>Journal of Clinical Endocrinology &amp; Metabolism</em>. 1994;78(6):1529-1535.</li>
              <li>He Q, et al. Sex differences in the association between body composition and onset of puberty. <em>Journal of Clinical Endocrinology &amp; Metabolism</em>. 2004;89(12):6417-6424.</li>
            </ul>
          </section>

        </article>

        {/* Back link */}
        <div className="mt-8 text-center">
          <Link href="/learn" className="inline-flex items-center gap-2 text-forest font-semibold hover:underline">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to all articles
          </Link>
        </div>

      </main>
    </div>
  );
}
