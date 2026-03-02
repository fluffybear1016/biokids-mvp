'use client';

import Nav from '@/components/Nav';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-cream">
      <Nav />
      <div className="flex flex-col items-center justify-center" style={{ minHeight: 'calc(100vh - 80px)' }}>
        <span className="text-5xl mb-4">🌿</span>
        <h1 className="font-display text-3xl sm:text-4xl text-forest mb-2">bioKids</h1>
        <p className="text-gray-500 text-center max-w-md px-4">
          Science-backed growth optimization for your child.
        </p>
      </div>
    </div>
  );
}
