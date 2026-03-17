// Firebase initialization for bioKids
// Used alongside Mixpanel for dual analytics tracking

import { initializeApp, getApps } from 'firebase/app';
import { getAnalytics, isSupported, type Analytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyBgRFWV5IPTye1d-moh2ZKPHDhcovLC-Vc",
  authDomain: "biokids-b8eb1.firebaseapp.com",
  projectId: "biokids-b8eb1",
  storageBucket: "biokids-b8eb1.firebasestorage.app",
  messagingSenderId: "28528786357",
  appId: "1:28528786357:web:00f0b89425c28fbf3c37fc"
};

// Initialize Firebase (only once)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Analytics instance (lazy, client-only)
let analyticsInstance: Analytics | null = null;

export async function getFirebaseAnalytics(): Promise<Analytics | null> {
  if (typeof window === 'undefined') return null;
  if (analyticsInstance) return analyticsInstance;

  const supported = await isSupported();
  if (supported) {
    analyticsInstance = getAnalytics(app);
  }
  return analyticsInstance;
}

export { app };
