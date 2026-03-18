'use client';

import { useState } from 'react';

type HeightPotentialCalculatorProps = {
  geneticTargetCm: number;
  motherHeight: string;
  fatherHeight: string;
};

const mono = "'Courier New', Courier, monospace";
const serif = "Georgia, 'Times New Roman', serif";

export default function HeightPotentialCalculator({
  geneticTargetCm,
  motherHeight,
  fatherHeight,
}: HeightPotentialCalculatorProps) {
  const [showReferences, setShowReferences] = useState(false);

  const cmToFtIn = (cm: number) => {
    const totalIn = Math.round(cm / 2.54);
    return `${Math.floor(totalIn / 12)}'${totalIn % 12}"`;
  };

  const rangeLow = cmToFtIn(geneticTargetCm - 2 * 2.54);
  const rangeHigh = cmToFtIn(geneticTargetCm + 2 * 2.54);
  const bioLow = rangeHigh; // bioKids zone starts where standard range ends
  const bioHigh = cmToFtIn(geneticTargetCm + 8 * 2.54);

  return (
    <div style={{ marginTop: 28 }}>

      {/* Emotional moment — the big number */}
      <div style={{
        background: 'linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 100%)',
        borderRadius: 16, padding: '1.5rem', marginBottom: 20,
        border: '2px solid #86efac', textAlign: 'center',
      }}>
        <p style={{ fontFamily: mono, fontSize: 10, color: '#065f46', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: 8 }}>
          With optimized environment
        </p>
        <p style={{ fontFamily: serif, fontSize: 36, fontWeight: 800, color: '#065f46', lineHeight: 1, marginBottom: 4 }}>
          {bioLow} — {bioHigh}
        </p>
        <p style={{ fontFamily: mono, fontSize: 12, color: '#065f46', marginTop: 8, lineHeight: 1.55 }}>
          Up to +8&quot; above the genetic midpoint when sleep, nutrition, and movement are dialed in.*
        </p>
      </div>

      {/* Two-Zone Bar Chart */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', gap: 12, marginBottom: 20, height: 240 }}>
        {/* Labels column */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '100%', width: 56, textAlign: 'right', paddingRight: 8, position: 'relative' }}>
          <span style={{ position: 'absolute', bottom: '0%', fontFamily: mono, fontSize: 10, color: '#57534e' }}>{rangeLow}</span>
          <span style={{ position: 'absolute', bottom: '36%', fontFamily: mono, fontSize: 10, color: '#57534e' }}>{rangeHigh}</span>
          <span style={{ position: 'absolute', bottom: '92%', fontFamily: mono, fontSize: 10, color: '#065f46', fontWeight: 700 }}>{bioHigh}</span>
        </div>

        {/* Bar */}
        <div style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 14, overflow: 'hidden', border: '1px solid #e7e5e4' }}>
          {/* Zone 2: bioKids Zone */}
          <div style={{ background: 'linear-gradient(to top, #065f46, #4ade80, #86efac)', height: '60%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center', padding: '0 0.75rem' }}>
              <p style={{ fontFamily: mono, fontSize: 13, fontWeight: 800, color: '#fff' }}>bioKids Zone</p>
              <p style={{ fontFamily: mono, fontSize: 12, color: 'rgba(255,255,255,0.9)', marginTop: 4, fontWeight: 600 }}>{bioLow} to {bioHigh}</p>
              <p style={{ fontFamily: mono, fontSize: 9, color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>+2&quot; to +8&quot; above genetic midpoint</p>
            </div>
          </div>
          {/* Zone 1: Genetic Target */}
          <div style={{ background: '#f5f5f0', height: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderTop: '2px solid #d6d3d1' }}>
            <div style={{ textAlign: 'center', padding: '0 0.75rem' }}>
              <p style={{ fontFamily: mono, fontSize: 9, fontWeight: 700, color: '#57534e', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Genetic Target</p>
              <p style={{ fontFamily: mono, fontSize: 13, fontWeight: 800, color: '#1c1917', marginTop: 2 }}>{rangeLow} to {rangeHigh}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Zone Descriptions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
        <div style={{ background: '#f5f5f0', borderRadius: 12, padding: '0.875rem 1rem', border: '1px solid #e7e5e4' }}>
          <p style={{ fontFamily: mono, fontSize: 12, fontWeight: 700, color: '#1c1917', marginBottom: 4 }}>Genetic Target · {rangeLow} to {rangeHigh}</p>
          <p style={{ fontFamily: mono, fontSize: 11, color: '#57534e', lineHeight: 1.55 }}>
            Where most children finish based on mid-parental calculations. Where they land depends on environment — sleep, nutrition, movement.
          </p>
        </div>
        <div style={{ background: '#ecfdf5', borderRadius: 12, padding: '0.875rem 1rem', border: '1px solid #86efac' }}>
          <p style={{ fontFamily: mono, fontSize: 12, fontWeight: 700, color: '#065f46', marginBottom: 4 }}>bioKids Zone · {bioLow} to {bioHigh}</p>
          <p style={{ fontFamily: mono, fontSize: 11, color: '#065f46', lineHeight: 1.55 }}>
            With optimized sleep, nutrition, and movement, children can express their genetics to the upper end — up to 8 inches above midpoint.
          </p>
        </div>
      </div>

      {/* Early-start footnote */}
      <p style={{ fontFamily: mono, fontSize: 10, color: '#065f46', lineHeight: 1.55, marginBottom: 20, fontStyle: 'italic' }}>
        * The earlier you start optimizing sleep, nutrition, and movement, the greater the window for growth. Growth plates close after puberty — every year counts.
      </p>

      {/* Percentile Table */}
      <div style={{ marginBottom: 20 }}>
        <p style={{ fontFamily: mono, fontSize: 12, fontWeight: 700, color: '#1c1917', marginBottom: 8 }}>Height Potential Breakdown</p>
        <div style={{ border: '1px solid #e7e5e4', borderRadius: 10, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: mono, fontSize: 11 }}>
            <thead>
              <tr style={{ background: '#f5f5f0' }}>
                <th style={{ padding: '8px 10px', textAlign: 'left', fontWeight: 600, color: '#57534e' }}>vs target</th>
                <th style={{ padding: '8px 10px', textAlign: 'left', fontWeight: 600, color: '#57534e' }}>Height</th>
                <th style={{ padding: '8px 10px', textAlign: 'left', fontWeight: 600, color: '#57534e' }}>Percentile</th>
                <th style={{ padding: '8px 10px', textAlign: 'right', fontWeight: 600, color: '#57534e' }}></th>
              </tr>
            </thead>
            <tbody>
              {[
                { offset: 2, pct: '~84th', bio: false },
                { offset: 3, pct: '~93rd', bio: true },
                { offset: 4, pct: '~97.5th', bio: true },
                { offset: 5, pct: '~99.4th', bio: true },
                { offset: 6, pct: '~99.9th', bio: true },
                { offset: 7, pct: '~99.95th', bio: true },
                { offset: 8, pct: '~99.997th', bio: true },
              ].map((row) => (
                <tr key={row.offset} style={{ background: row.bio ? '#ecfdf5' : '#fff', borderTop: '1px solid #f0f0f0' }}>
                  <td style={{ padding: '6px 10px', color: '#57534e' }}>+{row.offset}&quot;</td>
                  <td style={{ padding: '6px 10px', fontWeight: 700, color: '#1c1917' }}>{cmToFtIn(geneticTargetCm + row.offset * 2.54)}</td>
                  <td style={{ padding: '6px 10px', color: '#57534e' }}>{row.pct}</td>
                  <td style={{ padding: '6px 10px', textAlign: 'right' }}>
                    {row.bio && <span style={{ color: '#065f46', fontWeight: 700, fontSize: 10 }}>bioKids</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* References */}
      <button
        type="button"
        onClick={() => setShowReferences(!showReferences)}
        style={{ fontFamily: mono, fontSize: 11, color: '#065f46', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
      >
        {showReferences ? '\u25BC' : '\u25B6'} References
      </button>
      {showReferences && (
        <div style={{ marginTop: 8, background: '#ecfdf5', borderRadius: 10, padding: '0.75rem', fontFamily: mono }}>
          <p style={{ fontSize: 10, color: '#065f46', marginBottom: 6, lineHeight: 1.5 }}>
            Standard band based on{' '}
            <a href="https://pubmed.ncbi.nlm.nih.gov/9773847/" target="_blank" rel="noopener noreferrer" style={{ color: '#057a55', textDecoration: 'underline', textUnderlineOffset: 2 }}>
              Luo, Albertsson-Wikland &amp; Karlberg 1998 (Pediatric Research)
            </a>{' '}
            and AAFP pediatric guidelines.
          </p>
          <p style={{ fontSize: 10, color: '#065f46', lineHeight: 1.5 }}>
            Maximal expression (+3-4 SD) documented in{' '}
            <a href="https://pubmed.ncbi.nlm.nih.gov/39201851/" target="_blank" rel="noopener noreferrer" style={{ color: '#057a55', textDecoration: 'underline', textUnderlineOffset: 2 }}>
              Zeevi et al. 2024 (Children)
            </a>{' '}
            study of healthy families.
          </p>
        </div>
      )}
    </div>
  );
}
