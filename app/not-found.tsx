import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div style={{ fontSize: 48, fontWeight: 700, color: '#1B4332', marginBottom: 8 }}>404</div>
        <div style={{ fontSize: 16, fontWeight: 600, color: '#1B4332', marginBottom: 16 }}>Page not found</div>
        <p style={{ fontSize: 13, color: '#666', marginBottom: 24 }}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/dashboard"
          style={{ display: 'inline-block', background: '#2D5A47', color: 'white', padding: '10px 24px', borderRadius: 10, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
