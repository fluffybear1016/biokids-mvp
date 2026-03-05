'use client';

import { useState, useEffect } from 'react';

const STREAK_DEFS = [
  { id: 'dairy', emoji: '', label: 'Dairy', items: ['dairy1', 'dairy2'], mode: 'all' as const },
  { id: 'clo', emoji: '', label: 'CLO', items: ['clo'], mode: 'all' as const },
  { id: 'protein', emoji: '', label: 'Protein', items: ['breakfast', 'presprint', 'dinnerpro'], mode: 'all' as const },
  { id: 'glycine', emoji: '', label: 'Glycine', items: ['glycine'], mode: 'all' as const },
  { id: 'bedtime', emoji: '', label: 'Bedtime', items: ['bedtime'], mode: 'all' as const },
  { id: 'protocol', emoji: '', label: '90%+', items: [], mode: 'threshold' as const, threshold: 30 },
];

type StreakData = { [streakId: string]: { count: number; lastDate: string } };

function getTodayStr() {
  return new Date().toDateString();
}

function getYesterdayStr() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toDateString();
}

function isCompleted(def: typeof STREAK_DEFS[number], completedItems: string[]): boolean {
  if (def.mode === 'threshold') {
    return completedItems.length >= (def.threshold ?? 30);
  }
  return def.items.every(item => completedItems.includes(item));
}

function computeStreaks(completedItems: string[], stored: StreakData): StreakData {
  const today = getTodayStr();
  const yesterday = getYesterdayStr();
  const updated: StreakData = {};

  for (const def of STREAK_DEFS) {
    const prev = stored[def.id] || { count: 0, lastDate: '' };
    const done = isCompleted(def, completedItems);

    if (prev.lastDate === today) {
      updated[def.id] = prev;
    } else if (done) {
      if (prev.lastDate === yesterday) {
        updated[def.id] = { count: prev.count + 1, lastDate: today };
      } else {
        updated[def.id] = { count: 1, lastDate: today };
      }
    } else {
      updated[def.id] = prev;
    }
  }

  return updated;
}

export default function StreakDisplay() {
  const [streaks, setStreaks] = useState<StreakData>({});

  useEffect(() => {
    const update = () => {
      const today = getTodayStr();

      let completedItems: string[] = [];
      try {
        const raw = localStorage.getItem('biokids_signal_completed');
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed.date === today) {
            completedItems = parsed.items || [];
          }
        }
      } catch {}

      let stored: StreakData = {};
      try {
        const raw = localStorage.getItem('biokids_streaks');
        if (raw) {
          stored = JSON.parse(raw);
        }
      } catch {}

      const newStreaks = computeStreaks(completedItems, stored);
      localStorage.setItem('biokids_streaks', JSON.stringify(newStreaks));
      setStreaks(newStreaks);
    };

    update();
    const interval = setInterval(update, 2000);
    return () => clearInterval(interval);
  }, []);

  const active = STREAK_DEFS.filter(def => (streaks[def.id]?.count ?? 0) >= 1);

  if (active.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {active.map(def => (
        <span
          key={def.id}
          className="inline-flex items-center gap-1 bg-white border border-stone-200 rounded-full px-3 py-1 text-sm"
          title={`${def.label}: ${streaks[def.id]?.count ?? 0} day streak`}
        >
          <span>{def.emoji}</span>
          <span className="font-semibold text-stone-700">{streaks[def.id]?.count ?? 0}d</span>
        </span>
      ))}
    </div>
  );
}
