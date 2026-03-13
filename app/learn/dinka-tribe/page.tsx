'use client';

import Link from 'next/link';
import Nav from '@/components/Nav';

const F = "'Courier New', Courier, monospace";
const C = {
  bg: '#fafaf9', title: '#1c1917', body: '#57534e', light: '#a8a29e',
  green: '#065f46', card: '#fff', border: '#e7e5e4', sigBorder: '#86efac',
};

export default function DinkaTribeArticle() {
  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: F }}>
      <Nav />

      <main style={{ maxWidth: 540, margin: "0 auto", padding: "32px 16px" }}>
        {/* Back link */}
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: C.green, fontWeight: 600, fontFamily: F, marginBottom: 20, textDecoration: "none" }}>
          <span style={{ marginRight: 4 }}>&larr;</span> Back
        </Link>

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
            <span style={{ fontSize: 9, fontWeight: 800, color: C.green, textTransform: "uppercase", letterSpacing: 1, fontFamily: F }}>Investigation</span>
            <span className="text-xs text-gray-400">&middot;</span>
            <span style={{ fontSize: 11, color: C.light, fontFamily: F }}>12 min read</span>
          </div>
          <h1 style={{ fontFamily: F, fontSize: 24, fontWeight: 800, color: C.title, margin: "0 0 10px", lineHeight: 1.2 }}>The Dinka Tribe of South Sudan</h1>
          <p style={{ fontSize: 14, color: C.body, fontFamily: F, lineHeight: 1.6, margin: 0 }}>Inside the cattle camps where the tallest people on Earth raise their children on raw milk &mdash; and what it means for every parent.</p>
        </div>

        {/* Article content */}
        <article>

          {/* Opening */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.7, marginBottom: 14, fontFamily: F }}>
              In the floodplains of South Sudan, along the banks of the White Nile, lives an ethnic group that has baffled anthropologists for over a century. The Dinka people &mdash; roughly four million strong &mdash; are the tallest population ever measured on Earth.
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.7, marginBottom: 14, fontFamily: F }}>
              They are not wealthy. They have no supplements, no clinics specializing in growth, no access to modern medicine. Many have never seen a doctor. They live in mud-and-thatch huts. They own almost nothing.
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.7, fontFamily: F, fontWeight: 600 }}>
              But they have cows. And that, it turns out, changes everything.
            </p>
          </section>

          {/* The Numbers */}
          <section style={{ background: "#f0fdf4", borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.sigBorder}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 14px" }}>The Numbers</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.7, marginBottom: 14, fontFamily: F }}>
              In 1953&ndash;1954, anthropologists Roberts and Bainbridge traveled to southern Sudan and measured Dinka men across multiple subgroups. What they recorded stunned the scientific community:
            </p>
            <div style={{ display: "flex", gap: 12, marginBottom: 14 }}>
              <div style={{ flex: 1, background: C.card, borderRadius: 10, padding: 14, textAlign: "center", border: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: C.green, fontFamily: F }}>6&apos;0&quot;</div>
                <div style={{ fontSize: 10, color: C.light, fontFamily: F, marginTop: 2 }}>avg. male height</div>
                <div style={{ fontSize: 9, color: C.light, fontFamily: F }}>(182.6 cm)</div>
              </div>
              <div style={{ flex: 1, background: C.card, borderRadius: 10, padding: 14, textAlign: "center", border: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: C.green, fontFamily: F }}>5&apos;10&quot;</div>
                <div style={{ fontSize: 10, color: C.light, fontFamily: F, marginTop: 2 }}>avg. female height</div>
                <div style={{ fontSize: 9, color: C.light, fontFamily: F }}>(178 cm)</div>
              </div>
            </div>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.7, marginBottom: 14, fontFamily: F }}>
              These were <em>averages</em>. Not outliers. Not NBA players. The typical Dinka man in the 1950s was taller than the average American man today &mdash; while living in one of the poorest, most remote regions on the planet. The typical Dinka woman was taller than most European men.
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.7, fontFamily: F }}>
              No other population on Earth has ever been measured taller. Not the Dutch. Not the Scandinavians. Not anyone. The Dinka hold the record.
            </p>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginTop: 10, fontFamily: F }}>Roberts DF, Bainbridge DR. Nilotic physique. Am J Phys Anthropol. 1963;21(3):341-370.</p>
          </section>

          {/* The Cattle Camps */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 14px" }}>The Cattle Camps</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.7, marginBottom: 14, fontFamily: F }}>
              To understand Dinka height, you have to understand the cattle camp &mdash; called a <em>wut</em> in Dinka.
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.7, marginBottom: 14, fontFamily: F }}>
              Every year during the dry season, between December and May, the Dinka move their herds from the highlands down to the floodplains near the White Nile. They set up massive temporary camps &mdash; sometimes hundreds of families &mdash; where the cattle can graze on fresh grass near the river.
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.7, marginBottom: 14, fontFamily: F }}>
              These camps are not just for the animals. They are the social, cultural, and nutritional center of Dinka life. Boys as young as eight leave their villages to live in the cattle camps for months at a time. Their primary job: milking the cows. Their primary food source: the milk itself.
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.7, fontFamily: F }}>
              Each day begins before dawn with the milking. The boys drink fresh, warm, raw milk straight from the cow &mdash; unpasteurized, unhomogenized, unprocessed in any way. They drink it throughout the day. During peak season, when the cows are well-fed on river grass, a single boy may consume several liters of raw milk per day.
            </p>
          </section>

          {/* The Milk Season */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 14px" }}>The Milk Season</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.7, marginBottom: 14, fontFamily: F }}>
              The Dinka recognize what they call the &ldquo;season of milk&rdquo; &mdash; the months when the cows are producing at their peak and the entire community enters a period of abundance. During this time, the Dinka describe themselves and their children as becoming visibly fatter and healthier.
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.7, marginBottom: 14, fontFamily: F }}>
              Dinka boys in the cattle camps undergo something remarkable during these months. Fed almost exclusively on raw milk, supplemented occasionally with sorghum, fish, and cattle blood, they enter extended periods of rapid growth. The milk is not a side dish. It is the centerpiece of nutrition during the most critical growth years of childhood and adolescence.
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.7, fontFamily: F }}>
              This is a society that figured out, thousands of years ago and without any scientific instruments, that flooding a growing child&apos;s body with raw animal milk during their formative years produces extraordinary physical development.
            </p>
          </section>

          {/* What's in the Milk */}
          <section style={{ background: "#f0fdf4", borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.sigBorder}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 14px" }}>What&apos;s in the Milk</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.7, marginBottom: 14, fontFamily: F }}>
              Raw milk straight from a grass-fed cow is not the same product sitting in a plastic jug at the supermarket. It contains a constellation of growth-promoting compounds that pasteurization and processing diminish or destroy:
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 14px", display: "flex", flexDirection: "column", gap: 8 }}>
              <li style={{ display: "flex", gap: 8, fontSize: 13, color: C.body, fontFamily: F, lineHeight: 1.5 }}><span style={{ color: C.green, fontWeight: 700, flexShrink: 0 }}>&#8226;</span><span><strong>IGF-1 (Insulin-like Growth Factor 1)</strong> &mdash; the body&apos;s primary growth messenger. Stimulates bone elongation at the growth plates. Raw milk contains bioavailable IGF-1; pasteurization degrades it significantly.</span></li>
              <li style={{ display: "flex", gap: 8, fontSize: 13, color: C.body, fontFamily: F, lineHeight: 1.5 }}><span style={{ color: C.green, fontWeight: 700, flexShrink: 0 }}>&#8226;</span><span><strong>Lactoferrin</strong> &mdash; an iron-binding protein that supports immune function and gut health. Heat-sensitive. Destroyed by pasteurization.</span></li>
              <li style={{ display: "flex", gap: 8, fontSize: 13, color: C.body, fontFamily: F, lineHeight: 1.5 }}><span style={{ color: C.green, fontWeight: 700, flexShrink: 0 }}>&#8226;</span><span><strong>Phosphatase</strong> &mdash; an enzyme that enhances calcium absorption. Completely inactivated by pasteurization (dairies actually use its absence to verify pasteurization was successful).</span></li>
              <li style={{ display: "flex", gap: 8, fontSize: 13, color: C.body, fontFamily: F, lineHeight: 1.5 }}><span style={{ color: C.green, fontWeight: 700, flexShrink: 0 }}>&#8226;</span><span><strong>Full-spectrum probiotics</strong> &mdash; Lactobacillus and other beneficial bacteria that optimize nutrient absorption in the gut. Killed by heat treatment.</span></li>
              <li style={{ display: "flex", gap: 8, fontSize: 13, color: C.body, fontFamily: F, lineHeight: 1.5 }}><span style={{ color: C.green, fontWeight: 700, flexShrink: 0 }}>&#8226;</span><span><strong>Complete whey and casein proteins</strong> &mdash; in their native, undenatured form. Provide every essential amino acid needed for bone and muscle growth.</span></li>
              <li style={{ display: "flex", gap: 8, fontSize: 13, color: C.body, fontFamily: F, lineHeight: 1.5 }}><span style={{ color: C.green, fontWeight: 700, flexShrink: 0 }}>&#8226;</span><span><strong>Fat-soluble vitamins A, D, E, K2</strong> &mdash; from grass-fed cows, in naturally high concentrations. Vitamin K2 in particular directs calcium into bones rather than soft tissue.</span></li>
            </ul>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.7, fontFamily: F }}>
              A Dinka boy drinking several liters of this milk per day is getting a growth cocktail that no supplement company on Earth can replicate. And he&apos;s getting it in its most bioavailable, whole-food form &mdash; exactly the way evolution designed it.
            </p>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginTop: 10, fontFamily: F }}>Hoppe C et al. Eur J Clin Nutr. 2004;58(9):1239-1247. &middot; Claeys WL et al. Food Control. 2013;31(1):251-262.</p>
          </section>

          {/* Manute Bol */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 14px" }}>Manute Bol: The Cattle Camp Boy Who Reached the NBA</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.7, marginBottom: 14, fontFamily: F }}>
              The most famous Dinka to ever live was born in Turalei, a small village in what is now South Sudan. His name was Manute Bol.
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.7, marginBottom: 14, fontFamily: F }}>
              Manute never attended school as a child. Instead, he herded cattle and goats in the traditional Dinka way. He lived in the cattle camps. He milked the cows. He drank the milk. He grew up on the same raw-milk diet that had produced generations of towering Dinka men before him.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 8, background: "#f0fdf4", borderRadius: 10, padding: 14, marginBottom: 14, border: `1px solid ${C.sigBorder}` }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.green, textTransform: "uppercase", letterSpacing: 1, fontFamily: F, marginBottom: 2 }}>The Bol Family</div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: C.body, fontFamily: F }}><span>Manute Bol</span><span style={{ fontWeight: 700, color: C.green }}>7&apos;7&quot;</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: C.body, fontFamily: F }}><span>Great-grandfather</span><span style={{ fontWeight: 700, color: C.green }}>7&apos;10&quot;</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: C.body, fontFamily: F }}><span>Mother (Okwok)</span><span style={{ fontWeight: 700, color: C.green }}>6&apos;10&quot;</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: C.body, fontFamily: F }}><span>Father (Madut)</span><span style={{ fontWeight: 700, color: C.green }}>6&apos;8&quot;</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: C.body, fontFamily: F }}><span>Sister</span><span style={{ fontWeight: 700, color: C.green }}>6&apos;8&quot;</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: C.body, fontFamily: F }}><span>Son (Bol Bol, NBA)</span><span style={{ fontWeight: 700, color: C.green }}>7&apos;2&quot;</span></div>
            </div>

            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.7, marginBottom: 14, fontFamily: F }}>
              When Manute was finally measured in 1979, at around age 18 or 19, he stood 7 feet 7 inches tall. He later recalled: &ldquo;I was born in a village where measuring height wasn&apos;t possible. I learned I was 7 foot 7 in 1979 when I was already grown.&rdquo;
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.7, marginBottom: 14, fontFamily: F }}>
              He went on to become one of the two tallest players in NBA history, playing for the Washington Bullets, Golden State Warriors, and Philadelphia 76ers. He held the record for blocked shots per game. His son, Bol Bol, currently plays in the NBA at 7&apos;2&quot; &mdash; the Dinka milk-camp lineage continuing into the next generation.
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.7, fontFamily: F }}>
              But Manute was not an anomaly among the Dinka. He was an extreme expression of a population-wide pattern. His father, a tribal elder, was 6&apos;8&quot;. His mother was 6&apos;10&quot;. His great-grandfather was 7&apos;10&quot;. In Dinka society, exceptional height runs in every family &mdash; not just the Bols.
            </p>
          </section>

          {/* The Proof in Reverse */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 14px" }}>The Proof in Reverse</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.7, marginBottom: 14, fontFamily: F }}>
              Here is where the story becomes devastating &mdash; and scientifically illuminating.
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.7, marginBottom: 14, fontFamily: F }}>
              Beginning in the 1980s, decades of civil war ravaged South Sudan. Cattle herds were slaughtered or stolen. Families were displaced into refugee camps. The cattle camps &mdash; the engine of Dinka nutrition for millennia &mdash; were destroyed.
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.7, marginBottom: 14, fontFamily: F }}>
              In 1995, researchers measured Dinka men living in refugee camps in Ethiopia. The results told the story: average male height had dropped to 176.4 cm (5&apos;9.4&quot;) &mdash; a decline of over 6 cm from the 1950s measurements. The same genetic population, the same DNA, but without the cattle camps and the raw milk, the Dinka were measurably shorter.
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.7, fontFamily: F, fontWeight: 600 }}>
              This is as close to a controlled experiment as history gives us. Same genes. Different environment. The variable that changed: access to raw milk from their cattle herds.
            </p>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginTop: 10, fontFamily: F }}>Bogin B et al. Anthropometric measurements of the Nilotic tribes in a refugee camp. Am J Hum Biol. 1995;7(4):443-450.</p>
          </section>

          {/* Not Just Genetics */}
          <section style={{ background: "#f0fdf4", borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.sigBorder}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 14px" }}>Not Just Genetics</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.7, marginBottom: 14, fontFamily: F }}>
              The conventional explanation is that the Dinka are tall because of &ldquo;genetics.&rdquo; And yes, Nilotic populations carry gene variants associated with skeletal elongation. But genetics alone cannot explain a 6 cm decline in a single generation.
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.7, marginBottom: 14, fontFamily: F }}>
              Genes set a range. The environment determines where within that range a child lands. A child with &ldquo;tall genes&rdquo; who is malnourished during their growth window will not reach their genetic ceiling. A child with the same genes who is flooded with high-quality animal protein, bioavailable calcium, IGF-1, and growth factors during the same window will push toward the top of their range.
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.7, fontFamily: F }}>
              The Dinka cattle camps are, in effect, a millennia-old growth optimization protocol. The boys enter the camps during their critical growth years, consume massive quantities of raw milk from grass-fed cattle, and emerge taller than any other population on Earth. When the camps are taken away, the height drops immediately.
            </p>
          </section>

          {/* The Dinka vs. The Dutch */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 14px" }}>The Dinka vs. The Dutch</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.7, marginBottom: 14, fontFamily: F }}>
              The Netherlands is often cited as the tallest nation on Earth. Dutch men average about 5&apos;11.5&quot; (182 cm). But even the Dutch don&apos;t reach the heights measured in the traditional Dinka population.
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.7, marginBottom: 14, fontFamily: F }}>
              The parallel is striking: the Netherlands is also one of the world&apos;s highest dairy-consuming nations. Dutch children grow up drinking milk daily. Raw milk vending machines dot the Dutch countryside. Dairy is embedded in the national culture.
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.7, fontFamily: F }}>
              The Dutch achieved their height record with modern healthcare, abundant food, and good sanitation on top of high dairy intake. The Dinka exceeded it with none of those advantages &mdash; just cows and raw milk. That is how powerful the milk-camp effect appears to be.
            </p>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginTop: 10, fontFamily: F }}>Sch&ouml;nbeck Y et al. Pediatr Res. 2013;73(3):371-377. &middot; RIVM Dutch National Food Consumption Survey. 2012.</p>
          </section>

          {/* What This Means for Your Child */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 14px" }}>What This Means for Your Child</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.7, marginBottom: 14, fontFamily: F }}>
              You don&apos;t need to move to South Sudan. You don&apos;t need cattle. But the Dinka demonstrate a principle that applies to every child on Earth:
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.7, marginBottom: 14, fontFamily: F, fontWeight: 600 }}>
              When growing children are given consistent, high-quality animal protein and dairy &mdash; especially in its least-processed form &mdash; during their critical growth years, they push toward the upper limit of their genetic height potential.
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.7, marginBottom: 14, fontFamily: F }}>
              If raw milk is available and legal where you live, sourced from a trusted, tested farm, it is the closest thing to what the Dinka cattle camps provide. If it isn&apos;t, organic grass-fed whole milk, raw cheeses, kefir, and high-quality fermented dairy still deliver the core proteins, calcium, and growth factors that matter &mdash; just in slightly reduced form.
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.7, fontFamily: F }}>
              The Dinka didn&apos;t read studies. They didn&apos;t have an app. They had a tradition, passed down for thousands of years, that happened to be one of the most effective growth protocols in human history. The science now explains <em>why</em> it works.
            </p>
          </section>

          {/* Bottom Line */}
          <section style={{ background: C.green, color: "#fff", borderRadius: 14, padding: 20, marginBottom: 16 }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: "#fff", margin: "0 0 12px" }}>The Bottom Line</h2>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.92)", lineHeight: 1.7, marginBottom: 12, fontFamily: F }}>
              The tallest people ever measured on Earth are subsistence cattle herders in one of the world&apos;s poorest countries. They have no supplements, no healthcare system, and no modern food technology. They have cows and raw milk.
            </p>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.92)", lineHeight: 1.7, fontFamily: F }}>
              When war took away their cattle camps, their height dropped within a single generation. When the camps were intact, they towered over every other population on the planet &mdash; including the wealthy, well-fed nations of Northern Europe.
            </p>
          </section>

          {/* References */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>References</h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8, fontSize: 11, color: C.body, fontFamily: F, lineHeight: 1.5 }}>
              <li>Roberts DF, Bainbridge DR. Nilotic physique. <em>American Journal of Physical Anthropology</em>. 1963;21(3):341-370.</li>
              <li>Bogin B, et al. Anthropometric measurements of the Nilotic tribes in a refugee camp. <em>American Journal of Human Biology</em>. 1995;7(4):443-450.</li>
              <li>Hoppe C, et al. High intakes of milk, but not meat, increase s-insulin and insulin resistance in 8-year-old boys. <em>European Journal of Clinical Nutrition</em>. 2004;58(9):1239-1247.</li>
              <li>Claeys WL, et al. Raw or heated cow milk consumption: Review of risks and benefits. <em>Food Control</em>. 2013;31(1):251-262.</li>
              <li>Sch&ouml;nbeck Y, et al. The world&apos;s tallest nation has stopped growing taller. <em>Pediatric Research</em>. 2013;73(3):371-377.</li>
              <li>Yakar S, et al. Normal growth and development in the absence of hepatic insulin-like growth factor I. <em>Journal of Clinical Investigation</em>. 2002;109(9):1279-1288.</li>
              <li>Ewaschuk JB, et al. Effect of pasteurization on immune components of milk. <em>Current Pediatric Reviews</em>. 2011;7(2):125-133.</li>
              <li>RIVM. Dutch National Food Consumption Survey 2007-2010. National Institute for Public Health and the Environment. 2012.</li>
            </ul>
          </section>

        </article>

        {/* CTA */}
        <div style={{ marginTop: 28, textAlign: "center" }}>
          <Link href="/onboarding" style={{ background: C.green, color: "white", padding: "12px 28px", borderRadius: 12, fontSize: 14, fontWeight: 600, textDecoration: "none", display: "inline-block", fontFamily: F }}>
            Start the Free Protocol
          </Link>
          <p style={{ fontSize: 11, color: C.light, fontFamily: F, marginTop: 8 }}>Apply the science behind the Dinka to your child&apos;s growth.</p>
        </div>

      </main>
    </div>
  );
}
