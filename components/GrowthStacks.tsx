'use client';

import { useState } from 'react';

const stacks = [
  {
    id: 'sprint',
    name: 'Sprint Stack',
    icon: '🏃',
    subtitle: '771% GH spike → converted to IGF-1',
    steps: [
      { time: '2 hrs before', action: 'Beef liver', why: 'Retinol primes GH receptors' },
      { time: '30 min before', action: 'Eggs + peanuts', why: 'Choline + niacin for GH expression' },
      { time: 'Session', action: '6x 30-sec all-out sprints', why: '771% GH spike via lactate' },
      { time: 'Immediately after', action: '10 min stretching/hanging', why: 'Microfractures heal elongated' },
      { time: 'Within 30 min', action: 'A2 milk + raw honey', why: 'Converts GH → IGF-1 (the growth signal)' },
    ],
    note: 'Without the post-sprint milk, the GH pulse is "orphaned" — present but not converted to growth.',
  },
  {
    id: 'sleep',
    name: 'Sleep Stack',
    icon: '🌙',
    subtitle: 'Maximize slow-wave sleep + GH release',
    steps: [
      { time: 'Dinner', action: 'Bone broth + high-arginine protein', why: 'Glycine + GH precursors' },
      { time: 'Dessert', action: 'Gelatin jello + pineapple', why: 'Glycine + serotonin for sleep' },
      { time: '60 min before bed', action: 'Warm bath + Epsom salts', why: 'Magnesium + cooling trigger' },
      { time: '60-90 min before', action: 'Warm A2 milk + ½ tsp honey', why: 'Tryptophan → melatonin' },
      { time: '30-45 min before', action: 'Tart cherry juice (diluted)', why: 'Exogenous melatonin + cortisol down' },
      { time: '15 min before', action: 'Magnesium lotion on feet', why: 'GABA activation + sensory ritual' },
      { time: 'Lights out', action: 'Complete darkness + pink noise', why: 'Protect SWS all night' },
    ],
    note: 'Each step primes the next. Skip one, the cascade weakens.',
  },
  {
    id: 'morning',
    name: 'Morning Stack',
    icon: '☀️',
    subtitle: 'Prime IGF-1 axis for the day',
    steps: [
      { time: 'Within 30 min of waking', action: 'Sunlight 10-30 min', why: 'Sets circadian phase + vitamin D' },
      { time: 'With breakfast', action: 'Cod liver oil', why: 'Retinol + D + omega-3' },
      { time: 'Breakfast', action: 'Eggs + raw milk', why: 'Complete aminos + IGF-1 stimulus' },
      { time: 'Until lunch', action: 'No sugar', why: 'Keeps insulin low, GH sensitivity high' },
    ],
    note: 'Morning sunlight is the #1 circadian anchor — it affects GH pulses 16 hours later.',
  },
  {
    id: 'puberty-delay',
    name: 'Puberty Delay Stack',
    icon: '🦴',
    subtitle: 'Extend the growth window',
    steps: [
      { time: 'Daily', action: 'Beans/lentils', why: 'Phytoestrogen competition delays puberty' },
      { time: 'Always', action: 'A2 milk (not A1)', why: 'No BCM-7 inflammation' },
      { time: 'After lunch', action: 'Zero sugar', why: 'Insulin spikes → early puberty' },
      { time: 'Always', action: 'Zero artificial sweeteners', why: 'Gut microbiome → puberty timing' },
      { time: 'Evening', action: 'Protect melatonin via darkness', why: 'Melatonin inhibits aromatase' },
    ],
    note: 'Each month of delayed puberty = another month of growth plate activity.',
  },
  {
    id: 'height-preservation',
    name: 'Height Preservation',
    icon: '📏',
    subtitle: 'Ages 19-25: Spinal gains after plates close',
    steps: [
      { time: 'Sleep', action: '10+ hours on back, thin pillow', why: 'Disc rehydration overnight' },
      { time: 'Morning', action: '60-sec dead hang + spinal stretches', why: 'Decompression after sleep' },
      { time: 'Throughout day', action: 'Move every 45 min', why: 'Prevent disc compression' },
      { time: 'Always', action: 'Zero alcohol', why: 'Alcohol suppresses GH 75% + compresses discs' },
      { time: 'Daily', action: 'Inversion or cushion under back', why: 'Active decompression' },
    ],
    note: 'You can still gain 0.5-1" in your 20s through spinal hygiene alone.',
  },
];

export default function GrowthStacks() {
  const [activeStack, setActiveStack] = useState('sprint');
  const currentStack = stacks.find(s => s.id === activeStack)!;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
      {/* Tab Navigation */}
      <div className="flex overflow-x-auto border-b border-stone-200 bg-stone-50">
        {stacks.map((stack) => (
          <button
            key={stack.id}
            onClick={() => setActiveStack(stack.id)}
            className={`flex-shrink-0 px-4 py-3 text-sm font-medium transition-colors ${
              activeStack === stack.id
                ? 'bg-white text-emerald-700 border-b-2 border-emerald-600'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <span className="mr-1.5">{stack.icon}</span>
            {stack.name}
          </button>
        ))}
      </div>

      {/* Stack Content */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-stone-900 flex items-center gap-2">
            <span className="text-2xl">{currentStack.icon}</span>
            {currentStack.name}
          </h3>
          <p className="text-emerald-700 text-sm mt-1">{currentStack.subtitle}</p>
        </div>

        {/* Steps */}
        <div className="space-y-3">
          {currentStack.steps.map((step, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-3 bg-stone-50 rounded-lg"
            >
              <div className="flex-shrink-0 w-20 text-xs font-medium text-stone-500 pt-0.5">
                {step.time}
              </div>
              <div className="flex-1">
                <div className="font-medium text-stone-900">{step.action}</div>
                <div className="text-sm text-stone-600 mt-0.5">{step.why}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm text-amber-800">
            <span className="font-medium">Key insight:</span> {currentStack.note}
          </p>
        </div>
      </div>
    </div>
  );
}
