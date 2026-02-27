'use client';

import { useState } from 'react';

type HeightPotentialCalculatorProps = {
  geneticTargetCm: number;
  motherHeight: string;
  fatherHeight: string;
};

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
    <div className="mt-6">
      {/* Two-Zone Bar Chart */}
      <div className="relative flex items-end gap-4 mb-6 h-[280px]">
        {/* Labels column */}
        <div className="flex flex-col justify-end h-full w-20 text-right pr-2 text-xs text-stone-500 relative">
          <div className="absolute" style={{ bottom: '0%' }}>
            {rangeLow}
          </div>
          <div className="absolute" style={{ bottom: '36%' }}>
            {rangeHigh}
          </div>
          <div className="absolute" style={{ bottom: '92%' }}>
            {bioHigh}
          </div>
        </div>

        {/* Bar */}
        <div className="flex-1 h-full flex flex-col rounded-xl overflow-hidden border border-stone-200">
          {/* Zone 2: bioKids Zone */}
          <div className="bg-gradient-to-t from-emerald-600 via-emerald-400 to-teal-300 flex items-center justify-center" style={{ height: '60%' }}>
            <div className="text-center px-3">
              <p className="text-base font-bold text-white drop-shadow-sm">bioKids Zone</p>
              <p className="text-sm text-white/90 mt-1 font-medium">{bioLow} to {bioHigh}</p>
              <p className="text-[10px] text-white/70 mt-0.5">+2&quot; to +8&quot; above genetic midpoint</p>
            </div>
          </div>
          {/* Zone 1: Genetic Target */}
          <div className="bg-stone-100 flex items-center justify-center border-t-2 border-stone-300" style={{ height: '40%' }}>
            <div className="text-center px-3">
              <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide">Genetic Target</p>
              <p className="text-sm font-bold text-stone-900 mt-0.5">{rangeLow} to {rangeHigh}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Zone Descriptions */}
      <div className="space-y-4 mb-6">
        <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
          <p className="text-sm font-semibold text-stone-800 mb-1">Genetic Target &middot; {rangeLow} to {rangeHigh}</p>
          <p className="text-sm text-stone-600">
            Based on mid-parental height calculations, most children finish within this range. Where your child lands within it depends on environment &mdash; sleep, nutrition, movement, and hormonal support.
          </p>
        </div>
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-200">
          <p className="text-sm font-semibold text-emerald-800 mb-1">bioKids Zone &middot; {bioLow} to {bioHigh}</p>
          <p className="text-sm text-stone-600">
            With optimized sleep, nutrition, and movement, children can express their genetics to the upper end of their potential &mdash; up to 8 inches above the genetic midpoint. This is where bioKids operates.
          </p>
        </div>
      </div>

      {/* Percentile Table */}
      <div className="mb-6">
        <p className="text-sm font-semibold text-stone-800 mb-2">Height Potential Breakdown</p>
        <div className="border border-stone-200 rounded-lg overflow-hidden text-xs">
          <table className="w-full">
            <thead>
              <tr className="bg-stone-100 text-stone-600">
                <th className="py-2 px-3 text-left font-medium">vs target</th>
                <th className="py-2 px-3 text-left font-medium">Height</th>
                <th className="py-2 px-3 text-left font-medium">Percentile</th>
                <th className="py-2 px-3 text-right font-medium"></th>
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
                <tr key={row.offset} className={row.bio ? 'bg-emerald-50' : 'bg-white'}>
                  <td className="py-1.5 px-3 text-stone-700">+{row.offset}&quot;</td>
                  <td className="py-1.5 px-3 font-medium text-stone-900">{cmToFtIn(geneticTargetCm + row.offset * 2.54)}</td>
                  <td className="py-1.5 px-3 text-stone-600">{row.pct}</td>
                  <td className="py-1.5 px-3 text-right">
                    {row.bio && <span className="text-emerald-700 font-semibold">bioKids</span>}
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
        className="text-xs text-emerald-700 font-medium hover:text-emerald-900 transition-colors"
      >
        {showReferences ? '\u25BC' : '\u25B6'} References
      </button>
      {showReferences && (
        <div className="mt-2 bg-emerald-50 rounded-lg p-3 space-y-2 font-mono">
          <p className="text-[11px] text-emerald-800">
            Standard band based on <a href="https://www.nature.com/articles/pr1998502" target="_blank" rel="noopener noreferrer" className="underline hover:text-emerald-950">Luo/Wang et al. 1998</a> and <a href="https://www.aafp.org/pubs/afp/issues/2015/0701/p43.html" target="_blank" rel="noopener noreferrer" className="underline hover:text-emerald-950">AAFP pediatric guidelines</a>.
          </p>
          <p className="text-[11px] text-emerald-800">
            Maximal expression (+3-4 SD) documented in <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11352326/" target="_blank" rel="noopener noreferrer" className="underline hover:text-emerald-950">Zeevi et al. 2024</a> study of healthy families.
          </p>
        </div>
      )}
    </div>
  );
}
