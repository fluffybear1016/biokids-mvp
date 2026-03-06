'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Nav from '@/components/Nav';
import HeightPotentialCalculator from '@/components/HeightPotentialCalculator';
import { createClient } from '@/lib/supabase';

type SectionId = 'child' | 'habits' | 'goal' | 'height';

function parseHeight(formatted: string): { ft: string; inches: string } {
  // Parse "5'6\"" → { ft: "5", inches: "6" }
  const match = formatted.match(/(\d+)'(\d+)"/);
  if (match) return { ft: match[1], inches: match[2] };
  return { ft: '', inches: '' };
}

export default function Settings() {
  const router = useRouter();
  const [openSection, setOpenSection] = useState<SectionId | null>('child');
  const [saved, setSaved] = useState<SectionId | null>(null);

  // Child Info
  const [name, setName] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthYear, setBirthYear] = useState('');

  // Habits
  const [sleepHours, setSleepHours] = useState('');
  const [bedtime, setBedtime] = useState('');
  const [dairy, setDairy] = useState('');
  const [exercise, setExercise] = useState('');
  const [screenTime, setScreenTime] = useState('');
  const [processedFoods, setProcessedFoods] = useState('');

  // Goal
  const [goal, setGoal] = useState<'concerned' | 'foundation' | 'elite' | ''>('');

  // Height Potential
  const [childGender, setChildGender] = useState<'boy' | 'girl' | ''>('');
  const [motherHeightFt, setMotherHeightFt] = useState('');
  const [motherHeightIn, setMotherHeightIn] = useState('');
  const [fatherHeightFt, setFatherHeightFt] = useState('');
  const [fatherHeightIn, setFatherHeightIn] = useState('');

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 26 }, (_, i) => currentYear - i);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Load from localStorage
  useEffect(() => {
    setName(localStorage.getItem('childName') || '');
    setBirthMonth(localStorage.getItem('childBirthMonth') || '');
    setBirthYear(localStorage.getItem('childBirthYear') || '');

    setSleepHours(localStorage.getItem('sleepHours') || '');
    setBedtime(localStorage.getItem('bedtime') || '');
    setDairy(localStorage.getItem('dairy') || '');
    setExercise(localStorage.getItem('exercise') || '');
    setScreenTime(localStorage.getItem('screenTime') || '');
    setProcessedFoods(localStorage.getItem('processedFoods') || '');

    try {
      const raw = localStorage.getItem('biokids_goal');
      if (raw) {
        const parsed = JSON.parse(raw);
        setGoal(parsed.goal || '');
      }
    } catch {}

    setChildGender((localStorage.getItem('childGender') || '') as 'boy' | 'girl' | '');
    const mh = parseHeight(localStorage.getItem('motherHeight') || '');
    setMotherHeightFt(mh.ft);
    setMotherHeightIn(mh.inches);
    const fh = parseHeight(localStorage.getItem('fatherHeight') || '');
    setFatherHeightFt(fh.ft);
    setFatherHeightIn(fh.inches);
  }, []);

  const showSaved = (section: SectionId) => {
    setSaved(section);
    setTimeout(() => setSaved(null), 2000);
  };

  const saveChildInfo = () => {
    localStorage.setItem('childName', name);
    localStorage.setItem('childBirthMonth', birthMonth);
    localStorage.setItem('childBirthYear', birthYear);

    // Sync to Supabase auth metadata
    const supabase = createClient();
    if (supabase) {
      supabase.auth.updateUser({ data: { child_name: name } }).catch(() => {});
    }

    showSaved('child');
  };

  const saveHabits = () => {
    localStorage.setItem('sleepHours', sleepHours);
    localStorage.setItem('bedtime', bedtime);
    localStorage.setItem('dairy', dairy);
    localStorage.setItem('exercise', exercise);
    localStorage.setItem('screenTime', screenTime);
    localStorage.setItem('processedFoods', processedFoods);
    showSaved('habits');
  };

  const saveGoal = () => {
    if (goal) {
      localStorage.setItem('biokids_goal', JSON.stringify({
        goal,
        date: new Date().toISOString(),
      }));
    }
    showSaved('goal');
  };

  const saveHeight = () => {
    if (childGender) localStorage.setItem('childGender', childGender);
    if (motherHeightFt && motherHeightIn) {
      localStorage.setItem('motherHeight', `${motherHeightFt}'${motherHeightIn}"`);
    }
    if (fatherHeightFt && fatherHeightIn) {
      localStorage.setItem('fatherHeight', `${fatherHeightFt}'${fatherHeightIn}"`);
    }
    // Calculate and save genetic target
    if (childGender && motherHeightFt && motherHeightIn && fatherHeightFt && fatherHeightIn) {
      const motherCm = ((parseInt(motherHeightFt) * 12) + parseInt(motherHeightIn)) * 2.54;
      const fatherCm = ((parseInt(fatherHeightFt) * 12) + parseInt(fatherHeightIn)) * 2.54;
      const target = childGender === 'boy'
        ? (fatherCm + (motherCm + 13)) / 2
        : ((fatherCm - 13) + motherCm) / 2;
      localStorage.setItem('geneticTarget', target.toString());
    }
    showSaved('height');
  };

  const toggle = (section: SectionId) => {
    setOpenSection(openSection === section ? null : section);
  };

  const chevron = (section: SectionId) => openSection === section ? '▼' : '▶';

  const goalOptions = [
    { value: 'concerned' as const, label: 'Concerned About Growth', desc: 'My child seems small or behind' },
    { value: 'foundation' as const, label: 'Healthy Foundation', desc: 'Build great habits' },
    { value: 'elite' as const, label: 'Maximum Potential', desc: 'D1 / Pro sports · Leave nothing on the table' },
  ];

  // Height potential helpers
  const toInches = (ft: string, inches: string) => (parseInt(ft) * 12) + parseInt(inches);
  const toCm = (totalInches: number) => totalInches * 2.54;

  const canCalcHeight = childGender && motherHeightFt && motherHeightIn && fatherHeightFt && fatherHeightIn;
  const geneticTargetCm = canCalcHeight ? (() => {
    const motherCm = toCm(toInches(motherHeightFt, motherHeightIn));
    const fatherCm = toCm(toInches(fatherHeightFt, fatherHeightIn));
    if (childGender === 'boy') return (fatherCm + (motherCm + 13)) / 2;
    return ((fatherCm - 13) + motherCm) / 2;
  })() : null;

  return (
    <div style={{ minHeight: '100vh', background: '#fafaf9', fontFamily: "'Courier New', Courier, monospace" }}>
      <Nav />
      <main style={{ maxWidth: '540px', margin: '0 auto', padding: '0 20px', paddingTop: '24px', paddingBottom: '40px' }}>
        <button
          onClick={() => router.back()}
          style={{ fontSize: '14px', color: '#a8a29e', marginBottom: '16px', display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          ← Back
        </button>
        <h1 style={{ fontFamily: "'Courier New', Courier, monospace", fontWeight: 800, fontSize: '24px', color: '#1c1917', marginBottom: '24px' }}>Edit Profile</h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

          {/* Child Info */}
          <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e7e5e4', overflow: 'hidden' }}>
            <button onClick={() => toggle('child')} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Courier New', Courier, monospace" }}>
              <span style={{ fontWeight: 600, color: '#1c1917' }}>Child Info</span>
              <span style={{ color: '#a8a29e', fontSize: '12px' }}>{chevron('child')}</span>
            </button>
            {openSection === 'child' && (
              <div style={{ padding: '0 18px 18px 18px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#57534e', marginBottom: '4px' }}>Name or Initial</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="E.g., Emma or E"
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e7e5e4', fontSize: '14px', fontFamily: "'Courier New', Courier, monospace", boxSizing: 'border-box' }}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#57534e', marginBottom: '4px' }}>Birth Month</label>
                    <select value={birthMonth} onChange={(e) => setBirthMonth(e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e7e5e4', fontSize: '14px', fontFamily: "'Courier New', Courier, monospace", boxSizing: 'border-box' }}>
                      <option value="">Month</option>
                      {months.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#57534e', marginBottom: '4px' }}>Birth Year</label>
                    <select value={birthYear} onChange={(e) => setBirthYear(e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e7e5e4', fontSize: '14px', fontFamily: "'Courier New', Courier, monospace", boxSizing: 'border-box' }}>
                      <option value="">Year</option>
                      {years.map((y) => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <button onClick={saveChildInfo} style={{ padding: '8px 20px', background: '#065f46', color: '#fff', fontSize: '14px', fontWeight: 500, borderRadius: '8px', border: 'none', cursor: 'pointer', fontFamily: "'Courier New', Courier, monospace" }}>
                    Save
                  </button>
                  {saved === 'child' && <span style={{ fontSize: '14px', color: '#065f46', fontWeight: 500 }}>Saved!</span>}
                </div>
              </div>
            )}
          </div>

          {/* Daily Habits */}
          <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e7e5e4', overflow: 'hidden' }}>
            <button onClick={() => toggle('habits')} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Courier New', Courier, monospace" }}>
              <span style={{ fontWeight: 600, color: '#1c1917' }}>Daily Habits</span>
              <span style={{ color: '#a8a29e', fontSize: '12px' }}>{chevron('habits')}</span>
            </button>
            {openSection === 'habits' && (
              <div style={{ padding: '0 18px 18px 18px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <ChoiceGroup label="Hours of sleep per night" options={['8 or less', '9-10', '11-12', '12+']} value={sleepHours} onChange={setSleepHours} cols={2} />
                <ChoiceGroup label="Usual bedtime" options={['Before 8pm', '8-9pm', 'After 9pm']} value={bedtime} onChange={setBedtime} cols={3} />
                <ChoiceGroup label="Daily dairy" options={['Yes', 'Sometimes', 'No']} value={dairy} onChange={setDairy} cols={3} />
                <ChoiceGroup label="Running / hard play" options={['Daily', 'Few times a week', 'Rarely']} value={exercise} onChange={setExercise} cols={3} />
                <ChoiceGroup label="Screen time before bed" options={['None', 'Some', 'A lot']} value={screenTime} onChange={setScreenTime} cols={3} />
                <ChoiceGroup label="Processed / packaged foods" options={['Rarely', 'Sometimes', 'Often']} value={processedFoods} onChange={setProcessedFoods} cols={3} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <button onClick={saveHabits} style={{ padding: '8px 20px', background: '#065f46', color: '#fff', fontSize: '14px', fontWeight: 500, borderRadius: '8px', border: 'none', cursor: 'pointer', fontFamily: "'Courier New', Courier, monospace" }}>
                    Save
                  </button>
                  {saved === 'habits' && <span style={{ fontSize: '14px', color: '#065f46', fontWeight: 500 }}>Saved!</span>}
                </div>
              </div>
            )}
          </div>

          {/* Growth Goal */}
          <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e7e5e4', overflow: 'hidden' }}>
            <button onClick={() => toggle('goal')} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Courier New', Courier, monospace" }}>
              <span style={{ fontWeight: 600, color: '#1c1917' }}>Growth Goal</span>
              <span style={{ color: '#a8a29e', fontSize: '12px' }}>{chevron('goal')}</span>
            </button>
            {openSection === 'goal' && (
              <div style={{ padding: '0 18px 18px 18px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {goalOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setGoal(opt.value)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '16px',
                      borderRadius: '8px',
                      border: goal === opt.value ? '1px solid #065f46' : '1px solid #e7e5e4',
                      textAlign: 'left',
                      background: goal === opt.value ? '#f0fdf4' : '#fff',
                      cursor: 'pointer',
                      fontFamily: "'Courier New', Courier, monospace",
                      transition: 'all 0.2s'
                    }}
                  >
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: 600, color: goal === opt.value ? '#065f46' : '#1c1917', margin: 0 }}>{opt.label}</p>
                      <p style={{ fontSize: '12px', color: '#a8a29e', margin: '4px 0 0 0' }}>{opt.desc}</p>
                    </div>
                  </button>
                ))}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '8px' }}>
                  <button onClick={saveGoal} style={{ padding: '8px 20px', background: '#065f46', color: '#fff', fontSize: '14px', fontWeight: 500, borderRadius: '8px', border: 'none', cursor: 'pointer', fontFamily: "'Courier New', Courier, monospace" }}>
                    Save
                  </button>
                  {saved === 'goal' && <span style={{ fontSize: '14px', color: '#065f46', fontWeight: 500 }}>Saved!</span>}
                </div>
              </div>
            )}
          </div>

          {/* Height Potential */}
          <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e7e5e4', overflow: 'hidden' }}>
            <button onClick={() => toggle('height')} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Courier New', Courier, monospace" }}>
              <span style={{ fontWeight: 600, color: '#1c1917' }}>Height Potential</span>
              <span style={{ color: '#a8a29e', fontSize: '12px' }}>{chevron('height')}</span>
            </button>
            {openSection === 'height' && (
              <div style={{ padding: '0 18px 18px 18px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#57534e', marginBottom: '8px' }}>Child&apos;s gender</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    {[{ value: 'boy' as const, label: 'Boy' }, { value: 'girl' as const, label: 'Girl' }].map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setChildGender(opt.value)}
                        style={{
                          padding: '12px 16px',
                          borderRadius: '8px',
                          border: childGender === opt.value ? '1px solid #065f46' : '1px solid #e7e5e4',
                          fontSize: '14px',
                          fontWeight: 500,
                          color: childGender === opt.value ? '#065f46' : '#57534e',
                          background: childGender === opt.value ? '#f0fdf4' : '#fff',
                          cursor: 'pointer',
                          fontFamily: "'Courier New', Courier, monospace",
                          transition: 'all 0.2s'
                        }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#57534e', marginBottom: '4px' }}>Mother&apos;s height</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <select value={motherHeightFt} onChange={(e) => setMotherHeightFt(e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e7e5e4', fontSize: '14px', fontFamily: "'Courier New', Courier, monospace", boxSizing: 'border-box' }}>
                      <option value="">Ft</option>
                      {[4, 5, 6].map((ft) => <option key={ft} value={ft}>{ft}&apos;</option>)}
                    </select>
                    <select value={motherHeightIn} onChange={(e) => setMotherHeightIn(e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e7e5e4', fontSize: '14px', fontFamily: "'Courier New', Courier, monospace", boxSizing: 'border-box' }}>
                      <option value="">In</option>
                      {Array.from({ length: 12 }, (_, i) => <option key={i} value={i}>{i}&quot;</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#57534e', marginBottom: '4px' }}>Father&apos;s height</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <select value={fatherHeightFt} onChange={(e) => setFatherHeightFt(e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e7e5e4', fontSize: '14px', fontFamily: "'Courier New', Courier, monospace", boxSizing: 'border-box' }}>
                      <option value="">Ft</option>
                      {[5, 6, 7].map((ft) => <option key={ft} value={ft}>{ft}&apos;</option>)}
                    </select>
                    <select value={fatherHeightIn} onChange={(e) => setFatherHeightIn(e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e7e5e4', fontSize: '14px', fontFamily: "'Courier New', Courier, monospace", boxSizing: 'border-box' }}>
                      <option value="">In</option>
                      {Array.from({ length: 12 }, (_, i) => <option key={i} value={i}>{i}&quot;</option>)}
                    </select>
                  </div>
                </div>
                {geneticTargetCm && (
                  <HeightPotentialCalculator
                    geneticTargetCm={geneticTargetCm}
                    motherHeight={`${motherHeightFt}'${motherHeightIn}"`}
                    fatherHeight={`${fatherHeightFt}'${fatherHeightIn}"`}
                  />
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <button onClick={saveHeight} style={{ padding: '8px 20px', background: '#065f46', color: '#fff', fontSize: '14px', fontWeight: 500, borderRadius: '8px', border: 'none', cursor: 'pointer', fontFamily: "'Courier New', Courier, monospace" }}>
                    Save
                  </button>
                  {saved === 'height' && <span style={{ fontSize: '14px', color: '#065f46', fontWeight: 500 }}>Saved!</span>}
                </div>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}

function ChoiceGroup({ label, options, value, onChange, cols }: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  cols: number;
}) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#57534e', marginBottom: '8px' }}>{label}</label>
      <div style={{ display: 'grid', gridTemplateColumns: cols === 2 ? '1fr 1fr' : 'repeat(auto-fit, minmax(0, 1fr))', gap: '8px' }}>
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            style={{
              padding: '12px 16px',
              borderRadius: '8px',
              border: value === opt ? '1px solid #065f46' : '1px solid #e7e5e4',
              fontSize: '14px',
              fontWeight: 500,
              color: value === opt ? '#065f46' : '#57534e',
              background: value === opt ? '#f0fdf4' : '#fff',
              cursor: 'pointer',
              fontFamily: "'Courier New', Courier, monospace",
              transition: 'all 0.2s'
            }}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
