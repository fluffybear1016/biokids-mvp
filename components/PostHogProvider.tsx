'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { initPostHog } from '@/lib/analytics';
import posthog from 'posthog-js';

// PostHog provider — initializes client-side analytics and tracks route changes
// Replaces the Mixpanel CDN script that was in layout.tsx
export default function PostHogProvider() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    initPostHog();
  }, []);

  // Track client-side route changes (Next.js SPA navigation)
  useEffect(() => {
    if (pathname) {
      const url = window.origin + pathname;
      const search = searchParams?.toString();
      if (search) {
        posthog.capture('$pageview', { $current_url: url + '?' + search });
      } else {
        posthog.capture('$pageview', { $current_url: url });
      }
    }
  }, [pathname, searchParams]);

  return null; // This component renders nothing — it's just a side-effect provider
}
