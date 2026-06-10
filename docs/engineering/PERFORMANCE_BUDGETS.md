# Performance Budgets

This document records the launch-site performance baseline, budgets, and media delivery decisions for issue #37.

## Measurement Method

- Build command: `pnpm build`
- Preview command: `pnpm preview --host 127.0.0.1 --port 4321`
- Browser: local Chrome 149 through the Chrome DevTools Protocol with cache disabled
- Routes measured: `/` and `/request-quote`
- Viewports:
  - Mobile: 390 x 844, device scale factor 3
  - Desktop: 1440 x 900, device scale factor 1

Local preview timing is useful for element identity and regression checks, but Cloudflare preview or production should be used for final network timing because CDN caching and real latency differ from localhost.

## Core Web Vitals Budgets

| Metric |                                Budget | Notes                                                                                                                                                |
| ------ | ------------------------------------: | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| LCP    | <= 2.5 seconds at the 75th percentile | Target the homepage and quote page first. The homepage desktop LCP is expected to be the hero image; text-only pages should usually have a text LCP. |
| INP    |      <= 200 ms at the 75th percentile | Static pages should stay minimally scripted. Quote-form scripting is allowed only for the quote experience.                                          |
| CLS    |                               <= 0.05 | Keep explicit dimensions, aspect-ratio reservations, and stable header/footer image boxes.                                                           |

## Asset Budgets

| Area                            |                                        Budget | Notes                                                                                                                       |
| ------------------------------- | --------------------------------------------: | --------------------------------------------------------------------------------------------------------------------------- |
| Homepage initial image transfer |     <= 500 KB uncached for the first viewport | Includes the header logo, hero image, app icons fetched by the browser, and any other first-viewport images.                |
| Shared header logo transfer     |                            <= 200 KB uncached | The header logo is present on every route and must not compete with LCP as a full-size raster source.                       |
| Desktop homepage hero transfer  |                            <= 250 KB uncached | Preserve brand quality for the desktop LCP image while avoiding the original full-size transfer when a smaller source fits. |
| Mobile homepage hero transfer   |                            <= 125 KB uncached | Mobile should not download the 1280px source when a smaller derivative is sufficient for the rendered slot.                 |
| Static page JavaScript          |                  No bundled framework runtime | Keep shared static pages to inline navigation behavior and env-gated analytics only.                                        |
| Font loading                    | Local variable font with `font-display: swap` | Do not add external font hosts. The Latin subset is the expected critical font file for English pages.                      |
| Third-party scripts             |                    Env-gated and route-scoped | Analytics may load only when configured. Turnstile must remain limited to the quote experience.                             |

## Baseline Before Issue #37 Changes

Measured from the unmodified `origin/dev` build on `perf/media-and-core-vitals`.

| Route            | Viewport               | Likely LCP      |    CLS | First-viewport transfer |
| ---------------- | ---------------------- | --------------- | -----: | ----------------------: |
| `/`              | Mobile 390 x 844 @3x   | H1 text         |      0 |             1,097,169 B |
| `/`              | Desktop 1440 x 900 @1x | Hero image      |      0 |             1,097,169 B |
| `/request-quote` | Mobile 390 x 844 @3x   | Hero intro text |      0 |             1,038,511 B |
| `/request-quote` | Desktop 1440 x 900 @1x | H1 text         | 0.0005 |             1,038,511 B |

Largest baseline resources:

| Resource                                            |  Transfer | Issue                                                                                |
| --------------------------------------------------- | --------: | ------------------------------------------------------------------------------------ |
| `/images/brand/logo-primary-header-transparent.png` | 725,780 B | Full-size 1419 x 648 header raster loaded on every route with high fetch priority.   |
| `/images/brand/hero-homepage.webp`                  | 320,208 B | Fixed 1280 x 675 hero source with no responsive alternatives.                        |
| `/images/brand/logo-primary-reversed.png`           | 263,403 B | Full-size footer raster. It is lazy-loaded, but can still transfer on shorter pages. |
| `/_astro/manrope-latin-wght-normal.*.woff2`         |  25,156 B | Expected local font subset.                                                          |
| `/_astro/Layout.*.css`                              |  11,106 B | Single shared stylesheet.                                                            |

## Current Media Strategy

- The homepage hero uses existing approved artwork and responsive WebP derivatives at 480, 768, 1024, and 1280 CSS pixels.
- The desktop hero remains eager and high priority because it is the desktop homepage LCP.
- Mobile and tablet viewports receive smaller hero candidates through media-scoped `picture` sources.
- Header and footer wordmarks use 320px and 480px transparent PNG derivatives created from the approved raster sources.
- Header logo fetch priority is left to the browser instead of forcing `high` on every route.
- Footer logo remains lazy-loaded.
- Decorative logo images keep empty alt text because their links already have accessible labels.
- The homepage hero remains decorative with empty alt text and an `aria-hidden` media wrapper; it is not presented as proof photography.

## After Issue #37 Changes

Measured with the same local production build and cache-disabled Chrome profiles.

| Route            | Viewport               | LCP element     |    CLS | First-viewport transfer |     Change |
| ---------------- | ---------------------- | --------------- | -----: | ----------------------: | ---------: |
| `/`              | Mobile 390 x 844 @3x   | H1 text         |      0 |               243,963 B | -853,206 B |
| `/`              | Desktop 1440 x 900 @1x | Hero image      | 0.0005 |               231,409 B | -865,760 B |
| `/request-quote` | Mobile 390 x 844 @3x   | Hero intro text |      0 |               252,345 B | -786,166 B |
| `/request-quote` | Desktop 1440 x 900 @1x | H1 text         | 0.0005 |               154,670 B | -883,841 B |

Selected after-state resources:

| Resource                                                           | Mobile transfer | Desktop transfer | Notes                                                                                   |
| ------------------------------------------------------------------ | --------------: | ---------------: | --------------------------------------------------------------------------------------- |
| `/images/brand/responsive/logo-primary-header-transparent-480.png` |       114,924 B |     Not selected | High-density mobile header candidate. Browser priority changed from `High` to `Medium`. |
| `/images/brand/responsive/logo-primary-header-transparent-320.png` |    Not selected |         58,142 B | Desktop header candidate.                                                               |
| `/images/brand/responsive/hero-homepage-768.webp`                  |        77,704 B |     Not selected | Mobile homepage hero candidate.                                                         |
| `/images/brand/responsive/hero-homepage-1024.webp`                 |    Not selected |        121,932 B | Desktop homepage hero LCP candidate.                                                    |
| `/images/brand/responsive/logo-primary-reversed-480.png`           |        88,060 B |     Not selected | Mobile quote page footer candidate. Browser priority remains `Low`.                     |
| `/images/brand/responsive/logo-primary-reversed-320.png`           |    Not selected |         47,167 B | Desktop quote page footer candidate. Browser priority remains `Low`.                    |

Validation notes:

- The homepage desktop LCP remains the hero image, now served from the 1024px derivative in the tested desktop profile.
- The homepage mobile LCP remains text; the below-fold/near-fold hero no longer downloads the 1280px source.
- Quote-page LCP remains text-only.
- No framework runtime bundle was introduced.
- The current local build has no analytics or Turnstile third-party script because those remain env-gated.
- Local preview response headers are `no-cache`; Cloudflare Pages preview should be used to verify CDN behavior after the PR preview is available.

## Cloudflare Delivery Notes

The production site is served by Cloudflare Pages. Hashed Astro assets under `/_astro/` are suitable for immutable CDN caching through the established Pages deployment behavior. Public files under `/images/brand/` are not content-hashed, so replacements should use new filenames when cache freshness matters.
