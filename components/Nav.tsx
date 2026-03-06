'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Child, getGrowthStage, stageInfo, formatAge } from '@/lib/supabase';
import { createClient } from '@/lib/supabase';

type NavProps = {
  children?: Child[];
  currentChild?: Child | null;
  onChildSelect?: (child: Child) => void;
};

export default function Nav({ children, currentChild, onChildSelect }: NavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [childName, setChildName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const name = localStorage.getItem('childName');
    if (name) setChildName(name);

    const supabase = createClient();
    if (supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          setIsLoggedIn(true);

          // If no childName in localStorage, read from auth user metadata
          if (!name) {
            const metaName = session.user.user_metadata?.child_name;
            if (metaName) {
              setChildName(metaName);
              localStorage.setItem('childName', metaName);
            } else {
              // Last resort: fetch from children table
              fetch(`/api/auth/user-state?userId=${session.user.id}`)
                .then(res => res.json())
                .then(data => {
                  if (data.children?.length > 0 && data.children[0].name) {
                    setChildName(data.children[0].name);
                    localStorage.setItem('childName', data.children[0].name);
                  }
                })
                .catch(() => {});
            }
          }
        } else if (localStorage.getItem('biokids_auth_user_id')) {
          setIsLoggedIn(true);
        }
      });
    } else if (localStorage.getItem('biokids_auth_user_id')) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    if (supabase) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem('biokids_auth_email');
    localStorage.removeItem('biokids_auth_user_id');
    setIsLoggedIn(false);
    setShowMenu(false);
    router.push('/');
  };
  
  const tabs = [
    { href: '/science', label: 'Science' },
    { href: '/protocol', label: 'Stacks' },
    { href: '/jarvis', label: 'Austin' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <nav style={{ backgroundColor:'#fafaf9', borderBottom:'1px solid rgba(0,0,0,0.06)', fontFamily:"'Courier New', Courier, monospace" }} className="px-4 md:px-8 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/home" className="flex items-center gap-2" style={{ textDecoration:'none', background:'#f0fdf4', border:'1px solid #065f46', borderRadius:10, padding:'5px 12px' }}>
          <span style={{ width:8, height:8, borderRadius:'50%', background:'#065f46', display:'inline-block' }} />
          <span style={{ fontFamily:"'Courier New', Courier, monospace", fontSize:13, fontWeight:700, color:'#065f46', letterSpacing:'0.04em' }}>bioKids</span>
        </Link>

        {/* Navigation Tabs */}
        <div className="flex order-3 md:order-2 w-full md:w-auto justify-center overflow-x-auto" style={{ gap:28 }}>
          {tabs.map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              style={{
                fontFamily:"'Courier New', Courier, monospace",
                fontSize:12,
                fontWeight: isActive(tab.href) ? 700 : 500,
                color: isActive(tab.href) ? '#1c1917' : '#78716c',
                letterSpacing:'0.02em',
                textDecoration:'none',
                whiteSpace:'nowrap',
                transition:'color 0.2s ease',
              }}
            >
              {tab.label}
            </Link>
          ))}
        </div>
        
        {/* Child Selector */}
        {currentChild && (
          <div className="relative order-2 md:order-3">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="flex items-center gap-2 px-4 py-2 bg-cream rounded-full cursor-pointer hover:bg-stone-200 transition-colors text-sm font-medium text-forest"
              style={{ fontFamily:"'Courier New', Courier, monospace", border: 'none', background: 'transparent' }}
            >
              {currentChild.name}
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-stone-200 py-1 z-50">
                <Link
                  href="/settings"
                  onClick={() => setShowMenu(false)}
                  className="block w-full text-left px-4 py-2 text-sm text-stone-700 hover:bg-stone-50"
                  style={{ fontFamily:"'Courier New', Courier, monospace" }}
                >
                  Edit Profile
                </Link>
                <div className="border-t border-stone-100 my-1" />
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-stone-700 hover:bg-stone-50"
                  style={{ fontFamily:"'Courier New', Courier, monospace" }}
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        )}

        {/* Auth area */}
        {!currentChild && (
          <div className="flex items-center gap-3 order-2 md:order-3">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="flex items-center gap-2 px-4 py-2 bg-cream rounded-full hover:bg-stone-200 transition-colors text-sm font-medium text-forest"
                  style={{ fontFamily:"'Courier New', Courier, monospace" }}
                >
                  {childName || 'My Account'}
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {showMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-stone-200 py-1 z-50">
                    <Link
                      href="/settings"
                      onClick={() => setShowMenu(false)}
                      className="block w-full text-left px-4 py-2 text-sm text-stone-700 hover:bg-stone-50"
                      style={{ fontFamily:"'Courier New', Courier, monospace" }}
                    >
                      Edit Profile
                    </Link>
                    <div className="border-t border-stone-100 my-1" />
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-stone-700 hover:bg-stone-50"
                      style={{ fontFamily:"'Courier New', Courier, monospace" }}
                    >
                      Log out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-forest" style={{ fontFamily:"'Courier New', Courier, monospace" }}>
                  Log in
                </Link>
                <Link href="/onboarding" className="btn-primary text-sm py-2.5" style={{ fontFamily:"'Courier New', Courier, monospace" }}>
                  Get Started
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
