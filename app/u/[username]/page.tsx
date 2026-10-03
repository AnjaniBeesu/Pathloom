import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PublicProfileCard } from "@/components/profile/public-profile-card";
import { decodePublicPayload, publicProfileDescription } from "@/lib/public-profile";
import { site } from "@/lib/content";

export async function generateMetadata({ params, searchParams }: { params: Promise<{ username: string }>; searchParams: Promise<{ share?: string }> }): Promise<Metadata> {
  const { username } = await params; const query = await searchParams; const profile = decodePublicPayload(query.share, username); if (!profile) return { title: "Private profile", description: "This Pathloom profile is private or its share link has expired.", robots: { index: false, follow: false } };
  const description = publicProfileDescription(profile); const path = `/u/${encodeURIComponent(profile.username)}?share=${encodeURIComponent(query.share ?? "")}`;
  return { title: `${profile.displayName || `@${profile.username}`} · Pathloom`, description, alternates: site.url ? { canonical: path } : undefined, openGraph: { type: "profile", title: `${profile.displayName || `@${profile.username}`} · Pathloom`, description, ...(site.url ? { url: `${site.url}${path}` } : {}), images: [{ url: `/u/${encodeURIComponent(profile.username)}/opengraph-image`, width: 1200, height: 630, alt: `${profile.displayName || profile.username}'s Pathloom progress` }] }, twitter: { card: "summary_large_image", title: `${profile.displayName || `@${profile.username}`} · Pathloom`, description, images: [`/u/${encodeURIComponent(profile.username)}/opengraph-image`] }, robots: { index: true, follow: true } };
}

export default async function ProfilePage({ params, searchParams }: { params: Promise<{ username: string }>; searchParams: Promise<{ share?: string }> }) {
  const { username } = await params; const query = await searchParams; const profile = decodePublicPayload(query.share, username); if (!profile) notFound(); return <PublicProfileCard profile={profile} />;
}
