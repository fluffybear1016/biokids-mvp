import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Jamaican Sprinter Model: Why They Never Lift Weights | bioKids",
  description: "How a small island builds the world's fastest humans without a single barbell — and what this means for growing children.",
  keywords: ["Jamaican sprinters training", "no weights growing children", "sprinting vs weight lifting", "growth plates weight lifting"],
  openGraph: {
    title: "The Jamaican Sprinter Model: Why They Never Lift Weights | bioKids",
    description: "How a small island builds the world's fastest humans without a single barbell — and what this means for growing children.",
    type: "article",
    siteName: "bioKids",
    url: "https://biokids.me/learn/jamaican-sprinter-model",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Jamaican Sprinter Model: Why They Never Lift Weights | bioKids",
    description: "How a small island builds the world's fastest humans without a single barbell — and what this means for growing children.",
  },
  alternates: {
    canonical: "https://biokids.me/learn/jamaican-sprinter-model",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
