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

          {/* Result — screenshot-worthy branded card */}
          {result && tapeData ? (
            <div style={{ animation: 'fadeIn 0.4s ease' }}>
              {/* The shareable card */}
              <div id="biokids-result-card" style={{
                background: 'linear-gradient(145deg, #065f46 0%, #047857 50%, #065f46 100%)',
                borderRadius: 20, padding: '28px 24px 24px',
                marginBottom: 16, position: 'relative', overflow: 'hidden',
              }}>
                {/* Subtle grid pattern */}
                <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'repeating-linear-gradient(90deg, #fff 0px, transparent 1px, transparent 20px), repeating-linear-gradient(0deg, #fff 0px, transparent 1px, transparent 20px)' }} />

                {/* bioKids branding */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, position: 'relative' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#34d399', display: 'inline-block' }} />
                  <span style={{ fontFamily: mono, fontSize: 11, fontWeight: 700, color: '#d1fae5', letterSpacing: '0.06em' }}>bioKids Height Report</span>
                </div>

                {/* Big number — the screenshot moment */}
                <div style={{ position: 'relative', marginBottom: 24 }}>
                  <div style={{ fontFamily: mono, fontSize: 9, fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>
                    Your {gender === 'boy' ? 'son' : 'daughter'}&apos;s potential ceiling
                  </div>
                  <div style={{ fontFamily: serif, fontSize: 52, fontWeight: 800, color: '#ffffff', lineHeight: 1, letterSpacing: '-0.04em' }}>
                    {result.bioHigh}
                  </div>
                </div>

                {/* Two zones side by side */}
                <div style={{ display: 'flex', gap: 12, position: 'relative' }}>
                  <div style={{ flex: 1, background: 'rgba(255,255,255,0.08)', borderRadius: 12, padding: '14px 16px' }}>
                    <div style={{ fontFamily: mono, fontSize: 8, fontWeight: 700, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Genetic range</div>
                    <div style={{ fontFamily: serif, fontSize: 18, fontWeight: 800, color: 'rgba(255,255,255,0.7)' }}>
                      {result.rangeLow} — {result.rangeHigh}
                    </div>
                    <div style={{ fontFamily: mono, fontSize: 9, color: 'rgba(255,255,255,0.35)', marginTop: 4 }}>without optimization</div>
                  </div>
                  <div style={{ flex: 1, background: 'rgba(52,211,153,0.15)', borderRadius: 12, padding: '14px 16px', border: '1px solid rgba(52,211,153,0.2)' }}>
                    <div style={{ fontFamily: mono, fontSize: 8, fontWeight: 700, color: '#34d399', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>bioKids zone</div>
                    <div style={{ fontFamily: serif, fontSize: 18, fontWeight: 800, color: '#ffffff' }}>
                      {result.bioLow} — {result.bioHigh}
                    </div>
                    <div style={{ fontFamily: mono, fontSize: 9, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>with optimized environment</div>
                  </div>
                </div>

                {/* Footer branding */}
                <div style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
                  <span style={{ fontFamily: mono, fontSize: 9, color: 'rgba(255,255,255,0.3)' }}>biokids.me · 100% free</span>
                  <span style={{ fontFamily: mono, fontSize: 8, color: 'rgba(255,255,255,0.25)' }}>based on published medical research</span>
                </div>
              </div>

              {/* Share button */}
              <button
                onClick={async () => {
                  const text = `My ${gender === 'boy' ? "son's" : "daughter's"} height potential:\n\nGenetic range: ${result.rangeLow} — ${result.rangeHigh}\nbioKids zone: ${result.bioLow} — ${result.bioHigh}\n\nFree height calculator at biokids.me`;
                  if (navigator.share) {
                    try { await navigator.share({ title: 'bioKids Height Report', text }); } catch {}
                  } else {
                    try { await navigator.clipboard.writeText(text); alert('Copied to clipboard!'); } catch {}
                  }
                }}
                style={{
                  width: '100%', padding: '12px', marginBottom: 16,
                  background: '#f0fdf4', border: '1.5px solid #d1fae5', borderRadius: 12,
                  fontSize: 13, fontWeight: 700, color: '#065f46',
                  fontFamily: mono, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#065f46" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
                Share with your team
              </button>

              {/* CTA */}
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontFamily: mono, fontSize: 12, color: '#065f46', marginBottom: 14, lineHeight: 1.6 }}>
                  The bioKids protocol shows you how to reach the upper end — every day.
                </p>
                <button
                  onClick={() => {
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
                  Get Started — Free
                </button>
              </div>

              {/* Science credibility — plain language, unmistakably real */}
              <div style={{ marginTop: 20, padding: '18px 16px', background: '#ecfdf5', borderRadius: 12, border: '1.5px solid #86efac' }}>
                <p style={{ fontFamily: mono, fontSize: 11, fontWeight: 800, color: '#065f46', marginBottom: 4 }}>
                  This calculator is based on published medical research.
                </p>
                <p style={{ fontFamily: mono, fontSize: 10, color: '#059669', lineHeight: 1.55, marginBottom: 14 }}>
                  Every number above comes from studies published in medical journals and reviewed by independent scientists before publication. You can click each one to read the original paper on PubMed (the U.S. National Library of Medicine).
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ background: 'rgba(255,255,255,0.7)', borderRadius: 8, padding: '10px 12px' }}>
                    <a href="https://pubmed.ncbi.nlm.nih.gov/9773847/" target="_blank" rel="noopener noreferrer" style={{ fontFamily: mono, fontSize: 11, fontWeight: 700, color: '#065f46', textDecoration: 'underline', textUnderlineOffset: 2 }}>
                      Luo, Albertsson-Wikland &amp; Karlberg, 1998
                    </a>
                    <p style={{ fontFamily: mono, fontSize: 10, color: '#065f46', lineHeight: 1.5, margin: '4px 0 0' }}>
                      Published in <em>Pediatric Research</em>. This is the standard formula used by pediatric endocrinologists worldwide to predict a child&apos;s genetic height range from the parents&apos; heights. The &quot;genetic range&quot; above comes directly from this method.
                    </p>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.7)', borderRadius: 8, padding: '10px 12px' }}>
                    <a href="https://pubmed.ncbi.nlm.nih.gov/39201851/" target="_blank" rel="noopener noreferrer" style={{ fontFamily: mono, fontSize: 11, fontWeight: 700, color: '#065f46', textDecoration: 'underline', textUnderlineOffset: 2 }}>
                      Zeevi et al., 2024
                    </a>
                    <p style={{ fontFamily: mono, fontSize: 10, color: '#065f46', lineHeight: 1.5, margin: '4px 0 0' }}>
                      Published in <em>Children</em> (MDPI). Studied healthy families and documented that children can reach 3–4 standard deviations above their predicted midpoint when sleep, nutrition, and physical activity are optimized during the growth window. The &quot;bioKids zone&quot; above is based on this finding.
                    </p>
                  </div>
                </div>
                <p style={{ fontFamily: mono, fontSize: 9, color: '#059669', marginTop: 12, lineHeight: 1.5, fontStyle: 'italic' }}>
                  Growth plates close after puberty. The earlier you optimize sleep, nutrition, and movement, the larger the window. Every year counts.
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
