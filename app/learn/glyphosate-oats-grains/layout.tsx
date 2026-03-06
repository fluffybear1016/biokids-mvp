import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Why Oats and Grains May Be Sabotaging Your Child's Growth | bioKids",
  description: "Glyphosate in conventional oats quietly disrupts hormones and gut function — the two systems most critical for your child's height.",
  keywords: ["glyphosate oats", "grains stunting growth", "oats growth hormone", "pesticides children", "glyphosate gut health"],
  openGraph: {
    title: "Why Oats and Grains May Be Sabotaging Your Child's Growth | bioKids",
    description: "Glyphosate in conventional oats quietly disrupts hormones and gut function — the two systems most critical for your child's height.",
    type: "article",
    siteName: "bioKids",
    url: "https://biokids.me/learn/glyphosate-oats-grains",
  },
  twitter: {
    card: "summary_large_image",
    title: "Why Oats and Grains May Be Sabotaging Your Child's Growth | bioKids",
    description: "Glyphosate in conventional oats quietly disrupts hormones and gut function — the two systems most critical for your child's height.",
  },
  alternates: {
    canonical: "https://biokids.me/learn/glyphosate-oats-grains",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
