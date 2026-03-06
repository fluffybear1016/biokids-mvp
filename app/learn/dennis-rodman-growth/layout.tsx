import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Dennis Rodman Growth Story | bioKids",
  description: "How delayed puberty and a sudden nutrition upgrade created one of the most dramatic growth spurts in sports history — from 5'8\" to 6'8\".",
  keywords: ["Dennis Rodman growth spurt", "late growth spurt", "delayed puberty height", "growing taller after puberty"],
  openGraph: {
    title: "The Dennis Rodman Growth Story | bioKids",
    description: "How delayed puberty and a sudden nutrition upgrade created one of the most dramatic growth spurts in sports history — from 5'8\" to 6'8\".",
    type: "article",
    siteName: "bioKids",
    url: "https://biokids.me/learn/dennis-rodman-growth",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Dennis Rodman Growth Story | bioKids",
    description: "How delayed puberty and a sudden nutrition upgrade created one of the most dramatic growth spurts in sports history — from 5'8\" to 6'8\".",
  },
  alternates: {
    canonical: "https://biokids.me/learn/dennis-rodman-growth",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
