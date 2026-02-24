'use client';

import { useState, useEffect } from 'react';
import Nav from '@/components/Nav';
import SignalPage, { SIGNAL_ITEM_COUNT } from '@/components/SignalPage';
import GoalProgress from '@/components/GoalProgress';

export default function Dashboard() {
  const [goal, setGoal] = useState<'concerned' | 'foundation' | 'elite' | null>(null);
  const [completedCount, setCompletedCount] = useState(0);
  const [childName, setChildName] = useState('Your child');

  useEffect(() => {
    // Read goal from localStorage
    const savedGoal = localStorage.getItem('biokids_goal');
    if (savedGoal) {
      try {
        const parsed = JSON.parse(savedGoal);
        setGoal(parsed.goal);
      } catch {}
    }

    // Read child name from localStorage (set during onboarding)
    const name = localStorage.getItem('childName');
    if (name) setChildName(name);

    // Read completed items count
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

    // Poll for changes since SignalPage updates localStorage independently
    const interval = setInterval(updateCompleted, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-cream">
      <Nav />
      <div className="max-w-2xl mx-auto px-4 pt-4">
        {goal && (
          <GoalProgress
            goal={goal}
            completedCount={completedCount}
            totalCount={SIGNAL_ITEM_COUNT}
            childName={childName}
          />
        )}
      </div>
      <SignalPage />
    </div>
  );
}
