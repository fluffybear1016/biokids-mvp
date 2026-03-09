'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const mono = "'Courier New', Courier, monospace";
const serif = "Georgia, 'Times New Roman', serif";

export default function LandingHeightPredictor() {
  const router = useRouter();
  const [gender, setGender] = useState<'boy' | 'girl' | ''>('');
  const [momFt, setMomFt] = useState('');
  const [momIn, setMomIn] = useState('');
  const [dadFt, setDadFt] = useState('');
  const [dadIn, setDadIn] = useState('');

  const canCalc = gender && momFt && momIn && dadFt && dadIn;

  const result = canCalc ? (() => {
    const motherCm = (parseInt(momFt) * 12 + parseInt(momIn)) * 2.54;
    const fatherCm = (parseInt(dadFt) * 12 + parseInt(dadIn)) * 2.54;
    const targetCm = gender === 'boy'
      ? (fatherCm + (motherCm + 13)) / 2
      : ((fatherCm - 13) + motherCm) / 2;

    const cmToFtIn = (cm: number) => {
      const totalIn = Math.round(cm / 2.54);
      return `${Math.floor(totalIn / 12)}'${totalIn % 12}"`;
    };

    const rangeLow = cmToFtIn(targetCm - 2 * 2.54);
    const rangeHigh = cmToFtIn(targetCm + 2 * 2.54);
    const bioLow = rangeHigh;
    const bioHigh = cmToFtIn(targetCm + 8 * 2.54);
    return { rangeLow, rangeHigh, bioLow, bioHigh, targetCm };
  })() : null;

  // Compute tape measure proportions
  const tapeData = result ? (() => {
    const rangeHighTotal = parseInt(result.rangeHigh.split("'")[0]) * 12 + parseInt(result.rangeHigh.split("'")[1]);
    const rangeLowTotal = parseInt(result.rangeLow.split("'")[0]) * 12 + parseInt(result.rangeLow.split("'")[1]);
    const bioHighTotal = parseInt(result.bioHigh.split("'")[0]) * 12 + parseInt(result.bioHigh.split("'")[1]);
    const totalSpan = bioHighTotal - rangeLowTotal;
    const geneticPct = ((rangeHighTotal - rangeLowTotal) / totalSpan) * 100;
    return { totalSpan, geneticPct, rangeHighTotal, rangeLowTotal };
  })() : null;

  const selectStyle = {
    fontFamily: mono, fontSize: 14, fontWeight: 500, color: '#1c1917',
    background: '#fff', border: '1px solid #e7e5e4', borderRadius: 10,
    padding: '10px 12px', flex: 1, appearance: 'none' as const,
    cursor: 'pointer', WebkitAppearance: 'none' as const,
    backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M3 4.5L6 7.5L9 4.5' stroke='%23a8a29e' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")",
    backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center',
    paddingRight: 30,
  };

  return (
    <section style={{ padding: '1rem 1rem 3rem', backgroundColor: '#fafaf9' }} className="sm:pb-16 sm:pt-4">
      <div style={{ maxWidth: '32rem', margin: '0 auto' }}>
        <div style={{
          background: '#fff', borderRadius: 20,
          border: '2px solid #e7e5e4',
          padding: '2rem 1.5rem',
          boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
        }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <p style={{ fontFamily: mono, fontSize: 10, fontWeight: 700, color: '#065f46', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>
              Free height calculator
            </p>
            <h3 style={{ fontFamily: mono, fontSize: 20, fontWeight: 800, color: '#1c1917', lineHeight: 1.3, margin: 0 }}>
              What&apos;s your child&apos;s <span style={{ color: '#065f46' }}>height potential</span>?
            </h3>
          </div>

          {/* Gender */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontFamily: mono, fontSize: 12, fontWeight: 600, color: '#57534e', display: 'block', marginBottom: 6 }}>Child&apos;s gender</label>
            <div style={{ display: 'flex', gap: 8 }}>
              {(['boy', 'girl'] as const).map(g => (
                <button
                  key={g}
                  onClick={() => setGender(g)}
                  style={{
                    flex: 1, padding: '10px', borderRadius: 10,
                    border: gender === g ? '1.5px solid #065f46' : '1px solid #e7e5e4',
                    background: gender === g ? '#f0fdf4' : '#fff',
                    color: gender === g ? '#065f46' : '#57534e',
                    fontFamily: mono, fontSize: 13, fontWeight: 600,
                    cursor: 'pointer', transition: 'all 0.2s',
                  }}
                >
                  {g.charAt(0).toUpperCase() + g.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Mother's height */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontFamily: mono, fontSize: 12, fontWeight: 600, color: '#57534e', display: 'block', marginBottom: 6 }}>Mother&apos;s height</label>
            <div style={{ display: 'flex', gap: 8 }}>
              <select value={momFt} onChange={e => setMomFt(e.target.value)} style={selectStyle}>
                <option value="">ft</option>
                {[4, 5, 6].map(f => <option key={f} value={String(f)}>{f}&apos;</option>)}
              </select>
              <select value={momIn} onChange={e => setMomIn(e.target.value)} style={selectStyle}>
                <option value="">in</option>
                {Array.from({ length: 12 }, (_, i) => <option key={i} value={String(i)}>{i}&quot;</option>)}
              </select>
            </div>
          </div>

          {/* Father's height */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ fontFamily: mono, fontSize: 12, fontWeight: 600, color: '#57534e', display: 'block', marginBottom: 6 }}>Father&apos;s height</label>
            <div style={{ display: 'flex', gap: 8 }}>
              <select value={dadFt} onChange={e => setDadFt(e.target.value)} style={selectStyle}>
                <option value="">ft</option>
                {[4, 5, 6, 7].map(f => <option key={f} value={String(f)}>{f}&apos;</option>)}
              </select>
              <select value={dadIn} onChange={e => setDadIn(e.target.value)} style={selectStyle}>
                <option value="">in</option>
                {Array.from({ length: 12 }, (_, i) => <option key={i} value={String(i)}>{i}&quot;</option>)}
              </select>
            </div>
          </div>

          {/* Result */}
          {result && tapeData ? (
            <div style={{ animation: 'fadeIn 0.4s ease' }}>
              {/* Tape measure + big number */}
              <div style={{
                background: '#fafaf9', borderRadius: 16,
                border: '1.5px solid #e7e5e4',
                padding: '24px 20px 20px',
                marginBottom: 16,
              }}>
                <div style={{ display: 'flex', gap: 18, alignItems: 'stretch' }}>
                  {/* Tape measure bar */}
                  <div style={{ width: 16, flexShrink: 0, position: 'relative', minHeight: 160 }}>
                    <div style={{
                      position: 'absolute', bottom: 0, left: 0, right: 0,
                      height: `${tapeData.geneticPct}%`,
                      background: '#ebe9e6', borderRadius: '0 0 8px 8px',
                    }} />
                    <div style={{
                      position: 'absolute', top: 0, left: 0, right: 0,
                      height: `${100 - tapeData.geneticPct}%`,
                      background: 'linear-gradient(to top, #065f46 0%, #059669 40%, #34d399 100%)',
                      borderRadius: '8px 8px 0 0',
                    }} />
                    {Array.from({ length: tapeData.totalSpan + 1 }, (_, i) => {
                      const pct = (i / tapeData.totalSpan) * 100;
                      const isMajor = i % 2 === 0;
                      const isZoneLine = i === (tapeData.rangeHighTotal - tapeData.rangeLowTotal);
                      const inGreen = i >= (tapeData.rangeHighTotal - tapeData.rangeLowTotal);
                      return (
                        <div key={i} style={{
                          position: 'absolute', bottom: `${pct}%`, right: 0,
                          width: isZoneLine ? 20 : isMajor ? 8 : 5,
                          height: isZoneLine ? 2 : 1,
                          background: isZoneLine ? '#065f46' : inGreen ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.08)',
                        }} />
                      );
                    })}
                  </div>

                  {/* Heights */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 160 }}>
                    <div>
                      <div style={{ fontFamily: serif, fontSize: 36, fontWeight: 800, color: '#065f46', lineHeight: 1, letterSpacing: '-0.03em' }}>
                        {result.bioHigh}
                      </div>
                      <div style={{ fontFamily: mono, fontSize: 10, color: '#059669', marginTop: 4 }}>
                        with optimized environment
                      </div>
                    </div>
                    <div style={{ padding: '8px 0' }}>
                      <div style={{ fontFamily: mono, fontSize: 8, color: '#065f46', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>bioKids Zone</div>
                      <div style={{ fontFamily: serif, fontSize: 15, fontWeight: 800, color: '#065f46' }}>
                        {result.bioLow} — {result.bioHigh}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontFamily: mono, fontSize: 8, color: '#a8a29e', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>Genetic range</div>
                      <div style={{ fontFamily: serif, fontSize: 13, fontWeight: 700, color: '#a8a29e' }}>
                        {result.rangeLow} — {result.rangeHigh}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontFamily: mono, fontSize: 12, color: '#065f46', marginBottom: 14, lineHeight: 1.6 }}>
                  The bioKids protocol shows you how to reach the upper end — every day.
                </p>
                <button
                  onClick={() => {
                    // Save height data so onboarding can skip the height step
                    if (result) {
                      localStorage.setItem('childGender', gender);
                      localStorage.setItem('motherHeight', `${momFt}'${momIn}"`);
                      localStorage.setItem('fatherHeight', `${dadFt}'${dadIn}"`);
                      localStorage.setItem('motherHeightFt', momFt);
                      localStorage.setItem('motherHeightIn', momIn);
                      localStorage.setItem('fatherHeightFt', dadFt);
                      localStorage.setItem('fatherHeightIn', dadIn);
                      localStorage.setItem('geneticTarget', result.targetCm.toString());
                      localStorage.setItem('biokids_from_landing', 'true');
                    }
                    router.push('/onboarding');
                  }}
                  style={{
                    background: '#065f46', color: '#fff', padding: '12px 32px',
                    borderRadius: 12, fontSize: 14, fontWeight: 700,
                    border: 'none', cursor: 'pointer',
                    fontFamily: mono,
                  }}
                >
                  Start Free Trial
                </button>
                <p style={{ fontFamily: mono, fontSize: 11, color: '#a8a29e', marginTop: 8 }}>
                  7 days free · then $30/mo · cancel anytime
                </p>
              </div>

              {/* References — prominent */}
              <div style={{ marginTop: 20, padding: '16px 16px', background: '#ecfdf5', borderRadius: 12, border: '1.5px solid #86efac' }}>
                <p style={{ fontFamily: mono, fontSize: 10, fontWeight: 700, color: '#065f46', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
                  Peer-Reviewed Sources
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <span style={{ fontFamily: serif, fontSize: 14, fontWeight: 800, color: '#065f46', lineHeight: 1 }}>1</span>
                    <p style={{ fontFamily: mono, fontSize: 11, color: '#065f46', lineHeight: 1.55, margin: 0 }}>
                      <a href="https://pubmed.ncbi.nlm.nih.gov/9773847/" target="_blank" rel="noopener noreferrer" style={{ color: '#065f46', fontWeight: 700, textDecoration: 'underline', textUnderlineOffset: 2 }}>
                        Luo, Albertsson-Wikland &amp; Karlberg 1998
                      </a>{' '}
                      — Pediatric Research. Standard genetic height band calculation (mid-parental ±2&quot;).
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <span style={{ fontFamily: serif, fontSize: 14, fontWeight: 800, color: '#065f46', lineHeight: 1 }}>2</span>
                    <p style={{ fontFamily: mono, fontSize: 11, color: '#065f46', lineHeight: 1.55, margin: 0 }}>
                      <a href="https://pubmed.ncbi.nlm.nih.gov/39201851/" target="_blank" rel="noopener noreferrer" style={{ color: '#065f46', fontWeight: 700, textDecoration: 'underline', textUnderlineOffset: 2 }}>
                        Zeevi et al. 2024
                      </a>{' '}
                      — Children (MDPI). Maximal expression (+3–4 SD above midpoint) documented in healthy families with optimized environment.
                    </p>
                  </div>
                </div>
                <p style={{ fontFamily: mono, fontSize: 9, color: '#059669', marginTop: 10, lineHeight: 1.5, fontStyle: 'italic' }}>
                  * The earlier you start optimizing sleep, nutrition, and movement, the greater the window for growth. Growth plates close after puberty — every year counts.
                </p>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <p style={{ fontFamily: mono, fontSize: 12, color: '#a8a29e' }}>
                Enter heights above to see your child&apos;s potential
              </p>
            </div>
          )}
        </div>

        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    </section>
  );
}
