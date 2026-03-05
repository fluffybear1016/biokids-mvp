'use client';

import Link from 'next/link';
import Nav from '@/components/Nav';

const F = "'Courier New', Courier, monospace";
const C = {
  bg: '#fafaf9', title: '#1c1917', body: '#57534e', light: '#a8a29e',
  green: '#059669', card: '#fff', border: '#e7e5e4', sigBorder: '#a7f3d0',
};

export default function RawMilkArticle() {
  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: F }}>
      <Nav />

      <main style={{ maxWidth: 540, margin: "0 auto", padding: "32px 16px" }}>
        {/* Back link */}
        <Link href="/learn" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: C.green, fontWeight: 600, fontFamily: F, marginBottom: 20, textDecoration: "none" }}>
          <span style={{ marginRight: 4 }}>←</span> Back to Articles
        </Link>

        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
            <span style={{ fontSize: 9, fontWeight: 800, color: C.green, textTransform: "uppercase", letterSpacing: 1, fontFamily: F }}>Nutrition</span>
            <span className="text-xs text-gray-400">·</span>
            <span style={{ fontSize: 11, color: C.light, fontFamily: F }}>8 min read</span>
          </div>
          <h1 style={{ fontFamily: F, fontSize: 22, fontWeight: 700, color: C.title, margin: "0 0 8px" }}>Raw Milk and the Tallest People on Earth</h1>
          <p style={{ fontSize: 13, color: C.body, fontFamily: F, lineHeight: 1.5, margin: 0 }}>Why elite athletes and the world's tallest populations share one common childhood factor</p>
        </div>

        {/* Article content */}
        <article>

          {/* The Pattern */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>The Pattern</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              Tom Brady milked cows on his grandfather's dairy farm. Serbian basketball giants grew up with Mlekomat raw milk vending machines. The Dutch stand as the tallest nation on earth. The Dinka of South Sudan raise boys on gallons of fresh cow's milk.
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              The pattern connecting elite athletes and the world's tallest populations to raw milk access during their growth years is unmistakable: when you study their childhoods, raw milk keeps showing up. This isn't coincidence — it's biology.
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontFamily: F }}>
              Raw milk is simply milk that has not been pasteurized or homogenized, taken fresh from the cow, goat, or other dairy animal, with its original enzymes, bacteria, and nutrients intact, much like humans consumed it for thousands of years before industrial heat treatments.
            </p>
          </section>

          {/* Tom Brady */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>Tom Brady: The Dairy Farm Childhood</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              Tom Brady, the greatest quarterback in NFL history, spent summers in Browerville, Minnesota, where his grandfather ran a dairy farm and his mother Galynn grew up. As Brady himself recalled, "I milked the cows with my grandpa and just kind of tended the farm."
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontFamily: F }}>
              As a child on a working dairy farm, he almost certainly drank fresh, raw milk straight from the cows — the standard practice for farm families of that era. The important detail: while Brady's adult diet avoids dairy for anti-inflammatory reasons, during his crucial growth years — when height, bone structure, and athletic foundations are being laid — he enjoyed direct access to farm-fresh milk.
            </p>
          </section>

          {/* Serbia */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>Serbia: The NBA Factory</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              Serbia, a country of only seven million people, produces NBA players at a rate 10–20 times higher than the United States per capita, with three-time MVP Nikola Joki&#263; as the headline example.
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              Serbian cities like Belgrade are dotted with Mlekomat vending machines that dispense raw milk only hours after milking. Traditional raw cream and cottage cheese remain unpasteurized, and Serbian law explicitly permits raw milk sales for direct human consumption.
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontFamily: F }}>
              Many of these basketball giants grew up in a culture where fresh raw dairy was normal, not niche.
            </p>
          </section>

          {/* Netherlands */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>The Netherlands: A National Case Study</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              The Dutch are now the tallest people in the world. Over the last 150 years, their average height has climbed dramatically in parallel with improvements in environment and a strong rise in dairy intake.
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              Across the country, raw milk vending machines on farms and in rural areas, along with a deep cultural reliance on milk and cheese, support dairy consumption levels more than 25 percent higher than those of neighboring nations.
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontFamily: F }}>
              The Dutch height advantage correlates strongly with their dairy consumption patterns.
            </p>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginTop: 8, fontFamily: F }}>[Sch&#246;nbeck Y. et al. Pediatric Research. 2013] [Hoppe C. et al. European Journal of Clinical Nutrition. 2004]</p>
          </section>

          {/* Dinka */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>The Dinka: The Tallest Ethnic Group on Earth</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              The Dinka of South Sudan are often cited as the tallest ethnic group on earth, with men averaging around 6'4".
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              Their traditional diet is dominated by raw cow's milk from cattle. Boys participate in a "toc" tradition where they may drink gallons of raw milk daily over several months. Manute Bol — the 7'7" NBA player — grew up in this exact milk-camp environment.
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontFamily: F }}>
              In each of these cases, raw or minimally processed milk is woven into childhood as a daily growth fuel rather than an occasional beverage.
            </p>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginTop: 8, fontFamily: F }}>[Roberts DF. et al. Annals of Human Biology. 1978]</p>
          </section>

          {/* What Pasteurization Preserves */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>What Pasteurization Preserves</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              Heating milk to make it safer does not destroy everything:
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px", display: "flex", flexDirection: "column", gap: 4 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Main casein proteins remain stable</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Most whey protein survives with only minor reductions</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Core bone-building minerals: calcium and phosphorus</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Fat-soluble vitamins A, D, E, and K are largely unaffected</li>
            </ul>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontFamily: F }}>
              These preserved components still support muscle growth and bone density.
            </p>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginTop: 8, fontFamily: F }}>[Fox PF. et al. Dairy Chemistry and Biochemistry. 2015]</p>
          </section>

          {/* What Pasteurization Destroys */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>What Pasteurization Destroys</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              However, pasteurization does significantly reduce or destroy several subtle but important parts of milk's natural design:
            </p>

            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>Enzymes inactivated by heat:</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px", display: "flex", flexDirection: "column", gap: 3 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span>Lipase — helps digest fats</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span>Phosphatase — supports calcium absorption</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span>Lactase — helps digest lactose</li>
            </ul>

            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>Vitamins reduced:</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px", display: "flex", flexDirection: "column", gap: 3 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span>Water-soluble vitamins including B1, B2, B12, vitamin C, and folate</li>
            </ul>

            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>Beneficial bacteria destroyed:</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px", display: "flex", flexDirection: "column", gap: 3 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span>Lactobacillus and other probiotics that contribute to gut health and immune balance</li>
            </ul>

            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>Growth factors altered:</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px", display: "flex", flexDirection: "column", gap: 3 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span>IGF-1 content is significantly changed by heat</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span>Premature breast-milk IGF-1 drops by about 40% after pasteurization</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span>Immunoglobulin activity, especially IgG, is reduced</li>
            </ul>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginTop: 8, fontFamily: F }}>[Claeys WL. et al. Food Control. 2013] [MacDonald LE. et al. J Food Protection. 2011] [Ewaschuk JB. et al. Current Pediatric Reviews. 2011]</p>
          </section>

          {/* IGF-1 Connection */}
          <section style={{ background: "#f0fdf4", borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.sigBorder}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>The IGF-1 Connection</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              IGF-1 (insulin-like growth factor 1) sits at the center of this story. It is one of the body's key growth messengers:
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px", display: "flex", flexDirection: "column", gap: 4 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Stimulates bone elongation at the growth plates</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Promotes muscle development</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Essential for helping a child reach their full genetic height</li>
            </ul>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              Raw milk is believed to contain more bioavailable IGF-1 and a more intact network of related growth factors and immune proteins.
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontWeight: 600, fontFamily: F }}>
              When you combine that biology with the real-world pattern — Tom Brady's dairy farm childhood, Serbian athletes raised in a raw-milk culture, Dutch families with high dairy intake and raw-milk access, and Dinka boys drinking raw milk by the gallon — the same theme surfaces: <strong>during the years when bones are lengthening and athletic foundations are set, these groups had steady, easy access to powerful, minimally processed milk.</strong>
            </p>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginTop: 8, fontFamily: F }}>[Yakar S. et al. J Clinical Investigation. 2002] [Hoppe C. et al. European Journal of Clinical Nutrition. 2004]</p>
          </section>

          {/* Practical Recommendations */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>Practical Recommendations</h2>

            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 8px" }}>If raw milk is available and legal where you live:</h3>
            <ol style={{ padding: 0, margin: "0 0 18px", paddingLeft: 16, display: "flex", flexDirection: "column", gap: 4 }}>
              <li style={{ fontSize: 13, color: C.body, fontFamily: F }}>Source only from tested, trusted farms with rigorous hygiene</li>
              <li style={{ fontSize: 13, color: C.body, fontFamily: F }}>Keep cold from milking to glass</li>
              <li style={{ fontSize: 13, color: C.body, fontFamily: F }}>Consume fresh within a few days</li>
              <li style={{ fontSize: 13, color: C.body, fontFamily: F }}>Obtain from farmers whose practices you know well</li>
            </ol>

            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 8px" }}>If raw milk is not an option:</h3>
            <ol style={{ padding: 0, margin: 0, paddingLeft: 16, display: "flex", flexDirection: "column", gap: 4 }}>
              <li style={{ fontSize: 13, color: C.body, fontFamily: F }}><strong>Choose least-processed dairy</strong> — organic grass-fed whole milk instead of reduced-fat versions</li>
              <li style={{ fontSize: 13, color: C.body, fontFamily: F }}><strong>Avoid ultra-pasteurized (UHT) products</strong> — these undergo the harshest heat treatment</li>
              <li style={{ fontSize: 13, color: C.body, fontFamily: F }}><strong>Choose raw milk cheeses</strong> — where legally sold, these retain more beneficial compounds</li>
              <li style={{ fontSize: 13, color: C.body, fontFamily: F }}><strong>Add fermented dairy</strong> — kefir and yogurt help replace some probiotic and gut benefits lost in pasteurization</li>
              <li style={{ fontSize: 13, color: C.body, fontFamily: F }}><strong>Consider European dairy brands</strong> — often have stricter standards and different processing norms</li>
            </ol>
          </section>

          {/* Bottom Line */}
          <section style={{ background: C.green, color: "#fff", borderRadius: 14, padding: 20, marginBottom: 16 }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: "#fff", margin: "0 0 12px" }}>The Bottom Line</h2>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.9)", lineHeight: 1.6, fontFamily: F }}>
              Raw milk in the growth years is not the only factor behind elite height and athleticism. But across Brady's childhood farm, Serbian courts, Dutch cities, and Dinka cattle camps, it shows up again and again as a consistent part of the formula for maximizing human height and athletic potential.
            </p>
          </section>

          {/* References */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>References</h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
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
        <div style={{ marginTop: 28, textAlign: "center" }}>
          <Link href="/learn" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: C.green, fontWeight: 700, fontFamily: F, fontSize: 13, textDecoration: "none" }}>
            <span style={{ marginRight: 4 }}>←</span> Back to all articles
          </Link>
        </div>

      </main>
    </div>
  );
}
