'use client';

import Link from 'next/link';
import Nav from '@/components/Nav';

export default function RawMilkArticle() {
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
            <span className="text-xs text-gray-400">·</span>
            <span className="text-xs text-gray-400">8 min read</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl text-black mb-3">Raw Milk and the Tallest People on Earth</h1>
          <p className="text-base sm:text-lg text-gray-600 font-mono">Why elite athletes and the world's tallest populations share one common childhood factor</p>
        </div>

        {/* Article content */}
        <article className="prose prose-lg max-w-none">

          {/* The Pattern */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">The Pattern</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
              Tom Brady milked cows on his grandfather's dairy farm. Serbian basketball giants grew up with Mlekomat raw milk vending machines. The Dutch stand as the tallest nation on earth. The Dinka of South Sudan raise boys on gallons of fresh cow's milk.
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
              The pattern connecting elite athletes and the world's tallest populations to raw milk access during their growth years is unmistakable: when you study their childhoods, raw milk keeps showing up. This isn't coincidence — it's biology.
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Raw milk is simply milk that has not been pasteurized or homogenized, taken fresh from the cow, goat, or other dairy animal, with its original enzymes, bacteria, and nutrients intact, much like humans consumed it for thousands of years before industrial heat treatments.
            </p>
          </section>

          {/* Tom Brady */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">Tom Brady: The Dairy Farm Childhood</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
              Tom Brady, the greatest quarterback in NFL history, spent summers in Browerville, Minnesota, where his grandfather ran a dairy farm and his mother Galynn grew up. As Brady himself recalled, "I milked the cows with my grandpa and just kind of tended the farm."
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              As a child on a working dairy farm, he almost certainly drank fresh, raw milk straight from the cows — the standard practice for farm families of that era. The important detail: while Brady's adult diet avoids dairy for anti-inflammatory reasons, during his crucial growth years — when height, bone structure, and athletic foundations are being laid — he enjoyed direct access to farm-fresh milk.
            </p>
          </section>

          {/* Serbia */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">Serbia: The NBA Factory</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
              Serbia, a country of only seven million people, produces NBA players at a rate 10–20 times higher than the United States per capita, with three-time MVP Nikola Joki&#263; as the headline example.
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
              Serbian cities like Belgrade are dotted with Mlekomat vending machines that dispense raw milk only hours after milking. Traditional raw cream and cottage cheese remain unpasteurized, and Serbian law explicitly permits raw milk sales for direct human consumption.
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Many of these basketball giants grew up in a culture where fresh raw dairy was normal, not niche.
            </p>
          </section>

          {/* Netherlands */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">The Netherlands: A National Case Study</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
              The Dutch are now the tallest people in the world. Over the last 150 years, their average height has climbed dramatically in parallel with improvements in environment and a strong rise in dairy intake.
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
              Across the country, raw milk vending machines on farms and in rural areas, along with a deep cultural reliance on milk and cheese, support dairy consumption levels more than 25 percent higher than those of neighboring nations.
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              The Dutch height advantage correlates strongly with their dairy consumption patterns.
            </p>
            <p className="text-xs text-forest italic mt-3">[Sch&#246;nbeck Y. et al. Pediatric Research. 2013] [Hoppe C. et al. European Journal of Clinical Nutrition. 2004]</p>
          </section>

          {/* Dinka */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">The Dinka: The Tallest Ethnic Group on Earth</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
              The Dinka of South Sudan are often cited as the tallest ethnic group on earth, with men averaging around 6'4".
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
              Their traditional diet is dominated by raw cow's milk from cattle. Boys participate in a "toc" tradition where they may drink gallons of raw milk daily over several months. Manute Bol — the 7'7" NBA player — grew up in this exact milk-camp environment.
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              In each of these cases, raw or minimally processed milk is woven into childhood as a daily growth fuel rather than an occasional beverage.
            </p>
            <p className="text-xs text-forest italic mt-3">[Roberts DF. et al. Annals of Human Biology. 1978]</p>
          </section>

          {/* What Pasteurization Preserves */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">What Pasteurization Preserves</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
              Heating milk to make it safer does not destroy everything:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Main casein proteins remain stable</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Most whey protein survives with only minor reductions</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Core bone-building minerals: calcium and phosphorus</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest">&#10003;</span>Fat-soluble vitamins A, D, E, and K are largely unaffected</li>
            </ul>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              These preserved components still support muscle growth and bone density.
            </p>
            <p className="text-xs text-forest italic mt-3">[Fox PF. et al. Dairy Chemistry and Biochemistry. 2015]</p>
          </section>

          {/* What Pasteurization Destroys */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">What Pasteurization Destroys</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
              However, pasteurization does significantly reduce or destroy several subtle but important parts of milk's natural design:
            </p>

            <h3 className="font-semibold text-black text-sm sm:text-base mb-2">Enzymes inactivated by heat:</h3>
            <ul className="space-y-1 mb-4">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span>Lipase — helps digest fats</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span>Phosphatase — supports calcium absorption</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span>Lactase — helps digest lactose</li>
            </ul>

            <h3 className="font-semibold text-black text-sm sm:text-base mb-2">Vitamins reduced:</h3>
            <ul className="space-y-1 mb-4">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span>Water-soluble vitamins including B1, B2, B12, vitamin C, and folate</li>
            </ul>

            <h3 className="font-semibold text-black text-sm sm:text-base mb-2">Beneficial bacteria destroyed:</h3>
            <ul className="space-y-1 mb-4">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span>Lactobacillus and other probiotics that contribute to gut health and immune balance</li>
            </ul>

            <h3 className="font-semibold text-black text-sm sm:text-base mb-2">Growth factors altered:</h3>
            <ul className="space-y-1 mb-4">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span>IGF-1 content is significantly changed by heat</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span>Premature breast-milk IGF-1 drops by about 40% after pasteurization</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-red-500">&#10007;</span>Immunoglobulin activity, especially IgG, is reduced</li>
            </ul>
            <p className="text-xs text-forest italic mt-3">[Claeys WL. et al. Food Control. 2013] [MacDonald LE. et al. J Food Protection. 2011] [Ewaschuk JB. et al. Current Pediatric Reviews. 2011]</p>
          </section>

          {/* IGF-1 Connection */}
          <section className="bg-forest/5 rounded-2xl p-6 sm:p-8 mb-6 border border-forest/20">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">The IGF-1 Connection</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
              IGF-1 (insulin-like growth factor 1) sits at the center of this story. It is one of the body's key growth messengers:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Stimulates bone elongation at the growth plates</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Promotes muscle development</li>
              <li className="flex gap-2 text-sm sm:text-base text-gray-700"><span className="text-forest font-bold">&#8226;</span>Essential for helping a child reach their full genetic height</li>
            </ul>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
              Raw milk is believed to contain more bioavailable IGF-1 and a more intact network of related growth factors and immune proteins.
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-medium">
              When you combine that biology with the real-world pattern — Tom Brady's dairy farm childhood, Serbian athletes raised in a raw-milk culture, Dutch families with high dairy intake and raw-milk access, and Dinka boys drinking raw milk by the gallon — the same theme surfaces: <strong>during the years when bones are lengthening and athletic foundations are set, these groups had steady, easy access to powerful, minimally processed milk.</strong>
            </p>
            <p className="text-xs text-forest italic mt-3">[Yakar S. et al. J Clinical Investigation. 2002] [Hoppe C. et al. European Journal of Clinical Nutrition. 2004]</p>
          </section>

          {/* Practical Recommendations */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="font-display text-xl sm:text-2xl text-black mb-4">Practical Recommendations</h2>

            <h3 className="font-semibold text-black text-base mb-3">If raw milk is available and legal where you live:</h3>
            <ol className="space-y-2 mb-6 list-decimal list-inside">
              <li className="text-sm sm:text-base text-gray-700">Source only from tested, trusted farms with rigorous hygiene</li>
              <li className="text-sm sm:text-base text-gray-700">Keep cold from milking to glass</li>
              <li className="text-sm sm:text-base text-gray-700">Consume fresh within a few days</li>
              <li className="text-sm sm:text-base text-gray-700">Obtain from farmers whose practices you know well</li>
            </ol>

            <h3 className="font-semibold text-black text-base mb-3">If raw milk is not an option:</h3>
            <ol className="space-y-2 list-decimal list-inside">
              <li className="text-sm sm:text-base text-gray-700"><strong>Choose least-processed dairy</strong> — organic grass-fed whole milk instead of reduced-fat versions</li>
              <li className="text-sm sm:text-base text-gray-700"><strong>Avoid ultra-pasteurized (UHT) products</strong> — these undergo the harshest heat treatment</li>
              <li className="text-sm sm:text-base text-gray-700"><strong>Choose raw milk cheeses</strong> — where legally sold, these retain more beneficial compounds</li>
              <li className="text-sm sm:text-base text-gray-700"><strong>Add fermented dairy</strong> — kefir and yogurt help replace some probiotic and gut benefits lost in pasteurization</li>
              <li className="text-sm sm:text-base text-gray-700"><strong>Consider European dairy brands</strong> — often have stricter standards and different processing norms</li>
            </ol>
          </section>

          {/* Bottom Line */}
          <section className="bg-forest text-white rounded-2xl p-6 sm:p-8 mb-6">
            <h2 className="font-display text-xl sm:text-2xl mb-4">The Bottom Line</h2>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed">
              Raw milk in the growth years is not the only factor behind elite height and athleticism. But across Brady's childhood farm, Serbian courts, Dutch cities, and Dinka cattle camps, it shows up again and again as a consistent part of the formula for maximizing human height and athletic potential.
            </p>
          </section>

          {/* References */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200">
            <h2 className="font-display text-lg text-black mb-4">References</h2>
            <ul className="space-y-3 text-xs sm:text-sm text-gray-500 leading-relaxed">
              <li>Sch&#246;nbeck Y, et al. The world's tallest nation has stopped growing taller: the height of Dutch children from 1955 to 2009. <em>Pediatric Research</em>. 2013;73(3):371-377.</li>
              <li>Hoppe C, et al. High intakes of milk, but not meat, increase s-insulin and insulin resistance in 8-year-old boys. <em>European Journal of Clinical Nutrition</em>. 2004;58(9):1239-1247.</li>
              <li>Roberts DF, et al. Body weight, race and climate. <em>Annals of Human Biology</em>. 1978;5(5):463-491.</li>
              <li>Fox PF, et al. <em>Dairy Chemistry and Biochemistry</em>. Springer. 2015.</li>
              <li>Claeys WL, et al. Raw or heated cow milk consumption: Review of risks and benefits. <em>Food Control</em>. 2013;31(1):251-262.</li>
              <li>MacDonald LE, et al. A systematic review and meta-analysis of the effects of pasteurization on milk vitamins. <em>Journal of Food Protection</em>. 2011;74(8):1334-1343.</li>
              <li>Quigley L, et al. The complex microbiota of raw milk. <em>FEMS Microbiology Reviews</em>. 2013;37(5):664-698.</li>
              <li>Ewaschuk JB, et al. Effect of pasteurization on immune components of milk: implications for feeding preterm infants. <em>Current Pediatric Reviews</em>. 2011;7(2):125-133.</li>
              <li>Li-Chan E, et al. Changes in the immunoglobulin content of bovine milk during pasteurization. <em>Journal of Agricultural and Food Chemistry</em>. 1995;43(5):1337-1342.</li>
              <li>Yakar S, et al. Normal growth and development in the absence of hepatic insulin-like growth factor I. <em>Journal of Clinical Investigation</em>. 2002;109(9):1279-1288.</li>
              <li>Collier RJ, et al. Factors affecting insulin-like growth factor-I concentration in bovine milk. <em>Journal of Dairy Science</em>. 1991;74(9):2905-2911.</li>
              <li>RIVM. Dutch National Food Consumption Survey 2007-2010. National Institute for Public Health and the Environment. 2012.</li>
            </ul>
          </section>

        </article>

        {/* Next article CTA */}
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
