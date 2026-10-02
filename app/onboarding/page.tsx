import { EmptyState } from "@/components/marketing/empty-state";
export const metadata = { title: "Onboarding", robots: { index: false, follow: false } };
export default function OnboardingPage() { return <EmptyState eyebrow="Onboarding / phase two" title="Start with a role, not a blank page." copy="Onboarding will ask for your goal and deadline, connect GitHub, and collect optional LeetCode and Codeforces handles in three simple steps." href="/roadmaps" label="Browse roadmaps" />; }
