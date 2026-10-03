# Pathloom Phase 5

Phase 5 makes Pathloom ready for a first managed production deployment without changing the quiet, editorial product language established in the public shell.

## Delivered

- **Security headers:** Next responses now include a CSP, strict referrer policy, MIME-sniffing protection, DNS prefetch policy, cross-domain policy, Permissions-Policy, and production HSTS. The policy intentionally omits `X-Frame-Options` and allows `frame-ancestors *` so the managed Preview can remain embedded.
- **API hardening:** `POST /api/sync` accepts JSON only, caps payloads at 64 KiB and progress entries at 200, accepts only supported goals, strips control characters from public handles, returns generic errors, and uses `Cache-Control: no-store`. The scheduled callback fails closed on malformed tickets and returns generic errors without stack traces.
- **HTTPS auth cookies:** Auth.js session, callback, and CSRF cookies use `SameSite=None; Secure` when `NEXTAUTH_URL` or `NEXT_PUBLIC_SITE_URL` is an HTTPS origin, while local HTTP development keeps a valid `SameSite=Lax` fallback.
- **Accessibility:** Shared layout includes a keyboard skip link; workspace navigation exposes a landmark and `aria-current`; status and warning states announce updates; icon-only affordances are labelled or hidden from assistive technology; and reduced-motion CSS remains active.
- **Performance and reproducibility:** A `pnpm check` script runs typecheck, lint, and production build. The repository has a pinned pnpm toolchain, a health route at `/health`, and a committed Dockerfile that installs from the lockfile, builds Next, honors `PORT`, and starts the production server.
- **SEO safety:** Canonical, Open Graph, and sitemap absolute URLs are emitted only when `NEXT_PUBLIC_SITE_URL` is a real configured origin. Private app routes remain disallowed and public profile snapshots remain opt-in and expiring.

## Release contract

The managed Webdev deployment uses the root `Dockerfile` and an unauthenticated `/health` probe. The container owns dependency installation, build, and startup; durable profile and sync data still belongs in Supabase rather than the ephemeral container filesystem.

## Operator-owned launch actions

Before a public launch, replace the legal template placeholders, configure production OAuth and Supabase secrets, run all migrations, set `NEXT_PUBLIC_SITE_URL` and `NEXTAUTH_URL` to the actual production origin, configure the scheduled sync target only after `/health` is green, and complete the Search Console/Bing verification described in `SEO_LAUNCH.md`.
