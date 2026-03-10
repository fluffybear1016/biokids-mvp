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
  const [isStandaloneMode, setIsStandaloneMode] = useState(false);

  useEffect(() => {
    // Detect standalone mode (opened from home screen)
    const standalone = window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as Record<string, boolean>).standalone === true;
    setIsStandaloneMode(standalone);

    console.log('[PWA] standalone:', standalone);
    console.log('[PWA] Notification in window:', 'Notification' in window);
    console.log('[PWA] Notification.permission:', 'Notification' in window ? Notification.permission : 'N/A');
    console.log('[PWA] serviceWorker in navigator:', 'serviceWorker' in navigator);

    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').then((reg) => {
        console.log('[PWA] SW registered:', reg.scope);
      }).catch((err) => {
        console.log('[PWA] SW registration failed:', err);
      });
    }

    // Listen for install prompt (Android / desktop Chrome)
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setTimeout(() => setShowInstallBanner(true), 30000);
    };
    window.addEventListener('beforeinstallprompt', handler);

    // Show notification prompt after 2 seconds
    // On iOS standalone, Notification API should be available on 16.4+
    const hasNotificationAPI = 'Notification' in window;
    const notYetGranted = hasNotificationAPI && Notification.permission === 'default';

    console.log('[PWA] hasNotificationAPI:', hasNotificationAPI, 'notYetGranted:', notYetGranted);

    // Show the prompt if notifications are available and not yet granted,
    // OR if we're in standalone mode (so we can at least show a helpful message)
    if (notYetGranted || standalone) {
      console.log('[PWA] Will show notification prompt in 2 seconds');
      setTimeout(() => setShowNotifPrompt(true), 2000);
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
      if (!('Notification' in window)) {
        console.log('[PWA] Notification API not available');
        alert('Push notifications require opening this app from your Home Screen. Make sure you added it via Share → Add to Home Screen.');
        setShowNotifPrompt(false);
        return;
      }

      console.log('[PWA] Requesting notification permission...');
      const permission = await Notification.requestPermission();
      console.log('[PWA] Permission result:', permission);

      if (permission === 'granted') {
        // Subscribe to push
        const reg = await navigator.serviceWorker.ready;
        console.log('[PWA] SW ready, VAPID key present:', !!VAPID_PUBLIC_KEY);

        if (VAPID_PUBLIC_KEY) {
          const subscription = await reg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
          });
          console.log('[PWA] Push subscription created');

          // Send subscription to your server
          const resp = await fetch('/api/push-subscribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(subscription),
          });
          console.log('[PWA] Subscription saved, status:', resp.status);
        } else {
          console.log('[PWA] No VAPID key — subscription skipped');
        }
      }
    } catch (err) {
      console.log('[PWA] Notification setup failed:', err);
      alert('Notification setup failed: ' + (err as Error).message);
    }
    setShowNotifPrompt(false);
  };

  return (
    <>
      {/* Install banner — only show when NOT in standalone mode */}
      {!isStandaloneMode && showInstallBanner && (
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
