# Premium Proof-Safe Media System

This document is the source of truth for how public-page imagery supports the
premium visual system without implying evidence CFL Wash Co. does not yet have.
The active typed registry is `src/data/publicMedia.ts`; licensed city records
remain in `src/data/cityContextImages.ts` with the same role and proof-status
vocabulary.

## Media taxonomy

| Classification         | Intended use                                                         | Proof status     |
| ---------------------- | -------------------------------------------------------------------- | ---------------- |
| Decorative             | Texture, dividers, or layout support with no factual content         | `not-proof`      |
| Brand artwork          | CFL Wash Co. identity and residential mood-setting                   | `not-proof`      |
| Service illustration   | Surface-specific visual guidance for an active service               | `not-proof`      |
| City context           | Licensed place photography used only to identify a city              | `context-only`   |
| Verified project proof | Future owner-approved project photography with documented provenance | `verified-proof` |

No active public asset is classified as verified project proof. The generated
service illustrations are intentionally registered as `service-illustration`
and `not-proof`, even though they use a realistic architectural style.

## Active media inventory

### Brand and interface assets

| Asset path                                                               | Public usage                              | Classification | Alt or accessible treatment                                                                            | Caption / disclosure                                                        | Risk and delivery                                                          |
| ------------------------------------------------------------------------ | ----------------------------------------- | -------------- | ------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `/images/brand/logo-mark-transparent.png`                                | Small decorative homepage hero seal       | Brand artwork  | Empty alt because the adjacent header and hero already identify the brand                              | None                                                                        | Transparent raster identity only; 640 × 640 with intrinsic dimensions      |
| `/images/brand/responsive/hero-homepage-{480,768,1024,1280}.webp`        | Homepage feature and `/service-areas` hub | Brand artwork  | “Illustrative Florida-style home exterior with driveway, walkway, palms, and residential landscaping.” | “Decorative brand artwork. Not completed project photography.” where framed | Not proof; responsive WebP set with `srcset` and route-appropriate `sizes` |
| Header and footer wordmark derivatives under `/images/brand/responsive/` | All public routes                         | Brand artwork  | Empty alt inside an already labeled home link                                                          | None                                                                        | Identity only; responsive PNG derivatives                                  |
| `/images/brand/og-default.png`                                           | Social share metadata                     | Brand artwork  | Metadata alt: “CFL Wash Co. exterior cleaning in Central Florida”                                      | None                                                                        | Not visible project proof; social delivery asset                           |

### Service illustrations

Each family has `480`, `768`, `1024`, and `1280` pixel WebP derivatives under
`/images/service-illustrations/`. Service-detail hero frames use the visible
caption “Illustrative service image. Not completed project photography.” The
homepage service-card section carries the equivalent section-level disclosure,
and the homepage mosaic exposes the same `service-illustration` / `not-proof`
classification in its markup.

| Registry ID and path stem                  | Public usage                                                                               | Classification       | Alt text                                                                                          | Risk and delivery                                                      |
| ------------------------------------------ | ------------------------------------------------------------------------------------------ | -------------------- | ------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `service-driveway` / `driveway-cleaning-*` | Homepage hero/cards, `/driveway-pressure-washing`, Deltona, and DeBary city heroes         | Service illustration | “Illustrative Florida-style home with a broad concrete driveway and landscaped front approach.”   | Realistic generated scene; always `not-proof`; responsive 3:2 WebP set |
| `service-walkway` / `walkway-cleaning-*`   | Homepage hero/cards, `/sidewalk-walkway-cleaning`, Orange City, and DeLand city heroes     | Service illustration | “Illustrative Florida-style home with a curved concrete walkway, sidewalk, and landscaped entry.” | Realistic generated scene; always `not-proof`; responsive 3:2 WebP set |
| `service-concrete` / `concrete-cleaning-*` | Homepage hero/cards, `/services`, `/concrete-cleaning`, Sanford, and Lake Mary city heroes | Service illustration | “Illustrative Florida-style home with concrete patio, entry, and curb surfaces.”                  | Realistic generated scene; always `not-proof`; responsive 3:2 WebP set |

The source scenes were generated with the built-in image-generation model on
2026-06-19. The coordinated final prompt briefs were:

- Driveway: premium sunlit Central Florida residential architecture, broad
  concrete driveway as the clear subject, restrained warm cream/navy/gold
  palette cues, polished editorial composition, no people, workers, vehicles,
  equipment, logos, signage, text, civic identifiers, before-and-after split,
  or claims.
- Walkway: premium sunlit Central Florida residential architecture, curved
  concrete front walk and sidewalk as the clear subject, coordinated editorial
  composition and palette, with the same exclusions.
