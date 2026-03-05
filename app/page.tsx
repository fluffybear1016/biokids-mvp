import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#fafaf9' }}>
      {/* Navigation */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, backgroundColor: 'rgba(250, 250, 249, 0.95)', backdropFilter: 'blur(4px)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: "'Courier New', Courier, monospace", fontSize: 'var(--text-lg, 1.125rem)', color: '#059669', textDecoration: 'none' }}>
            bioKids
          </Link>
          <div className="flex items-center gap-3 sm:gap-6">
            <Link href="/login" style={{ fontSize: '0.875rem', fontWeight: 500, color: '#1c1917', textDecoration: 'none', fontFamily: "'Courier New', Courier, monospace" }}>Log in</Link>
            <Link href="/onboarding" style={{ background: '#059669', color: 'white', padding: '0.5rem 1rem', borderRadius: '10px', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none', fontFamily: "'Courier New', Courier, monospace" }}>
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-16">
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(5, 150, 105, 0.1)', padding: '0.75rem 1rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: 600, color: '#059669', marginBottom: '1.5rem', fontFamily: "'Courier New', Courier, monospace" }} className="sm:mb-6">
              For High-Agency Parents
            </span>
            <h1 style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: 'clamp(1.875rem, 5vw, 3.75rem)', color: '#1c1917', marginBottom: '1.5rem', fontWeight: 800, lineHeight: 1.2 }}>
              A natural way to optimize your child&apos;s <span style={{ color: '#059669' }}>growth hormone</span>
            </h1>
            <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: '#57534e', marginBottom: '2rem', fontFamily: "'Courier New', Courier, monospace", lineHeight: 1.75 }}>
              The evidence-based system for natural growth hormone optimization—from age 2 to age 20. No prescriptions, no meds, just the levers parents actually control.
            </p>
            <div className="flex flex-col items-center gap-3">
              <Link href="/onboarding" style={{ background: '#059669', color: 'white', padding: '0.75rem 2rem', borderRadius: '10px', fontSize: '1rem', fontWeight: 600, textDecoration: 'none', fontFamily: "'Courier New', Courier, monospace", display: 'inline-block' }} className="sm:text-lg">
                Get Started — $30/mo
              </Link>
              <p style={{ fontSize: '0.875rem', color: '#a8a29e', fontFamily: "'Courier New', Courier, monospace" }} className="sm:text-sm">Cancel anytime · Full access from day one</p>
            </div>
          </div>

          {/* Growth Trajectory Graph — honest version */}
          <div style={{ maxWidth: '48rem', margin: '0 auto', background: '#fff', borderRadius: '14px', border: '1px solid #e7e5e4', padding: '1rem 1.125rem' }} className="sm:p-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-6">
              <h3 style={{ fontWeight: 600, color: '#1c1917', fontFamily: "'Courier New', Courier, monospace", fontSize: '0.875rem' }} className="sm:text-base">Nocturnal GH Output — Optimized vs. Typical</h3>
              <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm" style={{ fontFamily: "'Courier New', Courier, monospace", color: '#1c1917', fontWeight: 500 }}>
                <span className="flex items-center gap-1.5 sm:gap-2">
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-gray-400 rounded-full"></span>
                  Typical child
                </span>
                <span className="flex items-center gap-1.5 sm:gap-2">
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-forest rounded-full"></span>
                  Optimized
                </span>
              </div>
            </div>

            {/* SVG Graph — GH pulses over a sleep cycle */}
            <div className="relative" style={{ height: 'clamp(200px, 30vw, 280px)' }}>
              <svg viewBox="0 0 440 220" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                {/* Grid lines */}
                <line x1="50" y1="20" x2="50" y2="190" stroke="#f0f0f0" strokeWidth="1" />
                <line x1="50" y1="190" x2="420" y2="190" stroke="#e7e5e4" strokeWidth="1" />
                <line x1="50" y1="148" x2="420" y2="148" stroke="#f5f5f0" strokeWidth="1" strokeDasharray="4,4" />
                <line x1="50" y1="106" x2="420" y2="106" stroke="#f5f5f0" strokeWidth="1" strokeDasharray="4,4" />
                <line x1="50" y1="64" x2="420" y2="64" stroke="#f5f5f0" strokeWidth="1" strokeDasharray="4,4" />
                <line x1="50" y1="22" x2="420" y2="22" stroke="#f5f5f0" strokeWidth="1" strokeDasharray="4,4" />

                {/* Y-axis labels */}
                <text x="46" y="193" textAnchor="end" fill="#a8a29e" fontSize="9" fontFamily="'Courier New', monospace">0</text>
                <text x="46" y="151" textAnchor="end" fill="#a8a29e" fontSize="9" fontFamily="'Courier New', monospace">5</text>
                <text x="46" y="109" textAnchor="end" fill="#a8a29e" fontSize="9" fontFamily="'Courier New', monospace">10</text>
                <text x="46" y="67" textAnchor="end" fill="#a8a29e" fontSize="9" fontFamily="'Courier New', monospace">15</text>
                <text x="46" y="25" textAnchor="end" fill="#a8a29e" fontSize="9" fontFamily="'Courier New', monospace">20</text>
                {/* Y-axis unit */}
                <text x="8" y="106" textAnchor="middle" fill="#a8a29e" fontSize="8" fontFamily="'Courier New', monospace" transform="rotate(-90 8 106)">GH (ng/mL)</text>

                {/* Typical child — lower, fewer distinct pulses, earlier plateau */}
                <path
                  d="M 60 185 Q 75 182, 90 178 Q 110 170, 120 145 Q 130 120, 140 140 Q 150 158, 165 162 Q 180 165, 195 155 Q 210 142, 220 152 Q 235 165, 255 168 Q 275 170, 300 172 Q 330 175, 360 178 Q 390 180, 410 182"
                  fill="none"
                  stroke="#d1d5db"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Optimized child — taller pulses, more defined SWS spikes, sustained output */}
                <path
                  d="M 60 185 Q 70 178, 80 160 Q 95 100, 105 45 Q 110 30, 118 55 Q 128 95, 140 110 Q 150 120, 160 90 Q 170 55, 180 40 Q 188 30, 195 60 Q 205 100, 220 120 Q 235 135, 250 115 Q 260 95, 270 70 Q 278 55, 285 75 Q 295 105, 310 125 Q 325 140, 345 135 Q 355 130, 365 120 Q 372 112, 378 125 Q 390 148, 410 160"
                  fill="none"
                  stroke="#059669"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* SWS labels */}
                <text x="108" y="18" textAnchor="middle" fill="#059669" fontSize="7.5" fontFamily="'Courier New', monospace" fontWeight="700">SWS 1</text>
                <text x="183" y="18" textAnchor="middle" fill="#059669" fontSize="7.5" fontFamily="'Courier New', monospace" fontWeight="700">SWS 2</text>
                <text x="273" y="48" textAnchor="middle" fill="#059669" fontSize="7.5" fontFamily="'Courier New', monospace" fontWeight="700">SWS 3</text>

                {/* X-axis labels — sleep time */}
                <text x="60" y="207" textAnchor="middle" fill="#78716c" fontSize="9" fontFamily="'Courier New', monospace">9pm</text>
                <text x="140" y="207" textAnchor="middle" fill="#78716c" fontSize="9" fontFamily="'Courier New', monospace">11pm</text>
                <text x="220" y="207" textAnchor="middle" fill="#78716c" fontSize="9" fontFamily="'Courier New', monospace">1am</text>
                <text x="300" y="207" textAnchor="middle" fill="#78716c" fontSize="9" fontFamily="'Courier New', monospace">3am</text>
                <text x="375" y="207" textAnchor="middle" fill="#78716c" fontSize="9" fontFamily="'Courier New', monospace">5am</text>

                {/* 3x annotation */}
                <text x="125" y="82" textAnchor="start" fill="#059669" fontSize="10" fontFamily="Georgia, serif" fontWeight="800">3×</text>
                <text x="142" y="82" textAnchor="start" fill="#78716c" fontSize="8" fontFamily="'Courier New', monospace">peak GH</text>
              </svg>
            </div>

            <p style={{ textAlign: 'center', fontSize: '0.8125rem', color: '#78716c', marginTop: '0.75rem', fontFamily: "'Courier New', Courier, monospace", lineHeight: 1.65 }}>
              Normal sleep produces 3× more peak GH than disrupted sleep. Each slow-wave cycle is a growth pulse.
            </p>
            <p style={{ textAlign: 'center', fontSize: '0.6875rem', color: '#a8a29e', fontFamily: "'Courier New', Courier, monospace", marginTop: '0.25rem' }}>
              Brandenberger, Lancet 2000 · Van Cauter, JAMA 2000
            </p>
          </div>
        </div>
      </section>

      {/* The Gap Section */}
      <section style={{ padding: 'var(--py-12, 3rem) var(--px-4, 1rem)', backgroundColor: '#fafaf9' }} className="sm:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '1.5rem', color: '#1c1917', marginBottom: '1.5rem', fontWeight: 800 }} className="sm:text-4xl">Most parents don&apos;t know what they&apos;re leaving on the table.</h2>
          <p style={{ fontSize: '1rem', color: '#57534e', marginBottom: '1.5rem', fontFamily: "'Courier New', Courier, monospace", lineHeight: 1.75 }} className="sm:text-xl">
            Growth hormone optimization isn&apos;t taught in schools. It isn&apos;t in parenting books.
            It&apos;s buried in peer-reviewed journals that no one reads.
          </p>
          <p style={{ fontSize: '0.875rem', color: '#57534e', fontFamily: "'Courier New', Courier, monospace", lineHeight: 1.75 }} className="sm:text-base">
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
              borderLeft: '4px solid #059669',
              position: 'relative',
            }}>
              <div style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '0.625rem', color: '#a8a29e', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
                Literature review
              </div>
              <p style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: '2.25rem', color: '#059669', fontWeight: 800, lineHeight: 1, marginBottom: '0.5rem' }}>312</p>
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
              borderLeft: '4px solid #059669',
              position: 'relative',
            }}>
              <div style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '0.625rem', color: '#a8a29e', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
                Total synthesis time
              </div>
              <p style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: '2.25rem', color: '#059669', fontWeight: 800, lineHeight: 1, marginBottom: '0.5rem' }}>2,400+</p>
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
              borderLeft: '4px solid #059669',
              position: 'relative',
            }}>
              <div style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '0.625rem', color: '#a8a29e', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
                Source integrity
              </div>
              <p style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: '2.25rem', color: '#059669', fontWeight: 800, lineHeight: 1, marginBottom: '0.5rem' }}>100%</p>
              <p style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '0.8125rem', color: '#1c1917', fontWeight: 600, marginBottom: '0.5rem' }}>academic sourced</p>
              <p style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '0.75rem', color: '#78716c', lineHeight: 1.55 }}>
                Zero influencer science. Every protocol item cites the original study. Tap any card in the app to see the citation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing — single CTA, no free trial */}
      <section style={{ padding: 'var(--py-12, 3rem) var(--px-4, 1rem)', backgroundColor: '#fafaf9' }} className="sm:py-20">
        <div className="max-w-2xl mx-auto">
          <div style={{ border: '2px solid #a7f3d0', borderRadius: '20px', padding: '2rem 1.5rem', textAlign: 'center', background: '#fff', boxShadow: '0 4px 24px rgba(5,150,105,0.08)' }} className="sm:p-10">
            <p style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '0.6875rem', color: '#059669', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '0.5rem' }}>Full access</p>
            <h2 style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '1.5rem', color: '#1c1917', marginBottom: '0.25rem', fontWeight: 800 }} className="sm:text-3xl">
              <span style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: '2.5rem', color: '#059669' }}>$30</span>
              <span style={{ fontSize: '1rem', color: '#78716c', fontWeight: 500 }}>/month</span>
            </h2>
            <p style={{ fontSize: '0.875rem', color: '#57534e', fontFamily: "'Courier New', Courier, monospace", fontWeight: 500, marginBottom: '1.5rem', lineHeight: 1.75 }} className="sm:text-base">
              The complete evidence-based growth protocol. Cancel anytime.
            </p>
            <Link href="/onboarding" style={{ background: '#059669', color: 'white', padding: '0.875rem 2.5rem', borderRadius: '12px', fontSize: '1rem', fontWeight: 600, textDecoration: 'none', display: 'inline-block', fontFamily: "'Courier New', Courier, monospace", marginBottom: '1.25rem' }} className="sm:text-lg">
              Get Started
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
        <p style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '2.25rem', fontWeight: 800, color: '#059669', textAlign: 'center' }} className="sm:text-6xl">
          Grow.
        </p>
      </section>

      {/* Footer */}
      <footer style={{ padding: '2rem 1rem', borderTop: '1px solid #e7e5e4', backgroundColor: '#fafaf9' }} className="sm:py-12">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
          <span style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '1.125rem', color: '#059669', fontWeight: 800 }} className="sm:text-xl">bioKids</span>
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
