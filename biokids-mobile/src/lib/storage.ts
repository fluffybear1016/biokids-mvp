import AsyncStorage from '@react-native-async-storage/async-storage';

// Multi-child data management — mirrors web app's children.ts
// Uses AsyncStorage instead of localStorage

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
  checkedItems: string;
};

const CHILDREN_KEY = 'biokids_children';
const ACTIVE_CHILD_KEY = 'biokids_active_child_id';

function generateId(): string {
  return 'child_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

export function createEmptyChild(name?: string): ChildProfile {
  return {
    id: generateId(), name: name || '', birthMonth: '', birthYear: '',
    gender: '', sleepHours: '', bedtime: '', dairy: '', exercise: '',
    screenTime: '', processedFoods: '', goal: '', motherHeightFt: '',
    motherHeightIn: '', fatherHeightFt: '', fatherHeightIn: '',
    geneticTarget: '', checkedItems: '',
  };
}

export async function getChildren(): Promise<ChildProfile[]> {
  try {
    const raw = await AsyncStorage.getItem(CHILDREN_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return [];
}

export async function saveChildren(children: ChildProfile[]) {
  await AsyncStorage.setItem(CHILDREN_KEY, JSON.stringify(children));
}

export async function getActiveChildId(): Promise<string | null> {
  return AsyncStorage.getItem(ACTIVE_CHILD_KEY);
}

export async function setActiveChildId(id: string) {
  await AsyncStorage.setItem(ACTIVE_CHILD_KEY, id);
}

export async function getActiveChild(): Promise<ChildProfile | null> {
  const children = await getChildren();
  if (children.length === 0) return null;
  const activeId = await getActiveChildId();
  return children.find(c => c.id === activeId) || children[0];
}

export async function addChild(child: ChildProfile): Promise<ChildProfile[]> {
  const children = await getChildren();
  children.push(child);
  await saveChildren(children);
  return children;
}

export async function updateChild(updated: ChildProfile): Promise<ChildProfile[]> {
  const children = await getChildren();
  const idx = children.findIndex(c => c.id === updated.id);
  if (idx >= 0) children[idx] = updated;
  await saveChildren(children);
  return children;
}

export async function removeChild(id: string): Promise<ChildProfile[]> {
  let children = await getChildren();
  children = children.filter(c => c.id !== id);
  await saveChildren(children);
  const activeId = await getActiveChildId();
  if (activeId === id && children.length > 0) {
    await setActiveChildId(children[0].id);
  }
  return children;
}

// Checklist helpers
export async function getChildChecklist(childId: string): Promise<Set<string>> {
  const children = await getChildren();
  const child = children.find(c => c.id === childId);
  if (!child || !child.checkedItems) return new Set();
  return new Set(child.checkedItems.split(',').filter(Boolean));
}

export async function saveChildChecklist(childId: string, checked: Set<string>) {
  const children = await getChildren();
  const idx = children.findIndex(c => c.id === childId);
  if (idx >= 0) {
    children[idx].checkedItems = Array.from(checked).join(',');
    await saveChildren(children);
  }
}

// Simple key-value helpers (replacing localStorage)
export async function getItem(key: string): Promise<string | null> {
  return AsyncStorage.getItem(key);
}

export async function setItem(key: string, value: string) {
  await AsyncStorage.setItem(key, value);
}

export async function removeItem(key: string) {
  await AsyncStorage.removeItem(key);
}
