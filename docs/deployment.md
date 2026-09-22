# Deployment (Cloudflare Pages, SSG)

The app is built as a **static site (SSG)**. Build output is **`dist/client`** — prerendered HTML and assets. Deploy with **Wrangler** (Cloudflare CLI). Static requests are [unlimited on the free plan](https://developers.cloudflare.com/pages/platform/limits/).

## Local build

```bash
bun run build
```

Output: **`dist/client`** (and `dist/server`; only `dist/client` is deployed).
The build first refreshes `public/events.json` from the University Societies portal. If the portal response is unavailable or invalid, the build stops and the existing deployment remains live.
It also rewrites `public/events-upcoming.json` on every run: the events that have not ended yet. The Events page's default Upcoming tab fetches only that small file; the full history in `events.json` is fetched the first time someone opens Past. Because "upcoming" depends on the clock, rebuild after an event ends if you want it to drop off the Upcoming tab before the next deploy (the page also filters by the visitor's clock, so ended events never show as upcoming).

## Cloudflare Pages (Git integration)

1. Connect the repo to Cloudflare Pages.
2. **Build settings:**
   - **Framework preset:** React (Vite) or None.
   - **Build command:** `bun run build` (or `npm run build` if Bun isn’t available).
   - **Build output directory:** `dist/client`
   - **Root directory:** `/` (or leave default).
3. Deploy. Pages runs the build and uploads `dist/client`.

If the build environment doesn’t have Bun, use **Build command:** `npm run build` and add a `package-lock.json` for reproducible installs.

## Deploy with Wrangler (CLI)

1. Install deps and log in once: `bunx wrangler login`
2. Build and deploy: `bun run deploy` (runs `build` then `wrangler pages deploy dist/client`)
3. First time: create project if needed: `bunx wrangler pages project create compsoc-ie` (match `name` in wrangler.jsonc)

## Config

- **Vite:** `vite.config.ts` — TanStack Start's built-in static prerenderer with `crawlLinks`.
- **wrangler.jsonc** — Cloudflare Pages: `name` (`compsoc-ie`), `pages_build_output_dir` = `./dist/client`. Used by `wrangler pages deploy` and by the dashboard when using the config file.
- **`public/_headers`** — Cloudflare Pages response headers. Content-hashed files directly under `/assets/` and the versioned fonts under `/fonts/` are served `immutable` for a year; everything else keeps Cloudflare's default revalidation. Files under `public/assets/img/` are not content-hashed, so the `/assets/:file` rule deliberately matches only one path segment. Ignored by GitHub Pages.
- **Trailing slashes** — every page is prerendered as `<route>/index.html`, which static hosts serve at `<route>/` and redirect to from `<route>`. The router uses `trailingSlash: "always"` and `seo()` emits canonical URLs in the same form, so links, canonicals and `public/sitemap.xml` all point at the URL that returns 200. Keep new sitemap entries in that form.
