# Pathloom Phase 1 Outcomes

## 1. Scaffold and design system
- Create a Next.js App Router + TypeScript application in `/home/ubuntu/pathloom` with Tailwind CSS and the Phase 1 dependencies `next-themes`, `framer-motion`, and `lucide-react`.
- Add a pinned package manager/lockfile, scripts for development, build, lint, format, and type checking, a clean `.gitignore`, and `.env.example` documenting `NEXTAUTH_URL`, `NEXTAUTH_SECRET`, `GITHUB_ID`, `GITHUB_SECRET`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `CRON_SECRET`, `GEMINI_API_KEY`, and `NEXT_PUBLIC_SITE_URL`.
- Define light/dark CSS variables for neutral backgrounds, text, secondary text, hairline borders, one blue accent, focus ring, radii, spacing, and shadows. Use `-apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", sans-serif` only.
- Configure `next-themes` with system default, no flash on load, class-based switching, and smooth color transitions. Support responsive layouts from 360px to 1920px, with approximately 1080px maximum content width and generous desktop spacing.
- Build a 52px translucent sticky header with logo, desktop nav for How it works/Roadmaps/FAQ, theme toggle, Sign in ghost button, Get started accent button, and a clean mobile sheet menu. Build a calm multi-column footer with Product/Resources/Legal/Contact, GitHub link, copyright, Made in India, theme toggle, and Cookie settings.
- Use a distinctive Pathloom woven-path mark made from two offset rounded paths meeting at a small blue node; use restrained 8–16px fade/rise motion, 200ms color transitions, and respect `prefers-reduced-motion`. Do not use gradients, neon, generic icon grids, stock hero illustrations, or confetti.

## 2. Landing page and product preview
- Build the landing page with one large confident hero headline, one supporting line, one primary CTA, and below it a large code-built live-looking skill-tree render in a rounded frame.
- The skill-tree render must show a goal header, progress summary, connected DSA/Python/Projects/Applications nodes, completion states, and a current focus node. It is a presentational preview in Phase 1 and must not claim live sync or mutate fake data.
- Add concise copy explaining live tracking, deadline-aware planning, and public/shareable progress without hype language.
- Add an editorial three-step section: choose a goal, connect your work, and follow the next step; do not use a generic three-column icon feature grid.
- Add a restrained closing CTA that points toward `/onboarding`, with a safe Phase 1 explanation if onboarding is not wired yet. Add home metadata, canonical behavior, Open Graph/Twitter defaults, and Organization/WebSite/SoftwareApplication JSON-LD.

## 3. Public routes and intentional Phase 1 states
- Implement server-rendered metadata-backed pages for `/how-it-works`, `/roadmaps`, `/roadmaps/software-engineer-intern`, `/roadmaps/apm`, `/about`, `/contact`, `/changelog`, and `/faq`.
- Roadmap pages must contain useful, honest preview content for the two launch roles and explain that live tracking is the product difference. `/faq` must include FAQPage JSON-LD. Roadmap pages must include BreadcrumbList JSON-LD and unique titles/descriptions.
- Create intentional, design-consistent empty states for `/app`, `/app/tree`, `/app/settings`, `/onboarding`, and `/u/[username]`; do not expose private or fabricated user data.

## 4. Legal and privacy templates
- Create readable, linked pages at `/privacy-policy`, `/terms-and-conditions`, `/cookie-policy`, `/acceptable-use`, `/disclaimer`, and `/data-deletion`.
- Use visible placeholders `{{CONTACT_EMAIL}}`, `{{OWNER_NAME}}`, `{{CITY_STATE}}`, and `{{LAST_UPDATED}}` rather than inventing contact or owner details.
- Cover India’s DPDP Act 2023 and GDPR-friendly principles: lawful basis, collected data, third-party processors, retention, access/export/correction/deletion, grievance contact, age eligibility, third-party trademarks, and no guarantee of employment. Include disclaimer that Pathloom is not affiliated with LeetCode, Codeforces, GitHub, X, or LinkedIn.
- Add a README note that these legal documents are templates requiring owner review and are not legal advice.

## 5. Cookie consent and analytics boundary
- Implement a bottom-center floating cookie card with equal-weight `Accept all` and `Reject non-essential` actions plus `Customise`.
- Provide Essential (always on), Analytics, and Preferences categories. Persist the decision in a first-party cookie and local storage, re-asking after 12 months.
- Do not load analytics or non-essential scripts before consent. Provide a consent-aware boundary ready for Vercel Web Analytics later.
- Add a footer Cookie settings action to reopen the preferences. All controls must be keyboard accessible and communicate state changes.

## 6. SEO, route manifest, and quality states
- Add unique metadata, canonical handling, Open Graph, Twitter `summary_large_image`, and one semantic `h1` per page.
- Add `app/sitemap.ts` and `app/robots.ts`; disallow `/app`, `/api`, and `/onboarding`, and keep private profiles conservative until opt-in data exists.
- Add `/manus-routes.json` with every current public, app, legal, and dynamic page route, excluding APIs, assets, system endpoints, and 404-only routes.
- Add custom `not-found.tsx`, `error.tsx`, and `loading.tsx` plus route-level empty states in the Pathloom design language.
- Add safe security headers where compatible with embedded Preview; do not set `X-Frame-Options: DENY/SAMEORIGIN` or restrictive frame-ancestors rules.

