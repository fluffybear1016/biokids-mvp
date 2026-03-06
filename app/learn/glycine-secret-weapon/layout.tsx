import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Glycine: The Secret Weapon for Growth | bioKids",
  description: "How the simplest amino acid can boost growth hormone, deepen sleep, and build stronger bones in growing children.",
  keywords: ["glycine growth hormone", "glycine sleep", "bone broth growth", "collagen children growth"],
  openGraph: {
    title: "Glycine: The Secret Weapon for Growth | bioKids",
    description: "How the simplest amino acid can boost growth hormone, deepen sleep, and build stronger bones in growing children.",
    type: "article",
    siteName: "bioKids",
    url: "https://biokids.me/learn/glycine-secret-weapon",
  },
  twitter: {
    card: "summary_large_image",
    title: "Glycine: The Secret Weapon for Growth | bioKids",
    description: "How the simplest amino acid can boost growth hormone, deepen sleep, and build stronger bones in growing children.",
  },
  alternates: {
    canonical: "https://biokids.me/learn/glycine-secret-weapon",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
