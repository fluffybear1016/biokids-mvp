import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#fafaf9' }}>
      {/* Navigation */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, backgroundColor: 'rgba(250, 250, 249, 0.95)', backdropFilter: 'blur(4px)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: "'Courier New', Courier, monospace", textDecoration: 'none', background: '#f0fdf4', border: '1px solid #065f46', borderRadius: 10, padding: '5px 12px' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#065f46', display: 'inline-block' }} />
            <span style={{ fontSize: 13, fontWeight: 700, color: '#065f46', letterSpacing: '0.04em' }}>bioKids</span>
          </Link>
          <div className="flex items-center gap-3 sm:gap-6">
            <Link href="/login" style={{ fontSize: '0.875rem', fontWeight: 500, color: '#1c1917', textDecoration: 'none', fontFamily: "'Courier New', Courier, monospace" }}>Log in</Link>
            <Link href="/onboarding" style={{ background: '#065f46', color: 'white', padding: '0.5rem 1rem', borderRadius: '10px', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none', fontFamily: "'Courier New', Courier, monospace" }}>
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-16">
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(5, 150, 105, 0.1)', padding: '0.75rem 1rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: 600, color: '#065f46', marginBottom: '1.5rem', fontFamily: "'Courier New', Courier, monospace" }} className="sm:mb-6">
              For High-Agency Parents
            </span>
            <h1 style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: 'clamp(1.875rem, 5vw, 3.75rem)', color: '#1c1917', marginBottom: '1.5rem', fontWeight: 800, lineHeight: 1.2 }}>
              A natural way to optimize your child&apos;s <span style={{ color: '#065f46' }}>growth hormone</span>
            </h1>
            <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: '#57534e', marginBottom: '1.25rem', fontFamily: "'Courier New', Courier, monospace", lineHeight: 1.75 }}>
              The evidence-based system for natural growth hormone optimization—from childhood through the growth years. No prescriptions, no meds, just the levers parents actually control.
            </p>
            <p style={{ fontSize: 'clamp(0.875rem, 1.5vw, 1rem)', color: '#065f46', marginBottom: '2rem', fontFamily: "'Courier New', Courier, monospace", lineHeight: 1.75, fontStyle: 'italic' }}>
              Growth hormone doesn&apos;t just drive height — every GH pulse simultaneously helps optimize brain development.
            </p>
            <div className="flex flex-col items-center gap-3">
              <Link href="/onboarding" style={{ background: '#065f46', color: 'white', padding: '0.75rem 2rem', borderRadius: '10px', fontSize: '1rem', fontWeight: 600, textDecoration: 'none', fontFamily: "'Courier New', Courier, monospace", display: 'inline-block' }} className="sm:text-lg">
                Start Free Trial
              </Link>
              <p style={{ fontSize: '0.875rem', color: '#a8a29e', fontFamily: "'Courier New', Courier, monospace" }} className="sm:text-sm">7 days free · then $30/mo · cancel anytime</p>
            </div>
          </div>

          {/* Growth Trajectory Graph */}
          <div style={{ maxWidth: '48rem', margin: '0 auto', background: '#fff', borderRadius: '14px', border: '1px solid #e7e5e4', padding: '1rem 1.125rem' }} className="sm:p-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-6">
              <h3 style={{ fontWeight: 600, color: '#1c1917', fontFamily: "'Courier New', Courier, monospace", fontSize: '0.875rem' }} className="sm:text-base">Growth Trajectory</h3>
              <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm" style={{ fontFamily: "'Courier New', Courier, monospace", color: '#1c1917', fontWeight: 500 }}>
                <span className="flex items-center gap-1.5 sm:gap-2">
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#d1d5db', display: 'inline-block' }}></span>
                  Average Child
                </span>
                <span className="flex items-center gap-1.5 sm:gap-2">
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#065f46', display: 'inline-block' }}></span>
                  bioKid
                </span>
              </div>
            </div>

            {/* SVG Graph */}
            <div className="relative h-48 sm:h-64">
              <svg viewBox="0 0 400 200" className="w-full h-full" preserveAspectRatio="none">
                {/* Grid lines */}
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f0f0f0" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />

                {/* Average child curve - flattens early, plateaus */}
                <path
                  d="M 20 180 Q 50 170, 80 155 Q 120 135, 180 115 Q 250 95, 320 85 Q 360 82, 380 80"
                  fill="none"
                  stroke="#d1d5db"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* bioKid curve - separates early, keeps rising strongly */}
                <path
                  d="M 20 180 Q 50 165, 80 140 Q 120 100, 180 60 Q 250 30, 320 18 Q 360 12, 380 10"
                  fill="none"
                  stroke="#065f46"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Start point - same for both */}
                <circle cx="20" cy="180" r="6" fill="#065f46" />

                {/* End points */}
                <circle cx="380" cy="80" r="5" fill="#d1d5db" />
                <circle cx="380" cy="10" r="6" fill="#065f46" />
              </svg>

              {/* X-axis labels */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[10px] sm:text-xs px-2 sm:px-4" style={{ color: '#1c1917', fontFamily: "'Courier New', Courier, monospace" }}>
                <span>Birth</span>
                <span className="hidden sm:inline">Age 5</span>
                <span className="sm:hidden">5</span>
                <span className="hidden sm:inline">Age 10</span>
                <span className="sm:hidden">10</span>
                <span className="hidden sm:inline">Age 15</span>
                <span className="sm:hidden">15</span>
                <span className="hidden sm:inline">Age 25</span>
                <span className="sm:hidden">25</span>
              </div>
            </div>

            <p style={{ textAlign: 'center', fontSize: '0.875rem', color: '#57534e', marginTop: '1rem', fontFamily: "'Courier New', Courier, monospace", lineHeight: 1.75 }} className="sm:text-sm">
              Same genes, different environment: a structured growth hormone-supportive system changes the growth curve.
            </p>
          </div>
        </div>
      </section>

      {/* The Gap Section */}
      <section style={{ padding: 'var(--py-12, 3rem) var(--px-4, 1rem)', backgroundColor: '#065f46' }} className="sm:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '1.5rem', color: '#ffffff', marginBottom: '1.5rem', fontWeight: 800 }} className="sm:text-4xl">Most parents don&apos;t know what they&apos;re leaving on the table.</h2>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.85)', marginBottom: '1.5rem', fontFamily: "'Courier New', Courier, monospace", lineHeight: 1.75 }} className="sm:text-xl">
            Growth hormone optimization isn&apos;t taught in schools. It isn&apos;t in parenting books.
            It&apos;s buried in peer-reviewed journals that no one reads.
          </p>
          <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.75)', fontFamily: "'Courier New', Courier, monospace", lineHeight: 1.75 }} className="sm:text-base">
            We read them. We built the protocol. Now it&apos;s yours.
          </p>
        </div>
      </section>

      {/* Trust / Research Section — research notebook artifacts */}
      <section style={{ padding: 'var(--py-12, 3rem) var(--px-4, 1rem)', backgroundColor: '#fafaf9' }} className="sm:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '1.5rem', color: '#1c1917', marginBottom: '0.75rem', fontWeight: 800 }} className="sm:text-4xl">Built from the research, not the internet</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            {/* Artifact 1 */}
            <div style={{
              background: '#fff',
              borderRadius: '14px',
              padding: '1.75rem 1.5rem',
              border: '1px solid #e7e5e4',
              borderLeft: '4px solid #065f46',
              position: 'relative',
            }}>
              <div style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '0.625rem', color: '#a8a29e', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
                Literature review
              </div>
              <p style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: '2.25rem', color: '#065f46', fontWeight: 800, lineHeight: 1, marginBottom: '0.5rem' }}>312</p>
              <p style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '0.8125rem', color: '#1c1917', fontWeight: 600, marginBottom: '0.5rem' }}>peer-reviewed studies</p>
              <p style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '0.75rem', color: '#78716c', lineHeight: 1.55 }}>
                Pediatric endocrinology, sports medicine, sleep science, nutritional biochemistry — mapped into one daily system.
              </p>
            </div>

            {/* Artifact 2 */}
            <div style={{
              background: '#fff',
              borderRadius: '14px',
              padding: '1.75rem 1.5rem',
              border: '1px solid #e7e5e4',
              borderLeft: '4px solid #065f46',
              position: 'relative',
            }}>
              <div style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '0.625rem', color: '#a8a29e', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
                Total synthesis time
              </div>
              <p style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: '2.25rem', color: '#065f46', fontWeight: 800, lineHeight: 1, marginBottom: '0.5rem' }}>2,400+</p>
              <p style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '0.8125rem', color: '#1c1917', fontWeight: 600, marginBottom: '0.5rem' }}>hours of research</p>
              <p style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '0.75rem', color: '#78716c', lineHeight: 1.55 }}>
                Every claim traced to source. Every mechanism cross-referenced. Every food timing validated against the original data.
              </p>
            </div>

            {/* Artifact 3 */}
            <div style={{
              background: '#fff',
              borderRadius: '14px',
              padding: '1.75rem 1.5rem',
              border: '1px solid #e7e5e4',
              borderLeft: '4px solid #065f46',
              position: 'relative',
            }}>
              <div style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '0.625rem', color: '#a8a29e', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
                Source integrity
              </div>
              <p style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: '2.25rem', color: '#065f46', fontWeight: 800, lineHeight: 1, marginBottom: '0.5rem' }}>100%</p>
              <p style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '0.8125rem', color: '#1c1917', fontWeight: 600, marginBottom: '0.5rem' }}>academic sourced</p>
              <p style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '0.75rem', color: '#78716c', lineHeight: 1.55 }}>
                Zero influencer science. Every protocol item cites the original study. Tap any card in the app to see the citation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section style={{ padding: 'var(--py-12, 3rem) var(--px-4, 1rem)', backgroundColor: '#fafaf9' }} className="sm:py-20">
        <div className="max-w-2xl mx-auto">
          <div style={{ border: '2px solid rgba(5, 150, 105, 0.25)', borderRadius: '20px', padding: '2rem 1.5rem', textAlign: 'center', background: '#fff', boxShadow: '0 4px 24px rgba(6,95,70,0.08)' }} className="sm:p-10">
            <p style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '0.6875rem', color: '#065f46', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '0.75rem' }}>7-day free trial</p>
            <h2 style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '1.5rem', color: '#1c1917', marginBottom: '0.25rem', fontWeight: 800 }} className="sm:text-3xl">
              <span style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: '2.5rem', color: '#065f46' }}>$0</span>
              <span style={{ fontSize: '1rem', color: '#78716c', fontWeight: 500 }}> for 7 days</span>
            </h2>
            <p style={{ fontSize: '0.8125rem', color: '#a8a29e', fontFamily: "'Courier New', Courier, monospace", fontWeight: 500, marginBottom: '1.25rem' }}>
              then $30/mo · cancel anytime
            </p>
            <p style={{ fontSize: '0.875rem', color: '#57534e', fontFamily: "'Courier New', Courier, monospace", fontWeight: 500, marginBottom: '1.5rem', lineHeight: 1.75 }} className="sm:text-base">
              The complete evidence-based growth protocol.
            </p>
            <Link href="/onboarding" style={{ background: '#065f46', color: 'white', padding: '0.875rem 2.5rem', borderRadius: '12px', fontSize: '1rem', fontWeight: 600, textDecoration: 'none', display: 'inline-block', fontFamily: "'Courier New', Courier, monospace", marginBottom: '1.25rem' }} className="sm:text-lg">
              Start Free Trial
            </Link>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm" style={{ color: '#78716c', fontFamily: "'Courier New', Courier, monospace", fontWeight: 500 }}>
              <span>Age-specific protocols</span>
              <span>Daily checklist</span>
              <span>Science library</span>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Statement */}
      <section style={{ padding: '5rem 1rem', backgroundColor: '#fafaf9' }} className="sm:py-32">
        <p style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '2.25rem', fontWeight: 800, color: '#065f46', textAlign: 'center' }} className="sm:text-6xl">
          Grow.
        </p>
      </section>

      {/* Footer */}
      <footer style={{ padding: '2rem 1rem', borderTop: '1px solid #e7e5e4', backgroundColor: '#fafaf9' }} className="sm:py-12">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#f0fdf4', border: '1px solid #065f46', borderRadius: 10, padding: '5px 12px' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#065f46', display: 'inline-block' }} />
            <span style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: 13, fontWeight: 700, color: '#065f46', letterSpacing: '0.04em' }}>bioKids</span>
          </span>
          <div className="flex gap-6 sm:gap-8 text-sm" style={{ color: '#1c1917', fontFamily: "'Courier New', Courier, monospace", fontWeight: 500 }}>
            <Link href="/privacy" style={{ textDecoration: 'none', color: '#1c1917' }}>Privacy</Link>
            <Link href="/terms" style={{ textDecoration: 'none', color: '#1c1917' }}>Terms</Link>
            <a href="mailto:contact@biokids.me" style={{ textDecoration: 'none', color: '#1c1917' }}>contact@biokids.me</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
