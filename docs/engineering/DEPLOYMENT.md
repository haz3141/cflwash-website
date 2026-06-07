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

`pnpm check` runs formatting, lint, production build, and the production-readiness site audit.

## Production State

- Production domain: `https://cflwash.com`
- Canonical host: `cflwash.com`
- Redirecting alias: `https://www.cflwash.com`
- Cloudflare Pages production URL: `https://cflwash-website.pages.dev`
- Production branch: `main`
- Active integration branch: `dev`
- Tested quote-form preview branch: `preview/quote-form-mvp`

Current branch roles:

- `main` is the current production release.
- `dev` is the integrated quote-form release candidate.
- `preview/quote-form-mvp` represents the tested Cloudflare preview deployment for the quote-form MVP.

Do not treat the quote form as live in production until the release candidate is promoted from `dev` to `main` and the production deployment is verified.

The `www` hostname permanently redirects to the apex domain with a 301 while preserving path suffixes and query strings.

The Astro config sets the production site URL and preserves `trailingSlash: 'never'`.

## Cloudflare Pages Configuration

Production deployments are triggered from `main`.

Preview deployments may be limited by branch-control rules. The quote-form MVP has been tested on the `preview/quote-form-mvp` preview branch without modifying `main`.

Custom domains attached to the Pages project:

- `cflwash.com`
- `www.cflwash.com`

Cloudflare Bulk Redirects handles the `www` to apex redirect.

## Environment Variables

The site treats analytics as configuration-driven.

Supported env vars:

- `PUBLIC_GA4_MEASUREMENT_ID`
- `PUBLIC_CF_WEB_ANALYTICS_TOKEN`

Current production state:

- `PUBLIC_GA4_MEASUREMENT_ID` is configured in Cloudflare Pages production environment variables.
- The live production HTML has been verified to include the GA4 Google tag.
- Cloudflare Web Analytics remains optional.

If neither analytics variable is set, analytics scripts do not load.

Do not hardcode analytics identifiers in source files.

## Indexing And Crawlability

- Shared layout generates canonical URLs from the production site URL.
- Shared layout supports `noindex, follow` on utility pages.
- `public/robots.txt` allows normal crawling and references the live sitemap.
- `/thank-you` remains `noindex, follow`.
- `https://cflwash.com/robots.txt` returns `200`.
- `https://cflwash.com/sitemap-index.xml` returns `200`.

## Verified Production Checks

The following behavior was verified after launch:

- `https://cflwash.com` returns `200`.
- `https://cflwash.com/request-quote` returns `200`.
- `https://www.cflwash.com` returns `301` to `https://cflwash.com/`.
- `https://www.cflwash.com/request-quote` preserves the path while redirecting.
- Query strings are preserved by the `www` redirect.
- Production HTML does not contain the known fake/internal placeholder patterns used by the site audit.
- `/thank-you` contains `noindex, follow`.

## Release Workflow

Feature work:

1. Branch from `dev`.
2. Open PR into `dev`.
3. Squash and merge.

Production release:

1. Validate `dev` with `pnpm check`.
2. Test through a Cloudflare preview deployment when needed.
3. Open a release PR from `dev` to `main`.
4. Use a normal merge commit to preserve the curated `dev` history.
5. Confirm the Cloudflare Pages production deployment.
6. Fast-forward `dev` to `main` after the release so both branches share the release commit.

## Deployment Checks

Before a release, confirm:

- `pnpm check` passes.
- Production build passes.
- The quote-form release candidate on `dev` has been validated locally and in Cloudflare preview.
- Production Cloudflare Pages has quote-form secrets configured separately from preview.
- Canonical URLs resolve to the production domain.
- Sitemap output exists in production.
- Robots file points at the live sitemap.
- `/thank-you` remains noindex.
- Analytics only load when configured.
- Preview branches do not alter the production deployment.
- `www` redirects to the apex domain.
