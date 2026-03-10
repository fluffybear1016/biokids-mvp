'use client';

export default function OfflinePage() {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24, background: '#fafaf9',
    }}>
      <div style={{ textAlign: 'center', maxWidth: 320 }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>&#127793;</div>
        <h1 style={{
          fontFamily: "'Courier New', Courier, monospace",
          fontSize: 18, fontWeight: 800, color: '#1c1917', marginBottom: 12,
        }}>
          You&apos;re offline
        </h1>
        <p style={{
          fontFamily: "'Courier New', Courier, monospace",
          fontSize: 13, color: '#57534e', lineHeight: 1.7,
        }}>
          No worries — your child&apos;s height protocol will be here when you reconnect.
          The daily checklist saves locally, so nothing is lost.
        </p>
        <button
          onClick={() => window.location.reload()}
          style={{
            marginTop: 24, fontFamily: "'Courier New', Courier, monospace",
            fontSize: 13, fontWeight: 700, color: '#fff',
            background: '#065f46', border: 'none', borderRadius: 12,
            padding: '10px 28px', cursor: 'pointer',
          }}
        >
          Try again
        </button>
      </div>
    </div>
  );
}
