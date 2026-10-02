import { EmptyState } from "@/components/marketing/empty-state";
export const metadata = { title: "Dashboard", robots: { index: false, follow: false } };
export default function AppPage() { return <EmptyState eyebrow="Your dashboard / phase two" title="Your progress will live here." copy="The dashboard will bring your goal, progress ring, current focus, weekly plan, streak, and top gaps into one calm view. Sign in and onboarding arrive in the next phase." href="/how-it-works" label="See the product loop" />; }
