import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// Types for our database
export type Child = {
  id: string;
  user_id: string;
  name: string;
  birth_date: string;
  gender: 'male' | 'female' | 'other' | null;
  created_at: string;
  updated_at: string;
};

export type Measurement = {
  id: string;
  child_id: string;
  measured_at: string;
  height_cm: number | null;
  weight_kg: number | null;
  notes: string | null;
  created_at: string;
};

export type DailyLog = {
  id: string;
  child_id: string;
  log_date: string;
  early_bedtime: boolean;
  power_breakfast: boolean;
  active_play: boolean;
  screen_free_evening: boolean;
  milk_protocol: boolean;
  morning_sunlight: boolean;
  created_at: string;
  updated_at: string;
};

export type WeeklyTracking = {
  id: string;
  child_id: string;
  week_start: string;
  raw_milk_count: number;
  cod_liver_oil_count: number;
  eggs_count: number;
  beef_liver_count: number;
  salmon_count: number;
  bone_broth_count: number;
  fermented_foods_count: number;
  gelatin_count: number;
  sleep_10_plus_count: number;
  sprint_intervals_count: number;
  hanging_stretching_count: number;
  active_play_count: number;
  bedtime_milk_count: number;
  morning_sunlight_count: number;
  no_late_food_count: number;
  screen_free_count: number;
  created_at: string;
  updated_at: string;
};

export type GrowthWindow = {
  id: string;
  child_id: string;
  sleep_avg_hours: number | null;
  sleep_avg_bedtime: string | null;
  sleep_nights_on_protocol: number;
  sleep_status: 'optimal' | 'good' | 'check' | 'unknown';
  height_percentile: number | null;
  height_previous_percentile: number | null;
  circadian_days_aligned: number;
  circadian_avg_wake_time: string | null;
  circadian_morning_sunlight_days: number;
  circadian_status: 'optimal' | 'good' | 'check' | 'unknown';
  week_of: string;
  created_at: string;
  updated_at: string;
};

export type GrowthStage = 
  | 'prenatal'
  | 'infant'
  | 'toddler'
  | 'early-childhood'
  | 'pre-puberty'
  | 'puberty'
  | 'late-adolescence'
  | 'adult';

// Helper to calculate growth stage from birth date
export function getGrowthStage(birthDate: string): GrowthStage {
  const birth = new Date(birthDate);
  const now = new Date();
  
  if (birth > now) return 'prenatal';
  
  const ageInMonths = (now.getFullYear() - birth.getFullYear()) * 12 + 
                       (now.getMonth() - birth.getMonth());
  const ageInYears = ageInMonths / 12;
  
  if (ageInYears < 2) return 'infant';
  if (ageInYears < 5) return 'toddler';
  if (ageInYears < 8) return 'early-childhood';
  if (ageInYears < 12) return 'pre-puberty';
  if (ageInYears < 16) return 'puberty';
  if (ageInYears < 25) return 'late-adolescence';
  return 'adult';
}

// Format age for display
export function formatAge(birthDate: string): string {
  const birth = new Date(birthDate);
  const now = new Date();
  
  const years = now.getFullYear() - birth.getFullYear();
  const months = now.getMonth() - birth.getMonth();
  
  const totalMonths = years * 12 + months;
  
  if (totalMonths < 24) {
    return `${totalMonths} months`;
  }
  
  const displayYears = Math.floor(totalMonths / 12);
  return `${displayYears} years`;
}

// Get stage display info
export const stageInfo: Record<GrowthStage, { label: string; description: string; color: string }> = {
  'prenatal': {
    label: 'Prenatal',
    description: 'Programming the Foundation',
    color: 'purple'
  },
  'infant': {
    label: 'Infant',
    description: 'Rapid Growth Phase (0-2)',
    color: 'blue'
  },
  'toddler': {
    label: 'Toddler',
    description: 'Building Momentum (2-5)',
    color: 'teal'
  },
  'early-childhood': {
    label: 'Early Childhood',
    description: 'Establishing Habits (5-8)',
    color: 'green'
  },
  'pre-puberty': {
    label: 'Pre-Puberty',
    description: 'Peak Opportunity Window (8-12)',
    color: 'amber'
  },
  'puberty': {
    label: 'Puberty',
    description: 'Active Growth Spurt (12-16)',
    color: 'orange'
  },
  'late-adolescence': {
    label: 'Late Adolescence',
    description: 'Final Window (16-25)',
    color: 'red'
  },
  'adult': {
    label: 'Adult',
    description: 'Optimization Mode (25+)',
    color: 'gray'
  }
};
