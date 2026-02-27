'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Nav from '@/components/Nav';
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
    { value: 'concerned' as const, icon: '💙', label: 'Concerned About Growth', desc: 'My child seems small or behind' },
    { value: 'foundation' as const, icon: '🌿', label: 'Healthy Foundation', desc: 'Build great habits' },
    { value: 'elite' as const, icon: '🏆', label: 'Maximum Potential', desc: 'D1 / Pro sports · Leave nothing on the table' },
  ];

  // Height potential helpers
  const [showScience, setShowScience] = useState(false);
  const toInches = (ft: string, inches: string) => (parseInt(ft) * 12) + parseInt(inches);
  const toCm = (totalInches: number) => totalInches * 2.54;
  const cmToFtIn = (cm: number) => {
    const totalIn = Math.round(cm / 2.54);
    return `${Math.floor(totalIn / 12)}'${totalIn % 12}"`;
  };
  const formatParentHeight = (ft: string, inches: string) => `${ft}'${inches}"`;

  const canCalcHeight = childGender && motherHeightFt && motherHeightIn && fatherHeightFt && fatherHeightIn;
  const geneticTargetCm = canCalcHeight ? (() => {
    const motherCm = toCm(toInches(motherHeightFt, motherHeightIn));
    const fatherCm = toCm(toInches(fatherHeightFt, fatherHeightIn));
    if (childGender === 'boy') return (fatherCm + (motherCm + 13)) / 2;
    return ((fatherCm - 13) + motherCm) / 2;
  })() : null;

  return (
    <div className="min-h-screen bg-cream">
      <Nav />
      <main className="max-w-lg mx-auto px-4 py-6 sm:py-10">
        <button
          onClick={() => router.back()}
          className="text-sm text-stone-500 hover:text-forest mb-4 inline-flex items-center gap-1"
        >
          ← Back
        </button>
        <h1 className="font-display text-2xl sm:text-3xl text-forest mb-6">Edit Profile</h1>

        <div className="space-y-3">

          {/* Child Info */}
          <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
            <button onClick={() => toggle('child')} className="w-full flex items-center justify-between px-5 py-4 text-left">
              <span className="font-semibold text-stone-900">Child Info</span>
              <span className="text-stone-400 text-xs">{chevron('child')}</span>
            </button>
            {openSection === 'child' && (
              <div className="px-5 pb-5 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Name or Initial</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="E.g., Emma or E"
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">Birth Month</label>
                    <select value={birthMonth} onChange={(e) => setBirthMonth(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                      <option value="">Month</option>
                      {months.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">Birth Year</label>
                    <select value={birthYear} onChange={(e) => setBirthYear(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                      <option value="">Year</option>
                      {years.map((y) => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={saveChildInfo} className="px-5 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors">
                    Save
                  </button>
                  {saved === 'child' && <span className="text-sm text-emerald-600 font-medium">Saved!</span>}
                </div>
              </div>
            )}
          </div>

          {/* Daily Habits */}
          <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
            <button onClick={() => toggle('habits')} className="w-full flex items-center justify-between px-5 py-4 text-left">
              <span className="font-semibold text-stone-900">Daily Habits</span>
              <span className="text-stone-400 text-xs">{chevron('habits')}</span>
            </button>
            {openSection === 'habits' && (
              <div className="px-5 pb-5 space-y-5">
                <ChoiceGroup label="Hours of sleep per night" options={['8 or less', '9-10', '11-12', '12+']} value={sleepHours} onChange={setSleepHours} cols={2} />
                <ChoiceGroup label="Usual bedtime" options={['Before 8pm', '8-9pm', 'After 9pm']} value={bedtime} onChange={setBedtime} cols={3} />
                <ChoiceGroup label="Daily dairy" options={['Yes', 'Sometimes', 'No']} value={dairy} onChange={setDairy} cols={3} />
                <ChoiceGroup label="Running / hard play" options={['Daily', 'Few times a week', 'Rarely']} value={exercise} onChange={setExercise} cols={3} />
                <ChoiceGroup label="Screen time before bed" options={['None', 'Some', 'A lot']} value={screenTime} onChange={setScreenTime} cols={3} />
                <ChoiceGroup label="Processed / packaged foods" options={['Rarely', 'Sometimes', 'Often']} value={processedFoods} onChange={setProcessedFoods} cols={3} />
                <div className="flex items-center gap-3">
                  <button onClick={saveHabits} className="px-5 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors">
                    Save
                  </button>
                  {saved === 'habits' && <span className="text-sm text-emerald-600 font-medium">Saved!</span>}
                </div>
              </div>
            )}
          </div>

          {/* Growth Goal */}
          <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
            <button onClick={() => toggle('goal')} className="w-full flex items-center justify-between px-5 py-4 text-left">
              <span className="font-semibold text-stone-900">Growth Goal</span>
              <span className="text-stone-400 text-xs">{chevron('goal')}</span>
            </button>
            {openSection === 'goal' && (
              <div className="px-5 pb-5 space-y-3">
                {goalOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setGoal(opt.value)}
                    className={`w-full flex items-center gap-3 p-4 rounded-lg border text-left transition-colors ${
                      goal === opt.value
                        ? 'bg-emerald-50 border-emerald-600'
                        : 'border-stone-300 hover:bg-stone-50'
                    }`}
                  >
                    <span className="text-xl">{opt.icon}</span>
                    <div>
                      <p className={`text-sm font-semibold ${goal === opt.value ? 'text-emerald-700' : 'text-stone-900'}`}>{opt.label}</p>
                      <p className="text-xs text-stone-500">{opt.desc}</p>
                    </div>
                  </button>
                ))}
                <div className="flex items-center gap-3 pt-2">
                  <button onClick={saveGoal} className="px-5 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors">
                    Save
                  </button>
                  {saved === 'goal' && <span className="text-sm text-emerald-600 font-medium">Saved!</span>}
                </div>
              </div>
            )}
          </div>

          {/* Height Potential */}
          <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
            <button onClick={() => toggle('height')} className="w-full flex items-center justify-between px-5 py-4 text-left">
              <span className="font-semibold text-stone-900">Height Potential</span>
              <span className="text-stone-400 text-xs">{chevron('height')}</span>
            </button>
            {openSection === 'height' && (
              <div className="px-5 pb-5 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Child&apos;s gender</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[{ value: 'boy' as const, label: 'Boy' }, { value: 'girl' as const, label: 'Girl' }].map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setChildGender(opt.value)}
                        className={`py-3 px-4 rounded-lg border text-sm font-medium transition-colors ${
                          childGender === opt.value
                            ? 'bg-emerald-50 border-emerald-600 text-emerald-700'
                            : 'border-stone-300 text-stone-700 hover:bg-stone-50'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Mother&apos;s height</label>
                  <div className="grid grid-cols-2 gap-2">
                    <select value={motherHeightFt} onChange={(e) => setMotherHeightFt(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                      <option value="">Ft</option>
                      {[4, 5, 6].map((ft) => <option key={ft} value={ft}>{ft}&apos;</option>)}
                    </select>
                    <select value={motherHeightIn} onChange={(e) => setMotherHeightIn(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                      <option value="">In</option>
                      {Array.from({ length: 12 }, (_, i) => <option key={i} value={i}>{i}&quot;</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Father&apos;s height</label>
                  <div className="grid grid-cols-2 gap-2">
                    <select value={fatherHeightFt} onChange={(e) => setFatherHeightFt(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                      <option value="">Ft</option>
                      {[5, 6, 7].map((ft) => <option key={ft} value={ft}>{ft}&apos;</option>)}
                    </select>
                    <select value={fatherHeightIn} onChange={(e) => setFatherHeightIn(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                      <option value="">In</option>
                      {Array.from({ length: 12 }, (_, i) => <option key={i} value={i}>{i}&quot;</option>)}
                    </select>
                  </div>
                </div>
                {geneticTargetCm && (
                  <div className="mt-4">
                    {/* Vertical Bar Chart */}
                    <div className="relative flex items-end gap-4 mb-6 h-[340px] sm:h-[280px]">
                      {/* Labels column */}
                      <div className="flex flex-col justify-end h-full w-20 text-right pr-2 text-xs text-stone-500 relative">
                        <div className="absolute" style={{ bottom: '0%' }}>
                          {cmToFtIn(geneticTargetCm)}
                        </div>
                        <div className="absolute" style={{ bottom: '15%' }}>
                          {cmToFtIn(geneticTargetCm + 2 * 2.54)}
                        </div>
                        <div className="absolute" style={{ bottom: '75%' }}>
                          {cmToFtIn(geneticTargetCm + 8 * 2.54)}
                        </div>
                      </div>

                      {/* Bar */}
                      <div className="flex-1 h-full flex flex-col rounded-xl overflow-hidden border border-stone-200">
                        {/* bioKids zone (top - dominant) */}
                        <div className="bg-gradient-to-t from-emerald-500 to-emerald-300 flex items-center justify-center" style={{ height: '65%' }}>
                          <div className="text-center px-2">
                            <p className="text-sm font-bold text-emerald-950">bioKids zone</p>
                            <p className="text-xs text-emerald-800 mt-1">+2&quot; to +8&quot; above target</p>
                            <p className="text-[10px] text-emerald-700 mt-0.5">Maximum Potential</p>
                          </div>
                        </div>
                        {/* Standard Range zone (narrow) */}
                        <div className="bg-stone-200 flex items-center justify-center" style={{ height: '15%' }}>
                          <div className="text-center px-2">
                            <p className="text-[10px] font-semibold text-stone-600">Standard Range &middot; +2&quot; above target</p>
                          </div>
                        </div>
                        {/* Genetic Target zone (bottom) */}
                        <div className="bg-stone-100 flex items-center justify-center border-t-2 border-stone-400" style={{ height: '20%' }}>
                          <div className="text-center px-2">
                            <p className="text-xs font-semibold text-stone-600">Genetic Target</p>
                            <p className="text-sm font-bold text-stone-900">{cmToFtIn(geneticTargetCm)}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Percentile Table */}
                    <div className="mb-6">
                      <p className="text-sm font-semibold text-stone-800 mb-2">Height Potential Breakdown</p>
                      <div className="border border-stone-200 rounded-lg overflow-hidden text-xs">
                        <table className="w-full">
                          <thead>
                            <tr className="bg-stone-100 text-stone-600">
                              <th className="py-2 px-3 text-left font-medium">vs target</th>
                              <th className="py-2 px-3 text-left font-medium">Height</th>
                              <th className="py-2 px-3 text-left font-medium">Percentile</th>
                              <th className="py-2 px-3 text-right font-medium"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { offset: 2, pct: '~84th', bio: false },
                              { offset: 3, pct: '~93rd', bio: true },
                              { offset: 4, pct: '~97.5th', bio: true },
                              { offset: 5, pct: '~99.4th', bio: true },
                              { offset: 6, pct: '~99.9th', bio: true },
                              { offset: 7, pct: '~99.95th', bio: true },
                              { offset: 8, pct: '~99.997th', bio: true },
                            ].map((row) => (
                              <tr key={row.offset} className={row.bio ? 'bg-emerald-50' : 'bg-white'}>
                                <td className="py-1.5 px-3 text-stone-700">+{row.offset}&quot;</td>
                                <td className="py-1.5 px-3 font-medium text-stone-900">{cmToFtIn(geneticTargetCm + row.offset * 2.54)}</td>
                                <td className="py-1.5 px-3 text-stone-600">{row.pct}</td>
                                <td className="py-1.5 px-3 text-right">
                                  {row.bio && <span className="text-emerald-700 font-semibold">bioKids</span>}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Copy */}
                    <div className="space-y-3 text-sm text-stone-700">
                      <p>
                        With parents at {formatParentHeight(motherHeightFt, motherHeightIn)} and {formatParentHeight(fatherHeightFt, fatherHeightIn)}, your child&apos;s genetic target is around <span className="font-bold text-stone-900">{cmToFtIn(geneticTargetCm)}</span>.
                      </p>
                      <p>
                        Most children finish within about 2 inches of their genetic target.
                      </p>
                      <p>
                        However, when sleep, nutrition, exercise and hormones align optimally, children can express their genetics to the maximum of their potential—up to 8 inches above target.
                      </p>
                      <p className="font-semibold text-emerald-700">
                        bioKids helps you avoid leaving inches on the table.
                      </p>
                    </div>

                    {/* See the science */}
                    <button
                      type="button"
                      onClick={() => setShowScience(!showScience)}
                      className="mt-4 text-xs text-emerald-700 font-medium hover:text-emerald-900 transition-colors"
                    >
                      {showScience ? '\u25BC' : '\u25B6'} See the science
                    </button>
                    {showScience && (
                      <div className="mt-2 bg-emerald-50 rounded-lg p-3 space-y-2 font-mono">
                        <p className="text-[11px] text-emerald-800">
                          Standard band based on <a href="https://www.nature.com/articles/pr1998502" target="_blank" rel="noopener noreferrer" className="underline hover:text-emerald-950">Luo/Wang et al. 1998</a> and <a href="https://www.aafp.org/pubs/afp/issues/2015/0701/p43.html" target="_blank" rel="noopener noreferrer" className="underline hover:text-emerald-950">AAFP pediatric guidelines</a>.
                        </p>
                        <p className="text-[11px] text-emerald-800">
                          Maximal expression (+3-4 SD) documented in <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11352326/" target="_blank" rel="noopener noreferrer" className="underline hover:text-emerald-950">Zeevi et al. 2024</a> study of healthy families.
                        </p>
                      </div>
                    )}
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <button onClick={saveHeight} className="px-5 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors">
                    Save
                  </button>
                  {saved === 'height' && <span className="text-sm text-emerald-600 font-medium">Saved!</span>}
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
      <label className="block text-sm font-medium text-stone-700 mb-2">{label}</label>
      <div className={`grid gap-2 ${cols === 2 ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-3'}`}>
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`py-3 px-4 rounded-lg border text-sm font-medium transition-colors ${
              value === opt
                ? 'bg-emerald-50 border-emerald-600 text-emerald-700'
                : 'border-stone-300 text-stone-700 hover:bg-stone-50'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
