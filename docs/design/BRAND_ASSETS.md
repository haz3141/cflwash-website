# Brand Assets

This file inventories CFL Wash Co.'s public brand assets and their intended use.

See [DESIGN.md](./DESIGN.md) for brand direction and [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) for implementation rules.

## Source of Truth

`public/images/brand/logo-primary.png` remains the visual appearance source of truth for the primary wordmark. Any transparent or reversed derivative must preserve its proportions, colors, line quality, and visual weight.

The current primary-logo derivatives are raster conversions, not vector masters. If a conversion visibly degrades the artwork, use the original logo on an intentional matching light or cream surface rather than forcing a poor transparent or reversed treatment.

## Public Asset Inventory

| File | Format | Transparency | Recommended use | Notes |
| --- | --- | --- | --- | --- |
| `public/images/brand/logo-primary.png` | PNG | No | Primary wordmark appearance reference | Use on white or intentionally matched light surfaces. |
| `public/images/brand/logo-primary-transparent.png` | PNG | Yes | Header and light surfaces, only when visually faithful | Raster derivative. Compare against the original before approval. |
| `public/images/brand/logo-primary-reversed.png` | PNG | Yes | Dark surfaces, only when visually faithful | Raster conversion, not a vector master. |
| `public/images/brand/logo-mark.png` | PNG | Yes | Legacy compact monogram use | Not suitable as the favicon because it contains too much small-scale detail. |
| `public/images/brand/logo-mark-transparent.png` | PNG | Yes | Medium-size compact-mark use | Keep out of tiny favicon contexts. |
| `public/images/brand/logo-mark-reversed.png` | PNG | Yes | Medium-size compact-mark use on dark surfaces | Raster derivative. |
| `public/images/brand/logo-icon.svg` | SVG | Yes | Default Flow Crest singular icon | Dark navy, water blue, and warm gold for light surfaces. |
| `public/images/brand/logo-icon-dark.svg` | SVG | Yes | Explicit light-surface Flow Crest variant | Same approved light-surface artwork as the default icon. |
| `public/images/brand/logo-icon-light.svg` | SVG | Yes | Flow Crest on dark surfaces | Warm cream, water blue, and warm gold. |
| `public/images/brand/badge-illustrated.png` | PNG | No | Secondary storytelling and promotional use | Do not treat as proof of completed work. |
| `public/images/brand/hero-homepage.webp` | WebP | No | Homepage hero artwork | Decorative page artwork. |
| `public/images/brand/og-default.png` | PNG | No | Open Graph and social sharing | Keep on-brand and claim-safe. |

## Flow Crest Singular Icon

Flow Crest is the approved small-format brand mark.

It is derived from the sweeping water language used in the CFL Wash Co. baseline logo and uses the approved palette:

- Deep navy: `#0A1B2E`
- Water blue: `#1F5DBE`
- Warm gold: `#E0AA3A`
- Warm cream for reversed artwork: `#F6F1E6`

Use Flow Crest for:

- Browser favicons
- Apple touch and installed-app icons
- Social avatars
- Tiny equipment or print placements
- Other contexts where the full wordmark or monogram becomes illegible

Do not add letters, taglines, skyline details, birds, badge borders, or other small details to the favicon version.

## Icon Outputs

The favicon and app-icon system is derived from Flow Crest:

- `public/favicon.svg`
- `public/favicon.ico`
- `public/favicon-16x16.png`
- `public/favicon-32x32.png`
- `public/apple-touch-icon.png`
- `public/icon-192.png`
- `public/icon-512.png`
- `public/site.webmanifest`

`favicon.svg` adapts its primary shape for light and dark browser color schemes. The PNG and ICO browser icons use the light-surface version. Apple touch and installed-app icons use the reversed mark on an intentional deep navy square.

## Brand Asset Hierarchy

1. **Primary wordmark:** header, footer, truck, signage, and major identity placements.
2. **Flow Crest singular icon:** favicon, app icon, avatar, and tiny placements.
3. **CFL monogram:** medium-size secondary brand contexts.
4. **Illustrated badge:** storytelling, campaign, and promotional artwork.

Do not substitute the illustrated badge or compact monogram for Flow Crest in favicon-sized contexts.

## Usage Rules

- Preserve the original primary logo's appearance.
- Use the primary wordmark for header and footer identity, not Flow Crest alone.
- Use Flow Crest only where a singular compact mark is appropriate.
- Never publish checkerboard backgrounds or accidental white rectangles.
- Do not describe raster derivatives as vector masters.
- Keep rendered image dimensions stable to avoid layout shift.
- Use empty alt text for decorative logo images inside an already labeled home link.
- Check all logo and icon variants on both light and dark backgrounds before release.

## Known Limitations

- The primary wordmark and monogram assets remain raster-only.
- Existing transparent and reversed wordmark files are raster conversions and require visual approval.
- Flow Crest is a true standalone SVG system, but it does not replace the need for a professionally recreated vector wordmark and monogram.
- A complete vector identity master remains recommended for print, signage, apparel, and long-term brand governance.
