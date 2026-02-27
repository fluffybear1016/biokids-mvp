'use client';

import { useState } from 'react';
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

type ProtocolItem = {
  name: string;
  citation: string;
  target: number;
  current: number;
};

export default function Protocol() {
  const childName = useChildName();
  const child = { ...mockChild, name: childName };
  const [decisions, setDecisions] = useState<Record<string, boolean>>({
    early_bedtime: false,
    power_breakfast: false,
    active_play: false,
    screen_free: false,
    milk_protocol: false,
    morning_sunlight: false,
  });

  const [powerFoods, setPowerFoods] = useState<ProtocolItem[]>([
    { name: 'Raw milk or A2 organic pasture-raised (2-3 cups)', citation: '[Hoppe C. 2004]', target: 7, current: 0 },
    { name: 'Cod liver oil (1 tsp daily)', citation: '[Holick MF. 2007]', target: 7, current: 0 },
    { name: 'Eggs organic pasture-raised (2-3 daily)', citation: '[Iannotti LL. 2017]', target: 7, current: 0 },
    { name: 'Beef liver (1x/week)', citation: '[Prasad AS. 1998]', target: 1, current: 0 },
    { name: 'Cooked oysters (1-2x/week)', citation: '[Stanford Children\'s Health. 2024]', target: 2, current: 0 },
    { name: 'Wild-caught salmon (2x/week)', citation: '[Parletta N. 2013]', target: 2, current: 0 },
    { name: 'Bone broth', citation: '[Shoulders MD. 2009]', target: 5, current: 0 },
    { name: 'Fermented foods (kefir, sauerkraut)', citation: '[Marco ML. 2017]', target: 7, current: 0 },
    { name: 'Pumpkin seeds (daily snack)', citation: '[Prasad AS. 1991]', target: 7, current: 0 },
    { name: 'Bovine gelatin in smoothie/jello', citation: '[Clark KL. 2008]', target: 5, current: 0 },
  ]);

  const [lifestyleOptimizers, setLifestyleOptimizers] = useState<ProtocolItem[]>([
    { name: 'Sleep 10-12 hours minimum', citation: '[Mindell JA. 2010]', target: 7, current: 0 },
    { name: 'Sprint intervals 6x30 sec', citation: '[Stokes KA. 2002]', target: 3, current: 0 },
    { name: 'Hanging/stretching 20 min daily', citation: '[Nachemson AL. 1981]', target: 7, current: 0 },
    { name: 'Active play 60+ min', citation: '[Faigenbaum AD. 2009]', target: 7, current: 0 },
    { name: 'Bedtime milk 6oz, 30 min before', citation: '[Madziva MT. 2023]', target: 7, current: 0 },
    { name: 'Morning sunlight 10-30 min', citation: '[Roenneberg T. 2007]', target: 7, current: 0 },
    { name: 'No food 2-3 hours before bed', citation: '[Ho KY. 1988]', target: 7, current: 0 },
    { name: 'Screen-free 2hr before bed', citation: '[Gooley JJ. 2011]', target: 7, current: 0 },
  ]);

  const toggleDecision = (key: string) => {
    setDecisions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const incrementItem = (list: ProtocolItem[], setList: React.Dispatch<React.SetStateAction<ProtocolItem[]>>, index: number) => {
    setList(prev => prev.map((item, i) => 
      i === index && item.current < item.target 
        ? { ...item, current: item.current + 1 }
        : item
    ));
  };

  const decisionsCount = Object.values(decisions).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-cream">
      <Nav currentChild={child} />
      
      <main className="max-w-5xl mx-auto px-4 py-6 sm:py-12">
        
        {/* Header */}
        <header className="flex flex-wrap justify-between items-center gap-4 mb-10">
          <div>
            <h1 className="font-display text-2xl sm:text-4xl text-gray-900">GH Optimization Protocol</h1>
            <p className="text-gray-500 mt-1">{child.name}'s personalized protocol for the Pre-Puberty Window</p>
          </div>
          <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold">
            Week of Jan 27
          </span>
        </header>

        {/* Growth Stacks */}
        <section className="card mb-7">
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-5">
            <span className="text-xl">📦</span>
            Growth Stacks
          </h2>
          <p className="text-sm text-gray-500 mb-4">Synergistic habit bundles. Activate a stack to commit to the full combo.</p>
          <GrowthStacks />
        </section>

        {/* High-Leverage Decisions */}
        <section className="card mb-7">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <span className="text-xl">🔥</span>
              High-Leverage Decisions
            </h2>
            <span className="text-sm text-gray-500">{decisionsCount} this week</span>
          </div>
          <div className="flex flex-wrap gap-3 mb-4">
            {[
              { key: 'early_bedtime', icon: '🌙', label: 'Early bedtime' },
              { key: 'power_breakfast', icon: '🍳', label: 'Power breakfast' },
              { key: 'active_play', icon: '🏃', label: 'Active play' },
              { key: 'screen_free', icon: '📵', label: 'Screen-free evening' },
              { key: 'milk_protocol', icon: '🥛', label: 'Milk protocol' },
              { key: 'morning_sunlight', icon: '☀️', label: 'Morning sunlight' },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => toggleDecision(item.key)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium transition-all border-2 ${
                  decisions[item.key]
                    ? 'bg-green-100 border-green-500 text-green-800'
                    : 'bg-cream border-cream hover:border-forest'
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500">Tap to log today's wins. Small decisions compound.</p>
        </section>

        {/* Power Foods + Lifestyle Optimizers */}
        <div className="grid md:grid-cols-2 gap-6 mb-7">
          
          {/* Power Foods */}
          <section className="card">
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-6">
              <span className="text-xl">🍽️</span>
              Power Foods
            </h2>
            <div className="space-y-1">
              {powerFoods.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between py-3.5 border-b border-cream last:border-0">
                  <div className="flex-1 pr-4">
                    <div className="text-sm font-medium">{item.name}</div>
                    <div className="text-xs text-forest font-medium">{item.citation}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-400 min-w-[40px] text-right">
                      {item.current}/{item.target}
                    </span>
                    <button 
                      onClick={() => incrementItem(powerFoods, setPowerFoods, index)}
                      className="w-9 h-9 bg-cream hover:bg-green-100 rounded-xl flex items-center justify-center text-forest text-lg transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Lifestyle Optimizers */}
          <section className="card">
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-6">
              <span className="text-xl">⚡</span>
              Lifestyle Optimizers
            </h2>
            <div className="space-y-1">
              {lifestyleOptimizers.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between py-3.5 border-b border-cream last:border-0">
                  <div className="flex-1 pr-4">
                    <div className="text-sm font-medium">{item.name}</div>
                    <div className="text-xs text-forest font-medium">{item.citation}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-400 min-w-[40px] text-right">
                      {item.current}/{item.target}
                    </span>
                    <button 
                      onClick={() => incrementItem(lifestyleOptimizers, setLifestyleOptimizers, index)}
                      className="w-9 h-9 bg-cream hover:bg-green-100 rounded-xl flex items-center justify-center text-forest text-lg transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Growth Strategy */}
        <section className="card">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="font-display text-2xl">{child.name}'s Growth Strategy</h2>
              <p className="text-sm text-gray-500">Big picture approach for the Pre-Puberty Window</p>
            </div>
            <span className="text-2xl text-gray-400 cursor-pointer">−</span>
          </div>

          {/* Strategy Box */}
          <div className="bg-green-100 rounded-2xl p-6 mb-6">
            <div className="text-xs font-bold text-forest uppercase tracking-wider mb-2">The Strategy</div>
            <p className="text-gray-800">
              Maximize the pre-puberty growth window with targeted interventions for natural GH optimization. 
              Focus on sleep timing, meal timing, high-intensity movement, and nutrient density.
            </p>
          </div>

          {/* Phases */}
          <div className="mb-6">
            <h3 className="font-semibold mb-4">Key Phases</h3>
            <div className="space-y-4">
              {[
                { 
                  title: 'Height Optimization', 
                  desc: 'Milk flooding protocol (2.5-3 cups daily), sprint intervals 3x weekly, maximize sleep during GH peak hours (10pm-2am)',
                  citation: '[Madziva MT et al. Nutrients. 2023]'
                },
                { 
                  title: 'GH Preservation', 
                  desc: 'No food 2-3 hours before bed, maintain healthy body composition, consistent sleep/wake times to preserve circadian GH rhythm',
                  citation: '[Van Cauter E. Sleep. 2000]'
                },
                { 
                  title: 'Mechanical Loading', 
                  desc: 'Hanging, stretching, jumping, and impact activities to stimulate growth plate chondrocytes through mechanical signals',
                  citation: '[Gunter K. Bone. 2008]'
                },
              ].map((phase) => (
                <div key={phase.title} className="border-l-4 border-forest pl-5 py-2">
                  <div className="font-semibold mb-1">{phase.title}</div>
                  <p className="text-sm text-gray-600 mb-1">{phase.desc}</p>
                  <span className="text-xs text-forest font-medium">{phase.citation}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Metrics */}
          <div className="bg-cream rounded-2xl p-6">
            <h3 className="font-semibold mb-4">Key Metrics to Track</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                'Track height monthly',
                'Maintain 9-11 hours sleep',
                'Sprint sessions 3x/week',
                'Protein 1.2-1.5g/kg daily',
                'Active play 60+ min/day',
                'No late-night eating',
                'Morning sunlight daily',
                'Screen-free 2hr before bed',
              ].map((metric) => (
                <div key={metric} className="flex items-center gap-3 text-sm text-gray-600">
                  <span className="text-forest font-bold">•</span>
                  {metric}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer Note */}
        <div className="text-center py-8 text-sm text-gray-500 flex items-center justify-center gap-2">
          <span className="text-lg">💡</span>
          Consistency beats intensity. Small daily habits compound into massive results.
        </div>

      </main>
    </div>
  );
}
