'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to error reporting service in production
  }, [error]);

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div style={{ fontSize: 48, fontWeight: 700, color: '#1B4332', marginBottom: 8 }}>Oops</div>
        <div style={{ fontSize: 16, fontWeight: 600, color: '#1B4332', marginBottom: 16 }}>Something went wrong</div>
        <p style={{ fontSize: 13, color: '#666', marginBottom: 24 }}>
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          style={{ display: 'inline-block', background: '#2D5A47', color: 'white', padding: '10px 24px', borderRadius: 10, fontSize: 14, fontWeight: 600, border: 'none', cursor: 'pointer' }}
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
