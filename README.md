# Pathloom

Pathloom is a living career skill-tree for the work between today and your next role. It is designed first for Indian B.Tech and BCA students preparing for software engineering internships and APM/PM roles, while staying useful for self-taught developers and career switchers everywhere.

> Pathloom is not a static roadmap poster. It is being built around live activity, deadline-aware gaps, a re-planning weekly plan, and an opt-in public progress card.

## Current build: Phase 2

The public shell now connects to a private product foundation: Auth.js GitHub OAuth routes, a Supabase migration with RLS, goal-based onboarding, a React Flow skill tree, manual node completion, local progress persistence, dashboard focus and gap views, profile visibility controls, account handles, JSON export, and a clear local-data reset path. The app remains usable without secrets through a browser-local fallback, while the real OAuth and Supabase wiring is ready for environment configuration.

## Stack

Next.js App Router, TypeScript, Tailwind CSS, `next-themes`, Framer Motion, Lucide, Auth.js, Supabase, React Flow, and the managed Manus Webdev runtime. Later phases add provider sync adapters, rules-engine tests, generated share images, and scheduled sync.

## Run locally

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Repository setup

See [PHASE2.md](./PHASE2.md) for the delivered feature set. See [SETUP.md](./SETUP.md) for the Phase 2 OAuth/database setup and future Vercel/cron steps. See [SEO_LAUNCH.md](./SEO_LAUNCH.md) for launch distribution steps.

## Legal templates

The legal pages contain marked placeholders for `{{CONTACT_EMAIL}}`, `{{OWNER_NAME}}`, `{{CITY_STATE}}`, and `{{LAST_UPDATED}}`. They are templates for review by the individual operator and **not legal advice**. Replace the placeholders and have the documents reviewed before launch.

## Roadmap

1. Phase 1 — public shell, design system, consent, legal, SEO foundation.
2. Phase 2 — Auth.js, goal picker, Supabase schema, onboarding, real skill tree, manual progress. **Complete.**
3. Phase 3 — GitHub/Codeforces/LeetCode adapters, automated progress rules, activity snapshots, and scheduled sync.
4. Phase 4 — public profiles, next/og share card, share sheet, full SEO pages.
5. Phase 5 — security, accessibility, Lighthouse tuning, docs, and production deployment.

## License

MIT. See [LICENSE](./LICENSE) when the project license file is added.
