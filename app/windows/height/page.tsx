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

export default function HeightWindow() {
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
          Back to Dashboard
        </Link>

        {/* Header */}
        <div style={{ background: '#fff', borderRadius: 20, border: '2px solid #a7f3d0', padding: '20px', marginBottom: 44 }}>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: '#1c1917', marginBottom: 16 }}>Height Opportunity</h1>
          <p style={{ fontSize: 14, color: '#57534e', lineHeight: 1.75, marginBottom: 20 }}>
            Epiphyseal plates respond to mechanical loading and hormonal signals. Chondrocyte activity determines growth rate. Plates ossify (close) when estrogen levels rise.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#059669' }}>771%</div>
              <div style={{ fontSize: 12, color: '#a8a29e', marginTop: 4 }}>GH spike from sprints</div>
            </div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#059669' }}>1.2-1.5g</div>
              <div style={{ fontSize: 12, color: '#a8a29e', marginTop: 4 }}>protein/kg for IGF-1</div>
            </div>
          </div>
        </div>

        {/* Child Status */}
        <section style={{ background: '#fff', borderRadius: 14, border: '1px solid #e7e5e4', padding: '14px 18px', marginBottom: 44 }}>
          <div style={{ marginBottom: 16 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: '#1c1917', marginBottom: 4 }}>{child.name}'s Height Status</h3>
            <p style={{ fontSize: 14, color: '#a8a29e' }}>Pre-Puberty Window · Age 9</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            {[
              { value: '78th', label: 'Height Percentile', note: 'from 65th' },
              { value: "4'5\"", label: 'Current Height', note: null },
              { value: '~4yr', label: 'Until Plate Closure', note: null },
            ].map((stat) => (
              <div key={stat.label} style={{ background: '#f5f5f4', borderRadius: 10, padding: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#059669' }}>{stat.value}</div>
                <div style={{ fontSize: 12, color: '#a8a29e', marginTop: 4 }}>{stat.label}</div>
                {stat.note && <div style={{ fontSize: 12, color: '#059669', fontWeight: 600, marginTop: 4 }}>{stat.note}</div>}
              </div>
            ))}
          </div>
        </section>

        {/* The Science */}
        <section style={{ background: '#fff', borderRadius: 14, border: '1px solid #e7e5e4', padding: '14px 18px', marginBottom: 44 }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: '#1c1917', marginBottom: 16 }}>The Science</h2>
          <p style={{ fontSize: 14, color: '#57534e', lineHeight: 1.75, marginBottom: 16 }}>
            Understanding how growth plates work and what signals them to grow — or close.
          </p>
          <div style={{ background: '#f0fdf4', borderRadius: 12, padding: '16px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#059669', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Mechanism</div>
            <p style={{ fontSize: 14, color: '#57534e', lineHeight: 1.75 }}>
              GH stimulates IGF-1 production in the liver. IGF-1 acts on growth plate chondrocytes, stimulating proliferation and hypertrophy.
              Mechanical loading through impact and stretching further stimulates chondrocyte activity.
              Plates close when rising estrogen (in both boys and girls) triggers ossification — this is why excess body fat (which increases estrogen via aromatase) can accelerate closure.
            </p>
          </div>
        </section>

        {/* How to Optimize */}
        <section style={{ background: '#fff', borderRadius: 14, border: '1px solid #e7e5e4', padding: '14px 18px', marginBottom: 44 }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: '#1c1917', marginBottom: 20 }}>How to Optimize</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { text: 'Sprint intervals 3x/week (6x30 sec all-out) — stimulates GH 450%+', citation: '[Stokes KA. Sports Med. 2002]' },
              { text: 'Hanging/stretching daily (30+ seconds) — decompresses spine', citation: '[Nachemson AL. Spine. 1981]' },
              { text: 'Jumping/impact activities — mechanical loading stimulates plates', citation: '[Gunter K. Bone. 2008]' },
              { text: 'Protein 1.2-1.5g/kg daily for IGF-1 production', citation: '[Hoppe C. Am J Clin Nutr. 2004]' },
              { text: 'Zinc-rich foods (beef, pumpkin seeds) — essential for GH signaling', citation: '[Prasad AS. Nutrition. 1998]' },
            ].map((item) => (
              <div key={item.text} style={{ display: 'flex', gap: 12, padding: '12px', background: '#f5f5f4', borderRadius: 10 }}>
                <div style={{ width: 24, height: 24, background: '#059669', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg style={{ width: 16, height: 16, color: 'white' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: 14, color: '#1c1917', fontWeight: 500 }}>{item.text}</div>
                  <div style={{ fontSize: 12, color: '#059669', fontWeight: 500, marginTop: 4 }}>{item.citation}</div>
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
              'Heavy weight lifting before age 14 — compressive forces on plates',
              'Excessive sitting — compresses spine, reduces spinal disc height',
              'Low protein intake — limits IGF-1 production',
              'Obesity — elevated estrogen accelerates plate closure',
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
