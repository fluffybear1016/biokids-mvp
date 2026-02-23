'use client';

import { useState } from 'react';

interface GoalSelectionProps {
  childName: string;
  onSelect: (goal: GoalType) => void;
}

type GoalType = 'concerned' | 'explorer' | 'foundation' | 'optimized' | 'elite';

const goals = [
  {
    id: 'concerned' as GoalType,
    title: 'Concerned About Growth',
    subtitle: 'My child seems small or behind',
    description: "You've noticed your child isn't growing as expected. We'll focus on the highest-impact levers backed by research, with gentle guidance and tracking.",
    target: 'Personalized protocol',
    icon: '💙',
    color: 'bg-sky-50 border-sky-200 hover:border-sky-300',
    selectedColor: 'bg-sky-100 border-sky-400',
  },
  {
    id: 'explorer' as GoalType,
    title: 'Just Starting Out',
    subtitle: 'Learn at your own pace',
    description: 'Explore the science, try what feels right, no pressure. Every small step counts.',
    target: 'Personalized to your pace',
    icon: '🌱',
    color: 'bg-stone-50 border-stone-200 hover:border-stone-300',
    selectedColor: 'bg-stone-100 border-stone-400',
  },
  {
    id: 'foundation' as GoalType,
    title: 'Healthy Foundation',
    subtitle: 'Build great habits',
    description: 'Focus on the fundamentals — good sleep, nutrition basics, daily movement. A solid foundation for life.',
    target: 'Personalized daily essentials',
    icon: '🌿',
    color: 'bg-emerald-50 border-emerald-200 hover:border-emerald-300',
    selectedColor: 'bg-emerald-100 border-emerald-400',
  },
  {
    id: 'optimized' as GoalType,
    title: 'Fully Optimized',
    subtitle: 'Leave nothing on the table',
    description: 'For parents who want to give their child every natural advantage. Consistent daily protocol.',
    target: 'Personalized full protocol',
    icon: '⭐',
    color: 'bg-amber-50 border-amber-200 hover:border-amber-300',
    selectedColor: 'bg-amber-100 border-amber-400',
  },
  {
    id: 'elite' as GoalType,
    title: 'Elite Athlete Track',
    subtitle: 'D1 / Professional sports goal',
    description: 'Your child has big athletic dreams. This track maximizes natural growth potential for competitive sports.',
    target: 'Personalized elite protocol',
    icon: '🏆',
    color: 'bg-blue-50 border-blue-200 hover:border-blue-300',
    selectedColor: 'bg-blue-100 border-blue-400',
  },
];

export default function GoalSelection({ childName, onSelect }: GoalSelectionProps) {
  const [selected, setSelected] = useState<GoalType | null>(null);
  const [hoveredId, setHoveredId] = useState<GoalType | null>(null);

  const handleSelect = (goalId: GoalType) => {
    setSelected(goalId);
  };

  const handleContinue = () => {
    if (selected) {
      onSelect(selected);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      {/* Header */}
      <div className="text-center mb-8">
        <p className="text-sm text-emerald-600 font-medium mb-2">Setting up {childName}'s profile</p>
        <h1 className="text-2xl font-semibold text-stone-900 mb-2">
          What feels right for your family?
        </h1>
        <p className="text-stone-500 text-sm">
          There's no wrong answer. You can always adjust this later.
        </p>
      </div>

      {/* Goal Cards */}
      <div className="space-y-3 mb-8">
        {goals.map((goal) => (
          <button
            key={goal.id}
            onClick={() => handleSelect(goal.id)}
            onMouseEnter={() => setHoveredId(goal.id)}
            onMouseLeave={() => setHoveredId(null)}
            className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
              selected === goal.id 
                ? goal.selectedColor 
                : goal.color
            }`}
          >
            <div className="flex items-start gap-4">
              <span className="text-2xl">{goal.icon}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-stone-900">{goal.title}</h3>
                  {selected === goal.id && (
                    <span className="text-emerald-600 text-sm">✓ Selected</span>
                  )}
                </div>
                <p className="text-sm text-stone-600 mb-1">{goal.subtitle}</p>
                <p className="text-xs text-stone-500">{goal.description}</p>
                <p className="text-xs text-stone-400 mt-2">Daily rhythm: {goal.target}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Reassurance Message */}
      <div className="bg-emerald-50 rounded-lg p-4 mb-6">
        <p className="text-sm text-emerald-800 text-center">
          💚 Every path supports your child's growth. Start where you are — progress happens naturally.
        </p>
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
