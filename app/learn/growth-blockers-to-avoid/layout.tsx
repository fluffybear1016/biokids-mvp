import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "18 Growth Blockers to Avoid | bioKids",
  description: "Sleep disruptors, endocrine disruptors, nutritional blockers — a science-backed checklist of 18 things secretly stunting your child's growth.",
  keywords: ["growth blockers", "stunting growth", "endocrine disruptors", "child growth", "height stunting", "growth hormone suppression"],
  openGraph: {
    title: "18 Growth Blockers to Avoid | bioKids",
    description: "Sleep disruptors, endocrine disruptors, nutritional blockers — a science-backed checklist of 18 things secretly stunting your child's growth.",
    type: "article",
    siteName: "bioKids",
    url: "https://biokids.me/learn/growth-blockers-to-avoid",
  },
  twitter: {
    card: "summary_large_image",
    title: "18 Growth Blockers to Avoid | bioKids",
    description: "Sleep disruptors, endocrine disruptors, nutritional blockers — a science-backed checklist of 18 things secretly stunting your child's growth.",
  },
  alternates: {
    canonical: "https://biokids.me/learn/growth-blockers-to-avoid",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
