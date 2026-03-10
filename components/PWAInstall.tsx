'use client';

import { useEffect, useState } from 'react';

// VAPID public key — generate your own pair for production:
// npx web-push generate-vapid-keys
// Set NEXT_PUBLIC_VAPID_PUBLIC_KEY in .env.local
const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || '';

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export default function PWAInstall() {
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [showNotifPrompt, setShowNotifPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);

  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').then((reg) => {
        console.log('SW registered:', reg.scope);
      }).catch((err) => {
        console.log('SW registration failed:', err);
      });
    }

    // Listen for install prompt (Android / desktop Chrome)
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Show install banner after 30 seconds of use
      setTimeout(() => setShowInstallBanner(true), 30000);
    };
    window.addEventListener('beforeinstallprompt', handler);

    // Check if push notifications are available but not yet granted
    if ('Notification' in window && Notification.permission === 'default') {
      // Show notification prompt after 60 seconds of engagement
      setTimeout(() => setShowNotifPrompt(true), 60000);
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    (deferredPrompt as BeforeInstallPromptEvent).prompt();
    setShowInstallBanner(false);
    setDeferredPrompt(null);
  };

  const handleEnableNotifications = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        // Subscribe to push
        const reg = await navigator.serviceWorker.ready;
        if (VAPID_PUBLIC_KEY) {
          const subscription = await reg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
          });

          // Send subscription to your server
          await fetch('/api/push-subscribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(subscription),
          });
        }
      }
    } catch (err) {
      console.log('Notification setup failed:', err);
    }
    setShowNotifPrompt(false);
  };

  // iOS standalone detection — show "already installed" or custom instructions
  const isStandalone = typeof window !== 'undefined' &&
    (window.matchMedia('(display-mode: standalone)').matches ||
     (window.navigator as unknown as Record<string, boolean>).standalone === true);

  if (isStandalone) return null; // Already installed as PWA

  return (
    <>
      {/* Install banner */}
      {showInstallBanner && (
        <div style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 9999,
          background: '#065f46', padding: '16px 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          boxShadow: '0 -4px 20px rgba(0,0,0,0.15)',
        }}>
          <div>
            <p style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: 13, fontWeight: 700, color: '#fff', margin: '0 0 2px' }}>
              Add bioKids to your home screen
            </p>
            <p style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: 10, color: '#d1fae5', margin: 0 }}>
              Quick access to your child&apos;s daily protocol
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => setShowInstallBanner(false)}
              style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: 11, color: '#d1fae5', background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}
            >
              Later
            </button>
            <button
              onClick={handleInstall}
              style={{
                fontFamily: "'Courier New', Courier, monospace", fontSize: 12, fontWeight: 700,
                color: '#065f46', background: '#fff', border: 'none', borderRadius: 8,
                padding: '8px 16px', cursor: 'pointer',
              }}
            >
              Install
            </button>
          </div>
        </div>
      )}

      {/* Push notification prompt */}
      {showNotifPrompt && (
        <div style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 9999,
          background: '#fff', padding: '20px', borderTop: '2px solid #065f46',
          boxShadow: '0 -4px 20px rgba(0,0,0,0.1)',
        }}>
          <p style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: 13, fontWeight: 700, color: '#1c1917', margin: '0 0 4px' }}>
            Get daily reminders?
          </p>
          <p style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: 11, color: '#57534e', margin: '0 0 12px', lineHeight: 1.5 }}>
            We&apos;ll remind you each morning to start the height protocol. Consistency is everything.
          </p>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => setShowNotifPrompt(false)}
              style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: 12, color: '#78716c', background: 'none', border: '1px solid #e7e5e4', borderRadius: 8, padding: '8px 16px', cursor: 'pointer', flex: 1 }}
            >
              Not now
            </button>
            <button
              onClick={handleEnableNotifications}
              style={{
                fontFamily: "'Courier New', Courier, monospace", fontSize: 12, fontWeight: 700,
                color: '#fff', background: '#065f46', border: 'none', borderRadius: 8,
                padding: '8px 16px', cursor: 'pointer', flex: 1,
              }}
            >
              Enable reminders
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// Type for beforeinstallprompt
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
}
