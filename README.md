# Pathloom

Pathloom is a living career skill-tree for the work between today and your next role. It is designed first for Indian B.Tech and BCA students preparing for software engineering internships and APM/PM roles, while staying useful for self-taught developers and career switchers everywhere.

> Pathloom is not a static roadmap poster. It is being built around live activity, deadline-aware gaps, a re-planning weekly plan, and an opt-in public progress card.

## Phase 1

The current public shell includes the calm Apple-clean visual system, responsive navigation, system dark mode, a live-looking skill-tree preview, role roadmaps, public information pages, legal templates, SEO foundations, intentional app empty states, and consent controls that block optional analytics until a choice is made.

## Stack

Next.js App Router, TypeScript, Tailwind CSS, `next-themes`, Framer Motion, Lucide, and the managed Manus Webdev runtime. Later phases add Auth.js with GitHub OAuth, Supabase, React Flow, sync adapters for GitHub/Codeforces/LeetCode, rules-engine tests, next/og share images, and GitHub Actions sync.

## Run locally

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Repository setup

See [SETUP.md](./SETUP.md) for the future OAuth, database, Vercel, and cron setup steps. See [SEO_LAUNCH.md](./SEO_LAUNCH.md) for launch distribution steps.

## Legal templates

The legal pages contain marked placeholders for `{{CONTACT_EMAIL}}`, `{{OWNER_NAME}}`, `{{CITY_STATE}}`, and `{{LAST_UPDATED}}`. They are templates for review by the individual operator and **not legal advice**. Replace the placeholders and have the documents reviewed before launch.

## Roadmap

1. Phase 1 — public shell, design system, consent, legal, SEO foundation.
2. Phase 2 — Auth.js, goal picker, Supabase schema, onboarding, real skill tree, manual progress.
3. Phase 3 — GitHub/Codeforces/LeetCode adapters, progress rules, gaps, dashboard, weekly plan.
4. Phase 4 — public profiles, next/og share card, share sheet, full SEO pages.
5. Phase 5 — security, accessibility, Lighthouse tuning, docs, and production deployment.

## License

MIT. See [LICENSE](./LICENSE) when the project license file is added.
