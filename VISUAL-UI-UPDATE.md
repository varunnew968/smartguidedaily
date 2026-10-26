# SmartGuideDaily — Editorial Visual UI Update

This update gives the existing site a photo-led editorial layout inspired by the supplied magazine reference. It keeps the existing Next.js app, routes, guide content, tool pages, admin login, API routes, metadata, sitemap/robots setup, and AdSense integration in place.

## What changed

- Homepage: three-column editorial layout with a featured guide, a most-recent list, and additional guide cards.
- Topic discovery: category cards use distinct illustrative images with responsive crops.
- Guides: article cards, search results, related guides, and article detail pages include cover imagery.
- Tools: featured utility cards, the tools directory, and individual tool pages include category-matched photographic imagery while preserving the tool action and existing routes.
- Admin: article form has an optional per-article cover image URL.
- Image security: the Next.js image remote host is restricted to `images.unsplash.com`; the article API also validates custom cover URLs as HTTPS URLs on that host.

## Per-article cover images

By default, a curated image is selected from the article title, slug, and category. In the admin dashboard, an editor may enter a direct `https://images.unsplash.com/...` image URL to override the default.

The project does not download or store images locally. It loads the selected image from the Unsplash image CDN. Replace images with assets you have the right to use if your content or licensing requirements call for different sources.

## Existing Supabase database

For an existing Supabase project, run this once in the Supabase SQL Editor before saving custom cover URLs:

```sql
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS cover_image_url text;
```

The migration file is `supabase/migrations/20261026_add_post_cover_image_url.sql`. The updated `supabase/schema.sql` includes the column for fresh installations. If the migration has not been run, leave custom cover image URLs blank; automatic curated images continue to work.

## Run locally

```powershell
npm install
npm run dev
```

Open `http://localhost:3000`.

Before deploying, check:

```powershell
npm run lint
npm run build
```

## Verification performed in the packaging environment

- TypeScript/TSX syntax transpilation passed for changed application, component, API, and config files.
- CSS parser validation passed for `app/globals.css`.
- Full dependency-aware lint and Next.js production build were not run because project dependencies are not installed in this packaging environment.
- The remote Unsplash CDN could not be reached from this environment for a live image response check. Image rendering should be verified locally with internet access.

No GitHub push or Vercel deployment was performed.
