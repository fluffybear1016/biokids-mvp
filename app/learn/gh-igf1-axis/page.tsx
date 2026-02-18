'use client';

import Link from 'next/link';
import Nav from '@/components/Nav';

export default function GhIgf1AxisArticle() {
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
            <span className="text-xs text-gray-400">6 min read</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl text-black mb-3">How Your Child Actually Grows: The GH-IGF-1 Axis Explained</h1>
          <p className="text-base sm:text-lg text-gray-600 font-mono">Understanding the biological system that controls your child&apos;s height &mdash; and how to optimize it.</p>
        </div>

        {/* Article content */}
        <article className="prose prose-lg max-w-none">

          {/* The Master Growth System */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">The Master Growth System</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              A child&apos;s height is mainly controlled by a system called the <strong>GH&ndash;IGF-1 axis</strong>. Understanding this system is the key to understanding everything else about height optimization.
            </p>
          </section>

          {/* Step 1 */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">Step 1: Growth Hormone Release</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Growth hormone (GH) is released from the pituitary gland in short bursts, mostly during deep sleep at night. This is why sleep is the #1 lever for height &mdash; no deep sleep means no GH pulses.
            </p>
            <p className="text-xs text-forest italic mt-3">[Van Cauter E. et al. JAMA. 2000]</p>
          </section>

          {/* Step 2 */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">Step 2: IGF-1 Production</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              GH travels in the blood to the liver, where it triggers production of <strong>insulin-like growth factor-1 (IGF-1)</strong>. IGF-1 then circulates back to the brain and partly shuts down further GH release so the system does not run unchecked.
            </p>
            <p className="text-xs text-forest italic mt-3">[Yakar S. et al. Journal of Clinical Investigation. 2002]</p>
          </section>

          {/* Step 3 */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">Step 3: Bone Elongation</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
              IGF-1 is the signal that actually makes bones longer.
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              At the growth plates (the cartilage at the ends of long bones), IGF-1 tells cartilage cells to:
            </p>
            <ol className="space-y-2 mb-4 list-decimal list-inside">
              <li className="text-sm sm:text-base text-gray-700">Multiply</li>
              <li className="text-sm sm:text-base text-gray-700">Enlarge</li>
              <li className="text-sm sm:text-base text-gray-700">Convert into bone</li>
            </ol>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              This is how legs and spine lengthen &mdash; cartilage becomes bone, and the growth plate keeps producing more cartilage above it.
            </p>
            <p className="text-xs text-forest italic mt-3">[Nilsson O. et al. Endocrine Reviews. 2005]</p>
          </section>

          {/* The Nutrition Requirement */}
          <section className="bg-forest/5 rounded-2xl p-6 sm:p-8 mb-6 border border-forest/20">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">The Nutrition Requirement</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
              The liver can only make enough IGF-1 if a child is getting sufficient:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span><strong>Protein</strong> &mdash; the building blocks</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span><strong>Calories</strong> &mdash; the energy</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span><strong>Zinc</strong> &mdash; IGF-1 receptor function</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span><strong>Vitamin D</strong> &mdash; GH receptor sensitivity</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span><strong>Calcium</strong> &mdash; bone mineralization</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span><strong>Iodine</strong> &mdash; thyroid function</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span><strong>Magnesium</strong> &mdash; enzyme cofactor</li>
            </ul>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              When nutrition is poor, IGF-1 levels fall and growth slows. This is why early under-nutrition is tightly linked to stunting.
            </p>
            <p className="text-xs text-forest italic mt-3">[Hoppe C. et al. American Journal of Clinical Nutrition. 2004]</p>
          </section>

          {/* The Thyroid Connection */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">The Thyroid Connection</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
              Thyroid hormones (T4 and T3) act like the &ldquo;power setting&rdquo; for this system.
            </p>
            <h3 className="font-semibold text-black text-base mb-2">If thyroid function is low:</h3>
            <ul className="space-y-1 mb-4">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span>GH release drops</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span>IGF-1 levels fall</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span>Height gain slows</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span>Bone maturation slows</li>
            </ul>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Bringing thyroid back to normal restores growth rate.
            </p>
            <p className="text-xs text-forest italic mt-3">[Robson H. et al. Journal of Endocrinology. 2002]</p>
          </section>

          {/* The Puberty Factor */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">The Puberty Factor</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
              During puberty, rising sex hormones &mdash; testosterone and estrogen &mdash; boost GH and IGF-1 and create the classic growth spurt.
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              <strong>But there&apos;s a catch:</strong> Higher estrogen also starts the process of growth-plate closure.
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-2">This is why:</p>
            <ul className="space-y-2">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Very early puberty shortens total growth time</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Higher body fat (more estrogen production) tends to shorten the growth window</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>The goal is a normal-timed puberty, not an early one</li>
            </ul>
            <p className="text-xs text-forest italic mt-3">[Nilsson O. et al. Endocrine Reviews. 2005]</p>
          </section>

          {/* The Critical Windows */}
          <section className="bg-amber-50 rounded-2xl p-6 sm:p-8 mb-6 border border-amber-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">The Critical Windows</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  <strong>By age 5:</strong> Roughly 60% of adult height is already reached, showing how active this system is in early childhood.
                </p>
              </div>
              <div>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  <strong>The first 1,000 days</strong> (conception to age two) are especially sensitive: poor diet and repeated illness in that window can permanently &ldquo;reset&rdquo; GH&ndash;IGF-1 signaling and growth-plate behavior, leading to lower adult height.
                </p>
              </div>
              <div>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  <strong>Through mid-teens:</strong> Meaningful growth continues while growth plates are still open.
                </p>
              </div>
            </div>
            <p className="text-xs text-forest italic mt-3">[Victora CG. et al. Lancet. 2008]</p>
          </section>

          {/* The Practical Levers */}
          <section className="bg-forest/5 rounded-2xl p-6 sm:p-8 mb-6 border border-forest/20">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">The Practical Levers</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-5">
              For a high-agency parent, the actionable takeaways are clear:
            </p>

            <h3 className="font-semibold text-black text-base mb-2">1. Prioritize Deep, Regular Sleep</h3>
            <ul className="space-y-1 mb-5">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>This is when GH pulses occur</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Consistent bedtime, 10+ hours for children</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Dark, cool room</li>
            </ul>

            <h3 className="font-semibold text-black text-base mb-2">2. Ensure Sufficient Protein and Micronutrients</h3>
            <ul className="space-y-1 mb-5">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>High-quality protein at every meal</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Zinc, vitamin D, calcium, iodine, magnesium</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>This fuels IGF-1 production and bone building</li>
            </ul>

            <h3 className="font-semibold text-black text-base mb-2">3. Support Healthy Thyroid Function</h3>
            <ul className="space-y-1 mb-5">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Adequate iodine intake</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Avoid thyroid disruptors (fluoride, perchlorate, certain chemicals)</li>
            </ul>

            <h3 className="font-semibold text-black text-base mb-2">4. Manage Weight and Puberty Timing</h3>
            <ul className="space-y-1">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Avoid excess body fat (increases estrogen)</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Avoid endocrine disruptors that trigger early puberty</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Normal-timed puberty = maximum growth window</li>
            </ul>
          </section>

          {/* Bottom Line */}
          <section className="bg-forest text-white rounded-2xl p-6 sm:p-8 mb-6">
            <h2 className="font-display text-xl sm:text-2xl mb-4">The Bottom Line</h2>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed">
              Height isn&apos;t random &mdash; it&apos;s the output of a biological system you can influence. Optimize sleep for GH, nutrition for IGF-1, and body composition for hormonal balance, and you give your child the best shot at their genetic ceiling.
            </p>
          </section>

          {/* References */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200">
            <h2 className="font-display text-lg text-black mb-4">References</h2>
            <ul className="space-y-3 text-xs sm:text-sm text-gray-500 leading-relaxed">
              <li>Van Cauter E, et al. Age-related changes in slow wave sleep and REM sleep and relationship with growth hormone and cortisol levels in healthy men. <em>JAMA</em>. 2000;284(7):861-868.</li>
              <li>Yakar S, et al. Normal growth and development in the absence of hepatic insulin-like growth factor I. <em>Journal of Clinical Investigation</em>. 2002;109(9):1279-1288.</li>
              <li>Nilsson O, et al. Endocrine regulation of the growth plate. <em>Endocrine Reviews</em>. 2005;26(1):114-146.</li>
              <li>Hoppe C, et al. High intakes of milk, but not meat, increase s-insulin and insulin resistance in 8-year-old boys. <em>American Journal of Clinical Nutrition</em>. 2004;80(2):447-452.</li>
              <li>Robson H, et al. Interactions between GH, IGF-I, glucocorticoids, and thyroid hormones during skeletal growth. <em>Journal of Endocrinology</em>. 2002;174(2):295-309.</li>
              <li>Victora CG, et al. Maternal and child undernutrition: consequences for adult health and human capital. <em>Lancet</em>. 2008;371(9609):340-357.</li>
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
