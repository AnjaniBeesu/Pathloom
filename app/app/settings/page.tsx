import { EmptyState } from "@/components/marketing/empty-state";
export const metadata = { title: "Settings", robots: { index: false, follow: false } };
export default function SettingsPage() { return <EmptyState eyebrow="Settings / phase two" title="Your choices stay yours." copy="Settings will include connected accounts, profile visibility, theme, JSON export, and permanent data deletion." href="/privacy-policy" label="Read the privacy template" />; }
