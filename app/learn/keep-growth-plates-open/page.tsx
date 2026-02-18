'use client';

import Link from 'next/link';
import Nav from '@/components/Nav';

export default function GrowthPlatesOpenArticle() {
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
            <span className="text-xs text-gray-400">7 min read</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl text-black mb-3">How to Keep Growth Plates Open a Little Longer</h1>
          <p className="text-base sm:text-lg text-gray-600 font-mono">The science of extending your child&apos;s growth window through strategic nutrition.</p>
        </div>

        {/* Article content */}
        <article className="prose prose-lg max-w-none">

          {/* The Pre-Puberty Window */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">The Pre-Puberty Window</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
              Around age 10, many children are entering a critical phase: growth plates are still wide open, but the sex-hormone system is waking up and starting to set the clock on fusion.
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              This is when strategic nutrition can make a real difference.
            </p>
          </section>

          {/* How Growth Plates Close */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">How Growth Plates Close</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
              Here&apos;s the biology:
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-2">
              <strong>In boys:</strong> Rising testosterone is locally converted to estrogen inside bone by the enzyme aromatase.
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
              <strong>In girls:</strong> Ovarian estrogen rises directly.
            </p>
            <h3 className="font-semibold text-black text-base mb-2">The dual role of estrogen:</h3>
            <ul className="space-y-2">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>At low levels, estrogen synergizes with growth hormone and IGF-1 to drive the pubertal growth spurt</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500 font-bold">&#8226;</span>But as exposure accumulates, estrogen pushes growth-plate cartilage cells toward senescence and fusion, locking in final height</li>
            </ul>
            <p className="text-xs text-forest italic mt-3">[Nilsson O. et al. Endocrine Reviews. 2005]</p>
          </section>

          {/* The Later Puberty Advantage */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">The Later Puberty Advantage</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              In epidemiologic data, children who hit puberty later tend to have:
            </p>
            <ul className="space-y-1 mb-4">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>A longer window of linear growth</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Slightly greater adult height for their genetic baseline</li>
            </ul>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              These children often have adequate calories but more plant-dominant, nutrient-dense diets.
            </p>
            <p className="text-xs text-forest italic mt-3">[G&uuml;nther AL. et al. American Journal of Clinical Nutrition. 2010]</p>
          </section>

          {/* The Strategy */}
          <section className="bg-amber-50 rounded-2xl p-6 sm:p-8 mb-6 border border-amber-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">The Strategy: Reduce Estrogenic &ldquo;Noise&rdquo;</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              Once a child reaches roughly 9&ndash;11 years old, it becomes especially important to build a dietary pattern that:
            </p>
            <ol className="space-y-2 list-decimal list-inside mb-4">
              <li className="text-sm sm:text-base text-gray-700"><strong>Provides protein and micronutrients</strong> for IGF-1 and bone</li>
              <li className="text-sm sm:text-base text-gray-700"><strong>Gently reduces unnecessary estrogenic noise</strong> and peripheral aromatase activity</li>
            </ol>
            <p className="text-sm sm:text-base text-amber-900 leading-relaxed font-medium">
              This isn&apos;t about suppressing puberty &mdash; it&apos;s about avoiding excess, premature estrogenic drive at the growth plate.
            </p>
          </section>

          {/* Foods That Help */}
          <div className="mb-3">
            <h2 className="font-display text-2xl text-black">Foods That Help: The Science</h2>
          </div>

          {/* Mushrooms */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-4 border border-gray-200">
            <h3 className="font-semibold text-lg text-black mb-3">Mushrooms (Aromatase Inhibitors)</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              White button mushrooms (Agaricus bisporus) contain heat-stable phytochemicals that inhibit aromatase &mdash; the enzyme that converts testosterone to estrogen.
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              This has been demonstrated in:
            </p>
            <ul className="space-y-1 mb-4">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Human placental microsomes</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Aromatase-overexpressing breast-cancer cells</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Clinical pilots in postmenopausal breast-cancer survivors as a natural aromatase-suppression strategy</li>
            </ul>
            <div className="bg-forest/5 rounded-xl p-3 border border-forest/20">
              <p className="text-sm sm:text-base text-gray-700 font-medium">Target: Mushrooms several times per week (100&ndash;200g cooked white buttons or similar)</p>
            </div>
            <p className="text-xs text-forest italic mt-3">[Chen S. et al. Cancer Research. 2006]</p>
          </section>

          {/* Cruciferous Vegetables */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-4 border border-gray-200">
            <h3 className="font-semibold text-lg text-black mb-3">Cruciferous Vegetables (Estrogen Metabolism Modulators)</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
              Cruciferous vegetables &mdash; broccoli, Brussels sprouts, kale, cabbage, cauliflower &mdash; and their sprouts modulate how estrogen is <em>handled</em> rather than just how much is produced.
            </p>
            <h4 className="font-semibold text-black text-sm mb-2">The mechanism:</h4>
            <ul className="space-y-2 mb-4">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Glucosinolates are converted to indole-3-carbinol (I3C) and DIM</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>These compounds bind estrogen receptors and shift estrogen metabolite patterns toward less potent forms</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Sulforaphane from broccoli reduces estrogen receptor levels and activates Nrf2-driven detox enzymes that support clearance of hormones, including estrogens</li>
            </ul>
            <div className="bg-forest/5 rounded-xl p-3 border border-forest/20">
              <p className="text-sm sm:text-base text-gray-700 font-medium">Target: Daily crucifers (1&ndash;2 cups cooked broccoli/Brussels sprouts/cabbage or a small handful of broccoli sprouts)</p>
            </div>
            <p className="text-xs text-forest italic mt-3">[Bradlow HL. et al. Journal of the National Cancer Institute. 1991]</p>
          </section>

          {/* Grape Polyphenols */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-4 border border-gray-200">
            <h3 className="font-semibold text-lg text-black mb-3">Grape Polyphenols (Aromatase Inhibitors)</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              Grape seed and grape-skin polyphenols:
            </p>
            <ul className="space-y-1 mb-4">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Inhibit aromatase activity</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Down-regulate aromatase promoter mRNAs</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Reduce estrogen-dependent cell proliferation</li>
            </ul>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
              Other flavonoids with similar effects include resveratrol, citrus flavanones, and quercetin.
            </p>
            <div className="bg-forest/5 rounded-xl p-3 border border-forest/20">
              <p className="text-sm sm:text-base text-gray-700 font-medium">Target: Regular dark grapes and other deeply colored fruits</p>
            </div>
            <p className="text-xs text-forest italic mt-3">[Wang Y. et al. Phytomedicine. 2006]</p>
          </section>

          {/* Broad Flavonoid Coverage */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h3 className="font-semibold text-lg text-black mb-3">Broad Flavonoid Coverage</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              For comprehensive phytochemical support, include:
            </p>
            <ul className="space-y-1 mb-4">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Onions</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Apples with skin</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Citrus</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Parsley</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Celery</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Berries</li>
            </ul>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              These provide broad flavonoid coverage that supports healthy estrogen metabolism.
            </p>
            <p className="text-xs text-forest italic mt-3">[Moon YJ. et al. Toxicology in Vitro. 2006]</p>
          </section>

          {/* The Practical Protocol */}
          <section className="bg-forest/5 rounded-2xl p-6 sm:p-8 mb-6 border border-forest/20">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">The Practical Protocol (Ages 10+)</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-5">
              When the hypothalamic&ndash;pituitary&ndash;gonadal axis is gearing up, intentionally <strong>increase</strong> the proportion of vegetables, crucifers, and mushrooms in your child&apos;s diet &mdash; on top of adequate total protein and calories.
            </p>

            <h3 className="font-semibold text-black text-base mb-2">Daily:</h3>
            <ul className="space-y-1 mb-4">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>1&ndash;2 cups cooked cruciferous vegetables (broccoli, Brussels sprouts, cabbage)</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>OR a small handful of broccoli sprouts</li>
            </ul>

            <h3 className="font-semibold text-black text-base mb-2">Several times per week:</h3>
            <ul className="space-y-1 mb-4">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>100&ndash;200g cooked mushrooms (white button or similar)</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Dark grapes or berries</li>
            </ul>

            <h3 className="font-semibold text-black text-base mb-2">Regular inclusion:</h3>
            <ul className="space-y-1">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Onions, apples with skin, citrus, parsley, celery</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Broad variety of colorful vegetables and fruits</li>
            </ul>
          </section>

          {/* What This Does */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">What This Does</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              This pattern should:
            </p>
            <ul className="space-y-2">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Support IGF-1 and bone mineralization</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Nudge aromatase and estrogen-receptor signaling in a favorable direction</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Avoid excessive, premature estrogenic drive at the growth plate</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Potentially give a little more time before fusion &mdash; without suppressing puberty outright</li>
            </ul>
          </section>

          {/* The Evidence Base */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">The Evidence Base</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              We do not yet have longitudinal human trials showing that this specific food pattern delays epiphyseal fusion. But:
            </p>
            <ul className="space-y-2">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>It is directly aligned with cell and animal data on aromatase and estrogen handling</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>It matches observational signals that more plant-dense, nutrient-rich diets correlate with later puberty and slightly higher adult height at the population level</li>
            </ul>
            <p className="text-xs text-forest italic mt-3">[G&uuml;nther AL. et al. American Journal of Clinical Nutrition. 2010]</p>
          </section>

          {/* Bottom Line */}
          <section className="bg-forest text-white rounded-2xl p-6 sm:p-8 mb-6">
            <h2 className="font-display text-xl sm:text-2xl mb-4">The Bottom Line</h2>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed mb-4">
              You can&apos;t stop puberty, and you shouldn&apos;t try. But you can avoid <em>accelerating</em> it unnecessarily.
            </p>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed mb-4">
              Strategic nutrition in the pre-pubertal years &mdash; emphasizing crucifers, mushrooms, and polyphenol-rich foods &mdash; may help extend your child&apos;s growth window by supporting healthy estrogen metabolism and avoiding premature growth-plate fusion.
            </p>
            <p className="text-sm sm:text-base text-white font-semibold leading-relaxed">
              Every extra month of open growth plates is another month of potential height gain.
            </p>
          </section>

          {/* References */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200">
            <h2 className="font-display text-lg text-black mb-4">References</h2>
            <ul className="space-y-3 text-xs sm:text-sm text-gray-500 leading-relaxed">
              <li>Nilsson O, et al. Endocrine regulation of the growth plate. <em>Endocrine Reviews</em>. 2005;26(1):114-146.</li>
              <li>G&uuml;nther AL, et al. Dietary protein intake and later height in children. <em>American Journal of Clinical Nutrition</em>. 2010;91(6):1684-1692.</li>
              <li>Chen S, et al. Anti-aromatase activity of phytochemicals in white button mushrooms (Agaricus bisporus). <em>Cancer Research</em>. 2006;66(24):12026-12034.</li>
              <li>Bradlow HL, et al. Indole-3-carbinol: a novel approach to breast cancer prevention. <em>Journal of the National Cancer Institute</em>. 1991;83(21):1571-1579.</li>
              <li>Wang Y, et al. The red wine polyphenol resveratrol displays bilevel inhibition on aromatase in breast cancer cells. <em>Phytomedicine</em>. 2006;13(4):270-277.</li>
              <li>Moon YJ, et al. Dietary flavonoids: effects on xenobiotic and carcinogen metabolism. <em>Toxicology in Vitro</em>. 2006;20(2):187-210.</li>
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
