# Pathloom setup guide

Phase 1 does not require external accounts. The steps below are the exact setup path for the integrations planned in later phases.

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
5. Open **SQL Editor → New query** and run the versioned migration in `supabase/migrations/001_initial.sql` when Phase 2 adds it.
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

These later integrations are not wired in Phase 1.
