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

type ProtocolItem = {
  name: string;
  citation: string;
  target: number;
  current: number;
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
    <div style={{ minHeight:"100vh", backgroundColor:"#fafaf9", fontFamily:"'Courier New', Courier, monospace" }}>
      <Nav currentChild={child} />

      {/* Daily Protocol - time-based signals */}
      {goal && (
        <div style={{ position:"sticky", top:73, zIndex:40, backgroundColor:"#fafaf9", transition:"box-shadow 0.2s ease", boxShadow: isStuck ? "0 4px 12px rgba(0,0,0,0.06)" : "none" }}>
          <div style={{ maxWidth:540, margin:"0 auto", padding:"16px 20px 8px" }}>
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

      <div style={{ maxWidth:540, margin:"0 auto", padding:"0 20px" }}>

        {/* Header */}
        <div style={{ paddingTop:48, marginBottom:44 }}>
          <h1 style={{ fontSize:22, fontWeight:800, color:"#1c1917", letterSpacing:"-0.02em", margin:0 }}>GH Optimization Protocol</h1>
          <p style={{ fontSize:14, color:"#57534e", lineHeight:1.75, marginTop:6, marginBottom:0 }}>{child.name}&apos;s personalized protocol for the Pre-Puberty Window</p>
        </div>

        {/* Growth Stacks */}
        <div style={{ background:"#fff", borderRadius:14, border:"1px solid #e7e5e4", padding:"14px 18px", marginBottom:44 }}>
          <div style={{ fontSize:15, fontWeight:700, color:"#1c1917", marginBottom:12 }}>Growth Stacks</div>
          <p style={{ fontSize:12, color:"#a8a29e", marginBottom:14, lineHeight:1.5 }}>Synergistic habit bundles. Activate a stack to commit to the full combo.</p>
          <GrowthStacks />
        </div>

        {/* High-Leverage Decisions */}
        <div style={{ background:"#fff", borderRadius:20, border:"2px solid #a7f3d0", padding:"18px 20px", marginBottom:44 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
            <span style={{ fontSize:15, fontWeight:700, color:"#1c1917" }}>High-Leverage Decisions</span>
            <span style={{ fontSize:11, color:"#a8a29e" }}>{decisionsCount} this week</span>
          </div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:10, marginBottom:14 }}>
            {[
              { key: 'early_bedtime', label: 'Early bedtime' },
              { key: 'power_breakfast', label: 'Power breakfast' },
              { key: 'active_play', label: 'Active play' },
              { key: 'screen_free', label: 'Screen-free evening' },
              { key: 'milk_protocol', label: 'Milk protocol' },
              { key: 'morning_sunlight', label: 'Morning sunlight' },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => toggleDecision(item.key)}
                style={{
                  display:"flex", alignItems:"center", gap:6,
                  padding:"8px 14px", borderRadius:20, fontSize:12, fontWeight:600,
                  fontFamily:"'Courier New', Courier, monospace",
                  border: decisions[item.key] ? "2px solid #a7f3d0" : "1px solid #e7e5e4",
                  background: decisions[item.key] ? "#f0fdf4" : "#fff",
                  color: decisions[item.key] ? "#059669" : "#57534e",
                  cursor:"pointer", transition:"all 0.2s ease",
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
          <p style={{ textAlign:"center", fontSize:11, color:"#a8a29e" }}>Tap to log today&apos;s wins. Small decisions compound.</p>
        </div>

        {/* Power Foods */}
        <div style={{ background:"#fff", borderRadius:14, border:"1px solid #e7e5e4", padding:"14px 18px", marginBottom:44 }}>
          <div style={{ fontSize:15, fontWeight:700, color:"#1c1917", marginBottom:16 }}>Power Foods</div>
          {powerFoods.map((item, index) => (
            <div key={item.name} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 0", borderTop: index > 0 ? "1px solid #f5f5f0" : "none" }}>
              <div style={{ flex:1, paddingRight:12 }}>
                <div style={{ fontSize:13, fontWeight:600, color:"#1c1917", lineHeight:1.4 }}>{item.name}</div>
                <div style={{ fontSize:9.5, color:"#059669", fontWeight:600, marginTop:2 }}>{item.citation}</div>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <span style={{ fontWeight:800, fontFamily:"Georgia, 'Times New Roman', serif", fontSize:13, color:"#059669", minWidth:36, textAlign:"right" }}>
                  {item.current}/{item.target}
                </span>
                <button
                  onClick={() => incrementItem(powerFoods, setPowerFoods, index)}
                  style={{
                    width:32, height:32, borderRadius:10, border:"1px solid #e7e5e4",
                    background:"#fff", color:"#059669", fontSize:16, fontWeight:700,
                    cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
                    transition:"background 0.2s ease",
                  }}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Lifestyle Optimizers */}
        <div style={{ background:"#fff", borderRadius:14, border:"1px solid #e7e5e4", padding:"14px 18px", marginBottom:44 }}>
          <div style={{ fontSize:15, fontWeight:700, color:"#1c1917", marginBottom:16 }}>Lifestyle Optimizers</div>
          {lifestyleOptimizers.map((item, index) => (
            <div key={item.name} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 0", borderTop: index > 0 ? "1px solid #f5f5f0" : "none" }}>
              <div style={{ flex:1, paddingRight:12 }}>
                <div style={{ fontSize:13, fontWeight:600, color:"#1c1917", lineHeight:1.4 }}>{item.name}</div>
                <div style={{ fontSize:9.5, color:"#059669", fontWeight:600, marginTop:2 }}>{item.citation}</div>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <span style={{ fontWeight:800, fontFamily:"Georgia, 'Times New Roman', serif", fontSize:13, color:"#059669", minWidth:36, textAlign:"right" }}>
                  {item.current}/{item.target}
                </span>
                <button
                  onClick={() => incrementItem(lifestyleOptimizers, setLifestyleOptimizers, index)}
                  style={{
                    width:32, height:32, borderRadius:10, border:"1px solid #e7e5e4",
                    background:"#fff", color:"#059669", fontSize:16, fontWeight:700,
                    cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
                    transition:"background 0.2s ease",
                  }}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Growth Strategy */}
        <div style={{ background:"#fff", borderRadius:20, border:"2px solid #a7f3d0", padding:"18px 20px", marginBottom:44 }}>
          <div style={{ fontSize:15, fontWeight:700, color:"#1c1917", marginBottom:4 }}>{child.name}&apos;s Growth Strategy</div>
          <p style={{ fontSize:12, color:"#a8a29e", marginBottom:18 }}>Big picture approach for the Pre-Puberty Window</p>

          {/* Strategy Box */}
          <div style={{ background:"#f0fdf4", borderRadius:12, padding:"12px 14px", marginBottom:18 }}>
            <div style={{ fontSize:8.5, fontWeight:700, color:"#059669", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:6 }}>The Strategy</div>
            <p style={{ fontSize:13, color:"#065f46", lineHeight:1.65, margin:0 }}>
              Maximize the pre-puberty growth window with targeted interventions for natural GH optimization.
              Focus on sleep timing, meal timing, high-intensity movement, and nutrient density.
            </p>
          </div>

          {/* Phases */}
          <div style={{ marginBottom:18 }}>
            <div style={{ fontSize:13, fontWeight:700, color:"#1c1917", marginBottom:12 }}>Key Phases</div>
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
              <div key={phase.title} style={{ borderLeft:"3px solid #059669", paddingLeft:14, paddingTop:6, paddingBottom:6, marginBottom:12 }}>
                <div style={{ fontSize:13, fontWeight:700, color:"#1c1917", marginBottom:4 }}>{phase.title}</div>
                <p style={{ fontSize:12, color:"#57534e", lineHeight:1.65, margin:"0 0 4px" }}>{phase.desc}</p>
                <span style={{ fontSize:9.5, color:"#059669", fontWeight:600 }}>{phase.citation}</span>
              </div>
            ))}
          </div>

          {/* Metrics */}
          <div>
            <div style={{ fontSize:13, fontWeight:700, color:"#1c1917", marginBottom:12 }}>Key Metrics to Track</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
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
                <div key={metric} style={{ display:"flex", alignItems:"center", gap:8, fontSize:12, color:"#57534e" }}>
                  <span style={{ color:"#059669", fontWeight:800 }}>•</span>
                  {metric}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div style={{ margin:"0 0 40px", textAlign:"center" }}>
          <p style={{ fontSize:10.5, color:"#a8a29e", lineHeight:1.7 }}>
            Consistency beats intensity. Small daily habits compound into massive results.
          </p>
        </div>

      </div>
    </div>
  );
}
