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
  green: '#065f46', card: '#fff', border: '#e7e5e4', sigBorder: '#86efac',
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
        <div style={{ width: 32, height: 3, background: col.green, borderRadius: 2, marginBottom: 14 }} />
        <p style={{ fontFamily: F, fontSize: 14, color: col.body, lineHeight: 1.75, marginBottom: 44 }}>
          A single habit helps. Stacked in sequence, they compound. Each stack is a timed cascade — every step primes the next for maximum growth hormone impact.
        </p>

        {/* The Principle */}
        <div style={{ background: '#f0fdf4', border: `1px solid ${col.green}`, borderRadius: 20, padding: '18px 20px', marginBottom: 44 }}>
          <div style={{ fontFamily: F, fontSize: 11, fontWeight: 800, color: col.green, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 14 }}>
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
        <div style={{ background: '#f0fdf4', borderRadius: 14, border: `1px solid ${col.green}`, padding: '14px 18px', marginBottom: 44 }}>
          <div style={{ fontFamily: F, fontSize: 11, fontWeight: 800, color: col.green, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 14 }}>
            How to Start
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { num: '01', text: 'Pick one stack.' },
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


        {/* Closing */}
        <div style={{ textAlign: 'center', paddingTop: 20, borderTop: `1px solid ${col.border}` }}>
          <div style={{ width: 24, height: 3, background: col.green, borderRadius: 2, margin: '0 auto 14px' }} />
          <p style={{ fontFamily: F, fontSize: 12, color: col.green, opacity: 0.6, lineHeight: 1.7 }}>
            Consistency beats intensity. Small daily habits compound into massive results.
          </p>
        </div>

      </div>
    </div>
  );
}
