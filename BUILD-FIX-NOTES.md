# Build fix notes

This archive fixes the deployment errors shown in the Vercel build log.

## Changes

- `app/tools/page.tsx`: correctly reads the Next.js 15 `searchParams` promise and safely passes the `q` query value to the tools directory.
- `components/ToolDirectory.tsx`: adds the optional `initialQuery` prop so the TypeScript prop contract matches the caller.
- `eslint.config.mjs`: uses explicit `.js` entry-point paths matching the module path suggested by Vercel's Node resolver error.
- `app/icon.png` and `app/apple-icon.png`: add the SmartGuideDaily mark as Next.js app-router favicon and Apple touch icon assets.
- `public/brand-mark.png`: includes a reusable 512px brand-mark asset.

## Verify before deploying

From the project root, run:

```bash
npm install
npm run build
```

The dependency installation / production build could not be completed in the preparation environment, so this archive should still be built locally or by Vercel before release.
