import Link from 'next/link';

export const metadata = {
  title: 'About — bioKids',
  description: 'We are a research organization turning biology into engineering. The science of human growth exists — we built the system to apply it.',
};

export default function AboutPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#fafaf9' }}>
      {/* Navigation */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, backgroundColor: 'rgba(250, 250, 249, 0.95)', backdropFilter: 'blur(4px)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: "'Courier New', Courier, monospace", textDecoration: 'none', background: '#f0fdf4', border: '1px solid #065f46', borderRadius: 10, padding: '5px 12px' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#065f46', display: 'inline-block' }} />
            <span style={{ fontSize: 13, fontWeight: 700, color: '#065f46', letterSpacing: '0.04em' }}>bioKids</span>
            <span style={{ fontSize: 9, fontWeight: 700, color: '#fff', background: '#065f46', borderRadius: 4, padding: '1px 5px', letterSpacing: '0.08em', marginLeft: 4 }}>BETA</span>
          </Link>
          <div className="flex items-center gap-3 sm:gap-6">
            <Link href="/login" className="hidden sm:inline" style={{ fontSize: '0.875rem', fontWeight: 500, color: '#1c1917', textDecoration: 'none', fontFamily: "'Courier New', Courier, monospace" }}>Log in</Link>
            <Link href="/onboarding" className="text-xs sm:text-sm" style={{ background: '#065f46', color: 'white', padding: '0.4rem 0.75rem', borderRadius: '10px', fontWeight: 600, textDecoration: 'none', fontFamily: "'Courier New', Courier, monospace" }}>
              Join Beta
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero — Research Org */}
      <section className="pt-28 sm:pt-36 pb-12 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <p style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '0.6875rem', color: '#065f46', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700, marginBottom: '1.25rem' }}>
            About bioKids
          </p>
          <p style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: 'clamp(0.9375rem, 1.8vw, 1.125rem)', color: '#1c1917', lineHeight: 1.85, marginBottom: '1.25rem' }}>
            We are a research organization focused on advancing human growth optimization through fundamental biological principles rather than conventional pediatric approaches. Our work centers on studying the core mechanisms that drive height &mdash; from IGF-1 signaling and growth hormone pulsatility to bone mineralization and epiphyseal plate activity &mdash; and translating them into daily protocols.
          </p>
          <p style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: 'clamp(0.9375rem, 1.8vw, 1.125rem)', color: '#1c1917', lineHeight: 1.85 }}>
            We believe the path to maximizing a child&apos;s genetic potential lies in understanding and implementing the essential mechanisms of growth &mdash; from nutritional biochemistry and circadian biology to mechanical loading and hormonal adaptation. Our approach examines how the human body processes growth signals the way they were designed to be processed.
          </p>
        </div>
      </section>

      {/* The Shift */}
      <section style={{ padding: 'var(--py-12, 3rem) var(--px-4, 1rem)', backgroundColor: '#065f46' }} className="sm:py-20">
        <div className="max-w-3xl mx-auto">
          <p style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '0.6875rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700, marginBottom: '1.25rem' }}>
            The shift
          </p>
          <h2 style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: 'clamp(1.25rem, 3vw, 2rem)', color: '#ffffff', fontWeight: 800, lineHeight: 1.3, marginBottom: '1.5rem' }}>
            When biology becomes engineering, it becomes exponentially improving. It compounds.
          </h2>
          <p style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '0.9375rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.85, marginBottom: '1.25rem' }}>
            Jensen Huang, CEO of NVIDIA, said it plainly: biology has the opportunity to be engineering &mdash; not science. When something becomes engineering, every breakthrough compounds on the last. Progress accelerates. What took decades takes years. What took years takes months.
          </p>
          <p style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '0.9375rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.85 }}>
            We believe the same principle applies to human growth. The research on height optimization &mdash; nutrition, sleep architecture, exercise-induced hormone response, bone mineralization &mdash; already exists across thousands of published studies. The problem was never the science. The problem was that no one had engineered it into a system parents could actually follow.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '2rem 1rem', borderTop: '1px solid #e7e5e4', backgroundColor: '#fafaf9' }} className="sm:py-12">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#f0fdf4', border: '1px solid #065f46', borderRadius: 10, padding: '5px 12px' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#065f46', display: 'inline-block' }} />
            <span style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: 13, fontWeight: 700, color: '#065f46', letterSpacing: '0.04em' }}>bioKids</span>
            <span style={{ fontSize: 9, fontWeight: 700, color: '#fff', background: '#065f46', borderRadius: 4, padding: '1px 5px', letterSpacing: '0.08em', marginLeft: 4 }}>BETA</span>
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
