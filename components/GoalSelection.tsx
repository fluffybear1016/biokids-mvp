'use client';

import { useState } from 'react';

interface GoalSelectionProps {
  onSelect: (goal: GoalType) => void;
}

type GoalType = 'concerned' | 'optimization' | 'competitive' | 'elite_performance' | 'maximum';

const goals = [
  {
    id: 'concerned' as GoalType,
    title: 'Concerned About Growth',
    subtitle: 'My child seems small or behind',
    description: "You've noticed your child isn't growing as expected. We'll focus on the highest-impact levers backed by research.",
    icon: '💙',
    color: 'bg-sky-50 border-sky-200 hover:border-sky-300',
    selectedColor: 'bg-sky-100 border-sky-400',
  },
  {
    id: 'optimization' as GoalType,
    title: 'General Optimization',
    subtitle: 'Build a strong foundation',
    description: 'Focus on the fundamentals — good sleep, nutrition basics, daily movement. A solid foundation for lifelong health.',
    icon: '🌿',
    color: 'bg-emerald-50 border-emerald-200 hover:border-emerald-300',
    selectedColor: 'bg-emerald-100 border-emerald-400',
  },
  {
    id: 'competitive' as GoalType,
    title: 'Competitive Edge',
    subtitle: 'Outperform peers naturally',
    description: 'Go beyond the basics with structured protocols for sleep, nutrition, and activity that give your child an edge.',
    icon: '⚡',
    color: 'bg-amber-50 border-amber-200 hover:border-amber-300',
    selectedColor: 'bg-amber-100 border-amber-400',
  },
  {
    id: 'elite_performance' as GoalType,
    title: 'Elite Performance',
    subtitle: 'D1 athletics · Serious advantage',
    description: 'For families targeting elite athletic development. Every lever optimized, every window maximized.',
    icon: '🏅',
    color: 'bg-blue-50 border-blue-200 hover:border-blue-300',
    selectedColor: 'bg-blue-100 border-blue-400',
  },
  {
    id: 'maximum' as GoalType,
    title: 'Maximum Potential',
    subtitle: 'Leave nothing on the table',
    description: "For parents who want to give their child every natural advantage — the full protocol, no compromises.",
    icon: '🏆',
    color: 'bg-purple-50 border-purple-200 hover:border-purple-300',
    selectedColor: 'bg-purple-100 border-purple-400',
  },
];

export type { GoalType };

export default function GoalSelection({ onSelect }: GoalSelectionProps) {
  const [selected, setSelected] = useState<GoalType | null>(null);

  const handleContinue = () => {
    if (selected) {
      onSelect(selected);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-stone-900 mb-2">
          What's your goal?
        </h2>
        <p className="text-sm text-stone-500">
          There's no wrong answer. You can always adjust this later.
        </p>
      </div>

      {/* Goal Cards */}
      <div className="space-y-3 mb-6">
        {goals.map((goal) => (
          <button
            key={goal.id}
            onClick={() => setSelected(goal.id)}
            className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
              selected === goal.id
                ? goal.selectedColor
                : goal.color
            }`}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{goal.icon}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-stone-900">{goal.title}</h3>
                  {selected === goal.id && (
                    <span className="text-emerald-600 text-sm">✓</span>
                  )}
                </div>
                <p className="text-sm text-stone-600 mb-1">{goal.subtitle}</p>
                <p className="text-xs text-stone-500">{goal.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Continue Button */}
      <button
        onClick={handleContinue}
        disabled={!selected}
        className={`w-full py-3 rounded-xl font-medium transition-all ${
          selected
            ? 'bg-emerald-600 text-white hover:bg-emerald-700'
            : 'bg-stone-200 text-stone-400 cursor-not-allowed'
        }`}
      >
        Continue
      </button>

      {/* Footer Note */}
      <p className="text-center text-xs text-stone-400 mt-4">
        You can change this anytime in settings
      </p>
    </div>
  );
}
