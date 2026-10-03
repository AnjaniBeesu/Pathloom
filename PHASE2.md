# Pathloom Phase 2

Phase 2 turns the Phase 1 public shell into a usable private product foundation.

## Delivered

- Auth.js GitHub OAuth App Router endpoint at `/api/auth/[...nextauth]`.
- Environment template for `GITHUB_ID`, `GITHUB_SECRET`, `NEXTAUTH_SECRET`, and Supabase keys.
- Supabase migration with profiles, goals, nodes, user progress, connected accounts, activity snapshots, weekly plans, and RLS policies.
- Goal-based onboarding for Software Engineer Intern and APM / PM Intern paths.
- Three onboarding stages: goal/deadline, GitHub connection, LeetCode/Codeforces handles.
- React Flow skill tree with connected dependencies, completion states, canvas/list views, node details, resources, and manual completion.
- Dashboard with progress percentage, current focus, weekly plan preview, top gaps, and connection status.
- Settings for profile fields, opt-in public visibility, connected handles, theme, JSON export, and local reset.
- First-party browser-local fallback under `pathloom-phase2-state` so the product is usable before external credentials are supplied.

## Configuration boundary

Run the migration in `supabase/migrations/001_initial.sql` and fill `.env.local` to enable real OAuth and persistence. No secrets are committed. Without those values, the onboarding and app workspace remain functional locally through the browser fallback.

## Next phase

Phase 3 adds automated provider adapters, activity snapshots, rules-engine calculations, sync status, and scheduled jobs.
