'use client';

import Link from 'next/link';
import Nav from '@/components/Nav';

export default function ZincArticle() {
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
            <span className="text-xs font-semibold text-forest uppercase tracking-wider">Nutrition</span>
            <span className="text-xs text-gray-400">&middot;</span>
            <span className="text-xs text-gray-400">6 min read</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl text-black mb-3">Zinc and the GH&ndash;IGF&#8209;1 Axis: Why This Mineral Controls Three Stages of Growth</h1>
          <p className="text-base sm:text-lg text-gray-600 font-mono">Zinc doesn&apos;t just &ldquo;support growth&rdquo; &mdash; it is required at every level of the GH&ndash;liver&ndash;IGF&#8209;1 pathway. Without adequate zinc, the entire axis underperforms, from pituitary release to growth plate response.</p>
        </div>

        {/* Article content */}
        <article className="prose prose-lg max-w-none">

          {/* The Big Picture */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">The Big Picture</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              Most parents know zinc is important. Few understand that it interacts with the growth hormone axis at three distinct levels: pituitary GH storage and secretion, hepatic IGF&#8209;1 production in the liver, and post&#8209;receptor IGF&#8209;1 signaling in target tissues like the growth plate. A deficiency at any one of these levels can quietly limit your child&apos;s height potential &mdash; even if everything else is optimized.
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Your body doesn&apos;t store zinc. Unlike fat-soluble vitamins that accumulate over time, zinc must be consumed daily. This makes consistent dietary intake &mdash; or supplementation &mdash; non-negotiable for growth optimization.
            </p>
            <p className="text-xs text-forest italic mt-3">[Stanford Children&apos;s Health. Zinc. 2024]</p>
          </section>

          {/* 1. Hypothalamus–Pituitary: GH Secretion */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">1. Hypothalamus&ndash;Pituitary: GH Secretion</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              In the pituitary&apos;s somatotroph cells, growth hormone is packaged into secretory granules before being released in pulses. Zinc ions are required for GH to self&#8209;associate and fold correctly inside these granules &mdash; without adequate zinc, granule biogenesis is impaired and normal pulsatile GH release is disrupted.
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              Zinc is also a key cofactor in broader pituitary endocrine function. It helps regulate the synthesis and secretion of GHRH (growth hormone&#8209;releasing hormone) and GH itself. When zinc homeostasis is disturbed, GH output becomes dysregulated &mdash; not catastrophically, but enough to blunt the amplitude of the pulses that drive growth.
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Animal studies confirm this: zinc&#8209;deficient juvenile animals show reduced circulating GH, indicating that the immature pituitary cannot produce or release GH at full capacity without adequate zinc.
            </p>
            <p className="text-xs text-forest italic mt-3"><a href="https://pubmed.ncbi.nlm.nih.gov/2008018/" target="_blank" rel="noopener noreferrer" className="underline hover:text-forest/70">[Prasad AS. Discovery of human zinc deficiency. American Journal of Clinical Nutrition. 1991]</a></p>
          </section>

          {/* 2. Liver: IGF-1 Production */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">2. Liver: IGF&#8209;1 Production</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              The GH&ndash;IGF&#8209;1 axis is explicitly described in the literature as &ldquo;responsive to zinc status.&rdquo; In zinc deficiency, circulating IGF&#8209;1 concentrations are consistently decreased &mdash; even when GH levels vary or appear normal. This means the liver is failing to convert GH signals into IGF&#8209;1 efficiently.
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              Experimental models show that zinc deficiency lowers both serum IGF&#8209;1 and hepatic IGF&#8209;1 gene expression, suggesting that zinc is needed inside hepatocytes for normal GH&#8209;induced IGF&#8209;1 transcription and translation. The liver needs zinc to do its job as the GH&#8209;to&#8209;IGF&#8209;1 conversion factory.
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Clinical work in children supports this directly. Zinc supplementation in growth&#8209;retarded and undernourished pediatric cohorts has been shown to raise circulating IGF&#8209;1 levels &mdash; consistent with improved hepatic IGF&#8209;1 output once zinc status is corrected. One study found that 10mg of zinc per day for 24 weeks led to a net gain of 0.37cm in height compared to controls.
            </p>
            <p className="text-xs text-forest italic mt-3"><a href="https://pubmed.ncbi.nlm.nih.gov/11815315/" target="_blank" rel="noopener noreferrer" className="underline hover:text-forest/70">[Brown KH et al. Effect of supplemental zinc on growth and serum zinc concentrations of prepubertal children. American Journal of Clinical Nutrition. 2002]</a></p>
            <p className="text-xs text-forest italic mt-1">[WHO. Zinc supplementation and growth in children. 2024]</p>
          </section>

          {/* 3. Peripheral IGF-1 Signaling: The Growth Plate */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">3. Peripheral IGF&#8209;1 Signaling: The Growth Plate</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              This is the level most people miss. Even if GH and IGF&#8209;1 levels are adequate, zinc deficiency can block the signal at the target tissue.
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              Zinc appears essential for IGF&#8209;1&#8209;induced cell proliferation at the growth plate. In zinc&#8209;deficient states, administering GH or IGF&#8209;1 alone does not fully correct growth failure &mdash; implying a block in signaling downstream of the IGF&#8209;1 receptor.
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              Mechanistically, reduced zinc availability alters membrane signaling systems and intracellular second messengers that coordinate proliferation in response to IGF&#8209;1. The growth plate chondrocytes receive the IGF&#8209;1 signal but cannot act on it properly. Normal IGF&#8209;1 levels signal less effectively when zinc is insufficient.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-sm sm:text-base text-amber-900 leading-relaxed font-medium">
                This is critical: you can optimize sleep, sprints, and nutrition to maximize GH and IGF&#8209;1 &mdash; but if zinc status is low, the growth plates cannot fully respond to those signals.
              </p>
            </div>
          </section>

          {/* How Much Zinc Do Kids Need? */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">How Much Zinc Do Kids Need?</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
              According to Stanford Children&apos;s Health, the recommended daily intake by age:
            </p>
            <ul className="space-y-1 mb-4">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Ages 1&ndash;3: 3 mg/day</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Ages 4&ndash;8: 5 mg/day</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Ages 9&ndash;13: 8 mg/day</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Males 14&ndash;18: 11 mg/day</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Females 14&ndash;18: 9 mg/day</li>
            </ul>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-sm sm:text-base text-amber-900 leading-relaxed font-medium">
                Important: vegetarian diets may require up to 50% more zinc than these amounts, because phytates in grains and legumes bind to zinc and reduce absorption. Lactose in milk actually aids zinc absorption.
              </p>
            </div>
            <p className="text-xs text-forest italic mt-3">[Stanford Children&apos;s Health. Zinc. 2024]</p>
          </section>

          {/* Best Zinc Foods for Kids */}
          <section className="bg-forest/5 rounded-2xl p-6 sm:p-8 mb-6 border border-forest/20">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">Best Zinc Foods for Kids</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
              Cooked oysters are in a class of their own &mdash; nothing else comes close:
            </p>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between items-center bg-white rounded-lg px-4 py-2 border border-gray-200">
                <span className="text-sm sm:text-base text-gray-700 font-medium">Cooked oysters (3 oz)</span>
                <span className="text-sm sm:text-base text-forest font-bold">28.2 mg</span>
              </div>
              <div className="flex justify-between items-center bg-white rounded-lg px-4 py-2 border border-gray-200">
                <span className="text-sm sm:text-base text-gray-700 font-medium">Beef, roasted (3 oz)</span>
                <span className="text-sm sm:text-base text-forest font-bold">3.8 mg</span>
              </div>
              <div className="flex justify-between items-center bg-white rounded-lg px-4 py-2 border border-gray-200">
                <span className="text-sm sm:text-base text-gray-700 font-medium">Pumpkin seeds, roasted (1 oz)</span>
                <span className="text-sm sm:text-base text-forest font-bold">2.2 mg</span>
              </div>
              <div className="flex justify-between items-center bg-white rounded-lg px-4 py-2 border border-gray-200">
                <span className="text-sm sm:text-base text-gray-700 font-medium">Cheddar cheese (1.5 oz)</span>
                <span className="text-sm sm:text-base text-forest font-bold">1.5 mg</span>
              </div>
              <div className="flex justify-between items-center bg-white rounded-lg px-4 py-2 border border-gray-200">
                <span className="text-sm sm:text-base text-gray-700 font-medium">Sardines, cooked (3 oz)</span>
                <span className="text-sm sm:text-base text-forest font-bold">1.1 mg</span>
              </div>
              <div className="flex justify-between items-center bg-white rounded-lg px-4 py-2 border border-gray-200">
                <span className="text-sm sm:text-base text-gray-700 font-medium">Greek yogurt (6 oz)</span>
                <span className="text-sm sm:text-base text-forest font-bold">1.0 mg</span>
              </div>
              <div className="flex justify-between items-center bg-white rounded-lg px-4 py-2 border border-gray-200">
                <span className="text-sm sm:text-base text-gray-700 font-medium">Egg (1 large)</span>
                <span className="text-sm sm:text-base text-forest font-bold">0.6 mg</span>
              </div>
            </div>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Oysters must always be thoroughly cooked for children &mdash; never raw. Cooked oysters are safe for children and can be introduced as early as 6 months of age when finely chopped. For older kids, fried oysters, oyster stew, or oysters mixed into pasta are all excellent delivery methods.
            </p>
            <p className="text-xs text-forest italic mt-3">[Stanford Children&apos;s Health. Zinc. 2024]</p>
            <p className="text-xs text-forest italic mt-1">[CDC. Zinc: Infant and Toddler Nutrition. 2024]</p>
          </section>

          {/* Should You Supplement? */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">Should You Supplement?</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              If your child eats cooked oysters 1&ndash;2x per week plus beef, eggs, and dairy daily, they are likely meeting zinc needs through food alone. But because the body cannot store zinc, daily intake matters.
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              For families where oysters and red meat aren&apos;t regular staples, a liquid zinc sulfate supplement is reasonable insurance. Look for organic zinc sulfate drops formulated for children. Typical supplemental doses range from 5&ndash;11mg depending on age.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-sm sm:text-base text-amber-900 leading-relaxed font-medium">
                Always consult your child&apos;s pediatrician before starting any supplement.
              </p>
            </div>
          </section>

          {/* The bioKids Takeaway */}
          <section className="bg-forest text-white rounded-2xl p-6 sm:p-8 mb-6">
            <h2 className="font-display text-xl sm:text-2xl mb-4">The bioKids Takeaway</h2>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed mb-4">
              Zinc is load-bearing at every stage of the growth axis. A child can have perfect sleep, perfect sprints, and perfect nutrition &mdash; but if zinc status is insufficient, the pituitary undersecretes GH, the liver underproduces IGF&#8209;1, and the growth plates underrespond to the IGF&#8209;1 that does arrive.
            </p>
            <p className="text-sm sm:text-base text-white font-semibold leading-relaxed">
              The bioKids protocol prioritizes zinc-rich foods as foundational, not supplemental. Cooked oysters 1&ndash;2x per week, daily eggs, beef liver weekly, and pumpkin seeds as a regular snack keep all three levels of the axis fully loaded so nothing is left on the table.
            </p>
          </section>

          {/* References */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200">
            <h2 className="font-display text-lg text-black mb-4">References</h2>
            <ul className="space-y-3 text-xs sm:text-sm text-gray-500 leading-relaxed">
              <li><a href="https://pubmed.ncbi.nlm.nih.gov/2008018/" target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline hover:text-emerald-900">Prasad AS. Discovery of human zinc deficiency: its impact on human health and disease. <em>American Journal of Clinical Nutrition</em>. 1991;53(2):403-412.</a></li>
              <li><a href="https://pubmed.ncbi.nlm.nih.gov/11815315/" target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline hover:text-emerald-900">Brown KH et al. Effect of supplemental zinc on the growth and serum zinc concentrations of prepubertal children: a meta-analysis of randomized controlled trials. <em>American Journal of Clinical Nutrition</em>. 2002;75(6):1062-1071.</a></li>
              <li className="text-emerald-700">WHO. Zinc supplementation and growth in children. 2024.</li>
              <li className="text-emerald-700">Stanford Children&apos;s Health. Zinc. 2024.</li>
              <li className="text-emerald-700">CDC. Zinc: Infant and Toddler Nutrition. 2024.</li>
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
