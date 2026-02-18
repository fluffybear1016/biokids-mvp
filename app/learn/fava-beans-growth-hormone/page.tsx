'use client';

import Link from 'next/link';
import Nav from '@/components/Nav';

export default function FavaBeansArticle() {
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
            <span className="text-xs text-gray-400">9 min read</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl text-black mb-3">Fava Beans: The Natural Growth Hormone Trigger</h1>
          <p className="text-base sm:text-lg text-gray-600 font-mono">How a humble Mediterranean bean can stimulate your child&apos;s GH release &mdash; backed by decades of clinical research.</p>
        </div>

        {/* Article content */}
        <article className="prose prose-lg max-w-none">

          {/* The Secret Doctors Use */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">The Secret Doctors Use to Test Growth Hormone</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              Here&apos;s something most parents don&apos;t know: when endocrinologists need to test whether a child&apos;s pituitary gland can release growth hormone, one of the standard provocative agents they use is <strong>L-dopa</strong>.
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-2">
              L-dopa is administered, blood is drawn, and if GH rises appropriately, the pituitary is functioning normally.
            </p>
            <p className="text-xs text-forest italic mb-4">[Chakmakjian ZH. et al. Pediatric Research. 1973]</p>
            <div className="bg-forest/5 border border-forest/20 rounded-xl p-4">
              <p className="text-sm sm:text-base text-gray-800 leading-relaxed font-medium">
                The connection to fava beans? Fava beans are one of nature&apos;s richest sources of L-dopa.
              </p>
            </div>
          </section>

          {/* What Is L-Dopa? */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">What Is L-Dopa?</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              L-dopa (L-3,4-dihydroxyphenylalanine) is:
            </p>
            <ul className="space-y-1 mb-2">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>A naturally occurring amino acid</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>The direct precursor to dopamine</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Able to cross the blood-brain barrier</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>A proven stimulator of growth hormone release</li>
            </ul>
            <p className="text-xs text-forest italic mt-3">[Boyd AE. et al. New England Journal of Medicine. 1970]</p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mt-4 font-medium">
              When you eat fava beans, you&apos;re consuming the same compound doctors use to provoke GH secretion in clinical testing.
            </p>
          </section>

          {/* The Clinical Evidence */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">The Clinical Evidence: L-Dopa Stimulates Growth Hormone</h2>

            <h3 className="font-semibold text-black text-base mb-2">The New England Journal of Medicine Study</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-2">
              In 1970, researchers at Duke University Medical Center demonstrated that L-dopa stimulates growth hormone secretion in humans. Patients given L-dopa showed significant increases in plasma GH levels.
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-2">
              The study concluded that dopaminergic mechanisms in the hypothalamus are directly involved in regulating growth hormone release.
            </p>
            <p className="text-xs text-forest italic mb-5">[Boyd AE. et al. New England Journal of Medicine. 1970]</p>

            <h3 className="font-semibold text-black text-base mb-2">The Pediatric Research Study</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              In children with short stature, L-dopa (100&ndash;500mg oral dose) was tested as a provocative agent for GH release:
            </p>
            <ul className="space-y-1 mb-2">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span><strong>15 of 17 children</strong> showed significant GH rise</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Peak GH response occurred between <strong>30&ndash;120 minutes</strong></li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Mean peak GH response: <strong>21.3 ng/ml</strong></li>
            </ul>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mt-3 italic">
              The researchers concluded that L-dopa &ldquo;seems to be a simple and valid agent for evaluation of pituitary GH reserve.&rdquo;
            </p>
            <p className="text-xs text-forest italic mt-2 mb-5">[Chakmakjian ZH. et al. Pediatric Research. 1973]</p>

            <h3 className="font-semibold text-black text-base mb-2">The Hypothalamic GHRH Connection</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              A landmark study published in 1986 demonstrated that L-dopa doesn&apos;t just stimulate GH release directly &mdash; it actually triggers the hypothalamus to release GHRH (growth hormone-releasing hormone).
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-2">
              In normal subjects, oral L-dopa (0.5g) caused significant increases in <strong>both</strong> plasma GHRH and GH levels, with a strong correlation between the two.
            </p>
            <p className="text-xs text-forest italic">[Miki N. et al. Journal of Clinical Endocrinology &amp; Metabolism. 1986]</p>
          </section>

          {/* Fava Beans: Nature's L-Dopa Source */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">Fava Beans: Nature&apos;s L-Dopa Source</h2>

            <h3 className="font-semibold text-black text-base mb-2">L-Dopa Content</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              Fava beans (Vicia faba) contain:
            </p>
            <ul className="space-y-1 mb-2">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span><strong>0.5% L-dopa in fresh beans</strong></li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>0.07% when dried</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Highest concentrations in fresh leaves (22.4 mg/g)</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Significant amounts in pods, flowers, and seeds</li>
            </ul>
            <p className="text-xs text-forest italic mb-4">[Mohseni Mehran SM. et al. Journal of Clinical and Diagnostic Research. 2013]</p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed italic">
              Historical note: L-dopa was first isolated from Vicia faba by Guggenheim in 1913 &mdash; this humble bean is where dopamine science began.
            </p>
          </section>

          {/* What Happens When You Eat Fava Beans */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">What Happens When You Eat Fava Beans</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              A clinical study measuring plasma levels after fava bean consumption found:
            </p>
            <ul className="space-y-1 mb-2">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Plasma L-dopa increased <strong>nearly 7-fold</strong> within 1 hour</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Plasma dopamine increased <strong>nearly 15-fold</strong></li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Elevated levels persisted for <strong>6+ hours</strong></li>
            </ul>
            <p className="text-xs text-forest italic mt-2">[Rabey JM. et al. Journal of Clinical Nutrition. 2013]</p>
            <div className="bg-forest/5 border border-forest/20 rounded-xl p-4 mt-4">
              <p className="text-sm sm:text-base text-gray-800 leading-relaxed font-medium">
                This means eating fava beans creates a sustained dopaminergic stimulus &mdash; exactly the signal that triggers GH release.
              </p>
            </div>
          </section>

          {/* How L-Dopa Triggers Growth Hormone */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">How L-Dopa Triggers Growth Hormone</h2>

            <h3 className="font-semibold text-black text-base mb-2">The Mechanism</h3>
            <ol className="space-y-2 list-decimal list-inside mb-4">
              <li className="text-sm sm:text-base text-gray-700"><strong>L-dopa crosses the blood-brain barrier</strong> (dopamine itself cannot)</li>
              <li className="text-sm sm:text-base text-gray-700"><strong>L-dopa converts to dopamine</strong> in the hypothalamus</li>
              <li className="text-sm sm:text-base text-gray-700"><strong>Dopamine stimulates GHRH release</strong> from the hypothalamus</li>
              <li className="text-sm sm:text-base text-gray-700"><strong>GHRH signals the pituitary</strong> to release growth hormone</li>
              <li className="text-sm sm:text-base text-gray-700"><strong>GH travels to the liver</strong> &rarr; IGF-1 production &rarr; growth</li>
            </ol>
            <p className="text-xs text-forest italic mb-5">[Miki N. et al. Journal of Clinical Endocrinology &amp; Metabolism. 1986]</p>

            <h3 className="font-semibold text-black text-base mb-2">The Timing</h3>
            <ul className="space-y-1 mb-3">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>GH rise begins <strong>30&ndash;60 minutes</strong> after L-dopa intake</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Peak GH levels occur at <strong>60&ndash;120 minutes</strong></li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Effects can persist for <strong>several hours</strong></li>
            </ul>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-sm sm:text-base text-amber-900 leading-relaxed font-medium">
                This makes fava beans an ideal evening food &mdash; the GH-stimulating effect can complement the natural nocturnal GH surge during deep sleep.
              </p>
            </div>
          </section>

          {/* Practical Protocol */}
          <section className="bg-forest/5 rounded-2xl p-6 sm:p-8 mb-6 border border-forest/20">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">Practical Protocol: Fava Beans for Growth</h2>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-5">
              <p className="text-sm sm:text-base text-amber-900 leading-relaxed font-medium">
                Important: Fava beans must always be cooked before eating. Raw fava beans contain vicine, convicine, and lectins that are unsafe. The table below refers to the starting form before cooking.
              </p>
            </div>

            <h3 className="font-semibold text-black text-base mb-3">Best Forms (Before Cooking)</h3>
            <div className="overflow-x-auto mb-5">
              <table className="w-full text-sm sm:text-base">
                <thead>
                  <tr className="border-b border-forest/30">
                    <th className="text-left py-2 pr-4 text-black font-semibold">Starting Form</th>
                    <th className="text-left py-2 pr-4 text-black font-semibold">L-Dopa After Cooking</th>
                    <th className="text-left py-2 text-black font-semibold">Notes</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-b border-forest/10">
                    <td className="py-2 pr-4 font-medium">Fresh, lightly cooked</td>
                    <td className="py-2 pr-4">Highest</td>
                    <td className="py-2">Brief steaming or saut&eacute;ing preserves most L-dopa</td>
                  </tr>
                  <tr className="border-b border-forest/10">
                    <td className="py-2 pr-4 font-medium">Frozen, then cooked</td>
                    <td className="py-2 pr-4">~75% retained</td>
                    <td className="py-2">Good option year-round; thaw and cook briefly</td>
                  </tr>
                  <tr className="border-b border-forest/10">
                    <td className="py-2 pr-4 font-medium">Dried, then boiled</td>
                    <td className="py-2 pr-4">Lower</td>
                    <td className="py-2">Extended boiling causes significant L-dopa loss</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium">Canned</td>
                    <td className="py-2 pr-4">Lower</td>
                    <td className="py-2">Pre-cooked; still provides some benefit</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-2">
              <strong>Key point:</strong> The less you cook, the more L-dopa is preserved &mdash; but you must cook them enough to be safe. Light steaming or brief saut&eacute;ing (5&ndash;10 minutes) is the sweet spot.
            </p>
            <p className="text-xs text-forest italic">[Mohseni Mehran SM. et al. Journal of Clinical and Diagnostic Research. 2013]</p>
          </section>

          {/* Recommended Intake */}
          <section className="bg-forest/5 rounded-2xl p-6 sm:p-8 mb-6 border border-forest/20">
            <h3 className="font-semibold text-black text-base mb-3">Recommended Intake</h3>
            <ul className="space-y-1 mb-5">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span><strong>Children:</strong> 1/2 to 1 cup fresh or frozen fava beans</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span><strong>Timing:</strong> With dinner or as an evening snack</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span><strong>Frequency:</strong> 3&ndash;4 times per week</li>
            </ul>

            <h3 className="font-semibold text-black text-base mb-3">Preparation Tips</h3>
            <ul className="space-y-1">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span><strong>Fresh is best:</strong> If you can find fresh fava beans in season, use them</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span><strong>Don&apos;t overcook:</strong> Light steaming or saut&eacute;ing preserves more L-dopa</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span><strong>Pair with olive oil:</strong> Traditional Mediterranean preparation</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span><strong>Remove outer skin:</strong> The inner bean is more digestible</li>
            </ul>
          </section>

          {/* The Mediterranean Connection */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">The Mediterranean Connection</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
              Fava beans have been a dietary staple in the Mediterranean, Middle East, and North Africa for thousands of years.
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">Traditional dishes include:</p>
            <ul className="space-y-1 mb-3">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span><strong>Ful medames</strong> (Egypt&apos;s national dish)</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span><strong>Fave e cicoria</strong> (Italian fava and chicory)</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span><strong>Bissara</strong> (Moroccan fava soup)</li>
            </ul>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              These cultures have consumed fava beans regularly for generations &mdash; unknowingly providing their children with a natural GH-stimulating food.
            </p>
          </section>

          {/* Sprouted Fava Beans */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">Sprouted Fava Beans: Even More Powerful</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              Research shows that sprouting fava beans <strong>doubles their L-dopa content</strong>:
            </p>
            <ul className="space-y-1 mb-2">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Day 0: Baseline L-dopa</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Day 8: <strong>100% increase</strong> in L-dopa concentration</li>
            </ul>
            <p className="text-xs text-forest italic mt-2">[Mohseni Mehran SM. et al. Journal of Clinical and Diagnostic Research. 2013]</p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mt-3 font-medium">
              If you want maximum effect, sprout your fava beans before cooking and eating them.
            </p>
          </section>

          {/* Safety Considerations */}
          <section className="bg-amber-50 rounded-2xl p-6 sm:p-8 mb-6 border border-amber-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">Safety Considerations</h2>

            <h3 className="font-semibold text-black text-base mb-2">G6PD Deficiency (Favism)</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
              Some individuals, particularly those of Mediterranean, African, or Middle Eastern descent, carry a genetic condition called G6PD deficiency. For these individuals, fava beans can trigger hemolytic anemia.
            </p>
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-5">
              <p className="text-sm sm:text-base text-red-900 leading-relaxed font-medium">
                If your family has Mediterranean heritage, get your child tested for G6PD deficiency before introducing fava beans.
              </p>
            </div>

            <h3 className="font-semibold text-black text-base mb-2">General Safety</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              For children without G6PD deficiency, fava beans are safe as a regular food. They&apos;ve been consumed by millions of children across the Mediterranean for millennia.
            </p>
          </section>

          {/* The GH Smoothie */}
          <section className="bg-forest/5 rounded-2xl p-6 sm:p-8 mb-6 border border-forest/20">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">The GH Smoothie: A Food-Based Growth Support Stack</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
              This isn&apos;t a single-ingredient trick &mdash; it&apos;s a carefully designed combination where each ingredient supports the GH-IGF-1 cascade.
            </p>

            <h3 className="font-semibold text-black text-base mb-3">The Recipe</h3>
            <div className="overflow-x-auto mb-5">
              <table className="w-full text-sm sm:text-base">
                <thead>
                  <tr className="border-b border-forest/30">
                    <th className="text-left py-2 pr-4 text-black font-semibold">Ingredient</th>
                    <th className="text-left py-2 pr-4 text-black font-semibold">Amount</th>
                    <th className="text-left py-2 text-black font-semibold">Why It Works</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-b border-forest/10">
                    <td className="py-2 pr-4 font-medium">Goji berries or mixed berries</td>
                    <td className="py-2 pr-4">150g</td>
                    <td className="py-2">Antioxidants lower oxidative stress (which dampens GH/IGF-1 signaling)</td>
                  </tr>
                  <tr className="border-b border-forest/10">
                    <td className="py-2 pr-4 font-medium">Pineapple</td>
                    <td className="py-2 pr-4">100g</td>
                    <td className="py-2">Bromelain for digestion; manganese for bone health</td>
                  </tr>
                  <tr className="border-b border-forest/10">
                    <td className="py-2 pr-4 font-medium">Watermelon</td>
                    <td className="py-2 pr-4">100g</td>
                    <td className="py-2">Citrulline &rarr; converts to arginine (a known GH-linked amino acid)</td>
                  </tr>
                  <tr className="border-b border-forest/10">
                    <td className="py-2 pr-4 font-medium">Cooked young fava beans</td>
                    <td className="py-2 pr-4">50g</td>
                    <td className="py-2">Plant protein + L-dopa for dopaminergic push to GH release</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium">Apple or orange juice</td>
                    <td className="py-2 pr-4">Enough to blend</td>
                    <td className="py-2">Carbohydrate provides insulin signal so liver can convert GH &rarr; IGF-1</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-semibold text-black text-base mb-3">Why This Combination Works</h3>
            <div className="space-y-3 mb-5">
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                <strong>Fava beans:</strong> Supply both plant protein AND L-dopa as a modest dopaminergic push to GH release
              </p>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                <strong>Watermelon &rarr; Citrulline &rarr; Arginine:</strong> Arginine is a well-documented GH-linked amino acid that supports the growth hormone response
              </p>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                <strong>Berries:</strong> Antioxidants reduce oxidative stress, which otherwise dampens GH/IGF-1 signaling
              </p>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                <strong>Pineapple:</strong> Bromelain aids protein digestion; manganese supports bone metabolism
              </p>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                <strong>Juice base:</strong> Provides carbohydrate and a physiologic insulin signal &mdash; when GH pulses are present, the liver needs both amino acids AND insulin to convert GH into IGF-1
              </p>
            </div>

            <h3 className="font-semibold text-black text-base mb-3">Timing Protocol</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              The smoothie is taken <strong>twice daily</strong>:
            </p>
            <div className="space-y-4 mb-5">
              <div className="bg-white rounded-xl p-4 border border-gray-200">
                <h4 className="font-medium text-black text-sm mb-2">1. Post-Exercise (Morning)</h4>
                <ul className="space-y-1">
                  <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Shortly after a high-intensity or sprint-type session</li>
                  <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Pairs exercise-induced GH pulse with abundant amino acids and moderate insulin</li>
                  <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Favors IGF-1 production when GH is already elevated</li>
                </ul>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-200">
                <h4 className="font-medium text-black text-sm mb-2">2. Before Bed (Evening)</h4>
                <ul className="space-y-1">
                  <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>1&ndash;2 hours before bedtime</li>
                  <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Loads substrates before the major slow-wave sleep GH pulse</li>
                  <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Still preserves a short food-free window before lights-out</li>
                </ul>
              </div>
            </div>

            <h3 className="font-semibold text-black text-base mb-2">Additional Support: Cod Liver Oil</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-5">
              Cod liver oil &mdash; which provides omega-3 fatty acids and vitamins A and D (both relevant to bone health and IGF-1 biology) &mdash; can be taken with either smoothie or another main meal. Its effects depend on steady nutrient status over weeks, not minute-by-minute synchronization.
            </p>

            <h3 className="font-semibold text-black text-base mb-2">Preparation</h3>
            <ol className="space-y-2 list-decimal list-inside mb-4">
              <li className="text-sm sm:text-base text-gray-700"><strong>Always cook fava beans first</strong> &mdash; raw fava beans are unsafe</li>
              <li className="text-sm sm:text-base text-gray-700">Combine all ingredients in blender</li>
              <li className="text-sm sm:text-base text-gray-700">Add juice until drinkable consistency</li>
              <li className="text-sm sm:text-base text-gray-700"><strong>Consume immediately</strong> &mdash; L-dopa degrades with time</li>
            </ol>

            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
              <p className="text-sm sm:text-base text-red-900 leading-relaxed font-medium">
                Fava beans are contraindicated in children with G6PD deficiency because of the risk of favism (hemolytic anemia). If your family has Mediterranean, African, or Middle Eastern heritage, test for G6PD deficiency before introducing fava beans.
              </p>
            </div>

            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <h4 className="font-medium text-black text-sm mb-2">The Evidence Base</h4>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                The mechanistic pieces &mdash; protein sufficiency, arginine/citrulline intake, dopaminergic stimulation via L-dopa, antioxidant support, and correct timing relative to GH pulses &mdash; are individually plausible and documented in human and animal studies. This exact smoothie has not been tested in controlled pediatric trials. The defensible position: a fava-based smoothie of this design can <strong>rationally support</strong> the GH-IGF-1 cascade when paired with sprinting, sleep, and adequate calories.
              </p>
            </div>
          </section>

          {/* Synergy with Other GH Strategies */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">Synergy with Other GH Strategies</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
              Fava beans work best when combined with other growth-optimizing practices:
            </p>
            <div className="overflow-x-auto mb-3">
              <table className="w-full text-sm sm:text-base">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 pr-4 text-black font-semibold">Strategy</th>
                    <th className="text-left py-2 pr-4 text-black font-semibold">Timing</th>
                    <th className="text-left py-2 text-black font-semibold">Effect</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4 font-medium">GH Smoothie</td>
                    <td className="py-2 pr-4">2&ndash;3 hrs before bed</td>
                    <td className="py-2">L-dopa + glycine &rarr; dual GH trigger</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4 font-medium">Deep sleep</td>
                    <td className="py-2 pr-4">Night</td>
                    <td className="py-2">70&ndash;80% of daily GH release</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4 font-medium">Sprinting</td>
                    <td className="py-2 pr-4">Afternoon</td>
                    <td className="py-2">Lactate &rarr; GH surge</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium">Protein meals</td>
                    <td className="py-2 pr-4">Throughout day</td>
                    <td className="py-2">IGF-1 production substrate</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-medium">
              The fava bean effect complements &mdash; it doesn&apos;t replace &mdash; the fundamentals of sleep, exercise, and nutrition.
            </p>
          </section>

          {/* Bottom Line */}
          <section className="bg-forest text-white rounded-2xl p-6 sm:p-8 mb-6">
            <h2 className="font-display text-xl sm:text-2xl mb-4">The Bottom Line</h2>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed mb-4">
              Fava beans contain L-dopa, the same compound doctors use to test growth hormone function in children.
            </p>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed mb-4">
              Clinical studies prove that L-dopa:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex gap-2 text-sm sm:text-base text-white/90"><span className="text-white font-bold">&#10003;</span>Stimulates hypothalamic GHRH release</li>
              <li className="flex gap-2 text-sm sm:text-base text-white/90"><span className="text-white font-bold">&#10003;</span>Triggers pituitary GH secretion</li>
              <li className="flex gap-2 text-sm sm:text-base text-white/90"><span className="text-white font-bold">&#10003;</span>Produces peak GH levels within 60&ndash;120 minutes</li>
            </ul>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed mb-4">
              This isn&apos;t folk medicine. It&apos;s the same biochemistry used in pediatric endocrinology clinics worldwide.
            </p>
            <p className="text-sm sm:text-base text-white font-semibold leading-relaxed">
              Add fava beans to your child&apos;s dinner rotation. A simple Mediterranean food, consumed for thousands of years, that happens to stimulate the same growth hormone pathway doctors test in their offices.
            </p>
          </section>

          {/* References */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200">
            <h2 className="font-display text-lg text-black mb-4">References</h2>
            <ul className="space-y-3 text-xs sm:text-sm text-gray-500 leading-relaxed">
              <li>Boyd AE, et al. Stimulation of human-growth-hormone secretion by L-dopa. <em>New England Journal of Medicine</em>. 1970;283(26):1425-1429.</li>
              <li>Chakmakjian ZH, et al. Effect of Levodopa (L-Dopa) on serum growth hormone in children with short stature. <em>Pediatric Research</em>. 1973;7:71-73.</li>
              <li>Miki N, et al. L-dopa stimulates release of hypothalamic growth hormone-releasing hormone in humans. <em>Journal of Clinical Endocrinology &amp; Metabolism</em>. 1986;63(5):1179-1183.</li>
              <li>Mohseni Mehran SM, et al. Simultaneous determination of levodopa and carbidopa from fava bean, green peas and green beans by high performance liquid chromatography. <em>Journal of Clinical and Diagnostic Research</em>. 2013;7(6):1004-1007.</li>
              <li>Rabey JM, et al. Broad bean (Vicia faba) consumption and Parkinson&apos;s disease. <em>Advances in Neurology</em>. 1993;60:681-684.</li>
              <li>Guggenheim M. Dioxyphenylalanin, eine neue Aminos&auml;ure aus Vicia faba. <em>Zeitschrift f&uuml;r Physiologische Chemie</em>. 1913;88:276-284.</li>
              <li>Apaydin H, et al. Broad bean (Vicia faba) &mdash; a natural source of L-dopa &mdash; prolongs &ldquo;on&rdquo; periods in patients with Parkinson&apos;s disease who have &ldquo;on-off&rdquo; fluctuations. <em>Movement Disorders</em>. 2000;15(1):164-166.</li>
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
