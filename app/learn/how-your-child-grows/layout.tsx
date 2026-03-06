import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How Your Child Actually Grows: The GH-IGF-1 Axis | bioKids",
  description: "The complete guide to the biological cascade that determines your child's height — and exactly how to optimize it naturally.",
  keywords: ["how children grow", "GH-IGF-1 axis", "growth hormone children", "child height optimization", "natural growth hormone"],
  openGraph: {
    title: "How Your Child Actually Grows: The GH-IGF-1 Axis | bioKids",
    description: "The complete guide to the biological cascade that determines your child's height — and exactly how to optimize it naturally.",
    type: "article",
    siteName: "bioKids",
    url: "https://biokids.me/learn/how-your-child-grows",
  },
  twitter: {
    card: "summary_large_image",
    title: "How Your Child Actually Grows: The GH-IGF-1 Axis | bioKids",
    description: "The complete guide to the biological cascade that determines your child's height — and exactly how to optimize it naturally.",
  },
  alternates: {
    canonical: "https://biokids.me/learn/how-your-child-grows",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
