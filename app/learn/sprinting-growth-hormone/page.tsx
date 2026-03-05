'use client';

import Link from 'next/link';
import Nav from '@/components/Nav';

const F = "'Courier New', Courier, monospace";
const C = {
  bg: '#fafaf9', title: '#1c1917', body: '#57534e', light: '#a8a29e',
  green: '#059669', card: '#fff', border: '#e7e5e4', sigBorder: '#a7f3d0',
};

export default function SprintingGHArticle() {
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
            <span style={{ fontSize: 9, fontWeight: 800, color: C.green, textTransform: "uppercase", letterSpacing: 1, fontFamily: F }}>Exercise</span>
            <span style={{ fontSize: 9, color: C.light }}>·</span>
            <span style={{ fontSize: 11, color: C.light, fontFamily: F }}>7 min read</span>
          </div>
          <h1 style={{ fontFamily: F, fontSize: 22, fontWeight: 700, color: C.title, margin: "0 0 8px" }}>Sprinting: The Most Powerful Natural Growth Hormone Trigger</h1>
          <p style={{ fontSize: 13, color: C.body, fontFamily: F, lineHeight: 1.5, margin: 0 }}>Why 30-second sprints can raise GH by 700% &mdash; and how to use this for your child.</p>
        </div>

        {/* Article content */}
        <article>

          {/* The Science Is Clear */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>The Science Is Clear</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontFamily: F }}>
              Sprinting is the single most potent natural stimulus for acute growth hormone release. And it does so through a movement pattern that is natural, load-free, and perfectly suited to children.
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mt-3 font-medium">
              No gym. No weights. No equipment. Just running as fast as possible.
            </p>
          </section>

          {/* The Numbers: Sprint-Induced GH Release */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>The Numbers: Sprint-Induced GH Release</h2>

            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>Single Sprint Response</h3>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 6, fontFamily: F }}>
              A single 30-second all-out sprint raises serum GH to <strong>more than 4.5-fold</strong> the response of a 6-second sprint, with elevated GH persisting for <strong>90&ndash;120 minutes</strong> after the effort.
            </p>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginBottom: 16, fontFamily: F }}>[Stokes KA. et al. Journal of Applied Physiology. 2002]</p>

            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>Sprint-Trained vs. Endurance-Trained</h3>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              In treadmill experiments comparing athletes:
            </p>
            <div className="overflow-x-auto mb-2">
              <table style={{ width: "100%", fontSize: 12, fontFamily: F, borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                    <th style={{ textAlign: "left", padding: "6px 12px 6px 0", color: C.title, fontWeight: 700 }}>Athlete Type</th>
                    <th style={{ textAlign: "left", padding: "6px 0", color: C.title, fontWeight: 700 }}>Peak GH Response</th>
                  </tr>
                </thead>
                <tbody style={{ color: C.body }}>
                  <tr style={{ borderBottom: "1px solid #f5f5f4" }}>
                    <td style={{ padding: "6px 12px 6px 0" }}>Sprint-trained</td>
                    <td className="py-2 font-medium">72.4 mU/l</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "6px 12px 6px 0" }}>Endurance-trained</td>
                    <td style={{ padding: "6px 0" }}>26.3 mU/l</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 6, fontFamily: F }}>
              That&apos;s approximately <strong>2.75-fold higher</strong> GH response in sprint-trained athletes from identical sprint stimuli.
            </p>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginBottom: 16, fontFamily: F }}>[Nevill ME. et al. Journal of Applied Physiology. 1996]</p>

            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>The 700%+ Effect</h3>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 6, fontFamily: F }}>
              Sprint-interval protocols using repeated 30-second sprints with generous rest intervals consistently produce GH increases in the range of <strong>several hundred percent</strong> &mdash; with some studies documenting increases of 700% or more.
            </p>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", fontFamily: F }}>[Wideman L. et al. Sports Medicine. 2002]</p>
          </section>

          {/* How Sprinting Triggers Massive GH Release */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>How Sprinting Triggers Massive GH Release</h2>

            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>The Metabolic Crisis</h3>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              Maximal efforts of 20&ndash;30 seconds drive the body into a brief, severe metabolic crisis:
            </p>
            <ol className="space-y-2 list-decimal list-inside mb-5">
              <li style={{ fontSize: 13, color: C.body, fontFamily: F }}><strong>Phosphocreatine depletion</strong> &mdash; rapid exhaustion of immediate energy stores</li>
              <li style={{ fontSize: 13, color: C.body, fontFamily: F }}><strong>Blood lactate surge</strong> &mdash; high concentrations from anaerobic glycolysis</li>
              <li style={{ fontSize: 13, color: C.body, fontFamily: F }}><strong>Acid-base perturbation</strong> &mdash; pH drops significantly</li>
            </ol>

            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>Lactate as a GH Secretagogue</h3>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              Here&apos;s the key insight: <strong>blood lactate itself acts as a growth hormone secretagogue.</strong>
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              In sprint studies, 82% of the variation in peak GH response was explained by just two factors:
            </p>
            <ul className="space-y-1 mb-2">
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Peak power output</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Blood lactate concentration</li>
            </ul>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 6, fontWeight: 600, fontFamily: F }}>
              Higher lactate = higher GH. Sprinting maximizes both.
            </p>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginBottom: 16, fontFamily: F }}>[Nevill ME. et al. Journal of Applied Physiology. 1996]</p>

            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>The Hypothalamic Signal</h3>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              These metabolic signals converge at the hypothalamus and pituitary to:
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 8px", display: "flex", flexDirection: "column", gap: 3 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span><strong>Favor GH-releasing hormone (GHRH)</strong></li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span><strong>Suppress somatostatin</strong> (the GH-blocking hormone)</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Produce a <strong>large, transient GH pulse</strong></li>
            </ul>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontFamily: F }}>
              This pulse supports lipolysis, glycogen resynthesis, and muscle repair &mdash; and in children, drives growth plate activity.
            </p>
          </section>

          {/* Sprinting vs. Endurance Training */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>Sprinting vs. Endurance Training</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              Endurance training (long-distance running, cycling) does not produce the same GH response.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px", display: "flex", flexDirection: "column", gap: 3 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span>Lower intensity = less lactate</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span>Less lactate = weaker GH signal</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span>Aerobic metabolism doesn&apos;t create the &ldquo;metabolic crisis&rdquo; that triggers massive GH pulses</li>
            </ul>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 6, fontFamily: F }}>
              Sprint-trained athletes mount <strong>~3x higher GH responses</strong> to identical stimuli than endurance-trained athletes.
            </p>
            <div className="bg-forest/5 border border-forest/20 rounded-xl p-4 mt-4">
              <p className="text-sm sm:text-base text-gray-800 leading-relaxed font-medium">
                For growth optimization, short and fast beats long and slow.
              </p>
            </div>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginTop: 8, fontFamily: F }}>[Nevill ME. et al. Journal of Applied Physiology. 1996]</p>
          </section>

          {/* The Adaptation Effect */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>The Adaptation Effect</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              Over time, repeated sprint training <strong>enhances the responsiveness of the GH axis</strong> to exercise.
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>This means:</p>
            <ul className="space-y-1 mb-2">
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>More robust GH pulses from the same effort</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Maintained GH reactivity into adulthood</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Better hormonal profile than purely endurance-trained individuals</li>
            </ul>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginTop: 8, fontFamily: F }}>[Wideman L. et al. Sports Medicine. 2002]</p>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-4">
              <p style={{ fontSize: 13, color: "#78350f", lineHeight: 1.6, fontWeight: 600, fontFamily: F }}>
                Sprinting doesn&apos;t just trigger GH &mdash; it trains the body to produce more GH.
              </p>
            </div>
          </section>

          {/* Why This Matters for Growth */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>Why This Matters for Growth</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              The GH released during and after sprinting:
            </p>
            <ol className="space-y-2 list-decimal list-inside mb-4">
              <li style={{ fontSize: 13, color: C.body, fontFamily: F }}>Travels to the liver</li>
              <li style={{ fontSize: 13, color: C.body, fontFamily: F }}>Triggers IGF-1 production</li>
              <li style={{ fontSize: 13, color: C.body, fontFamily: F }}>IGF-1 acts on growth plates</li>
              <li style={{ fontSize: 13, color: C.body, fontFamily: F }}>Growth plates produce new cartilage &rarr; bone</li>
            </ol>
            <div style={{ background: "#f0fdf4", border: `1px solid ${C.sigBorder}`, borderRadius: 10, padding: 12 }}>
              <p className="text-sm sm:text-base text-gray-800 leading-relaxed font-medium">
                More sprinting = more GH pulses = more IGF-1 = more growth plate activity.
              </p>
            </div>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mt-4">
              Combined with adequate sleep (when 70&ndash;80% of daily GH is released), nutrition, and the absence of growth-limiting factors, sprinting creates an optimal hormonal environment for growth.
            </p>
          </section>

          {/* Practical Protocols by Age */}
          <section style={{ background: "#f0fdf4", borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.sigBorder}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>Practical Protocols by Age</h2>

            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 6px" }}>Under Age 10: Sprint Play</h3>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              The most effective &ldquo;protocol&rdquo; is disguised as play:
            </p>
            <ul className="space-y-1 mb-2">
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Tag and chase games</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Races to a tree, car, or finish line</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Small-sided sports (soccer, basketball)</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Hill running as a game</li>
            </ul>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mt-3">
              These naturally produce repeated 5&ndash;20 second accelerations with ample rest &mdash; <strong>exactly the intensity-rest pattern that maximizes GH release.</strong>
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mt-2 font-medium">
              No formal &ldquo;training&rdquo; needed. Just outdoor play.
            </p>
          </section>

          <section style={{ background: "#f0fdf4", borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.sigBorder}` }}>
            <h3 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.title, margin: "0 0 8px" }}>Ages 10+: Structured Sprint Sessions</h3>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-black text-sm mb-2">Basic Protocol:</h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 3 }}>
                  <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>4&ndash;6 maximal sprints of 20&ndash;40 meters</li>
                  <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>2&ndash;4 minutes walking recovery between sprints</li>
                  <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>2&ndash;3 sessions per week</li>
                  <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Thorough warm-up first</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-black text-sm mb-2">Hill Sprint Variation:</h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 3 }}>
                  <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>4&ndash;6 short hill sprints (10&ndash;15 seconds each)</li>
                  <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Walk back down for full recovery</li>
                  <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Frame as &ldquo;races&rdquo; to keep it fun</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-black text-sm mb-2">Grass or Track:</h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 3 }}>
                  <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Varied surfaces are fine</li>
                  <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Grass may be gentler on joints</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Scheduling Principles */}
          <section style={{ background: "#fffbeb", borderRadius: 14, padding: 20, marginBottom: 16, border: "1px solid #fde68a" }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>Scheduling Principles</h2>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", fontSize: 12, fontFamily: F, borderCollapse: "collapse" }}>
                <thead>
                  <tr className="border-b border-amber-300">
                    <th style={{ textAlign: "left", padding: "6px 12px 6px 0", color: C.title, fontWeight: 700 }}>Principle</th>
                    <th style={{ textAlign: "left", padding: "6px 0", color: C.title, fontWeight: 700 }}>Reason</th>
                  </tr>
                </thead>
                <tbody style={{ color: C.body }}>
                  <tr className="border-b border-amber-200">
                    <td style={{ padding: "6px 12px 6px 0", fontWeight: 600 }}>Avoid sprinting right after meals</td>
                    <td style={{ padding: "6px 0" }}>Blunts GH response</td>
                  </tr>
                  <tr className="border-b border-amber-200">
                    <td style={{ padding: "6px 12px 6px 0", fontWeight: 600 }}>At least 1 day rest between sessions</td>
                    <td style={{ padding: "6px 0" }}>Recovery and adaptation</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "6px 12px 6px 0", fontWeight: 600 }}>Avoid late-evening maximal sprints</td>
                    <td style={{ padding: "6px 0" }}>May delay sleep onset</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Bottom Line */}
          <section style={{ background: C.green, color: "#fff", borderRadius: 14, padding: 20, marginBottom: 16 }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: "#fff", margin: "0 0 12px" }}>The Bottom Line</h2>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.9)", lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              Sprinting is nature&apos;s growth hormone injection.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px", display: "flex", flexDirection: "column", gap: 4 }}>
              <li className="flex gap-2 text-sm sm:text-base text-white/90"><span className="text-white font-bold">&#10003;</span><strong>30-second sprints can raise GH by 700%+</strong></li>
              <li className="flex gap-2 text-sm sm:text-base text-white/90"><span className="text-white font-bold">&#10003;</span><strong>Effects persist for 90&ndash;120 minutes</strong></li>
              <li className="flex gap-2 text-sm sm:text-base text-white/90"><span className="text-white font-bold">&#10003;</span><strong>Sprint-trained athletes produce 3x more GH than endurance-trained</strong></li>
              <li className="flex gap-2 text-sm sm:text-base text-white/90"><span className="text-white font-bold">&#10003;</span><strong>Zero growth plate risk when done naturally</strong></li>
            </ul>
            <p className="text-sm sm:text-base text-white font-semibold leading-relaxed">
              Your child doesn&apos;t need a gym membership. They need a field, a hill, or a backyard &mdash; and permission to run as fast as they can.
            </p>
          </section>

          {/* References */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>References</h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              <li>Stokes KA, et al. The time course of the human growth hormone response to a 6-s and a 30-s cycle ergometer sprint. <em>Journal of Applied Physiology</em>. 2002;93(5):1785-1791.</li>
              <li>Nevill ME, et al. Growth hormone responses to treadmill sprinting in sprint- and endurance-trained athletes. <em>Journal of Applied Physiology</em>. 1996;72(2):539-544.</li>
              <li>Wideman L, et al. Growth hormone release during acute and chronic aerobic and resistance exercise. <em>Sports Medicine</em>. 2002;32(15):987-1004.</li>
              <li>Godfrey RJ, et al. The exercise-induced growth hormone response in athletes. <em>Sports Medicine</em>. 2003;33(8):599-613.</li>
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
