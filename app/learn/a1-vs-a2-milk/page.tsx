'use client';

import Link from 'next/link';
import Nav from '@/components/Nav';

export default function A1VsA2MilkArticle() {
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
            <span className="text-xs text-gray-400">8 min read</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl text-black mb-3">A1 vs A2 Milk: Why the Type Matters</h1>
          <p className="text-base sm:text-lg text-gray-600 font-mono">The hidden difference in milk proteins that could be affecting your child&apos;s gut, inflammation, and height potential.</p>
        </div>

        {/* Article content */}
        <article className="prose prose-lg max-w-none">

          {/* The One Amino Acid */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">The One Amino Acid That Changes Everything</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              All cow&apos;s milk contains a protein called &beta;-casein. But not all &beta;-casein is the same.
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              There are two major variants:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500 font-bold">&#8226;</span><strong>A1 &beta;-casein</strong> &mdash; has histidine at position 67</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span><strong>A2 &beta;-casein</strong> &mdash; has proline at position 67</li>
            </ul>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-medium">
              One amino acid difference. Massive downstream effects.
            </p>
          </section>

          {/* What Happens When You Digest A1 Milk */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">What Happens When You Digest A1 Milk</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              When A1 &beta;-casein hits your digestive system, gastric and intestinal enzymes cleave it to release a peptide called <strong>&beta;-casomorphin-7 (BCM-7)</strong>.
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              BCM-7 is an opioid peptide that can:
            </p>
            <ul className="space-y-1 mb-2">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span>Bind &mu;-opioid receptors in the gut</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span>Increase intestinal mucus production</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span>Trigger inflammatory responses</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span>Increase intestinal permeability (&ldquo;leaky gut&rdquo;)</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span>Enter the bloodstream under conditions of higher permeability</li>
            </ul>
            <p className="text-xs text-forest italic mb-4">[Ul Haq MR. et al. Nutrition Reviews. 2014]</p>
            <div className="bg-forest/5 border border-forest/20 rounded-xl p-4">
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-medium">
                A2 milk is different: The proline at position 67 alters the peptide bond, limiting proteolytic release. A2 digestion generates little or no BCM-7.
              </p>
            </div>
          </section>

          {/* The Human Evidence - Adults */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">The Human Evidence</h2>
            <h3 className="font-semibold text-black text-base mb-3">Adults with Milk Sensitivity</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
              In a randomized crossover trial of Chinese adults with self-reported milk intolerance:
            </p>
            <h4 className="font-semibold text-black text-sm mb-2">Conventional A1/A2 milk caused:</h4>
            <ul className="space-y-1 mb-4">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span>Increased gastrointestinal symptoms</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span>Delayed intestinal transit</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span>Elevated serum inflammatory markers</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span>Raised circulating BCM-7 concentrations</li>
            </ul>
            <h4 className="font-semibold text-black text-sm mb-2">A2-only milk:</h4>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-medium mb-1">None of these effects.</p>
            <p className="text-xs text-forest italic">[Ho S. et al. Nutrition Journal. 2014]</p>
          </section>

          {/* Children Show the Same Pattern */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h3 className="font-semibold text-lg text-black mb-3">Children Show the Same Pattern</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              A similar crossover study in preschool-age Chinese children predisposed to digestive discomfort found that A1-containing milk led to:
            </p>
            <ul className="space-y-1 mb-4">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span>More gastrointestinal symptoms</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span>Altered fecal consistency</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span>Higher inflammatory markers</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span>Poorer performance on cognitive tests</li>
            </ul>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-medium mb-1">A2-only milk avoided these issues.</p>
            <p className="text-xs text-forest italic">[He M. et al. Journal of Pediatric Gastroenterology and Nutrition. 2017]</p>
          </section>

          {/* A2 Milk and Growth */}
          <section className="bg-amber-50 rounded-2xl p-6 sm:p-8 mb-6 border border-amber-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">A2 Milk and Growth: The Direct Evidence</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
              This is where it gets exciting for height-focused parents.
            </p>
            <h3 className="font-semibold text-black text-base mb-3">The Stunted Children Trial</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              A 12-week trial in stunted children (12&ndash;36 months old) supplemented with A2 cow milk versus conventional milk found:
            </p>
            <h4 className="font-semibold text-black text-sm mb-2">A2 milk group showed:</h4>
            <ul className="space-y-1 mb-4">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Significant improvements in weight-for-age z-scores</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Significant improvements in height-for-age z-scores</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Increased serum IGF-1</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Improved nutritional biomarkers</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Declined inflammatory biomarkers</li>
            </ul>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-medium mb-1">
              Conventional milk controls: Did not experience the same magnitude of catch-up growth.
            </p>
            <p className="text-xs text-forest italic">[Ramadhan MR. et al. Nutrients. 2023]</p>
          </section>

          {/* Why A2 Milk Supports Better Growth */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">Why A2 Milk Supports Better Growth</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
              The pattern of higher IGF-1 and better linear growth in A2 milk makes biological sense:
            </p>
            <h3 className="font-semibold text-black text-base mb-3">The Inflammation-Growth Connection</h3>
            <ol className="space-y-2 list-decimal list-inside mb-2">
              <li className="text-sm sm:text-base text-gray-700"><strong>A1 milk &rarr; BCM-7 &rarr; gut inflammation</strong></li>
              <li className="text-sm sm:text-base text-gray-700"><strong>Gut inflammation &rarr; increased intestinal permeability</strong></li>
              <li className="text-sm sm:text-base text-gray-700"><strong>Increased permeability &rarr; impaired nutrient absorption</strong></li>
              <li className="text-sm sm:text-base text-gray-700"><strong>Systemic inflammation &rarr; elevated TNF-&alpha; and other cytokines</strong></li>
              <li className="text-sm sm:text-base text-gray-700"><strong>Cytokines &rarr; hepatic GH resistance &rarr; blunted IGF-1 production</strong></li>
              <li className="text-sm sm:text-base text-gray-700"><strong>Blunted IGF-1 &rarr; reduced growth plate activity &rarr; less height gain</strong></li>
            </ol>
            <p className="text-xs text-forest italic mb-5">[Jianqin S. et al. Nutrition Journal. 2016]</p>

            <h3 className="font-semibold text-black text-base mb-2">The A2 Advantage</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              By reducing BCM-7 exposure, A2 milk:
            </p>
            <ul className="space-y-1">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Preserves gut barrier integrity</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Lowers intestinal and systemic inflammation</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Creates a more favorable environment for GH-to-IGF-1 conversion</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Supports efficient nutrient delivery to growth plates</li>
            </ul>
          </section>

          {/* Which Cows Produce Which Milk? */}
          <section className="bg-forest/5 rounded-2xl p-6 sm:p-8 mb-6 border border-forest/20">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">Which Cows Produce Which Milk?</h2>

            <h3 className="font-semibold text-black text-base mb-2">High A1 Breeds (Common in North America):</h3>
            <ul className="space-y-1 mb-4">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span>Holstein (most commercial dairy)</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span>Friesian</li>
            </ul>

            <h3 className="font-semibold text-black text-base mb-2">High A2 Breeds:</h3>
            <ul className="space-y-1 mb-4">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Jersey</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Guernsey</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Brown Swiss</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Most heritage breeds</li>
            </ul>

            <h3 className="font-semibold text-black text-base mb-2">Naturally A2:</h3>
            <ul className="space-y-1 mb-4">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Goat milk</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Sheep milk</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Human breast milk</li>
            </ul>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Human and small ruminant milks contain &beta;-casein variants structurally similar to bovine A2 &mdash; suggesting A2 may be closer to the evolutionary norm for early-life nutrition.
            </p>
            <p className="text-xs text-forest italic mt-3">[Brooke-Taylor S. et al. Nutrition Reviews. 2017]</p>
          </section>

          {/* The Practical Protocol */}
          <section className="bg-forest/5 rounded-2xl p-6 sm:p-8 mb-6 border border-forest/20">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">The Practical Protocol</h2>

            <h3 className="font-semibold text-black text-base mb-2">Option 1: Switch to A2 Milk</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-1">
              Look for milk specifically labeled &ldquo;A2&rdquo; &mdash; these come from cows genetically tested to produce only A2 &beta;-casein.
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
              <strong>Brands:</strong> a2 Milk&reg; and others now widely available.
            </p>

            <h3 className="font-semibold text-black text-base mb-2">Option 2: Choose A2-Dominant Breeds</h3>
            <ul className="space-y-1 mb-4">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Jersey milk</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Guernsey milk</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Raw milk from heritage breeds (where legal and safe)</li>
            </ul>

            <h3 className="font-semibold text-black text-base mb-2">Option 3: Alternative Milks</h3>
            <ul className="space-y-1 mb-4">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Goat milk (naturally A2)</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Sheep milk (naturally A2)</li>
            </ul>

            <h3 className="font-semibold text-black text-base mb-2">What to Avoid:</h3>
            <ul className="space-y-1">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span>Standard supermarket milk (mostly Holstein, high A1)</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span>&ldquo;Organic&rdquo; doesn&apos;t mean A2 &mdash; organic Holstein milk is still A1</li>
            </ul>
          </section>

          {/* Who Benefits Most? */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">Who Benefits Most?</h2>
            <h3 className="font-semibold text-black text-base mb-2">High priority for A2:</h3>
            <ul className="space-y-1 mb-4">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Children with digestive issues after drinking milk</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Children with eczema, allergies, or inflammatory conditions</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Stunted or slow-growing children</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Any child drinking significant amounts of milk daily</li>
            </ul>
            <h3 className="font-semibold text-black text-base mb-2">Still beneficial for:</h3>
            <ul className="space-y-1">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>All children &mdash; less inflammatory load is always better for growth</li>
            </ul>
          </section>

          {/* Bottom Line */}
          <section className="bg-forest text-white rounded-2xl p-6 sm:p-8 mb-6">
            <h2 className="font-display text-xl sm:text-2xl mb-4">The Bottom Line</h2>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed mb-4">
              Not all milk is created equal.
            </p>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed mb-4">
              A1 milk releases an inflammatory peptide (BCM-7) that can damage the gut, impair nutrient absorption, and blunt the GH-IGF-1 axis. A2 milk avoids this entirely &mdash; and in clinical trials, stunted children on A2 milk showed better growth, higher IGF-1, and improved nutritional status.
            </p>
            <p className="text-sm sm:text-base text-white font-semibold leading-relaxed mb-4">
              The simple switch: Replace conventional milk with A2 milk. Same nutrition, none of the inflammatory baggage.
            </p>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed">
              For a child drinking 2&ndash;3 glasses of milk per day, this single change could meaningfully reduce growth-limiting inflammation over years of development.
            </p>
          </section>

          {/* References */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200">
            <h2 className="font-display text-lg text-black mb-4">References</h2>
            <ul className="space-y-3 text-xs sm:text-sm text-gray-500 leading-relaxed">
              <li>Ul Haq MR, et al. Comparative evaluation of cow &beta;-casein variants (A1/A2) consumption on Th2-mediated inflammatory response in mouse gut. <em>Nutrition Reviews</em>. 2014;72(12):955-962.</li>
              <li>Ho S, et al. Comparative effects of A1 versus A2 beta-casein on gastrointestinal measures: a blinded randomised cross-over pilot study. <em>Nutrition Journal</em>. 2014;13:e1259.</li>
              <li>He M, et al. Effects of cow&apos;s milk beta-casein variants on symptoms of milk intolerance in Chinese adults. <em>Journal of Pediatric Gastroenterology and Nutrition</em>. 2017;65(1):e1-e7.</li>
              <li>Ramadhan MR, et al. Effect of A2 beta-casein milk on growth and nutritional status in stunted children. <em>Nutrients</em>. 2023;15(7):1621.</li>
              <li>Jianqin S, et al. Effects of milk containing only A2 beta casein versus milk containing both A1 and A2 beta casein proteins on gastrointestinal physiology, symptoms of discomfort, and cognitive behavior. <em>Nutrition Journal</em>. 2016;15:35.</li>
              <li>Brooke-Taylor S, et al. Systematic review of the gastrointestinal effects of A1 compared with A2 &beta;-casein. <em>Nutrition Reviews</em>. 2017;8(9):739-755.</li>
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
