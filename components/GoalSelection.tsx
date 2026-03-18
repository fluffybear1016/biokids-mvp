'use client';

import { useState, useEffect, useRef } from 'react';

interface GoalSelectionProps {
  childName: string;
  onSelect: (goal: GoalType) => void;
}

type GoalType = 'concerned' | 'foundation' | 'elite';

const mono = "'Courier New', Courier, monospace";

const goals = [
  {
    id: 'concerned' as GoalType,
    title: 'Concerned About Growth',
    subtitle: 'My child seems small or behind',
    description: "You've noticed your child isn't growing as expected. We'll focus on the highest-impact levers backed by research.",
    target: 'Personalized protocol',
  },
  {
    id: 'foundation' as GoalType,
    title: 'Healthy Foundation',
    subtitle: 'Build great habits',
    description: 'Focus on the fundamentals — good sleep, nutrition basics, daily movement. A solid foundation for life.',
    target: 'Personalized daily essentials',
  },
  {
    id: 'elite' as GoalType,
    title: 'Maximum Potential',
    subtitle: 'D1 / Pro sports · Leave nothing on the table',
    description: "For parents who want to give their child every natural advantage — whether for elite athletics or overall development.",
    target: 'Personalized elite protocol',
  },
];

export default function GoalSelection({ childName, onSelect }: GoalSelectionProps) {
  const [selected, setSelected] = useState<GoalType | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-advance after selection with brief visual feedback
  useEffect(() => {
    if (selected) {
      timerRef.current = setTimeout(() => onSelect(selected), 500);
      return () => { if (timerRef.current) clearTimeout(timerRef.current); };
    }
  }, [selected, onSelect]);

  return (
    <div style={{ maxWidth: 440, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <p style={{ fontFamily: mono, fontSize: 10, color: '#065f46', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>
          Setting up {childName}&apos;s profile
        </p>
        <h2 style={{ fontFamily: mono, fontSize: 20, fontWeight: 800, color: '#1c1917', marginBottom: 6 }}>
          What feels right for your family?
        </h2>
        <p style={{ fontFamily: mono, fontSize: 12, color: '#57534e' }}>
          Tap one. You can always adjust later.
        </p>
      </div>

      {/* Goal Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
        {goals.map((goal) => (
          <button
            key={goal.id}
            onClick={() => setSelected(goal.id)}
            style={{
              textAlign: 'left', padding: '1rem 1.25rem', borderRadius: 14, cursor: 'pointer',
              border: selected === goal.id ? '2px solid #065f46' : '1px solid #e7e5e4',
              background: selected === goal.id ? '#ecfdf5' : '#fff',
              transition: 'all 0.2s ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ fontFamily: mono, fontSize: 14, fontWeight: 700, color: '#1c1917' }}>{goal.title}</span>
              {selected === goal.id && (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="9" cy="9" r="9" fill="#065f46"/>
                  <path d="M5.5 9L8 11.5L12.5 6.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
            <p style={{ fontFamily: mono, fontSize: 12, color: '#065f46', fontWeight: 600, marginBottom: 4 }}>{goal.subtitle}</p>
            <p style={{ fontFamily: mono, fontSize: 11, color: '#57534e', lineHeight: 1.5, marginBottom: 0 }}>{goal.description}</p>
          </button>
        ))}
      </div>

      {/* Reassurance */}
      <div style={{ background: '#ecfdf5', borderRadius: 12, padding: '0.75rem 1rem' }}>
        <p style={{ fontFamily: mono, fontSize: 11.5, color: '#065f46', textAlign: 'center', lineHeight: 1.55 }}>
          Every path supports your child&apos;s growth. Start where you are.
        </p>
      </div>
    </div>
  );
}
