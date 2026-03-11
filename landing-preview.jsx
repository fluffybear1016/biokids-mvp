import { useState } from "react";

const mono = "'Courier New', Courier, monospace";
const serif = "Georgia, 'Times New Roman', serif";

export default function LandingPreview() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#fafaf9", fontFamily: mono }}>
      {/* Nav */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, backgroundColor: "rgba(250,250,249,0.95)", backdropFilter: "blur(4px)", borderBottom: "1px solid #e7e5e4" }}>
        <div style={{ maxWidth: 1024, margin: "0 auto", padding: "12px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 8, background: "#f0fdf4", border: "1px solid #065f46", borderRadius: 10, padding: "5px 12px" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#065f46", display: "inline-block" }} />
            <span style={{ fontSize: 13, fontWeight: 700, color: "#065f46", letterSpacing: "0.04em" }}>bioKids</span>
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <span style={{ fontSize: 14, fontWeight: 500, color: "#1c1917" }}>Log in</span>
            <span style={{ background: "#065f46", color: "white", padding: "8px 16px", borderRadius: 10, fontSize: 14, fontWeight: 600 }}>Start Free Trial</span>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding: "64px 24px 0", textAlign: "center" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <h1 style={{ fontSize: 42, color: "#1c1917", marginBottom: 20, fontWeight: 800, lineHeight: 1.15, fontFamily: mono }}>
            Make your child <span style={{ color: "#065f46" }}>taller.</span>
          </h1>

          <p style={{ fontSize: 17, color: "#57534e", marginBottom: 16, lineHeight: 1.75 }}>
            The evidence-based system that helps children reach their maximum height. No prescriptions. No supplements. Just the levers parents actually control.
          </p>
          <p style={{ fontSize: 15, color: "#065f46", marginBottom: 28, lineHeight: 1.75, fontStyle: "italic" }}>
            Height isn't the only benefit — every growth signal simultaneously supports brain development.
          </p>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
            <span style={{ background: "#065f46", color: "white", padding: "12px 32px", borderRadius: 10, fontSize: 16, fontWeight: 600, cursor: "pointer" }}>
              Free Height Calculator
            </span>
            <p style={{ fontSize: 14, color: "#a8a29e" }}>See how tall your child could be</p>
          </div>
        </div>
      </section>

      {/* Height Calculator placeholder */}
      <section style={{ padding: "40px 24px" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", background: "#fff", borderRadius: 14, border: "1px solid #e7e5e4", padding: "32px 24px", textAlign: "center" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#065f46", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>Height Calculator</div>
          <div style={{ fontSize: 14, color: "#78716c" }}>[Interactive height predictor component]</div>
        </div>
      </section>

      {/* Sprint Stack */}
      <section style={{ padding: "48px 24px" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <div style={{ background: "#fff", borderRadius: 20, border: "2px solid #065f46", padding: "32px 24px", boxShadow: "0 4px 24px rgba(6,95,70,0.08)" }}>
            <div style={{ fontSize: 10, color: "#065f46", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, marginBottom: 10 }}>
              Featured protocol
            </div>
            <h3 style={{ fontSize: 22, color: "#1c1917", fontWeight: 800, marginBottom: 10 }}>
              The Sprint Stack
            </h3>
            <p style={{ fontSize: 15, color: "#57534e", lineHeight: 1.75, marginBottom: 20 }}>
              Your child already sprints at practice. What they eat before and after changes the growth response dramatically.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 16 }}>
              <div style={{ background: "#f0fdf4", borderRadius: 12, padding: "14px 12px", textAlign: "center" }}>
                <div style={{ fontSize: 11, color: "#065f46", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700, marginBottom: 4 }}>Before</div>
                <div style={{ fontSize: 12, color: "#1c1917", fontWeight: 600, lineHeight: 1.5 }}>1 beef liver meatball + 1 egg + peanuts</div>
                <div style={{ fontSize: 11, color: "#78716c", marginTop: 4 }}>loads choline + niacin</div>
              </div>
              <div style={{ background: "#f0fdf4", borderRadius: 12, padding: "14px 12px", textAlign: "center" }}>
                <div style={{ fontSize: 11, color: "#065f46", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700, marginBottom: 4 }}>Sprint</div>
                <div style={{ fontSize: 12, color: "#1c1917", fontWeight: 600, lineHeight: 1.5 }}>6 x 30-sec all-out</div>
                <div style={{ fontSize: 11, color: "#78716c", marginTop: 4 }}>triggers lactate response</div>
              </div>
              <div style={{ background: "#f0fdf4", borderRadius: 12, padding: "14px 12px", textAlign: "center" }}>
                <div style={{ fontSize: 11, color: "#065f46", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700, marginBottom: 4 }}>After</div>
                <div style={{ fontSize: 12, color: "#1c1917", fontWeight: 600, lineHeight: 1.5 }}>Cold A2 milk + raw honey</div>
                <div style={{ fontSize: 11, color: "#78716c", marginTop: 4 }}>converts signal to growth</div>
              </div>
            </div>

            <p style={{ fontSize: 12, color: "#78716c", lineHeight: 1.6, textAlign: "center" }}>
              This is one stack. The full protocol goes much deeper.
            </p>
          </div>
        </div>
      </section>

      {/* Height Trajectory Graph */}
      <section style={{ padding: "0 24px 48px" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", background: "#fff", borderRadius: 14, border: "1px solid #e7e5e4", padding: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <span style={{ fontWeight: 600, color: "#1c1917", fontSize: 14 }}>Height Trajectory</span>
            <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 12, color: "#1c1917", fontWeight: 500 }}>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#d1d5db", display: "inline-block" }} />
                Average Child
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#065f46", display: "inline-block" }} />
                bioKid
              </span>
            </div>
          </div>

          <div style={{ position: "relative", height: 200 }}>
            <svg viewBox="0 0 400 200" style={{ width: "100%", height: "100%" }} preserveAspectRatio="none">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f0f0f0" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              <path d="M 20 180 Q 50 170, 80 155 Q 120 135, 180 115 Q 250 95, 320 85 Q 360 82, 380 80" fill="none" stroke="#d1d5db" strokeWidth="3" strokeLinecap="round" />
              <path d="M 20 180 Q 50 165, 80 140 Q 120 100, 180 60 Q 250 30, 320 18 Q 360 12, 380 10" fill="none" stroke="#065f46" strokeWidth="3" strokeLinecap="round" />
              <circle cx="20" cy="180" r="6" fill="#065f46" />
              <circle cx="380" cy="80" r="5" fill="#d1d5db" />
              <circle cx="380" cy="10" r="6" fill="#065f46" />
            </svg>
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, display: "flex", justifyContent: "space-between", padding: "0 8px", fontSize: 11, color: "#1c1917" }}>
              <span>Birth</span><span>Age 5</span><span>Age 10</span><span>Age 15</span><span>Age 25</span>
            </div>
          </div>

          <p style={{ textAlign: "center", fontSize: 14, color: "#57534e", marginTop: 12, lineHeight: 1.75 }}>
            Same genes, different environment. The gap compounds every year.
          </p>
        </div>
      </section>

      {/* Gap Section */}
      <section style={{ padding: "48px 24px", backgroundColor: "#065f46" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: 28, color: "#ffffff", marginBottom: 20, fontWeight: 800 }}>Height optimization isn't taught.</h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.85)", marginBottom: 20, lineHeight: 1.75 }}>
            Not in schools. Not at checkups. Not by coaches. The science exists — it's just buried in academic journals that no parent has time to read.
          </p>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.75)", lineHeight: 1.75 }}>
            We spent 2,400+ hours reading them and turned it into a daily protocol. Now it's yours.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: "48px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
            {[
              { quote: "My son just turned 13 and is in the 97th percentile for height thanks to bioKids. My husband and I are 5'9 and 5'7.5\" respectively. I am starting my other two boys 11 and 7 on bioKids now.", name: "Maggie", ctx: "Mom of 3 · New York" },
              { quote: "Both my kids are in the 99th percentile, 8 and 7 years old. We helped create the bioKids protocol and are starting tennis lessons for them next year in hopes of a D1 scholarship.", name: "Marko", ctx: "Dad of 2 · New York" },
              { quote: "I've trained top NBA talent all the way down to elementary school kids. The limiting factor is always height. bioKids might just change the game forever…", name: "Thomas", ctx: "Athletic Trainer · Miami" },
            ].map((t, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: 14, padding: 24, border: "1px solid #e7e5e4" }}>
                <div style={{ fontFamily: serif, fontSize: 32, color: "#d1fae5", lineHeight: 1, marginBottom: 8 }}>"</div>
                <p style={{ fontSize: 13, color: "#1c1917", lineHeight: 1.7, marginBottom: 12 }}>{t.quote}</p>
                <p style={{ fontSize: 11, color: "#065f46", fontWeight: 700 }}>{t.name}</p>
                <p style={{ fontSize: 10, color: "#78716c" }}>{t.ctx}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "48px 24px" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1c1917", textAlign: "center", marginBottom: 28 }}>
            Questions parents ask
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { q: "Is this real? Can my child actually get taller from this?", a: "Yes. Height is polygenic — genes set a range, not a fixed number. A 24-week jumping study produced +4.32 cm vs ~1 cm in controls. Every recommendation cites an academic or scientific study published in a scientific journal." },
              { q: "What age does this work for?", a: "Any age before growth plates close — typically up to age 17 for girls and age 20 for boys. The earlier you start, the more years of compounding." },
              { q: "How does the height calculator work?", a: "Starts with the standard mid-parental prediction used by endocrinologists, grounded in decades of scientific literature. Then shows the bioKids zone — where your child could land with optimized environment. Every variable is backed by published scientific studies." },
              { q: "What about junk food, pizza, sleepovers?", a: "Life happens. Even 60% consistency compounds beautifully over months. The protocol is designed around real family life. We even give an optional detox smoothie to help the body excrete these foods without issues." },
              { q: "Where do the citations come from?", a: "Journals like JAMA, Lancet, JCEM, Nature. Every number on every card cites its source. Every study should be available at PubMed, from the US National Library of Medicine, National Center for Biotechnology Information. Adult studies are marked with *." },
              { q: "Is this just about height?", a: "No. Every growth signal simultaneously supports brain development. The same pathways that drive height drive cognitive function and long-term health. You are giving your child the best chance to maximize their genetic expression." },
            ].map((faq, i) => (
              <details key={i} style={{ background: "#fff", borderRadius: 14, border: "1px solid #e7e5e4", overflow: "hidden" }}>
                <summary style={{ fontSize: 14, fontWeight: 700, color: "#1c1917", padding: "14px 18px", cursor: "pointer", lineHeight: 1.5 }}>{faq.q}</summary>
                <div style={{ padding: "0 18px 18px", fontSize: 13, color: "#57534e", lineHeight: 1.75 }}>{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section style={{ padding: "48px 24px" }}>
        <div style={{ maxWidth: 520, margin: "0 auto" }}>
          <div style={{ border: "2px solid rgba(5,150,105,0.25)", borderRadius: 20, padding: "36px 28px", textAlign: "center", background: "#fff", boxShadow: "0 4px 24px rgba(6,95,70,0.08)" }}>
            <p style={{ fontSize: 11, color: "#065f46", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, marginBottom: 10 }}>7-day free trial</p>
            <div style={{ marginBottom: 4 }}>
              <span style={{ fontFamily: serif, fontSize: 40, color: "#065f46", fontWeight: 800 }}>$0</span>
              <span style={{ fontSize: 16, color: "#78716c", fontWeight: 500 }}> for 7 days</span>
            </div>
            <p style={{ fontSize: 13, color: "#a8a29e", fontWeight: 500, marginBottom: 6 }}>
              then $30/mo · cancel anytime
            </p>
            <p style={{ fontSize: 12, color: "#78716c", fontWeight: 500, marginBottom: 20, lineHeight: 1.6 }}>
              Less than $1/day. A single pediatric endocrinologist visit costs $300+.
            </p>
            <span style={{ background: "#065f46", color: "white", padding: "14px 40px", borderRadius: 12, fontSize: 16, fontWeight: 600, display: "inline-block", cursor: "pointer" }}>
              Start Free Trial
            </span>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section style={{ padding: "80px 24px" }}>
        <p style={{ fontSize: 40, fontWeight: 800, color: "#065f46", textAlign: "center" }}>
          Every inch counts.
        </p>
      </section>

      {/* Footer */}
      <footer style={{ padding: "24px", borderTop: "1px solid #e7e5e4" }}>
        <div style={{ maxWidth: 1024, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 8, background: "#f0fdf4", border: "1px solid #065f46", borderRadius: 10, padding: "5px 12px" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#065f46", display: "inline-block" }} />
            <span style={{ fontSize: 13, fontWeight: 700, color: "#065f46", letterSpacing: "0.04em" }}>bioKids</span>
          </span>
          <div style={{ display: "flex", gap: 24, fontSize: 14, color: "#1c1917", fontWeight: 500 }}>
            <span>Privacy</span>
            <span>Terms</span>
            <span>contact@biokids.me</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
