'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// FREE MODE - onboarding (signup + Stripe) is retired. Everything is free with
// no account required, so anyone who lands here is sent straight into the
// protocol. The previous signup/payment funnel lives in git history if needed.
export default function Onboarding() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/home');
  }, [router]);

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fafaf9',
        fontFamily: "'Courier New', Courier, monospace",
        color: '#065f46',
        fontSize: '0.9rem',
      }}
    >
      Opening the protocol...
    </main>
  );
}
