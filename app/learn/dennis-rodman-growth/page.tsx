'use client';

import Link from 'next/link';
import Nav from '@/components/Nav';

const F = "'Courier New', Courier, monospace";
const C = {
  bg: '#fafaf9', title: '#1c1917', body: '#57534e', light: '#a8a29e',
  green: '#059669', card: '#fff', border: '#e7e5e4', sigBorder: '#a7f3d0',
};

export default function DennisRodmanArticle() {
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
            <span style={{ fontSize: 11, color: C.light, fontFamily: F }}>7 min read</span>
          </div>
          <h1 style={{ fontFamily: F, fontSize: 22, fontWeight: 700, color: C.title, margin: "0 0 8px" }}>The Dennis Rodman Growth Story</h1>
          <p style={{ fontSize: 13, color: C.body, fontFamily: F, lineHeight: 1.5, margin: 0 }}>How delayed puberty and a sudden nutrition upgrade created one of the most dramatic growth spurts in sports history.</p>
        </div>

        {/* Article content */}
        <article>

          {/* The Extraordinary Claim */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>The Extraordinary Claim</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              Dennis Rodman, the NBA Hall of Famer, claims he was about 5&apos;8&rdquo;&ndash;5&apos;9&rdquo; after high school and then grew to roughly 6&apos;8&rdquo; by around age 19&ndash;20.
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontFamily: F }}>
              A one-foot gain that late sounds impossible. But the biology actually checks out.
            </p>
          </section>

          {/* Understanding the Growth Window */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>Understanding the Growth Window</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 16, fontFamily: F }}>
              To understand Rodman&apos;s story, you need to understand two systems:
            </p>

            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>1. The HPG Axis (Puberty System)</h3>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              The hypothalamic&ndash;pituitary&ndash;gonadal (HPG) axis controls puberty. When it activates:
            </p>
            <ul className="space-y-1 mb-2">
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Sex hormones (testosterone, estrogen) rise</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>The growth spurt begins</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444", fontWeight: 700 }}>&#8226;</span><strong>But estrogen also starts closing growth plates</strong></li>
            </ul>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 4, fontFamily: F }}>
              The earlier puberty hits, the sooner growth plates fuse and height gains stop.
            </p>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginBottom: 16, fontFamily: F }}>[Nilsson O. et al. Endocrine Reviews. 2005]</p>

            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>2. The GH&ndash;IGF-1 Axis (Growth System)</h3>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 4, fontFamily: F }}>
              Growth hormone (GH) is released during deep sleep. The liver converts it to IGF-1, which makes bones longer &mdash; <strong>but only while growth plates are still open.</strong>
            </p>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginBottom: 12, fontFamily: F }}>[Yakar S. et al. Journal of Clinical Investigation. 2002]</p>

            <div style={{ background: "#fffbeb", borderRadius: 10, padding: 12, border: "1px solid #fde68a" }}>
              <p style={{ fontSize: 13, color: "#78350f", lineHeight: 1.6, fontWeight: 600, fontFamily: F }}>
                The key insight: If puberty is delayed, growth plates stay open longer, and the GH&ndash;IGF-1 system has more time to add height.
              </p>
            </div>
          </section>

          {/* Rodman's Childhood */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>Rodman&apos;s Childhood: The Setup</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 16, fontFamily: F }}>
              Rodman grew up in poverty in Dallas. By his own account, his childhood nutrition was inconsistent and resource-limited &mdash; likely dominated by cheap staples like beans, grains, and limited meat.
            </p>

            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>Plant Protein vs. Animal Protein</h3>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              Large cohort studies show something surprising:
            </p>
            <ul className="space-y-2 mb-2">
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Total protein (animal + plant) raises IGF-1 and supports growth</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span><strong>But higher animal-protein intake at ages 3&ndash;6 is associated with earlier puberty</strong></li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>A higher fraction of plant protein at the same total intake is associated with <strong>later puberty</strong></li>
            </ul>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginBottom: 16, fontFamily: F }}>[G&uuml;nther AL. et al. American Journal of Clinical Nutrition. 2010]</p>

            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>What This Means</h3>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              A childhood with adequate but plant-heavy protein can:
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 3 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Support IGF-1 and linear growth</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Exert <strong>less upward pressure on the HPG axis</strong> than a meat- and dairy-heavy diet</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Delay the &ldquo;puberty switch&rdquo;</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Keep growth plates open longer</li>
            </ul>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mt-3">
              This appears to be exactly what happened to Rodman.
            </p>
          </section>

          {/* The Trigger */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>The Trigger: &ldquo;Jail Food Made Me Grow&rdquo;</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              Rodman has said that jail food made him grow. This sounds like a joke, but there&apos;s real biology here.
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              In late adolescence, Rodman went through institutional settings &mdash; jail, then structured environments with regular meals. This likely meant a <strong>sudden step-change</strong> in nutrition:
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 3 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Consistent meat and dairy</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Regular calories</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Sustained animal protein</li>
            </ul>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginTop: 8, fontFamily: F }}>[Hoppe C. et al. American Journal of Clinical Nutrition. 2004]</p>
          </section>

          {/* The Perfect Storm */}
          <section style={{ background: "#f0fdf4", borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.sigBorder}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>The Perfect Storm</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              Here&apos;s what happened biologically:
            </p>
            <ol className="space-y-3 list-decimal list-inside">
              <li style={{ fontSize: 13, color: C.body, fontFamily: F }}><strong>Late HPG activation</strong> &mdash; Rodman&apos;s puberty was delayed, likely due to childhood nutrition patterns</li>
              <li style={{ fontSize: 13, color: C.body, fontFamily: F }}><strong>Growth plates still open</strong> &mdash; Because puberty came late, his plates hadn&apos;t fused yet at 17&ndash;19</li>
              <li style={{ fontSize: 13, color: C.body, fontFamily: F }}><strong>GH secretion still high</strong> &mdash; Late adolescence is when GH output is near its peak</li>
              <li style={{ fontSize: 13, color: C.body, fontFamily: F }}><strong>Sudden protein and calorie upgrade</strong> &mdash; Institutional food provided consistent animal protein and energy</li>
              <li style={{ fontSize: 13, color: C.body, fontFamily: F }}><strong>IGF-1 surge</strong> &mdash; The liver finally had the amino acids to convert all that GH into IGF-1</li>
              <li style={{ fontSize: 13, color: C.body, fontFamily: F }}><strong>Compressed growth spurt</strong> &mdash; All the conditions aligned in a narrow window</li>
            </ol>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mt-4">
              The result: a dramatic one-foot growth spurt between roughly 17&ndash;20 years old.
            </p>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginTop: 8, fontFamily: F }}>[Juul A. et al. Journal of Clinical Endocrinology &amp; Metabolism. 1994]</p>
          </section>

          {/* What This Means for Parents */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>What This Means for Parents</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 16, fontFamily: F }}>
              Rodman&apos;s story is extreme, but the principles apply to every child:
            </p>

            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>1. Puberty Timing Matters</h3>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              Earlier puberty = shorter growth window. Factors that may trigger early puberty:
            </p>
            <ul className="space-y-1 mb-2">
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span>Excess body fat (increases estrogen)</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span>High animal protein very early in childhood</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span>Endocrine disruptors (plastics, chemicals)</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span>Obesity</li>
            </ul>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginBottom: 16, fontFamily: F }}>[He Q. et al. Journal of Clinical Endocrinology &amp; Metabolism. 2004]</p>

            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>2. Protein Type and Timing Matter</h3>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              The research suggests:
            </p>
            <ul className="space-y-2 mb-2">
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span><strong>Early childhood (0&ndash;6):</strong> A balanced mix with adequate but not excessive animal protein may support growth while avoiding early puberty triggers</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span><strong>Later childhood and adolescence:</strong> Higher animal protein supports the growth spurt once it begins</li>
            </ul>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginBottom: 16, fontFamily: F }}>[G&uuml;nther AL. et al. American Journal of Clinical Nutrition. 2010]</p>

            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>3. Consistent Nutrition During the Growth Window</h3>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              Once puberty begins, the clock is ticking. This is when:
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 3 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Protein intake should be optimized (1.2&ndash;1.5g/kg)</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Sleep should be maximized (GH release)</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Every growth factor should be in place</li>
            </ul>
          </section>

          {/* Bottom Line */}
          <section style={{ background: C.green, color: "#fff", borderRadius: 14, padding: 20, marginBottom: 16 }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: "#fff", margin: "0 0 12px" }}>The Bottom Line</h2>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.9)", lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              Dennis Rodman&apos;s growth story isn&apos;t magic &mdash; it&apos;s biology.
            </p>
            <p style={{ fontSize: 13, color: "#fff", fontWeight: 700, lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              Delayed puberty + sustained GH output + sudden nutrition upgrade + open growth plates = extraordinary late growth.
            </p>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.9)", lineHeight: 1.6, fontFamily: F }}>
              For parents, the lesson is clear: <strong>protect the growth window.</strong> Avoid factors that trigger early puberty, ensure adequate nutrition throughout childhood, and optimize everything once the growth spurt begins. You can&apos;t replicate Rodman&apos;s exact circumstances, but you can understand the same biological principles and apply them strategically.
            </p>
          </section>

          {/* References */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>References</h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              <li>Nilsson O, et al. Endocrine regulation of the growth plate. <em>Endocrine Reviews</em>. 2005;26(1):114-146.</li>
              <li>Yakar S, et al. Normal growth and development in the absence of hepatic insulin-like growth factor I. <em>Journal of Clinical Investigation</em>. 2002;109(9):1279-1288.</li>
              <li>G&uuml;nther AL, et al. Dietary protein intake and later height in children. <em>American Journal of Clinical Nutrition</em>. 2010;91(6):1684-1692.</li>
              <li>Hoppe C, et al. High intakes of milk, but not meat, increase s-insulin and insulin resistance in 8-year-old boys. <em>American Journal of Clinical Nutrition</em>. 2004;80(2):447-452.</li>
              <li>Juul A, et al. Serum levels of insulin-like growth factor I and its binding proteins in health and disease. <em>Journal of Clinical Endocrinology &amp; Metabolism</em>. 1994;78(6):1529-1535.</li>
              <li>He Q, et al. Sex differences in the association between body composition and onset of puberty. <em>Journal of Clinical Endocrinology &amp; Metabolism</em>. 2004;89(12):6417-6424.</li>
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
