'use client';

import Link from 'next/link';
import Nav from '@/components/Nav';
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

export default function BodyCompositionWindow() {
  const childName = useChildName();
  const child = { ...mockChild, name: childName };

  return (
    <div style={{ minHeight: '100vh', background: '#fafaf9', fontFamily: "'Courier New', Courier, monospace" }}>
      <Nav currentChild={child} />

      <main style={{ maxWidth: 540, margin: '0 auto', padding: '0 20px', paddingTop: 32, paddingBottom: 64 }}>

        {/* Back Link */}
        <Link href="/home" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#57534e', marginBottom: 32, textDecoration: 'none' }}>
          <svg style={{ width: 16, height: 16 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Link>

        {/* Header */}
        <div style={{ background: '#fff', borderRadius: 20, border: '2px solid #86efac', padding: '20px', marginBottom: 44 }}>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: '#1c1917', marginBottom: 16 }}>Body Composition</h1>
          <p style={{ fontSize: 14, color: '#57534e', lineHeight: 1.75, marginBottom: 20 }}>
            Excess body fat produces estrogen via aromatase, signaling growth plates to close earlier. Staying lean maximizes GH sensitivity and extends the growth window.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#065f46' }}>50-70%</div>
              <div style={{ fontSize: 12, color: '#57534e', marginTop: 4 }}>GH reduction with obesity</div>
            </div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#065f46' }}>Earlier</div>
              <div style={{ fontSize: 12, color: '#57534e', marginTop: 4 }}>plate closure risk</div>
            </div>
          </div>
        </div>

        {/* Child Status */}
        <section style={{ background: '#fff', borderRadius: 14, border: '1px solid #e7e5e4', padding: '14px 18px', marginBottom: 44 }}>
          <div style={{ marginBottom: 16 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: '#1c1917', marginBottom: 4 }}>{child.name}'s Body Composition</h3>
            <p style={{ fontSize: 14, color: '#57534e' }}>Pre-Puberty Window · Age 8</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            {[
              { value: '18%', label: 'Body Fat', note: 'Healthy range' },
              { value: '52nd', label: 'BMI Percentile', note: 'Normal' },
              { value: 'Lean', label: 'Build Type', note: null },
            ].map((stat) => (
              <div key={stat.label} style={{ background: '#f5f5f4', borderRadius: 10, padding: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#065f46' }}>{stat.value}</div>
                <div style={{ fontSize: 12, color: '#57534e', marginTop: 4 }}>{stat.label}</div>
                {stat.note && <div style={{ fontSize: 12, color: '#065f46', fontWeight: 600, marginTop: 4 }}>{stat.note}</div>}
              </div>
            ))}
          </div>
        </section>

        {/* The Science */}
        <section style={{ background: '#fff', borderRadius: 14, border: '1px solid #e7e5e4', padding: '14px 18px', marginBottom: 44 }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: '#1c1917', marginBottom: 16 }}>The Science</h2>
          <p style={{ fontSize: 14, color: '#57534e', lineHeight: 1.75, marginBottom: 16 }}>
            Understanding how body fat affects growth hormone and growth plate timing.
          </p>
          <div style={{ background: '#f0fdf4', borderRadius: 12, padding: '16px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#065f46', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Mechanism</div>
            <p style={{ fontSize: 14, color: '#57534e', lineHeight: 1.75 }}>
              Adipose (fat) tissue contains aromatase enzyme that converts androgens to estrogen. Elevated estrogen — even in boys — signals growth plates to undergo ossification (closure).
              Obesity also reduces GH secretion by 50-70% and decreases GH receptor sensitivity. This creates a double penalty: less GH AND earlier plate closure.
              Children who stay lean maintain GH sensitivity and preserve growth plate activity longer.
            </p>
          </div>
        </section>

        {/* How to Optimize */}
        <section style={{ background: '#fff', borderRadius: 14, border: '1px solid #e7e5e4', padding: '14px 18px', marginBottom: 44 }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: '#1c1917', marginBottom: 20 }}>How to Optimize</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { text: 'Maintain healthy body fat (15-20% for boys, 18-25% for girls)', citation: '[Veldhuis JD. J Clin Endocrinol. 1995]' },
              { text: 'Prioritize protein and whole foods over processed carbs', citation: '[Ludwig DS. JAMA. 2018]' },
              { text: 'Regular physical activity — builds lean mass, reduces fat', citation: '[Kelley GA. Pediatrics. 2014]' },
              { text: 'Avoid sugar-sweetened beverages — major fat gain driver', citation: '[Malik VS. Circulation. 2010]' },
              { text: 'Adequate sleep — poor sleep promotes fat gain', citation: '[Taheri S. PLoS Med. 2004]' },
            ].map((item) => (
              <div key={item.text} style={{ display: 'flex', gap: 12, padding: '12px', background: '#f5f5f4', borderRadius: 10 }}>
                <div style={{ width: 24, height: 24, background: '#065f46', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg style={{ width: 16, height: 16, color: 'white' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: 14, color: '#1c1917', fontWeight: 500 }}>{item.text}</div>
                  <div style={{ fontSize: 12, color: '#065f46', fontWeight: 500, marginTop: 4 }}>{item.citation}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Avoid */}
        <section style={{ background: '#fff', borderRadius: 14, border: '1px solid #e7e5e4', padding: '14px 18px', marginBottom: 44 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#dc2626', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Avoid</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              'Excess body fat — produces estrogen, accelerates plate closure',
              'Sugar and refined carbs — promote fat storage',
              'Sedentary lifestyle — reduces lean mass, increases fat',
              'Restrictive dieting — can stunt growth if too extreme',
              'Skipping meals — can lead to overeating later',
            ].map((item) => (
              <div key={item} style={{ display: 'flex', gap: 12 }}>
                <div style={{ width: 20, height: 20, background: '#dc2626', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                  <svg style={{ width: 12, height: 12, color: 'white' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <span style={{ fontSize: 14, color: '#57534e' }}>{item}</span>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
