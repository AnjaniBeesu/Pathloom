import type { Metadata } from "next";
import { EmptyState } from "@/components/marketing/empty-state";
export const metadata: Metadata = { title: "Public profile", robots: { index: false, follow: false } };
export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) { const { username } = await params; return <EmptyState eyebrow={`Profile / ${username}`} title="This profile is not public yet." copy="Pathloom profiles are private by default. When a member chooses to share, this route will show a progress card and a small, honest view of their path." href="/privacy-policy" label="Read the privacy policy" />; }
