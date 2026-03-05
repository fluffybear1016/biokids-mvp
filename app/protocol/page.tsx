'use client';

import Nav from '@/components/Nav';
import GrowthStacks from '@/components/GrowthStacks';
import { Child } from '@/lib/supabase';
import { useChildName } from '@/lib/useChildName';

const mockChild: Child = {
  id: '1',
  user_id: '1',
  name: 'Your child',
  birth_date: '2017-03-15',
  gender: 'female',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const F = "'Courier New', Courier, monospace";
const col = {
  bg: '#fafaf9', title: '#1c1917', body: '#57534e', light: '#a8a29e',
  green: '#059669', card: '#fff', border: '#e7e5e4', sigBorder: '#a7f3d0',
};

export default function Protocol() {
  const childName = useChildName();
  const child = { ...mockChild, name: childName };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: col.bg, fontFamily: F }}>
      <Nav currentChild={child} />

      <div style={{ maxWidth: 540, margin: '0 auto', padding: '0 20px', paddingTop: 32, paddingBottom: 64 }}>

        {/* Page Title */}
        <h1 style={{ fontFamily: F, fontSize: 22, fontWeight: 800, color: col.title, letterSpacing: '-0.02em', marginBottom: 8 }}>
          Growth Stacks
        </h1>
        <p style={{ fontFamily: F, fontSize: 14, color: col.body, lineHeight: 1.75, marginBottom: 44 }}>
          A single habit helps. Stacked in sequence, they compound. Each stack is a timed cascade — every step primes the next for maximum growth hormone impact.
        </p>

        {/* The Principle */}
        <div style={{ background: col.card, border: `2px solid ${col.sigBorder}`, borderRadius: 20, padding: '18px 20px', marginBottom: 44 }}>
          <div style={{ fontFamily: F, fontSize: 11, fontWeight: 800, color: col.light, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 14 }}>
            Why Stacking Works
          </div>
          <p style={{ fontFamily: F, fontSize: 14, color: col.body, lineHeight: 1.75, margin: 0 }}>
            Growth hormone is released in pulses, not streams. Each pulse has a 20-minute window where the right nutrition can convert GH into IGF-1 — the actual growth signal. Miss the window, the pulse is wasted. Stacks ensure you never miss it.
          </p>
        </div>

        {/* Stack Selector */}
        <div style={{ marginBottom: 44 }}>
          <GrowthStacks />
        </div>

        {/* How to Use */}
        <div style={{ background: col.card, borderRadius: 14, border: `1px solid ${col.border}`, padding: '14px 18px', marginBottom: 44 }}>
          <div style={{ fontFamily: F, fontSize: 11, fontWeight: 800, color: col.light, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 14 }}>
            How to Start
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { num: '01', text: 'Pick one stack. The Sprint Stack and Sleep Stack have the highest impact.' },
              { num: '02', text: 'Follow it for 7 days straight. Consistency matters more than perfection.' },
              { num: '03', text: 'Add a second stack once the first becomes automatic.' },
            ].map((step) => (
              <div key={step.num} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <span style={{ fontFamily: 'Georgia, serif', fontWeight: 800, fontSize: 14, color: col.green, flexShrink: 0, width: 24 }}>{step.num}</span>
                <p style={{ fontFamily: F, fontSize: 14, color: col.body, lineHeight: 1.75, margin: 0 }}>{step.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* The Numbers */}
        <div style={{ background: col.card, borderRadius: 14, border: `1px solid ${col.border}`, padding: '14px 18px', marginBottom: 44 }}>
          <div style={{ fontFamily: F, fontSize: 11, fontWeight: 800, color: col.light, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 14 }}>
            The Evidence
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 14 }}>
            {[
              { value: '771%', label: 'GH increase from sprint protocol' },
              { value: '70%', label: 'of GH released in first 3hr of sleep' },
              { value: '80%', label: 'GH suppressed by late-night insulin' },
              { value: '3-7hr', label: 'casein releases tryptophan for sleep' },
            ].map((stat) => (
              <div key={stat.label}>
                <div style={{ fontFamily: 'Georgia, serif', fontWeight: 800, fontSize: 18, color: col.green }}>{stat.value}</div>
                <div style={{ fontFamily: F, fontSize: 12, color: col.light, marginTop: 4, lineHeight: 1.4 }}>{stat.label}</div>
              </div>
            ))}
          </div>
          <div style={{ borderTop: `1px solid ${col.border}`, paddingTop: 14 }}>
            <p style={{ fontFamily: F, fontSize: 12, color: col.light, lineHeight: 1.5, margin: 0 }}>
              Every recommendation backed by peer-reviewed research. Citations included in each stack.
            </p>
          </div>
        </div>

        {/* Closing */}
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: F, fontSize: 12, color: col.light, lineHeight: 1.7 }}>
            Consistency beats intensity. Small daily habits compound into massive results.
          </p>
        </div>

      </div>
    </div>
  );
}
