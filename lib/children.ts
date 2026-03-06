'use client';

// Multi-child data management
// Stores per-child data in localStorage as a JSON array
// Keeps flat keys in sync with active child for backward compatibility

export type ChildProfile = {
  id: string;
  name: string;
  birthMonth: string;
  birthYear: string;
  gender: 'boy' | 'girl' | '';
  sleepHours: string;
  bedtime: string;
  dairy: string;
  exercise: string;
  screenTime: string;
  processedFoods: string;
  goal: 'concerned' | 'foundation' | 'elite' | '';
  motherHeightFt: string;
  motherHeightIn: string;
  fatherHeightFt: string;
  fatherHeightIn: string;
  geneticTarget: string;
  // Checklist state (comma-separated checked item IDs)
  checkedItems: string;
};

const CHILDREN_KEY = 'biokids_children';
const ACTIVE_CHILD_KEY = 'biokids_active_child_id';

function generateId(): string {
  return 'child_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

export function createEmptyChild(name?: string): ChildProfile {
  return {
    id: generateId(),
    name: name || '',
    birthMonth: '',
    birthYear: '',
    gender: '',
    sleepHours: '',
    bedtime: '',
    dairy: '',
    exercise: '',
    screenTime: '',
    processedFoods: '',
    goal: '',
    motherHeightFt: '',
    motherHeightIn: '',
    fatherHeightFt: '',
    fatherHeightIn: '',
    geneticTarget: '',
    checkedItems: '',
  };
}

export function getChildren(): ChildProfile[] {
  try {
    const raw = localStorage.getItem(CHILDREN_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}

  // Migration: if no children array exists, create one from flat localStorage keys
  const migrated = migrateFromFlatKeys();
  if (migrated) {
    saveChildren([migrated]);
    setActiveChildId(migrated.id);
    return [migrated];
  }

  return [];
}

export function saveChildren(children: ChildProfile[]) {
  localStorage.setItem(CHILDREN_KEY, JSON.stringify(children));
}

export function getActiveChildId(): string | null {
  return localStorage.getItem(ACTIVE_CHILD_KEY);
}

export function setActiveChildId(id: string) {
  localStorage.setItem(ACTIVE_CHILD_KEY, id);
  // Sync flat keys with this child's data
  const children = getChildren();
  const child = children.find(c => c.id === id);
  if (child) syncFlatKeys(child);
}

export function getActiveChild(): ChildProfile | null {
  const children = getChildren();
  if (children.length === 0) return null;

  const activeId = getActiveChildId();
  const active = children.find(c => c.id === activeId);
  return active || children[0];
}

export function addChild(child: ChildProfile): ChildProfile[] {
  const children = getChildren();
  children.push(child);
  saveChildren(children);
  return children;
}

export function updateChild(updated: ChildProfile): ChildProfile[] {
  const children = getChildren();
  const idx = children.findIndex(c => c.id === updated.id);
  if (idx >= 0) {
    children[idx] = updated;
  }
  saveChildren(children);

  // If this is the active child, sync flat keys
  const activeId = getActiveChildId();
  if (updated.id === activeId) {
    syncFlatKeys(updated);
  }

  return children;
}

export function removeChild(id: string): ChildProfile[] {
  let children = getChildren();
  children = children.filter(c => c.id !== id);
  saveChildren(children);

  // If we removed the active child, switch to first remaining
  const activeId = getActiveChildId();
  if (activeId === id && children.length > 0) {
    setActiveChildId(children[0].id);
  }

  return children;
}

// Sync flat localStorage keys with a child's data (backward compat for home page, nav, etc.)
function syncFlatKeys(child: ChildProfile) {
  localStorage.setItem('childName', child.name);
  localStorage.setItem('childBirthMonth', child.birthMonth);
  localStorage.setItem('childBirthYear', child.birthYear);
  localStorage.setItem('childGender', child.gender);
  localStorage.setItem('sleepHours', child.sleepHours);
  localStorage.setItem('bedtime', child.bedtime);
  localStorage.setItem('dairy', child.dairy);
  localStorage.setItem('exercise', child.exercise);
  localStorage.setItem('screenTime', child.screenTime);
  localStorage.setItem('processedFoods', child.processedFoods);
  if (child.goal) {
    localStorage.setItem('biokids_goal', JSON.stringify({ goal: child.goal, date: new Date().toISOString() }));
  }
  if (child.motherHeightFt && child.motherHeightIn) {
    localStorage.setItem('motherHeight', `${child.motherHeightFt}'${child.motherHeightIn}"`);
  }
  if (child.fatherHeightFt && child.fatherHeightIn) {
    localStorage.setItem('fatherHeight', `${child.fatherHeightFt}'${child.fatherHeightIn}"`);
  }
  if (child.geneticTarget) {
    localStorage.setItem('geneticTarget', child.geneticTarget);
  }
}

// Migrate existing flat localStorage keys into a ChildProfile
function migrateFromFlatKeys(): ChildProfile | null {
  const name = localStorage.getItem('childName');
  if (!name) return null;

  let goal: ChildProfile['goal'] = '';
  try {
    const raw = localStorage.getItem('biokids_goal');
    if (raw) {
      const parsed = JSON.parse(raw);
      goal = parsed.goal || '';
    }
  } catch {}

  const motherHeight = localStorage.getItem('motherHeight') || '';
  const fatherHeight = localStorage.getItem('fatherHeight') || '';
  const mMatch = motherHeight.match(/(\d+)'(\d+)"/);
  const fMatch = fatherHeight.match(/(\d+)'(\d+)"/);

  return {
    id: generateId(),
    name,
    birthMonth: localStorage.getItem('childBirthMonth') || '',
    birthYear: localStorage.getItem('childBirthYear') || '',
    gender: (localStorage.getItem('childGender') || '') as ChildProfile['gender'],
    sleepHours: localStorage.getItem('sleepHours') || '',
    bedtime: localStorage.getItem('bedtime') || '',
    dairy: localStorage.getItem('dairy') || '',
    exercise: localStorage.getItem('exercise') || '',
    screenTime: localStorage.getItem('screenTime') || '',
    processedFoods: localStorage.getItem('processedFoods') || '',
    goal,
    motherHeightFt: mMatch ? mMatch[1] : '',
    motherHeightIn: mMatch ? mMatch[2] : '',
    fatherHeightFt: fMatch ? fMatch[1] : '',
    fatherHeightIn: fMatch ? fMatch[2] : '',
    geneticTarget: localStorage.getItem('geneticTarget') || '',
    checkedItems: '',
  };
}

// Get checklist state for a specific child
export function getChildChecklist(childId: string): Set<string> {
  const children = getChildren();
  const child = children.find(c => c.id === childId);
  if (!child || !child.checkedItems) return new Set();
  return new Set(child.checkedItems.split(',').filter(Boolean));
}

// Save checklist state for a specific child
export function saveChildChecklist(childId: string, checked: Set<string>) {
  const children = getChildren();
  const idx = children.findIndex(c => c.id === childId);
  if (idx >= 0) {
    children[idx].checkedItems = Array.from(checked).join(',');
    saveChildren(children);
  }
}
