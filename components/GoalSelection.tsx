'use client';

import { useState } from 'react';

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

  const handleContinue = () => {
    if (selected) {
      onSelect(selected);
    }
  };

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
        <p style={{ fontFamily: mono, fontSize: 12, color: '#a8a29e' }}>
          There&apos;s no wrong answer. You can always adjust later.
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
                <span style={{ fontFamily: mono, fontSize: 11, color: '#065f46', fontWeight: 700 }}>Selected</span>
              )}
            </div>
            <p style={{ fontFamily: mono, fontSize: 12, color: '#065f46', fontWeight: 600, marginBottom: 4 }}>{goal.subtitle}</p>
            <p style={{ fontFamily: mono, fontSize: 11, color: '#78716c', lineHeight: 1.5, marginBottom: 6 }}>{goal.description}</p>
            <p style={{ fontFamily: mono, fontSize: 10, color: '#a8a29e' }}>{goal.target}</p>
          </button>
        ))}
      </div>

      {/* Reassurance */}
      <div style={{ background: '#ecfdf5', borderRadius: 12, padding: '0.75rem 1rem', marginBottom: 20 }}>
        <p style={{ fontFamily: mono, fontSize: 11.5, color: '#065f46', textAlign: 'center', lineHeight: 1.55 }}>
          Every path supports your child&apos;s growth. Start where you are.
        </p>
      </div>

      {/* Continue Button */}
      <button
        onClick={handleContinue}
        disabled={!selected}
        style={{
          fontFamily: mono, fontSize: 15, fontWeight: 700,
          width: '100%', padding: '0.875rem', borderRadius: 12,
          border: 'none', cursor: selected ? 'pointer' : 'not-allowed',
          background: selected ? '#065f46' : '#d6d3d1',
          color: selected ? '#fff' : '#a8a29e',
          transition: 'all 0.2s ease',
        }}
      >
        Continue
      </button>

      <p style={{ textAlign: 'center', fontFamily: mono, fontSize: 10, color: '#a8a29e', marginTop: 12 }}>
        You can change this anytime in settings
      </p>
    </div>
  );
}