## 7. Documentation and future-phase handoff
- Add `README.md` with what Pathloom is, screenshots placeholder, stack, setup overview, roadmap, MIT license, and a prominent legal-template review note.
- Add `SETUP.md` with exact future steps for GitHub OAuth callbacks (localhost and production), Supabase project and SQL migration, secret generation, Vercel environment variables, and GitHub Actions cron secret; clearly mark integrations not wired in Phase 1.
- Add `SEO_LAUNCH.md` with Google Search Console verification, sitemap submission, key-page indexing, Bing Webmaster Tools, Product Hunt, Reddit (`r/developersIndia`, `r/cscareerquestionsIN`), dev.to, Hashnode, LinkedIn, and GitHub profile/repo backlink steps.
- Add a versioned `data` directory placeholder for future goal/node seed data and document the later Supabase migration.

## 8. Validation and delivery
- Register TypeScript diagnostics before code editing and resolve actionable diagnostics after each major file batch.
- Run formatting, linting, type checking, and a production build from `/home/ubuntu/pathloom`.
- Start the development server on configured port 3000 and verify HTTP 200 for `/`, `/how-it-works`, `/roadmaps`, `/faq`, all legal pages, `/manus-routes.json`, `/sitemap.xml`, and `/robots.txt`.
- Inspect desktop and mobile Preview for hierarchy, overflow, focus visibility, responsive navigation, tree preview legibility, footer layout, and cookie-banner placement.
- Verify system theme behavior, no-flash loading, cookie persistence/reopen behavior, no analytics before consent, valid route manifest, representative metadata/JSON-LD, visible legal placeholders, and no committed secrets or user data.

## Phase 3 — provider evidence loop

- Add defensive server-side adapters for public GitHub profile/events, Codeforces rating/submissions, and LeetCode public GraphQL stats; bound provider requests with timeouts, normalize results into provider snapshots, and surface provider-specific warnings instead of failing the whole sync.
- Add an on-demand `POST /api/sync` route and dashboard Activity sync panel. The panel must show connected provider handles, sync status, last-sync time, warning text, qualified evidence-rule count, and a disabled Sync now action when no public handle is configured.
- Add conservative evidence rules for the SWE intern and APM / PM intern goals. A qualifying provider threshold may complete a node, but sync must never downgrade a previously completed or manually completed node; persist the latest snapshots, evidence, warnings, and five most recent runs in the first-party browser state.
- Add Supabase `sync_targets` and `sync_runs` tables with RLS in `supabase/migrations/002_sync.sql`, and add `POST /api/scheduled/sync` with platform `app_session_id` JWT verification, scheduled identity lookup, task-target lookup by returned `taskUid`, idempotent retry handling, and a successful accepted no-op when Supabase or a target is not configured.
- Update Phase 3 documentation and setup instructions, keep `/manus-routes.json` limited to page routes, and verify TypeScript, lint, production build, provider sync behavior, scheduled-auth rejection, key route responses, and desktop/mobile dashboard rendering.

## Phase 4 — opt-in public profiles and sharing

- Replace the private-profile placeholder with an SSR public snapshot route at `/u/:username`; render meaningful goal, deadline, completion percentage, milestone cards, and privacy copy only when the user intentionally shares a valid payload, otherwise return a real not-found response with noindex metadata.
- Add a privacy-safe client share sheet in Settings. Sharing must require the explicit public-profile toggle and a valid username, and the portable payload may contain only display name, username, goal, deadline, completed node IDs, and share timestamp; provider handles and private workspace data must never enter the link.
- Add a generated `/u/:username/opengraph-image` share card and route-specific title, description, canonical, Open Graph, and Twitter metadata for valid shared profiles. Keep app, API, and onboarding paths disallowed, allow opted-in `/u/` URLs, and do not add private profile URLs to the sitemap.
- Add `supabase/migrations/003_public_profiles.sql` with a durable opt-in public profile table and RLS policies for owner management plus public reads only when `is_public = true`; document that the portable share path works without Supabase while the migration is ready for durable account-backed publishing.
- Every generated portable share token must expire after 30 days. Turning sharing off prevents new links; copied links remain available until expiry, and the share sheet must explain this before copy/share actions.

## Phase 5 — security, accessibility, Lighthouse, docs, and production deployment

- Harden public responses without breaking embedded Preview: add a documented Content-Security-Policy and security-header set that does not send `X-Frame-Options` or a restrictive `frame-ancestors` policy, preserve same-origin app behavior, and keep public profile share links, OG images, OAuth redirects, and static assets working.
- Validate the sync and scheduled API boundaries: reject oversized or malformed JSON with safe generic errors, accept only the two supported goals, bound account-handle and progress input, return `Cache-Control: no-store`, and keep scheduled JWT/HMAC verification fail-closed without leaking stack traces or raw provider errors.
- Complete accessibility hardening across shared UI: add a keyboard skip link and main landmark, explicit workspace navigation semantics and active state, visible focus treatment, labelled controls, useful status announcements, and reduced-motion-safe transitions; preserve mobile navigation and cookie preferences.
- Complete launch performance and reproducibility work: use pinned Node/pnpm toolchain inputs, add a `check` script, keep the route manifest synchronized, add an unauthenticated `/health` route, and provide a committed Dockerfile that installs from the lockfile, builds Next, honors `PORT`, and starts the production server.
- Remove guessed SEO origins until a real production URL is configured; after publication, set the actual canonical/OG/sitemap origin, verify meaningful SSR HTML, metadata, robots, sitemap, profile 404s, and OG images with raw HTTP requests.
- Update README, setup, SEO launch, and Phase 5 documentation with deployment configuration, security assumptions, accessibility/performance evidence, Supabase/OAuth requirements, and the remaining operator-owned launch actions; commit and push the checkpoint, configure the managed deploy contract, publish it, and verify the resulting public URL and health endpoint.
