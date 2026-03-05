'use client';

import { useState } from 'react';

const F = "'Courier New', Courier, monospace";
const C = {
  bg: '#fafaf9', title: '#1c1917', body: '#57534e', light: '#a8a29e',
  green: '#059669', card: '#fff', border: '#e7e5e4',
};

const stacks = [
  {
    id: 'sprint',
    name: 'Sprint Stack',
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
    <div style={{ background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, overflow: 'hidden' }}>
      {/* Tab Navigation */}
      <div style={{ display: 'flex', overflowX: 'auto', borderBottom: `1px solid ${C.border}`, background: C.bg }}>
        {stacks.map((stack) => (
          <button
            key={stack.id}
            onClick={() => setActiveStack(stack.id)}
            style={{
              flexShrink: 0, padding: '10px 14px', fontSize: 11, fontWeight: 600,
              fontFamily: F, cursor: 'pointer', transition: 'all 0.15s', border: 'none',
              borderBottom: activeStack === stack.id ? `2px solid ${C.green}` : '2px solid transparent',
              background: activeStack === stack.id ? C.card : 'transparent',
              color: activeStack === stack.id ? C.green : C.body,
            }}
          >
            {stack.name}
          </button>
        ))}
      </div>

      {/* Stack Content */}
      <div style={{ padding: 20 }}>
        <div style={{ marginBottom: 14 }}>
          <h3 style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: C.title, margin: '0 0 4px' }}>
            {currentStack.name}
          </h3>
          <p style={{ fontSize: 12, color: C.green, margin: 0, fontFamily: F }}>{currentStack.subtitle}</p>
        </div>

        {/* Steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {currentStack.steps.map((step, index) => (
            <div
              key={index}
              style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: 10, background: C.bg, borderRadius: 10 }}
            >
              <div style={{ flexShrink: 0, width: 80, fontSize: 10, fontWeight: 600, color: C.light, paddingTop: 2, fontFamily: F }}>
                {step.time}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.title, fontFamily: F }}>{step.action}</div>
                <div style={{ fontSize: 11, color: C.body, marginTop: 2, fontFamily: F }}>{step.why}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <div style={{ marginTop: 14, padding: 10, background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 10 }}>
          <p style={{ fontSize: 12, color: '#78350f', margin: 0, fontFamily: F, lineHeight: 1.5 }}>
            <span style={{ fontWeight: 700 }}>Key insight:</span> {currentStack.note}
          </p>
        </div>
      </div>
    </div>
  );
}
