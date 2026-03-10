import type { Metadata, Viewport } from "next";
import "./globals.css";
import PWAInstall from "@/components/PWAInstall";

export const metadata: Metadata = {
  title: "bioKids — Height Protocol",
  description: "The science-backed daily protocol to maximize your child's height potential — meals, sprints, and sleep arranged by science.",
  keywords: ["height", "children", "taller", "natural", "growth hormone", "optimization", "parenting"],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "bioKids",
  },
  openGraph: {
    title: "bioKids — Height Protocol",
    description: "The science-backed daily protocol to maximize your child's height potential.",
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
      </body>
    </html>
  );
}
