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

export default function BaselineScreeningWindow() {
  const childName = useChildName();
  const child = { ...mockChild, name: childName };

  return (
    <div style={{ minHeight: '100vh', background: '#fafaf9', fontFamily: "'Courier New', Courier, monospace" }}>
      <Nav currentChild={child} />

      <main style={{ maxWidth: 540, margin: '0 auto', padding: '0 20px', paddingTop: 32, paddingBottom: 64 }}>

        {/* Back Link */}
        <Link href="/home" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#a8a29e', marginBottom: 32, textDecoration: 'none' }}>
          <svg style={{ width: 16, height: 16 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Link>

        {/* Header */}
        <div style={{ background: '#fff', borderRadius: 20, border: '2px solid #86efac', padding: '20px', marginBottom: 44 }}>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: '#1c1917', marginBottom: 16 }}>Baseline Screening</h1>
          <p style={{ fontSize: 14, color: '#57534e', lineHeight: 1.75, marginBottom: 20 }}>
            Establish your child's growth baseline with bone age X-ray, IGF-1 levels, and key hormone markers. This data personalizes the protocol.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#065f46' }}>5</div>
              <div style={{ fontSize: 12, color: '#a8a29e', marginTop: 4 }}>key tests</div>
            </div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#065f46' }}>1x/yr</div>
              <div style={{ fontSize: 12, color: '#a8a29e', marginTop: 4 }}>recommended</div>
            </div>
          </div>
        </div>

        {/* Child Status */}
        <section style={{ background: '#fff', borderRadius: 14, border: '1px solid #e7e5e4', padding: '14px 18px', marginBottom: 44 }}>
          <div style={{ marginBottom: 16 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: '#1c1917', marginBottom: 4 }}>{child.name}'s Screening Status</h3>
            <p style={{ fontSize: 14, color: '#a8a29e' }}>Pre-Puberty Window · Age 8</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            {[
              { value: '—', label: 'Bone Age', note: 'Not tested' },
              { value: '—', label: 'IGF-1 Level', note: 'Not tested' },
              { value: '—', label: 'Growth Velocity', note: 'Needs data' },
            ].map((stat) => (
              <div key={stat.label} style={{ background: '#f5f5f4', borderRadius: 10, padding: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#065f46' }}>{stat.value}</div>
                <div style={{ fontSize: 12, color: '#a8a29e', marginTop: 4 }}>{stat.label}</div>
                {stat.note && <div style={{ fontSize: 12, color: '#f59e0b', fontWeight: 600, marginTop: 4 }}>{stat.note}</div>}
              </div>
            ))}
          </div>
        </section>

        {/* The Science */}
        <section style={{ background: '#fff', borderRadius: 14, border: '1px solid #e7e5e4', padding: '14px 18px', marginBottom: 44 }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: '#1c1917', marginBottom: 16 }}>The Science</h2>
          <p style={{ fontSize: 14, color: '#57534e', lineHeight: 1.75, marginBottom: 16 }}>
            Understanding baseline metrics helps predict growth potential and optimize interventions.
          </p>
          <div style={{ background: '#f0fdf4', borderRadius: 12, padding: '16px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#065f46', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Mechanism</div>
            <p style={{ fontSize: 14, color: '#57534e', lineHeight: 1.75 }}>
              Bone age X-rays reveal skeletal maturity vs. chronological age. Children with bone age younger than their actual age have more growth potential remaining.
              IGF-1 levels indicate GH axis activity. Growth velocity (cm/year) tracks whether interventions are working.
              These metrics together predict adult height within 2-3cm accuracy.
            </p>
          </div>
        </section>

        {/* How to Optimize */}
        <section style={{ background: '#fff', borderRadius: 14, border: '1px solid #e7e5e4', padding: '14px 18px', marginBottom: 44 }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: '#1c1917', marginBottom: 20 }}>Recommended Tests</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { text: 'Bone age X-ray (left hand/wrist) — reveals skeletal maturity', citation: '[Greulich & Pyle method]' },
              { text: 'IGF-1 blood test — indicates growth hormone axis activity', citation: '[Consensus Guidelines, 2016]' },
              { text: 'Height measurement (stadiometer) — track growth velocity', citation: '[WHO Growth Standards]' },
              { text: 'Thyroid panel (TSH, T4) — thyroid affects growth', citation: '[Pediatric Endocrine Society]' },
              { text: 'Vitamin D level — essential for bone growth', citation: '[Holick MF. NEJM. 2007]' },
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
          <div style={{ fontSize: 11, fontWeight: 700, color: '#dc2626', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Important Notes</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              'Don\'t delay screening — earlier data enables better optimization',
              'Avoid comparing to population averages without bone age context',
              'Single measurements are less useful than trends over time',
              'Don\'t panic about IGF-1 — many factors influence it',
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
