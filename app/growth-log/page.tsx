'use client';

import { useState, useEffect } from 'react';
import Nav from '@/components/Nav';
import { useChildName } from '@/lib/useChildName';
import { getActiveChild } from '@/lib/children';

type Measurement = {
  date: string; // YYYY-MM-DD
  heightIn: number; // total inches
  note?: string;
};

const inToFtIn = (totalIn: number) => `${Math.floor(totalIn / 12)}'${Math.round(totalIn % 12)}"`;
const cmToIn = (cm: number) => cm / 2.54;
const inToCm = (inches: number) => inches * 2.54;

export default function GrowthLogPage() {
  const childName = useChildName();
  const [activeChild, setActiveChild] = useState<ReturnType<typeof getActiveChild>>(null);

  // Form state
  const [inputFt, setInputFt] = useState('');
  const [inputIn, setInputIn] = useState('');
  const [inputDate, setInputDate] = useState(new Date().toISOString().slice(0, 10));
  const [inputNote, setInputNote] = useState('');
  const [showForm, setShowForm] = useState(false);

  // Measurements
  const [measurements, setMeasurements] = useState<Measurement[]>([]);

  // Load child + measurements
  useEffect(() => {
    const child = getActiveChild();
    setActiveChild(child);
    const key = `biokids_growth_log_${child?.id || 'default'}`;
    try {
      const saved = localStorage.getItem(key);
      if (saved) setMeasurements(JSON.parse(saved));
    } catch {}
  }, []);

  // Save measurements
  useEffect(() => {
    if (measurements.length === 0) return;
    const key = `biokids_growth_log_${activeChild?.id || 'default'}`;
    try { localStorage.setItem(key, JSON.stringify(measurements)); } catch {}
  }, [measurements, activeChild]);

  // Height predictions
  const heightData = (() => {
    if (!activeChild?.geneticTarget) return null;
    const targetCm = parseFloat(activeChild.geneticTarget);
    if (isNaN(targetCm)) return null;
    const rangeLowIn = cmToIn(targetCm - 2 * 2.54);
    const rangeHighIn = cmToIn(targetCm + 2 * 2.54);
    const bioLowIn = rangeHighIn;
    const bioHighIn = cmToIn(targetCm + 8 * 2.54);
    const midpointIn = cmToIn(targetCm);
    return { rangeLowIn, rangeHighIn, bioLowIn, bioHighIn, midpointIn };
  })();

  const sorted = [...measurements].sort((a, b) => a.date.localeCompare(b.date));
  const latest = sorted[sorted.length - 1];
  const first = sorted[0];
  const totalGainIn = latest && first ? latest.heightIn - first.heightIn : 0;

  // Chart dimensions
  const chartW = 320;
  const chartH = 220;
  const padL = 44;
  const padR = 16;
  const padT = 16;
  const padB = 32;
  const plotW = chartW - padL - padR;
  const plotH = chartH - padT - padB;

  // Compute chart bounds
  const allHeights = sorted.map(m => m.heightIn);
  if (heightData) {
    allHeights.push(heightData.rangeLowIn, heightData.bioHighIn);
  }
  const minH = allHeights.length > 0 ? Math.floor(Math.min(...allHeights) - 2) : 36;
  const maxH = allHeights.length > 0 ? Math.ceil(Math.max(...allHeights) + 2) : 72;
  const hRange = maxH - minH || 1;

  const yForHeight = (h: number) => padT + plotH - ((h - minH) / hRange) * plotH;

  // X axis — map dates
  const dateToX = (dateStr: string) => {
    if (sorted.length <= 1) return padL + plotW / 2;
    const firstDate = new Date(sorted[0].date).getTime();
    const lastDate = new Date(sorted[sorted.length - 1].date).getTime();
    const span = lastDate - firstDate || 1;
    const t = (new Date(dateStr).getTime() - firstDate) / span;
    return padL + t * plotW;
  };

  const addMeasurement = () => {
    const ft = parseInt(inputFt) || 0;
    const inches = parseFloat(inputIn) || 0;
    const totalIn = ft * 12 + inches;
    if (totalIn < 20 || totalIn > 84) return;

    const newM: Measurement = {
      date: inputDate,
      heightIn: totalIn,
      note: inputNote || undefined,
    };
    setMeasurements(prev => [...prev.filter(m => m.date !== inputDate), newM]);
    setInputFt('');
    setInputIn('');
    setInputNote('');
    setShowForm(false);
  };

  const deleteMeasurement = (date: string) => {
    setMeasurements(prev => prev.filter(m => m.date !== date));
  };

  const monthLabel = (dateStr: string) => {
    const d = new Date(dateStr + 'T12:00:00');
    return d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
  };

  const fullDateLabel = (dateStr: string) => {
    const d = new Date(dateStr + 'T12:00:00');
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Last measured reminder
  const daysSinceLast = latest ? Math.floor((Date.now() - new Date(latest.date + 'T12:00:00').getTime()) / 86400000) : null;
  const needsMeasure = daysSinceLast === null || daysSinceLast >= 28;

  return (
    <div style={{ background:"#fafaf9", minHeight:"100vh" }}>
      <Nav />
      <div style={{ maxWidth:480, margin:"0 auto", padding:"24px 20px 60px" }}>

        {/* Header */}
        <div style={{ textAlign:"center", marginBottom:32 }}>
          <div style={{ fontSize:22, fontWeight:900, color:"#1c1917", letterSpacing:"-0.02em", marginBottom:6 }}>
            {childName === 'Your child' ? 'Growth Log' : `${childName}'s Growth Log`}
          </div>
          <div style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:11, color:"#44403c", lineHeight:1.6 }}>
            Measure once a month, same time of day.
            <br />Morning is best — before gravity compresses the spine.
          </div>
        </div>

        {/* Measure Now prompt */}
        {needsMeasure && (
          <button
            onClick={() => setShowForm(true)}
            style={{
              width:"100%", padding:"16px 20px",
              background:"linear-gradient(135deg, #ecfdf5, #f0fdf4)",
              border:"2px solid #86efac", borderRadius:16,
              cursor:"pointer", textAlign:"center", marginBottom:24,
            }}
          >
            <div style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:10, fontWeight:700, color:"#065f46", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:4 }}>
              {daysSinceLast === null ? 'First measurement' : `${daysSinceLast} days since last measure`}
            </div>
            <div style={{ fontSize:16, fontWeight:800, color:"#065f46" }}>
              {daysSinceLast === null ? 'Add your first measurement' : 'Time to measure!'}
            </div>
          </button>
        )}

        {/* Quick Stats */}
        {sorted.length >= 2 && (
          <div style={{ display:"flex", gap:10, marginBottom:24 }}>
            <div style={{ flex:1, background:"#fff", border:"1px solid #e7e5e4", borderRadius:14, padding:"16px 14px", textAlign:"center" }}>
              <div style={{ fontFamily:"Georgia, 'Times New Roman', serif", fontSize:28, fontWeight:800, color:"#065f46", lineHeight:1 }}>
                +{totalGainIn.toFixed(1)}&quot;
              </div>
              <div style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:9, color:"#78716c", marginTop:6 }}>
                total growth
              </div>
              <div style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:8, color:"#a8a29e", marginTop:2 }}>
                since {monthLabel(first.date)}
              </div>
            </div>
            <div style={{ flex:1, background:"#fff", border:"1px solid #e7e5e4", borderRadius:14, padding:"16px 14px", textAlign:"center" }}>
              <div style={{ fontFamily:"Georgia, 'Times New Roman', serif", fontSize:28, fontWeight:800, color:"#1c1917", lineHeight:1 }}>
                {inToFtIn(latest.heightIn)}
              </div>
              <div style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:9, color:"#78716c", marginTop:6 }}>
                current height
              </div>
              <div style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:8, color:"#a8a29e", marginTop:2 }}>
                {fullDateLabel(latest.date)}
              </div>
            </div>
          </div>
        )}

        {/* Growth Chart */}
        {sorted.length >= 1 && (
          <div style={{ background:"#fff", border:"1px solid #e7e5e4", borderRadius:16, padding:"20px 16px", marginBottom:24 }}>
            <div style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:9, fontWeight:700, color:"#065f46", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:16 }}>
              Growth Chart
            </div>
            <svg width={chartW} height={chartH} viewBox={`0 0 ${chartW} ${chartH}`} style={{ width:"100%", height:"auto" }}>
              {/* Grid lines */}
              {Array.from({ length: Math.min(8, hRange + 1) }, (_, i) => {
                const h = minH + (i / Math.min(7, hRange)) * hRange;
                const y = yForHeight(h);
                return (
                  <g key={i}>
                    <line x1={padL} y1={y} x2={chartW - padR} y2={y} stroke="#f0eeec" strokeWidth={1} />
                    <text x={padL - 6} y={y + 3} textAnchor="end" fill="#a8a29e" fontSize={9} fontFamily="'Courier New', monospace">
                      {inToFtIn(Math.round(h))}
                    </text>
                  </g>
                );
              })}

              {/* bioKids zone band */}
              {heightData && (
                <rect
                  x={padL} y={yForHeight(heightData.bioHighIn)}
                  width={plotW}
                  height={yForHeight(heightData.bioLowIn) - yForHeight(heightData.bioHighIn)}
                  fill="#ecfdf5" opacity={0.6}
                />
              )}

              {/* Genetic range band */}
              {heightData && (
                <rect
                  x={padL} y={yForHeight(heightData.rangeHighIn)}
                  width={plotW}
                  height={yForHeight(heightData.rangeLowIn) - yForHeight(heightData.rangeHighIn)}
                  fill="#f5f5f4" opacity={0.8}
                />
              )}

              {/* Zone labels */}
              {heightData && (
                <>
                  <text x={chartW - padR - 4} y={yForHeight(heightData.bioHighIn) + 12} textAnchor="end" fill="#065f46" fontSize={8} fontFamily="'Courier New', monospace" fontWeight={700} opacity={0.6}>
                    bioKids zone
                  </text>
                  <text x={chartW - padR - 4} y={yForHeight(heightData.rangeHighIn) + 12} textAnchor="end" fill="#78716c" fontSize={8} fontFamily="'Courier New', monospace" opacity={0.6}>
                    genetic range
                  </text>
                </>
              )}

              {/* Data line */}
              {sorted.length >= 2 && (
                <polyline
                  points={sorted.map(m => `${dateToX(m.date)},${yForHeight(m.heightIn)}`).join(' ')}
                  fill="none" stroke="#065f46" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"
                />
              )}

              {/* Data points */}
              {sorted.map((m, i) => (
                <g key={m.date}>
                  <circle cx={dateToX(m.date)} cy={yForHeight(m.heightIn)} r={5} fill="#065f46" stroke="#fff" strokeWidth={2} />
                  {(i === 0 || i === sorted.length - 1) && (
                    <text
                      x={dateToX(m.date)} y={yForHeight(m.heightIn) - 10}
                      textAnchor="middle" fill="#065f46" fontSize={10} fontWeight={800}
                      fontFamily="Georgia, 'Times New Roman', serif"
                    >
                      {inToFtIn(m.heightIn)}
                    </text>
                  )}
                </g>
              ))}

              {/* X axis date labels */}
              {sorted.length >= 1 && sorted.filter((_, i) =>
                sorted.length <= 6 || i === 0 || i === sorted.length - 1 || i % Math.ceil(sorted.length / 5) === 0
              ).map(m => (
                <text
                  key={m.date}
                  x={dateToX(m.date)} y={chartH - 6}
                  textAnchor="middle" fill="#a8a29e" fontSize={8}
                  fontFamily="'Courier New', monospace"
                >
                  {monthLabel(m.date)}
                </text>
              ))}
            </svg>
          </div>
        )}

        {/* Add Measurement Form */}
        {showForm && (
          <div style={{ background:"#fff", border:"2px solid #86efac", borderRadius:16, padding:"24px 20px", marginBottom:24 }}>
            <div style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:10, fontWeight:700, color:"#065f46", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:16 }}>
              New Measurement
            </div>

            {/* Height input */}
            <div style={{ display:"flex", gap:10, marginBottom:14 }}>
              <div style={{ flex:1 }}>
                <label style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:9, color:"#78716c", display:"block", marginBottom:4 }}>Feet</label>
                <input
                  type="number" min="1" max="7" value={inputFt}
                  onChange={e => setInputFt(e.target.value)}
                  placeholder="4"
                  style={{
                    width:"100%", padding:"10px 12px", border:"1px solid #e7e5e4", borderRadius:10,
                    fontSize:18, fontWeight:800, fontFamily:"Georgia, 'Times New Roman', serif",
                    color:"#1c1917", textAlign:"center",
                  }}
                />
              </div>
              <div style={{ flex:1 }}>
                <label style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:9, color:"#78716c", display:"block", marginBottom:4 }}>Inches</label>
                <input
                  type="number" min="0" max="11.9" step="0.5" value={inputIn}
                  onChange={e => setInputIn(e.target.value)}
                  placeholder="6"
                  style={{
                    width:"100%", padding:"10px 12px", border:"1px solid #e7e5e4", borderRadius:10,
                    fontSize:18, fontWeight:800, fontFamily:"Georgia, 'Times New Roman', serif",
                    color:"#1c1917", textAlign:"center",
                  }}
                />
              </div>
            </div>

            {/* Date */}
            <div style={{ marginBottom:14 }}>
              <label style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:9, color:"#78716c", display:"block", marginBottom:4 }}>Date</label>
              <input
                type="date" value={inputDate}
                onChange={e => setInputDate(e.target.value)}
                style={{
                  width:"100%", padding:"10px 12px", border:"1px solid #e7e5e4", borderRadius:10,
                  fontSize:13, fontFamily:"'Courier New', Courier, monospace", color:"#1c1917",
                }}
              />
            </div>

            {/* Note */}
            <div style={{ marginBottom:18 }}>
              <label style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:9, color:"#78716c", display:"block", marginBottom:4 }}>Note (optional)</label>
              <input
                type="text" value={inputNote}
                onChange={e => setInputNote(e.target.value)}
                placeholder="e.g. morning, before breakfast"
                style={{
                  width:"100%", padding:"10px 12px", border:"1px solid #e7e5e4", borderRadius:10,
                  fontSize:13, fontFamily:"'Courier New', Courier, monospace", color:"#1c1917",
                }}
              />
            </div>

            <div style={{ display:"flex", gap:10 }}>
              <button
                onClick={addMeasurement}
                style={{
                  flex:1, padding:"12px", background:"#065f46", color:"#fff",
                  border:"none", borderRadius:12, fontSize:14, fontWeight:700,
                  fontFamily:"'Courier New', Courier, monospace", cursor:"pointer",
                }}
              >
                Save
              </button>
              <button
                onClick={() => setShowForm(false)}
                style={{
                  padding:"12px 20px", background:"#fafaf9", color:"#78716c",
                  border:"1px solid #e7e5e4", borderRadius:12, fontSize:13, fontWeight:600,
                  fontFamily:"'Courier New', Courier, monospace", cursor:"pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* + Add button when form is hidden */}
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            style={{
              width:"100%", padding:"14px", background:"#fff",
              border:"1.5px dashed #d6d3d1", borderRadius:14,
              fontSize:13, fontWeight:700, color:"#78716c",
              fontFamily:"'Courier New', Courier, monospace", cursor:"pointer",
              marginBottom:24,
            }}
          >
            + Add measurement
          </button>
        )}

        {/* Measurement History */}
        {sorted.length > 0 && (
          <div>
            <div style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:9, fontWeight:700, color:"#44403c", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:12 }}>
              History
            </div>
            {[...sorted].reverse().map((m, i) => {
              const prev = sorted[sorted.indexOf(m) - 1];
              const gain = prev ? m.heightIn - prev.heightIn : null;
              return (
                <div key={m.date} style={{
                  display:"flex", alignItems:"center", gap:14,
                  padding:"12px 14px", background:"#fff",
                  border:"1px solid #e7e5e4", borderRadius:12,
                  marginBottom:8,
                }}>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", alignItems:"baseline", gap:8 }}>
                      <span style={{ fontFamily:"Georgia, 'Times New Roman', serif", fontSize:18, fontWeight:800, color:"#1c1917" }}>
                        {inToFtIn(m.heightIn)}
                      </span>
                      {gain !== null && gain > 0 && (
                        <span style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:11, fontWeight:700, color:"#065f46" }}>
                          +{gain.toFixed(1)}&quot;
                        </span>
                      )}
                    </div>
                    <div style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:10, color:"#78716c", marginTop:2 }}>
                      {fullDateLabel(m.date)}{m.note ? ` · ${m.note}` : ''}
                    </div>
                  </div>
                  <button
                    onClick={() => deleteMeasurement(m.date)}
                    style={{
                      background:"none", border:"none", cursor:"pointer",
                      fontSize:14, color:"#d6d3d1", padding:"4px 8px",
                    }}
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty state */}
        {sorted.length === 0 && !showForm && (
          <div style={{ textAlign:"center", padding:"40px 20px" }}>
            <div style={{ fontFamily:"Georgia, 'Times New Roman', serif", fontSize:48, color:"#e7e5e4", marginBottom:16 }}>
              &#x1F4CF;
            </div>
            <p style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:13, color:"#78716c", lineHeight:1.7, maxWidth:280, margin:"0 auto" }}>
              Your growth chart starts with one measurement.
              <br /><br />
              Measure in the morning, barefoot, against a wall. Mark it. Measure it. Log it here.
            </p>
          </div>
        )}

        {/* Tip */}
        <div style={{
          marginTop:32, padding:"16px 18px",
          background:"#f5f5f4", borderRadius:12,
          fontFamily:"'Courier New', Courier, monospace",
          fontSize:10, color:"#78716c", lineHeight:1.7,
        }}>
          <strong style={{ color:"#44403c" }}>Measurement tip:</strong> Same time each day (morning is best). Barefoot. Standing straight against a wall. Use a flat object (book, ruler) on top of their head, mark the wall, measure with a tape. Children are ~1 cm taller in the morning than evening due to spinal compression.
        </div>
      </div>
    </div>
  );
}
