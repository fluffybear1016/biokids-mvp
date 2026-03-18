import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Get bioKids — Science-Based Growth Protocol for Your Phone',
  description: 'bioKids delivers research-backed growth protocols directly to your phone. Install in seconds. Protocols update the same day new research publishes.',
  keywords: ['biokids app', 'biokids download', 'biokids app store', 'biokids ios', 'biokids android', 'child height app', 'growth protocol app'],
  openGraph: {
    title: 'Get bioKids',
    description: 'Science-based growth protocols, delivered directly to your phone.',
    type: 'website',
  },
};

const mono = "'Courier New', Courier, monospace";

export default function GetTheApp() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#fafaf9',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1.5rem',
    }}>
      <div style={{ width: '100%', maxWidth: 380, textAlign: 'center' }}>

        {/* App icon */}
        <div style={{
          width: 112,
          height: 112,
          borderRadius: 28,
          background: '#065f46',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 40px',
          boxShadow: '0 12px 40px rgba(6, 95, 70, 0.2)',
        }}>
          <span style={{
            fontFamily: mono,
            fontSize: 36,
            fontWeight: 900,
            color: '#fff',
            letterSpacing: '-0.02em',
          }}>bk</span>
        </div>

        <h1 style={{
          fontFamily: mono,
          fontSize: 28,
          fontWeight: 800,
          color: '#1c1917',
          margin: '0 0 12px',
          lineHeight: 1.25,
        }}>
          bioKids
        </h1>

        <p style={{
          fontFamily: mono,
          fontSize: 14,
          color: '#57534e',
          margin: '0 0 48px',
          lineHeight: 1.7,
        }}>
          The growth protocol.
          <br />
          Straight to your phone.
        </p>

        {/* Install instructions — just the essentials */}
        <div style={{
          textAlign: 'left',
          marginBottom: 40,
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
        }}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <div style={{
              width: 36, height: 36, borderRadius: 12,
              background: '#065f46', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: mono, fontSize: 15, fontWeight: 800, flexShrink: 0,
            }}>1</div>
            <span style={{ fontFamily: mono, fontSize: 14, fontWeight: 600, color: '#1c1917' }}>
              Open <a href="/signup" style={{ color: '#065f46', textDecoration: 'underline' }}>biokids.com</a> in Safari
            </span>
          </div>

          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <div style={{
              width: 36, height: 36, borderRadius: 12,
              background: '#065f46', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: mono, fontSize: 15, fontWeight: 800, flexShrink: 0,
            }}>2</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexWrap: 'wrap' }}>
              <span style={{ fontFamily: mono, fontSize: 14, fontWeight: 600, color: '#1c1917' }}>Tap</span>
              <span style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: 30, height: 30, background: '#f0fdf4', borderRadius: 8,
                border: '1.5px solid #065f46',
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#065f46" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="8" width="16" height="13" rx="2"/>
                  <line x1="12" y1="2" x2="12" y2="14"/>
                  <polyline points="8 6 12 2 16 6"/>
                </svg>
              </span>
              <span style={{ fontFamily: mono, fontSize: 14, fontWeight: 600, color: '#1c1917' }}>
                then &quot;Add to Home Screen&quot;
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <div style={{
              width: 36, height: 36, borderRadius: 12,
              background: '#065f46', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: mono, fontSize: 15, fontWeight: 800, flexShrink: 0,
            }}>3</div>
            <span style={{ fontFamily: mono, fontSize: 14, fontWeight: 600, color: '#1c1917' }}>
              That&apos;s it.
            </span>
          </div>
        </div>

        {/* CTA */}
        <a
          href="/signup"
          style={{
            display: 'block',
            fontFamily: mono,
            fontSize: 16,
            fontWeight: 700,
            width: '100%',
            padding: '1rem',
            borderRadius: 14,
            border: 'none',
            cursor: 'pointer',
            background: '#065f46',
            color: '#fff',
            textDecoration: 'none',
            textAlign: 'center',
          }}
        >
          Get started free
        </a>

      </div>
    </div>
  );
}
