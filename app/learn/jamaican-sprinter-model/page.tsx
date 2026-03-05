'use client';

import Link from 'next/link';
import Nav from '@/components/Nav';

const F = "'Courier New', Courier, monospace";
const C = {
  bg: '#fafaf9', title: '#1c1917', body: '#57534e', light: '#a8a29e',
  green: '#059669', card: '#fff', border: '#e7e5e4', sigBorder: '#a7f3d0',
};

export default function JamaicanSprinterModelArticle() {
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
            <span style={{ fontSize: 9, fontWeight: 800, color: C.green, textTransform: "uppercase", letterSpacing: 1, fontFamily: F }}>Exercise</span>
            <span style={{ fontSize: 9, color: C.light }}>·</span>
            <span style={{ fontSize: 11, color: C.light, fontFamily: F }}>8 min read</span>
          </div>
          <h1 style={{ fontFamily: F, fontSize: 22, fontWeight: 700, color: C.title, margin: "0 0 8px" }}>The Jamaican Sprinter Model: Why They Never Lift Weights</h1>
          <p style={{ fontSize: 13, color: C.body, fontFamily: F, lineHeight: 1.5, margin: 0 }}>How a small island builds the world&apos;s fastest humans &mdash; without a single barbell.</p>
        </div>

        {/* Article content */}
        <article>

          {/* The Jamaican Paradox */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>The Jamaican Paradox</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              Jamaica has roughly 3 million people. Yet this small island produces an outsized share of the world&apos;s fastest sprinters: Usain Bolt, Shelly-Ann Fraser-Pryce, Elaine Thompson-Herah, and dozens more.
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontWeight: 600, fontFamily: F }}>
              This isn&apos;t a fluke. It&apos;s the result of a training philosophy that prioritizes sprinting over weight lifting &mdash; and protects growth plates in the process.
            </p>
          </section>

          {/* The Core Rule */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>The Core Rule: No Weight Lifting Until Plates Close</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              Jamaica&apos;s high school sprint system largely <strong>forbids weight lifting until after growth plates are presumed fused</strong> &mdash; typically age 18&ndash;20.
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              This isn&apos;t an oversight. It&apos;s intentional.
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              Instead, they build world-class speed and power through:
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px", display: "flex", flexDirection: "column", gap: 3 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Sprinting</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Hill runs</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Intensive tempo runs</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Technical drills</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Plyometrics</li>
            </ul>
            <div style={{ background: "#f0fdf4", border: `1px solid ${C.sigBorder}`, borderRadius: 10, padding: 12 }}>
              <p className="text-sm sm:text-base text-gray-800 leading-relaxed font-medium">
                The result? An island of 3 million produces more sub-10-second 100-meter sprinters than countries with 100x the population.
              </p>
            </div>
          </section>

          {/* The "Run to Get Stronger" Model */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>The &ldquo;Run to Get Stronger&rdquo; Model</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              Jamaican high school sprint sessions emphasize:
            </p>
            <div style={{ overflowX: "auto", marginBottom: 12 }}>
              <table style={{ width: "100%", fontSize: 12, fontFamily: F, borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                    <th style={{ textAlign: "left", padding: "6px 12px 6px 0", color: C.title, fontWeight: 700 }}>Component</th>
                    <th style={{ textAlign: "left", padding: "6px 0", color: C.title, fontWeight: 700 }}>Details</th>
                  </tr>
                </thead>
                <tbody style={{ color: C.body }}>
                  <tr style={{ borderBottom: "1px solid #f5f5f4" }}>
                    <td style={{ padding: "6px 12px 6px 0", fontWeight: 600 }}>Acceleration work</td>
                    <td style={{ padding: "6px 0" }}>20&ndash;40 meters</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #f5f5f4" }}>
                    <td style={{ padding: "6px 12px 6px 0", fontWeight: 600 }}>Speed endurance</td>
                    <td style={{ padding: "6px 0" }}>150&ndash;300 meters on grass or track</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #f5f5f4" }}>
                    <td style={{ padding: "6px 12px 6px 0", fontWeight: 600 }}>Session volume</td>
                    <td style={{ padding: "6px 0" }}>1000&ndash;2500 meters total</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #f5f5f4" }}>
                    <td style={{ padding: "6px 12px 6px 0", fontWeight: 600 }}>Footwear</td>
                    <td style={{ padding: "6px 0" }}>Mostly flats</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #f5f5f4" }}>
                    <td style={{ padding: "6px 12px 6px 0", fontWeight: 600 }}>Surfaces</td>
                    <td style={{ padding: "6px 0" }}>Varied &mdash; track, grass, hills</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "6px 12px 6px 0", fontWeight: 600 }}>Tapering</td>
                    <td style={{ padding: "6px 0" }}>Volume decreases as competition approaches</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, fontWeight: 600, fontFamily: F }}>
              This builds extraordinary power without compressive loading of growth plates.
            </p>
          </section>

          {/* Why Weight Lifting Harms Growing Children */}
          <section style={{ background: "#fffbeb", borderRadius: 14, padding: 20, marginBottom: 16, border: "1px solid #fde68a" }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>Why Weight Lifting Harms Growing Children</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              Weight lifting introduces:
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px", display: "flex", flexDirection: "column", gap: 3 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span><strong>Axial compression</strong> on the spine</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span><strong>Shear forces</strong> on growth plates</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span>Risk of <strong>physeal (growth plate) injuries</strong></li>
            </ul>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              The Jamaican approach avoids all of this while still building:
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 3 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Explosive power</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Fast-twitch muscle recruitment</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Coordination and speed</li>
            </ul>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginTop: 8, fontFamily: F }}>[Caine D. et al. Sports Medicine. 2006]</p>
          </section>

          {/* Sprinting vs. Weight Lifting */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>Sprinting vs. Weight Lifting: The Comparison</h2>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", fontSize: 12, fontFamily: F, borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                    <th style={{ textAlign: "left", padding: "6px 12px 6px 0", color: C.title, fontWeight: 700 }}>Factor</th>
                    <th style={{ textAlign: "left", padding: "6px 12px 6px 0", color: C.title, fontWeight: 700 }}>Sprinting</th>
                    <th style={{ textAlign: "left", padding: "6px 0", color: C.title, fontWeight: 700 }}>Weight Lifting</th>
                  </tr>
                </thead>
                <tbody style={{ color: C.body }}>
                  <tr style={{ borderBottom: "1px solid #f5f5f4" }}>
                    <td style={{ padding: "6px 12px 6px 0", fontWeight: 600 }}>GH Response</td>
                    <td style={{ padding: "6px 12px 6px 0" }}>Very high (300&ndash;700%+)</td>
                    <td style={{ padding: "6px 0" }}>Moderate-high</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #f5f5f4" }}>
                    <td style={{ padding: "6px 12px 6px 0", fontWeight: 600 }}>Growth Plate Risk</td>
                    <td className="py-2 pr-4 text-forest font-medium">Minimal</td>
                    <td className="py-2 text-red-600 font-medium">Significant</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #f5f5f4" }}>
                    <td style={{ padding: "6px 12px 6px 0", fontWeight: 600 }}>Loading Pattern</td>
                    <td style={{ padding: "6px 12px 6px 0" }}>Natural, borne by muscle/tendon</td>
                    <td style={{ padding: "6px 0" }}>External axial compression</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #f5f5f4" }}>
                    <td style={{ padding: "6px 12px 6px 0", fontWeight: 600 }}>Coordination Development</td>
                    <td style={{ padding: "6px 12px 6px 0" }}>High</td>
                    <td style={{ padding: "6px 0" }}>Moderate</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "6px 12px 6px 0", fontWeight: 600 }}>Speed/Power Development</td>
                    <td style={{ padding: "6px 12px 6px 0" }}>Excellent</td>
                    <td style={{ padding: "6px 0" }}>Good for strength, not speed</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mt-4">
              Sprinting delivers GH responses that <strong>rival or exceed</strong> weight training &mdash; while imposing <strong>far less risk to open growth plates.</strong>
            </p>
            <p className="text-xs text-forest italic mt-2">[Faigenbaum AD. et al. Pediatrics. 2009]</p>
          </section>

          {/* The Critical Difference */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>The Critical Difference</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              Pediatric sports-medicine literature consistently identifies maximal running, jumping, and change-of-direction as natural, developmentally appropriate activities.
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              The loading patterns are primarily borne by muscle and tendon rather than by heavy, externally imposed axial compression on the spine and growth plates.
            </p>
            <div style={{ background: "#f0fdf4", border: `1px solid ${C.sigBorder}`, borderRadius: 10, padding: 12 }}>
              <p className="text-sm sm:text-base text-gray-800 leading-relaxed font-medium">
                Sprinting is what the human skeleton evolved to do. Heavy barbells are not.
              </p>
            </div>
            <p style={{ fontSize: 10, color: C.green, fontStyle: "italic", marginTop: 8, fontFamily: F }}>[Myer GD. et al. British Journal of Sports Medicine. 2011]</p>
          </section>

          {/* The Rule for Parents */}
          <section style={{ background: "#fffbeb", borderRadius: 14, padding: 20, marginBottom: 16, border: "1px solid #fde68a" }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>The Rule for Parents</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4 font-semibold">
              Children should not lift weights. Period.
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              The growth years are for:
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px", display: "flex", flexDirection: "column", gap: 3 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Sprinting</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Running</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Jumping</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Climbing</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Stretching</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Playing</li>
            </ul>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              Adding external loads to open growth plates introduces axial compression with <strong>no upside for growth</strong> and real risk of:
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px", display: "flex", flexDirection: "column", gap: 3 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span>Physeal injuries</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span>Impaired coordination development</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: "#ef4444" }}>&#10007;</span>Premature growth plate stress</li>
            </ul>
            <p className="text-sm sm:text-base text-amber-900 leading-relaxed font-semibold">
              Wait until growth plates close &mdash; typically age 18&ndash;20 &mdash; before introducing any serious weight training.
            </p>
            <p className="text-xs text-forest italic mt-2">[Caine D. et al. Sports Medicine. 2006]</p>
          </section>

          {/* The Jamaican Diet */}
          <section style={{ background: "#f0fdf4", borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.sigBorder}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>The Jamaican Diet: Fuel for Sprinters</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              Traditional Jamaican staples align perfectly with sprint performance:
            </p>
            <div style={{ overflowX: "auto", marginBottom: 12 }}>
              <table style={{ width: "100%", fontSize: 12, fontFamily: F, borderCollapse: "collapse" }}>
                <thead>
                  <tr className="border-b border-forest/30">
                    <th style={{ textAlign: "left", padding: "6px 12px 6px 0", color: C.title, fontWeight: 700 }}>Food</th>
                    <th style={{ textAlign: "left", padding: "6px 0", color: C.title, fontWeight: 700 }}>Benefit</th>
                  </tr>
                </thead>
                <tbody style={{ color: C.body }}>
                  <tr className="border-b border-forest/10">
                    <td style={{ padding: "6px 12px 6px 0", fontWeight: 600 }}>Yams &amp; plantains</td>
                    <td style={{ padding: "6px 0" }}>Complex carbs, potassium for high-intensity fuel</td>
                  </tr>
                  <tr className="border-b border-forest/10">
                    <td style={{ padding: "6px 12px 6px 0", fontWeight: 600 }}>Ackee</td>
                    <td style={{ padding: "6px 0" }}>Unique protein-fat combination</td>
                  </tr>
                  <tr className="border-b border-forest/10">
                    <td style={{ padding: "6px 12px 6px 0", fontWeight: 600 }}>Fish</td>
                    <td style={{ padding: "6px 0" }}>Omega-3s, iodine for brain and thyroid</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "6px 12px 6px 0", fontWeight: 600 }}>Chicken</td>
                    <td style={{ padding: "6px 0" }}>Affordable lean protein for muscle</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 6, fontFamily: F }}>
              This whole-food pattern supports:
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 3 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Repeated GH pulses from sprinting</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Superior micronutrient status</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Lower chronic inflammation</li>
            </ul>
          </section>

          {/* The Cultural Factor */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>The Cultural Factor</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              Jamaica&apos;s CHAMPS (Boys and Girls Championships) is a nationally televised, hyper-competitive scholastic meet that starts in primary school.
            </p>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>This creates:</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 3 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Early talent identification</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>A development pipeline unmatched elsewhere</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>National pride in speed</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Community celebration of physical achievement</li>
            </ul>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mt-3 font-medium">
              Children grow up knowing that speed matters &mdash; and that sprinting is the path to excellence.
            </p>
          </section>

          {/* The Invisible Training */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>The Invisible Training</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              In many Jamaican communities:
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px", display: "flex", flexDirection: "column", gap: 3 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Limited car access means children walk and run everywhere</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Kids chase goats and animals for play</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green, fontWeight: 700 }}>&#8226;</span>Days are spent outdoors in constant movement</li>
            </ul>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>
              This &ldquo;invisible training&rdquo; builds:
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px", display: "flex", flexDirection: "column", gap: 3 }}>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Tendon stiffness</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Neuromuscular coordination</li>
              <li style={{ display: "flex", gap: 6, fontSize: 13, color: C.body, fontFamily: F }}><span style={{ color: C.green }}>&#10003;</span>Thousands of sprint-like efforts before formal training</li>
            </ul>
            <div style={{ background: "#fffbeb", borderRadius: 10, padding: 12, border: "1px solid #fde68a" }}>
              <p style={{ fontSize: 13, color: "#78350f", lineHeight: 1.6, fontWeight: 600, fontFamily: F }}>
                Urban, screen-heavy childhoods don&apos;t provide this foundation.
              </p>
            </div>
          </section>

          {/* What Parents Can Learn */}
          <section style={{ background: "#f0fdf4", borderRadius: 14, padding: 20, marginBottom: 16, border: `1px solid ${C.sigBorder}` }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>What Parents Can Learn</h2>
            <p style={{ fontSize: 13, color: C.body, lineHeight: 1.6, marginBottom: 8, fontFamily: F }}>The Jamaican model teaches us:</p>
            <ol style={{ padding: 0, margin: 0, paddingLeft: 16, display: "flex", flexDirection: "column", gap: 4 }}>
              <li style={{ fontSize: 13, color: C.body, fontFamily: F }}><strong>Sprinting alone can build remarkable strength and power</strong></li>
              <li style={{ fontSize: 13, color: C.body, fontFamily: F }}><strong>Weight lifting is unnecessary for athletic development</strong></li>
              <li style={{ fontSize: 13, color: C.body, fontFamily: F }}><strong>Protecting growth plates should be a priority</strong></li>
              <li style={{ fontSize: 13, color: C.body, fontFamily: F }}><strong>Outdoor play and running trump gym memberships</strong></li>
              <li style={{ fontSize: 13, color: C.body, fontFamily: F }}><strong>Whole foods beat supplements</strong></li>
              <li style={{ fontSize: 13, color: C.body, fontFamily: F }}><strong>Culture and community support athletic development</strong></li>
            </ol>
          </section>

          {/* Bottom Line */}
          <section style={{ background: C.green, color: "#fff", borderRadius: 14, padding: 20, marginBottom: 16 }}>
            <h2 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: "#fff", margin: "0 0 12px" }}>The Bottom Line</h2>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.9)", lineHeight: 1.6, marginBottom: 12, fontFamily: F }}>
              If Jamaica can produce Olympic champions without weight rooms, your child doesn&apos;t need one either.
            </p>
            <p className="text-sm sm:text-base text-white font-semibold leading-relaxed">
              The growth years are for running fast and playing hard. Weight lifting can wait until the body is done growing.
            </p>
          </section>

          {/* References */}
          <section style={{ background: C.card, borderRadius: 14, padding: 20, border: `1px solid ${C.border}` }}>
            <h2 style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: C.title, margin: "0 0 12px" }}>References</h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              <li>Caine D, et al. Physeal injuries in children&apos;s and youth sports: reasons for concern? <em>Sports Medicine</em>. 2006;36(9):749-767.</li>
              <li>Faigenbaum AD, et al. Youth resistance training: updated position statement paper from the National Strength and Conditioning Association. <em>Pediatrics</em>. 2009;124(5):e1157-e1167.</li>
              <li>Myer GD, et al. When to initiate integrative neuromuscular training to reduce sports-related injuries in youth? <em>British Journal of Sports Medicine</em>. 2011;45(2):90-95.</li>
              <li>Maffulli N, et al. Long-term sport involvement and sport specialization in young athletes. <em>British Journal of Sports Medicine</em>. 2010;44(14):1014-1019.</li>
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
