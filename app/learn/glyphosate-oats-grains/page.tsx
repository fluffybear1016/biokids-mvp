'use client';

import Link from 'next/link';
import Nav from '@/components/Nav';

export default function GlyphosateArticle() {
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
            <span className="text-xs font-semibold text-forest uppercase tracking-wider">Toxins</span>
            <span className="text-xs text-gray-400">&middot;</span>
            <span className="text-xs text-gray-400">5 min read</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl text-black mb-3">Why Oats and Grains May Be Sabotaging Your Child&apos;s Growth</h1>
          <p className="text-base sm:text-lg text-gray-600 font-mono">High-agency parents should think of oats and refined grains as a hormone and gut &ldquo;delivery system&rdquo; for glyphosate unless the product is explicitly screened and verified clean.</p>
        </div>

        {/* Article content */}
        <article className="prose prose-lg max-w-none">

          {/* The Glyphosate Problem */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">The Glyphosate Problem</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
              Glyphosate is the most widely used herbicide in the world, and it shows up most heavily in oat-based and wheat-based convenience foods because these crops are often sprayed right before harvest to dry them down.
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Children eat a disproportionate amount of these products per kilo of body weight, and multiple surveys have found that kids carry higher glyphosate levels than adults &mdash; largely from cereals, snack bars, crackers, and oat products marketed as &ldquo;healthy.&rdquo;
            </p>
            <p className="text-xs text-forest italic mt-3">[Mills PJ. et al. JAMA. 2017]</p>
          </section>

          {/* How Glyphosate Blocks Growth */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">How Glyphosate Blocks Growth</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-5">
              From a growth perspective, glyphosate is not just a weed killer &mdash; it behaves like an endocrine-disrupting chemical and a gut disruptor, both of which strike directly at the systems that control height.
            </p>

            <h3 className="font-semibold text-black text-base mb-2">Hormone Disruption</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-2">
              Experimental work shows that glyphosate and its commercial formulations can alter puberty timing, sex hormones, and reproductive development in animal models, with dose-dependent shifts in androgen and estrogen signaling and changes in the timing of sexual maturation.
            </p>
            <p className="text-xs text-forest italic mb-5">[Romano MA. et al. Reproductive Toxicology. 2012]</p>

            <h3 className="font-semibold text-black text-base mb-2">Gut Disruption</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              Systematic reviews of glyphosate&apos;s effects on the gut microbiota report:
            </p>
            <ul className="space-y-2 mb-3">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span>Intestinal dysbiosis</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span>Increased intestinal permeability (&ldquo;leaky gut&rdquo;)</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span>Damage to microvilli</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span>Broad changes in energy and vitamin metabolism</li>
            </ul>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              These are exactly the pathways you need intact for protein absorption, IGF-1 production, and efficient bone building.
            </p>
            <p className="text-xs text-forest italic mt-3">[Mesnage R. et al. Environmental Health. 2021]</p>
          </section>

          {/* The Human Evidence */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">The Human Evidence</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              Human data, while still emerging, point in the same direction:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Gestational and early-life glyphosate exposure has been linked to lower birth weight, shorter gestation, and adverse early neurodevelopment</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Low birth weight is consistently associated with shorter adult height and higher risk of metabolic disease</li>
            </ul>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
              These are not &ldquo;acute poisoning&rdquo; effects &mdash; they are quiet, chronic shifts in development curves that show up years later as a child who never quite reaches the genetic height you would expect.
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Because glyphosate can act at extremely low doses on hormone pathways and the microbiome, the traditional &ldquo;it&apos;s under the regulatory limit, so it&apos;s fine&rdquo; framing is not adequate if your goal is optimization rather than bare-minimum safety.
            </p>
            <p className="text-xs text-forest italic mt-3">[Parvez S. et al. Environmental Health. 2018]</p>
          </section>

          {/* What Testing Reveals */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">What Testing Reveals</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Independent testing has repeatedly found that mainstream oat cereals, granolas, crackers, and snack foods aimed at children contain glyphosate in the tens to thousands of parts per billion, while certified organic versions in the same categories often test below detection.
            </p>
            <p className="text-xs text-forest italic mt-3">[Environmental Working Group. 2018]</p>
          </section>

          {/* The Actionable Rule */}
          <section className="bg-forest/5 rounded-2xl p-6 sm:p-8 mb-6 border border-forest/20">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">The Actionable Rule</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4 font-medium">
              Treat all oats and refined grain products as guilty until proven otherwise.
            </p>

            <h3 className="font-semibold text-black text-base mb-2">Avoid:</h3>
            <ul className="space-y-1 mb-4">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span>Oat cereals</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span>Granola and granola bars</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span>Crackers</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span>Snack products marketed to children</li>
            </ul>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
              <strong>Unless:</strong> You can verify they are organic AND batch-tested for glyphosate.
            </p>

            <h3 className="font-semibold text-black text-base mb-2">Instead, build carbs around:</h3>
            <ul className="space-y-1">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Root vegetables (sweet potato, potato, carrots)</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Fruits</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Rice</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Other staples with lower documented residue profiles</li>
            </ul>
          </section>

          {/* Bottom Line */}
          <section className="bg-forest text-white rounded-2xl p-6 sm:p-8 mb-6">
            <h2 className="font-display text-xl sm:text-2xl mb-4">The Bottom Line</h2>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed">
              Glyphosate quietly disrupts hormones and gut function &mdash; the two systems most critical for height. For a height-focused household, avoiding conventional oats and grains isn&apos;t paranoia; it&apos;s precision.
            </p>
          </section>

          {/* References */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200">
            <h2 className="font-display text-lg text-black mb-4">References</h2>
            <ul className="space-y-3 text-xs sm:text-sm text-gray-500 leading-relaxed">
              <li>Mills PJ, et al. Excretion of the herbicide glyphosate in older adults between 1993 and 2016. <em>JAMA</em>. 2017;318(16):1610-1611.</li>
              <li>Romano MA, et al. Glyphosate impairs male offspring reproductive development by disrupting gonadotropin expression. <em>Reproductive Toxicology</em>. 2012;33(2):142-148.</li>
              <li>Mesnage R, et al. Use of shotgun metagenomics and metabolomics to evaluate the impact of glyphosate or Roundup MON 52276 on the gut microbiota and serum metabolome of Sprague-Dawley rats. <em>Environmental Health</em>. 2021;20(1):1-13.</li>
              <li>Parvez S, et al. Glyphosate exposure in pregnancy and shortened gestational length: a prospective Indiana birth cohort study. <em>Environmental Health</em>. 2018;17(1):1-12.</li>
              <li>Environmental Working Group. Glyphosate contamination in oat products. EWG Report. 2018.</li>
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
