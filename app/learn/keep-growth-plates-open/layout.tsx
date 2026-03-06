import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Keep Growth Plates Open a Little Longer | bioKids",
  description: "The science of extending your child's growth window through strategic nutrition — crucifers, mushrooms, and polyphenols.",
  keywords: ["growth plates open", "extend growth window", "growth plate closure", "estrogen growth plates", "grow taller puberty"],
  openGraph: {
    title: "How to Keep Growth Plates Open a Little Longer | bioKids",
    description: "The science of extending your child's growth window through strategic nutrition — crucifers, mushrooms, and polyphenols.",
    type: "article",
    siteName: "bioKids",
    url: "https://biokids.me/learn/keep-growth-plates-open",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Keep Growth Plates Open a Little Longer | bioKids",
    description: "The science of extending your child's growth window through strategic nutrition — crucifers, mushrooms, and polyphenols.",
  },
  alternates: {
    canonical: "https://biokids.me/learn/keep-growth-plates-open",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
