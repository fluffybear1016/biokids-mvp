'use client';

import Link from 'next/link';
import Nav from '@/components/Nav';

const F = "'Courier New', Courier, monospace";
const C = {
  bg: '#fafaf9', title: '#1c1917', body: '#57534e', light: '#57534e',
  green: '#065f46', card: '#fff', border: '#e7e5e4', sigBorder: '#86efac',
};

export default function GlyphosateArticle() {
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
            <span style={{ fontSize: 11, color: C.light, fontFamily: F }}>5 min read</span>
          </div>
          <h1 style={{ fontFamily: F, fontSize: 22, fontWeight: 700, color: C.title, margin: "0 0 8px" }}>Why Oats and Grains May Be Sabotaging Your Child&apos;s Growth</h1>
          <p style={{ fontSize: 13, color: C.body, fontFamily: F, lineHeight: 1.5, margin: 0 }}>High-agency parents should think of oats and refined grains as a hormone and gut &ldquo;delivery system&rdquo; for glyphosate unless the product is explicitly screened and verified clean.</p>
        </div>

        {/* Article content */}
        <article>

          {/* The Glyphosate Problem */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>The Glyphosate Problem</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              Glyphosate is the most widely used herbicide in the world, and it shows up most heavily in oat-based and wheat-based convenience foods because these crops are often sprayed right before harvest to dry them down.
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontFamily: F }}>
              Children eat a disproportionate amount of these products per kilo of body weight, and multiple surveys have found that kids carry higher glyphosate levels than adults &mdash; largely from cereals, snack bars, crackers, and oat products marketed as &ldquo;healthy.&rdquo;
            </p>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginTop: 8, fontFamily: F }}>[Mills PJ. et al. JAMA. 2017]</p>
          </section>

          {/* How Glyphosate Blocks Growth */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>How Glyphosate Blocks Growth</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 16, fontFamily: F }}>
              From a growth perspective, glyphosate is not just a weed killer &mdash; it behaves like an endocrine-disrupting chemical and a gut disruptor, both of which strike directly at the systems that control height.
            </p>

            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>Hormone Disruption</h3>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 6, fontFamily: F }}>
              Experimental work shows that glyphosate and its commercial formulations can alter puberty timing, sex hormones, and reproductive development in animal models, with dose-dependent shifts in androgen and estrogen signaling and changes in the timing of sexual maturation.
            </p>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginBottom: 16, fontFamily: F }}>[Romano MA. et al. Reproductive Toxicology. 2012]</p>

            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>Gut Disruption</h3>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              Systematic reviews of glyphosate&apos;s effects on the gut microbiota report:
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 8px", display: "flex", flexDirection: "column", gap: 4 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span>Intestinal dysbiosis</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span>Increased intestinal permeability (&ldquo;leaky gut&rdquo;)</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span>Damage to microvilli</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span>Broad changes in energy and vitamin metabolism</li>
            </ul>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontFamily: F }}>
              These are exactly the pathways you need intact for protein absorption, IGF-1 production, and efficient bone building.
            </p>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginTop: 8, fontFamily: F }}>[Mesnage R. et al. Environmental Health. 2021]</p>
          </section>

          {/* The Human Evidence */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>The Human Evidence</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              Human data, while still emerging, point in the same direction:
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px", display: "flex", flexDirection: "column", gap: 4 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Gestational and early-life glyphosate exposure has been linked to lower birth weight, shorter gestation, and adverse early neurodevelopment</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Low birth weight is consistently associated with shorter adult height and higher risk of metabolic disease</li>
            </ul>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              These are not &ldquo;acute poisoning&rdquo; effects &mdash; they are quiet, chronic shifts in development curves that show up years later as a child who never quite reaches the genetic height you would expect.
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontFamily: F }}>
              Because glyphosate can act at extremely low doses on hormone pathways and the microbiome, the traditional &ldquo;it&apos;s under the regulatory limit, so it&apos;s fine&rdquo; framing is not adequate if your goal is optimization rather than bare-minimum safety.
            </p>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginTop: 8, fontFamily: F }}>[Parvez S. et al. Environmental Health. 2018]</p>
          </section>

          {/* What Testing Reveals */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>What Testing Reveals</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontFamily: F }}>
              Independent testing has repeatedly found that mainstream oat cereals, granolas, crackers, and snack foods aimed at children contain glyphosate in the tens to thousands of parts per billion, while certified organic versions in the same categories often test below detection.
            </p>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginTop: 8, fontFamily: F }}>[Environmental Working Group. 2018]</p>
          </section>

          {/* The Actionable Rule */}
          <section style={{ background: "#f0fdf4", borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.sigBorder}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>The Actionable Rule</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 12, fontWeight: 600, fontFamily: F }}>
              Treat all oats and refined grain products as guilty until proven otherwise.
            </p>

            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>Avoid:</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px", display: "flex", flexDirection: "column", gap: 3 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span>Oat cereals</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span>Granola and granola bars</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span>Crackers</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span>Snack products marketed to children</li>
            </ul>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              <strong>Unless:</strong> You can verify they are organic AND batch-tested for glyphosate.
            </p>

            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>Instead, build carbs around:</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 3 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Root vegetables (sweet potato, potato, carrots)</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Fruits</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Rice</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Other staples with lower documented residue profiles</li>
            </ul>
          </section>

          {/* Bottom Line */}
          <section style={{ background: C.green, color: "#fff", borderRadius: 14, padding: 20, marginBottom: 16 }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: "#fff", margin: "0 0 12px" }}>The Bottom Line</h2>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.9)", lineHeight: 1.6, fontFamily: F }}>
              Glyphosate quietly disrupts hormones and gut function &mdash; the two systems most critical for height. For a height-focused household, avoiding conventional oats and grains isn&apos;t paranoia; it&apos;s precision.
            </p>
          </section>

          {/* References */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>References</h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              <li>Mills PJ, et al. Excretion of the herbicide glyphosate in older adults between 1993 and 2016. <em>JAMA</em>. 2017;318(16):1610-1611.</li>
              <li>Romano MA, et al. Glyphosate impairs male offspring reproductive development by disrupting gonadotropin expression. <em>Reproductive Toxicology</em>. 2012;33(2):142-148.</li>
              <li>Mesnage R, et al. Use of shotgun metagenomics and metabolomics to evaluate the impact of glyphosate or Roundup MON 52276 on the gut microbiota and serum metabolome of Sprague-Dawley rats. <em>Environmental Health</em>. 2021;20(1):1-13.</li>
              <li>Parvez S, et al. Glyphosate exposure in pregnancy and shortened gestational length: a prospective Indiana birth cohort study. <em>Environmental Health</em>. 2018;17(1):1-12.</li>
              <li>Environmental Working Group. Glyphosate contamination in oat products. EWG Report. 2018.</li>
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
