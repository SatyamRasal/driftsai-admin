# Drifts AI Premium CRM Website

A Next.js + Supabase lead-capture website with:

- product and upcoming-product pages
- interested / inquiry / support forms
- admin dashboard
- editable site settings
- editable legal pages
- audit logs
- SEO metadata, sitemap, robots.txt
- dark / light theme toggle
- Vercel deployment ready

## Required stack

- Node.js 20+
- Supabase project
- Vercel account

## Files to configure

Create a `.env.local` from the example below.

## Local setup

1. Unzip the project.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create your Supabase project.
4. Run `supabase/schema.sql` in the Supabase SQL editor.
5. In Supabase Storage, create a public bucket named `assets`.
6. Copy the `.env.example` file to `.env.local` and fill the values.
7. Start the app:
   ```bash
   npm run dev
   ```

## Admin login

- Email: `admin@driftsai.com`
- Password: set this in your environment variables. If the password contains `#`, quote it in `.env.local` or use `ADMIN_PASSWORD_HASH`.

These are read from environment variables in production. Change them after launch.

## Deploy to Vercel

1. Push the repository to GitHub.
2. Import the repo in Vercel.
3. Add the environment variables.
4. Deploy.
5. Set the custom domain `driftsai.com` in Vercel.

Important: if your password or secret contains `#`, wrap it in quotes in `.env.local` or store it in Vercel environment variables. Unquoted `#` is treated as a comment by dotenv parsers.

## Supabase environment variables

Use these values in `.env.local` and in Vercel:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD` or `ADMIN_PASSWORD_HASH`
- `ADMIN_SESSION_SECRET`
- `SUPABASE_STORAGE_BUCKET`
- `SUPABASE_URL` only if you need a fallback

## Notes

- Public visitors only write through server actions.
- Admin access is verified server-side by a signed cookie.
- Audit logs record each mutation.
- If you want email notifications, configure SMTP variables.
