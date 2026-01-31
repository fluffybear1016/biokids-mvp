const STORAGE_KEY = 'biokids_onboarding';

export interface OnboardingChild {
  id: string;
  name: string;
  birthDate: string;
  gender: 'male' | 'female' | null;
  heightCm: number | null;
  weightKg: number | null;
  isPregnancy: boolean;
  dueDate?: string;
}

export interface OnboardingData {
  sessionId: string;
  currentStep: number;
  children: OnboardingChild[];
  currentChildIndex: number;
  email: string;
  emailFrequency: 'daily' | '2x_week' | 'weekly' | 'none';
  stripeCheckoutCompleted: boolean;
}

export function generateSessionId(): string {
  return crypto.randomUUID();
}

export function getInitialOnboardingData(): OnboardingData {
  return {
    sessionId: generateSessionId(),
    currentStep: 1,
    children: [],
    currentChildIndex: 0,
    email: '',
    emailFrequency: 'weekly',
    stripeCheckoutCompleted: false,
  };
}

export function saveOnboardingData(data: OnboardingData): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
}

export function loadOnboardingData(): OnboardingData | null {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

export function clearOnboardingData(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
}
