'use client';

import Link from 'next/link';
import Nav from '@/components/Nav';

const F = "'Courier New', Courier, monospace";
const C = {
  bg: '#fafaf9', title: '#1c1917', body: '#57534e', light: '#a8a29e',
  green: '#059669', card: '#fff', border: '#e7e5e4', sigBorder: '#a7f3d0',
};

export default function FavaBeansArticle() {
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
          <h1 style={{ fontFamily: F, fontSize: 22, fontWeight: 700, color: C.title, margin: "0 0 8px" }}>Fava Beans: The Natural Growth Hormone Trigger</h1>
          <p style={{ fontSize: 13, color: C.body, fontFamily: F, lineHeight: 1.5, margin: 0 }}>How a humble Mediterranean bean can stimulate your child&apos;s GH release &mdash; backed by decades of clinical research.</p>
        </div>

        {/* Article content */}
        <article>

          {/* The Secret Doctors Use */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>The Secret Doctors Use to Test Growth Hormone</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              Here&apos;s something most parents don&apos;t know: when endocrinologists need to test whether a child&apos;s pituitary gland can release growth hormone, one of the standard provocative agents they use is <strong>L-dopa</strong>.
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 6, fontFamily: F }}>
              L-dopa is administered, blood is drawn, and if GH rises appropriately, the pituitary is functioning normally.
            </p>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginBottom: 12, fontFamily: F }}>[Chakmakjian ZH. et al. Pediatric Research. 1973]</p>
            <div style={{ background: "#f0fdf4", border: `1px solid ${C.sigBorder}`, borderRadius: 10, padding: 12 }}>
              <p className="text-sm sm:text-base text-gray-800 leading-relaxed font-medium">
                The connection to fava beans? Fava beans are one of nature&apos;s richest sources of L-dopa.
              </p>
            </div>
          </section>

          {/* What Is L-Dopa? */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>What Is L-Dopa?</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              L-dopa (L-3,4-dihydroxyphenylalanine) is:
            </p>
            <ul className="space-y-1 mb-2">
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>A naturally occurring amino acid</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>The direct precursor to dopamine</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Able to cross the blood-brain barrier</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>A proven stimulator of growth hormone release</li>
            </ul>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginTop: 8, fontFamily: F }}>[Boyd AE. et al. New England Journal of Medicine. 1970]</p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mt-4 font-medium">
              When you eat fava beans, you&apos;re consuming the same compound doctors use to provoke GH secretion in clinical testing.
            </p>
          </section>

          {/* The Clinical Evidence */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>The Clinical Evidence: L-Dopa Stimulates Growth Hormone</h2>

            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>The New England Journal of Medicine Study</h3>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 6, fontFamily: F }}>
              In 1970, researchers at Duke University Medical Center demonstrated that L-dopa stimulates growth hormone secretion in humans. Patients given L-dopa showed significant increases in plasma GH levels.
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 6, fontFamily: F }}>
              The study concluded that dopaminergic mechanisms in the hypothalamus are directly involved in regulating growth hormone release.
            </p>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginBottom: 16, fontFamily: F }}>[Boyd AE. et al. New England Journal of Medicine. 1970]</p>

            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>The Pediatric Research Study</h3>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              In children with short stature, L-dopa (100&ndash;500mg oral dose) was tested as a provocative agent for GH release:
            </p>
            <ul className="space-y-1 mb-2">
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span><strong>15 of 17 children</strong> showed significant GH rise</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Peak GH response occurred between <strong>30&ndash;120 minutes</strong></li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Mean peak GH response: <strong>21.3 ng/ml</strong></li>
            </ul>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mt-3 italic">
              The researchers concluded that L-dopa &ldquo;seems to be a simple and valid agent for evaluation of pituitary GH reserve.&rdquo;
            </p>
            <p className="text-xs text-forest italic mt-2 mb-5">[Chakmakjian ZH. et al. Pediatric Research. 1973]</p>

            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>The Hypothalamic GHRH Connection</h3>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              A landmark study published in 1986 demonstrated that L-dopa doesn&apos;t just stimulate GH release directly &mdash; it actually triggers the hypothalamus to release GHRH (growth hormone-releasing hormone).
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 6, fontFamily: F }}>
              In normal subjects, oral L-dopa (0.5g) caused significant increases in <strong>both</strong> plasma GHRH and GH levels, with a strong correlation between the two.
            </p>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", fontFamily: F }}>[Miki N. et al. Journal of Clinical Endocrinology &amp; Metabolism. 1986]</p>
          </section>

          {/* Fava Beans: Nature's L-Dopa Source */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>Fava Beans: Nature&apos;s L-Dopa Source</h2>

            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>L-Dopa Content</h3>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              Fava beans (Vicia faba) contain:
            </p>
            <ul className="space-y-1 mb-2">
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span><strong>0.5% L-dopa in fresh beans</strong></li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>0.07% when dried</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Highest concentrations in fresh leaves (22.4 mg/g)</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Significant amounts in pods, flowers, and seeds</li>
            </ul>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginBottom: 12, fontFamily: F }}>[Mohseni Mehran SM. et al. Journal of Clinical and Diagnostic Research. 2013]</p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed italic">
              Historical note: L-dopa was first isolated from Vicia faba by Guggenheim in 1913 &mdash; this humble bean is where dopamine science began.
            </p>
          </section>

          {/* What Happens When You Eat Fava Beans */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>What Happens When You Eat Fava Beans</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              A clinical study measuring plasma levels after fava bean consumption found:
            </p>
            <ul className="space-y-1 mb-2">
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Plasma L-dopa increased <strong>nearly 7-fold</strong> within 1 hour</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Plasma dopamine increased <strong>nearly 15-fold</strong></li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Elevated levels persisted for <strong>6+ hours</strong></li>
            </ul>
            <p className="text-xs text-forest italic mt-2">[Rabey JM. et al. Journal of Clinical Nutrition. 2013]</p>
            <div className="bg-forest/5 border border-forest/20 rounded-xl p-4 mt-4">
              <p className="text-sm sm:text-base text-gray-800 leading-relaxed font-medium">
                This means eating fava beans creates a sustained dopaminergic stimulus &mdash; exactly the signal that triggers GH release.
              </p>
            </div>
          </section>

          {/* How L-Dopa Triggers Growth Hormone */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>How L-Dopa Triggers Growth Hormone</h2>

            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>The Mechanism</h3>
            <ol className="space-y-2 list-decimal list-inside mb-4">
              <li style={{ fontSize: 13, color: C.body, fontFamily: F }}><strong>L-dopa crosses the blood-brain barrier</strong> (dopamine itself cannot)</li>
              <li style={{ fontSize: 13, color: C.body, fontFamily: F }}><strong>L-dopa converts to dopamine</strong> in the hypothalamus</li>
              <li style={{ fontSize: 13, color: C.body, fontFamily: F }}><strong>Dopamine stimulates GHRH release</strong> from the hypothalamus</li>
              <li style={{ fontSize: 13, color: C.body, fontFamily: F }}><strong>GHRH signals the pituitary</strong> to release growth hormone</li>
              <li style={{ fontSize: 13, color: C.body, fontFamily: F }}><strong>GH travels to the liver</strong> &rarr; IGF-1 production &rarr; growth</li>
            </ol>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginBottom: 16, fontFamily: F }}>[Miki N. et al. Journal of Clinical Endocrinology &amp; Metabolism. 1986]</p>

            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>The Timing</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 8px", display: "flex", flexDirection: "column", gap: 3 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>GH rise begins <strong>30&ndash;60 minutes</strong> after L-dopa intake</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Peak GH levels occur at <strong>60&ndash;120 minutes</strong></li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Effects can persist for <strong>several hours</strong></li>
            </ul>
            <div style={{ background: "#fffbeb", borderRadius: 10, padding: 12, border: "1px solid #fde68a" }}>
              <p style={{ fontSize: 13, color: "#78350f", lineHeight: 1.6, fontWeight: 600, fontFamily: F }}>
                This makes fava beans an ideal evening food &mdash; the GH-stimulating effect can complement the natural nocturnal GH surge during deep sleep.
              </p>
            </div>
          </section>

          {/* Practical Protocol */}
          <section style={{ background: "#f0fdf4", borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.sigBorder}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>Practical Protocol: Fava Beans for Growth</h2>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-5">
              <p style={{ fontSize: 13, color: "#78350f", lineHeight: 1.6, fontWeight: 600, fontFamily: F }}>
                Important: Fava beans must always be cooked before eating. Raw fava beans contain vicine, convicine, and lectins that are unsafe. The table below refers to the starting form before cooking.
              </p>
            </div>

            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 8px" }}>Best Forms (Before Cooking)</h3>
            <div className="overflow-x-auto mb-5">
              <table style={{ width: "100%", fontSize: 12, fontFamily: F, borderCollapse: "collapse" }}>
                <thead>
                  <tr className="border-b border-forest/30">
                    <th style={{ textAlign: "left", padding: "6px 12px 6px 0", color: C.title, fontWeight: 700 }}>Starting Form</th>
                    <th style={{ textAlign: "left", padding: "6px 12px 6px 0", color: C.title, fontWeight: 700 }}>L-Dopa After Cooking</th>
                    <th style={{ textAlign: "left", padding: "6px 0", color: C.title, fontWeight: 700 }}>Notes</th>
                  </tr>
                </thead>
                <tbody style={{ color: C.body }}>
                  <tr className="border-b border-forest/10">
                    <td style={{ padding: "6px 12px 6px 0", fontWeight: 600 }}>Fresh, lightly cooked</td>
                    <td style={{ padding: "6px 12px 6px 0" }}>Highest</td>
                    <td style={{ padding: "6px 0" }}>Brief steaming or saut&eacute;ing preserves most L-dopa</td>
                  </tr>
                  <tr className="border-b border-forest/10">
                    <td style={{ padding: "6px 12px 6px 0", fontWeight: 600 }}>Frozen, then cooked</td>
                    <td style={{ padding: "6px 12px 6px 0" }}>~75% retained</td>
                    <td style={{ padding: "6px 0" }}>Good option year-round; thaw and cook briefly</td>
                  </tr>
                  <tr className="border-b border-forest/10">
                    <td style={{ padding: "6px 12px 6px 0", fontWeight: 600 }}>Dried, then boiled</td>
                    <td style={{ padding: "6px 12px 6px 0" }}>Lower</td>
                    <td style={{ padding: "6px 0" }}>Extended boiling causes significant L-dopa loss</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "6px 12px 6px 0", fontWeight: 600 }}>Canned</td>
                    <td style={{ padding: "6px 12px 6px 0" }}>Lower</td>
                    <td style={{ padding: "6px 0" }}>Pre-cooked; still provides some benefit</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 6, fontFamily: F }}>
              <strong>Key point:</strong> The less you cook, the more L-dopa is preserved &mdash; but you must cook them enough to be safe. Light steaming or brief saut&eacute;ing (5&ndash;10 minutes) is the sweet spot.
            </p>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", fontFamily: F }}>[Mohseni Mehran SM. et al. Journal of Clinical and Diagnostic Research. 2013]</p>
          </section>

          {/* Recommended Intake */}
          <section style={{ background: "#f0fdf4", borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.sigBorder}` }}>
            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 8px" }}>Recommended Intake</h3>
            <ul className="space-y-1 mb-5">
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span><strong>Children:</strong> 1/2 to 1 cup fresh or frozen fava beans</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span><strong>Timing:</strong> With dinner or as an evening snack</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span><strong>Frequency:</strong> 3&ndash;4 times per week</li>
            </ul>

            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 8px" }}>Preparation Tips</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 3 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span><strong>Fresh is best:</strong> If you can find fresh fava beans in season, use them</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span><strong>Don&apos;t overcook:</strong> Light steaming or saut&eacute;ing preserves more L-dopa</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span><strong>Pair with olive oil:</strong> Traditional Mediterranean preparation</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span><strong>Remove outer skin:</strong> The inner bean is more digestible</li>
            </ul>
          </section>

          {/* The Mediterranean Connection */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>The Mediterranean Connection</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              Fava beans have been a dietary staple in the Mediterranean, Middle East, and North Africa for thousands of years.
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>Traditional dishes include:</p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 8px", display: "flex", flexDirection: "column", gap: 3 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span><strong>Ful medames</strong> (Egypt&apos;s national dish)</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span><strong>Fave e cicoria</strong> (Italian fava and chicory)</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span><strong>Bissara</strong> (Moroccan fava soup)</li>
            </ul>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontFamily: F }}>
              These cultures have consumed fava beans regularly for generations &mdash; unknowingly providing their children with a natural GH-stimulating food.
            </p>
          </section>

          {/* Sprouted Fava Beans */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>Sprouted Fava Beans: Even More Powerful</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              Research shows that sprouting fava beans <strong>doubles their L-dopa content</strong>:
            </p>
            <ul className="space-y-1 mb-2">
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Day 0: Baseline L-dopa</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Day 8: <strong>100% increase</strong> in L-dopa concentration</li>
            </ul>
            <p className="text-xs text-forest italic mt-2">[Mohseni Mehran SM. et al. Journal of Clinical and Diagnostic Research. 2013]</p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mt-3 font-medium">
              If you want maximum effect, sprout your fava beans before cooking and eating them.
            </p>
          </section>

          {/* Safety Considerations */}
          <section style={{ background: "#fffbeb", borderRadius: 14, padding: 20, marginBottom: 16, border: "1px solid #fde68a" }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>Safety Considerations</h2>

            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>G6PD Deficiency (Favism)</h3>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              Some individuals, particularly those of Mediterranean, African, or Middle Eastern descent, carry a genetic condition called G6PD deficiency. For these individuals, fava beans can trigger hemolytic anemia.
            </p>
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-5">
              <p style={{ fontSize: 13, color: "#7f1d1d", lineHeight: 1.6, fontWeight: 600, fontFamily: F }}>
                If your family has Mediterranean heritage, get your child tested for G6PD deficiency before introducing fava beans.
              </p>
            </div>

            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>General Safety</h3>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontFamily: F }}>
              For children without G6PD deficiency, fava beans are safe as a regular food. They&apos;ve been consumed by millions of children across the Mediterranean for millennia.
            </p>
          </section>

          {/* The GH Smoothie */}
          <section style={{ background: "#f0fdf4", borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.sigBorder}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>The GH Smoothie: A Food-Based Growth Support Stack</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              This isn&apos;t a single-ingredient trick &mdash; it&apos;s a carefully designed combination where each ingredient supports the GH-IGF-1 cascade.
            </p>

            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 8px" }}>The Recipe</h3>
            <div className="overflow-x-auto mb-5">
              <table style={{ width: "100%", fontSize: 12, fontFamily: F, borderCollapse: "collapse" }}>
                <thead>
                  <tr className="border-b border-forest/30">
                    <th style={{ textAlign: "left", padding: "6px 12px 6px 0", color: C.title, fontWeight: 700 }}>Ingredient</th>
                    <th style={{ textAlign: "left", padding: "6px 12px 6px 0", color: C.title, fontWeight: 700 }}>Amount</th>
                    <th style={{ textAlign: "left", padding: "6px 0", color: C.title, fontWeight: 700 }}>Why It Works</th>
                  </tr>
                </thead>
                <tbody style={{ color: C.body }}>
                  <tr className="border-b border-forest/10">
                    <td style={{ padding: "6px 12px 6px 0", fontWeight: 600 }}>Goji berries or mixed berries</td>
                    <td style={{ padding: "6px 12px 6px 0" }}>150g</td>
                    <td style={{ padding: "6px 0" }}>Antioxidants lower oxidative stress (which dampens GH/IGF-1 signaling)</td>
                  </tr>
                  <tr className="border-b border-forest/10">
                    <td style={{ padding: "6px 12px 6px 0", fontWeight: 600 }}>Pineapple</td>
                    <td style={{ padding: "6px 12px 6px 0" }}>100g</td>
                    <td style={{ padding: "6px 0" }}>Bromelain for digestion; manganese for bone health</td>
                  </tr>
                  <tr className="border-b border-forest/10">
                    <td style={{ padding: "6px 12px 6px 0", fontWeight: 600 }}>Watermelon</td>
                    <td style={{ padding: "6px 12px 6px 0" }}>100g</td>
                    <td style={{ padding: "6px 0" }}>Citrulline &rarr; converts to arginine (a known GH-linked amino acid)</td>
                  </tr>
                  <tr className="border-b border-forest/10">
                    <td style={{ padding: "6px 12px 6px 0", fontWeight: 600 }}>Cooked young fava beans</td>
                    <td style={{ padding: "6px 12px 6px 0" }}>50g</td>
                    <td style={{ padding: "6px 0" }}>Plant protein + L-dopa for dopaminergic push to GH release</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "6px 12px 6px 0", fontWeight: 600 }}>Apple or orange juice</td>
                    <td style={{ padding: "6px 12px 6px 0" }}>Enough to blend</td>
                    <td style={{ padding: "6px 0" }}>Carbohydrate provides insulin signal so liver can convert GH &rarr; IGF-1</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 8px" }}>Why This Combination Works</h3>
            <div className="space-y-3 mb-5">
              <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontFamily: F }}>
                <strong>Fava beans:</strong> Supply both plant protein AND L-dopa as a modest dopaminergic push to GH release
              </p>
              <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontFamily: F }}>
                <strong>Watermelon &rarr; Citrulline &rarr; Arginine:</strong> Arginine is a well-documented GH-linked amino acid that supports the growth hormone response
              </p>
              <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontFamily: F }}>
                <strong>Berries:</strong> Antioxidants reduce oxidative stress, which otherwise dampens GH/IGF-1 signaling
              </p>
              <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontFamily: F }}>
                <strong>Pineapple:</strong> Bromelain aids protein digestion; manganese supports bone metabolism
              </p>
              <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontFamily: F }}>
                <strong>Juice base:</strong> Provides carbohydrate and a physiologic insulin signal &mdash; when GH pulses are present, the liver needs both amino acids AND insulin to convert GH into IGF-1
              </p>
            </div>

            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 8px" }}>Timing Protocol</h3>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              The smoothie is taken <strong>twice daily</strong>:
            </p>
            <div className="space-y-4 mb-5">
              <div className="bg-white rounded-xl p-4 border border-gray-200">
                <h4 className="font-medium text-black text-sm mb-2">1. Post-Exercise (Morning)</h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 3 }}>
                  <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Shortly after a high-intensity or sprint-type session</li>
                  <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Pairs exercise-induced GH pulse with abundant amino acids and moderate insulin</li>
                  <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Favors IGF-1 production when GH is already elevated</li>
                </ul>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-200">
                <h4 className="font-medium text-black text-sm mb-2">2. Before Bed (Evening)</h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 3 }}>
                  <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>1&ndash;2 hours before bedtime</li>
                  <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Loads substrates before the major slow-wave sleep GH pulse</li>
                  <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Still preserves a short food-free window before lights-out</li>
                </ul>
              </div>
            </div>

            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>Additional Support: Cod Liver Oil</h3>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 16, fontFamily: F }}>
              Cod liver oil &mdash; which provides omega-3 fatty acids and vitamins A and D (both relevant to bone health and IGF-1 biology) &mdash; can be taken with either smoothie or another main meal. Its effects depend on steady nutrient status over weeks, not minute-by-minute synchronization.
            </p>

            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>Preparation</h3>
            <ol className="space-y-2 list-decimal list-inside mb-4">
              <li style={{ fontSize: 13, color: C.body, fontFamily: F }}><strong>Always cook fava beans first</strong> &mdash; raw fava beans are unsafe</li>
              <li style={{ fontSize: 13, color: C.body, fontFamily: F }}>Combine all ingredients in blender</li>
              <li style={{ fontSize: 13, color: C.body, fontFamily: F }}>Add juice until drinkable consistency</li>
              <li style={{ fontSize: 13, color: C.body, fontFamily: F }}><strong>Consume immediately</strong> &mdash; L-dopa degrades with time</li>
            </ol>

            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
              <p style={{ fontSize: 13, color: "#7f1d1d", lineHeight: 1.6, fontWeight: 600, fontFamily: F }}>
                Fava beans are contraindicated in children with G6PD deficiency because of the risk of favism (hemolytic anemia). If your family has Mediterranean, African, or Middle Eastern heritage, test for G6PD deficiency before introducing fava beans.
              </p>
            </div>

            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <h4 className="font-medium text-black text-sm mb-2">The Evidence Base</h4>
              <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontFamily: F }}>
                The mechanistic pieces &mdash; protein sufficiency, arginine/citrulline intake, dopaminergic stimulation via L-dopa, antioxidant support, and correct timing relative to GH pulses &mdash; are individually plausible and documented in human and animal studies. This exact smoothie has not been tested in controlled pediatric trials. The defensible position: a fava-based smoothie of this design can <strong>rationally support</strong> the GH-IGF-1 cascade when paired with sprinting, sleep, and adequate calories.
              </p>
            </div>
          </section>

          {/* Synergy with Other GH Strategies */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>Synergy with Other GH Strategies</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              Fava beans work best when combined with other growth-optimizing practices:
            </p>
            <div className="overflow-x-auto mb-3">
              <table style={{ width: "100%", fontSize: 12, fontFamily: F, borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                    <th style={{ textAlign: "left", padding: "6px 12px 6px 0", color: C.title, fontWeight: 700 }}>Strategy</th>
                    <th style={{ textAlign: "left", padding: "6px 12px 6px 0", color: C.title, fontWeight: 700 }}>Timing</th>
                    <th style={{ textAlign: "left", padding: "6px 0", color: C.title, fontWeight: 700 }}>Effect</th>
                  </tr>
                </thead>
                <tbody style={{ color: C.body }}>
                  <tr style={{ borderBottom: "1px solid #f5f5f4" }}>
                    <td style={{ padding: "6px 12px 6px 0", fontWeight: 600 }}>GH Smoothie</td>
                    <td style={{ padding: "6px 12px 6px 0" }}>2&ndash;3 hrs before bed</td>
                    <td style={{ padding: "6px 0" }}>L-dopa + glycine &rarr; dual GH trigger</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #f5f5f4" }}>
                    <td style={{ padding: "6px 12px 6px 0", fontWeight: 600 }}>Deep sleep</td>
                    <td style={{ padding: "6px 12px 6px 0" }}>Night</td>
                    <td style={{ padding: "6px 0" }}>70&ndash;80% of daily GH release</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #f5f5f4" }}>
                    <td style={{ padding: "6px 12px 6px 0", fontWeight: 600 }}>Sprinting</td>
                    <td style={{ padding: "6px 12px 6px 0" }}>Afternoon</td>
                    <td style={{ padding: "6px 0" }}>Lactate &rarr; GH surge</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "6px 12px 6px 0", fontWeight: 600 }}>Protein meals</td>
                    <td style={{ padding: "6px 12px 6px 0" }}>Throughout day</td>
                    <td style={{ padding: "6px 0" }}>IGF-1 production substrate</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontWeight: 600, fontFamily: F }}>
              The fava bean effect complements &mdash; it doesn&apos;t replace &mdash; the fundamentals of sleep, exercise, and nutrition.
            </p>
          </section>

          {/* Bottom Line */}
          <section style={{ background: C.green, color: "#fff", borderRadius: 14, padding: 20, marginBottom: 16 }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: "#fff", margin: "0 0 12px" }}>The Bottom Line</h2>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.9)", lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              Fava beans contain L-dopa, the same compound doctors use to test growth hormone function in children.
            </p>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.9)", lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              Clinical studies prove that L-dopa:
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px", display: "flex", flexDirection: "column", gap: 4 }}>
              <li className="flex gap-2 text-sm sm:text-base text-white/90"><span className="text-white font-bold">&#10003;</span>Stimulates hypothalamic GHRH release</li>
              <li className="flex gap-2 text-sm sm:text-base text-white/90"><span className="text-white font-bold">&#10003;</span>Triggers pituitary GH secretion</li>
              <li className="flex gap-2 text-sm sm:text-base text-white/90"><span className="text-white font-bold">&#10003;</span>Produces peak GH levels within 60&ndash;120 minutes</li>
            </ul>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.9)", lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              This isn&apos;t folk medicine. It&apos;s the same biochemistry used in pediatric endocrinology clinics worldwide.
            </p>
            <p className="text-sm sm:text-base text-white font-semibold leading-relaxed">
              Add fava beans to your child&apos;s dinner rotation. A simple Mediterranean food, consumed for thousands of years, that happens to stimulate the same growth hormone pathway doctors test in their offices.
            </p>
          </section>

          {/* References */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>References</h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              <li>Boyd AE, et al. Stimulation of human-growth-hormone secretion by L-dopa. <em>New England Journal of Medicine</em>. 1970;283(26):1425-1429.</li>
              <li>Chakmakjian ZH, et al. Effect of Levodopa (L-Dopa) on serum growth hormone in children with short stature. <em>Pediatric Research</em>. 1973;7:71-73.</li>
              <li>Miki N, et al. L-dopa stimulates release of hypothalamic growth hormone-releasing hormone in humans. <em>Journal of Clinical Endocrinology &amp; Metabolism</em>. 1986;63(5):1179-1183.</li>
              <li>Mohseni Mehran SM, et al. Simultaneous determination of levodopa and carbidopa from fava bean, green peas and green beans by high performance liquid chromatography. <em>Journal of Clinical and Diagnostic Research</em>. 2013;7(6):1004-1007.</li>
              <li>Rabey JM, et al. Broad bean (Vicia faba) consumption and Parkinson&apos;s disease. <em>Advances in Neurology</em>. 1993;60:681-684.</li>
              <li>Guggenheim M. Dioxyphenylalanin, eine neue Aminos&auml;ure aus Vicia faba. <em>Zeitschrift f&uuml;r Physiologische Chemie</em>. 1913;88:276-284.</li>
              <li>Apaydin H, et al. Broad bean (Vicia faba) &mdash; a natural source of L-dopa &mdash; prolongs &ldquo;on&rdquo; periods in patients with Parkinson&apos;s disease who have &ldquo;on-off&rdquo; fluctuations. <em>Movement Disorders</em>. 2000;15(1):164-166.</li>
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
