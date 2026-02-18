'use client';

import { useState } from 'react';

type Stack = {
  name: string;
  icon: string;
  description: string;
  items: string[];
  citation: string;
  active: boolean;
};

export default function GrowthStacks() {
  const [stacks, setStacks] = useState<Stack[]>([
    {
      name: 'Sleep & GH Surge',
      icon: '🌙',
      description: 'Maximize growth hormone release during deep sleep phases.',
      items: [
        'Bedtime milk 6oz, 30 min before sleep',
        'No food 2-3 hours before bed',
        'Screen-free 2hr before bed',
        'Sleep 10-12 hours minimum',
      ],
      citation: '[Van Cauter E. Sleep. 2000]',
      active: false,
    },
    {
      name: 'Morning Activation',
      icon: '☀️',
      description: 'Reset circadian rhythm and fuel the first growth window of the day.',
      items: [
        'Morning sunlight 10-30 min',
        'Eggs + cod liver oil at breakfast',
        'Active play within first hour',
      ],
      citation: '[Roenneberg T. 2007]',
      active: false,
    },
    {
      name: 'Mechanical Loading',
      icon: '🦴',
      description: 'Stimulate growth plates through impact and stretch signals.',
      items: [
        'Hanging/stretching 20 min daily',
        'Sprint intervals 6x30 sec',
        'Jumping and impact activities',
      ],
      citation: '[Gunter K. Bone. 2008]',
      active: false,
    },
    {
      name: 'Nutrient Density',
      icon: '🥩',
      description: 'Deliver the raw building blocks for bone and tissue growth.',
      items: [
        'Raw milk or A2 organic (2-3 cups)',
        'Wild-caught salmon (2x/week)',
        'Bone broth daily',
        'Fermented foods (kefir, sauerkraut)',
      ],
      citation: '[Hoppe C. 2004; Prasad AS. 1998]',
      active: false,
    },
  ]);

  const toggleStack = (index: number) => {
    setStacks(prev =>
      prev.map((stack, i) =>
        i === index ? { ...stack, active: !stack.active } : stack
      )
    );
  };

  const activeCount = stacks.filter(s => s.active).length;

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {stacks.map((stack, index) => (
        <button
          key={stack.name}
          onClick={() => toggleStack(index)}
          className={`text-left rounded-2xl p-5 transition-all border-2 ${
            stack.active
              ? 'bg-green-50 border-green-500 shadow-md'
              : 'bg-white border-cream hover:border-forest/30'
          }`}
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{stack.icon}</span>
              <h3 className="font-semibold text-gray-900">{stack.name}</h3>
            </div>
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                stack.active
                  ? 'bg-green-500 border-green-500 text-white'
                  : 'border-gray-300'
              }`}
            >
              {stack.active && (
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-3">{stack.description}</p>
          <ul className="space-y-1.5 mb-3">
            {stack.items.map(item => (
              <li key={item} className="text-sm text-gray-700 flex items-start gap-2">
                <span className="text-forest mt-0.5">•</span>
                {item}
              </li>
            ))}
          </ul>
          <span className="text-xs text-forest font-medium">{stack.citation}</span>
        </button>
      ))}
    </div>
  );
}
