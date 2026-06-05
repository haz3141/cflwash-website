# CFL Wash Co. Website

Astro + Tailwind website for CFL Wash Co., a Central Florida exterior cleaning and pressure washing company.

## Project

CFL Wash Co. is being built as a fast, local-first lead-generation website focused on:

- Driveway pressure washing
- Sidewalk cleaning
- Walkway cleaning
- Concrete cleaning
- HOA notice cleanup
- Curb appeal cleaning

Production domain:

```text
https://cflwash.com
```

Cloudflare Pages production URL:

```text
https://cflwash-website.pages.dev/
```

`https://www.cflwash.com` permanently redirects to the apex production domain.

## Tech Stack

- Astro
- Tailwind CSS
- TypeScript
- pnpm
- Cloudflare Pages

## Local Development

Install dependencies:

```sh
pnpm install
```

Start the dev server:

```sh
pnpm dev
```

Build production output:

```sh
pnpm build
```

Preview the production build locally:

```sh
pnpm preview
```

## Validation

Run the full project check before committing meaningful changes:

```sh
pnpm check
```

This runs:

```sh
pnpm format:check
pnpm lint
pnpm build
pnpm audit:site
```

Format files:

```sh
pnpm format
```

Run lint only:

```sh
pnpm lint
```

## Project Structure

```text
src/
  components/
    ui/          Reusable primitives such as Button, Section, Card
    site/        Shared site chrome such as Header, Footer, MobileStickyCTA
    sections/    Reusable page sections
  data/          Site, service, and service-area data
  layouts/       Shared Astro layouts
  pages/         File-based routes
  styles/        Global styles and design tokens

docs/
  adr/           Architectural decision records
  design/        Design guidance and Stitch briefs
  engineering/   Deployment, QA, and repo rules
  product/       Product requirements, quote phases, and page inventory
  seo/           Technical SEO and analytics tracking plans
  strategy/      Launch, post-launch, SEO, and claims guidance
```

## Design System

The project uses a small custom Astro + Tailwind component system.

Core rules:

- Keep reusable primitives in `src/components/ui/`.
- Keep shared site chrome in `src/components/site/`.
- Keep larger page sections in `src/components/sections/`.
- Keep reusable business data in `src/data/`.
- Keep theme values in `src/styles/tokens.css`.
- Avoid one-off styling when a reusable primitive makes sense.
- Avoid over-abstraction.

Stitch outputs are visual guidance only. Do not paste Stitch HTML directly into production.

## Claims Policy

Do not publish unverified claims.

Avoid:

- Fake reviews
- 5-star rated
- Fully insured
- Licensed
- Same-day service
- Instant booking
- Online scheduling
- Online payment
- Guaranteed response time
- Fake project proof

Use safe language such as:

- Central Florida based
- Driveways, sidewalks, and concrete
- HOA notice cleanup
- Quote-first process
- Serving Central Florida

See:

```text
docs/strategy/CLAIMS.md
```

## Git Workflow

Use feature branches for meaningful work.

Base active work from `dev`:

```sh
git switch dev
git pull --ff-only origin dev
git switch -c feat/example-branch
```

Use atomic Conventional Commits:

```text
<type>[optional scope]: <description>
```

Examples:

```text
docs(readme): update project overview
refactor(design-system): organize reusable components
feat(home): implement CFL Wash Co homepage
chore(tooling): add formatting and linting setup
```

Feature branches target `dev` and are normally squash-merged. Production releases promote `dev` to `main` through a release PR.

See:

```text
docs/engineering/PROJECT_RULES.md
```

## Current Status

The first production foundation is live:

- Production site available at `https://cflwash.com`
- `www` redirects to the apex domain with a permanent redirect
- Cloudflare Pages production deployment
- Claim-safe homepage and static service/service-area routes
- Contact-based quote request MVP
- Canonical URL handling
- Sitemap and robots output live
- `/thank-you` protected with `noindex, follow`
- Production-readiness audit included in `pnpm check`
- GA4 installed through Cloudflare Pages environment configuration
- Product, deployment, SEO, analytics, and launch documentation in place

Current next priorities:

- Confirm Search Console Domain property and sitemap submission
- Confirm GA4 realtime data
- Decide the real phone/contact path
- Add lightweight CTA event tracking
- Continue design and content polish through small focused branches
- Build the quote backend only after the intake workflow is defined

See the current live status in:

```text
docs/strategy/POST_LAUNCH.md
```
