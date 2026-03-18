'use client';

import { useEffect, useState } from 'react';

type Platform = 'ios' | 'android' | 'desktop' | 'standalone';

function detectPlatform(): Platform {
  if (typeof window === 'undefined') return 'desktop';

  // Already installed as PWA
  if (window.matchMedia('(display-mode: standalone)').matches) return 'standalone';
  if ((navigator as unknown as { standalone?: boolean }).standalone) return 'standalone';

  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/.test(ua)) return 'ios';
  if (/Android/.test(ua)) return 'android';
  return 'desktop';
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: string }>;
}

export default function InstallButton() {
  const [platform, setPlatform] = useState<Platform>('desktop');
  const [showInstructions, setShowInstructions] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [minimized, setMinimized] = useState(false);

  useEffect(() => {
    setPlatform(detectPlatform());

    // Check localStorage for dismissal
    const dismissed = localStorage.getItem('biokids-install-dismissed');
    if (dismissed === 'true') setInstalled(true);

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener('beforeinstallprompt', handler);

    // Detect if installed after prompt
    const installedHandler = () => {
      setInstalled(true);
      setDeferredPrompt(null);
    };
    window.addEventListener('appinstalled', installedHandler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      window.removeEventListener('appinstalled', installedHandler);
    };
  }, []);

  // Already installed or running as PWA — don't show
  if (platform === 'standalone' || installed) return null;

  const handleInstall = async () => {
    if (deferredPrompt) {
      // Android / Chrome — use native prompt
      deferredPrompt.prompt();
      const result = await deferredPrompt.userChoice;
      if (result.outcome === 'accepted') {
        setInstalled(true);
      }
      setDeferredPrompt(null);
    } else if (platform === 'ios') {
      setShowInstructions(true);
    } else {
      setShowInstructions(true);
    }
  };

  const handleMinimize = () => {
    setMinimized(true);
  };

  return (
    <>
      {/* Minimized state — small tap target to re-expand */}
      {minimized ? (
        <button
          onClick={() => setMinimized(false)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontFamily: "'Courier New', Courier, monospace",
            fontSize: 11,
            fontWeight: 600,
            color: '#065f46',
            background: '#f0fdf4',
            border: '1px solid #d1fae5',
            borderRadius: 10,
            padding: '8px 14px',
            marginBottom: 12,
            cursor: 'pointer',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#065f46" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="8" width="16" height="13" rx="2"/>
            <line x1="12" y1="2" x2="12" y2="14"/>
            <polyline points="8 6 12 2 16 6"/>
          </svg>
          Add to Home Screen
        </button>
      ) : (
        /* Full install card */
        <div style={{
          background: '#fff',
          border: '1px solid #e7e5e4',
          borderRadius: 14,
          padding: '16px 20px',
          marginBottom: 16,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
        }}>
          <div style={{ flex: 1 }}>
            <p style={{
              fontFamily: "'Courier New', Courier, monospace",
              fontSize: 13,
              fontWeight: 700,
              color: '#1c1917',
              margin: '0 0 3px',
            }}>
              Add to Home Screen
            </p>
            <p style={{
              fontFamily: "'Courier New', Courier, monospace",
              fontSize: 11,
              color: '#57534e',
              margin: 0,
              lineHeight: 1.4,
            }}>
              One tap to open your protocol daily.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button
              onClick={handleMinimize}
              style={{
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: 16,
                color: '#57534e',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px 8px',
                lineHeight: 1,
              }}
              aria-label="Minimize"
            >
              &minus;
            </button>
            <button
              onClick={handleInstall}
              style={{
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: 12,
                fontWeight: 700,
                color: '#fff',
                background: '#065f46',
                border: 'none',
                borderRadius: 10,
                padding: '10px 18px',
                cursor: 'pointer',
              }}
            >
              Install
            </button>
          </div>
        </div>
      )}

      {/* iOS / Fallback instructions overlay */}
      {showInstructions && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}
          onClick={() => setShowInstructions(false)}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: '20px 20px 0 0',
              padding: '28px 24px 40px',
              maxWidth: 400,
              width: '100%',
              boxShadow: '0 -8px 30px rgba(0,0,0,0.15)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: 16,
                fontWeight: 800,
                color: '#1c1917',
                margin: 0,
              }}>
                Install bioKids
              </h3>
              <button
                onClick={() => setShowInstructions(false)}
                style={{
                  background: '#f5f5f4',
                  border: 'none',
                  borderRadius: '50%',
                  width: 30,
                  height: 30,
                  fontSize: 16,
                  color: '#57534e',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                &times;
              </button>
            </div>

            {platform === 'ios' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <Step
                  num={1}
                  text="Tap the Share button"
                  detail="The square icon with an arrow at the bottom of Safari"
                  icon="↑"
                />
                <Step
                  num={2}
                  text='Scroll down and tap "Add to Home Screen"'
                  detail="You may need to scroll the action sheet"
                  icon="+"
                />
                <Step
                  num={3}
                  text='Tap "Add" in the top right'
                  detail="bioKids will appear on your Home Screen"
                  icon="✓"
                />
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <Step
                  num={1}
                  text="Tap the menu icon"
                  detail="Three dots (⋮) in your browser's top right"
                  icon="⋮"
                />
                <Step
                  num={2}
                  text='Tap "Install app" or "Add to Home Screen"'
                  detail="This will add bioKids to your device"
                  icon="+"
                />
                <Step
                  num={3}
                  text="Confirm by tapping Install"
                  detail="bioKids will appear on your Home Screen"
                  icon="✓"
                />
              </div>
            )}

            <p style={{
              fontFamily: "'Courier New', Courier, monospace",
              fontSize: 10,
              color: '#57534e',
              textAlign: 'center',
              margin: '20px 0 0',
              lineHeight: 1.5,
            }}>
              Opening from your Home Screen enables push notifications and a full-screen experience.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

function Step({ num, text, detail, icon }: { num: number; text: string; detail: string; icon: string }) {
  return (
    <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
      <div style={{
        width: 36,
        height: 36,
        borderRadius: 10,
        background: '#f0fdf4',
        border: '1px solid #d1fae5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Courier New', Courier, monospace",
        fontSize: 16,
        color: '#065f46',
        flexShrink: 0,
      }}>
        {icon}
      </div>
      <div>
        <p style={{
          fontFamily: "'Courier New', Courier, monospace",
          fontSize: 13,
          fontWeight: 700,
          color: '#1c1917',
          margin: '0 0 2px',
        }}>
          {text}
        </p>
        <p style={{
          fontFamily: "'Courier New', Courier, monospace",
          fontSize: 11,
          color: '#57534e',
          margin: 0,
          lineHeight: 1.4,
        }}>
          {detail}
        </p>
      </div>
    </div>
  );
}
