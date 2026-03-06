'use client';

import Link from 'next/link';
import Nav from '@/components/Nav';

const F = "'Courier New', Courier, monospace";
const C = {
  bg: '#fafaf9', title: '#1c1917', body: '#57534e', light: '#a8a29e',
  green: '#065f46', card: '#fff', border: '#e7e5e4', sigBorder: '#86efac',
};

export default function GlycineArticle() {
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
          <h1 style={{ fontFamily: F, fontSize: 22, fontWeight: 700, color: C.title, margin: "0 0 8px" }}>Glycine: The Secret Weapon</h1>
          <p style={{ fontSize: 13, color: C.body, fontFamily: F, lineHeight: 1.5, margin: 0 }}>How the simplest amino acid can boost growth hormone, deepen sleep, and build stronger bones.</p>
        </div>

        {/* Article content */}
        <article>

          {/* What Is Glycine? */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>What Is Glycine?</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              Glycine is the simplest amino acid &mdash; and one of the most underrated tools for growth optimization.
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              It&apos;s emerging as a central regulator of:
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px", display: "flex", flexDirection: "column", gap: 3 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Skeletal muscle growth</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Collagen and bone formation</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Sleep quality</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Growth hormone (GH) release</li>
            </ul>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontFamily: F }}>
              And most children aren&apos;t getting enough of it.
            </p>
          </section>

          {/* Glycine and Sleep */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>Glycine and Sleep</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              Evening intake of glycine (typically 3g orally) before bedtime has been shown to:
            </p>
            <ul className="space-y-1 mb-2">
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Improve subjective sleep quality</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Improve next-day performance</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Facilitate sleep onset</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Promote deeper, more restorative sleep stages</li>
            </ul>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginBottom: 12, fontFamily: F }}><a href="https://pubmed.ncbi.nlm.nih.gov/25533534/" target="_blank" rel="noopener noreferrer" className="underline hover:text-forest/70">[Kawai N, et al. Neuropsychopharmacology. 2015]</a></p>
            <div style={{ background: "#fffbeb", borderRadius: 10, padding: 12, border: "1px solid #fde68a" }}>
              <p style={{ fontSize: 13, color: "#78350f", lineHeight: 1.6, fontWeight: 600, fontFamily: F }}>
                Why this matters for growth: Deep slow-wave sleep is when maximal nocturnal GH secretion occurs. Better sleep architecture = more GH pulses = more growth signal.
              </p>
            </div>
          </section>

          {/* Glycine and Growth Hormone */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>Glycine and Growth Hormone</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              Classic infusion studies demonstrate that glycine administration directly stimulates GH release in humans.
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 6, fontFamily: F }}>
              In normal adults, intravenous glycine (4&ndash;12g) produces a significant and dose-dependent rise in plasma GH &mdash; several-fold above baseline.
            </p>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginBottom: 12, fontFamily: F }}><a href="https://pubmed.ncbi.nlm.nih.gov/7358501/" target="_blank" rel="noopener noreferrer" className="underline hover:text-forest/70">[Kasai K, et al. Metabolism. 1980]</a></p>
            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>The double benefit:</h3>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              Pre-sleep glycine from bone broth, gelatin, or collagen-rich foods could act both by:
            </p>
            <ol style={{ padding: 0, margin: 0, paddingLeft: 16, display: "flex", flexDirection: "column", gap: 4 }}>
              <li style={{ fontSize: 13, color: C.body, fontFamily: F }}>Enhancing slow-wave sleep</li>
              <li style={{ fontSize: 13, color: C.body, fontFamily: F }}>Directly augmenting GH output during that window</li>
            </ol>
          </section>

          {/* Glycine and Muscle Growth */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>Glycine and Muscle Growth</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              At the cellular level, glycine is a true anabolic effector in muscle.
            </p>
            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>What the research shows:</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px", display: "flex", flexDirection: "column", gap: 3 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Glycine dose-dependently stimulates protein synthesis</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Glycine inhibits protein degradation</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Glycine preserves muscle under catabolic stress</li>
            </ul>
            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>The mechanism:</h3>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 6, fontFamily: F }}>
              Glycine activates mTORC1 &mdash; the master switch for muscle protein synthesis &mdash; and maintains it even under inflammatory or nutrient stress.
            </p>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginBottom: 12, fontFamily: F }}><a href="https://pubmed.ncbi.nlm.nih.gov/28337245/" target="_blank" rel="noopener noreferrer" className="underline hover:text-forest/70">[Razak MA, et al. Oxidative Medicine and Cellular Longevity. 2017]</a></p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              In animal studies, dietary glycine supplementation:
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 3 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Activates mTORC1 in skeletal muscle</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Restores the anabolic response to leucine</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Protects against muscle wasting</li>
            </ul>
          </section>

          {/* Glycine and Bone Growth */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>Glycine and Bone Growth</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              Glycine is indispensable for collagen biosynthesis &mdash; and collagen is the scaffold on which bones are built.
            </p>
            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>The numbers:</h3>
            <ul className="space-y-1 mb-2">
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Type I collagen constitutes about 90% of the organic matrix of bone</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Glycine is required at every third residue in collagen&apos;s triple helix</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Glycine is the most abundant amino acid in collagen</li>
            </ul>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginBottom: 12, fontFamily: F }}><a href="https://pubmed.ncbi.nlm.nih.gov/29559876/" target="_blank" rel="noopener noreferrer" className="underline hover:text-forest/70">[de Paz-Lugo P, et al. Amino Acids. 2018]</a></p>

            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>What happens with adequate glycine:</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px", display: "flex", flexDirection: "column", gap: 3 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Increased collagen synthesis by cartilage cells</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Up-regulation of bone formation markers (Alp, Osx, Runx2, Ocn)</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Enhanced collagen deposition</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Improved bone regeneration</li>
            </ul>
            <div style={{ background: "#fef2f2", borderRadius: 10, padding: 12, border: "1px solid #fecaca" }}>
              <p style={{ fontSize: 13, color: "#7f1d1d", lineHeight: 1.6, fontWeight: 600, fontFamily: F }}>
                Without adequate glycine: The body cannot efficiently construct or repair the collagen scaffold on which bone mineralization and longitudinal growth depend.
              </p>
            </div>
          </section>

          {/* The Collagen Gap */}
          <section style={{ background: "#fffbeb", borderRadius: 14, padding: 20, marginBottom: 16, border: "1px solid #fde68a" }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>The Collagen Gap</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              Collagen is 33% glycine &mdash; every third amino acid in the triple helix must be glycine. There is no substitute.
            </p>
            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>Where collagen matters most for growth:</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px", display: "flex", flexDirection: "column", gap: 3 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Growth plates: ~30% collagen</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Bones: ~40% collagen (the scaffold for mineralization)</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Spinal discs: ~60% collagen</li>
            </ul>
            <div style={{ background: "#fef2f2", borderRadius: 10, padding: 12, border: "1px solid #fecaca" }}>
              <p style={{ fontSize: 13, color: "#7f1d1d", lineHeight: 1.6, fontWeight: 600, fontFamily: F }}>
                The problem: The body only synthesizes ~3g glycine per day, but needs 10&ndash;15g for optimal collagen production. This means most children are in a chronic glycine deficit &mdash; limiting the very scaffold their bones grow on.
              </p>
            </div>
            <p className="text-xs text-forest italic mt-4"><a href="https://pubmed.ncbi.nlm.nih.gov/20093739/" target="_blank" rel="noopener noreferrer" className="underline hover:text-forest/70">[Melendez-Hevia E, et al. J Biosci. 2009]</a></p>
          </section>

          {/* The Modern Diet Problem */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>The Modern Diet Problem</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              Here&apos;s the issue: modern diets are unbalanced.
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              Egg- and muscle-meat-heavy diets are:
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px", display: "flex", flexDirection: "column", gap: 3 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span>Relatively rich in methionine</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span>Comparatively poor in glycine</li>
            </ul>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 6, fontFamily: F }}>
              This produces an unbalanced methionine:glycine ratio that may be metabolically disadvantageous.
            </p>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginBottom: 12, fontFamily: F }}><a href="https://pubmed.ncbi.nlm.nih.gov/20093739/" target="_blank" rel="noopener noreferrer" className="underline hover:text-forest/70">[Melendez-Hevia E, et al. J Biosci. 2009]</a></p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontWeight: 600, fontFamily: F }}>
              The solution: Pair protein-rich diets with glycine-rich foods to normalize this ratio.
            </p>
          </section>

          {/* Glycine-Rich Foods */}
          <section style={{ background: "#f0fdf4", borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.sigBorder}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>Glycine-Rich Foods</h2>

            <div className="space-y-5">
              <div>
                <h3 className="font-semibold text-black text-base mb-1">Bone Broth</h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 3 }}>
                  <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Homemade from bones simmered 12&ndash;24 hours</li>
                  <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>1 cup provides 2&ndash;3g glycine</li>
                  <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Perfect evening food</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-black text-base mb-1">Gelatin</h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 3 }}>
                  <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Powdered gelatin in desserts or gummies</li>
                  <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Easy to incorporate</li>
                  <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Kids love it</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-black text-base mb-1">Collagen Peptides</h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 3 }}>
                  <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Dissolves in any liquid</li>
                  <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Flavorless</li>
                  <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Can add to smoothies, milk, or warm drinks</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-black text-base mb-1">Connective Tissue Cuts</h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 3 }}>
                  <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Oxtail, shanks, chicken feet</li>
                  <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Traditional foods our ancestors ate</li>
                  <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Naturally glycine-rich</li>
                </ul>
              </div>
            </div>
          </section>

          {/* The Practical Protocol */}
          <section style={{ background: "#f0fdf4", borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.sigBorder}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>The Practical Protocol</h2>

            <div className="bg-white rounded-xl p-4 mb-4 border border-gray-200">
              <p className="text-sm sm:text-base text-gray-700 font-medium">
                Evening glycine dose: 3&ndash;5g before bed
              </p>
            </div>

            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>How to deliver it:</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px", display: "flex", flexDirection: "column", gap: 3 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>1 cup bone broth at dinner or before bed</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Gelatin dessert (homemade jello with real gelatin)</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Collagen peptides in warm milk</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Gummy snacks made with gelatin</li>
            </ul>

            <div style={{ background: "#fffbeb", borderRadius: 10, padding: 12, border: "1px solid #fde68a" }}>
              <p style={{ fontSize: 13, color: "#78350f", lineHeight: 1.6, fontWeight: 600, fontFamily: F }}>
                Timing: Within 1&ndash;2 hours of bedtime for maximum sleep and GH benefit.
              </p>
            </div>
          </section>

          {/* The Complete Picture */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>The Complete Picture</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              Glycine works on multiple pathways simultaneously:
            </p>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", fontSize: 12, fontFamily: F, borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                    <th style={{ textAlign: "left", padding: "6px 12px 6px 0", color: C.title, fontWeight: 700 }}>System</th>
                    <th style={{ textAlign: "left", padding: "6px 0", color: C.title, fontWeight: 700 }}>Effect</th>
                  </tr>
                </thead>
                <tbody style={{ color: C.body }}>
                  <tr style={{ borderBottom: "1px solid #f5f5f4" }}>
                    <td style={{ padding: "6px 12px 6px 0", fontWeight: 600 }}>Sleep</td>
                    <td style={{ padding: "6px 0" }}>Deeper slow-wave sleep</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #f5f5f4" }}>
                    <td style={{ padding: "6px 12px 6px 0", fontWeight: 600 }}>GH Release</td>
                    <td style={{ padding: "6px 0" }}>Direct stimulation</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #f5f5f4" }}>
                    <td style={{ padding: "6px 12px 6px 0", fontWeight: 600 }}>Muscle</td>
                    <td style={{ padding: "6px 0" }}>mTORC1 activation, protein synthesis</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #f5f5f4" }}>
                    <td style={{ padding: "6px 12px 6px 0", fontWeight: 600 }}>Bone</td>
                    <td style={{ padding: "6px 0" }}>Collagen formation, mineralization scaffold</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "6px 12px 6px 0", fontWeight: 600 }}>Metabolism</td>
                    <td style={{ padding: "6px 0" }}>Balances methionine load</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mt-4 font-medium">
              This makes it one of the most efficient single interventions for growth.
            </p>
          </section>

          {/* Safety Notes */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>Safety Notes</h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 4 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Glycine is generally recognized as safe at nutritional doses</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Some animal studies show modest testosterone reductions at very high doses</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Stick to food-based sources or moderate supplementation (3&ndash;5g)</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>No human data shows clinically meaningful hormonal suppression at nutritional intakes</li>
            </ul>
          </section>

          {/* Bottom Line */}
          <section style={{ background: C.green, color: "#fff", borderRadius: 14, padding: 20, marginBottom: 16 }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: "#fff", margin: "0 0 12px" }}>The Bottom Line</h2>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.9)", lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              Glycine is a secret weapon hiding in plain sight.
            </p>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.9)", lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              It improves sleep, stimulates growth hormone, activates muscle-building pathways, and provides the essential building block for collagen and bone.
            </p>
            <p className="text-sm sm:text-base text-white font-semibold leading-relaxed">
              The simple prescription: Bone broth or gelatin before bed. Your child gets better sleep, more GH, and the raw material for stronger bones &mdash; all from one traditional food.
            </p>
          </section>

          {/* References */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>References</h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              <li><a href="https://pubmed.ncbi.nlm.nih.gov/25533534/" target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline hover:text-emerald-900">Kawai N, et al. The sleep-promoting and hypothermic effects of glycine are mediated by NMDA receptors in the suprachiasmatic nucleus. <em>Neuropsychopharmacology</em>. 2015;40(6):1405-16.</a></li>
              <li><a href="https://pubmed.ncbi.nlm.nih.gov/22529837/" target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline hover:text-emerald-900">Bannai M, et al. The effects of glycine on subjective daytime performance in partially sleep-restricted healthy volunteers. <em>Frontiers in Neurology</em>. 2012;3:61.</a></li>
              <li><a href="https://pubmed.ncbi.nlm.nih.gov/7358501/" target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline hover:text-emerald-900">Kasai K, et al. Glycine stimulated growth hormone release in man. <em>Metabolism</em>. 1980;29(9):826-829.</a></li>
              <li><a href="https://pubmed.ncbi.nlm.nih.gov/20093739/" target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline hover:text-emerald-900">Melendez-Hevia E, et al. A weak link in metabolism: the metabolic capacity for glycine biosynthesis does not satisfy the need for collagen synthesis. <em>J Biosci</em>. 2009;34(6):853-72.</a></li>
              <li><a href="https://pubmed.ncbi.nlm.nih.gov/29559876/" target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline hover:text-emerald-900">de Paz-Lugo P, et al. High glycine concentration increases collagen synthesis by articular chondrocytes in vitro. <em>Amino Acids</em>. 2018;50(10):1405-1415.</a></li>
              <li><a href="https://pubmed.ncbi.nlm.nih.gov/28337245/" target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline hover:text-emerald-900">Razak MA, et al. Multifarious beneficial effect of nonessential amino acid, glycine: a review. <em>Oxidative Medicine and Cellular Longevity</em>. 2017;2017:1716701.</a></li>
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
