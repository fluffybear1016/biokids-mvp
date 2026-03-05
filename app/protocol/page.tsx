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

export default function Protocol() {
  const childName = useChildName();
  const child = { ...mockChild, name: childName };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fafaf9', fontFamily: "'Courier New', Courier, monospace" }}>
      <Nav currentChild={child} />

      <div style={{ maxWidth: 540, margin: '0 auto', padding: '0 20px', paddingTop: 32, paddingBottom: 64 }}>

        {/* Growth Stacks */}
        <div style={{ marginBottom: 40 }}>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: '#1c1917', letterSpacing: '-0.02em', margin: '0 0 6px' }}>Growth Stacks</h1>
          <p style={{ fontSize: 12, color: '#a8a29e', margin: 0, lineHeight: 1.5 }}>Synergistic habit bundles. Activate a stack to commit to the full combo.</p>
        </div>

        <div style={{ marginBottom: 40 }}>
          <GrowthStacks />
        </div>

        {/* Footer Note */}
        <div style={{ margin: '0 0 40px', textAlign: 'center' }}>
          <p style={{ fontSize: 10.5, color: '#a8a29e', lineHeight: 1.7 }}>
            Consistency beats intensity. Small daily habits compound into massive results.
          </p>
        </div>

      </div>
    </div>
  );
}
