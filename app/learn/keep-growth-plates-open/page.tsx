'use client';

import Link from 'next/link';
import Nav from '@/components/Nav';

const F = "'Courier New', Courier, monospace";
const C = {
  bg: '#fafaf9', title: '#1c1917', body: '#57534e', light: '#a8a29e',
  green: '#059669', card: '#fff', border: '#e7e5e4', sigBorder: '#a7f3d0',
};

export default function GrowthPlatesOpenArticle() {
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
            <span style={{ fontSize: 11, color: C.light, fontFamily: F }}>7 min read</span>
          </div>
          <h1 style={{ fontFamily: F, fontSize: 22, fontWeight: 700, color: C.title, margin: "0 0 8px" }}>How to Keep Growth Plates Open a Little Longer</h1>
          <p style={{ fontSize: 13, color: C.body, fontFamily: F, lineHeight: 1.5, margin: 0 }}>The science of extending your child&apos;s growth window through strategic nutrition.</p>
        </div>

        {/* Article content */}
        <article>

          {/* The Pre-Puberty Window */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>The Pre-Puberty Window</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              Around age 10, many children are entering a critical phase: growth plates are still wide open, but the sex-hormone system is waking up and starting to set the clock on fusion.
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontFamily: F }}>
              This is when strategic nutrition can make a real difference.
            </p>
          </section>

          {/* How Growth Plates Close */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>How Growth Plates Close</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              Here&apos;s the biology:
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 6, fontFamily: F }}>
              <strong>In boys:</strong> Rising testosterone is locally converted to estrogen inside bone by the enzyme aromatase.
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              <strong>In girls:</strong> Ovarian estrogen rises directly.
            </p>
            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>The dual role of estrogen:</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 4 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>At low levels, estrogen synergizes with growth hormone and IGF-1 to drive the pubertal growth spurt</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444", fontWeight: 700 }}>&#8226;</span>But as exposure accumulates, estrogen pushes growth-plate cartilage cells toward senescence and fusion, locking in final height</li>
            </ul>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginTop: 8, fontFamily: F }}>[Nilsson O. et al. Endocrine Reviews. 2005]</p>
          </section>

          {/* The Later Puberty Advantage */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>The Later Puberty Advantage</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              In epidemiologic data, children who hit puberty later tend to have:
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px", display: "flex", flexDirection: "column", gap: 3 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>A longer window of linear growth</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Slightly greater adult height for their genetic baseline</li>
            </ul>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontFamily: F }}>
              These children often have adequate calories but more plant-dominant, nutrient-dense diets.
            </p>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginTop: 8, fontFamily: F }}>[G&uuml;nther AL. et al. American Journal of Clinical Nutrition. 2010]</p>
          </section>

          {/* The Strategy */}
          <section style={{ background: "#fffbeb", borderRadius: 14, padding: 20, marginBottom: 16, border: "1px solid #fde68a" }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>The Strategy: Reduce Estrogenic &ldquo;Noise&rdquo;</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              Once a child reaches roughly 9&ndash;11 years old, it becomes especially important to build a dietary pattern that:
            </p>
            <ol className="space-y-2 list-decimal list-inside mb-4">
              <li style={{ fontSize: 13, color: C.body, fontFamily: F }}><strong>Provides protein and micronutrients</strong> for IGF-1 and bone</li>
              <li style={{ fontSize: 13, color: C.body, fontFamily: F }}><strong>Gently reduces unnecessary estrogenic noise</strong> and peripheral aromatase activity</li>
            </ol>
            <p style={{ fontSize: 13, color: "#78350f", lineHeight: 1.6, fontWeight: 600, fontFamily: F }}>
              This isn&apos;t about suppressing puberty &mdash; it&apos;s about avoiding excess, premature estrogenic drive at the growth plate.
            </p>
          </section>

          {/* Foods That Help */}
          <div style={{ marginBottom: 8 }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 8px" }}>Foods That Help: The Science</h2>
          </div>

          {/* Mushrooms */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 12, border: `1px solid ${C.border}` }}>
            <h3 style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: C.title, margin: "0 0 8px" }}>Mushrooms (Aromatase Inhibitors)</h3>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              White button mushrooms (Agaricus bisporus) contain heat-stable phytochemicals that inhibit aromatase &mdash; the enzyme that converts testosterone to estrogen.
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              This has been demonstrated in:
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px", display: "flex", flexDirection: "column", gap: 3 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Human placental microsomes</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Aromatase-overexpressing breast-cancer cells</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Clinical pilots in postmenopausal breast-cancer survivors as a natural aromatase-suppression strategy</li>
            </ul>
            <div className="bg-forest/5 rounded-xl p-3 border border-forest/20">
              <p className="text-sm sm:text-base text-gray-700 font-medium">Target: Mushrooms several times per week (100&ndash;200g cooked white buttons or similar)</p>
            </div>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginTop: 8, fontFamily: F }}>[Chen S. et al. Cancer Research. 2006]</p>
          </section>

          {/* Cruciferous Vegetables */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 12, border: `1px solid ${C.border}` }}>
            <h3 style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: C.title, margin: "0 0 8px" }}>Cruciferous Vegetables (Estrogen Metabolism Modulators)</h3>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              Cruciferous vegetables &mdash; broccoli, Brussels sprouts, kale, cabbage, cauliflower &mdash; and their sprouts modulate how estrogen is <em>handled</em> rather than just how much is produced.
            </p>
            <h4 style={{ fontFamily: F, fontSize: 12, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>The mechanism:</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px", display: "flex", flexDirection: "column", gap: 4 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Glucosinolates are converted to indole-3-carbinol (I3C) and DIM</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>These compounds bind estrogen receptors and shift estrogen metabolite patterns toward less potent forms</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Sulforaphane from broccoli reduces estrogen receptor levels and activates Nrf2-driven detox enzymes that support clearance of hormones, including estrogens</li>
            </ul>
            <div className="bg-forest/5 rounded-xl p-3 border border-forest/20">
              <p className="text-sm sm:text-base text-gray-700 font-medium">Target: Daily crucifers (1&ndash;2 cups cooked broccoli/Brussels sprouts/cabbage or a small handful of broccoli sprouts)</p>
            </div>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginTop: 8, fontFamily: F }}>[Bradlow HL. et al. Journal of the National Cancer Institute. 1991]</p>
          </section>

          {/* Grape Polyphenols */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 12, border: `1px solid ${C.border}` }}>
            <h3 style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: C.title, margin: "0 0 8px" }}>Grape Polyphenols (Aromatase Inhibitors)</h3>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              Grape seed and grape-skin polyphenols:
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px", display: "flex", flexDirection: "column", gap: 3 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Inhibit aromatase activity</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Down-regulate aromatase promoter mRNAs</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Reduce estrogen-dependent cell proliferation</li>
            </ul>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              Other flavonoids with similar effects include resveratrol, citrus flavanones, and quercetin.
            </p>
            <div className="bg-forest/5 rounded-xl p-3 border border-forest/20">
              <p className="text-sm sm:text-base text-gray-700 font-medium">Target: Regular dark grapes and other deeply colored fruits</p>
            </div>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginTop: 8, fontFamily: F }}>[Wang Y. et al. Phytomedicine. 2006]</p>
          </section>

          {/* Broad Flavonoid Coverage */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h3 style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: C.title, margin: "0 0 8px" }}>Broad Flavonoid Coverage</h3>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              For comprehensive phytochemical support, include:
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px", display: "flex", flexDirection: "column", gap: 3 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Onions</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Apples with skin</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Citrus</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Parsley</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Celery</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Berries</li>
            </ul>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontFamily: F }}>
              These provide broad flavonoid coverage that supports healthy estrogen metabolism.
            </p>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginTop: 8, fontFamily: F }}>[Moon YJ. et al. Toxicology in Vitro. 2006]</p>
          </section>

          {/* The Practical Protocol */}
          <section style={{ background: "#f0fdf4", borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.sigBorder}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>The Practical Protocol (Ages 10+)</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 16, fontFamily: F }}>
              When the hypothalamic&ndash;pituitary&ndash;gonadal axis is gearing up, intentionally <strong>increase</strong> the proportion of vegetables, crucifers, and mushrooms in your child&apos;s diet &mdash; on top of adequate total protein and calories.
            </p>

            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>Daily:</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px", display: "flex", flexDirection: "column", gap: 3 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>1&ndash;2 cups cooked cruciferous vegetables (broccoli, Brussels sprouts, cabbage)</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>OR a small handful of broccoli sprouts</li>
            </ul>

            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>Several times per week:</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px", display: "flex", flexDirection: "column", gap: 3 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>100&ndash;200g cooked mushrooms (white button or similar)</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Dark grapes or berries</li>
            </ul>

            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>Regular inclusion:</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 3 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Onions, apples with skin, citrus, parsley, celery</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Broad variety of colorful vegetables and fruits</li>
            </ul>
          </section>

          {/* What This Does */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>What This Does</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              This pattern should:
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 4 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Support IGF-1 and bone mineralization</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Nudge aromatase and estrogen-receptor signaling in a favorable direction</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Avoid excessive, premature estrogenic drive at the growth plate</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Potentially give a little more time before fusion &mdash; without suppressing puberty outright</li>
            </ul>
          </section>

          {/* The Evidence Base */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>The Evidence Base</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              We do not yet have longitudinal human trials showing that this specific food pattern delays epiphyseal fusion. But:
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 4 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>It is directly aligned with cell and animal data on aromatase and estrogen handling</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>It matches observational signals that more plant-dense, nutrient-rich diets correlate with later puberty and slightly higher adult height at the population level</li>
            </ul>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginTop: 8, fontFamily: F }}>[G&uuml;nther AL. et al. American Journal of Clinical Nutrition. 2010]</p>
          </section>

          {/* Bottom Line */}
          <section style={{ background: C.green, color: "#fff", borderRadius: 14, padding: 20, marginBottom: 16 }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: "#fff", margin: "0 0 12px" }}>The Bottom Line</h2>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.9)", lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              You can&apos;t stop puberty, and you shouldn&apos;t try. But you can avoid <em>accelerating</em> it unnecessarily.
            </p>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.9)", lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              Strategic nutrition in the pre-pubertal years &mdash; emphasizing crucifers, mushrooms, and polyphenol-rich foods &mdash; may help extend your child&apos;s growth window by supporting healthy estrogen metabolism and avoiding premature growth-plate fusion.
            </p>
            <p className="text-sm sm:text-base text-white font-semibold leading-relaxed">
              Every extra month of open growth plates is another month of potential height gain.
            </p>
          </section>

          {/* References */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>References</h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              <li>Nilsson O, et al. Endocrine regulation of the growth plate. <em>Endocrine Reviews</em>. 2005;26(1):114-146.</li>
              <li>G&uuml;nther AL, et al. Dietary protein intake and later height in children. <em>American Journal of Clinical Nutrition</em>. 2010;91(6):1684-1692.</li>
              <li>Chen S, et al. Anti-aromatase activity of phytochemicals in white button mushrooms (Agaricus bisporus). <em>Cancer Research</em>. 2006;66(24):12026-12034.</li>
              <li>Bradlow HL, et al. Indole-3-carbinol: a novel approach to breast cancer prevention. <em>Journal of the National Cancer Institute</em>. 1991;83(21):1571-1579.</li>
              <li>Wang Y, et al. The red wine polyphenol resveratrol displays bilevel inhibition on aromatase in breast cancer cells. <em>Phytomedicine</em>. 2006;13(4):270-277.</li>
              <li>Moon YJ, et al. Dietary flavonoids: effects on xenobiotic and carcinogen metabolism. <em>Toxicology in Vitro</em>. 2006;20(2):187-210.</li>
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
