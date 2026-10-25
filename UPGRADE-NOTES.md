# Upgrade notes — SmartGuideDaily

This update is intended to be applied to the existing source repository connected to the current Vercel project. It is not intended to create a second website or AdSense property.

## Main updates

- Added `/tools` and 16 individual interactive browser tools.
- Improved homepage sections and the mobile navigation.
- Added Terms of Use and Editorial Policy pages.
- Improved contact-message preparation, privacy explanations, sitemap coverage, and blog search.
- Added a root-level `/ads.txt` route that matches the AdSense client ID configured in the deployment and made the AdSense script configuration consistent.
- Added route revalidation after article publishing/deletion so blog pages and the sitemap refresh after an admin change.

## Before production deployment

1. Confirm the publisher ID shown in AdSense → Account → Settings → Account information matches the ID used in `app/layout.tsx`, `components/AdSlot.tsx`, and `NEXT_PUBLIC_ADSENSE_CLIENT`. The supplied source defaults to `ca-pub-6633143653612883`; the `/ads.txt` route follows the configured value. Verify `/ads.txt` after deployment.
2. Keep the existing Vercel project and environment variables. Do not overwrite `.env.local` or commit production secrets.
3. Configure `NEXT_PUBLIC_CONTACT_EMAIL` to an inbox you monitor if you want the direct-email button on `/contact` enabled.
4. Run `npm install`, `npm run typecheck`, `npm run lint`, and `npm run build` in an environment with access to the npm registry before pushing to the connected repository.
5. After deployment, verify `/ads.txt`, `/robots.txt`, `/sitemap.xml`, `/tools`, the tool pages, blog search, and the admin publish workflow.

## Validation performed for this ZIP

- All 35 TypeScript/TSX files passed a TypeScript transpile/syntax check.
- All 16 tool slugs have matching runner cases.
- The ZIP structure will be checked after packaging.
- A full dependency installation and Next.js production build could not be run in the build environment because the npm registry request failed with a DNS/network error (`EAI_AGAIN`). Run the production build locally before deploying.
