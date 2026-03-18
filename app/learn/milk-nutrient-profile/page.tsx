'use client';

import Link from 'next/link';
import Nav from '@/components/Nav';

const F = "'Courier New', Courier, monospace";
const C = {
  bg: '#fafaf9', title: '#1c1917', body: '#57534e', light: '#57534e',
  green: '#065f46', card: '#fff', border: '#e7e5e4', sigBorder: '#86efac',
};

export default function MilkNutrientProfileArticle() {
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
            <span style={{ fontSize: 11, color: C.light, fontFamily: F }}>9 min read</span>
          </div>
          <h1 style={{ fontFamily: F, fontSize: 22, fontWeight: 700, color: C.title, margin: "0 0 8px" }}>Milk&apos;s Nutrient Profile: The Ultimate Growth Food</h1>
          <p style={{ fontSize: 13, color: C.body, fontFamily: F, lineHeight: 1.5, margin: 0 }}>A complete breakdown of what&apos;s actually in milk &mdash; and why quality matters.</p>
        </div>

        {/* Article content */}
        <article>

          {/* The Big Picture */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>The Big Picture</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              Raw milk contains all essential minerals, all 20 standard amino acids (making it a complete protein), a broad spectrum of fatty acids, dozens of functional enzymes, and live bacteria.
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              Not all milk is created equal. Both the cow&apos;s diet and the processing method substantially change this matrix.
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontFamily: F }}>
              High-quality, grass-fed milk is best understood as a whole-food suspension of proteins, lipids, carbohydrates, minerals, vitamins, and bioactive factors that together support child growth, bone development, and immune function.
            </p>
          </section>

          {/* Protein */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>Protein: The Growth Foundation</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              Bovine milk provides roughly <strong>3&ndash;4g protein per 100ml</strong>, composed of:
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px", display: "flex", flexDirection: "column", gap: 3 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span><strong>80% caseins</strong> (slow-digesting)</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span><strong>20% whey proteins</strong> (fast-digesting)</li>
            </ul>

            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>Why This Matters for Growth</h3>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              Milk contains particularly high amounts of lysine, leucine, and other branched-chain amino acids &mdash; critical for muscle protein synthesis and linear growth.
            </p>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginBottom: 16, fontFamily: F }}>[Millward DJ. et al. American Journal of Clinical Nutrition. 2008]</p>

            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>The Two Protein Types</h3>
            <div className="space-y-4 mb-4">
              <div>
                <h4 className="font-semibold text-black text-sm mb-1">Caseins (&alpha;s1, &alpha;s2, &beta;, and &kappa;):</h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 3 }}>
                  <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Form micelles that carry calcium and phosphate</li>
                  <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Deliver slow, sustained amino acid release</li>
                  <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Support overnight growth processes</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-black text-sm mb-1">Whey proteins (&beta;-lactoglobulin, &alpha;-lactalbumin, immunoglobulins):</h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 3 }}>
                  <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Rapidly digested</li>
                  <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Rich in branched-chain amino acids</li>
                  <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>High in sulfur-containing amino acids</li>
                </ul>
              </div>
            </div>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontFamily: F }}>
              This combination makes milk one of the highest-quality protein sources by classical measures (PDCAAS and DIAAS) &mdash; especially relevant for children whose growth and IGF-1 production depend on regular access to complete protein.
            </p>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginTop: 8, fontFamily: F }}>[Hoppe C. et al. American Journal of Clinical Nutrition. 2004]</p>
          </section>

          {/* Minerals */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>Minerals: The Bone Builders</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              Milk delivers a broad panel of macro- and trace minerals:
            </p>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <h3 style={{ fontFamily: F, fontSize: 12, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>Macro-minerals:</h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 3 }}>
                  <li className="flex gap-2 text-sm text-gray-700"><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Calcium</li>
                  <li className="flex gap-2 text-sm text-gray-700"><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Phosphorus</li>
                  <li className="flex gap-2 text-sm text-gray-700"><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Magnesium</li>
                  <li className="flex gap-2 text-sm text-gray-700"><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Potassium</li>
                  <li className="flex gap-2 text-sm text-gray-700"><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Sodium</li>
                </ul>
              </div>
              <div>
                <h3 style={{ fontFamily: F, fontSize: 12, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>Trace minerals:</h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 3 }}>
                  <li className="flex gap-2 text-sm text-gray-700"><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Zinc</li>
                  <li className="flex gap-2 text-sm text-gray-700"><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Iodine</li>
                  <li className="flex gap-2 text-sm text-gray-700"><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Selenium</li>
                  <li className="flex gap-2 text-sm text-gray-700"><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Iron (small amounts)</li>
                </ul>
              </div>
            </div>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginBottom: 16, fontFamily: F }}>[Gaucheron F. Journal of the American College of Nutrition. 2011]</p>

            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>Bioavailability Advantage</h3>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              Calcium and phosphorus in milk are <strong>highly bioavailable</strong> due to incorporation in casein micelles and the presence of lactose (which enhances calcium absorption). This is why milk calcium is absorbed better than calcium from most plant sources.
            </p>

            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>Key Minerals for Growth:</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 4 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span><strong>Zinc:</strong> Supports immune function and IGF-1 receptor signaling</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span><strong>Iodine:</strong> Essential for thyroid function (which regulates the entire growth axis)</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span><strong>Selenium:</strong> Contributes to antioxidant defense and thyroid hormone metabolism</li>
            </ul>
          </section>

          {/* Fats */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>Fats: More Than Just Calories</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              The fat fraction of whole milk contains a complex mixture:
            </p>
            <ul className="space-y-1 mb-2">
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Short-chain fatty acids (C4:0, C6:0)</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Medium-chain fatty acids</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Long-chain fatty acids</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Saturated, monounsaturated, and polyunsaturated types</li>
            </ul>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginBottom: 16, fontFamily: F }}>[O&apos;Callaghan TF. et al. Scientific Reports. 2020]</p>

            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>Why Fat Matters</h3>
            <ul className="space-y-1 mb-5">
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Provide energy for growth</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Serve as structural components of cell membranes</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Carry fat-soluble vitamins (A, D, E, K)</li>
            </ul>

            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>The Grass-Fed Advantage</h3>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              Milk fat from grass-fed cows has:
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 8px", display: "flex", flexDirection: "column", gap: 3 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span><strong>Higher n-3 (omega-3) fatty acids</strong></li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span><strong>3&ndash;5&times; more conjugated linoleic acid (CLA)</strong></li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span><strong>Better n-6:n-3 ratio</strong></li>
            </ul>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontFamily: F }}>
              CLA has been associated with anti-inflammatory and immunomodulatory effects in experimental models.
            </p>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginTop: 8, fontFamily: F }}>[Dhiman TR. et al. Journal of Dairy Science. 1999]</p>
          </section>

          {/* Vitamins */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>Vitamins: Fat-Soluble and Water-Soluble</h2>

            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 8px" }}>Fat-Soluble Vitamins (in the cream):</h3>
            <div style={{ overflowX: "auto", marginBottom: 12 }}>
              <table style={{ width: "100%", fontSize: 12, fontFamily: F, borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                    <th style={{ textAlign: "left", padding: "6px 12px 6px 0", color: C.title, fontWeight: 700 }}>Vitamin</th>
                    <th style={{ textAlign: "left", padding: "6px 0", color: C.title, fontWeight: 700 }}>Function</th>
                  </tr>
                </thead>
                <tbody style={{ color: C.body }}>
                  <tr style={{ borderBottom: "1px solid #f5f5f4" }}>
                    <td style={{ padding: "6px 12px 6px 0", fontWeight: 600 }}>Vitamin A</td>
                    <td style={{ padding: "6px 0" }}>Vision, immune function, growth</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #f5f5f4" }}>
                    <td style={{ padding: "6px 12px 6px 0", fontWeight: 600 }}>Vitamin D</td>
                    <td style={{ padding: "6px 0" }}>Calcium absorption, bone growth</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #f5f5f4" }}>
                    <td style={{ padding: "6px 12px 6px 0", fontWeight: 600 }}>Vitamin E</td>
                    <td style={{ padding: "6px 0" }}>Antioxidant protection</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "6px 12px 6px 0", fontWeight: 600 }}>Vitamin K</td>
                    <td style={{ padding: "6px 0" }}>Bone mineralization, blood clotting</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 16, fontFamily: F }}>
              Concentrations are influenced by feed type (pasture vs. stored forage), season, and fat content of the milk.
            </p>

            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 8px" }}>Water-Soluble Vitamins:</h3>
            <div className="overflow-x-auto mb-2">
              <table style={{ width: "100%", fontSize: 12, fontFamily: F, borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                    <th style={{ textAlign: "left", padding: "6px 12px 6px 0", color: C.title, fontWeight: 700 }}>Vitamin</th>
                    <th style={{ textAlign: "left", padding: "6px 0", color: C.title, fontWeight: 700 }}>Function</th>
                  </tr>
                </thead>
                <tbody style={{ color: C.body }}>
                  <tr style={{ borderBottom: "1px solid #f5f5f4" }}>
                    <td style={{ padding: "6px 12px 6px 0", fontWeight: 600 }}>Riboflavin (B2)</td>
                    <td style={{ padding: "6px 0" }}>Energy metabolism</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #f5f5f4" }}>
                    <td style={{ padding: "6px 12px 6px 0", fontWeight: 600 }}>Vitamin B12</td>
                    <td style={{ padding: "6px 0" }}>Neural development, red blood cells</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #f5f5f4" }}>
                    <td style={{ padding: "6px 12px 6px 0", fontWeight: 600 }}>Vitamin B6</td>
                    <td style={{ padding: "6px 0" }}>Protein metabolism</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "6px 12px 6px 0", fontWeight: 600 }}>Folate</td>
                    <td style={{ padding: "6px 0" }}>Cell division, growth</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontFamily: F }}>
              These contribute significantly to recommended intakes in children.
            </p>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginTop: 8, fontFamily: F }}>[Haug A. et al. Lipids in Health and Disease. 2007]</p>
          </section>

          {/* Bioactive Proteins */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>Bioactive Proteins: The Immune Components</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              Raw milk carries immunologically active proteins:
            </p>
            <div className="space-y-4 mb-4">
              <div>
                <h3 className="font-semibold text-black text-sm mb-1">Lactoferrin:</h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 3 }}>
                  <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Binds iron</li>
                  <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Antimicrobial activity</li>
                  <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Supports immune function</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-black text-sm mb-1">Lysozyme:</h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 3 }}>
                  <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Lyses bacterial cell walls</li>
                  <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Natural antimicrobial</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-black text-sm mb-1">Immunoglobulins (IgG, IgA, IgM):</h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 3 }}>
                  <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Provide passive immune protection</li>
                  <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Support gut barrier function</li>
                </ul>
              </div>
            </div>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginBottom: 12, fontFamily: F }}>[L&ouml;nnerdal B. American Journal of Clinical Nutrition. 2003]</p>

            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>Processing Impact</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 3 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Standard pasteurization reduces but doesn&apos;t eliminate activity</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>UHT treatment has more marked effects</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Raw milk retains full activity (but carries safety considerations)</li>
            </ul>
          </section>

          {/* Enzymes and Microbiota */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>Enzymes and Microbiota</h2>

            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>Endogenous Enzymes</h3>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              Raw milk contains dozens of functional enzymes:
            </p>
            <ul className="space-y-1 mb-5">
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Alkaline phosphatase</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Lipoprotein lipase</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Proteases</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Peroxidases</li>
            </ul>

            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>Living Microbiota</h3>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              Raw milk hosts beneficial bacteria:
            </p>
            <ul className="space-y-1 mb-2">
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Lactobacillus</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Lactococcus</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Leuconostoc</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Bifidobacterium species</li>
            </ul>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginBottom: 12, fontFamily: F }}>[Quigley L. et al. FEMS Microbiology Reviews. 2013]</p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              Some research suggests raw milk consumption is associated with lower risk of atopic diseases in farm children, possibly via these microbial and immunomodulatory components.
            </p>
            <div style={{ background: "#fffbeb", borderRadius: 10, padding: 12, border: "1px solid #fde68a" }}>
              <p style={{ fontSize: 13, color: "#78350f", lineHeight: 1.6, fontWeight: 600, fontFamily: F }}>
                Important: Public health authorities recommend pasteurization to prevent foodborne infections, which also reduces enzymatic activities and viable beneficial bacteria.
              </p>
            </div>
          </section>

          {/* How Processing Changes Milk */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>How Processing Changes Milk</h2>
            <div style={{ overflowX: "auto", marginBottom: 12 }}>
              <table style={{ width: "100%", fontSize: 12, fontFamily: F, borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                    <th style={{ textAlign: "left", padding: "6px 12px 6px 0", color: C.title, fontWeight: 700 }}>Processing</th>
                    <th style={{ textAlign: "left", padding: "6px 0", color: C.title, fontWeight: 700 }}>Effect</th>
                  </tr>
                </thead>
                <tbody style={{ color: C.body }}>
                  <tr style={{ borderBottom: "1px solid #f5f5f4" }}>
                    <td style={{ padding: "6px 12px 6px 0", fontWeight: 600 }}>Pasteurization (72&deg;C/15s)</td>
                    <td style={{ padding: "6px 0" }}>Minimal impact on protein/minerals; partially reduces heat-labile vitamins; inactivates enzymes and most microflora</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #f5f5f4" }}>
                    <td style={{ padding: "6px 12px 6px 0", fontWeight: 600 }}>Homogenization</td>
                    <td style={{ padding: "6px 0" }}>Disrupts fat globules; modifies gastric emptying; little effect on total nutrients</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "6px 12px 6px 0", fontWeight: 600 }}>UHT (135&ndash;150&deg;C)</td>
                    <td style={{ padding: "6px 0" }}>Extensive protein denaturation; greater vitamin loss; near-sterile, long shelf life</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontFamily: F }}>
              <strong>Across all processing:</strong> Macronutrients (protein, fat, lactose) and most minerals remain largely intact. The main differences are in enzymatic, microbial, and some vitamin/peptide functions.
            </p>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginTop: 8, fontFamily: F }}>[Claeys WL. et al. Food Control. 2013]</p>
          </section>

          {/* Quality Hierarchy */}
          <section style={{ background: "#f0fdf4", borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.sigBorder}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>Quality Hierarchy: Best to Worst</h2>
            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 8px" }}>For Maximum Nutrient Density:</h3>
            <ol className="space-y-2 list-decimal list-inside mb-5">
              <li style={{ fontSize: 13, color: C.body, fontFamily: F }}><strong>Raw grass-fed milk</strong> (from tested, trusted sources)</li>
              <li style={{ fontSize: 13, color: C.body, fontFamily: F }}><strong>Pasteurized grass-fed whole milk</strong></li>
              <li style={{ fontSize: 13, color: C.body, fontFamily: F }}><strong>Pasteurized organic whole milk</strong></li>
              <li style={{ fontSize: 13, color: C.body, fontFamily: F }}><strong>Conventional whole milk</strong></li>
              <li style={{ fontSize: 13, color: C.body, fontFamily: F }}><strong>Reduced-fat milk</strong></li>
              <li style={{ fontSize: 13, color: C.body, fontFamily: F }}><strong>UHT/ultra-pasteurized milk</strong></li>
            </ol>

            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>Why Grass-Fed Matters:</h3>
            <ul className="space-y-1 mb-5">
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Higher omega-3 fatty acids</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>More CLA</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>More fat-soluble vitamins</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Better fatty acid ratios</li>
            </ul>

            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>Why Whole Milk Matters:</h3>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              Reducing fat content without fortification lowers:
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 3 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span>Vitamins A, D, E, K</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span>Long-chain fatty acids critical for neural and hormonal development</li>
            </ul>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginTop: 8, fontFamily: F }}>[Benbrook CM. et al. PLOS ONE. 2013]</p>
          </section>

          {/* Practical Recommendations */}
          <section style={{ background: "#f0fdf4", borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.sigBorder}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>Practical Recommendations</h2>

            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 8px" }}>Daily Milk Targets by Age:</h3>
            <div className="overflow-x-auto mb-5">
              <table style={{ width: "100%", fontSize: 12, fontFamily: F, borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${C.sigBorder}` }}>
                    <th style={{ textAlign: "left", padding: "6px 12px 6px 0", color: C.title, fontWeight: 700 }}>Age</th>
                    <th style={{ textAlign: "left", padding: "6px 0", color: C.title, fontWeight: 700 }}>Amount</th>
                  </tr>
                </thead>
                <tbody style={{ color: C.body }}>
                  <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                    <td style={{ padding: "6px 12px 6px 0", fontWeight: 600 }}>1&ndash;2 years</td>
                    <td style={{ padding: "6px 0" }}>16&ndash;24 oz</td>
                  </tr>
                  <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                    <td style={{ padding: "6px 12px 6px 0", fontWeight: 600 }}>3&ndash;5 years</td>
                    <td style={{ padding: "6px 0" }}>16&ndash;20 oz</td>
                  </tr>
                  <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                    <td style={{ padding: "6px 12px 6px 0", fontWeight: 600 }}>6&ndash;9 years</td>
                    <td style={{ padding: "6px 0" }}>16&ndash;24 oz</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "6px 12px 6px 0", fontWeight: 600 }}>10+ years</td>
                    <td style={{ padding: "6px 0" }}>24&ndash;32 oz</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>Quality Priorities:</h3>
            <ol style={{ padding: 0, margin: 0, paddingLeft: 16, display: "flex", flexDirection: "column", gap: 4 }}>
              <li style={{ fontSize: 13, color: C.body, fontFamily: F }}><strong>Always whole milk</strong> &mdash; never reduced fat for growing children</li>
              <li style={{ fontSize: 13, color: C.body, fontFamily: F }}><strong>Grass-fed when possible</strong> &mdash; better fatty acid profile</li>
              <li style={{ fontSize: 13, color: C.body, fontFamily: F }}><strong>A2 milk if available</strong> &mdash; less inflammatory (<Link href="/learn/a1-vs-a2-milk" className="text-forest underline">see our A1 vs A2 article</Link>)</li>
              <li style={{ fontSize: 13, color: C.body, fontFamily: F }}><strong>Avoid UHT</strong> &mdash; most nutrient degradation</li>
              <li style={{ fontSize: 13, color: C.body, fontFamily: F }}><strong>Raw milk only from trusted, tested sources</strong> &mdash; if legal and safe in your area</li>
            </ol>
          </section>

          {/* Bottom Line */}
          <section style={{ background: C.green, color: "#fff", borderRadius: 14, padding: 20, marginBottom: 16 }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: "#fff", margin: "0 0 12px" }}>The Bottom Line</h2>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed mb-3">
              High-quality whole milk &mdash; especially from grass-fed cows &mdash; provides:
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px", display: "flex", flexDirection: "column", gap: 3 }}>
              <li className="flex gap-2 text-sm sm:text-base text-white/90"><span>&#10003;</span>Complete amino acid profile</li>
              <li className="flex gap-2 text-sm sm:text-base text-white/90"><span>&#10003;</span>Broad, bioavailable mineral spectrum</li>
              <li className="flex gap-2 text-sm sm:text-base text-white/90"><span>&#10003;</span>Complex, favorable fatty acid profile</li>
              <li className="flex gap-2 text-sm sm:text-base text-white/90"><span>&#10003;</span>Multiple bioactive proteins and peptides</li>
            </ul>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.9)", lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              Processing for safety changes some components, but even processed whole milk remains <strong>one of the most nutrient-dense single foods in a child&apos;s diet.</strong>
            </p>
            <p className="text-sm sm:text-base text-white font-semibold leading-relaxed">
              For growth optimization, milk isn&apos;t optional &mdash; it&apos;s foundational.
            </p>
          </section>

          {/* References */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>References</h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              <li>Millward DJ, et al. Protein quality assessment: impact of expanding understanding of protein and amino acid needs for optimal health. <em>American Journal of Clinical Nutrition</em>. 2008;87(5):1576S-1581S.</li>
              <li>Hoppe C, et al. High intakes of milk, but not meat, increase s-insulin and insulin resistance in 8-year-old boys. <em>American Journal of Clinical Nutrition</em>. 2004;80(2):447-452.</li>
              <li>Gaucheron F. Milk and dairy products: a unique micronutrient combination. <em>Journal of the American College of Nutrition</em>. 2011;30(sup5):470S-476S.</li>
              <li>O&apos;Callaghan TF, et al. Effect of pasture versus indoor feeding systems on quality characteristics, nutritional composition, and sensory and volatile properties of full-fat Cheddar cheese. <em>Scientific Reports</em>. 2020;10:1-13.</li>
              <li>Dhiman TR, et al. Conjugated linoleic acid content of milk from cows fed different diets. <em>Journal of Dairy Science</em>. 1999;82(10):2146-2156.</li>
              <li>Haug A, et al. Bovine milk in human nutrition &ndash; a review. <em>Lipids in Health and Disease</em>. 2007;6:25.</li>
              <li>L&ouml;nnerdal B. Nutritional and physiologic significance of human milk proteins. <em>American Journal of Clinical Nutrition</em>. 2003;77(6):1537S-1543S.</li>
              <li>Quigley L, et al. The complex microbiota of raw milk. <em>FEMS Microbiology Reviews</em>. 2013;37(5):664-698.</li>
              <li>Claeys WL, et al. Raw or heated cow milk consumption: review of risks and benefits. <em>Food Control</em>. 2013;31(1):251-262.</li>
              <li>Benbrook CM, et al. Organic production enhances milk nutritional quality by shifting fatty acid composition. <em>PLOS ONE</em>. 2013;8(12):e82429.</li>
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
