import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "A1 vs A2 Milk: Why the Type Matters for Growth | bioKids",
  description: "The hidden difference in milk proteins that could be affecting your child's gut, inflammation, and height potential.",
  keywords: ["A1 vs A2 milk", "A2 milk benefits", "BCM-7 milk", "milk type growth", "Jersey cow milk"],
  openGraph: {
    title: "A1 vs A2 Milk: Why the Type Matters for Growth | bioKids",
    description: "The hidden difference in milk proteins that could be affecting your child's gut, inflammation, and height potential.",
    type: "article",
    siteName: "bioKids",
    url: "https://biokids.me/learn/a1-vs-a2-milk",
  },
  twitter: {
    card: "summary_large_image",
    title: "A1 vs A2 Milk: Why the Type Matters for Growth | bioKids",
    description: "The hidden difference in milk proteins that could be affecting your child's gut, inflammation, and height potential.",
  },
  alternates: {
    canonical: "https://biokids.me/learn/a1-vs-a2-milk",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
