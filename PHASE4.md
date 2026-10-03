# Pathloom Phase 4

Phase 4 turns sharing into an intentional product surface without exposing the private workspace.

## Delivered

Settings now includes an explicit public-profile toggle, username validation, and a share-card section. When sharing is enabled, the client creates a portable URL containing only the display name, username, goal, deadline, completed node IDs, and share timestamp. Provider handles, snapshots, account identifiers, and private workspace fields never enter the payload. The share sheet supports native sharing when available and clipboard fallback.

`/u/:username` now renders a meaningful server-rendered public profile only when a valid share payload is present. Invalid, missing, or private links return the project not-found state and noindex metadata. The profile shows the goal, deadline, completion percentage, milestone states, privacy boundary, and a path back to onboarding.

Each profile also has a generated `/u/:username/opengraph-image` card plus route-specific title, description, canonical URL, Open Graph, and Twitter metadata. Robots now permits opted-in `/u/` URLs while continuing to disallow app, API, and onboarding paths. Private profile URLs are intentionally not placed in the sitemap.

## Durable profile path

`supabase/migrations/003_public_profiles.sql` adds an opt-in `public_profiles` table with owner RLS and public reads only when `is_public = true`. The portable link path works in the current local-first workspace without Supabase; the table is ready for durable account-backed publishing when the authenticated Supabase write path is enabled.

## Privacy model

Sharing is off by default. The portable snapshot is a deliberate disclosure, not a live mirror. Each generated link expires after 30 days. Turning sharing off prevents new links, while a previously copied link remains available until its expiry; this boundary is explained before copying.
