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

export default function ToxinsWindow() {
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
          <h1 style={{ fontSize: 22, fontWeight: 800, color: '#1c1917', marginBottom: 16 }}>Toxins</h1>
          <p style={{ fontSize: 14, color: '#57534e', lineHeight: 1.75, marginBottom: 20 }}>
            Endocrine disruptors (BPA, phthalates, PFAS) interfere with hormone signaling. Minimizing exposure protects the GH-IGF axis and prevents premature puberty signals.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#065f46' }}>1000+</div>
              <div style={{ fontSize: 12, color: '#a8a29e', marginTop: 4 }}>known disruptors</div>
            </div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#065f46' }}>Plastics</div>
              <div style={{ fontSize: 12, color: '#a8a29e', marginTop: 4 }}>#1 exposure source</div>
            </div>
          </div>
        </div>

        {/* Child Status */}
        <section style={{ background: '#fff', borderRadius: 14, border: '1px solid #e7e5e4', padding: '14px 18px', marginBottom: 44 }}>
          <div style={{ marginBottom: 16 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: '#1c1917', marginBottom: 4 }}>{child.name}'s Exposure Profile</h3>
            <p style={{ fontSize: 14, color: '#a8a29e' }}>Pre-Puberty Window · Age 8</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            {[
              { value: '3', label: 'Areas to Fix', note: 'Action needed' },
              { value: 'No', label: 'Water Filter', note: 'Get filter' },
              { value: 'Some', label: 'Plastic Use', note: 'Reduce' },
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
            Understanding how environmental toxins disrupt the endocrine system.
          </p>
          <div style={{ background: '#f0fdf4', borderRadius: 12, padding: '16px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#065f46', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Mechanism</div>
            <p style={{ fontSize: 14, color: '#57534e', lineHeight: 1.75 }}>
              Endocrine disrupting chemicals (EDCs) mimic or block hormones. BPA and phthalates (from plastics) have estrogenic activity — potentially accelerating growth plate closure.
              PFAS ("forever chemicals" from non-stick coatings) persist in the body and interfere with thyroid function, which regulates growth.
              Heavy metals (lead, mercury) directly impair GH secretion. Pesticide residues may have cumulative hormonal effects.
            </p>
          </div>
        </section>

        {/* How to Optimize */}
        <section style={{ background: '#fff', borderRadius: 14, border: '1px solid #e7e5e4', padding: '14px 18px', marginBottom: 44 }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: '#1c1917', marginBottom: 20 }}>How to Reduce Exposure</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { text: 'Filter drinking water — removes heavy metals, PFAS, chlorine', citation: '[EWG Water Filter Guide. 2023]' },
              { text: 'Glass/stainless containers — eliminates plastic leaching', citation: '[Yang CZ. Environ Health Perspect. 2011]' },
              { text: 'Avoid non-stick cookware — PFAS exposure source', citation: '[Sunderland EM. Environ Sci Technol. 2019]' },
              { text: 'Eat organic when possible — reduces pesticide load', citation: '[Curl CL. Environ Health Perspect. 2015]' },
              { text: 'Wild-caught over farmed fish — lower contaminant levels', citation: '[Hites RA. Science. 2004]' },
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
          <div style={{ fontSize: 11, fontWeight: 700, color: '#dc2626', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Key Toxin Sources</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              'Plastic food containers — especially when heated',
              'Non-stick pans (Teflon) — PFAS "forever chemicals"',
              'Unfiltered tap water — may contain heavy metals, PFAS',
              'Conventional produce (dirty dozen) — pesticide residues',
              'Farmed fish — higher PCBs, lower omega-3s',
              'Receipts and thermal paper — BPA absorbed through skin',
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
