'use client';

import Link from 'next/link';
import Nav from '@/components/Nav';

const F = "'Courier New', Courier, monospace";
const C = {
  bg: '#fafaf9', title: '#1c1917', body: '#57534e', light: '#a8a29e',
  green: '#059669', card: '#fff', border: '#e7e5e4', sigBorder: '#a7f3d0',
};

export default function GhIgf1AxisArticle() {
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
            <span style={{ fontSize: 9, fontWeight: 800, color: C.green, textTransform: "uppercase", letterSpacing: 1, fontFamily: F }}>Science</span>
            <span style={{ fontSize: 9, color: C.light }}>·</span>
            <span style={{ fontSize: 11, color: C.light, fontFamily: F }}>6 min read</span>
          </div>
          <h1 style={{ fontFamily: F, fontSize: 22, fontWeight: 700, color: C.title, margin: "0 0 8px" }}>How Your Child Actually Grows: The GH-IGF-1 Axis Explained</h1>
          <p style={{ fontSize: 13, color: C.body, fontFamily: F, lineHeight: 1.5, margin: 0 }}>Understanding the biological system that controls your child&apos;s height &mdash; and how to optimize it.</p>
        </div>

        {/* Article content */}
        <article>

          {/* The Master Growth System */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>The Master Growth System</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontFamily: F }}>
              A child&apos;s height is mainly controlled by a system called the <strong>GH&ndash;IGF-1 axis</strong>. Understanding this system is the key to understanding everything else about height optimization.
            </p>
          </section>

          {/* Step 1 */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>Step 1: Growth Hormone Release</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontFamily: F }}>
              Growth hormone (GH) is released from the pituitary gland in short bursts, mostly during deep sleep at night. This is why sleep is the #1 lever for height &mdash; no deep sleep means no GH pulses.
            </p>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginTop: 8, fontFamily: F }}>[Van Cauter E. et al. JAMA. 2000]</p>
          </section>

          {/* Step 2 */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>Step 2: IGF-1 Production</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontFamily: F }}>
              GH travels in the blood to the liver, where it triggers production of <strong>insulin-like growth factor-1 (IGF-1)</strong>. IGF-1 then circulates back to the brain and partly shuts down further GH release so the system does not run unchecked.
            </p>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginTop: 8, fontFamily: F }}>[Yakar S. et al. Journal of Clinical Investigation. 2002]</p>
          </section>

          {/* Step 3 */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>Step 3: Bone Elongation</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              IGF-1 is the signal that actually makes bones longer.
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              At the growth plates (the cartilage at the ends of long bones), IGF-1 tells cartilage cells to:
            </p>
            <ol className="space-y-2 mb-4 list-decimal list-inside">
              <li style={{ fontSize: 13, color: C.body, fontFamily: F }}>Multiply</li>
              <li style={{ fontSize: 13, color: C.body, fontFamily: F }}>Enlarge</li>
              <li style={{ fontSize: 13, color: C.body, fontFamily: F }}>Convert into bone</li>
            </ol>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontFamily: F }}>
              This is how legs and spine lengthen &mdash; cartilage becomes bone, and the growth plate keeps producing more cartilage above it.
            </p>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginTop: 8, fontFamily: F }}>[Nilsson O. et al. Endocrine Reviews. 2005]</p>
          </section>

          {/* The Nutrition Requirement */}
          <section style={{ background: "#f0fdf4", borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.sigBorder}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>The Nutrition Requirement</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              The liver can only make enough IGF-1 if a child is getting sufficient:
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px", display: "flex", flexDirection: "column", gap: 4 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span><strong>Protein</strong> &mdash; the building blocks</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span><strong>Calories</strong> &mdash; the energy</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span><strong>Zinc</strong> &mdash; IGF-1 receptor function</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span><strong>Vitamin D</strong> &mdash; GH receptor sensitivity</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span><strong>Calcium</strong> &mdash; bone mineralization</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span><strong>Iodine</strong> &mdash; thyroid function</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span><strong>Magnesium</strong> &mdash; enzyme cofactor</li>
            </ul>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontFamily: F }}>
              When nutrition is poor, IGF-1 levels fall and growth slows. This is why early under-nutrition is tightly linked to stunting.
            </p>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginTop: 8, fontFamily: F }}>[Hoppe C. et al. American Journal of Clinical Nutrition. 2004]</p>
          </section>

          {/* The Thyroid Connection */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>The Thyroid Connection</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              Thyroid hormones (T4 and T3) act like the &ldquo;power setting&rdquo; for this system.
            </p>
            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>If thyroid function is low:</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px", display: "flex", flexDirection: "column", gap: 3 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span>GH release drops</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span>IGF-1 levels fall</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span>Height gain slows</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span>Bone maturation slows</li>
            </ul>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontFamily: F }}>
              Bringing thyroid back to normal restores growth rate.
            </p>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginTop: 8, fontFamily: F }}>[Robson H. et al. Journal of Endocrinology. 2002]</p>
          </section>

          {/* The Puberty Factor */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>The Puberty Factor</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              During puberty, rising sex hormones &mdash; testosterone and estrogen &mdash; boost GH and IGF-1 and create the classic growth spurt.
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              <strong>But there&apos;s a catch:</strong> Higher estrogen also starts the process of growth-plate closure.
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 6, fontFamily: F }}>This is why:</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 4 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Very early puberty shortens total growth time</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Higher body fat (more estrogen production) tends to shorten the growth window</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>The goal is a normal-timed puberty, not an early one</li>
            </ul>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginTop: 8, fontFamily: F }}>[Nilsson O. et al. Endocrine Reviews. 2005]</p>
          </section>

          {/* The Critical Windows */}
          <section style={{ background: "#fffbeb", borderRadius: 14, padding: 20, marginBottom: 16, border: "1px solid #fde68a" }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>The Critical Windows</h2>
            <div className="space-y-4">
              <div>
                <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontFamily: F }}>
                  <strong>By age 5:</strong> Roughly 60% of adult height is already reached, showing how active this system is in early childhood.
                </p>
              </div>
              <div>
                <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontFamily: F }}>
                  <strong>The first 1,000 days</strong> (conception to age two) are especially sensitive: poor diet and repeated illness in that window can permanently &ldquo;reset&rdquo; GH&ndash;IGF-1 signaling and growth-plate behavior, leading to lower adult height.
                </p>
              </div>
              <div>
                <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontFamily: F }}>
                  <strong>Through mid-teens:</strong> Meaningful growth continues while growth plates are still open.
                </p>
              </div>
            </div>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginTop: 8, fontFamily: F }}>[Victora CG. et al. Lancet. 2008]</p>
          </section>

          {/* The Practical Levers */}
          <section style={{ background: "#f0fdf4", borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.sigBorder}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>The Practical Levers</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 16, fontFamily: F }}>
              For a high-agency parent, the actionable takeaways are clear:
            </p>

            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>1. Prioritize Deep, Regular Sleep</h3>
            <ul className="space-y-1 mb-5">
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>This is when GH pulses occur</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Consistent bedtime, 10+ hours for children</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Dark, cool room</li>
            </ul>

            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>2. Ensure Sufficient Protein and Micronutrients</h3>
            <ul className="space-y-1 mb-5">
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>High-quality protein at every meal</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Zinc, vitamin D, calcium, iodine, magnesium</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>This fuels IGF-1 production and bone building</li>
            </ul>

            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>3. Support Healthy Thyroid Function</h3>
            <ul className="space-y-1 mb-5">
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Adequate iodine intake</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Avoid thyroid disruptors (fluoride, perchlorate, certain chemicals)</li>
            </ul>

            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>4. Manage Weight and Puberty Timing</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 3 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Avoid excess body fat (increases estrogen)</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Avoid endocrine disruptors that trigger early puberty</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Normal-timed puberty = maximum growth window</li>
            </ul>
          </section>

          {/* Bottom Line */}
          <section style={{ background: C.green, color: "#fff", borderRadius: 14, padding: 20, marginBottom: 16 }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: "#fff", margin: "0 0 12px" }}>The Bottom Line</h2>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.9)", lineHeight: 1.6, fontFamily: F }}>
              Height isn&apos;t random &mdash; it&apos;s the output of a biological system you can influence. Optimize sleep for GH, nutrition for IGF-1, and body composition for hormonal balance, and you give your child the best shot at their genetic ceiling.
            </p>
          </section>

          {/* References */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>References</h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              <li>Van Cauter E, et al. Age-related changes in slow wave sleep and REM sleep and relationship with growth hormone and cortisol levels in healthy men. <em>JAMA</em>. 2000;284(7):861-868.</li>
              <li>Yakar S, et al. Normal growth and development in the absence of hepatic insulin-like growth factor I. <em>Journal of Clinical Investigation</em>. 2002;109(9):1279-1288.</li>
              <li>Nilsson O, et al. Endocrine regulation of the growth plate. <em>Endocrine Reviews</em>. 2005;26(1):114-146.</li>
              <li>Hoppe C, et al. High intakes of milk, but not meat, increase s-insulin and insulin resistance in 8-year-old boys. <em>American Journal of Clinical Nutrition</em>. 2004;80(2):447-452.</li>
              <li>Robson H, et al. Interactions between GH, IGF-I, glucocorticoids, and thyroid hormones during skeletal growth. <em>Journal of Endocrinology</em>. 2002;174(2):295-309.</li>
              <li>Victora CG, et al. Maternal and child undernutrition: consequences for adult health and human capital. <em>Lancet</em>. 2008;371(9609):340-357.</li>
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
