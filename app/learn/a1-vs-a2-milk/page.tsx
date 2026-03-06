'use client';

import Link from 'next/link';
import Nav from '@/components/Nav';

const F = "'Courier New', Courier, monospace";
const C = {
  bg: '#fafaf9', title: '#1c1917', body: '#57534e', light: '#a8a29e',
  green: '#065f46', card: '#fff', border: '#e7e5e4', sigBorder: '#86efac',
};

export default function A1VsA2MilkArticle() {
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
            <span style={{ fontSize: 9, fontWeight: 800, color: C.green, textTransform: "uppercase", letterSpacing: 1, fontFamily: F }}>Nutrition</span>
            <span style={{ fontSize: 9, color: C.light }}>·</span>
            <span style={{ fontSize: 11, color: C.light, fontFamily: F }}>8 min read</span>
          </div>
          <h1 style={{ fontFamily: F, fontSize: 22, fontWeight: 700, color: C.title, margin: "0 0 8px" }}>A1 vs A2 Milk: Why the Type Matters</h1>
          <p style={{ fontSize: 13, color: C.body, fontFamily: F, lineHeight: 1.5, margin: 0 }}>The hidden difference in milk proteins that could be affecting your child&apos;s gut, inflammation, and height potential.</p>
        </div>

        {/* Article content */}
        <article>

          {/* The One Amino Acid */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>The One Amino Acid That Changes Everything</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              All cow&apos;s milk contains a protein called &beta;-casein. But not all &beta;-casein is the same.
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              There are two major variants:
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px", display: "flex", flexDirection: "column", gap: 4 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444", fontWeight: 700 }}>&#8226;</span><strong>A1 &beta;-casein</strong> &mdash; has histidine at position 67</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span><strong>A2 &beta;-casein</strong> &mdash; has proline at position 67</li>
            </ul>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontWeight: 600, fontFamily: F }}>
              One amino acid difference. Massive downstream effects.
            </p>
          </section>

          {/* What Happens When You Digest A1 Milk */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>What Happens When You Digest A1 Milk</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              When A1 &beta;-casein hits your digestive system, gastric and intestinal enzymes cleave it to release a peptide called <strong>&beta;-casomorphin-7 (BCM-7)</strong>.
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              BCM-7 is an opioid peptide that can:
            </p>
            <ul className="space-y-1 mb-2">
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span>Bind &mu;-opioid receptors in the gut</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span>Increase intestinal mucus production</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span>Trigger inflammatory responses</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span>Increase intestinal permeability (&ldquo;leaky gut&rdquo;)</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span>Enter the bloodstream under conditions of higher permeability</li>
            </ul>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginBottom: 12, fontFamily: F }}>[Ul Haq MR. et al. Nutrition Reviews. 2014]</p>
            <div style={{ background: "#f0fdf4", border: `1px solid ${C.sigBorder}`, borderRadius: 10, padding: 12 }}>
              <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontWeight: 600, fontFamily: F }}>
                A2 milk is different: The proline at position 67 alters the peptide bond, limiting proteolytic release. A2 digestion generates little or no BCM-7.
              </p>
            </div>
          </section>

          {/* The Human Evidence - Adults */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>The Human Evidence</h2>
            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 8px" }}>Adults with Milk Sensitivity</h3>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              In a randomized crossover trial of Chinese adults with self-reported milk intolerance:
            </p>
            <h4 style={{ fontFamily: F, fontSize: 12, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>Conventional A1/A2 milk caused:</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px", display: "flex", flexDirection: "column", gap: 3 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span>Increased gastrointestinal symptoms</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span>Delayed intestinal transit</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span>Elevated serum inflammatory markers</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span>Raised circulating BCM-7 concentrations</li>
            </ul>
            <h4 style={{ fontFamily: F, fontSize: 12, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>A2-only milk:</h4>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-medium mb-1">None of these effects.</p>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", fontFamily: F }}>[Ho S. et al. Nutrition Journal. 2014]</p>
          </section>

          {/* Children Show the Same Pattern */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h3 style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: C.title, margin: "0 0 8px" }}>Children Show the Same Pattern</h3>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              A similar crossover study in preschool-age Chinese children predisposed to digestive discomfort found that A1-containing milk led to:
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px", display: "flex", flexDirection: "column", gap: 3 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span>More gastrointestinal symptoms</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span>Altered fecal consistency</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span>Higher inflammatory markers</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span>Poorer performance on cognitive tests</li>
            </ul>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-medium mb-1">A2-only milk avoided these issues.</p>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", fontFamily: F }}>[He M. et al. Journal of Pediatric Gastroenterology and Nutrition. 2017]</p>
          </section>

          {/* A2 Milk and Growth */}
          <section style={{ background: "#fffbeb", borderRadius: 14, padding: 20, marginBottom: 16, border: "1px solid #fde68a" }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>A2 Milk and Growth: The Direct Evidence</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              This is where it gets exciting for height-focused parents.
            </p>
            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 8px" }}>The Stunted Children Trial</h3>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              A 12-week trial in stunted children (12&ndash;36 months old) supplemented with A2 cow milk versus conventional milk found:
            </p>
            <h4 style={{ fontFamily: F, fontSize: 12, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>A2 milk group showed:</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px", display: "flex", flexDirection: "column", gap: 3 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Significant improvements in weight-for-age z-scores</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Significant improvements in height-for-age z-scores</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Increased serum IGF-1</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Improved nutritional biomarkers</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Declined inflammatory biomarkers</li>
            </ul>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-medium mb-1">
              Conventional milk controls: Did not experience the same magnitude of catch-up growth.
            </p>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", fontFamily: F }}>[Ramadhan MR. et al. Nutrients. 2023]</p>
          </section>

          {/* Why A2 Milk Supports Better Growth */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>Why A2 Milk Supports Better Growth</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              The pattern of higher IGF-1 and better linear growth in A2 milk makes biological sense:
            </p>
            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 8px" }}>The Inflammation-Growth Connection</h3>
            <ol className="space-y-2 list-decimal list-inside mb-2">
              <li style={{ fontSize: 13, color: C.body, fontFamily: F }}><strong>A1 milk &rarr; BCM-7 &rarr; gut inflammation</strong></li>
              <li style={{ fontSize: 13, color: C.body, fontFamily: F }}><strong>Gut inflammation &rarr; increased intestinal permeability</strong></li>
              <li style={{ fontSize: 13, color: C.body, fontFamily: F }}><strong>Increased permeability &rarr; impaired nutrient absorption</strong></li>
              <li style={{ fontSize: 13, color: C.body, fontFamily: F }}><strong>Systemic inflammation &rarr; elevated TNF-&alpha; and other cytokines</strong></li>
              <li style={{ fontSize: 13, color: C.body, fontFamily: F }}><strong>Cytokines &rarr; hepatic GH resistance &rarr; blunted IGF-1 production</strong></li>
              <li style={{ fontSize: 13, color: C.body, fontFamily: F }}><strong>Blunted IGF-1 &rarr; reduced growth plate activity &rarr; less height gain</strong></li>
            </ol>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginBottom: 16, fontFamily: F }}>[Jianqin S. et al. Nutrition Journal. 2016]</p>

            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>The A2 Advantage</h3>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              By reducing BCM-7 exposure, A2 milk:
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 3 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Preserves gut barrier integrity</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Lowers intestinal and systemic inflammation</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Creates a more favorable environment for GH-to-IGF-1 conversion</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Supports efficient nutrient delivery to growth plates</li>
            </ul>
          </section>

          {/* Which Cows Produce Which Milk? */}
          <section style={{ background: "#f0fdf4", borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.sigBorder}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>Which Cows Produce Which Milk?</h2>

            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>High A1 Breeds (Common in North America):</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px", display: "flex", flexDirection: "column", gap: 3 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span>Holstein (most commercial dairy)</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span>Friesian</li>
            </ul>

            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>High A2 Breeds:</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px", display: "flex", flexDirection: "column", gap: 3 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Jersey</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Guernsey</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Brown Swiss</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Most heritage breeds</li>
            </ul>

            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>Naturally A2:</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px", display: "flex", flexDirection: "column", gap: 3 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Goat milk</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Sheep milk</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Human breast milk</li>
            </ul>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontFamily: F }}>
              Human and small ruminant milks contain &beta;-casein variants structurally similar to bovine A2 &mdash; suggesting A2 may be closer to the evolutionary norm for early-life nutrition.
            </p>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginTop: 8, fontFamily: F }}>[Brooke-Taylor S. et al. Nutrition Reviews. 2017]</p>
          </section>

          {/* The Practical Protocol */}
          <section style={{ background: "#f0fdf4", borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.sigBorder}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>The Practical Protocol</h2>

            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>Option 1: Switch to A2 Milk</h3>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 4, fontFamily: F }}>
              Look for milk specifically labeled &ldquo;A2&rdquo; &mdash; these come from cows genetically tested to produce only A2 &beta;-casein.
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              <strong>Brands:</strong> a2 Milk&reg; and others now widely available.
            </p>

            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>Option 2: Choose A2-Dominant Breeds</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px", display: "flex", flexDirection: "column", gap: 3 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Jersey milk</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Guernsey milk</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Raw milk from heritage breeds (where legal and safe)</li>
            </ul>

            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>Option 3: Alternative Milks</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px", display: "flex", flexDirection: "column", gap: 3 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Goat milk (naturally A2)</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Sheep milk (naturally A2)</li>
            </ul>

            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>What to Avoid:</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 3 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span>Standard supermarket milk (mostly Holstein, high A1)</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span>&ldquo;Organic&rdquo; doesn&apos;t mean A2 &mdash; organic Holstein milk is still A1</li>
            </ul>
          </section>

          {/* Who Benefits Most? */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>Who Benefits Most?</h2>
            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>High priority for A2:</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px", display: "flex", flexDirection: "column", gap: 3 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Children with digestive issues after drinking milk</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Children with eczema, allergies, or inflammatory conditions</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Stunted or slow-growing children</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Any child drinking significant amounts of milk daily</li>
            </ul>
            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>Still beneficial for:</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 3 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>All children &mdash; less inflammatory load is always better for growth</li>
            </ul>
          </section>

          {/* Bottom Line */}
          <section style={{ background: C.green, color: "#fff", borderRadius: 14, padding: 20, marginBottom: 16 }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: "#fff", margin: "0 0 12px" }}>The Bottom Line</h2>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.9)", lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              Not all milk is created equal.
            </p>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.9)", lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              A1 milk releases an inflammatory peptide (BCM-7) that can damage the gut, impair nutrient absorption, and blunt the GH-IGF-1 axis. A2 milk avoids this entirely &mdash; and in clinical trials, stunted children on A2 milk showed better growth, higher IGF-1, and improved nutritional status.
            </p>
            <p style={{ fontSize: 13, color: "#fff", fontWeight: 700, lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              The simple switch: Replace conventional milk with A2 milk. Same nutrition, none of the inflammatory baggage.
            </p>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.9)", lineHeight: 1.6, fontFamily: F }}>
              For a child drinking 2&ndash;3 glasses of milk per day, this single change could meaningfully reduce growth-limiting inflammation over years of development.
            </p>
          </section>

          {/* References */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>References</h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              <li>Ul Haq MR, et al. Comparative evaluation of cow &beta;-casein variants (A1/A2) consumption on Th2-mediated inflammatory response in mouse gut. <em>Nutrition Reviews</em>. 2014;72(12):955-962.</li>
              <li>Ho S, et al. Comparative effects of A1 versus A2 beta-casein on gastrointestinal measures: a blinded randomised cross-over pilot study. <em>Nutrition Journal</em>. 2014;13:e1259.</li>
              <li>He M, et al. Effects of cow&apos;s milk beta-casein variants on symptoms of milk intolerance in Chinese adults. <em>Journal of Pediatric Gastroenterology and Nutrition</em>. 2017;65(1):e1-e7.</li>
              <li>Ramadhan MR, et al. Effect of A2 beta-casein milk on growth and nutritional status in stunted children. <em>Nutrients</em>. 2023;15(7):1621.</li>
              <li>Jianqin S, et al. Effects of milk containing only A2 beta casein versus milk containing both A1 and A2 beta casein proteins on gastrointestinal physiology, symptoms of discomfort, and cognitive behavior. <em>Nutrition Journal</em>. 2016;15:35.</li>
              <li>Brooke-Taylor S, et al. Systematic review of the gastrointestinal effects of A1 compared with A2 &beta;-casein. <em>Nutrition Reviews</em>. 2017;8(9):739-755.</li>
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
