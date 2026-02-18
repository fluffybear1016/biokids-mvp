'use client';

import Link from 'next/link';
import Nav from '@/components/Nav';

export default function HowYourChildGrowsArticle() {
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
            <span className="text-xs text-gray-400">10 min read</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl text-black mb-3">How Your Child Actually Grows</h1>
          <p className="text-base sm:text-lg text-gray-600 font-mono">The complete guide to the biological cascade that determines your child&apos;s growth &mdash; and exactly how to optimize it.</p>
        </div>

        {/* Article content */}
        <article className="prose prose-lg max-w-none">

          {/* The Big Picture */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">The Big Picture</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
              A child grows when growth plates in the bones are stimulated to produce new cartilage that later hardens into bone.
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              This only happens through one specific biological chain. Understanding this chain is the key to understanding everything else about growth optimization.
            </p>
          </section>

          {/* The Growth Cascade */}
          <div className="mb-3">
            <h2 className="font-display text-2xl text-black">The Growth Cascade: 5 Steps</h2>
          </div>

          {/* Step 1 */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-4 border border-gray-200">
            <h3 className="font-semibold text-lg text-black mb-3">Step 1: The Hypothalamus (The Brain&apos;s &ldquo;Growth Thermostat&rdquo;)</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              The hypothalamus constantly monitors:
            </p>
            <ul className="space-y-1 mb-4">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Sleep quality</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Nutrition status</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Energy availability</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Stress levels</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Puberty status</li>
            </ul>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              Based on what it senses, it releases two opposing signals:
            </p>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm sm:text-base">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 pr-4 text-black font-semibold">Hormone</th>
                    <th className="text-left py-2 text-black font-semibold">Function</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4 font-medium">GHRH</td>
                    <td className="py-2">Tells pituitary: &ldquo;Release growth hormone&rdquo;</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium">Somatostatin</td>
                    <td className="py-2">Tells pituitary: &ldquo;Stop growth hormone&rdquo;</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-1">
              <strong>What increases GHRH (good):</strong> Deep sleep, exercise, puberty
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              <strong>What increases somatostatin (bad):</strong> Stress, illness, under-eating
            </p>
            <p className="text-xs text-forest italic mt-3">[Giustina A. et al. Endocrine Reviews. 1998]</p>
          </section>

          {/* Step 2 */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-4 border border-gray-200">
            <h3 className="font-semibold text-lg text-black mb-3">Step 2: The Pituitary Releases Growth Hormone (GH)</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              GH is released in pulses, mainly:
            </p>
            <ul className="space-y-1 mb-4">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>During deep sleep (70-80% of daily output)</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>During puberty</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>After high-intensity exercise</li>
            </ul>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-sm sm:text-base text-amber-900 leading-relaxed font-medium">
                Critical insight: GH does NOT make bones longer directly. Its job is to tell the liver: &ldquo;Make IGF-1.&rdquo;
              </p>
            </div>
            <p className="text-xs text-forest italic mt-3">[Van Cauter E. et al. JAMA. 2000]</p>
          </section>

          {/* Step 3 */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-4 border border-gray-200">
            <h3 className="font-semibold text-lg text-black mb-3">Step 3: The Liver Produces IGF-1</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
              When GH reaches the liver, the liver releases IGF-1 into the bloodstream.
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 font-medium">
              IGF-1 is the real growth signal for bones. It:
            </p>
            <ul className="space-y-1 mb-4">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Enters growth plates</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Makes cartilage cells divide</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Makes bones elongate</li>
            </ul>
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <p className="text-sm sm:text-base text-red-900 leading-relaxed font-medium">
                The critical truth: No IGF-1 = no growth. Even if GH is high.
              </p>
            </div>
            <p className="text-xs text-forest italic mt-3">[Yakar S. et al. Journal of Clinical Investigation. 2002]</p>
          </section>

          {/* Step 4 */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-4 border border-gray-200">
            <h3 className="font-semibold text-lg text-black mb-3">Step 4: IGF-1 Acts on the Growth Plates</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              In the growth plates:
            </p>
            <ol className="space-y-1 list-decimal list-inside mb-3">
              <li className="text-sm sm:text-base text-gray-700">Cartilage cells multiply</li>
              <li className="text-sm sm:text-base text-gray-700">Plates expand</li>
              <li className="text-sm sm:text-base text-gray-700">Bone replaces cartilage</li>
              <li className="text-sm sm:text-base text-gray-700">Bone gets longer</li>
            </ol>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-medium">
              This is how growth happens.
            </p>
            <p className="text-xs text-forest italic mt-3">[Nilsson O. et al. Endocrine Reviews. 2005]</p>
          </section>

          {/* Step 5 */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h3 className="font-semibold text-lg text-black mb-3">Step 5: Estrogen Closes the Growth Plates</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              At puberty:
            </p>
            <ul className="space-y-1 mb-3">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Testosterone (boys) and estrogen (girls) rise</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Testosterone converts to estrogen in bone</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Estrogen gradually fuses growth plates</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500 font-bold">&#8226;</span>Once fused: <strong>no more growth possible &mdash; ever</strong></li>
            </ul>
            <p className="text-xs text-forest italic">[Nilsson O. et al. Endocrine Reviews. 2005]</p>
          </section>

          {/* The Truth in One Line */}
          <section className="bg-forest text-white rounded-2xl p-6 sm:p-8 mb-6">
            <h2 className="font-display text-xl sm:text-2xl mb-4">The Truth in One Line</h2>
            <p className="text-base sm:text-lg text-white font-medium leading-relaxed">
              A child grows when the brain senses safety + food + sleep &rarr; releases GH &rarr; liver makes IGF-1 &rarr; growth plates expand.
            </p>
          </section>

          {/* The Liver: The Bottleneck */}
          <section className="bg-amber-50 rounded-2xl p-6 sm:p-8 mb-6 border border-amber-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">The Liver: The Bottleneck of Growth</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
              This is where most parents should focus &mdash; because <strong>the liver is the bottleneck of the whole growth system.</strong>
            </p>
            <p className="text-sm sm:text-base text-amber-900 leading-relaxed font-medium">
              You can have plenty of GH, but if the liver doesn&apos;t respond: no IGF-1 &rarr; no growth.
            </p>
          </section>

          {/* What Makes the Liver Produce IGF-1? */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">What Makes the Liver Produce IGF-1?</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
              The liver increases IGF-1 when <strong>all four</strong> of these are present:
            </p>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm sm:text-base">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 pr-4 text-black font-semibold">Requirement</th>
                    <th className="text-left py-2 text-black font-semibold">Why It Matters</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4 font-medium">Growth hormone</td>
                    <td className="py-2">The signal to make IGF-1</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4 font-medium">Enough calories</td>
                    <td className="py-2">The liver refuses to grow the body if energy is scarce</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4 font-medium">Enough protein</td>
                    <td className="py-2">IGF-1 is a 70-amino-acid protein &mdash; needs raw materials</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium">Insulin (present, not spiked)</td>
                    <td className="py-2">Tells the liver food is available</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-2 font-medium">
              If any one is missing &rarr; IGF-1 drops.
            </p>
            <p className="text-xs text-forest italic mb-4">[Thissen JP. et al. Endocrine Reviews. 1994]</p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              This is why:
            </p>
            <ul className="space-y-1">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span>Starving kids have low IGF-1</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span>Overtraining kids stop growing</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span>Kids with celiac disease stop growing</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span><strong>Even if GH is normal</strong></li>
            </ul>
          </section>

          {/* The Liver's Decision Process */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">The Liver&apos;s Decision Process</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
              Your child&apos;s liver constantly asks:
            </p>
            <div className="bg-forest/5 border border-forest/20 rounded-xl p-4 mb-4">
              <p className="text-sm sm:text-base text-gray-700 font-medium italic">
                &ldquo;Is this a safe time to build a bigger body?&rdquo;
              </p>
            </div>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              It evaluates:
            </p>
            <ul className="space-y-1 mb-4">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Blood glucose</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Insulin levels</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Amino acid availability</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Thyroid hormone</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Inflammation markers</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>GH signal strength</li>
            </ul>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-medium">
              Only if all are favorable &rarr; it releases IGF-1.
            </p>
          </section>

          {/* How to Optimize IGF-1 */}
          <div className="mb-3">
            <h2 className="font-display text-2xl text-black">How to Optimize IGF-1: The 6 Proven Levers</h2>
          </div>

          {/* Lever 1 */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-4 border border-gray-200">
            <h3 className="font-semibold text-lg text-black mb-3">1. Eat Enough Calories</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              This is #1. Growing kids need adequate energy &mdash; ideally a slight surplus.
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 font-medium">
              Under-eating = low IGF-1. Even in athletic kids.
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-2">Signs of insufficient calories:</p>
            <ul className="space-y-1">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span>Always hungry</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span>Very lean/skinny</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span>Late puberty</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span>Slow growth velocity</li>
            </ul>
            <p className="text-xs text-forest italic mt-3">[Thissen JP. et al. Endocrine Reviews. 1994]</p>
          </section>

          {/* Lever 2 */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-4 border border-gray-200">
            <h3 className="font-semibold text-lg text-black mb-3">2. Eat Enough Protein</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              IGF-1 is a protein. The liver needs amino acids to build it.
            </p>
            <h4 className="font-semibold text-black text-sm mb-2">Targets:</h4>
            <ul className="space-y-1 mb-3">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Children: 1.0&ndash;1.2g protein per kg body weight daily</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Teens in puberty: 1.2&ndash;1.5g per kg (or more)</li>
            </ul>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              <strong>Best sources:</strong> Milk, meat, eggs, fish, yogurt, beans
            </p>
            <p className="text-xs text-forest italic mt-3">[Hoppe C. et al. American Journal of Clinical Nutrition. 2004]</p>
          </section>

          {/* Lever 3 */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-4 border border-gray-200">
            <h3 className="font-semibold text-lg text-black mb-3">3. Maintain Steady Insulin (Not Spiked)</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              The liver requires insulin to make IGF-1. This is why:
            </p>
            <ul className="space-y-1 mb-4">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Very low-carb diets can impair growth</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Prolonged fasting lowers IGF-1</li>
            </ul>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 font-medium">
              But this does NOT mean sugar binges.
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              What the liver needs:
            </p>
            <ul className="space-y-1 mb-3">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Moderate, meal-time insulin</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>The signal: &ldquo;We have food. It is safe to grow.&rdquo;</li>
            </ul>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-medium">
              The solution: Regular balanced meals with protein, carbs, and fat.
            </p>
            <p className="text-xs text-forest italic mt-3">[Clemmons DR. et al. Journal of Clinical Endocrinology &amp; Metabolism. 1981]</p>
          </section>

          {/* Lever 4 */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-4 border border-gray-200">
            <h3 className="font-semibold text-lg text-black mb-3">4. Maximize Deep Sleep</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 font-medium">
              No deep sleep &rarr; no GH &rarr; no IGF-1.
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              Kids who sleep less have lower IGF-1, grow slower, and miss critical GH pulses.
            </p>
            <h4 className="font-semibold text-black text-sm mb-2">Sleep targets (upper end of recommendations):</h4>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm sm:text-base">
                <tbody className="text-gray-700">
                  <tr className="border-b border-gray-100">
                    <td className="py-1.5 pr-4 font-medium">0&ndash;1 years</td>
                    <td className="py-1.5">16 hours (including naps)</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-1.5 pr-4 font-medium">1&ndash;2 years</td>
                    <td className="py-1.5">14 hours (including naps)</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-1.5 pr-4 font-medium">3&ndash;5 years</td>
                    <td className="py-1.5">13 hours (including naps)</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-1.5 pr-4 font-medium">6&ndash;12 years</td>
                    <td className="py-1.5">12 hours</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 pr-4 font-medium">13&ndash;18 years</td>
                    <td className="py-1.5">10 hours</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-medium">
              Consistent bedtime is critical &mdash; same time every night, including weekends.
            </p>
            <p className="text-xs text-forest italic mt-3">[Van Cauter E. et al. JAMA. 2000]</p>
          </section>

          {/* Lever 5 */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-4 border border-gray-200">
            <h3 className="font-semibold text-lg text-black mb-3">5. Keep Inflammation Low</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 font-medium">
              Inflammation blocks IGF-1 production.
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-2">Common causes:</p>
            <ul className="space-y-1 mb-4">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span>Chronic illness</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span>Gut problems (celiac, IBS, food sensitivities)</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span>Obesity</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span>Overtraining</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span>Sleep deprivation</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span>Ultra-processed diet</li>
            </ul>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              This is why doctors test for celiac, thyroid dysfunction, IBD, and anemia in children with unexplained slow growth.
            </p>
            <p className="text-xs text-forest italic mt-3">[Street ME. et al. Cytokine &amp; Growth Factor Reviews. 2011]</p>
          </section>

          {/* Lever 6 */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h3 className="font-semibold text-lg text-black mb-3">6. Ensure Normal Thyroid Function</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              The liver needs thyroid hormone to respond to GH properly.
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 font-medium">
              Low thyroid = low IGF-1, even if GH is high.
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              If your child is growing slowly, thyroid testing is essential.
            </p>
            <p className="text-xs text-forest italic mt-3">[Robson H. et al. Journal of Endocrinology. 2002]</p>
          </section>

          {/* The Insulin Sweet Spot */}
          <section className="bg-forest/5 rounded-2xl p-6 sm:p-8 mb-6 border border-forest/20">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">The Insulin Sweet Spot</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
              This deserves extra attention because it&apos;s where parents often go wrong.
            </p>
            <h3 className="font-semibold text-black text-base mb-2">What the liver needs:</h3>
            <ul className="space-y-1 mb-4">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Steady, meal-time insulin</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>The message: &ldquo;We have food. It is safe to grow.&rdquo;</li>
            </ul>
            <h3 className="font-semibold text-black text-base mb-2">What hurts growth:</h3>
            <ul className="space-y-1 mb-4">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span>Sugar spikes followed by crashes (stress mode)</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span>Very low carb diets (starvation signal)</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span>Skipping meals (fasting signal)</li>
            </ul>
            <h3 className="font-semibold text-black text-base mb-2">The practical approach:</h3>
            <ul className="space-y-1">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Slow, steady insulin = growth mode</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Regular balanced meals with protein + complex carbs</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Avoid sugar-heavy foods, especially on empty stomach</li>
            </ul>
          </section>

          {/* What Controls the Whole System? */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">What Controls the Whole System?</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              The growth cascade only works when the body believes:
            </p>
            <div className="bg-forest/5 border border-forest/20 rounded-xl p-4 mb-4">
              <p className="text-sm sm:text-base text-gray-700 font-medium italic">
                &ldquo;We have enough energy to grow.&rdquo;
              </p>
            </div>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-2">That means:</p>
            <ul className="space-y-1 mb-4">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Enough calories</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Enough protein</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Enough minerals</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Enough sleep</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Low stress</li>
            </ul>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              <strong>If food is low or stress is high:</strong>
            </p>
            <ul className="space-y-1 mb-4">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span>Hypothalamus blocks GH</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span>Liver reduces IGF-1</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span>Growth slows or stops</li>
            </ul>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              This is survival biology. The body won&apos;t invest in getting bigger if it senses scarcity or danger.
            </p>
          </section>

          {/* The Action Summary */}
          <section className="bg-forest/5 rounded-2xl p-6 sm:p-8 mb-6 border border-forest/20">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">The Action Summary</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm sm:text-base">
                <thead>
                  <tr className="border-b border-forest/20">
                    <th className="text-left py-2 pr-4 text-black font-semibold">Lever</th>
                    <th className="text-left py-2 text-black font-semibold">Target</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-b border-gray-200">
                    <td className="py-2 pr-4 font-medium">Calories</td>
                    <td className="py-2">Adequate to slightly surplus</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 pr-4 font-medium">Protein</td>
                    <td className="py-2">1.0&ndash;1.5g per kg daily</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 pr-4 font-medium">Sleep</td>
                    <td className="py-2">Upper end of age range, consistent bedtime</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 pr-4 font-medium">Meals</td>
                    <td className="py-2">Regular, balanced, not skipped</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 pr-4 font-medium">Inflammation</td>
                    <td className="py-2">Address gut issues, avoid ultra-processed foods</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium">Thyroid</td>
                    <td className="py-2">Test if growth is slow</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Bottom Line */}
          <section className="bg-forest text-white rounded-2xl p-6 sm:p-8 mb-6">
            <h2 className="font-display text-xl sm:text-2xl mb-4">The Bottom Line</h2>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed mb-4">
              Growth isn&apos;t random. It&apos;s the output of a biological system you can influence.
            </p>
            <p className="text-sm sm:text-base text-white font-semibold leading-relaxed mb-4">
              The chain: Brain &rarr; GH &rarr; Liver &rarr; IGF-1 &rarr; Growth Plates &rarr; Growth
            </p>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed mb-4">
              Your job: Remove the blockers and provide the inputs. Sleep, protein, calories, low inflammation, steady nutrition.
            </p>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed">
              Do this consistently, and you give your child&apos;s growth system everything it needs to reach their genetic potential.
            </p>
          </section>

          {/* References */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200">
            <h2 className="font-display text-lg text-black mb-4">References</h2>
            <ul className="space-y-3 text-xs sm:text-sm text-gray-500 leading-relaxed">
              <li>Giustina A, et al. Pathophysiology of the neuroregulation of growth hormone secretion in experimental animals and the human. <em>Endocrine Reviews</em>. 1998;19(6):717-797.</li>
              <li>Van Cauter E, et al. Age-related changes in slow wave sleep and REM sleep and relationship with growth hormone and cortisol levels in healthy men. <em>JAMA</em>. 2000;284(7):861-868.</li>
              <li>Yakar S, et al. Normal growth and development in the absence of hepatic insulin-like growth factor I. <em>Journal of Clinical Investigation</em>. 2002;109(9):1279-1288.</li>
              <li>Nilsson O, et al. Endocrine regulation of the growth plate. <em>Endocrine Reviews</em>. 2005;26(1):114-146.</li>
              <li>Thissen JP, et al. Nutritional regulation of the insulin-like growth factors. <em>Endocrine Reviews</em>. 1994;15(1):80-101.</li>
              <li>Hoppe C, et al. High intakes of milk, but not meat, increase s-insulin and insulin resistance in 8-year-old boys. <em>American Journal of Clinical Nutrition</em>. 2004;80(2):447-452.</li>
              <li>Clemmons DR, et al. Factors controlling blood concentration of somatomedin C. <em>Journal of Clinical Endocrinology &amp; Metabolism</em>. 1981;13(1):113-143.</li>
              <li>Street ME, et al. Inflammation is a modulator of the insulin-like growth factor (IGF)/IGF-binding protein system inducing reduced bioactivity of IGFs in cystic fibrosis. <em>Cytokine &amp; Growth Factor Reviews</em>. 2011;22(1):59-65.</li>
              <li>Robson H, et al. Interactions between GH, IGF-I, glucocorticoids, and thyroid hormones during skeletal growth. <em>Journal of Endocrinology</em>. 2002;174(2):295-309.</li>
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
