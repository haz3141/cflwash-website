# Brand Assets

This file inventories CFL Wash Co.'s public brand assets and their intended use.

See [DESIGN.md](./DESIGN.md) for brand direction and [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) for implementation rules.

## Source of Truth

`public/images/brand/logo-primary.png` remains the visual appearance source of truth for the primary wordmark. Any transparent or reversed derivative must preserve its proportions, colors, line quality, and visual weight.

The current primary-logo derivatives are raster conversions, not vector masters. If a conversion visibly degrades the artwork, use the original logo on an intentional matching light or cream surface rather than forcing a poor transparent or reversed treatment.

## Flow Crest Singular Icon

Flow Crest is the approved small-format brand mark. It is derived from the sweeping water language in the baseline CFL Wash Co. logo and uses the approved palette:

- Deep navy: `#0A1B2E`
- Water blue: `#1F5DBE`
- Warm gold: `#E0AA3A`
- Warm cream for reversed artwork: `#F6F1E6`

Use Flow Crest for browser favicons, Apple touch and installed-app icons, social avatars, tiny equipment or print placements, and other contexts where the full wordmark or monogram becomes illegible.

Do not add letters, taglines, skyline details, birds, badge borders, or other small details to the favicon version.

## Active Flow Crest Assets

| File                                             | Purpose                                                |
| ------------------------------------------------ | ------------------------------------------------------ |
| `public/images/brand/logo-icon.svg`              | Default Flow Crest source for light surfaces           |
| `public/images/brand/logo-icon-dark.svg`         | Explicit light-surface source variant                  |
| `public/images/brand/logo-icon-light.svg`        | Reversed source variant for dark surfaces              |
| `public/images/brand/flow-crest-adaptive.svg`    | Adaptive SVG favicon for light and dark browser themes |
| `public/images/brand/flow-crest.ico`             | ICO fallback with 16, 32, and 48 pixel artwork         |
| `public/images/brand/flow-crest-16.png`          | 16 pixel PNG favicon                                   |
| `public/images/brand/flow-crest-32.png`          | 32 pixel PNG favicon                                   |
| `public/images/brand/flow-crest-apple-touch.png` | 180 pixel Apple touch icon                             |
| `public/images/brand/flow-crest-192.png`         | 192 pixel installed-app icon                           |
| `public/images/brand/flow-crest-512.png`         | 512 pixel installed-app icon                           |
| `public/site.webmanifest`                        | Manifest wired to the Flow Crest app icons             |

The PNG and ICO browser icons use the light-surface mark. Apple touch and installed-app icons use the reversed mark on an intentional deep navy square.

Legacy root favicon and app-icon files remain in the repository for compatibility but are no longer referenced by the layout or manifest.

## Brand Asset Hierarchy

1. **Primary wordmark:** header, footer, truck, signage, and major identity placements.
2. **Flow Crest singular icon:** favicon, app icon, avatar, and tiny placements.
3. **CFL monogram:** medium-size secondary brand contexts.
4. **Illustrated badge:** storytelling, campaign, and promotional artwork.

Do not substitute the illustrated badge or compact monogram for Flow Crest in favicon-sized contexts.

## Other Public Assets

| File                                               | Recommended use                          | Notes                                                 |
| -------------------------------------------------- | ---------------------------------------- | ----------------------------------------------------- |
| `public/images/brand/logo-primary.png`             | Primary wordmark appearance reference    | Use on white or intentionally matched light surfaces. |
| `public/images/brand/logo-primary-transparent.png` | Header candidate                         | Use only when visually faithful to the original.      |
| `public/images/brand/logo-primary-reversed.png`    | Dark-surface candidate                   | Raster conversion; requires visual approval.          |
| `public/images/brand/logo-mark.png`                | Legacy compact monogram                  | Too detailed for favicon use.                         |
| `public/images/brand/logo-mark-transparent.png`    | Medium compact-mark and small hero seal  | Transparent raster; never lead the homepage hero.     |
| `public/images/brand/logo-mark-reversed.png`       | Medium compact-mark use on dark surfaces | Raster derivative.                                    |
| `public/images/brand/badge-illustrated.png`        | Archived storytelling candidate          | RGB white background; do not composite on public UI.  |
| `public/images/brand/hero-homepage.webp`           | Residential brand artwork                | Decorative page artwork; not project proof.           |
| `public/images/brand/og-default.png`               | Open Graph and social sharing            | Keep on-brand and claim-safe.                         |

