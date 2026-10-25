# SmartGuideDaily — existing-site upgrade

This is the source project for SmartGuideDaily. It preserves the existing Next.js App Router blog, Supabase-backed article admin, the AdSense publisher configuration already present in the supplied source, and adds a dedicated free-tools library with 16 interactive tools.

## What's included

- Responsive homepage, desktop/mobile navigation, footer, and accessible skip link.
- Searchable/filterable `/tools` directory and individual, indexable tool pages.
- 16 working browser-based tools: BMI, age, percentage, GST, discount, EMI, compound interest, word counter, text case converter, JSON formatter/validator, password generator, random number generator, length converter, temperature converter, image compressor, and to-do list.
- Existing blog, category pages, article SEO metadata, related articles, seed content, and publishing dashboard.
- About, Contact, Privacy, Terms, Disclaimer, and Editorial Policy pages.
- Updated sitemap, robots rules, tool schema metadata, and an `/ads.txt` route that formats the publisher ID used by the site.
- Optional manual AdSense placements. No empty manual ad units are rendered unless a real ad-slot ID is configured; AdSense Auto ads can still operate when enabled in the AdSense account.

## Important: update the current Vercel project, don't create a new one

The website is already deployed. This ZIP is a source-code update, not a separate deployment. **Keep the existing Vercel project and its environment variables.** Do not delete the current project or remove the site from AdSense.

1. Download and extract this ZIP.
2. Test it locally with the commands below.
3. Update the source in the same GitHub repository currently connected to your existing Vercel project. You can replace the tracked application files with these updated files, review the diff, then commit and push to the connected branch.
4. Vercel should deploy the commit to the same existing project. Confirm the deployment preview works before promoting it to production if preview deployments are available.

If the GitHub repository already has content changes not present in this ZIP, merge carefully instead of overwriting them blindly.

## Run locally on Windows

Requirements: Node.js 20.9+ and npm.

```cmd
npm install
copy .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. Main areas to test:

- `/` — homepage
- `/tools` — searchable tools directory
- `/tools/emi-calculator` — example calculator
- `/blog` — article list and search
- `/admin` — publisher dashboard (requires the variables below)

Before deployment, also run:

```cmd
npm run typecheck
npm run lint
npm run build
```

## Environment variables

Keep the values already configured in the current Vercel project. The `.env.example` file documents them; it is not a replacement for existing production values.

- `NEXT_PUBLIC_SITE_URL`: the canonical public URL. The current fallback is `https://smartguideddaily.vercel.app`.
- `NEXT_PUBLIC_SITE_NAME`: site label.
- `NEXT_PUBLIC_ADSENSE_CLIENT`: the AdSense client ID. This source currently contains `ca-pub-6633143653612883` because that ID was present in the supplied project.
- `NEXT_PUBLIC_ADSENSE_SLOT_CONTENT`, `NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR`, `NEXT_PUBLIC_ADSENSE_SLOT_FEED`: optional real ad-unit slot IDs. Leave blank until these units are created in AdSense.
- `NEXT_PUBLIC_CONTACT_EMAIL`: optional monitored contact address; enables the direct email-app button on the Contact page.
- `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`: needed to persistently publish posts from the admin dashboard. The service-role key must remain server-only and must never be exposed in client code.
- `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET`: set a strong, unique admin password and a random secret of at least 32 characters.

Do not commit `.env.local` or production secrets to GitHub. Adding/changing Vercel environment variables requires a redeployment.

## Supabase and article publishing

The built-in seed articles display without a database. To save edits or publish from `/admin`, configure Supabase and run `supabase/schema.sql` in its SQL Editor. Set the Supabase URL and service-role key in Vercel server environment variables. The admin panel is a simple single-admin workflow; before expanding it to multiple writers or higher-risk use, add rate limiting, audit logging, and stronger authentication controls.

## AdSense notes

- The site-level AdSense script and account metadata are configured in `app/layout.tsx` using the publisher ID already present in the supplied source.
- `/ads.txt` is served as plain text by `app/ads.txt/route.ts` and derives the publisher number from `NEXT_PUBLIC_ADSENSE_CLIENT` (falling back to the ID present in the supplied source). Verify it matches the publisher ID shown in your AdSense account before deploying. The `ads.txt` value uses the `pub-` prefix, not `ca-pub-`.
- After deployment, open `https://smartguideddaily.vercel.app/ads.txt` and confirm the correct line is displayed as plain text. In AdSense → Sites, use the ads.txt status/check-for-updates controls if needed; crawling and status updates can take time.
- A publisher ID alone does not create manual ad units. Set the optional ad-slot variables only after creating the corresponding ad units. Auto ads can be configured from AdSense.
- Do not click your own ads or ask others to do so. Follow the current AdSense policies and consent/privacy requirements for the audiences you serve.
- The presence of this code does not mean Google has approved the website, and it does not guarantee revenue.

## Search and indexing

The sitemap includes the main pages, categories, published articles, and tools. In Google Search Console, submit `https://smartguideddaily.vercel.app/sitemap.xml` after deploying. Indexing and ranking are determined by Google and are not guaranteed.

## Content quality and limitations

The tools run client-side; the to-do list uses local browser storage, while the image compressor creates a JPEG download in the browser. Tool results are estimates and include limitations where relevant. Review calculators and content carefully before relying on them. Update the Privacy Policy to match actual service configurations, and configure a monitored email in Vercel before promising a direct response channel. The contact helper can copy a message even when direct email is not configured.
