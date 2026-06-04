# Deployment

## Stack

- Astro
- Tailwind CSS
- TypeScript
- pnpm
- Cloudflare Pages

## Build And Preview

Local commands:

- `pnpm install`
- `pnpm dev`
- `pnpm build`
- `pnpm preview`
- `pnpm check`

`pnpm check` runs format check, lint, and build.

## Production Target

- Production domain: `https://cflwash.com`
- Preview target: Cloudflare Pages

The Astro config already sets the production site URL and `trailingSlash: 'never'`.

## Environment Variables

The site treats analytics as optional.

Supported env vars:

- `PUBLIC_GA4_MEASUREMENT_ID`
- `PUBLIC_CF_WEB_ANALYTICS_TOKEN`

If neither is set, analytics scripts do not load.

## Indexing And Crawlability

- Shared layout generates canonical URLs from the production site URL.
- Shared layout supports `noindex, follow` on utility pages.
- `public/robots.txt` allows normal crawling and references the sitemap URL.
- `/thank-you` must remain noindex.

## Deployment Checks

Before a release, confirm:

- Production build passes
- Canonical URLs resolve to the production domain
- Sitemap output exists in production
- Robots file points at the live sitemap
- Analytics only load when configured
