'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Nav from '@/components/Nav';
import { allStages, stageLabels } from '@/lib/stage-content';

const F = "'Courier New', Courier, monospace";

export default function Science() {
  const router = useRouter();
  const [q, setQ] = useState('');
  const [stageId, setStageId] = useState('age-10');

  const stage = allStages.find((s) => s.id === stageId) || allStages[0];

  return (
    <div style={{ minHeight: '100vh', background: '#fafaf9', fontFamily: F }}>
      <Nav />
      <main style={{ maxWidth: 680, margin: '0 auto', padding: '0 20px', paddingTop: 40, paddingBottom: 80 }}>

        {/* Header */}
        <h1 style={{ fontSize: 30, fontWeight: 900, color: '#1c1917', letterSpacing: '-0.02em', marginBottom: 8 }}>
          The Science
        </h1>
        <div style={{ width: 32, height: 3, background: '#065f46', borderRadius: 2, marginBottom: 14 }} />
        <p style={{ fontSize: 14, color: '#57534e', lineHeight: 1.7, marginBottom: 22, maxWidth: 560 }}>
          How growth actually works — the exact biology of height at every age, conception to 25.
          Choose an age to read the full mechanism: how growth signals are made, how they reach the body, and how bones grow.
        </p>

        {/* Ask Au */}
        <form
          onSubmit={(e) => { e.preventDefault(); if (q.trim()) router.push(`/jarvis?q=${encodeURIComponent(q.trim())}`); }}
          style={{ marginBottom: 30 }}
        >
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Ask Au anything about growth..."
            style={{ width: '100%', fontFamily: F, fontSize: 14, color: '#1c1917', background: '#fff', border: '1px solid #e7e5e4', borderRadius: 12, padding: '14px 16px', outline: 'none' }}
          />
        </form>

        {/* Age selector */}
        <div style={{ fontSize: 11, fontWeight: 700, color: '#57534e', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>
          Choose an age
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 34 }}>
          {stageLabels.map((s) => {
            const active = s.id === stageId;
            return (
              <button
                key={s.id}
                onClick={() => setStageId(s.id)}
                style={{
                  fontFamily: F, fontSize: 12, fontWeight: 700, cursor: 'pointer',
                  color: active ? '#fff' : '#065f46',
                  background: active ? '#065f46' : '#f0fdf4',
                  border: '1px solid ' + (active ? '#065f46' : '#d1fae5'),
                  borderRadius: 999, padding: '7px 13px',
                }}
              >
                {s.label}
              </button>
            );
          })}
        </div>

        {/* Selected age — fully printed */}
        <div style={{ fontSize: 13, color: '#57534e', marginBottom: 6 }}>{stage.ageRange}</div>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: '#1c1917', marginBottom: 10, letterSpacing: '-0.01em' }}>
          {stage.header}
        </h2>
        <p style={{ fontSize: 17, color: '#57534e', lineHeight: 1.7, marginBottom: 8 }}>{stage.subhead}</p>
        <p style={{ fontSize: 13, color: '#065f46', fontWeight: 600, marginBottom: 28 }}>{stage.supportive}</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {stage.sections.map((sec, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 14, border: '1px solid #e7e5e4', padding: '22px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <span style={{ width: 30, height: 30, background: '#e0f2fe', color: '#065f46', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, flexShrink: 0 }}>
                  {i + 1}
                </span>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1c1917', margin: 0 }}>{sec.title}</h3>
              </div>
              {sec.intro && (
                <p style={{ fontSize: 14, color: '#1c1917', lineHeight: 1.7, marginBottom: 12, fontWeight: 600 }}>{sec.intro}</p>
              )}
              <p style={{ fontSize: 14, color: '#44403c', lineHeight: 1.85, marginBottom: sec.flow ? 14 : 12 }}>{sec.explanation}</p>
              {sec.flow && (
                <div style={{ background: '#f0fdf4', border: '1px solid #d1fae5', borderRadius: 10, padding: '12px 14px', marginBottom: 12 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: '#065f46', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>The cascade</div>
                  <p style={{ fontSize: 12.5, color: '#065f46', lineHeight: 1.7, margin: 0 }}>{sec.flow}</p>
                </div>
              )}
              {sec.citation && (
                <p style={{ fontSize: 12, color: '#57534e', fontStyle: 'italic', margin: 0 }}>[{sec.citation}]</p>
              )}
            </div>
          ))}
        </div>

        {/* Closing */}
        <div style={{ textAlign: 'center', marginTop: 44, padding: '20px 0', borderTop: '1px solid #e7e5e4' }}>
          <p style={{ fontSize: 12, color: '#57534e', lineHeight: 1.7 }}>
            Every mechanism above is drawn from peer-reviewed research. Have a question?{' '}
            <a href="/jarvis" style={{ color: '#065f46', fontWeight: 700, textDecoration: 'none' }}>Ask Au</a>.
          </p>
        </div>

      </main>
    </div>
  );
}
