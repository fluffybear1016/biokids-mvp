'use client';

import Link from 'next/link';
import Nav from '@/components/Nav';

export default function GlycineArticle() {
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
          <h1 className="font-display text-3xl sm:text-4xl text-black mb-3">Glycine: The Secret Weapon</h1>
          <p className="text-base sm:text-lg text-gray-600 font-mono">How the simplest amino acid can boost growth hormone, deepen sleep, and build stronger bones.</p>
        </div>

        {/* Article content */}
        <article className="prose prose-lg max-w-none">

          {/* What Is Glycine? */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">What Is Glycine?</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              Glycine is the simplest amino acid &mdash; and one of the most underrated tools for growth optimization.
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              It&apos;s emerging as a central regulator of:
            </p>
            <ul className="space-y-1 mb-4">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Skeletal muscle growth</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Collagen and bone formation</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Sleep quality</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Growth hormone (GH) release</li>
            </ul>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              And most children aren&apos;t getting enough of it.
            </p>
          </section>

          {/* Glycine and Sleep */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">Glycine and Sleep</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              Evening intake of glycine (typically 3g orally) before bedtime has been shown to:
            </p>
            <ul className="space-y-1 mb-2">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Improve subjective sleep quality</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Improve next-day performance</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Facilitate sleep onset</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Promote deeper, more restorative sleep stages</li>
            </ul>
            <p className="text-xs text-forest italic mb-4">[Inagawa K. et al. Sleep and Biological Rhythms. 2006]</p>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-sm sm:text-base text-amber-900 leading-relaxed font-medium">
                Why this matters for growth: Deep slow-wave sleep is when maximal nocturnal GH secretion occurs. Better sleep architecture = more GH pulses = more growth signal.
              </p>
            </div>
          </section>

          {/* Glycine and Growth Hormone */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">Glycine and Growth Hormone</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
              Classic infusion studies demonstrate that glycine administration directly stimulates GH release in humans.
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-2">
              In normal adults, intravenous glycine (4&ndash;12g) produces a significant and dose-dependent rise in plasma GH &mdash; several-fold above baseline.
            </p>
            <p className="text-xs text-forest italic mb-4">[Kasai K. et al. Metabolism. 1980]</p>
            <h3 className="font-semibold text-black text-base mb-2">The double benefit:</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              Pre-sleep glycine from bone broth, gelatin, or collagen-rich foods could act both by:
            </p>
            <ol className="space-y-2 list-decimal list-inside">
              <li className="text-sm sm:text-base text-gray-700">Enhancing slow-wave sleep</li>
              <li className="text-sm sm:text-base text-gray-700">Directly augmenting GH output during that window</li>
            </ol>
          </section>

          {/* Glycine and Muscle Growth */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">Glycine and Muscle Growth</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
              At the cellular level, glycine is a true anabolic effector in muscle.
            </p>
            <h3 className="font-semibold text-black text-base mb-2">What the research shows:</h3>
            <ul className="space-y-1 mb-4">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Glycine dose-dependently stimulates protein synthesis</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Glycine inhibits protein degradation</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Glycine preserves muscle under catabolic stress</li>
            </ul>
            <h3 className="font-semibold text-black text-base mb-2">The mechanism:</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-2">
              Glycine activates mTORC1 &mdash; the master switch for muscle protein synthesis &mdash; and maintains it even under inflammatory or nutrient stress.
            </p>
            <p className="text-xs text-forest italic mb-4">[Ham DJ. et al. Frontiers in Nutrition. 2019]</p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              In animal studies, dietary glycine supplementation:
            </p>
            <ul className="space-y-1">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Activates mTORC1 in skeletal muscle</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Restores the anabolic response to leucine</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Protects against muscle wasting</li>
            </ul>
          </section>

          {/* Glycine and Bone Growth */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">Glycine and Bone Growth</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
              Glycine is indispensable for collagen biosynthesis &mdash; and collagen is the scaffold on which bones are built.
            </p>
            <h3 className="font-semibold text-black text-base mb-2">The numbers:</h3>
            <ul className="space-y-1 mb-2">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Type I collagen constitutes about 90% of the organic matrix of bone</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Glycine is required at every third residue in collagen&apos;s triple helix</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Glycine is the most abundant amino acid in collagen</li>
            </ul>
            <p className="text-xs text-forest italic mb-4">[de Paz-Lugo P. et al. Amino Acids. 2018]</p>

            <h3 className="font-semibold text-black text-base mb-2">What happens with adequate glycine:</h3>
            <ul className="space-y-1 mb-4">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Increased collagen synthesis by cartilage cells</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Up-regulation of bone formation markers (Alp, Osx, Runx2, Ocn)</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Enhanced collagen deposition</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Improved bone regeneration</li>
            </ul>
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <p className="text-sm sm:text-base text-red-900 leading-relaxed font-medium">
                Without adequate glycine: The body cannot efficiently construct or repair the collagen scaffold on which bone mineralization and longitudinal growth depend.
              </p>
            </div>
          </section>

          {/* The Modern Diet Problem */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">The Modern Diet Problem</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
              Here&apos;s the issue: modern diets are unbalanced.
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              Egg- and muscle-meat-heavy diets are:
            </p>
            <ul className="space-y-1 mb-4">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span>Relatively rich in methionine</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span>Comparatively poor in glycine</li>
            </ul>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-2">
              This produces an unbalanced methionine:glycine ratio that may be metabolically disadvantageous.
            </p>
            <p className="text-xs text-forest italic mb-4">[McCarty MF. et al. Medical Hypotheses. 2011]</p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-medium">
              The solution: Pair protein-rich diets with glycine-rich foods to normalize this ratio.
            </p>
          </section>

          {/* Glycine-Rich Foods */}
          <section className="bg-forest/5 rounded-2xl p-6 sm:p-8 mb-6 border border-forest/20">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">Glycine-Rich Foods</h2>

            <div className="space-y-5">
              <div>
                <h3 className="font-semibold text-black text-base mb-1">Bone Broth</h3>
                <ul className="space-y-1">
                  <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Homemade from bones simmered 12&ndash;24 hours</li>
                  <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>1 cup provides 2&ndash;3g glycine</li>
                  <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Perfect evening food</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-black text-base mb-1">Gelatin</h3>
                <ul className="space-y-1">
                  <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Powdered gelatin in desserts or gummies</li>
                  <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Easy to incorporate</li>
                  <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Kids love it</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-black text-base mb-1">Collagen Peptides</h3>
                <ul className="space-y-1">
                  <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Dissolves in any liquid</li>
                  <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Flavorless</li>
                  <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Can add to smoothies, milk, or warm drinks</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-black text-base mb-1">Connective Tissue Cuts</h3>
                <ul className="space-y-1">
                  <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Oxtail, shanks, chicken feet</li>
                  <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Traditional foods our ancestors ate</li>
                  <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Naturally glycine-rich</li>
                </ul>
              </div>
            </div>
          </section>

          {/* The Practical Protocol */}
          <section className="bg-forest/5 rounded-2xl p-6 sm:p-8 mb-6 border border-forest/20">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">The Practical Protocol</h2>

            <div className="bg-white rounded-xl p-4 mb-4 border border-gray-200">
              <p className="text-sm sm:text-base text-gray-700 font-medium">
                Evening glycine dose: 3&ndash;5g before bed
              </p>
            </div>

            <h3 className="font-semibold text-black text-base mb-2">How to deliver it:</h3>
            <ul className="space-y-1 mb-4">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>1 cup bone broth at dinner or before bed</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Gelatin dessert (homemade jello with real gelatin)</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Collagen peptides in warm milk</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Gummy snacks made with gelatin</li>
            </ul>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-sm sm:text-base text-amber-900 leading-relaxed font-medium">
                Timing: Within 1&ndash;2 hours of bedtime for maximum sleep and GH benefit.
              </p>
            </div>
          </section>

          {/* The Complete Picture */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">The Complete Picture</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
              Glycine works on multiple pathways simultaneously:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm sm:text-base">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 pr-4 text-black font-semibold">System</th>
                    <th className="text-left py-2 text-black font-semibold">Effect</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4 font-medium">Sleep</td>
                    <td className="py-2">Deeper slow-wave sleep</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4 font-medium">GH Release</td>
                    <td className="py-2">Direct stimulation</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4 font-medium">Muscle</td>
                    <td className="py-2">mTORC1 activation, protein synthesis</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4 font-medium">Bone</td>
                    <td className="py-2">Collagen formation, mineralization scaffold</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium">Metabolism</td>
                    <td className="py-2">Balances methionine load</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mt-4 font-medium">
              This makes it one of the most efficient single interventions for growth.
            </p>
          </section>

          {/* Safety Notes */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">Safety Notes</h2>
            <ul className="space-y-2">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Glycine is generally recognized as safe at nutritional doses</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Some animal studies show modest testosterone reductions at very high doses</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Stick to food-based sources or moderate supplementation (3&ndash;5g)</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>No human data shows clinically meaningful hormonal suppression at nutritional intakes</li>
            </ul>
          </section>

          {/* Bottom Line */}
          <section className="bg-forest text-white rounded-2xl p-6 sm:p-8 mb-6">
            <h2 className="font-display text-xl sm:text-2xl mb-4">The Bottom Line</h2>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed mb-4">
              Glycine is a secret weapon hiding in plain sight.
            </p>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed mb-4">
              It improves sleep, stimulates growth hormone, activates muscle-building pathways, and provides the essential building block for collagen and bone.
            </p>
            <p className="text-sm sm:text-base text-white font-semibold leading-relaxed">
              The simple prescription: Bone broth or gelatin before bed. Your child gets better sleep, more GH, and the raw material for stronger bones &mdash; all from one traditional food.
            </p>
          </section>

          {/* References */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200">
            <h2 className="font-display text-lg text-black mb-4">References</h2>
            <ul className="space-y-3 text-xs sm:text-sm text-gray-500 leading-relaxed">
              <li>Inagawa K, et al. Subjective effects of glycine ingestion before bedtime on sleep quality. <em>Sleep and Biological Rhythms</em>. 2006;4(1):75-77.</li>
              <li>Kasai K, et al. Glycine stimulated growth hormone release in man. <em>Metabolism</em>. 1980;29(9):826-829.</li>
              <li>Ham DJ, et al. Glycine administration attenuates skeletal muscle wasting in a mouse model of cancer cachexia. <em>Frontiers in Nutrition</em>. 2019;6:172.</li>
              <li>de Paz-Lugo P, et al. High glycine concentration increases collagen synthesis by articular chondrocytes in vitro. <em>Amino Acids</em>. 2018;50(10):1405-1415.</li>
              <li>McCarty MF, et al. Dietary glycine is rate-limiting for glutathione synthesis and may have broad anti-atherosclerotic effects. <em>Medical Hypotheses</em>. 2011;76(5):697-702.</li>
              <li>Bannai M, et al. The effects of glycine on subjective daytime performance in partially sleep-restricted healthy volunteers. <em>Frontiers in Neurology</em>. 2012;3:61.</li>
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
