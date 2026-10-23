import type { Metadata, Viewport } from "next";
import "./globals.css";
import PWAInstall from "@/components/PWAInstall";
import { Suspense } from "react";
import PostHogProvider from "@/components/PostHogProvider";

export const metadata: Metadata = {
  title: "heightMaxxing — Teach Height",
  description: "The parent's system for growing taller kids naturally — backed by 250+ medical studies.",
  keywords: ["height", "grow taller", "child height", "height potential", "growth protocol", "nutrition", "sprints", "sleep", "parenting", "pediatric research"],
  manifest: "/manifest.json",
  metadataBase: new URL("https://heightmaxxing.ai"),
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "heightMaxxing",
  },
  openGraph: {
    title: "heightMaxxing — Teach Height",
    description: "The parent's system for growing taller kids naturally — backed by 250+ medical studies.",
    url: "https://heightmaxxing.ai",
    type: "website",
    siteName: "heightMaxxing",
    images: [
      {
        url: "/og-image.png?v=2",
        width: 1200,
        height: 630,
        alt: "heightMaxxing — Teach Height",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "heightMaxxing — Teach Height",
    description: "The parent's system for growing taller kids naturally — backed by 250+ medical studies.",
    images: ["/og-image.png?v=2"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#065f46",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="heightMaxxing" />
      </head>
      <body className="min-h-screen bg-cream antialiased">
        {children}
        <PWAInstall />
        {/* PostHog Analytics — tracks MAU, DAU, retention, engagement, session replays, feature flags */}
        <Suspense fallback={null}>
          <PostHogProvider />
        </Suspense>
      </body>
    </html>
  );
}
