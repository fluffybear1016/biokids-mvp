'use client';

import Link from 'next/link';
import Nav from '@/components/Nav';

const F = "'Courier New', Courier, monospace";
const C = {
  bg: '#fafaf9', title: '#1c1917', body: '#57534e', light: '#a8a29e',
  green: '#059669', card: '#fff', border: '#e7e5e4', sigBorder: '#a7f3d0',
};

export default function HowYourChildGrowsArticle() {
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
            <span style={{ fontSize: 9, fontWeight: 800, color: C.green, textTransform: "uppercase", letterSpacing: 1, fontFamily: F }}>Science</span>
            <span style={{ fontSize: 9, color: C.light }}>·</span>
            <span style={{ fontSize: 11, color: C.light, fontFamily: F }}>10 min read</span>
          </div>
          <h1 style={{ fontFamily: F, fontSize: 22, fontWeight: 700, color: C.title, margin: "0 0 8px" }}>How Your Child Actually Grows</h1>
          <p style={{ fontSize: 13, color: C.body, fontFamily: F, lineHeight: 1.5, margin: 0 }}>The complete guide to the biological cascade that determines your child&apos;s growth &mdash; and exactly how to optimize it.</p>
        </div>

        {/* Article content */}
        <article>

          {/* The Big Picture */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>The Big Picture</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              A child grows when growth plates in the bones are stimulated to produce new cartilage that later hardens into bone.
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontFamily: F }}>
              This only happens through one specific biological chain. Understanding this chain is the key to understanding everything else about growth optimization.
            </p>
          </section>

          {/* The Growth Cascade */}
          <div style={{ marginBottom: 8 }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 8px" }}>The Growth Cascade: 5 Steps</h2>
          </div>

          {/* Step 1 */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 12, border: `1px solid ${C.border}` }}>
            <h3 style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: C.title, margin: "0 0 8px" }}>Step 1: The Hypothalamus (The Brain&apos;s &ldquo;Growth Thermostat&rdquo;)</h3>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              The hypothalamus constantly monitors:
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px", display: "flex", flexDirection: "column", gap: 3 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Sleep quality</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Nutrition status</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Energy availability</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Stress levels</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Puberty status</li>
            </ul>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              Based on what it senses, it releases two opposing signals:
            </p>
            <div style={{ overflowX: "auto", marginBottom: 12 }}>
              <table style={{ width: "100%", fontSize: 12, fontFamily: F, borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                    <th style={{ textAlign: "left", padding: "6px 12px 6px 0", color: C.title, fontWeight: 700 }}>Hormone</th>
                    <th style={{ textAlign: "left", padding: "6px 0", color: C.title, fontWeight: 700 }}>Function</th>
                  </tr>
                </thead>
                <tbody style={{ color: C.body }}>
                  <tr style={{ borderBottom: "1px solid #f5f5f4" }}>
                    <td style={{ padding: "6px 12px 6px 0", fontWeight: 600 }}>GHRH</td>
                    <td style={{ padding: "6px 0" }}>Tells pituitary: &ldquo;Release growth hormone&rdquo;</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "6px 12px 6px 0", fontWeight: 600 }}>Somatostatin</td>
                    <td style={{ padding: "6px 0" }}>Tells pituitary: &ldquo;Stop growth hormone&rdquo;</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 4, fontFamily: F }}>
              <strong>What increases GHRH (good):</strong> Deep sleep, exercise, puberty
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontFamily: F }}>
              <strong>What increases somatostatin (bad):</strong> Stress, illness, under-eating
            </p>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginTop: 8, fontFamily: F }}>[Giustina A. et al. Endocrine Reviews. 1998]</p>
          </section>

          {/* Step 2 */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 12, border: `1px solid ${C.border}` }}>
            <h3 style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: C.title, margin: "0 0 8px" }}>Step 2: The Pituitary Releases Growth Hormone (GH)</h3>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              GH is released in pulses, mainly:
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px", display: "flex", flexDirection: "column", gap: 3 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>During deep sleep (70-80% of daily output)</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>During puberty</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>After high-intensity exercise</li>
            </ul>
            <div style={{ background: "#fffbeb", borderRadius: 10, padding: 12, border: "1px solid #fde68a" }}>
              <p style={{ fontSize: 13, color: "#78350f", lineHeight: 1.6, fontWeight: 600, fontFamily: F }}>
                Critical insight: GH does NOT make bones longer directly. Its job is to tell the liver: &ldquo;Make IGF-1.&rdquo;
              </p>
            </div>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginTop: 8, fontFamily: F }}>[Van Cauter E. et al. JAMA. 2000]</p>
          </section>

          {/* Step 3 */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 12, border: `1px solid ${C.border}` }}>
            <h3 style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: C.title, margin: "0 0 8px" }}>Step 3: The Liver Produces IGF-1</h3>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              When GH reaches the liver, the liver releases IGF-1 into the bloodstream.
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontWeight: 600, fontFamily: F }}>
              IGF-1 is the real growth signal for bones. It:
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px", display: "flex", flexDirection: "column", gap: 3 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Enters growth plates</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Makes cartilage cells divide</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Makes bones elongate</li>
            </ul>
            <div style={{ background: "#fef2f2", borderRadius: 10, padding: 12, border: "1px solid #fecaca" }}>
              <p style={{ fontSize: 13, color: "#7f1d1d", lineHeight: 1.6, fontWeight: 600, fontFamily: F }}>
                The critical truth: No IGF-1 = no growth. Even if GH is high.
              </p>
            </div>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginTop: 8, fontFamily: F }}>[Yakar S. et al. Journal of Clinical Investigation. 2002]</p>
          </section>

          {/* Step 4 */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 12, border: `1px solid ${C.border}` }}>
            <h3 style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: C.title, margin: "0 0 8px" }}>Step 4: IGF-1 Acts on the Growth Plates</h3>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              In the growth plates:
            </p>
            <ol style={{ padding: 0, margin: "0 0 8px", paddingLeft: 16, display: "flex", flexDirection: "column", gap: 3 }}>
              <li style={{ fontSize: 13, color: C.body, fontFamily: F }}>Cartilage cells multiply</li>
              <li style={{ fontSize: 13, color: C.body, fontFamily: F }}>Plates expand</li>
              <li style={{ fontSize: 13, color: C.body, fontFamily: F }}>Bone replaces cartilage</li>
              <li style={{ fontSize: 13, color: C.body, fontFamily: F }}>Bone gets longer</li>
            </ol>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontWeight: 600, fontFamily: F }}>
              This is how growth happens.
            </p>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginTop: 8, fontFamily: F }}>[Nilsson O. et al. Endocrine Reviews. 2005]</p>
          </section>

          {/* Step 5 */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h3 style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: C.title, margin: "0 0 8px" }}>Step 5: Estrogen Closes the Growth Plates</h3>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              At puberty:
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 8px", display: "flex", flexDirection: "column", gap: 3 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Testosterone (boys) and estrogen (girls) rise</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Testosterone converts to estrogen in bone</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Estrogen gradually fuses growth plates</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444", fontWeight: 700 }}>&#8226;</span>Once fused: <strong>no more growth possible &mdash; ever</strong></li>
            </ul>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", fontFamily: F }}>[Nilsson O. et al. Endocrine Reviews. 2005]</p>
          </section>

          {/* The Truth in One Line */}
          <section style={{ background: C.green, color: "#fff", borderRadius: 14, padding: 20, marginBottom: 16 }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: "#fff", margin: "0 0 12px" }}>The Truth in One Line</h2>
            <p style={{ fontSize: 14, color: "#fff", fontWeight: 600, lineHeight: 1.6, fontFamily: F }}>
              A child grows when the brain senses safety + food + sleep &rarr; releases GH &rarr; liver makes IGF-1 &rarr; growth plates expand.
            </p>
          </section>

          {/* The Liver: The Bottleneck */}
          <section style={{ background: "#fffbeb", borderRadius: 14, padding: 20, marginBottom: 16, border: "1px solid #fde68a" }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>The Liver: The Bottleneck of Growth</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              This is where most parents should focus &mdash; because <strong>the liver is the bottleneck of the whole growth system.</strong>
            </p>
            <p style={{ fontSize: 13, color: "#78350f", lineHeight: 1.6, fontWeight: 600, fontFamily: F }}>
              You can have plenty of GH, but if the liver doesn&apos;t respond: no IGF-1 &rarr; no growth.
            </p>
          </section>

          {/* What Makes the Liver Produce IGF-1? */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>What Makes the Liver Produce IGF-1?</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              The liver increases IGF-1 when <strong>all four</strong> of these are present:
            </p>
            <div style={{ overflowX: "auto", marginBottom: 12 }}>
              <table style={{ width: "100%", fontSize: 12, fontFamily: F, borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                    <th style={{ textAlign: "left", padding: "6px 12px 6px 0", color: C.title, fontWeight: 700 }}>Requirement</th>
                    <th style={{ textAlign: "left", padding: "6px 0", color: C.title, fontWeight: 700 }}>Why It Matters</th>
                  </tr>
                </thead>
                <tbody style={{ color: C.body }}>
                  <tr style={{ borderBottom: "1px solid #f5f5f4" }}>
                    <td style={{ padding: "6px 12px 6px 0", fontWeight: 600 }}>Growth hormone</td>
                    <td style={{ padding: "6px 0" }}>The signal to make IGF-1</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #f5f5f4" }}>
                    <td style={{ padding: "6px 12px 6px 0", fontWeight: 600 }}>Enough calories</td>
                    <td style={{ padding: "6px 0" }}>The liver refuses to grow the body if energy is scarce</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #f5f5f4" }}>
                    <td style={{ padding: "6px 12px 6px 0", fontWeight: 600 }}>Enough protein</td>
                    <td style={{ padding: "6px 0" }}>IGF-1 is a 70-amino-acid protein &mdash; needs raw materials</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "6px 12px 6px 0", fontWeight: 600 }}>Insulin (present, not spiked)</td>
                    <td style={{ padding: "6px 0" }}>Tells the liver food is available</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 6, fontWeight: 600, fontFamily: F }}>
              If any one is missing &rarr; IGF-1 drops.
            </p>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginBottom: 12, fontFamily: F }}>[Thissen JP. et al. Endocrine Reviews. 1994]</p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              This is why:
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 3 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span>Starving kids have low IGF-1</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span>Overtraining kids stop growing</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span>Kids with celiac disease stop growing</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span><strong>Even if GH is normal</strong></li>
            </ul>
          </section>

          {/* The Liver's Decision Process */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>The Liver&apos;s Decision Process</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              Your child&apos;s liver constantly asks:
            </p>
            <div style={{ background: "#f0fdf4", border: `1px solid ${C.sigBorder}`, borderRadius: 10, padding: 12, marginBottom: 12 }}>
              <p style={{ fontSize: 13, color: C.body, fontWeight: 600, fontStyle: "italic", fontFamily: F }}>
                &ldquo;Is this a safe time to build a bigger body?&rdquo;
              </p>
            </div>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              It evaluates:
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px", display: "flex", flexDirection: "column", gap: 3 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Blood glucose</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Insulin levels</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Amino acid availability</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Thyroid hormone</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Inflammation markers</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>GH signal strength</li>
            </ul>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontWeight: 600, fontFamily: F }}>
              Only if all are favorable &rarr; it releases IGF-1.
            </p>
          </section>

          {/* How to Optimize IGF-1 */}
          <div style={{ marginBottom: 8 }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 8px" }}>How to Optimize IGF-1: The 6 Proven Levers</h2>
          </div>

          {/* Lever 1 */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 12, border: `1px solid ${C.border}` }}>
            <h3 style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: C.title, margin: "0 0 8px" }}>1. Eat Enough Calories</h3>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              This is #1. Growing kids need adequate energy &mdash; ideally a slight surplus.
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontWeight: 600, fontFamily: F }}>
              Under-eating = low IGF-1. Even in athletic kids.
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 6, fontFamily: F }}>Signs of insufficient calories:</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 3 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span>Always hungry</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span>Very lean/skinny</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span>Late puberty</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span>Slow growth velocity</li>
            </ul>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginTop: 8, fontFamily: F }}>[Thissen JP. et al. Endocrine Reviews. 1994]</p>
          </section>

          {/* Lever 2 */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 12, border: `1px solid ${C.border}` }}>
            <h3 style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: C.title, margin: "0 0 8px" }}>2. Eat Enough Protein</h3>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              IGF-1 is a protein. The liver needs amino acids to build it.
            </p>
            <h4 style={{ fontFamily: F, fontSize: 12, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>Targets:</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 8px", display: "flex", flexDirection: "column", gap: 3 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Children: 1.0&ndash;1.2g protein per kg body weight daily</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Teens in puberty: 1.2&ndash;1.5g per kg (or more)</li>
            </ul>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontFamily: F }}>
              <strong>Best sources:</strong> Milk, meat, eggs, fish, yogurt, beans
            </p>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginTop: 8, fontFamily: F }}>[Hoppe C. et al. American Journal of Clinical Nutrition. 2004]</p>
          </section>

          {/* Lever 3 */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 12, border: `1px solid ${C.border}` }}>
            <h3 style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: C.title, margin: "0 0 8px" }}>3. Maintain Steady Insulin (Not Spiked)</h3>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              The liver requires insulin to make IGF-1. This is why:
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px", display: "flex", flexDirection: "column", gap: 3 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Very low-carb diets can impair growth</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Prolonged fasting lowers IGF-1</li>
            </ul>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontWeight: 600, fontFamily: F }}>
              But this does NOT mean sugar binges.
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              What the liver needs:
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 8px", display: "flex", flexDirection: "column", gap: 3 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Moderate, meal-time insulin</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>The signal: &ldquo;We have food. It is safe to grow.&rdquo;</li>
            </ul>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontWeight: 600, fontFamily: F }}>
              The solution: Regular balanced meals with protein, carbs, and fat.
            </p>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginTop: 8, fontFamily: F }}>[Clemmons DR. et al. Journal of Clinical Endocrinology &amp; Metabolism. 1981]</p>
          </section>

          {/* Lever 4 */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 12, border: `1px solid ${C.border}` }}>
            <h3 style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: C.title, margin: "0 0 8px" }}>4. Maximize Deep Sleep</h3>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontWeight: 600, fontFamily: F }}>
              No deep sleep &rarr; no GH &rarr; no IGF-1.
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              Kids who sleep less have lower IGF-1, grow slower, and miss critical GH pulses.
            </p>
            <h4 style={{ fontFamily: F, fontSize: 12, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>Sleep targets (upper end of recommendations):</h4>
            <div style={{ overflowX: "auto", marginBottom: 12 }}>
              <table style={{ width: "100%", fontSize: 12, fontFamily: F, borderCollapse: "collapse" }}>
                <tbody style={{ color: C.body }}>
                  <tr style={{ borderBottom: "1px solid #f5f5f4" }}>
                    <td style={{ padding: "5px 12px 5px 0", fontWeight: 600 }}>0&ndash;1 years</td>
                    <td style={{ padding: "5px 0" }}>16 hours (including naps)</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #f5f5f4" }}>
                    <td style={{ padding: "5px 12px 5px 0", fontWeight: 600 }}>1&ndash;2 years</td>
                    <td style={{ padding: "5px 0" }}>14 hours (including naps)</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #f5f5f4" }}>
                    <td style={{ padding: "5px 12px 5px 0", fontWeight: 600 }}>3&ndash;5 years</td>
                    <td style={{ padding: "5px 0" }}>13 hours (including naps)</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #f5f5f4" }}>
                    <td style={{ padding: "5px 12px 5px 0", fontWeight: 600 }}>6&ndash;12 years</td>
                    <td style={{ padding: "5px 0" }}>12 hours</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "5px 12px 5px 0", fontWeight: 600 }}>13&ndash;18 years</td>
                    <td style={{ padding: "5px 0" }}>10 hours</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontWeight: 600, fontFamily: F }}>
              Consistent bedtime is critical &mdash; same time every night, including weekends.
            </p>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginTop: 8, fontFamily: F }}>[Van Cauter E. et al. JAMA. 2000]</p>
          </section>

          {/* Lever 5 */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 12, border: `1px solid ${C.border}` }}>
            <h3 style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: C.title, margin: "0 0 8px" }}>5. Keep Inflammation Low</h3>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontWeight: 600, fontFamily: F }}>
              Inflammation blocks IGF-1 production.
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 6, fontFamily: F }}>Common causes:</p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px", display: "flex", flexDirection: "column", gap: 3 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span>Chronic illness</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span>Gut problems (celiac, IBS, food sensitivities)</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span>Obesity</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span>Overtraining</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span>Sleep deprivation</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span>Ultra-processed diet</li>
            </ul>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontFamily: F }}>
              This is why doctors test for celiac, thyroid dysfunction, IBD, and anemia in children with unexplained slow growth.
            </p>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginTop: 8, fontFamily: F }}>[Street ME. et al. Cytokine &amp; Growth Factor Reviews. 2011]</p>
          </section>

          {/* Lever 6 */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h3 style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: C.title, margin: "0 0 8px" }}>6. Ensure Normal Thyroid Function</h3>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              The liver needs thyroid hormone to respond to GH properly.
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontWeight: 600, fontFamily: F }}>
              Low thyroid = low IGF-1, even if GH is high.
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontFamily: F }}>
              If your child is growing slowly, thyroid testing is essential.
            </p>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginTop: 8, fontFamily: F }}>[Robson H. et al. Journal of Endocrinology. 2002]</p>
          </section>

          {/* The Insulin Sweet Spot */}
          <section style={{ background: "#f0fdf4", borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.sigBorder}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>The Insulin Sweet Spot</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              This deserves extra attention because it&apos;s where parents often go wrong.
            </p>
            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>What the liver needs:</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px", display: "flex", flexDirection: "column", gap: 3 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Steady, meal-time insulin</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>The message: &ldquo;We have food. It is safe to grow.&rdquo;</li>
            </ul>
            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>What hurts growth:</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px", display: "flex", flexDirection: "column", gap: 3 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span>Sugar spikes followed by crashes (stress mode)</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span>Very low carb diets (starvation signal)</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span>Skipping meals (fasting signal)</li>
            </ul>
            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>The practical approach:</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 3 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Slow, steady insulin = growth mode</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Regular balanced meals with protein + complex carbs</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Avoid sugar-heavy foods, especially on empty stomach</li>
            </ul>
          </section>

          {/* What Controls the Whole System? */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>What Controls the Whole System?</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              The growth cascade only works when the body believes:
            </p>
            <div style={{ background: "#f0fdf4", border: `1px solid ${C.sigBorder}`, borderRadius: 10, padding: 12, marginBottom: 12 }}>
              <p style={{ fontSize: 13, color: C.body, fontWeight: 600, fontStyle: "italic", fontFamily: F }}>
                &ldquo;We have enough energy to grow.&rdquo;
              </p>
            </div>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 6, fontFamily: F }}>That means:</p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px", display: "flex", flexDirection: "column", gap: 3 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Enough calories</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Enough protein</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Enough minerals</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Enough sleep</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Low stress</li>
            </ul>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              <strong>If food is low or stress is high:</strong>
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px", display: "flex", flexDirection: "column", gap: 3 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span>Hypothalamus blocks GH</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span>Liver reduces IGF-1</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span>Growth slows or stops</li>
            </ul>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontFamily: F }}>
              This is survival biology. The body won&apos;t invest in getting bigger if it senses scarcity or danger.
            </p>
          </section>

          {/* The Action Summary */}
          <section style={{ background: "#f0fdf4", borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.sigBorder}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>The Action Summary</h2>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", fontSize: 12, fontFamily: F, borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${C.sigBorder}` }}>
                    <th style={{ textAlign: "left", padding: "6px 12px 6px 0", color: C.title, fontWeight: 700 }}>Lever</th>
                    <th style={{ textAlign: "left", padding: "6px 0", color: C.title, fontWeight: 700 }}>Target</th>
                  </tr>
                </thead>
                <tbody style={{ color: C.body }}>
                  <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                    <td style={{ padding: "6px 12px 6px 0", fontWeight: 600 }}>Calories</td>
                    <td style={{ padding: "6px 0" }}>Adequate to slightly surplus</td>
                  </tr>
                  <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                    <td style={{ padding: "6px 12px 6px 0", fontWeight: 600 }}>Protein</td>
                    <td style={{ padding: "6px 0" }}>1.0&ndash;1.5g per kg daily</td>
                  </tr>
                  <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                    <td style={{ padding: "6px 12px 6px 0", fontWeight: 600 }}>Sleep</td>
                    <td style={{ padding: "6px 0" }}>Upper end of age range, consistent bedtime</td>
                  </tr>
                  <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                    <td style={{ padding: "6px 12px 6px 0", fontWeight: 600 }}>Meals</td>
                    <td style={{ padding: "6px 0" }}>Regular, balanced, not skipped</td>
                  </tr>
                  <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                    <td style={{ padding: "6px 12px 6px 0", fontWeight: 600 }}>Inflammation</td>
                    <td style={{ padding: "6px 0" }}>Address gut issues, avoid ultra-processed foods</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "6px 12px 6px 0", fontWeight: 600 }}>Thyroid</td>
                    <td style={{ padding: "6px 0" }}>Test if growth is slow</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Bottom Line */}
          <section style={{ background: C.green, color: "#fff", borderRadius: 14, padding: 20, marginBottom: 16 }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: "#fff", margin: "0 0 12px" }}>The Bottom Line</h2>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.9)", lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              Growth isn&apos;t random. It&apos;s the output of a biological system you can influence.
            </p>
            <p style={{ fontSize: 13, color: "#fff", fontWeight: 700, lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              The chain: Brain &rarr; GH &rarr; Liver &rarr; IGF-1 &rarr; Growth Plates &rarr; Growth
            </p>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.9)", lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              Your job: Remove the blockers and provide the inputs. Sleep, protein, calories, low inflammation, steady nutrition.
            </p>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.9)", lineHeight: 1.6, fontFamily: F }}>
              Do this consistently, and you give your child&apos;s growth system everything it needs to reach their genetic potential.
            </p>
          </section>

          {/* References */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>References</h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
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
        <div style={{ marginTop: 28, textAlign: "center" }}>
          <Link href="/learn" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: C.green, fontWeight: 700, fontFamily: F, fontSize: 13, textDecoration: "none" }}>
            <span style={{ marginRight: 4 }}>←</span> Back to all articles
          </Link>
        </div>

      </main>
    </div>
  );
}
