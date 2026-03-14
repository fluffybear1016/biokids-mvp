'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Nav from '@/components/Nav';
import HeightPotentialCalculator from '@/components/HeightPotentialCalculator';
import { createClient } from '@/lib/supabase';
import {
  ChildProfile,
  createEmptyChild,
  getChildren,
  saveChildren,
  getActiveChildId,
  setActiveChildId,
  addChild,
  updateChild,
  removeChild,
} from '@/lib/children';

type SectionId = 'child' | 'habits' | 'goal' | 'height' | 'notifications';

const C = { green: '#065f46', bg: '#fafaf9', fill: '#f0fdf4' };
const mono = "'Courier New', Courier, monospace";

export default function Settings() {
  const router = useRouter();
  const [openSection, setOpenSection] = useState<SectionId | null>('child');
  const [saved, setSaved] = useState<SectionId | null>(null);

  // Multi-child state
  const [children, setChildrenState] = useState<ChildProfile[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [addingNew, setAddingNew] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  // Active child form fields
  const [name, setName] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [sleepHours, setSleepHours] = useState('');
  const [bedtime, setBedtime] = useState('');
  const [dairy, setDairy] = useState('');
  const [exercise, setExercise] = useState('');
  const [screenTime, setScreenTime] = useState('');
  const [processedFoods, setProcessedFoods] = useState('');
  const [goal, setGoal] = useState<'concerned' | 'foundation' | 'elite' | ''>('');
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

  // Load children on mount — auto-create a child profile if none exist
  useEffect(() => {
    let kids = getChildren();

    // If no children exist yet (fresh device / first visit), create one
    if (kids.length === 0) {
      const newChild = createEmptyChild();
      kids = addChild(newChild);
      setActiveChildId(newChild.id);
    }

    setChildrenState(kids);
    const aid = getActiveChildId();
    if (aid && kids.find(c => c.id === aid)) {
      setActiveId(aid);
      loadChildIntoForm(kids.find(c => c.id === aid)!);
    } else if (kids.length > 0) {
      setActiveId(kids[0].id);
      setActiveChildId(kids[0].id);
      loadChildIntoForm(kids[0]);
    }
  }, []);

  const loadChildIntoForm = (child: ChildProfile) => {
    setName(child.name);
    setBirthMonth(child.birthMonth);
    setBirthYear(child.birthYear);
    setSleepHours(child.sleepHours);
    setBedtime(child.bedtime);
    setDairy(child.dairy);
    setExercise(child.exercise);
    setScreenTime(child.screenTime);
    setProcessedFoods(child.processedFoods);
    setGoal(child.goal);
    setChildGender(child.gender);
    setMotherHeightFt(child.motherHeightFt);
    setMotherHeightIn(child.motherHeightIn);
    setFatherHeightFt(child.fatherHeightFt);
    setFatherHeightIn(child.fatherHeightIn);
  };

  const collectFormData = (): Partial<ChildProfile> => ({
    name,
    birthMonth,
    birthYear,
    gender: childGender,
    sleepHours,
    bedtime,
    dairy,
    exercise,
    screenTime,
    processedFoods,
    goal,
    motherHeightFt,
    motherHeightIn,
    fatherHeightFt,
    fatherHeightIn,
  });

  const switchChild = (id: string) => {
    setActiveId(id);
    setActiveChildId(id);
    const child = children.find(c => c.id === id);
    if (child) loadChildIntoForm(child);
    setAddingNew(false);
    setConfirmDelete(null);
  };

  const handleAddChild = () => {
    const newChild = createEmptyChild();
    const updated = addChild(newChild);
    setChildrenState(updated);
    switchChild(newChild.id);
    setAddingNew(true);
    setOpenSection('child');
  };

  const handleDeleteChild = (id: string) => {
    if (children.length <= 1) return; // Must keep at least one
    const updated = removeChild(id);
    setChildrenState(updated);
    if (updated.length > 0) {
      switchChild(updated[0].id);
    }
    setConfirmDelete(null);
  };

  // Notification frequency state
  const [notifyFreq, setNotifyFreq] = useState<number>(1);
  const [notifyLoading, setNotifyLoading] = useState(true);
  const [pushEndpoint, setPushEndpoint] = useState<string | null>(null);

  // Load notification preference on mount
  useEffect(() => {
    async function loadNotifPref() {
      try {
        if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
          setNotifyLoading(false);
          return;
        }
        const reg = await navigator.serviceWorker.ready;
        const sub = await reg.pushManager.getSubscription();
        if (sub) {
          setPushEndpoint(sub.endpoint);
          const res = await fetch(`/api/notification-preferences?endpoint=${encodeURIComponent(sub.endpoint)}`);
          const data = await res.json();
          setNotifyFreq(data.notify_every_hours ?? 1);
        }
      } catch (e) {
        console.error('Failed to load notification preference:', e);
      }
      setNotifyLoading(false);
    }
    loadNotifPref();
  }, []);

  const saveNotifyFreq = async (freq: number) => {
    setNotifyFreq(freq);
    if (!pushEndpoint) return;
    try {
      await fetch('/api/notification-preferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ endpoint: pushEndpoint, notify_every_hours: freq }),
      });
      showSaved('notifications');
    } catch (e) {
      console.error('Failed to save notification preference:', e);
    }
  };

  const sectionOrder: SectionId[] = ['child', 'habits', 'goal', 'height', 'notifications'];

  const showSaved = (section: SectionId) => {
    setSaved(section);
    // Auto-advance to next section after a brief confirmation flash
    const idx = sectionOrder.indexOf(section);
    const next = idx < sectionOrder.length - 1 ? sectionOrder[idx + 1] : null;
    setTimeout(() => {
      setSaved(null);
      if (next) {
        setOpenSection(next);
        // Scroll the next section into view
        setTimeout(() => {
          document.getElementById(`section-${next}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }, 800);
  };

  const saveChildInfo = () => {
    const child = children.find(c => c.id === activeId);
    if (!child) return;

    const updated: ChildProfile = { ...child, name, birthMonth, birthYear };
    const newChildren = updateChild(updated);
    setChildrenState(newChildren);
    setAddingNew(false);

    // Sync to Supabase auth metadata
    const supabase = createClient();
    if (supabase) {
      supabase.auth.updateUser({ data: { child_name: name } }).catch(() => {});
    }

    showSaved('child');
  };

  const saveHabits = () => {
    const child = children.find(c => c.id === activeId);
    if (!child) return;

    const updated: ChildProfile = { ...child, sleepHours, bedtime, dairy, exercise, screenTime, processedFoods };
    const newChildren = updateChild(updated);
    setChildrenState(newChildren);
    showSaved('habits');
  };

  const saveGoal = () => {
    const child = children.find(c => c.id === activeId);
    if (!child || !goal) return;

    const updated: ChildProfile = { ...child, goal };
    const newChildren = updateChild(updated);
    setChildrenState(newChildren);
    showSaved('goal');
  };

  const saveHeight = () => {
    const child = children.find(c => c.id === activeId);
    if (!child) return;

    let geneticTarget = '';
    if (childGender && motherHeightFt && motherHeightIn && fatherHeightFt && fatherHeightIn) {
      const motherCm = ((parseInt(motherHeightFt) * 12) + parseInt(motherHeightIn)) * 2.54;
      const fatherCm = ((parseInt(fatherHeightFt) * 12) + parseInt(fatherHeightIn)) * 2.54;
      const target = childGender === 'boy'
        ? (fatherCm + (motherCm + 13)) / 2
        : ((fatherCm - 13) + motherCm) / 2;
      geneticTarget = target.toString();
    }

    const updated: ChildProfile = {
      ...child,
      gender: childGender,
      motherHeightFt,
      motherHeightIn,
      fatherHeightFt,
      fatherHeightIn,
      geneticTarget,
    };
    const newChildren = updateChild(updated);
    setChildrenState(newChildren);
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
    <div style={{ minHeight: '100vh', background: C.bg, fontFamily: mono }}>
      <Nav />
      <main style={{ maxWidth: '540px', margin: '0 auto', padding: '0 20px', paddingTop: '24px', paddingBottom: '40px' }}>
        <button
          onClick={() => router.back()}
          style={{ fontSize: '14px', color: '#a8a29e', marginBottom: '16px', display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          ← Back
        </button>
        <h1 style={{ fontFamily: mono, fontWeight: 800, fontSize: '24px', color: '#1c1917', marginBottom: '8px' }}>Edit Profile</h1>
        <div style={{ width: 32, height: 3, background: C.green, borderRadius: 2, marginBottom: 24 }} />

        {/* ═══ Child Selector Tabs ═══ */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
          {children.map((child) => (
            <button
              key={child.id}
              onClick={() => switchChild(child.id)}
              style={{
                fontFamily: mono,
                fontSize: 13,
                fontWeight: child.id === activeId ? 700 : 500,
                padding: '8px 16px',
                borderRadius: 20,
                border: child.id === activeId ? `1.5px solid ${C.green}` : '1px solid #d6d3d1',
                background: child.id === activeId ? C.fill : '#fff',
                color: child.id === activeId ? C.green : '#78716c',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {child.name || 'New child'}
            </button>
          ))}
          <button
            onClick={handleAddChild}
            style={{
              fontFamily: mono,
              fontSize: 13,
              fontWeight: 600,
              padding: '8px 14px',
              borderRadius: 20,
              border: `1px dashed ${C.green}`,
              background: 'transparent',
              color: C.green,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            + Add Child
          </button>
        </div>

        {/* Delete child option (if more than 1) */}
        {children.length > 1 && (
          <div style={{ marginBottom: 16 }}>
            {confirmDelete === activeId ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#dc2626' }}>
                <span>Remove {name || 'this child'}?</span>
                <button
                  onClick={() => handleDeleteChild(activeId)}
                  style={{ fontFamily: mono, fontSize: 12, fontWeight: 600, padding: '4px 12px', borderRadius: 6, border: '1px solid #dc2626', background: '#fef2f2', color: '#dc2626', cursor: 'pointer' }}
                >
                  Yes, remove
                </button>
                <button
                  onClick={() => setConfirmDelete(null)}
                  style={{ fontFamily: mono, fontSize: 12, padding: '4px 12px', borderRadius: 6, border: '1px solid #d6d3d1', background: '#fff', color: '#78716c', cursor: 'pointer' }}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setConfirmDelete(activeId)}
                style={{ fontFamily: mono, fontSize: 11, color: '#a8a29e', background: 'none', border: 'none', cursor: 'pointer', padding: 0, textDecoration: 'underline' }}
              >
                Remove this child
              </button>
            )}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

          {/* Child Info */}
          <div id="section-child" style={{ background: openSection === 'child' ? C.fill : '#fff', borderRadius: '14px', border: openSection === 'child' ? `1px solid ${C.green}` : '1px solid #e7e5e4', overflow: 'hidden', transition: 'all 0.2s' }}>
            <button onClick={() => toggle('child')} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', fontFamily: mono }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: C.green, flexShrink: 0 }} /><span style={{ fontWeight: 600, color: '#1c1917' }}>Child Info</span></span>
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
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e7e5e4', fontSize: '14px', fontFamily: mono, boxSizing: 'border-box' }}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#57534e', marginBottom: '4px' }}>Birth Month</label>
                    <select value={birthMonth} onChange={(e) => setBirthMonth(e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e7e5e4', fontSize: '14px', fontFamily: mono, boxSizing: 'border-box' }}>
                      <option value="">Month</option>
                      {months.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#57534e', marginBottom: '4px' }}>Birth Year</label>
                    <select value={birthYear} onChange={(e) => setBirthYear(e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e7e5e4', fontSize: '14px', fontFamily: mono, boxSizing: 'border-box' }}>
                      <option value="">Year</option>
                      {years.map((y) => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                </div>
                <button onClick={saveChildInfo} style={{ width: '100%', padding: '12px 20px', background: saved === 'child' ? '#059669' : C.green, color: '#fff', fontSize: '15px', fontWeight: 700, borderRadius: '10px', border: 'none', cursor: 'pointer', fontFamily: mono, transition: 'all 0.3s ease', transform: saved === 'child' ? 'scale(1.02)' : 'scale(1)' }}>
                  {saved === 'child' ? '\u2713  Saved! Moving on...' : 'Save & Continue'}
                </button>
              </div>
            )}
          </div>

          {/* Daily Habits */}
          <div id="section-habits" style={{ background: openSection === 'habits' ? C.fill : '#fff', borderRadius: '14px', border: openSection === 'habits' ? `1px solid ${C.green}` : '1px solid #e7e5e4', overflow: 'hidden', transition: 'all 0.2s' }}>
            <button onClick={() => toggle('habits')} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', fontFamily: mono }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: C.green, flexShrink: 0 }} /><span style={{ fontWeight: 600, color: '#1c1917' }}>Daily Habits</span></span>
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
                <button onClick={saveHabits} style={{ width: '100%', padding: '12px 20px', background: saved === 'habits' ? '#059669' : C.green, color: '#fff', fontSize: '15px', fontWeight: 700, borderRadius: '10px', border: 'none', cursor: 'pointer', fontFamily: mono, transition: 'all 0.3s ease', transform: saved === 'habits' ? 'scale(1.02)' : 'scale(1)' }}>
                  {saved === 'habits' ? '\u2713  Saved! Moving on...' : 'Save & Continue'}
                </button>
              </div>
            )}
          </div>

          {/* Growth Goal */}
          <div id="section-goal" style={{ background: openSection === 'goal' ? C.fill : '#fff', borderRadius: '14px', border: openSection === 'goal' ? `1px solid ${C.green}` : '1px solid #e7e5e4', overflow: 'hidden', transition: 'all 0.2s' }}>
            <button onClick={() => toggle('goal')} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', fontFamily: mono }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: C.green, flexShrink: 0 }} /><span style={{ fontWeight: 600, color: '#1c1917' }}>Growth Goal</span></span>
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
                      border: goal === opt.value ? `1px solid ${C.green}` : '1px solid #e7e5e4',
                      textAlign: 'left',
                      background: goal === opt.value ? C.fill : '#fff',
                      cursor: 'pointer',
                      fontFamily: mono,
                      transition: 'all 0.2s'
                    }}
                  >
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: 600, color: goal === opt.value ? C.green : '#1c1917', margin: 0 }}>{opt.label}</p>
                      <p style={{ fontSize: '12px', color: '#a8a29e', margin: '4px 0 0 0' }}>{opt.desc}</p>
                    </div>
                  </button>
                ))}
                <div style={{ paddingTop: '8px' }}>
                <button onClick={saveGoal} style={{ width: '100%', padding: '12px 20px', background: saved === 'goal' ? '#059669' : C.green, color: '#fff', fontSize: '15px', fontWeight: 700, borderRadius: '10px', border: 'none', cursor: 'pointer', fontFamily: mono, transition: 'all 0.3s ease', transform: saved === 'goal' ? 'scale(1.02)' : 'scale(1)' }}>
                  {saved === 'goal' ? '\u2713  Saved! Moving on...' : 'Save & Continue'}
                </button>
                </div>
              </div>
            )}
          </div>

          {/* Height Potential */}
          <div id="section-height" style={{ background: openSection === 'height' ? C.fill : '#fff', borderRadius: '14px', border: openSection === 'height' ? `1px solid ${C.green}` : '1px solid #e7e5e4', overflow: 'hidden', transition: 'all 0.2s' }}>
            <button onClick={() => toggle('height')} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', fontFamily: mono }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: C.green, flexShrink: 0 }} /><span style={{ fontWeight: 600, color: '#1c1917' }}>Height Potential</span></span>
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
                          border: childGender === opt.value ? `1px solid ${C.green}` : '1px solid #e7e5e4',
                          fontSize: '14px',
                          fontWeight: 500,
                          color: childGender === opt.value ? C.green : '#57534e',
                          background: childGender === opt.value ? C.fill : '#fff',
                          cursor: 'pointer',
                          fontFamily: mono,
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
                    <select value={motherHeightFt} onChange={(e) => setMotherHeightFt(e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e7e5e4', fontSize: '14px', fontFamily: mono, boxSizing: 'border-box' }}>
                      <option value="">Ft</option>
                      {[4, 5, 6].map((ft) => <option key={ft} value={ft}>{ft}&apos;</option>)}
                    </select>
                    <select value={motherHeightIn} onChange={(e) => setMotherHeightIn(e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e7e5e4', fontSize: '14px', fontFamily: mono, boxSizing: 'border-box' }}>
                      <option value="">In</option>
                      {Array.from({ length: 12 }, (_, i) => <option key={i} value={i}>{i}&quot;</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#57534e', marginBottom: '4px' }}>Father&apos;s height</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <select value={fatherHeightFt} onChange={(e) => setFatherHeightFt(e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e7e5e4', fontSize: '14px', fontFamily: mono, boxSizing: 'border-box' }}>
                      <option value="">Ft</option>
                      {[5, 6, 7].map((ft) => <option key={ft} value={ft}>{ft}&apos;</option>)}
                    </select>
                    <select value={fatherHeightIn} onChange={(e) => setFatherHeightIn(e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e7e5e4', fontSize: '14px', fontFamily: mono, boxSizing: 'border-box' }}>
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
                <button onClick={saveHeight} style={{ width: '100%', padding: '12px 20px', background: saved === 'height' ? '#059669' : C.green, color: '#fff', fontSize: '15px', fontWeight: 700, borderRadius: '10px', border: 'none', cursor: 'pointer', fontFamily: mono, transition: 'all 0.3s ease', transform: saved === 'height' ? 'scale(1.02)' : 'scale(1)' }}>
                  {saved === 'height' ? '\u2713  All saved!' : 'Save'}
                </button>
              </div>
            )}
          </div>

          {/* Notifications */}
          <div id="section-notifications" style={{ background: openSection === 'notifications' ? C.fill : '#fff', borderRadius: '14px', border: openSection === 'notifications' ? `1px solid ${C.green}` : '1px solid #e7e5e4', overflow: 'hidden', transition: 'all 0.2s' }}>
            <button onClick={() => toggle('notifications')} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', fontFamily: mono }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: C.green, flexShrink: 0 }} /><span style={{ fontWeight: 600, color: '#1c1917' }}>Notifications</span></span>
              <span style={{ color: '#a8a29e', fontSize: '12px' }}>{chevron('notifications')}</span>
            </button>
            {openSection === 'notifications' && (
              <div style={{ padding: '0 18px 18px 18px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {notifyLoading ? (
                  <p style={{ fontSize: 13, color: '#a8a29e' }}>Loading...</p>
                ) : !pushEndpoint ? (
                  <p style={{ fontSize: 13, color: '#a8a29e' }}>Enable notifications from the banner on your home screen to adjust frequency.</p>
                ) : (
                  <>
                    <p style={{ fontSize: 13, color: '#57534e', margin: 0 }}>How often should we remind you about the protocol?</p>
                    {[
                      { value: 1, label: 'Every hour', desc: 'Maximum reminders' },
                      { value: 2, label: 'Every 2 hours', desc: '~8 per day' },
                      { value: 4, label: 'Every 4 hours', desc: '~4 per day' },
                      { value: 0, label: 'Off', desc: 'No notifications' },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => saveNotifyFreq(opt.value)}
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '14px 16px',
                          borderRadius: '8px',
                          border: notifyFreq === opt.value ? `1px solid ${C.green}` : '1px solid #e7e5e4',
                          textAlign: 'left',
                          background: notifyFreq === opt.value ? C.fill : '#fff',
                          cursor: 'pointer',
                          fontFamily: mono,
                          transition: 'all 0.2s'
                        }}
                      >
                        <div>
                          <p style={{ fontSize: '14px', fontWeight: 600, color: notifyFreq === opt.value ? C.green : '#1c1917', margin: 0 }}>{opt.label}</p>
                          <p style={{ fontSize: '12px', color: '#a8a29e', margin: '2px 0 0 0' }}>{opt.desc}</p>
                        </div>
                      </button>
                    ))}
                    {saved === 'notifications' && (
                      <p style={{ fontSize: 13, color: C.green, fontWeight: 600, margin: 0, textAlign: 'center' }}>&#10003; Saved!</p>
                    )}
                  </>
                )}
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