## Responsive Delivery Derivatives

These files are resized delivery derivatives created from the approved raster sources. They are not new brand masters.

| File                                                                     | Source asset                                              | Purpose                                       |
| ------------------------------------------------------------------------ | --------------------------------------------------------- | --------------------------------------------- |
| `public/images/brand/responsive/hero-homepage-480.webp`                  | `public/images/brand/hero-homepage.webp`                  | Mobile homepage hero candidate                |
| `public/images/brand/responsive/hero-homepage-768.webp`                  | `public/images/brand/hero-homepage.webp`                  | Mobile high-density and tablet hero candidate |
| `public/images/brand/responsive/hero-homepage-1024.webp`                 | `public/images/brand/hero-homepage.webp`                  | Desktop homepage hero candidate               |
| `public/images/brand/responsive/hero-homepage-1280.webp`                 | `public/images/brand/hero-homepage.webp`                  | High-density desktop hero candidate           |
| `public/images/brand/responsive/logo-primary-header-transparent-320.png` | `public/images/brand/logo-primary-header-transparent.png` | Header wordmark candidate                     |
| `public/images/brand/responsive/logo-primary-header-transparent-480.png` | `public/images/brand/logo-primary-header-transparent.png` | High-density header wordmark candidate        |
| `public/images/brand/responsive/logo-primary-reversed-320.png`           | `public/images/brand/logo-primary-reversed.png`           | Footer wordmark candidate                     |
| `public/images/brand/responsive/logo-primary-reversed-480.png`           | `public/images/brand/logo-primary-reversed.png`           | High-density footer wordmark candidate        |

## Service Illustration Assets

The generated service scenes are supporting illustrations, not brand masters
and not completed-project proof. Their public role, proof status, alt text,
captions, route hierarchy, and prompt provenance are governed by
[`PREMIUM_MEDIA_SYSTEM.md`](./PREMIUM_MEDIA_SYSTEM.md).

| Delivery family                                                                  | Subject                                     | Required treatment                               |
| -------------------------------------------------------------------------------- | ------------------------------------------- | ------------------------------------------------ |
| `public/images/service-illustrations/driveway-cleaning-{480,768,1024,1280}.webp` | Residential concrete driveway               | Register as `service-illustration` / `not-proof` |
| `public/images/service-illustrations/walkway-cleaning-{480,768,1024,1280}.webp`  | Residential walkway and sidewalk            | Register as `service-illustration` / `not-proof` |
| `public/images/service-illustrations/concrete-cleaning-{480,768,1024,1280}.webp` | Residential concrete patio, entry, and curb | Register as `service-illustration` / `not-proof` |

## Header-Specific Wordmark

`public/images/brand/logo-primary-header-transparent.png` is the approved header-specific wordmark derivative.

- It uses the shorter CFL WASH CO. artwork.
- It is transparent.
- It is intended for the light header surface.
- `public/images/brand/logo-primary.png` remains the broader primary appearance reference.
- The header-specific asset should not automatically replace the footer logo.
- Flow Crest remains the favicon and app icon system only.

## Usage Rules

- Preserve the original primary logo's appearance.
- Use the primary wordmark for header and footer identity, not Flow Crest alone.
- Use Flow Crest only where a singular compact mark is appropriate.
- Never publish checkerboard backgrounds or accidental white rectangles.
- Use `logo-mark-transparent.png` only as a small decorative hero seal; the service message and surface imagery must lead.
- Do not composite `badge-illustrated.png` in public UI because its white RGB background is not transparent.
- Do not describe raster derivatives as vector masters.
- Keep rendered image dimensions stable to avoid layout shift.
- Use empty alt text for decorative logo images inside an already labeled home link.
- Check all logo and icon variants on both light and dark backgrounds before release.

## Known Limitations

- The primary wordmark and monogram assets remain raster-only.
- Existing transparent and reversed wordmark files are raster conversions and require visual approval.
- Flow Crest is a true standalone SVG system, but it does not replace the need for a professionally recreated vector wordmark and monogram.
- A complete vector identity master remains recommended for print, signage, apparel, and long-term brand governance.
