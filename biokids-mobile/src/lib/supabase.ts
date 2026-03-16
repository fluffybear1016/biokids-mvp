import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => SecureStore.getItemAsync(key),
  setItem: (key: string, value: string) => SecureStore.setItemAsync(key, value),
  removeItem: (key: string) => SecureStore.deleteItemAsync(key),
};

// These will be set from environment/config
const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: ExpoSecureStoreAdapter as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Types matching the web app
export type Child = {
  id: string;
  user_id: string;
  name: string;
  birth_date: string;
  gender: 'male' | 'female' | 'other' | null;
  created_at: string;
  updated_at: string;
};

export type GrowthStage =
  | 'prenatal' | 'infancy' | 'early-childhood' | 'mid-childhood'
  | 'pre-puberty' | 'early-puberty' | 'active-puberty' | 'late-growth' | 'adult';

export function getGrowthStage(birthDate: string | null): GrowthStage {
  if (!birthDate) return 'early-childhood';
  const birth = new Date(birthDate);
  if (isNaN(birth.getTime())) return 'early-childhood';
  const now = new Date();
  if (birth > now) return 'prenatal';
  const ageInMonths = (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth());
  const ageInYears = ageInMonths / 12;
  if (ageInYears < 2) return 'infancy';
  if (ageInYears < 5) return 'early-childhood';
  if (ageInYears < 8) return 'mid-childhood';
  if (ageInYears < 11) return 'pre-puberty';
  if (ageInYears < 14) return 'early-puberty';
  if (ageInYears < 18) return 'active-puberty';
  if (ageInYears < 21) return 'late-growth';
  return 'adult';
}
