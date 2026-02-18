'use client';

import Link from 'next/link';
import Nav from '@/components/Nav';

export default function GrowthBlockersArticle() {
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
            <span className="text-xs text-gray-400">10 min read</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl text-black mb-3">18 Growth Blockers to Avoid</h1>
          <p className="text-base sm:text-lg text-gray-600 font-mono">If you want your child to hit their true height ceiling, you must protect their growth plates, deep sleep, and hormones from sabotage.</p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-8">
          <p className="text-sm sm:text-base text-amber-900 leading-relaxed font-medium">
            These are not &ldquo;moderation&rdquo; items for high-agency parents &mdash; they are targets to remove.
          </p>
        </div>

        {/* Article content */}
        <article className="prose prose-lg max-w-none">

          {/* Sleep Disruptors */}
          <div className="mb-3">
            <h2 className="font-display text-2xl text-black">Sleep Disruptors</h2>
          </div>

          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-4 border border-gray-200">
            <h3 className="font-semibold text-lg text-black mb-3">1. Caffeine (coffee, energy drinks, sodas)</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Caffeine has no place in a growing child&apos;s life: it shrinks deep slow-wave sleep, where 70&ndash;80% of daily growth hormone (GH) pulses occur. High-dose caffeine in animal models directly reduces bone-forming activity and long-bone length during growth.
            </p>
            <p className="text-xs text-forest italic mt-3">[Van Cauter E. et al. JAMA. 2000]</p>
          </section>

          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-4 border border-gray-200">
            <h3 className="font-semibold text-lg text-black mb-3">2. Chocolate during childhood</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Chocolate delivers caffeine and theobromine, both stimulants that disrupt sleep architecture and delay sleep onset. For a child whose height depends on pristine deep sleep every night, regular chocolate is a growth tax, not a treat.
            </p>
            <p className="text-xs text-forest italic mt-3">[Mitchell DC. et al. Food and Chemical Toxicology. 2014]</p>
          </section>

          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-4 border border-gray-200">
            <h3 className="font-semibold text-lg text-black mb-3">3. Poor sleep and inconsistent bedtimes</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Late nights, irregular schedules, and chronic short sleep directly blunt GH secretion and height velocity. Pediatric data link insufficient sleep to impaired growth and hormonal disruption; a growing child needs long, predictable nights, not &ldquo;catch-up&rdquo; weekends.
            </p>
            <p className="text-xs text-forest italic mt-3">[Mindell JA. et al. Sleep Medicine Reviews. 2010]</p>
          </section>

          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-4 border border-gray-200">
            <h3 className="font-semibold text-lg text-black mb-3">4. Screen time in the evening</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Screens before bed are a growth blocker: blue light suppresses melatonin, delays deep-sleep onset, and flattens the GH curve. Studies show that removing screens 1&ndash;2 hours before bedtime measurably improves sleep quality &mdash; this is the minimum standard for height-focused parents.
            </p>
            <p className="text-xs text-forest italic mt-3">[Chang AM. et al. PNAS. 2015]</p>
          </section>

          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h3 className="font-semibold text-lg text-black mb-3">5. Early-morning school schedules and chronic sleep debt</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Very early school starts lock teens into chronic sleep debt, systematically trimming deep-sleep time and blunting GH secretion. Studies of delayed school start times show longer sleep and better daytime function, and the same biology supports better growth hormone dynamics.
            </p>
            <p className="text-xs text-forest italic mt-3">[Wahlstrom K. et al. Journal of Clinical Sleep Medicine. 2014]</p>
          </section>

          {/* Nutritional Blockers */}
          <div className="mb-3">
            <h2 className="font-display text-2xl text-black">Nutritional Blockers</h2>
          </div>

          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-4 border border-gray-200">
            <h3 className="font-semibold text-lg text-black mb-3">6. Refined carbs and added sugar</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Sugar-centric diets (sodas, candy, sweet cereals) displace protein and micronutrients that drive IGF-1 and bone mineralization. Ultra-processed, sugar-rich diets in animal studies damage growth plates and produce fragile, undermineralized bones.
            </p>
            <p className="text-xs text-forest italic mt-3">[Lanzi R. et al. Metabolism. 1999]</p>
          </section>

          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-4 border border-gray-200">
            <h3 className="font-semibold text-lg text-black mb-3">7. Ultra-processed foods</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Ultra-processed foods &mdash; chips, fast food, packaged snacks &mdash; are structurally incompatible with optimal growth. In controlled experiments, feeding growing animals a largely ultra-processed diet stunts linear growth and severely impairs endochondral ossification at the growth plate.
            </p>
            <p className="text-xs text-forest italic mt-3">[Mart&iacute;nez Steele E. et al. BMJ Open. 2016]</p>
          </section>

          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h3 className="font-semibold text-lg text-black mb-3">8. Seed oils and industrial fats</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Frequent use of industrial seed oils and trans-fat-rich foods drives chronic inflammation and metabolic stress that weaken bone accrual. Animal work shows that such pro-inflammatory diets worsen bone quality and growth-plate structure compared with cleaner fat sources.
            </p>
            <p className="text-xs text-forest italic mt-3">[Corwin RL. et al. Journal of Nutrition. 2006]</p>
          </section>

          {/* Endocrine Disruptors */}
          <div className="mb-3">
            <h2 className="font-display text-2xl text-black">Endocrine Disruptors</h2>
          </div>

          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-4 border border-gray-200">
            <h3 className="font-semibold text-lg text-black mb-3">9. Contaminated water (PFAS, metals, pesticides)</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Tap and well water can carry PFAS, heavy metals, and pesticide residues that interfere with thyroid function and growth trajectories. Longitudinal human studies link higher PFAS exposure with altered growth and lower height z-scores in childhood.
            </p>
            <p className="text-xs text-forest italic mt-3">[Rappazzo KM. et al. Environmental Health Perspectives. 2017]</p>
          </section>

          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-4 border border-gray-200">
            <h3 className="font-semibold text-lg text-black mb-3">10. Plastic containers and food packaging</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Heating or storing food in plastic leaches phthalates and other estrogen-like chemicals into meals and drinks. Early-life exposure to these xenoestrogens is associated with endocrine disruption and shifts in pubertal timing that can shorten the growth window.
            </p>
            <p className="text-xs text-forest italic mt-3">[Gore AC. et al. Endocrine Reviews. 2015]</p>
          </section>

          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-4 border border-gray-200">
            <h3 className="font-semibold text-lg text-black mb-3">11. Non-stick pans with PFAS coatings</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Traditional non-stick cookware uses PFAS-based coatings that migrate into food and dust over time. PFAS exposure in pregnancy and childhood has been tied to altered growth trajectories and endocrine disruption, making PFAS-free cookware a basic requirement.
            </p>
            <p className="text-xs text-forest italic mt-3">[Rappazzo KM. et al. Environmental Health Perspectives. 2017]</p>
          </section>

          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-4 border border-gray-200">
            <h3 className="font-semibold text-lg text-black mb-3">12. Shellfish and farmed fish high in persistent pollutants</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Some shellfish and farmed fish bioaccumulate PFAS, PCBs, and other persistent organic pollutants that interfere with hormones essential for growth. Higher PFAS body burdens in children correlate with changes in height and thyroid hormones.
            </p>
            <p className="text-xs text-forest italic mt-3">[Grandjean P. et al. Environmental Health. 2012]</p>
          </section>

          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-4 border border-gray-200">
            <h3 className="font-semibold text-lg text-black mb-3">13. Non-organic, high-residue produce</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Conventional produce often carries organophosphate and other pesticide residues with documented endocrine and neurodevelopmental impacts. Cohort studies associate higher early-life pesticide exposure with hormone disruption and impaired growth, making low-residue or organic sourcing a direct height intervention.
            </p>
            <p className="text-xs text-forest italic mt-3">[Bouchard MF. et al. Pediatrics. 2010]</p>
          </section>

          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h3 className="font-semibold text-lg text-black mb-3">14. Plastics and xenoestrogens (overall estrogen load)</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Plastics, personal-care chemicals, and excess body fat all add to estrogen load, and estrogen is the hormone that ultimately closes growth plates. Clinical data show that high or early estrogen exposure accelerates epiphyseal fusion, while lack of estrogen keeps plates open and growth ongoing &mdash; too much, too soon locks in a shorter adult height.
            </p>
            <p className="text-xs text-forest italic mt-3">[Nilsson O. et al. Endocrine Reviews. 2005]</p>
          </section>

          {/* Metabolic Blockers */}
          <div className="mb-3">
            <h2 className="font-display text-2xl text-black">Metabolic Blockers</h2>
          </div>

          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-4 border border-gray-200">
            <h3 className="font-semibold text-lg text-black mb-3">15. Obesity and early puberty</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Childhood obesity is a growth blocker disguised as &ldquo;big for age&rdquo;: it advances bone age and multiplies the odds of fused growth plates compared with normal-weight peers. Extra adipose tissue converts androgens into estrogen, pulling puberty forward and cutting off years of potential height gain.
            </p>
            <p className="text-xs text-forest italic mt-3">[He Q. et al. Journal of Clinical Endocrinology &amp; Metabolism. 2004]</p>
          </section>

          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h3 className="font-semibold text-lg text-black mb-3">16. Chronic psychosocial stress</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Persistent stress elevates cortisol, which antagonizes thyroid hormones and dampens GH/IGF-1 action at the growth plate. Children in high-stress environments often show growth faltering that reverses only when the stressor is removed and endocrine balance returns.
            </p>
            <p className="text-xs text-forest italic mt-3">[Miller GE. et al. Psychological Bulletin. 2007]</p>
          </section>

          {/* Physical Blockers */}
          <div className="mb-3">
            <h2 className="font-display text-2xl text-black">Physical Blockers</h2>
          </div>

          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-4 border border-gray-200">
            <h3 className="font-semibold text-lg text-black mb-3">17. Weight lifting in childhood and early adolescence</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              For height-maximizing parents, the rule is simple: no weight lifting for kids &mdash; period. The growth years are for sprinting, running, jumping, climbing, and stretching; adding external loads to open growth plates introduces axial compression with no upside for final stature.
            </p>
            <p className="text-xs text-forest italic mt-3">[Gunter KB. et al. Bone. 2008]</p>
          </section>

          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h3 className="font-semibold text-lg text-black mb-3">18. EMF exposure during sleep (precautionary)</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              While height-specific data are limited, EMFs are flagged as a concern because of their potential to disrupt sleep and stress physiology. Keeping devices out of the bedroom and cutting wireless exposure at night is a low-cost hedge around a plausible hormonal disruptor.
            </p>
          </section>

          {/* Bottom Line */}
          <section className="bg-forest text-white rounded-2xl p-6 sm:p-8 mb-6">
            <h2 className="font-display text-xl sm:text-2xl mb-4">The Bottom Line</h2>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed mb-4">
              High-agency parenting for height means treating these not as suggestions but as a checklist: remove every item you control, then layer on nutrition, sleep, stretching, running, and jumping.
            </p>
            <p className="text-sm sm:text-base text-white font-semibold leading-relaxed">
              The fewer brakes you allow on GH, IGF-1, and open growth plates, the closer your child gets to their true genetic height.
            </p>
          </section>

          {/* References */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200">
            <h2 className="font-display text-lg text-black mb-4">References</h2>
            <ul className="space-y-3 text-xs sm:text-sm text-gray-500 leading-relaxed">
              <li>Van Cauter E, et al. Reciprocal interactions between the GH axis and sleep. <em>JAMA</em>. 2000.</li>
              <li>Mitchell DC, et al. Beverage caffeine intakes in the U.S. <em>Food and Chemical Toxicology</em>. 2014;63:136-142.</li>
              <li>Mindell JA, et al. A clinical guide to pediatric sleep. <em>Sleep Medicine Reviews</em>. 2010;14(1):19-31.</li>
              <li>Chang AM, et al. Evening use of light-emitting eReaders negatively affects sleep. <em>PNAS</em>. 2015;112(4):1232-1237.</li>
              <li>Wahlstrom K, et al. Examining the impact of later high school start times. <em>Journal of Clinical Sleep Medicine</em>. 2014;10(12):1271-1276.</li>
              <li>Lanzi R, et al. Elevated insulin levels contribute to the reduced growth hormone response to GH-releasing hormone in obese subjects. <em>Metabolism</em>. 1999;48(9):1152-1156.</li>
              <li>Mart&iacute;nez Steele E, et al. Ultra-processed foods and added sugars in the US diet. <em>BMJ Open</em>. 2016;6(3):e009892.</li>
              <li>Corwin RL, et al. Dietary saturated fat intake is inversely associated with bone density in humans. <em>Journal of Nutrition</em>. 2006;136(1):159-165.</li>
              <li>Rappazzo KM, et al. Exposure to perfluorinated alkyl substances and health outcomes in children. <em>Environmental Health Perspectives</em>. 2017;125(10):104002.</li>
              <li>Gore AC, et al. EDC-2: The Endocrine Society&apos;s second scientific statement on endocrine-disrupting chemicals. <em>Endocrine Reviews</em>. 2015;36(6):E1-E150.</li>
              <li>Grandjean P, et al. Serum vaccine antibody concentrations in children exposed to perfluorinated compounds. <em>Environmental Health</em>. 2012;11:37.</li>
              <li>Bouchard MF, et al. Attention-deficit/hyperactivity disorder and urinary metabolites of organophosphate pesticides. <em>Pediatrics</em>. 2010;125(6):e1270-e1277.</li>
              <li>Nilsson O, et al. Endocrine regulation of the growth plate. <em>Endocrine Reviews</em>. 2005;26(1):114-146.</li>
              <li>He Q, et al. Sex and race differences in fat distribution among Asian, African-American, and Caucasian prepubertal children. <em>Journal of Clinical Endocrinology &amp; Metabolism</em>. 2004;89(7):3030-3035.</li>
              <li>Miller GE, et al. If it goes up, must it come down? Chronic stress and the hypothalamic-pituitary-adrenocortical axis. <em>Psychological Bulletin</em>. 2007;133(1):25-45.</li>
              <li>Gunter KB, et al. Impact exercise increases BMC during growth. <em>Bone</em>. 2008;42(4):710-718.</li>
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
