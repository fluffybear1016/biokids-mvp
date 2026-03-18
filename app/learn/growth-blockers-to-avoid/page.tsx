'use client';

import Link from 'next/link';
import Nav from '@/components/Nav';

const F = "'Courier New', Courier, monospace";
const C = {
  bg: '#fafaf9', title: '#1c1917', body: '#57534e', light: '#57534e',
  green: '#065f46', card: '#fff', border: '#e7e5e4', sigBorder: '#86efac',
};

export default function GrowthBlockersArticle() {
  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: F }}>
      <Nav />

      <main style={{ maxWidth: 540, margin: "0 auto", padding: "32px 16px" }}>
        {/* Back link */}
        <Link href="/science#articles" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: C.green, fontWeight: 600, fontFamily: F, marginBottom: 20, textDecoration: "none" }}>
          <span style={{ marginRight: 4 }}>←</span> Back to Articles
        </Link>

        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
            <span style={{ fontSize: 9, fontWeight: 800, color: C.green, textTransform: "uppercase", letterSpacing: 1, fontFamily: F }}>Toxins</span>
            <span style={{ fontSize: 9, color: C.light }}>·</span>
            <span style={{ fontSize: 11, color: C.light, fontFamily: F }}>10 min read</span>
          </div>
          <h1 style={{ fontFamily: F, fontSize: 22, fontWeight: 700, color: C.title, margin: "0 0 8px" }}>18 Growth Blockers to Avoid</h1>
          <p style={{ fontSize: 13, color: C.body, fontFamily: F, lineHeight: 1.5, margin: 0 }}>If you want your child to hit their true height ceiling, you must protect their growth plates, deep sleep, and hormones from sabotage.</p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-8">
          <p style={{ fontSize: 13, color: "#78350f", lineHeight: 1.6, fontWeight: 600, fontFamily: F }}>
            These are not &ldquo;moderation&rdquo; items for high-agency parents &mdash; they are targets to remove.
          </p>
        </div>

        {/* Article content */}
        <article>

          {/* Sleep Disruptors */}
          <div style={{ marginBottom: 8 }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 8px" }}>Sleep Disruptors</h2>
          </div>

          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 12, border: `1px solid ${C.border}` }}>
            <h3 style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: C.title, margin: "0 0 8px" }}>1. Caffeine (coffee, energy drinks, sodas)</h3>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontFamily: F }}>
              Caffeine has no place in a growing child&apos;s life: it shrinks deep slow-wave sleep, where 70&ndash;80% of daily growth hormone (GH) pulses occur. High-dose caffeine in animal models directly reduces bone-forming activity and long-bone length during growth.
            </p>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginTop: 8, fontFamily: F }}>[Van Cauter E. et al. JAMA. 2000]</p>
          </section>

          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 12, border: `1px solid ${C.border}` }}>
            <h3 style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: C.title, margin: "0 0 8px" }}>2. Chocolate during childhood</h3>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontFamily: F }}>
              Chocolate delivers caffeine and theobromine, both stimulants that disrupt sleep architecture and delay sleep onset. For a child whose height depends on pristine deep sleep every night, regular chocolate is a growth tax, not a treat.
            </p>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginTop: 8, fontFamily: F }}>[Mitchell DC. et al. Food and Chemical Toxicology. 2014]</p>
          </section>

          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 12, border: `1px solid ${C.border}` }}>
            <h3 style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: C.title, margin: "0 0 8px" }}>3. Poor sleep and inconsistent bedtimes</h3>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontFamily: F }}>
              Late nights, irregular schedules, and chronic short sleep directly blunt GH secretion and height velocity. Pediatric data link insufficient sleep to impaired growth and hormonal disruption; a growing child needs long, predictable nights, not &ldquo;catch-up&rdquo; weekends.
            </p>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginTop: 8, fontFamily: F }}>[Mindell JA. et al. Sleep Medicine Reviews. 2010]</p>
          </section>

          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 12, border: `1px solid ${C.border}` }}>
            <h3 style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: C.title, margin: "0 0 8px" }}>4. Screen time in the evening</h3>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontFamily: F }}>
              Screens before bed are a growth blocker: blue light suppresses melatonin, delays deep-sleep onset, and flattens the GH curve. Studies show that removing screens 1&ndash;2 hours before bedtime measurably improves sleep quality &mdash; this is the minimum standard for height-focused parents.
            </p>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginTop: 8, fontFamily: F }}>[Chang AM. et al. PNAS. 2015]</p>
          </section>

          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h3 style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: C.title, margin: "0 0 8px" }}>5. Early-morning school schedules and chronic sleep debt</h3>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontFamily: F }}>
              Very early school starts lock teens into chronic sleep debt, systematically trimming deep-sleep time and blunting GH secretion. Studies of delayed school start times show longer sleep and better daytime function, and the same biology supports better growth hormone dynamics.
            </p>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginTop: 8, fontFamily: F }}>[Wahlstrom K. et al. Journal of Clinical Sleep Medicine. 2014]</p>
          </section>

          {/* Nutritional Blockers */}
          <div style={{ marginBottom: 8 }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 8px" }}>Nutritional Blockers</h2>
          </div>

          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 12, border: `1px solid ${C.border}` }}>
            <h3 style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: C.title, margin: "0 0 8px" }}>6. Refined carbs and added sugar</h3>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontFamily: F }}>
              Sugar-centric diets (sodas, candy, sweet cereals) displace protein and micronutrients that drive IGF-1 and bone mineralization. Ultra-processed, sugar-rich diets in animal studies damage growth plates and produce fragile, undermineralized bones.
            </p>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginTop: 8, fontFamily: F }}>[Lanzi R. et al. Metabolism. 1999]</p>
          </section>

          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 12, border: `1px solid ${C.border}` }}>
            <h3 style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: C.title, margin: "0 0 8px" }}>7. Ultra-processed foods</h3>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontFamily: F }}>
              Ultra-processed foods &mdash; chips, fast food, packaged snacks &mdash; are structurally incompatible with optimal growth. In controlled experiments, feeding growing animals a largely ultra-processed diet stunts linear growth and severely impairs endochondral ossification at the growth plate.
            </p>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginTop: 8, fontFamily: F }}>[Mart&iacute;nez Steele E. et al. BMJ Open. 2016]</p>
          </section>

          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h3 style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: C.title, margin: "0 0 8px" }}>8. Seed oils and industrial fats</h3>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontFamily: F }}>
              Frequent use of industrial seed oils and trans-fat-rich foods drives chronic inflammation and metabolic stress that weaken bone accrual. Animal work shows that such pro-inflammatory diets worsen bone quality and growth-plate structure compared with cleaner fat sources.
            </p>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginTop: 8, fontFamily: F }}>[Corwin RL. et al. Journal of Nutrition. 2006]</p>
          </section>

          {/* Endocrine Disruptors */}
          <div style={{ marginBottom: 8 }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 8px" }}>Endocrine Disruptors</h2>
          </div>

          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 12, border: `1px solid ${C.border}` }}>
            <h3 style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: C.title, margin: "0 0 8px" }}>9. Contaminated water (PFAS, metals, pesticides)</h3>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontFamily: F }}>
              Tap and well water can carry PFAS, heavy metals, and pesticide residues that interfere with thyroid function and growth trajectories. Longitudinal human studies link higher PFAS exposure with altered growth and lower height z-scores in childhood.
            </p>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginTop: 8, fontFamily: F }}>[Rappazzo KM. et al. Environmental Health Perspectives. 2017]</p>
          </section>

          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 12, border: `1px solid ${C.border}` }}>
            <h3 style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: C.title, margin: "0 0 8px" }}>10. Plastic containers and food packaging</h3>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontFamily: F }}>
              Heating or storing food in plastic leaches phthalates and other estrogen-like chemicals into meals and drinks. Early-life exposure to these xenoestrogens is associated with endocrine disruption and shifts in pubertal timing that can shorten the growth window.
            </p>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginTop: 8, fontFamily: F }}>[Gore AC. et al. Endocrine Reviews. 2015]</p>
          </section>

          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 12, border: `1px solid ${C.border}` }}>
            <h3 style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: C.title, margin: "0 0 8px" }}>11. Non-stick pans with PFAS coatings</h3>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontFamily: F }}>
              Traditional non-stick cookware uses PFAS-based coatings that migrate into food and dust over time. PFAS exposure in pregnancy and childhood has been tied to altered growth trajectories and endocrine disruption, making PFAS-free cookware a basic requirement.
            </p>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginTop: 8, fontFamily: F }}>[Rappazzo KM. et al. Environmental Health Perspectives. 2017]</p>
          </section>

          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 12, border: `1px solid ${C.border}` }}>
            <h3 style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: C.title, margin: "0 0 8px" }}>12. Shellfish and farmed fish high in persistent pollutants</h3>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontFamily: F }}>
              Some shellfish and farmed fish bioaccumulate PFAS, PCBs, and other persistent organic pollutants that interfere with hormones essential for growth. Higher PFAS body burdens in children correlate with changes in height and thyroid hormones.
            </p>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginTop: 8, fontFamily: F }}>[Grandjean P. et al. Environmental Health. 2012]</p>
          </section>

          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 12, border: `1px solid ${C.border}` }}>
            <h3 style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: C.title, margin: "0 0 8px" }}>13. Non-organic, high-residue produce</h3>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontFamily: F }}>
              Conventional produce often carries organophosphate and other pesticide residues with documented endocrine and neurodevelopmental impacts. Cohort studies associate higher early-life pesticide exposure with hormone disruption and impaired growth, making low-residue or organic sourcing a direct height intervention.
            </p>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginTop: 8, fontFamily: F }}>[Bouchard MF. et al. Pediatrics. 2010]</p>
          </section>

          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h3 style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: C.title, margin: "0 0 8px" }}>14. Plastics and xenoestrogens (overall estrogen load)</h3>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontFamily: F }}>
              Plastics, personal-care chemicals, and excess body fat all add to estrogen load, and estrogen is the hormone that ultimately closes growth plates. Clinical data show that high or early estrogen exposure accelerates epiphyseal fusion, while lack of estrogen keeps plates open and growth ongoing &mdash; too much, too soon locks in a shorter adult height.
            </p>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginTop: 8, fontFamily: F }}>[Nilsson O. et al. Endocrine Reviews. 2005]</p>
          </section>

          {/* Metabolic Blockers */}
          <div style={{ marginBottom: 8 }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 8px" }}>Metabolic Blockers</h2>
          </div>

          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 12, border: `1px solid ${C.border}` }}>
            <h3 style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: C.title, margin: "0 0 8px" }}>15. Obesity and early puberty</h3>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontFamily: F }}>
              Childhood obesity is a growth blocker disguised as &ldquo;big for age&rdquo;: it advances bone age and multiplies the odds of fused growth plates compared with normal-weight peers. Extra adipose tissue converts androgens into estrogen, pulling puberty forward and cutting off years of potential height gain.
            </p>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginTop: 8, fontFamily: F }}>[He Q. et al. Journal of Clinical Endocrinology &amp; Metabolism. 2004]</p>
          </section>

          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h3 style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: C.title, margin: "0 0 8px" }}>16. Chronic psychosocial stress</h3>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontFamily: F }}>
              Persistent stress elevates cortisol, which antagonizes thyroid hormones and dampens GH/IGF-1 action at the growth plate. Children in high-stress environments often show growth faltering that reverses only when the stressor is removed and endocrine balance returns.
            </p>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginTop: 8, fontFamily: F }}>[Miller GE. et al. Psychological Bulletin. 2007]</p>
          </section>

          {/* Physical Blockers */}
          <div style={{ marginBottom: 8 }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 8px" }}>Physical Blockers</h2>
          </div>

          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 12, border: `1px solid ${C.border}` }}>
            <h3 style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: C.title, margin: "0 0 8px" }}>17. Weight lifting in childhood and early adolescence</h3>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontFamily: F }}>
              For height-maximizing parents, the rule is simple: no weight lifting for kids &mdash; period. The growth years are for sprinting, running, jumping, climbing, and stretching; adding external loads to open growth plates introduces axial compression with no upside for final stature.
            </p>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginTop: 8, fontFamily: F }}>[Gunter KB. et al. Bone. 2008]</p>
          </section>

          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h3 style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: C.title, margin: "0 0 8px" }}>18. EMF exposure during sleep (precautionary)</h3>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontFamily: F }}>
              While height-specific data are limited, EMFs are flagged as a concern because of their potential to disrupt sleep and stress physiology. Keeping devices out of the bedroom and cutting wireless exposure at night is a low-cost hedge around a plausible hormonal disruptor.
            </p>
          </section>

          {/* Bottom Line */}
          <section style={{ background: C.green, color: "#fff", borderRadius: 14, padding: 20, marginBottom: 16 }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: "#fff", margin: "0 0 12px" }}>The Bottom Line</h2>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.9)", lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              High-agency parenting for height means treating these not as suggestions but as a checklist: remove every item you control, then layer on nutrition, sleep, stretching, running, and jumping.
            </p>
            <p className="text-sm sm:text-base text-white font-semibold leading-relaxed">
              The fewer brakes you allow on GH, IGF-1, and open growth plates, the closer your child gets to their true genetic height.
            </p>
          </section>

          {/* References */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>References</h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
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
        <div style={{ marginTop: 28, textAlign: "center" }}>
          <Link href="/science#articles" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: C.green, fontWeight: 700, fontFamily: F, fontSize: 13, textDecoration: "none" }}>
            <span style={{ marginRight: 4 }}>←</span> Back to all articles
          </Link>
        </div>

      </main>
    </div>
  );
}
