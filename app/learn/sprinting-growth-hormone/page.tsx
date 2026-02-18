'use client';

import Link from 'next/link';
import Nav from '@/components/Nav';

export default function SprintingGHArticle() {
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
            <span className="text-xs font-semibold text-forest uppercase tracking-wider">Exercise</span>
            <span className="text-xs text-gray-400">&middot;</span>
            <span className="text-xs text-gray-400">7 min read</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl text-black mb-3">Sprinting: The Most Powerful Natural Growth Hormone Trigger</h1>
          <p className="text-base sm:text-lg text-gray-600 font-mono">Why 30-second sprints can raise GH by 700% &mdash; and how to use this for your child.</p>
        </div>

        {/* Article content */}
        <article className="prose prose-lg max-w-none">

          {/* The Science Is Clear */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">The Science Is Clear</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Sprinting is the single most potent natural stimulus for acute growth hormone release. And it does so through a movement pattern that is natural, load-free, and perfectly suited to children.
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mt-3 font-medium">
              No gym. No weights. No equipment. Just running as fast as possible.
            </p>
          </section>

          {/* The Numbers: Sprint-Induced GH Release */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">The Numbers: Sprint-Induced GH Release</h2>

            <h3 className="font-semibold text-black text-base mb-2">Single Sprint Response</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-2">
              A single 30-second all-out sprint raises serum GH to <strong>more than 4.5-fold</strong> the response of a 6-second sprint, with elevated GH persisting for <strong>90&ndash;120 minutes</strong> after the effort.
            </p>
            <p className="text-xs text-forest italic mb-5">[Stokes KA. et al. Journal of Applied Physiology. 2002]</p>

            <h3 className="font-semibold text-black text-base mb-2">Sprint-Trained vs. Endurance-Trained</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              In treadmill experiments comparing athletes:
            </p>
            <div className="overflow-x-auto mb-2">
              <table className="w-full text-sm sm:text-base">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 pr-4 text-black font-semibold">Athlete Type</th>
                    <th className="text-left py-2 text-black font-semibold">Peak GH Response</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4">Sprint-trained</td>
                    <td className="py-2 font-medium">72.4 mU/l</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Endurance-trained</td>
                    <td className="py-2">26.3 mU/l</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-2">
              That&apos;s approximately <strong>2.75-fold higher</strong> GH response in sprint-trained athletes from identical sprint stimuli.
            </p>
            <p className="text-xs text-forest italic mb-5">[Nevill ME. et al. Journal of Applied Physiology. 1996]</p>

            <h3 className="font-semibold text-black text-base mb-2">The 700%+ Effect</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-2">
              Sprint-interval protocols using repeated 30-second sprints with generous rest intervals consistently produce GH increases in the range of <strong>several hundred percent</strong> &mdash; with some studies documenting increases of 700% or more.
            </p>
            <p className="text-xs text-forest italic">[Wideman L. et al. Sports Medicine. 2002]</p>
          </section>

          {/* How Sprinting Triggers Massive GH Release */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">How Sprinting Triggers Massive GH Release</h2>

            <h3 className="font-semibold text-black text-base mb-2">The Metabolic Crisis</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              Maximal efforts of 20&ndash;30 seconds drive the body into a brief, severe metabolic crisis:
            </p>
            <ol className="space-y-2 list-decimal list-inside mb-5">
              <li className="text-sm sm:text-base text-gray-700"><strong>Phosphocreatine depletion</strong> &mdash; rapid exhaustion of immediate energy stores</li>
              <li className="text-sm sm:text-base text-gray-700"><strong>Blood lactate surge</strong> &mdash; high concentrations from anaerobic glycolysis</li>
              <li className="text-sm sm:text-base text-gray-700"><strong>Acid-base perturbation</strong> &mdash; pH drops significantly</li>
            </ol>

            <h3 className="font-semibold text-black text-base mb-2">Lactate as a GH Secretagogue</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              Here&apos;s the key insight: <strong>blood lactate itself acts as a growth hormone secretagogue.</strong>
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              In sprint studies, 82% of the variation in peak GH response was explained by just two factors:
            </p>
            <ul className="space-y-1 mb-2">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Peak power output</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Blood lactate concentration</li>
            </ul>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-2 font-medium">
              Higher lactate = higher GH. Sprinting maximizes both.
            </p>
            <p className="text-xs text-forest italic mb-5">[Nevill ME. et al. Journal of Applied Physiology. 1996]</p>

            <h3 className="font-semibold text-black text-base mb-2">The Hypothalamic Signal</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              These metabolic signals converge at the hypothalamus and pituitary to:
            </p>
            <ul className="space-y-1 mb-3">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span><strong>Favor GH-releasing hormone (GHRH)</strong></li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span><strong>Suppress somatostatin</strong> (the GH-blocking hormone)</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Produce a <strong>large, transient GH pulse</strong></li>
            </ul>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              This pulse supports lipolysis, glycogen resynthesis, and muscle repair &mdash; and in children, drives growth plate activity.
            </p>
          </section>

          {/* Sprinting vs. Endurance Training */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">Sprinting vs. Endurance Training</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
              Endurance training (long-distance running, cycling) does not produce the same GH response.
            </p>
            <ul className="space-y-1 mb-4">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span>Lower intensity = less lactate</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span>Less lactate = weaker GH signal</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span>Aerobic metabolism doesn&apos;t create the &ldquo;metabolic crisis&rdquo; that triggers massive GH pulses</li>
            </ul>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-2">
              Sprint-trained athletes mount <strong>~3x higher GH responses</strong> to identical stimuli than endurance-trained athletes.
            </p>
            <div className="bg-forest/5 border border-forest/20 rounded-xl p-4 mt-4">
              <p className="text-sm sm:text-base text-gray-800 leading-relaxed font-medium">
                For growth optimization, short and fast beats long and slow.
              </p>
            </div>
            <p className="text-xs text-forest italic mt-3">[Nevill ME. et al. Journal of Applied Physiology. 1996]</p>
          </section>

          {/* The Adaptation Effect */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">The Adaptation Effect</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
              Over time, repeated sprint training <strong>enhances the responsiveness of the GH axis</strong> to exercise.
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">This means:</p>
            <ul className="space-y-1 mb-2">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>More robust GH pulses from the same effort</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Maintained GH reactivity into adulthood</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Better hormonal profile than purely endurance-trained individuals</li>
            </ul>
            <p className="text-xs text-forest italic mt-3">[Wideman L. et al. Sports Medicine. 2002]</p>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-4">
              <p className="text-sm sm:text-base text-amber-900 leading-relaxed font-medium">
                Sprinting doesn&apos;t just trigger GH &mdash; it trains the body to produce more GH.
              </p>
            </div>
          </section>

          {/* Why This Matters for Growth */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">Why This Matters for Growth</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              The GH released during and after sprinting:
            </p>
            <ol className="space-y-2 list-decimal list-inside mb-4">
              <li className="text-sm sm:text-base text-gray-700">Travels to the liver</li>
              <li className="text-sm sm:text-base text-gray-700">Triggers IGF-1 production</li>
              <li className="text-sm sm:text-base text-gray-700">IGF-1 acts on growth plates</li>
              <li className="text-sm sm:text-base text-gray-700">Growth plates produce new cartilage &rarr; bone</li>
            </ol>
            <div className="bg-forest/5 border border-forest/20 rounded-xl p-4">
              <p className="text-sm sm:text-base text-gray-800 leading-relaxed font-medium">
                More sprinting = more GH pulses = more IGF-1 = more growth plate activity.
              </p>
            </div>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mt-4">
              Combined with adequate sleep (when 70&ndash;80% of daily GH is released), nutrition, and the absence of growth-limiting factors, sprinting creates an optimal hormonal environment for growth.
            </p>
          </section>

          {/* Practical Protocols by Age */}
          <section className="bg-forest/5 rounded-2xl p-6 sm:p-8 mb-6 border border-forest/20">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">Practical Protocols by Age</h2>

            <h3 className="font-semibold text-black text-base mb-2">Under Age 10: Sprint Play</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              The most effective &ldquo;protocol&rdquo; is disguised as play:
            </p>
            <ul className="space-y-1 mb-2">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Tag and chase games</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Races to a tree, car, or finish line</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Small-sided sports (soccer, basketball)</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Hill running as a game</li>
            </ul>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mt-3">
              These naturally produce repeated 5&ndash;20 second accelerations with ample rest &mdash; <strong>exactly the intensity-rest pattern that maximizes GH release.</strong>
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mt-2 font-medium">
              No formal &ldquo;training&rdquo; needed. Just outdoor play.
            </p>
          </section>

          <section className="bg-forest/5 rounded-2xl p-6 sm:p-8 mb-6 border border-forest/20">
            <h3 className="font-semibold text-black text-base mb-3">Ages 10+: Structured Sprint Sessions</h3>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-black text-sm mb-2">Basic Protocol:</h4>
                <ul className="space-y-1">
                  <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>4&ndash;6 maximal sprints of 20&ndash;40 meters</li>
                  <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>2&ndash;4 minutes walking recovery between sprints</li>
                  <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>2&ndash;3 sessions per week</li>
                  <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Thorough warm-up first</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-black text-sm mb-2">Hill Sprint Variation:</h4>
                <ul className="space-y-1">
                  <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>4&ndash;6 short hill sprints (10&ndash;15 seconds each)</li>
                  <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Walk back down for full recovery</li>
                  <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Frame as &ldquo;races&rdquo; to keep it fun</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-black text-sm mb-2">Grass or Track:</h4>
                <ul className="space-y-1">
                  <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Varied surfaces are fine</li>
                  <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Grass may be gentler on joints</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Scheduling Principles */}
          <section className="bg-amber-50 rounded-2xl p-6 sm:p-8 mb-6 border border-amber-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">Scheduling Principles</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm sm:text-base">
                <thead>
                  <tr className="border-b border-amber-300">
                    <th className="text-left py-2 pr-4 text-black font-semibold">Principle</th>
                    <th className="text-left py-2 text-black font-semibold">Reason</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-b border-amber-200">
                    <td className="py-2 pr-4 font-medium">Avoid sprinting right after meals</td>
                    <td className="py-2">Blunts GH response</td>
                  </tr>
                  <tr className="border-b border-amber-200">
                    <td className="py-2 pr-4 font-medium">At least 1 day rest between sessions</td>
                    <td className="py-2">Recovery and adaptation</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium">Avoid late-evening maximal sprints</td>
                    <td className="py-2">May delay sleep onset</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Bottom Line */}
          <section className="bg-forest text-white rounded-2xl p-6 sm:p-8 mb-6">
            <h2 className="font-display text-xl sm:text-2xl mb-4">The Bottom Line</h2>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed mb-4">
              Sprinting is nature&apos;s growth hormone injection.
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex gap-2 text-sm sm:text-base text-white/90"><span className="text-white font-bold">&#10003;</span><strong>30-second sprints can raise GH by 700%+</strong></li>
              <li className="flex gap-2 text-sm sm:text-base text-white/90"><span className="text-white font-bold">&#10003;</span><strong>Effects persist for 90&ndash;120 minutes</strong></li>
              <li className="flex gap-2 text-sm sm:text-base text-white/90"><span className="text-white font-bold">&#10003;</span><strong>Sprint-trained athletes produce 3x more GH than endurance-trained</strong></li>
              <li className="flex gap-2 text-sm sm:text-base text-white/90"><span className="text-white font-bold">&#10003;</span><strong>Zero growth plate risk when done naturally</strong></li>
            </ul>
            <p className="text-sm sm:text-base text-white font-semibold leading-relaxed">
              Your child doesn&apos;t need a gym membership. They need a field, a hill, or a backyard &mdash; and permission to run as fast as they can.
            </p>
          </section>

          {/* References */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200">
            <h2 className="font-display text-lg text-black mb-4">References</h2>
            <ul className="space-y-3 text-xs sm:text-sm text-gray-500 leading-relaxed">
              <li>Stokes KA, et al. The time course of the human growth hormone response to a 6-s and a 30-s cycle ergometer sprint. <em>Journal of Applied Physiology</em>. 2002;93(5):1785-1791.</li>
              <li>Nevill ME, et al. Growth hormone responses to treadmill sprinting in sprint- and endurance-trained athletes. <em>Journal of Applied Physiology</em>. 1996;72(2):539-544.</li>
              <li>Wideman L, et al. Growth hormone release during acute and chronic aerobic and resistance exercise. <em>Sports Medicine</em>. 2002;32(15):987-1004.</li>
              <li>Godfrey RJ, et al. The exercise-induced growth hormone response in athletes. <em>Sports Medicine</em>. 2003;33(8):599-613.</li>
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
