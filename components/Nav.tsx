'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Child, getGrowthStage, stageInfo, formatAge } from '@/lib/supabase';

type NavProps = {
  children?: Child[];
  currentChild?: Child | null;
  onChildSelect?: (child: Child) => void;
};

export default function Nav({ children, currentChild, onChildSelect }: NavProps) {
  const pathname = usePathname();
  
  const tabs = [
    { href: '/dashboard', label: 'Home' },
    { href: '/protocol', label: 'Protocol' },
    { href: '/learn', label: 'Articles' },
    { href: '/jarvis', label: 'gH AI' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="bg-white border-b border-forest/10 px-4 md:px-8 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-display text-xl text-forest">
          <span className="text-2xl">🌿</span>
          bioKids
        </Link>
        
        {/* Navigation Tabs */}
        <div className="flex gap-1 bg-cream p-1.5 rounded-xl order-3 md:order-2 w-full md:w-auto justify-center">
          {tabs.map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive(tab.href)
                  ? 'bg-white text-forest shadow-sm'
                  : 'text-gray-500 hover:text-forest'
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </div>
        
        {/* Child Selector */}
        {currentChild && (
          <div className="flex items-center gap-2 px-4 py-2 bg-cream rounded-full cursor-pointer hover:bg-cream-dark transition-colors order-2 md:order-3">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-light to-amber rounded-full flex items-center justify-center text-base">
              {currentChild.gender === 'female' ? '👧' : '👦'}
            </div>
            <span className="font-semibold text-sm">{currentChild.name}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        )}

        {/* Auth buttons if no child */}
        {!currentChild && pathname !== '/' && (
          <div className="flex items-center gap-3 order-2 md:order-3">
            <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-forest">
              Log in
            </Link>
            <Link href="/signup" className="btn-primary text-sm py-2">
              Get Started
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
