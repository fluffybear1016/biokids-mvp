'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Child } from '@/lib/supabase';

// Props kept optional for backwards-compat with existing <Nav currentChild={...} /> calls.
// Everything is free and encyclopedic now — no auth, no child personalization.
type NavProps = {
  children?: Child[];
  currentChild?: Child | null;
  onChildSelect?: (child: Child) => void;
};

const tabs = [
  { href: '/science', label: 'Science' },
  { href: '/protocol', label: 'Stacks' },
  { href: '/jarvis', label: 'Au' },
  { href: '/articles', label: 'Articles' },
];

export default function Nav(_props: NavProps) {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <nav
      style={{ backgroundColor: '#fafaf9', borderBottom: '1px solid rgba(0,0,0,0.06)', fontFamily: "'Courier New', Courier, monospace" }}
      className="px-4 md:px-8 py-4 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* Logo = Home */}
        <Link
          href="/home"
          aria-label="Home"
          title="Home"
          className="flex items-center gap-2"
          style={{ textDecoration: 'none', background: '#f0fdf4', border: '1px solid #065f46', borderRadius: 10, padding: '5px 12px' }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#065f46" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 11l9-8 9 8" />
            <path d="M5 10v10h14V10" />
          </svg>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#065f46', letterSpacing: '0.04em' }}>heightMaxxing</span>
          <span style={{ fontSize: 9, fontWeight: 700, color: '#fff', background: '#065f46', borderRadius: 4, padding: '1px 5px', letterSpacing: '0.08em', marginLeft: 4 }}>BETA</span>
        </Link>

        {/* Navigation Tabs — bold & green so they clearly read as clickable */}
        <div className="flex order-3 md:order-2 w-full md:w-auto justify-center overflow-x-auto" style={{ gap: 30 }}>
          {tabs.map((tab) => {
            const active = isActive(tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                style={{
                  fontFamily: "'Courier New', Courier, monospace",
                  fontSize: 14,
                  fontWeight: 700,
                  color: active ? '#065f46' : '#0d9668',
                  letterSpacing: '0.02em',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  borderBottom: active ? '2px solid #065f46' : '2px solid transparent',
                  paddingBottom: 3,
                  transition: 'color 0.15s ease',
                }}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>

        {/* Right spacer keeps tabs visually centered on desktop */}
        <div className="hidden md:block order-3" style={{ width: 150 }} aria-hidden="true" />
      </div>
    </nav>
  );
}
