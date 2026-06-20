# Homepage Hero Responsive Visual System Design

## Goal

Rework the homepage hero into a service-led conversion section that presents the sales message before brand artwork on mobile, uses an intentional stacked tablet layout, and becomes a polished service mosaic at 960px and above.

## Content Hierarchy

The hero uses one H1 and one semantic content structure. At widths below 960px, the visible order is:

1. `Central Florida Pressure Washing` eyebrow
2. `Driveway, Sidewalk, and Exterior Cleaning in Central Florida` H1
3. Quote-first supporting copy
4. `Request a Quote` and `Call` actions
5. Compact service-surface visual
6. Four claim-safe benefit chips
7. `Serving Central Florida` line
8. Wave transition into the existing trust section

At 960px and above, the copy, CTAs, benefits, and serving line occupy the left column while the service mosaic occupies the right column. No large logo or badge precedes or competes with the H1.

## Responsive Layout

- Below 768px: centered, compact single-column composition. The H1 uses a controlled mobile scale and measure. CTAs remain adjacent to the supporting copy. The visual is a shallow, bounded card rather than a second screen of content.
- From 768px through 959px: the hero remains stacked with a wider controlled measure. CTAs sit inline, the visual gains width without dominating, and benefits use a four-column row where space permits.
- At 960px and above: the hero becomes a two-column grid. Copy and proof points align on the left; a surface-focused mosaic aligns on the right. The visual remains bounded so the first fold communicates service, region, and quote action.

The layout uses responsive CSS grid areas instead of separate mobile and desktop hero copies. This keeps content order, accessibility, media metadata, and future edits synchronized.

## Visual Treatment

The visual reuses the registered proof-safe service illustrations:

- Driveway illustration as the dominant tile
- Walkway illustration as a supporting tile
- Concrete illustration as a supporting tile
- Claim-safe labels for Driveways, Sidewalks, Patios, and HOA Cleanup

The existing `badge-illustrated.png` is not used because it contains a real white RGB background. The transparent `logo-mark-transparent.png` may appear only as a small decorative seal over the mosaic. Existing color, radius, spacing, and shadow tokens provide the framing; no page-local raw colors, arbitrary shadows, or one-off gradients are introduced.

## Component Boundaries

- `src/components/home/HomeHero.astro` owns homepage hero content, responsive composition, service mosaic markup, proof-safe media attributes, and hero CTA tracking.
- `src/pages/index.astro` composes `HomeHero` and preserves the remainder of the homepage.
- `src/styles/global.css` contains only reusable semantic hero utilities that cannot be expressed cleanly with existing tokens and utility classes.
- `src/styles/tokens.css` changes only if an existing token cannot express the approved hero treatment.
- `src/layouts/Layout.astro` maintains a mobile bottom safe area at least as tall as the fixed CTA so no final content is obscured.
- `docs/design/PREMIUM_MEDIA_SYSTEM.md` and `docs/design/BRAND_ASSETS.md` describe the new hero hierarchy and transparent seal usage accurately.

## Accessibility And Performance

- Keep exactly one H1 and one hero content structure.
- Give both CTAs accessible visible names and preserve current tracking attributes.
- Use the media registry alt text for meaningful surface images and empty alt text for the decorative transparent seal.
- Provide intrinsic width and height for every hero image.
- Use the existing responsive `srcset` candidates with accurate `sizes` values.
- Load the dominant above-the-fold image eagerly with high fetch priority. Supporting mosaic images may load lazily when they are not required for the first paint.
- Preserve `data-media-id`, `data-media-role`, and `data-proof-status` on every service image container.
- Avoid horizontal overflow at all required widths.
- Respect reduced-motion preferences for any visual transition.

## Claim Safety

The hero only describes active launch services and supported areas. It does not add reviews, ratings, guarantees, licensing or insurance language, same-day service, instant booking, complete stain-removal claims, unsupported proof, or inactive launch services.

## Verification

Run `pnpm install`, `pnpm check`, `pnpm build`, `pnpm audit:patterns`, `pnpm audit:site`, and `git diff --check`.

Rendered QA covers `/` at 390px, 430px, 768px, 1024px, and 1440px. Each pass checks viewport overflow, header fit, H1 and primary CTA priority, mosaic scale and crop, transparent seal treatment, CTA spacing, benefit rhythm, serving line placement, wave spacing, and sticky CTA coverage. The PR into `dev` includes `Closes #102`, validation results, viewport notes, screenshots or preview references, and the requested visual summary.
