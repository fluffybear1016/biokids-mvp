import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sprinting: The Most Powerful Natural Growth Hormone Trigger | bioKids",
  description: "Why 30-second sprints can raise growth hormone by 700% — and the exact protocol to use for your child.",
  keywords: ["sprinting growth hormone", "sprint GH increase", "exercise growth hormone", "natural growth hormone boost", "sprint protocol kids"],
  openGraph: {
    title: "Sprinting: The Most Powerful Natural Growth Hormone Trigger | bioKids",
    description: "Why 30-second sprints can raise growth hormone by 700% — and the exact protocol to use for your child.",
    type: "article",
    siteName: "bioKids",
    url: "https://biokids.me/learn/sprinting-growth-hormone",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sprinting: The Most Powerful Natural Growth Hormone Trigger | bioKids",
    description: "Why 30-second sprints can raise growth hormone by 700% — and the exact protocol to use for your child.",
  },
  alternates: {
    canonical: "https://biokids.me/learn/sprinting-growth-hormone",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
