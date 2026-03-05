'use client';

import Link from 'next/link';
import Nav from '@/components/Nav';

const F = "'Courier New', Courier, monospace";
const C = {
  bg: '#fafaf9', title: '#1c1917', body: '#57534e', light: '#a8a29e',
  green: '#059669', card: '#fff', border: '#e7e5e4', sigBorder: '#a7f3d0',
};

export default function ZincArticle() {
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
            <span style={{ fontSize: 9, fontWeight: 800, color: C.green, textTransform: "uppercase", letterSpacing: 1, fontFamily: F }}>Nutrition</span>
            <span style={{ fontSize: 9, color: C.light }}>·</span>
            <span style={{ fontSize: 11, color: C.light, fontFamily: F }}>6 min read</span>
          </div>
          <h1 style={{ fontFamily: F, fontSize: 22, fontWeight: 700, color: C.title, margin: "0 0 8px" }}>Zinc and the GH&ndash;IGF&#8209;1 Axis: Why This Mineral Controls Three Stages of Growth</h1>
          <p style={{ fontSize: 13, color: C.body, fontFamily: F, lineHeight: 1.5, margin: 0 }}>Zinc doesn&apos;t just &ldquo;support growth&rdquo; &mdash; it is required at every level of the GH&ndash;liver&ndash;IGF&#8209;1 pathway. Without adequate zinc, the entire axis underperforms, from pituitary release to growth plate response.</p>
        </div>

        {/* Article content */}
        <article>

          {/* The Big Picture */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>The Big Picture</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              Most parents know zinc is important. Few understand that it interacts with the growth hormone axis at three distinct levels: pituitary GH storage and secretion, hepatic IGF&#8209;1 production in the liver, and post&#8209;receptor IGF&#8209;1 signaling in target tissues like the growth plate. A deficiency at any one of these levels can quietly limit your child&apos;s height potential &mdash; even if everything else is optimized.
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontFamily: F }}>
              Your body doesn&apos;t store zinc. Unlike fat-soluble vitamins that accumulate over time, zinc must be consumed daily. This makes consistent dietary intake &mdash; or supplementation &mdash; non-negotiable for growth optimization.
            </p>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginTop: 8, fontFamily: F }}>[Stanford Children&apos;s Health. Zinc. 2024]</p>
          </section>

          {/* 1. Hypothalamus–Pituitary: GH Secretion */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>1. Hypothalamus&ndash;Pituitary: GH Secretion</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              In the pituitary&apos;s somatotroph cells, growth hormone is packaged into secretory granules before being released in pulses. Zinc ions are required for GH to self&#8209;associate and fold correctly inside these granules &mdash; without adequate zinc, granule biogenesis is impaired and normal pulsatile GH release is disrupted.
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              Zinc is also a key cofactor in broader pituitary endocrine function. It helps regulate the synthesis and secretion of GHRH (growth hormone&#8209;releasing hormone) and GH itself. When zinc homeostasis is disturbed, GH output becomes dysregulated &mdash; not catastrophically, but enough to blunt the amplitude of the pulses that drive growth.
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontFamily: F }}>
              Animal studies confirm this: zinc&#8209;deficient juvenile animals show reduced circulating GH, indicating that the immature pituitary cannot produce or release GH at full capacity without adequate zinc.
            </p>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginTop: 8, fontFamily: F }}><a href="https://pubmed.ncbi.nlm.nih.gov/2008018/" target="_blank" rel="noopener noreferrer" className="underline hover:text-forest/70">[Prasad AS. Discovery of human zinc deficiency. American Journal of Clinical Nutrition. 1991]</a></p>
          </section>

          {/* 2. Liver: IGF-1 Production */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>2. Liver: IGF&#8209;1 Production</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              The GH&ndash;IGF&#8209;1 axis is explicitly described in the literature as &ldquo;responsive to zinc status.&rdquo; In zinc deficiency, circulating IGF&#8209;1 concentrations are consistently decreased &mdash; even when GH levels vary or appear normal. This means the liver is failing to convert GH signals into IGF&#8209;1 efficiently.
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              Experimental models show that zinc deficiency lowers both serum IGF&#8209;1 and hepatic IGF&#8209;1 gene expression, suggesting that zinc is needed inside hepatocytes for normal GH&#8209;induced IGF&#8209;1 transcription and translation. The liver needs zinc to do its job as the GH&#8209;to&#8209;IGF&#8209;1 conversion factory.
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontFamily: F }}>
              Clinical work in children supports this directly. Zinc supplementation in growth&#8209;retarded and undernourished pediatric cohorts has been shown to raise circulating IGF&#8209;1 levels &mdash; consistent with improved hepatic IGF&#8209;1 output once zinc status is corrected. One study found that 10mg of zinc per day for 24 weeks led to a net gain of 0.37cm in height compared to controls.
            </p>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginTop: 8, fontFamily: F }}><a href="https://pubmed.ncbi.nlm.nih.gov/11815315/" target="_blank" rel="noopener noreferrer" className="underline hover:text-forest/70">[Brown KH et al. Effect of supplemental zinc on growth and serum zinc concentrations of prepubertal children. American Journal of Clinical Nutrition. 2002]</a></p>
            <p className="text-xs text-forest italic mt-1">[WHO. Zinc supplementation and growth in children. 2024]</p>
          </section>

          {/* 3. Peripheral IGF-1 Signaling: The Growth Plate */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>3. Peripheral IGF&#8209;1 Signaling: The Growth Plate</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              This is the level most people miss. Even if GH and IGF&#8209;1 levels are adequate, zinc deficiency can block the signal at the target tissue.
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              Zinc appears essential for IGF&#8209;1&#8209;induced cell proliferation at the growth plate. In zinc&#8209;deficient states, administering GH or IGF&#8209;1 alone does not fully correct growth failure &mdash; implying a block in signaling downstream of the IGF&#8209;1 receptor.
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              Mechanistically, reduced zinc availability alters membrane signaling systems and intracellular second messengers that coordinate proliferation in response to IGF&#8209;1. The growth plate chondrocytes receive the IGF&#8209;1 signal but cannot act on it properly. Normal IGF&#8209;1 levels signal less effectively when zinc is insufficient.
            </p>
            <div style={{ background: "#fffbeb", borderRadius: 10, padding: 12, border: "1px solid #fde68a" }}>
              <p style={{ fontSize: 13, color: "#78350f", lineHeight: 1.6, fontWeight: 600, fontFamily: F }}>
                This is critical: you can optimize sleep, sprints, and nutrition to maximize GH and IGF&#8209;1 &mdash; but if zinc status is low, the growth plates cannot fully respond to those signals.
              </p>
            </div>
          </section>

          {/* How Much Zinc Do Kids Need? */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>How Much Zinc Do Kids Need?</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              According to Stanford Children&apos;s Health, the recommended daily intake by age:
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px", display: "flex", flexDirection: "column", gap: 3 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Ages 1&ndash;3: 3 mg/day</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Ages 4&ndash;8: 5 mg/day</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Ages 9&ndash;13: 8 mg/day</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Males 14&ndash;18: 11 mg/day</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Females 14&ndash;18: 9 mg/day</li>
            </ul>
            <div style={{ background: "#fffbeb", borderRadius: 10, padding: 12, border: "1px solid #fde68a" }}>
              <p style={{ fontSize: 13, color: "#78350f", lineHeight: 1.6, fontWeight: 600, fontFamily: F }}>
                Important: vegetarian diets may require up to 50% more zinc than these amounts, because phytates in grains and legumes bind to zinc and reduce absorption. Lactose in milk actually aids zinc absorption.
              </p>
            </div>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginTop: 8, fontFamily: F }}>[Stanford Children&apos;s Health. Zinc. 2024]</p>
          </section>

          {/* Best Zinc Foods for Kids */}
          <section style={{ background: "#f0fdf4", borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.sigBorder}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>Best Zinc Foods for Kids</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              Cooked oysters are in a class of their own &mdash; nothing else comes close:
            </p>
            <div style={{ listStyle: "none", padding: 0, margin: "0 0 12px", display: "flex", flexDirection: "column", gap: 4 }}>
              <div className="flex justify-between items-center bg-white rounded-lg px-4 py-2 border border-gray-200">
                <span className="text-sm sm:text-base text-gray-700 font-medium">Cooked oysters (3 oz)</span>
                <span className="text-sm sm:text-base text-forest font-bold">28.2 mg</span>
              </div>
              <div className="flex justify-between items-center bg-white rounded-lg px-4 py-2 border border-gray-200">
                <span className="text-sm sm:text-base text-gray-700 font-medium">Beef, roasted (3 oz)</span>
                <span className="text-sm sm:text-base text-forest font-bold">3.8 mg</span>
              </div>
              <div className="flex justify-between items-center bg-white rounded-lg px-4 py-2 border border-gray-200">
                <span className="text-sm sm:text-base text-gray-700 font-medium">Pumpkin seeds, roasted (1 oz)</span>
                <span className="text-sm sm:text-base text-forest font-bold">2.2 mg</span>
              </div>
              <div className="flex justify-between items-center bg-white rounded-lg px-4 py-2 border border-gray-200">
                <span className="text-sm sm:text-base text-gray-700 font-medium">Cheddar cheese (1.5 oz)</span>
                <span className="text-sm sm:text-base text-forest font-bold">1.5 mg</span>
              </div>
              <div className="flex justify-between items-center bg-white rounded-lg px-4 py-2 border border-gray-200">
                <span className="text-sm sm:text-base text-gray-700 font-medium">Sardines, cooked (3 oz)</span>
                <span className="text-sm sm:text-base text-forest font-bold">1.1 mg</span>
              </div>
              <div className="flex justify-between items-center bg-white rounded-lg px-4 py-2 border border-gray-200">
                <span className="text-sm sm:text-base text-gray-700 font-medium">Greek yogurt (6 oz)</span>
                <span className="text-sm sm:text-base text-forest font-bold">1.0 mg</span>
              </div>
              <div className="flex justify-between items-center bg-white rounded-lg px-4 py-2 border border-gray-200">
                <span className="text-sm sm:text-base text-gray-700 font-medium">Egg (1 large)</span>
                <span className="text-sm sm:text-base text-forest font-bold">0.6 mg</span>
              </div>
            </div>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontFamily: F }}>
              Oysters must always be thoroughly cooked for children &mdash; never raw. Cooked oysters are safe for children and can be introduced as early as 6 months of age when finely chopped. For older kids, fried oysters, oyster stew, or oysters mixed into pasta are all excellent delivery methods.
            </p>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginTop: 8, fontFamily: F }}>[Stanford Children&apos;s Health. Zinc. 2024]</p>
            <p className="text-xs text-forest italic mt-1">[CDC. Zinc: Infant and Toddler Nutrition. 2024]</p>
          </section>

          {/* Should You Supplement? */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>Should You Supplement?</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              If your child eats cooked oysters 1&ndash;2x per week plus beef, eggs, and dairy daily, they are likely meeting zinc needs through food alone. But because the body cannot store zinc, daily intake matters.
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              For families where oysters and red meat aren&apos;t regular staples, a liquid zinc sulfate supplement is reasonable insurance. Look for organic zinc sulfate drops formulated for children. Typical supplemental doses range from 5&ndash;11mg depending on age.
            </p>
            <div style={{ background: "#fffbeb", borderRadius: 10, padding: 12, border: "1px solid #fde68a" }}>
              <p style={{ fontSize: 13, color: "#78350f", lineHeight: 1.6, fontWeight: 600, fontFamily: F }}>
                Always consult your child&apos;s pediatrician before starting any supplement.
              </p>
            </div>
          </section>

          {/* The bioKids Takeaway */}
          <section style={{ background: C.green, color: "#fff", borderRadius: 14, padding: 20, marginBottom: 16 }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: "#fff", margin: "0 0 12px" }}>The bioKids Takeaway</h2>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.9)", lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              Zinc is load-bearing at every stage of the growth axis. A child can have perfect sleep, perfect sprints, and perfect nutrition &mdash; but if zinc status is insufficient, the pituitary undersecretes GH, the liver underproduces IGF&#8209;1, and the growth plates underrespond to the IGF&#8209;1 that does arrive.
            </p>
            <p className="text-sm sm:text-base text-white font-semibold leading-relaxed">
              The bioKids protocol prioritizes zinc-rich foods as foundational, not supplemental. Cooked oysters 1&ndash;2x per week, daily eggs, beef liver weekly, and pumpkin seeds as a regular snack keep all three levels of the axis fully loaded so nothing is left on the table.
            </p>
          </section>

          {/* References */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>References</h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              <li><a href="https://pubmed.ncbi.nlm.nih.gov/2008018/" target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline hover:text-emerald-900">Prasad AS. Discovery of human zinc deficiency: its impact on human health and disease. <em>American Journal of Clinical Nutrition</em>. 1991;53(2):403-412.</a></li>
              <li><a href="https://pubmed.ncbi.nlm.nih.gov/11815315/" target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline hover:text-emerald-900">Brown KH et al. Effect of supplemental zinc on the growth and serum zinc concentrations of prepubertal children: a meta-analysis of randomized controlled trials. <em>American Journal of Clinical Nutrition</em>. 2002;75(6):1062-1071.</a></li>
              <li className="text-emerald-700">WHO. Zinc supplementation and growth in children. 2024.</li>
              <li className="text-emerald-700">Stanford Children&apos;s Health. Zinc. 2024.</li>
              <li className="text-emerald-700">CDC. Zinc: Infant and Toddler Nutrition. 2024.</li>
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
