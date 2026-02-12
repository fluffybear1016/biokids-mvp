import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "bioKids - Natural Growth Hormone Optimization",
  description: "The science-backed protocol to maximize your child's natural growth hormone — from prenatal to age 25.",
  keywords: ["growth hormone", "children", "height", "natural", "optimization", "parenting"],
  openGraph: {
    title: "bioKids - Natural Growth Hormone Optimization",
    description: "The science-backed protocol to maximize your child's natural growth hormone — from prenatal to age 25.",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-cream antialiased">
        {children}
      </body>
    </html>
  );
}
