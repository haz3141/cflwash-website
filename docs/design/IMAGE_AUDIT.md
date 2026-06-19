# Public Page Image Audit

This audit records the visual role of each public image category.

## Decorative brand artwork

Brand illustrations support layout and tone. They are not evidence of completed CFL Wash Co. work.

Current examples include the homepage illustration, the illustrated badge, logos, and Flow Crest assets.

## City-context photography

City images establish location. They are not service photographs. Licensing and attribution records remain in `docs/seo/image-rights-manifest.yaml` and `src/data/cityContextImages.ts`.

## Owner-provided result photography

No owner-provided completed-result photos are currently active in the public UI.

Issue #86 visual QA found the previously referenced service-result WebP files were not valid browser-renderable image assets, so they were removed from active use rather than presented as proof. Homepage and service-page visuals now use approved decorative brand artwork until valid project or result photography is available.

## Route inventory

| Route                        | Current treatment                                                               | Status                                                            |
| ---------------------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `/`                          | Illustrated hero, water-wave divider, icons, and decorative brand service cards | Improved; service cards are not proof photos                      |
| `/services`                  | Decorative hero and service icons                                               | Functional                                                        |
| `/driveway-pressure-washing` | Decorative brand artwork in hero                                                | Improved; replace with verified result photography when available |
| `/sidewalk-walkway-cleaning` | Decorative brand artwork in hero                                                | Improved; replace with verified result photography when available |
| `/concrete-cleaning`         | Decorative brand artwork in hero                                                | Improved; replace with verified result photography when available |
| `/service-areas`             | Six attributed city images                                                      | Improved                                                          |
| Six city pages               | Shared decorative artwork and one city image per page                           | Improved but temporary                                            |
| `/request-quote`             | Form and interface styling                                                      | Appropriate                                                       |
| Header and footer            | Responsive wordmarks                                                            | Functional                                                        |

## Publishing rules

- Do not imply fake before-and-after evidence.
- Do not present decorative artwork or city images as project proof.
- Use factual alt text and avoid guaranteed-result language.
- Keep required city-image attribution visible.
- Preserve intrinsic image dimensions.
- Document future public project images before release.

## Remaining work

1. Add approved result photos so the six homepage cards have greater variety.
2. Create verified matched before-and-after sets.
3. Add equipment, process, and team photography when available.
4. Create service-specific social sharing images.
5. Review every crop at mobile, tablet, and desktop widths.

The next visual priority is greater image variety and documented project proof rather than more repeated decorative artwork.
