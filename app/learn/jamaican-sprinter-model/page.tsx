'use client';

import Link from 'next/link';
import Nav from '@/components/Nav';

export default function JamaicanSprinterModelArticle() {
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
            <span className="text-xs text-gray-400">8 min read</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl text-black mb-3">The Jamaican Sprinter Model: Why They Never Lift Weights</h1>
          <p className="text-base sm:text-lg text-gray-600 font-mono">How a small island builds the world&apos;s fastest humans &mdash; without a single barbell.</p>
        </div>

        {/* Article content */}
        <article className="prose prose-lg max-w-none">

          {/* The Jamaican Paradox */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">The Jamaican Paradox</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              Jamaica has roughly 3 million people. Yet this small island produces an outsized share of the world&apos;s fastest sprinters: Usain Bolt, Shelly-Ann Fraser-Pryce, Elaine Thompson-Herah, and dozens more.
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-medium">
              This isn&apos;t a fluke. It&apos;s the result of a training philosophy that prioritizes sprinting over weight lifting &mdash; and protects growth plates in the process.
            </p>
          </section>

          {/* The Core Rule */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">The Core Rule: No Weight Lifting Until Plates Close</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
              Jamaica&apos;s high school sprint system largely <strong>forbids weight lifting until after growth plates are presumed fused</strong> &mdash; typically age 18&ndash;20.
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
              This isn&apos;t an oversight. It&apos;s intentional.
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              Instead, they build world-class speed and power through:
            </p>
            <ul className="space-y-1 mb-4">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Sprinting</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Hill runs</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Intensive tempo runs</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Technical drills</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Plyometrics</li>
            </ul>
            <div className="bg-forest/5 border border-forest/20 rounded-xl p-4">
              <p className="text-sm sm:text-base text-gray-800 leading-relaxed font-medium">
                The result? An island of 3 million produces more sub-10-second 100-meter sprinters than countries with 100x the population.
              </p>
            </div>
          </section>

          {/* The "Run to Get Stronger" Model */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">The &ldquo;Run to Get Stronger&rdquo; Model</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
              Jamaican high school sprint sessions emphasize:
            </p>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm sm:text-base">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 pr-4 text-black font-semibold">Component</th>
                    <th className="text-left py-2 text-black font-semibold">Details</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4 font-medium">Acceleration work</td>
                    <td className="py-2">20&ndash;40 meters</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4 font-medium">Speed endurance</td>
                    <td className="py-2">150&ndash;300 meters on grass or track</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4 font-medium">Session volume</td>
                    <td className="py-2">1000&ndash;2500 meters total</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4 font-medium">Footwear</td>
                    <td className="py-2">Mostly flats</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4 font-medium">Surfaces</td>
                    <td className="py-2">Varied &mdash; track, grass, hills</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium">Tapering</td>
                    <td className="py-2">Volume decreases as competition approaches</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-medium">
              This builds extraordinary power without compressive loading of growth plates.
            </p>
          </section>

          {/* Why Weight Lifting Harms Growing Children */}
          <section className="bg-amber-50 rounded-2xl p-6 sm:p-8 mb-6 border border-amber-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">Why Weight Lifting Harms Growing Children</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              Weight lifting introduces:
            </p>
            <ul className="space-y-1 mb-4">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span><strong>Axial compression</strong> on the spine</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span><strong>Shear forces</strong> on growth plates</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span>Risk of <strong>physeal (growth plate) injuries</strong></li>
            </ul>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              The Jamaican approach avoids all of this while still building:
            </p>
            <ul className="space-y-1">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Explosive power</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Fast-twitch muscle recruitment</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Coordination and speed</li>
            </ul>
            <p className="text-xs text-forest italic mt-3">[Caine D. et al. Sports Medicine. 2006]</p>
          </section>

          {/* Sprinting vs. Weight Lifting */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">Sprinting vs. Weight Lifting: The Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm sm:text-base">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 pr-4 text-black font-semibold">Factor</th>
                    <th className="text-left py-2 pr-4 text-black font-semibold">Sprinting</th>
                    <th className="text-left py-2 text-black font-semibold">Weight Lifting</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4 font-medium">GH Response</td>
                    <td className="py-2 pr-4">Very high (300&ndash;700%+)</td>
                    <td className="py-2">Moderate-high</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4 font-medium">Growth Plate Risk</td>
                    <td className="py-2 pr-4 text-forest font-medium">Minimal</td>
                    <td className="py-2 text-red-600 font-medium">Significant</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4 font-medium">Loading Pattern</td>
                    <td className="py-2 pr-4">Natural, borne by muscle/tendon</td>
                    <td className="py-2">External axial compression</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4 font-medium">Coordination Development</td>
                    <td className="py-2 pr-4">High</td>
                    <td className="py-2">Moderate</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium">Speed/Power Development</td>
                    <td className="py-2 pr-4">Excellent</td>
                    <td className="py-2">Good for strength, not speed</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mt-4">
              Sprinting delivers GH responses that <strong>rival or exceed</strong> weight training &mdash; while imposing <strong>far less risk to open growth plates.</strong>
            </p>
            <p className="text-xs text-forest italic mt-2">[Faigenbaum AD. et al. Pediatrics. 2009]</p>
          </section>

          {/* The Critical Difference */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">The Critical Difference</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
              Pediatric sports-medicine literature consistently identifies maximal running, jumping, and change-of-direction as natural, developmentally appropriate activities.
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
              The loading patterns are primarily borne by muscle and tendon rather than by heavy, externally imposed axial compression on the spine and growth plates.
            </p>
            <div className="bg-forest/5 border border-forest/20 rounded-xl p-4">
              <p className="text-sm sm:text-base text-gray-800 leading-relaxed font-medium">
                Sprinting is what the human skeleton evolved to do. Heavy barbells are not.
              </p>
            </div>
            <p className="text-xs text-forest italic mt-3">[Myer GD. et al. British Journal of Sports Medicine. 2011]</p>
          </section>

          {/* The Rule for Parents */}
          <section className="bg-amber-50 rounded-2xl p-6 sm:p-8 mb-6 border border-amber-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">The Rule for Parents</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4 font-semibold">
              Children should not lift weights. Period.
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              The growth years are for:
            </p>
            <ul className="space-y-1 mb-4">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Sprinting</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Running</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Jumping</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Climbing</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Stretching</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Playing</li>
            </ul>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              Adding external loads to open growth plates introduces axial compression with <strong>no upside for growth</strong> and real risk of:
            </p>
            <ul className="space-y-1 mb-4">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span>Physeal injuries</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span>Impaired coordination development</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span>Premature growth plate stress</li>
            </ul>
            <p className="text-sm sm:text-base text-amber-900 leading-relaxed font-semibold">
              Wait until growth plates close &mdash; typically age 18&ndash;20 &mdash; before introducing any serious weight training.
            </p>
            <p className="text-xs text-forest italic mt-2">[Caine D. et al. Sports Medicine. 2006]</p>
          </section>

          {/* The Jamaican Diet */}
          <section className="bg-forest/5 rounded-2xl p-6 sm:p-8 mb-6 border border-forest/20">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">The Jamaican Diet: Fuel for Sprinters</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
              Traditional Jamaican staples align perfectly with sprint performance:
            </p>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm sm:text-base">
                <thead>
                  <tr className="border-b border-forest/30">
                    <th className="text-left py-2 pr-4 text-black font-semibold">Food</th>
                    <th className="text-left py-2 text-black font-semibold">Benefit</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-b border-forest/10">
                    <td className="py-2 pr-4 font-medium">Yams &amp; plantains</td>
                    <td className="py-2">Complex carbs, potassium for high-intensity fuel</td>
                  </tr>
                  <tr className="border-b border-forest/10">
                    <td className="py-2 pr-4 font-medium">Ackee</td>
                    <td className="py-2">Unique protein-fat combination</td>
                  </tr>
                  <tr className="border-b border-forest/10">
                    <td className="py-2 pr-4 font-medium">Fish</td>
                    <td className="py-2">Omega-3s, iodine for brain and thyroid</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium">Chicken</td>
                    <td className="py-2">Affordable lean protein for muscle</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-2">
              This whole-food pattern supports:
            </p>
            <ul className="space-y-1">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Repeated GH pulses from sprinting</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Superior micronutrient status</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Lower chronic inflammation</li>
            </ul>
          </section>

          {/* The Cultural Factor */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">The Cultural Factor</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
              Jamaica&apos;s CHAMPS (Boys and Girls Championships) is a nationally televised, hyper-competitive scholastic meet that starts in primary school.
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">This creates:</p>
            <ul className="space-y-1">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Early talent identification</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>A development pipeline unmatched elsewhere</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>National pride in speed</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Community celebration of physical achievement</li>
            </ul>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mt-3 font-medium">
              Children grow up knowing that speed matters &mdash; and that sprinting is the path to excellence.
            </p>
          </section>

          {/* The Invisible Training */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">The Invisible Training</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              In many Jamaican communities:
            </p>
            <ul className="space-y-1 mb-4">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Limited car access means children walk and run everywhere</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Kids chase goats and animals for play</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Days are spent outdoors in constant movement</li>
            </ul>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
              This &ldquo;invisible training&rdquo; builds:
            </p>
            <ul className="space-y-1 mb-4">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Tendon stiffness</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Neuromuscular coordination</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Thousands of sprint-like efforts before formal training</li>
            </ul>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-sm sm:text-base text-amber-900 leading-relaxed font-medium">
                Urban, screen-heavy childhoods don&apos;t provide this foundation.
              </p>
            </div>
          </section>

          {/* What Parents Can Learn */}
          <section className="bg-forest/5 rounded-2xl p-6 sm:p-8 mb-6 border border-forest/20">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">What Parents Can Learn</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">The Jamaican model teaches us:</p>
            <ol className="space-y-2 list-decimal list-inside">
              <li className="text-sm sm:text-base text-gray-700"><strong>Sprinting alone can build remarkable strength and power</strong></li>
              <li className="text-sm sm:text-base text-gray-700"><strong>Weight lifting is unnecessary for athletic development</strong></li>
              <li className="text-sm sm:text-base text-gray-700"><strong>Protecting growth plates should be a priority</strong></li>
              <li className="text-sm sm:text-base text-gray-700"><strong>Outdoor play and running trump gym memberships</strong></li>
              <li className="text-sm sm:text-base text-gray-700"><strong>Whole foods beat supplements</strong></li>
              <li className="text-sm sm:text-base text-gray-700"><strong>Culture and community support athletic development</strong></li>
            </ol>
          </section>

          {/* Bottom Line */}
          <section className="bg-forest text-white rounded-2xl p-6 sm:p-8 mb-6">
            <h2 className="font-display text-xl sm:text-2xl mb-4">The Bottom Line</h2>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed mb-4">
              If Jamaica can produce Olympic champions without weight rooms, your child doesn&apos;t need one either.
            </p>
            <p className="text-sm sm:text-base text-white font-semibold leading-relaxed">
              The growth years are for running fast and playing hard. Weight lifting can wait until the body is done growing.
            </p>
          </section>

          {/* References */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200">
            <h2 className="font-display text-lg text-black mb-4">References</h2>
            <ul className="space-y-3 text-xs sm:text-sm text-gray-500 leading-relaxed">
              <li>Caine D, et al. Physeal injuries in children&apos;s and youth sports: reasons for concern? <em>Sports Medicine</em>. 2006;36(9):749-767.</li>
              <li>Faigenbaum AD, et al. Youth resistance training: updated position statement paper from the National Strength and Conditioning Association. <em>Pediatrics</em>. 2009;124(5):e1157-e1167.</li>
              <li>Myer GD, et al. When to initiate integrative neuromuscular training to reduce sports-related injuries in youth? <em>British Journal of Sports Medicine</em>. 2011;45(2):90-95.</li>
              <li>Maffulli N, et al. Long-term sport involvement and sport specialization in young athletes. <em>British Journal of Sports Medicine</em>. 2010;44(14):1014-1019.</li>
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
