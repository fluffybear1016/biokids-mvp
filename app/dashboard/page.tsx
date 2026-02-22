'use client';

import Nav from '@/components/Nav';
import SignalPage from '@/components/SignalPage';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-cream">
      <Nav />
      <SignalPage />
    </div>
  );
}
