import type { Metadata, Viewport } from "next";
import "./globals.css";
import PWAInstall from "@/components/PWAInstall";
import { Suspense } from "react";
import PostHogProvider from "@/components/PostHogProvider";

export const metadata: Metadata = {
  title: "bioKids — Height Protocol for Parents",
  description: "The research-backed daily protocol to help your child reach their height potential — nutrition, sprints, and sleep arranged by published science.",
  keywords: ["height", "grow taller", "child height", "height potential", "growth protocol", "nutrition", "sprints", "sleep", "parenting", "pediatric research"],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "bioKids",
  },
  openGraph: {
    title: "bioKids — Height Protocol for Parents",
    description: "The research-backed daily protocol to help your child reach their height potential — nutrition, sprints, and sleep arranged by published science.",
    type: "website",
    siteName: "bioKids",
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
        <meta name="apple-mobile-web-app-title" content="bioKids" />
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
