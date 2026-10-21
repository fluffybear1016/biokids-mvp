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

type NotifState = 'loading' | 'unsupported' | 'default' | 'denied' | 'granted-no-sub' | 'subscribed';

export default function PWAInstall() {
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const [notifState, setNotifState] = useState<NotifState>('loading');
  const [dismissed, setDismissed] = useState(false);
  const [subscribing, setSubscribing] = useState(false);

  // Check notification state on mount and periodically
  const checkNotifState = async () => {
    if (!('Notification' in window) || !('serviceWorker' in navigator)) {
      setNotifState('unsupported');
      return;
    }

    const perm = Notification.permission;
    console.log('[PWA] Permission check:', perm);

    if (perm === 'denied') {
      setNotifState('denied');
      return;
    }

    if (perm === 'default') {
      setNotifState('default');
      return;
    }

    // Permission is granted — check if we have a subscription
    try {
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.getSubscription();
      if (sub) {
        setNotifState('subscribed');
        console.log('[PWA] Already subscribed:', sub.endpoint.slice(0, 60));
      } else {
        setNotifState('granted-no-sub');
        console.log('[PWA] Granted but no subscription — will auto-subscribe');
      }
    } catch (err) {
      console.log('[PWA] Error checking subscription:', err);
      setNotifState('granted-no-sub');
    }
  };

  useEffect(() => {
    console.log('[PWA] Component mounted');
    console.log('[PWA] VAPID key present:', !!VAPID_PUBLIC_KEY, 'length:', VAPID_PUBLIC_KEY.length);

    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').then((reg) => {
        console.log('[PWA] SW registered:', reg.scope);
      }).catch((err) => {
        console.log('[PWA] SW registration failed:', err);
      });
    }

    // Check notification state
    checkNotifState();

    // Listen for install prompt (Android / desktop Chrome)
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Don't show the banner during onboarding (Step 5 handles it there)
      const isOnboarding = window.location.pathname.includes('/onboarding');
      if (!isOnboarding) {
        setTimeout(() => setShowInstallBanner(true), 30000);
      }
    };
    window.addEventListener('beforeinstallprompt', handler);

    // Re-check permission every 5s in case user changed it in Settings
    const interval = setInterval(() => {
      if ('Notification' in window) {
        const perm = Notification.permission;
        // If permission changed from denied to something else, re-check
        checkNotifState();
      }
    }, 5000);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      clearInterval(interval);
    };
  }, []);

  // Auto-subscribe when permission is granted but no subscription exists
  useEffect(() => {
    if (notifState === 'granted-no-sub' && VAPID_PUBLIC_KEY && !subscribing) {
      console.log('[PWA] Auto-subscribing...');
      createSubscription();
    }
  }, [notifState]);

  const createSubscription = async () => {
    if (subscribing) return;
    setSubscribing(true);
    try {
      const reg = await navigator.serviceWorker.ready;
      const subscription = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
      });
      console.log('[PWA] Push subscription created:', JSON.stringify(subscription).slice(0, 100));

      // Send subscription to server
      const resp = await fetch('/api/push-subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subscription),
      });
      const respText = await resp.text();
      console.log('[PWA] Subscription saved, status:', resp.status, 'body:', respText);

      if (resp.ok) {
        setNotifState('subscribed');
      }
    } catch (err) {
      console.log('[PWA] Subscription creation failed:', err);
    }
    setSubscribing(false);
  };

  const handleEnableNotifications = async () => {
    try {
      if (!('Notification' in window)) {
        alert('Notifications not available.\n\nThis app must be opened from your Home Screen.\n\n1. Tap the Share button in Safari\n2. Tap "Add to Home Screen"\n3. Open the app from your Home Screen\n4. Then tap Enable Reminders again');
        return;
      }

      const currentPerm = Notification.permission;
      console.log('[PWA] Enable tapped, current permission:', currentPerm);

      if (currentPerm === 'denied') {
        // Can't re-request after denied — show instructions
        const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);
        if (isIOS) {
          alert('Notifications are blocked.\n\nTo fix:\n1. Go to Settings → Notifications\n2. Scroll to find "biokids"\n3. Turn on "Allow Notifications"\n4. Come back and tap this button again');
        } else {
          alert('Notifications are blocked.\n\nTo fix:\n1. Click the lock/info icon in your browser\'s address bar\n2. Find "Notifications" and change it to "Allow"\n3. Refresh this page\n4. Tap "Enable reminders" again');
        }
        return;
      }

      // Make sure service worker is ready
      const reg = await navigator.serviceWorker.ready;
      console.log('[PWA] SW ready, requesting permission...');

      const permission = await Notification.requestPermission();
      console.log('[PWA] Permission result:', permission);

      if (permission === 'granted') {
        await createSubscription();
        alert('Notifications enabled! You\'ll get protocol reminders throughout the day.');
      } else if (permission === 'denied') {
        setNotifState('denied');
        alert('You denied notifications.\n\nIf you change your mind, you can change this in your browser settings and tap "Enable reminders" again.');
      } else {
        alert('Permission was dismissed. Please try again and tap "Allow" when the popup appears.');
      }

      checkNotifState();
    } catch (err) {
      const errMsg = (err as Error).message || String(err);
      console.log('[PWA] Notification setup failed:', err);
      alert('Notification setup error:\n' + errMsg);
    }
  };

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    (deferredPrompt as BeforeInstallPromptEvent).prompt();
    setShowInstallBanner(false);
    setDeferredPrompt(null);
  };

  // Don't show notification banner if: loading, already subscribed, unsupported, user dismissed, or during onboarding
  const isOnboarding = typeof window !== 'undefined' && window.location.pathname.includes('/onboarding');
  const showNotifBanner = !dismissed && !isOnboarding && notifState !== 'loading' && notifState !== 'subscribed' && notifState !== 'unsupported';

  return (
    <>
      {/* Install banner — only show when NOT in standalone mode */}
      {showInstallBanner && (
        <div style={{
          position: 'fixed', bottom: showNotifBanner ? 120 : 0, left: 0, right: 0, zIndex: 9999,
          background: '#065f46', padding: '16px 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          boxShadow: '0 -4px 20px rgba(0,0,0,0.15)',
        }}>
          <div>
            <p style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: 13, fontWeight: 700, color: '#fff', margin: '0 0 2px' }}>
              Add heightMaxxing to your home screen
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

      {/* Push notification banner — shows for default, denied, and granted-no-sub states */}
      {showNotifBanner && (
        <div style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 9999,
          background: '#fff', padding: '20px', borderTop: '2px solid #065f46',
          boxShadow: '0 -4px 20px rgba(0,0,0,0.1)',
        }}>
          <p style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: 13, fontWeight: 700, color: '#1c1917', margin: '0 0 4px' }}>
            {notifState === 'denied' ? 'Notifications are blocked' : 'Get daily reminders?'}
          </p>
          <p style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: 11, color: '#57534e', margin: '0 0 12px', lineHeight: 1.5 }}>
            {notifState === 'denied'
              ? 'Tap below for instructions to unblock notifications so you can get protocol reminders.'
              : 'We\'ll send protocol reminders throughout the day — morning, lunch, exercise, dinner & bedtime.'}
          </p>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => setDismissed(true)}
              style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: 12, color: '#57534e', background: 'none', border: '1px solid #e7e5e4', borderRadius: 8, padding: '8px 16px', cursor: 'pointer', flex: 1 }}
            >
              Not now
            </button>
            <button
              onClick={handleEnableNotifications}
              style={{
                fontFamily: "'Courier New', Courier, monospace", fontSize: 12, fontWeight: 700,
                color: '#fff', background: notifState === 'denied' ? '#b45309' : '#065f46',
                border: 'none', borderRadius: 8,
                padding: '8px 16px', cursor: 'pointer', flex: 1,
              }}
            >
              {notifState === 'denied' ? 'Unblock notifications' : 'Enable reminders'}
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