- Concrete: premium sunlit Central Florida residential architecture, concrete
  patio/entry/curb surfaces as the clear subject, coordinated editorial
  composition and palette, with the same exclusions.

The generated PNG sources were converted to metadata-free responsive WebP
delivery derivatives. They are visual category references, not representations
of CFL Wash Co. jobs, crews, equipment, customers, or outcomes.

### Licensed city context

| Asset families                                              | Public usage                                            | Classification | Alt and caption                                                               | Risk and delivery                                          |
| ----------------------------------------------------------- | ------------------------------------------------------- | -------------- | ----------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `/images/city-context/deltona-city-hall-{640,1280}.jpg`     | `/service-areas/deltona` local-context section only     | City context   | Factual building description; “Deltona City Hall civic context.”              | `context-only`; attribution visible; not on conversion hub |
| `/images/city-context/orange-city-town-hall-{640,1280}.jpg` | `/service-areas/orange-city` local-context section only | City context   | Factual building description; “Orange City Town Hall civic context.”          | `context-only`; attribution visible; not on conversion hub |
| `/images/city-context/debary-hall-{640,1280}.jpg`           | `/service-areas/debary` local-context section only      | City context   | Factual building description; “DeBary Hall historic civic context.”           | `context-only`; attribution visible; not on conversion hub |
| `/images/city-context/deland-athens-theatre-{640,1280}.jpg` | `/service-areas/deland` local-context section only      | City context   | Factual building description; “Athens Theatre downtown DeLand civic context.” | `context-only`; attribution visible; not on conversion hub |
| `/images/city-context/sanford-city-hall-{640,1280}.jpg`     | `/service-areas/sanford` local-context section only     | City context   | Factual building description; “Sanford City Hall civic context.”              | `context-only`; attribution visible; not on conversion hub |
| `/images/city-context/lake-mary-city-hall-{640,1280}.jpg`   | `/service-areas/lake-mary` local-context section only   | City context   | Factual building description; “Lake Mary City Hall civic context.”            | `context-only`; attribution visible; not on conversion hub |

License, creator, source URL, and derivative details remain authoritative in
`docs/seo/image-rights-manifest.yaml` and `src/data/cityContextImages.ts`.

### Routes without content imagery

`/request-quote` and `/thank-you` intentionally rely on form, status, and
typographic hierarchy. Decorative photography would add weight without helping
the user complete or confirm the quote flow. Shared wordmarks remain present.

## Route hierarchy

- `/`: driveway, walkway, and concrete service illustrations lead a responsive
  hero mosaic; a small transparent logo mark provides decorative identity only.
  Generic residential brand artwork supports the later company process section.
- `/services`: a service illustration leads; icons and copy do the remaining
  comparison work.
- Three service detail pages: the matching service illustration leads with a
  visible not-project-proof caption.
- `/service-areas`: one residential brand artwork frame supports the route;
  city selection is text-and-icon led, so civic buildings do not dominate.
- Six city pages: an explicitly selected service illustration leads with a
  visible not-project-proof caption; one compact, attributed civic photo appears
  later under “Local context” and is labeled `City context only`.
- `/request-quote` and `/thank-you`: no content imagery by design.

## Proof-safety rules

- Every reusable content image has a stable media ID, role, proof status,
  source type, factual alt text, intrinsic dimensions, and responsive sources.
- Realistic generated or stock-style imagery must be labeled as illustrative
  and `not-proof`; never describe it as a project, result, customer, or crew.
- City photography must remain `context-only`, include visible attribution, and
  never stand in for service quality, local project history, or business proof.
- Do not create or imply before-and-after pairs from unmatched images.
- Do not add people, uniforms, trucks, equipment, logos, addresses, awards,
  ratings, or service-result claims unless the underlying evidence is verified.
- Alt text describes visible content. It does not carry marketing claims or
  duplicate disclosure copy.
- Hero media uses eager loading only when above the fold. All other media loads
  lazily. Every raster image preserves intrinsic dimensions and responsive
  candidates where available.
- Public route markup exposes `data-media-id`, `data-media-role`, and
  `data-proof-status` so audits can detect hierarchy or classification drift.

## Future verified project proof

Issue #51 remains the boundary for adding real project photography. Before an
asset may use `verified-project-proof` / `verified-proof`, record owner approval,
project/service mapping, city granularity safe for publication, capture date,
whether a before-and-after pair is genuinely matched, edit history, alt text,
caption, and responsive derivatives. Keep that evidence separate from licensed
city photography and generated illustrations.

Do not substitute generated scenes for issue #51, and do not add a public proof
gallery or project route until the verified publishing system is explicitly in
scope.
