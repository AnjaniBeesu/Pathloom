# Pathloom setup guide

Phase 2 is implemented and runs with a browser-local fallback when credentials are absent. The steps below enable real GitHub OAuth and Supabase persistence; do not commit secrets.

## 1. GitHub OAuth App

1. Sign in to GitHub and open **Settings → Developer settings → OAuth Apps**.
2. Select **New OAuth App**.
3. Set **Application name** to `Pathloom local`.
4. Set **Homepage URL** to `http://localhost:3000`.
5. Set **Authorization callback URL** to `http://localhost:3000/api/auth/callback/github`.
6. Create the app, then copy the Client ID into `GITHUB_ID`.
7. Select **Generate a new client secret** and copy it once into `GITHUB_SECRET`.
8. Create a separate production OAuth app after the Vercel URL exists. Set its Homepage URL to the production URL and callback to `https://YOUR_DOMAIN/api/auth/callback/github`.
9. Set `NEXTAUTH_URL` to the same production URL and generate a fresh `NEXTAUTH_SECRET`.

Use only the minimum requested permissions: `read:user` and public repository access. Never commit secrets.

## 2. Supabase

1. Open Supabase and choose **New project**.
2. Select the free plan, choose a nearby region, and save the database password in a password manager.
3. In **Project Settings → API**, copy the Project URL to `NEXT_PUBLIC_SUPABASE_URL` and the anon public key to `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
4. Add the service-role key only to the server environment as `SUPABASE_SERVICE_ROLE_KEY`; never expose it in client code.
5. Open **SQL Editor → New query** and run the versioned migration in `supabase/migrations/001_initial.sql`.
6. Confirm RLS is enabled on every application table. Public profiles must be exposed only through a restricted view.

## 3. Local secrets

Copy `.env.example` to `.env.local`, fill only the variables required for the phase you are running, and use a long random value for `NEXTAUTH_SECRET` and `CRON_SECRET`. Do not paste secrets into source files or chat.

## 4. Vercel environment variables

1. Open the Vercel project **Settings → Environment Variables**.
2. Add each variable from `.env.example` for **Production**, **Preview**, and **Development** as appropriate.
3. Set `NEXT_PUBLIC_SITE_URL` to the canonical public URL.
4. Redeploy after saving so the new values are available to the runtime.

## 5. GitHub Actions cron secret

1. Open the GitHub repository **Settings → Secrets and variables → Actions**.
2. Select **New repository secret**.
3. Set the name to `CRON_SECRET`.
4. Generate a separate random value and add the exact same value to Vercel as `CRON_SECRET`.
5. The future `.github/workflows/sync.yml` will send `x-cron-secret` to `POST /api/cron/sync` every six hours.

Phase 2 routes are wired now. Without OAuth or Supabase environment values, onboarding, the dashboard, tree completion, settings, and JSON export still work locally through the first-party `pathloom-phase2-state` browser key.

## 6. Phase 3 sync and scheduler

1. Run `supabase/migrations/002_sync.sql` after `001_initial.sql` to create `sync_targets` and `sync_runs`.
2. Store only public provider handles in the `accounts_json` column. Provider reads are server-side and use public endpoints; no provider password or private token is accepted.
3. After a successful published deployment, create a UTC Heartbeat schedule targeting `POST /api/scheduled/sync`. The handler validates the platform `app_session_id` cron ticket and resolves its `taskUid` before reading a `sync_targets` row.
4. Keep the schedule disabled until the published health check is green. A local `POST /api/sync` is available from the dashboard through **Sync now** and does not require a scheduler.

Phase 3 adapters are conservative: provider outages produce warnings, and sync evidence can complete a qualifying node but never downgrades a manual completion.

## 7. Phase 4 public profiles

Run `supabase/migrations/003_public_profiles.sql` after the Phase 3 migration when the authenticated Supabase write path is enabled. The current local-first Settings flow already supports opt-in portable share links without external credentials. Sharing is off by default and only includes display name, username, goal, deadline, completed node IDs, and a timestamp. Provider handles, snapshots, and private workspace data are excluded.

Public profile pages are available at `/u/:username?share=...` for valid shared snapshots. They return a real not-found response when the payload is missing or invalid, and private profile URLs are not added to the sitemap.


## 8. Phase 5 production deployment

1. Set `NEXT_PUBLIC_SITE_URL` and `NEXTAUTH_URL` to the actual HTTPS production origin. Do not leave the example domain in a live environment.
2. Run `pnpm check` before pushing a release. The root `Dockerfile` installs the pinned pnpm version from `pnpm-lock.yaml`, builds Next, and starts `pnpm start` on the platform-provided `PORT`.
3. In the managed Webdev project, use the container deployment contract with health path `/health`. The health response is unauthenticated and returns `{ "ok": true, "service": "pathloom" }` with `Cache-Control: no-store`.
4. Run `supabase/migrations/003_public_profiles.sql` after the earlier migrations. Keep the service-role key server-only and verify RLS policies before enabling durable public profiles.
5. Configure production GitHub OAuth callback URL as `https://YOUR_DOMAIN/api/auth/callback/github`. The Auth.js cookies use `SameSite=None; Secure` when the public origin is HTTPS, which is required for embedded Preview and cross-site OAuth return flows.
6. After the first successful deployment, verify `/health`, public SSR pages, `/robots.txt`, `/sitemap.xml`, `/api/auth/providers`, and a malformed private profile URL before enabling any recurring sync schedule.

Phase 5 is complete in source and deployment contract. Production secrets, legal placeholders, migration execution, and search-engine ownership verification remain operator-owned launch actions.
