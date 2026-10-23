'use client';

import { useEffect } from 'react';

// Registers the service worker only. All install / "add to home screen" /
// "get daily reminders" banners have been removed so nothing ever covers the
// protocol. The previous banner UI lives in git history if ever needed again.
export default function PWAInstall() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }
  }, []);

  return null;
}
