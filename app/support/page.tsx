import Link from 'next/link';

export const metadata = {
  title: 'Support — bioKids',
  description: 'Get help with bioKids. Contact us for questions about the protocol, your account, or the app.',
};

export default function SupportPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#fafaf9', color: '#1c1917' }}>
      {/* Navigation */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, backgroundColor: 'rgba(250, 250, 249, 0.95)', backdropFilter: 'blur(4px)', borderBottom: '1px solid #e7e5e4' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: "'Courier New', Courier, monospace", fontSize: 'var(--text-lg, 1.125rem)', color: '#065f46', textDecoration: 'none' }}>
            bioKids
          </Link>
          <div className="flex items-center gap-3 sm:gap-6">
            <Link href="/login" style={{ fontSize: '0.875rem', fontWeight: 500, color: '#57534e', textDecoration: 'none', fontFamily: "'Courier New', Courier, monospace" }}>Log in</Link>
            <Link href="/onboarding" style={{ background: '#065f46', color: 'white', padding: '0.5rem 1rem', borderRadius: '10px', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none', fontFamily: "'Courier New', Courier, monospace" }}>
              Get Started — Free
            </Link>
          </div>
        </div>
      </nav>

      <div style={{ paddingTop: '6rem', paddingBottom: '4rem', padding: '1rem' }} className="sm:pt-32 sm:pb-24 sm:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Back Link */}
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: '#a8a29e', marginBottom: '2rem', textDecoration: 'none', fontFamily: "'Courier New', Courier, monospace" }} className="sm:mb-12">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to home
          </Link>

          {/* Title */}
          <h1 style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: 'clamp(1.875rem, 5vw, 3rem)', color: '#1c1917', marginBottom: '0.75rem', fontWeight: 800 }} className="sm:mb-4">Support</h1>
          <p style={{ fontSize: '0.875rem', color: '#a8a29e', fontFamily: "'Courier New', Courier, monospace", marginBottom: '2.5rem' }} className="sm:text-base sm:mb-14">We&apos;re here to help.</p>

          <div style={{ fontSize: '0.875rem', color: '#57534e', fontFamily: "'Courier New', Courier, monospace", lineHeight: 1.75 }} className="sm:text-base space-y-8 sm:space-y-10">

            {/* Contact */}
            <section>
              <h2 style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '1.125rem', color: '#1c1917', marginBottom: '1rem', fontWeight: 800 }} className="sm:text-2xl">Contact Us</h2>
              <p className="mb-4">
                For any questions, issues, or feedback about the bioKids app or protocol, email us directly:
              </p>
              <a
                href="mailto:contact@biokids.me"
                style={{
                  display: 'inline-block',
                  background: '#065f46',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '10px',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  fontFamily: "'Courier New', Courier, monospace",
                }}
              >
                contact@biokids.me
              </a>
              <p className="mt-4" style={{ color: '#a8a29e' }}>We respond to all inquiries within 24 hours.</p>
            </section>

            {/* FAQ */}
            <section>
              <h2 style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '1.125rem', color: '#1c1917', marginBottom: '1rem', fontWeight: 800 }} className="sm:text-2xl">Frequently Asked Questions</h2>

              <div className="space-y-6">
                <div>
                  <h3 style={{ fontWeight: 700, color: '#1c1917', marginBottom: '0.5rem' }}>Is bioKids really free?</h3>
                  <p>Yes. bioKids is 100% free with no ads, no in-app purchases, and no hidden fees. Every feature is available to every user.</p>
                </div>

                <div>
                  <h3 style={{ fontWeight: 700, color: '#1c1917', marginBottom: '0.5rem' }}>Is this medical advice?</h3>
                  <p>No. bioKids provides general wellness information based on published peer-reviewed research. It is not a medical device and does not diagnose, treat, cure, or prevent any disease. Always consult your child&apos;s pediatrician before making changes to their diet, exercise, or sleep routine.</p>
                </div>

                <div>
                  <h3 style={{ fontWeight: 700, color: '#1c1917', marginBottom: '0.5rem' }}>Where does the research come from?</h3>
                  <p>Every recommendation in the protocol is based on published peer-reviewed studies available on PubMed, the U.S. National Library of Medicine. Citations with direct links are provided in-app for every item.</p>
                </div>

                <div>
                  <h3 style={{ fontWeight: 700, color: '#1c1917', marginBottom: '0.5rem' }}>What age range is the protocol for?</h3>
                  <p>The protocol is designed for children ages 4 through 17. The nutritional and exercise recommendations are based on pediatric research across this age range.</p>
                </div>

                <div>
                  <h3 style={{ fontWeight: 700, color: '#1c1917', marginBottom: '0.5rem' }}>How do I delete my account?</h3>
                  <p>Email us at <a href="mailto:contact@biokids.me" style={{ color: '#065f46', textDecoration: 'underline' }}>contact@biokids.me</a> with the subject line &ldquo;Delete my account&rdquo; and we will remove your account and all associated data within 30 days.</p>
                </div>

                <div>
                  <h3 style={{ fontWeight: 700, color: '#1c1917', marginBottom: '0.5rem' }}>How do I turn off notifications?</h3>
                  <p>You can disable push notifications at any time through your device&apos;s Settings app under Notifications, or through the Settings screen within the bioKids app.</p>
                </div>

                <div>
                  <h3 style={{ fontWeight: 700, color: '#1c1917', marginBottom: '0.5rem' }}>What data do you collect?</h3>
                  <p>We collect your email address, your child&apos;s first name, birth month/year, and parent heights (for the height calculator). We do not sell or share your data with third parties. See our <Link href="/privacy" style={{ color: '#065f46', textDecoration: 'underline' }}>Privacy Policy</Link> for full details.</p>
                </div>
              </div>
            </section>

            {/* Medical Disclaimer */}
            <section style={{ backgroundColor: '#fefce8', borderRadius: '12px', padding: '1.5rem', border: '1px solid #fde68a' }}>
              <h2 style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '0.875rem', color: '#92400e', marginBottom: '0.75rem', fontWeight: 800 }}>Medical Disclaimer</h2>
              <p style={{ color: '#78716c', fontSize: '0.8125rem', lineHeight: 1.7 }}>
                bioKids provides general wellness information based on published nutrition and exercise research. It is not a medical device and does not diagnose, treat, cure, or prevent any disease. The information provided is for educational purposes only and is not intended as a substitute for professional medical advice. Always consult your child&apos;s pediatrician before making changes to their diet, exercise, or sleep routine. Individual results vary.
              </p>
            </section>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ padding: '2rem 1rem', borderTop: '1px solid #e7e5e4', backgroundColor: '#fafaf9' }} className="sm:py-12">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
          <span style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: '1.125rem', color: '#065f46', fontWeight: 800 }} className="sm:text-xl">bioKids</span>
          <div className="flex gap-6 sm:gap-8 text-sm" style={{ color: '#57534e', fontFamily: "'Courier New', Courier, monospace", fontWeight: 500 }}>
            <Link href="/privacy" style={{ textDecoration: 'none', color: '#57534e' }}>Privacy</Link>
            <Link href="/terms" style={{ textDecoration: 'none', color: '#57534e' }}>Terms</Link>
            <Link href="/support" style={{ textDecoration: 'none', color: '#57534e' }}>Support</Link>
            <a href="mailto:contact@biokids.me" style={{ textDecoration: 'none', color: '#57534e' }}>contact@biokids.me</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
