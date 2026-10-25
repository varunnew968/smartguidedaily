# SmartGuideDaily

A Next.js App Router blog starter for India and international readers. Includes a responsive homepage, article/category/search pages, metadata, sitemap, robots.txt, six seed articles, an admin publishing UI, and optional AdSense slots.

## Requirements

- Node.js 20.9+ (recommended: current Node.js LTS)
- npm
- A Supabase project for persistent article publishing
- A Vercel account for deployment

## Run locally on Windows

1. Extract the ZIP.
2. Open Command Prompt in the `smartguidedaily` folder.
3. Run:

```cmd
npm install
copy .env.example .env.local
```

4. Edit `.env.local` in Notepad. Set a real `NEXT_PUBLIC_SITE_URL` later; for local development you can use `http://localhost:3000`.
5. Set `ADMIN_PASSWORD` to a strong, unique password.
6. Set `ADMIN_SESSION_SECRET` to at least 32 random characters.
7. Configure Supabase as described below.
8. Run:

```cmd
npm run dev
```

Open `http://localhost:3000`. Admin dashboard: `http://localhost:3000/admin`.

## Configure Supabase (required to publish persistently)

The included seed articles are built into the app and display without a database. Admin publishing requires Supabase so posts are saved persistently and available to visitors.

1. Create a project at https://supabase.com/.
2. Open SQL Editor and run `supabase/schema.sql`.
3. In Project Settings → API, copy the Project URL and the **service_role** key.
4. Set `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in `.env.local`.
5. Set `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET`. Never commit `.env.local` or expose the service role key in browser code.
6. Restart the dev server after changing environment variables.

The admin login uses a signed, HTTP-only, same-site cookie with an 8-hour expiry. This is a simple single-admin setup. For a production multi-author site, add stronger identity management, rate limiting, audit logging, and an established CMS workflow.

## Deploy to Vercel

1. Push the extracted project to a new GitHub repository.
2. In Vercel, choose **Add New → Project**, import the repository, and deploy using the default Next.js settings.
3. In Vercel Project → Settings → Environment Variables, add:
   - `NEXT_PUBLIC_SITE_URL` = your canonical production URL (include `https://`)
   - `NEXT_PUBLIC_SITE_NAME` = `SmartGuideDaily`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY` (server-only secret)
   - `ADMIN_PASSWORD`
   - `ADMIN_SESSION_SECRET` (32+ random characters)
   - `NEXT_PUBLIC_ADSENSE_CLIENT` only after you have an AdSense publisher ID
4. Redeploy after adding or changing environment variables.
5. Add your custom domain in Vercel and update `NEXT_PUBLIC_SITE_URL` to that domain. Do not use the placeholder `.example` URL in production.

## Google Search setup

- Open Google Search Console and verify the custom domain.
- Submit `https://YOUR-DOMAIN/sitemap.xml`.
- Inspect key URLs and request indexing where appropriate.
- Ensure published posts have original, helpful content and descriptive titles.
- Search Console does not guarantee indexing or rankings.

## Google AdSense

- Apply only when the site is ready for review and complies with current publisher policies.
- Replace the placeholder publisher ID with your actual `ca-pub-...` value only after receiving it.
- This starter's AdSlot component is only a placeholder until an ad client is configured. You must also create real ad units and insert the correct ad slot IDs before production use; do not click your own ads.
- Review current Google consent and privacy requirements for the regions you serve. The included privacy page is a starter template and must be customised to reflect the site's real practices.
- Ads do not guarantee earnings. Traffic quality, visitor location, niche, ad demand, and policy compliance all affect revenue.

## Affiliate links

- Apply to suitable affiliate programmes and follow each programme's rules.
- Disclose affiliate relationships clearly near relevant links and on pages where required.
- Recommend products honestly and only where they genuinely help the reader.

## Important production notes

- The included starter articles are original drafts intended as a starting point. Fact-check and edit them before publication, especially details that can change.
- The admin API needs rate limiting and ideally a stronger authentication setup before handling sensitive or high-traffic production use.
- Add your real contact email and review legal pages before launch.
- The project uses Markdown-style text rendering without raw HTML, which reduces content-injection risk.
