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

export default function SleepWindow() {
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
          <h1 style={{ fontSize: 22, fontWeight: 800, color: '#1c1917', marginBottom: 16 }}>Golden Sleep Window</h1>
          <p style={{ fontSize: 14, color: '#57534e', lineHeight: 1.75, marginBottom: 20 }}>
            Growth hormone is released in pulses during deep sleep, with 70% occurring in the first 3 sleep cycles. Peak secretion happens 1-2 hours after sleep onset.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#065f46' }}>70%</div>
              <div style={{ fontSize: 12, color: '#57534e', marginTop: 4 }}>of daily GH released during sleep</div>
            </div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#065f46' }}>1-2hr</div>
              <div style={{ fontSize: 12, color: '#57534e', marginTop: 4 }}>after sleep onset = peak</div>
            </div>
          </div>
        </div>

        {/* Child Status */}
        <section style={{ background: '#fff', borderRadius: 14, border: '1px solid #e7e5e4', padding: '14px 18px', marginBottom: 44 }}>
          <div style={{ marginBottom: 16 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: '#1c1917', marginBottom: 4 }}>{child.name}'s Sleep Status</h3>
            <p style={{ fontSize: 14, color: '#57534e' }}>Last 7 days average</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            {[
              { value: '9.2h', label: 'Avg Sleep Duration' },
              { value: '8:24p', label: 'Avg Bedtime' },
              { value: '6/7', label: 'Nights On Protocol' },
            ].map((stat) => (
              <div key={stat.label} style={{ background: '#f5f5f4', borderRadius: 10, padding: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#065f46' }}>{stat.value}</div>
                <div style={{ fontSize: 12, color: '#57534e', marginTop: 4 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* The Science */}
        <section style={{ background: '#fff', borderRadius: 14, border: '1px solid #e7e5e4', padding: '14px 18px', marginBottom: 44 }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: '#1c1917', marginBottom: 16 }}>The Science</h2>
          <p style={{ fontSize: 14, color: '#57534e', lineHeight: 1.75, marginBottom: 16 }}>
            Understanding why sleep timing matters more than duration for growth hormone optimization.
          </p>
          <div style={{ background: '#f0fdf4', borderRadius: 12, padding: '16px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#065f46', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Mechanism</div>
            <p style={{ fontSize: 14, color: '#57534e', lineHeight: 1.75 }}>
              GHRH from the hypothalamus triggers pituitary GH release during slow-wave sleep (N3).
              Melatonin gates this release — without proper melatonin signaling, GH pulses are blunted by up to 70%.
              This is why sleep timing and light exposure before bed matter as much as total sleep duration.
            </p>
          </div>
        </section>

        {/* How to Optimize */}
        <section style={{ background: '#fff', borderRadius: 14, border: '1px solid #e7e5e4', padding: '14px 18px', marginBottom: 44 }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: '#1c1917', marginBottom: 20 }}>How to Optimize</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { text: 'Bedtime by 9pm (before 10pm GH surge window)', citation: '[Van Cauter E. Sleep. 2000]' },
              { text: 'Complete darkness — even dim light suppresses melatonin', citation: '[Gooley JJ. J Clin Endocrinol Metab. 2011]' },
              { text: 'Bedtime milk 30 min before sleep — casein releases tryptophan over 3-7 hours', citation: '[Madziva MT. Nutrients. 2023]' },
              { text: 'Room temperature 65-68°F (18-20°C) for optimal sleep architecture', citation: '[Okamoto-Mizuno K. J Physiol Anthropol. 2012]' },
              { text: 'No food 2-3 hours before bed — insulin suppresses GH', citation: '[Ho KY. J Clin Endocrinol Metab. 1988]' },
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
              'Caffeine after noon — blocks adenosine, fragments sleep',
              'Blue light screens 2 hours before bed',
              'Sugar before bed — insulin spike suppresses GH for 2+ hours',
              'Inconsistent bedtimes — fragments GH release by up to 70%',
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
