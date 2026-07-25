# CompSoc.ie

University of Galway CompSoc website. TanStack Start (React, Vite), **static build (SSG)** for Cloudflare Pages.

## Commands

```bash
# Install
bun install

# Dev
bun run dev

# Build (output: dist/client)
bun run build

# Build and deploy to Cloudflare Pages
bun run deploy

# Lint & format
bun run lint
bun run format
bun run check

# Tests
bun run test
```

Use `npm run <script>` if Bun is not available.

## Docs

Detailed documentation lives in **[/docs](docs/)** (not part of the build):

- [Active Section Provider](docs/active-section-provider.md) — how scroll/hover/tap active state works
- [Project structure](docs/project-structure.md) — layout, conventions, key files
- [Design tokens](docs/design-tokens.md) — section variants, CSS sync, animation
- [Deployment](docs/deployment.md) — Cloudflare Pages (SSG, build output `dist/client`)

## Stack

- **React 19** + **Vite 8** + **TanStack Start** (built-in static prerendering)
- **TanStack Router** (file-based routes), **TanStack Query**
- **Tailwind CSS v4**, **Motion**, **Base UI** + CVA
- **Cloudflare Pages** (static; Wrangler uploads `dist/client`)

## Adding UI components

This project uses Base UI; for shadcn-style components see [.cursorrules](.cursorrules). Example:

```bash
pnpm dlx shadcn@latest add button
```
