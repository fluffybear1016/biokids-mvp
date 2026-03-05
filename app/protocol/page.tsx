'use client';

import { useState, useEffect } from 'react';
import Nav from '@/components/Nav';
import SignalPage, { SIGNAL_ITEM_COUNT } from '@/components/SignalPage';
import GoalProgress from '@/components/GoalProgress';
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

  // GoalProgress state
  const [goal, setGoal] = useState<'concerned' | 'foundation' | 'elite' | null>(null);
  const [completedCount, setCompletedCount] = useState(0);
  const [isStuck, setIsStuck] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsStuck(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const savedGoal = localStorage.getItem('biokids_goal');
    if (savedGoal) {
      try {
        const parsed = JSON.parse(savedGoal);
        setGoal(parsed.goal);
      } catch {}
    }

    const updateCompleted = () => {
      const saved = localStorage.getItem('biokids_signal_completed');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.date === new Date().toDateString()) {
            setCompletedCount(parsed.items.length);
          } else {
            setCompletedCount(0);
          }
        } catch {}
      }
    };
    updateCompleted();
    const interval = setInterval(updateCompleted, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fafaf9', fontFamily: "'Courier New', Courier, monospace" }}>
      <Nav currentChild={child} />

      {/* Daily Protocol - time-based signals */}
      {goal && (
        <div style={{ position: 'sticky', top: 73, zIndex: 40, backgroundColor: '#fafaf9', transition: 'box-shadow 0.2s ease', boxShadow: isStuck ? '0 4px 12px rgba(0,0,0,0.06)' : 'none' }}>
          <div style={{ maxWidth: 540, margin: '0 auto', padding: '16px 20px 8px' }}>
            <GoalProgress
              goal={goal}
              completedCount={completedCount}
              totalCount={SIGNAL_ITEM_COUNT}
              childName={childName}
            />
          </div>
        </div>
      )}
      <SignalPage />

      <div style={{ maxWidth: 540, margin: '0 auto', padding: '0 20px' }}>

        {/* Growth Stacks */}
        <div style={{ paddingTop: 48, marginBottom: 40 }}>
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
