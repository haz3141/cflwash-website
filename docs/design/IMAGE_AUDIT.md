# Public Page Image Audit

This audit records what imagery the public site currently uses, what each image is allowed to communicate, and what still needs to be created or photographed.

## Image categories

### Decorative brand artwork

Decorative artwork supports brand tone and layout. It is not evidence that CFL Wash Co. completed a pictured project.

Current examples:

- `public/images/brand/hero-homepage.webp`
- responsive `hero-homepage-*` delivery derivatives
- `public/images/brand/badge-illustrated.png`
- logo and Flow Crest assets

### City-context photography

City-context photography establishes geography. It is not service photography and must not be presented as CFL Wash Co. project work.

Current examples:

- Deltona City Hall
- Orange City Town Hall
- DeBary Hall
- Athens Theatre in DeLand
- Sanford City Hall
- Lake Mary City Hall

The licensing and attribution records remain in `docs/seo/image-rights-manifest.yaml` and `src/data/cityContextImages.ts`.

### Proof imagery

Proof imagery would show actual CFL Wash Co. work, equipment, surfaces, or before-and-after results. None is currently approved for publication.

Do not imply that decorative artwork or city-context images are proof imagery.

## Route-by-route inventory

| Route or category            | Current visual treatment                                                              | Status                                | Main limitation                                                                       |
| ---------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------- |
| `/`                          | One responsive decorative hero artwork, logo assets, and interface icons              | Acceptable temporary foundation       | No real service or completed-work photography                                         |
| `/services`                  | Responsive decorative hero artwork plus service icons                                 | Added as part of hub architecture     | Reuses homepage artwork and does not show individual services                         |
| `/driveway-pressure-washing` | Icons, cards, and layout styling only                                                 | Image gap                             | Needs a real driveway cleaning image or purpose-built service illustration            |
| `/sidewalk-walkway-cleaning` | Icons, cards, and layout styling only                                                 | Image gap                             | Needs a real walkway or sidewalk cleaning image or purpose-built service illustration |
| `/concrete-cleaning`         | Icons, cards, and layout styling only                                                 | Image gap                             | Needs a real patio, pad, curb, apron, or general concrete image                       |
| `/service-areas`             | Six responsive, attributed city-context images                                        | Improved discovery and visual variety | Images establish place, not service quality or completed work                         |
| Six city detail pages        | Shared decorative hero artwork plus one unique attributed city-context image per city | Improved but temporary                | Shared hero is repeated across all cities; civic image remains secondary context only |
| `/request-quote`             | Form and interface styling                                                            | No immediate image requirement        | A small process or photo-upload guidance visual could help later                      |
| `/privacy`                   | Text-only legal page                                                                  | Appropriate                           | No image required                                                                     |
| `/thank-you`                 | Confirmation content                                                                  | Appropriate                           | No image required                                                                     |
| Header and footer            | Responsive wordmark derivatives                                                       | Functional, pending visual approval   | Raster-only logo derivatives remain a long-term limitation                            |

## What the city redesign fixed

- Civic images no longer occupy the primary conversion position.
- The primary hero uses service-oriented brand artwork rather than city hall photography.
- Every city retains one unique geographic image with alt text and attribution.
- The city-context component explicitly labels the image as city context.
- The service-area hub adds a visual directory using all six approved city images.

## What remains unfixed

- The three service detail pages still have no service-specific imagery.
- The same decorative hero artwork is reused on the homepage, services hub, and all six city pages.
- There are no approved project galleries or before-and-after images.
- There are no approved technician, truck, equipment, process, or surface-detail photos.
- There is no service-specific Open Graph artwork.
- Raster wordmark derivatives still require visual review on light and dark surfaces.

## Image acquisition priority

### Priority 1: real core-service photography

Capture at least one strong, horizontal image for each active service:

1. concrete driveway pressure washing
2. sidewalk or front-walk cleaning
3. patio, pad, apron, curb, or general concrete cleaning

Preferred coverage for each subject:

- one wide horizontal composition for desktop hero or feature use
- one tighter vertical or square composition for cards and mobile
- one close surface-detail image showing visible buildup or cleaning texture

### Priority 2: documented before-and-after sets

For each set, record:

- service address internally
- date
- surface type
- permission status
- whether identifiable house numbers, faces, plates, or personal property require removal
- whether the result can be described accurately without a guarantee

### Priority 3: operational trust imagery

After real service images exist, add:

- equipment setup
- hose and access preparation
- surface inspection
- safe work-area preparation
- technician or owner portrait only when the actual person and permission are available

## Publishing rules

- Do not use stock images that imply a CFL Wash Co. employee or completed project unless clearly labeled as illustrative.
- Do not create fake before-and-after evidence.
- Do not use AI-generated imagery as project proof.
- Decorative or generated illustrations may support layout only when they are clearly non-documentary.
- Preserve image width and height attributes to reduce layout shift.
- Use responsive sources for large images.
- Keep city-context attribution visible wherever those images appear.
- Add new public images to the rights or permission record before release.

## Next visual implementation

The next meaningful image improvement is not adding more repeated brand art. It is replacing the image gaps on the three service detail pages with real, permission-cleared service photography or clearly illustrative service-specific artwork. Until those assets exist, the current icon-led service pages are more honest than unrelated stock photography.
