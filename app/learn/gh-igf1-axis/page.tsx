'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function GhIgf1AxisRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/learn/how-your-child-grows');
  }, [router]);
  return null;
}
