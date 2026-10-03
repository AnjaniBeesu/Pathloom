# Pathloom Phase 3

Phase 3 adds the evidence loop: public activity can now inform the skill tree without replacing the user's own judgment.

## Delivered

The server-side adapters read public GitHub profile/events, Codeforces rating/submissions, and LeetCode public GraphQL stats with eight-second timeouts and provider-specific warnings. The `/api/sync` route accepts the current goal, public handles, and progress map, then returns provider snapshots, evidence rules, updated progress, and a bounded run record.

The rules engine maps conservative evidence thresholds to SWE and APM nodes. It can complete a node when the threshold is met, but it never downgrades a manual or previously completed node. The browser workspace stores the latest snapshots, warnings, evidence, and five most recent runs in its existing first-party local state.

The dashboard now includes an Activity sync panel with provider status, last-sync time, qualified-rule count, warnings, and a Sync now action. Phase 3 also includes `POST /api/scheduled/sync`, which verifies the platform's `app_session_id` cron JWT and scheduled identity before looking up a Supabase `sync_targets` row and recording a sync run.

## Supabase and scheduling

Run `supabase/migrations/002_sync.sql` after the Phase 2 migration to create `sync_targets` and `sync_runs`. Register the scheduler only after a successful published deployment, targeting `/api/scheduled/sync`; the callback is idempotent and returns an accepted no-op when Supabase or a target is not configured.

## Next phase

Phase 4 adds opt-in public profiles, generated share cards, share sheets, richer public SEO pages, and privacy-safe profile views.
