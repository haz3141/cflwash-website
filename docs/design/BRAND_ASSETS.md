# Brand Assets

This file inventories the website's actual brand assets and their intended use.

These are raster website assets, not vector masters. See [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) for the preferred header/footer usage rules.

## Public Asset Inventory

| File                                               | Dimensions  | Format | Transparency | Source                                                           | Recommended Use                          | Notes                                                                                      |
| -------------------------------------------------- | ----------- | ------ | ------------ | ---------------------------------------------------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------ |
| `public/images/brand/logo-primary.png`             | 1280 x 500  | PNG    | No           | Legacy flattened launch derivative                               | Legacy only                              | Retained in the tree for compatibility. Avoid using on contrasting surfaces.               |
| `public/images/brand/logo-mark.png`                | 640 x 640   | PNG    | Yes          | Legacy compact derivative from the source mark                   | Legacy small-size use                    | Retained in the tree for compatibility. Prefer the transparent/reversed derivatives below. |
| `public/images/brand/logo-primary-transparent.png` | 1280 x 500  | PNG    | Yes          | `.tmp/brand-source/01-primary-logo-source.png`                   | Header and other light surfaces          | Preferred primary logo derivative for the website.                                         |
| `public/images/brand/logo-primary-reversed.png`    | 1280 x 500  | PNG    | Yes          | `.tmp/brand-source/01-primary-logo-source.png`                   | Dark surfaces, especially the footer     | Raster-derived reversed treatment. Not a vector master.                                    |
| `public/images/brand/logo-mark-transparent.png`    | 640 x 640   | PNG    | Yes          | `.tmp/brand-source/02-compact-mark-source.png`                   | Favicon-adjacent and small-size contexts | Preferred compact mark derivative for the website.                                         |
| `public/images/brand/logo-mark-reversed.png`       | 640 x 640   | PNG    | Yes          | `.tmp/brand-source/02-compact-mark-source.png`                   | Dark small-size contexts                 | Raster-derived reversed treatment. Not a vector master.                                    |
| `public/images/brand/badge-illustrated.png`        | 1254 x 1254 | PNG    | No           | `.tmp/brand-source/03-illustrated-badge-source.png`              | Secondary brand storytelling only        | Do not treat as proof of completed work.                                                   |
| `public/images/brand/hero-homepage.webp`           | 1280 x 675  | WebP   | No           | `.tmp/brand-source/04-homepage-hero-source.png`                  | Homepage hero art                        | Decorative page artwork.                                                                   |
| `public/images/brand/og-default.png`               | 1200 x 630  | PNG    | No           | `.tmp/brand-source/05-og-social-source.png` plus brand crop work | Open Graph and social sharing            | Keep on-brand and claim-safe.                                                              |

## Icon Outputs

The following are derived favicon and app-icon outputs from the compact mark source:

- `public/favicon.ico`
- `public/favicon-16x16.png`
- `public/favicon-32x32.png`
- `public/apple-touch-icon.png`
- `public/favicon.svg`
- `public/icon-192.png`
- `public/icon-512.png`
- `public/site.webmanifest`

## Usage Notes

- Use the transparent primary logo on light surfaces.
- Use the reversed primary logo on the intentional deep navy footer surface.
- Use the compact mark for small-size contexts only.
- Do not place logos on accidental white rectangles.
- Do not present raster derivatives as vector masters.
- Do not publish checkerboard backgrounds.
- Keep rendered image sizes stable and avoid alt text on decorative uses.

## Known Limitations

- The logo derivatives are raster-only.
- The reversed files are raster conversions from the source artwork, not rebuilt vector masters.
- A future SVG/vector master is still recommended for print, signage, and long-term brand governance.
- If future brand work requires tighter logo refinement, recreate the mark as a proper vector system rather than reusing these raster derivatives.
