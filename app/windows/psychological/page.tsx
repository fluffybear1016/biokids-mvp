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

export default function PsychologicalWindow() {
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
          <h1 style={{ fontSize: 22, fontWeight: 800, color: '#1c1917', marginBottom: 16 }}>Psychological</h1>
          <p style={{ fontSize: 14, color: '#57534e', lineHeight: 1.75, marginBottom: 20 }}>
            Chronic stress elevates cortisol, which directly suppresses GH secretion. Emotional security and low-stress environments optimize the hormonal milieu for growth.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#065f46' }}>Cortisol</div>
              <div style={{ fontSize: 12, color: '#57534e', marginTop: 4 }}>suppresses GH</div>
            </div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#065f46' }}>Secure</div>
              <div style={{ fontSize: 12, color: '#57534e', marginTop: 4 }}>attachment = growth</div>
            </div>
          </div>
        </div>

        {/* Child Status */}
        <section style={{ background: '#fff', borderRadius: 14, border: '1px solid #e7e5e4', padding: '14px 18px', marginBottom: 44 }}>
          <div style={{ marginBottom: 16 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: '#1c1917', marginBottom: 4 }}>{child.name}'s Stress Profile</h3>
            <p style={{ fontSize: 14, color: '#57534e' }}>Pre-Puberty Window · Age 8</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            {[
              { value: 'Low', label: 'Stress Level', note: 'Favorable' },
              { value: 'Secure', label: 'Attachment Style', note: 'Healthy' },
              { value: '8hr', label: 'Play Time/Week', note: 'Adequate' },
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
            Understanding the stress-growth connection and psychosocial dwarfism.
          </p>
          <div style={{ background: '#f0fdf4', borderRadius: 12, padding: '16px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#065f46', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Mechanism</div>
            <p style={{ fontSize: 14, color: '#57534e', lineHeight: 1.75 }}>
              Cortisol (stress hormone) directly inhibits GH secretion and blocks GH receptor signaling. Chronic stress creates persistently elevated cortisol, continuously suppressing growth.
              "Psychosocial dwarfism" is a documented phenomenon where children in high-stress environments show stunted growth despite adequate nutrition.
              Secure attachment, emotional safety, and play activate parasympathetic nervous system — the "rest and digest" state where growth happens.
            </p>
          </div>
        </section>

        {/* How to Optimize */}
        <section style={{ background: '#fff', borderRadius: 14, border: '1px solid #e7e5e4', padding: '14px 18px', marginBottom: 44 }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: '#1c1917', marginBottom: 20 }}>How to Optimize</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { text: 'Secure attachment — emotional safety enables growth', citation: '[Bowlby J. Attachment Theory. 1969]' },
              { text: 'Unstructured play time — reduces cortisol naturally', citation: '[Gray P. Am J Play. 2011]' },
              { text: 'Consistent routines — predictability reduces stress', citation: '[Spagnola M. Infants Young Child. 2007]' },
              { text: 'Adequate sleep — sleep deprivation raises cortisol', citation: '[Leproult R. Sleep. 1997]' },
              { text: 'Nature exposure — lowers cortisol within 20 minutes', citation: '[Hunter MR. Front Psychol. 2019]' },
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
              'Chronic family conflict — persistent cortisol elevation',
              'Over-scheduling — no downtime increases stress hormones',
              'Academic pressure beyond ability — chronic stress response',
              'Sleep deprivation — amplifies cortisol and suppresses GH',
              'Social isolation — humans need connection for optimal development',
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
