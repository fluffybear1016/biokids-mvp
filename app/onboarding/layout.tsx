import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Started - bioKids",
  description: "Set up your bioKids account and start optimizing your child's natural growth potential.",
};

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
