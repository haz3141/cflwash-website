# Page Inventory

## Current Routes

| Route                        | Purpose                  | Status            | Notes                                                                                   |
| ---------------------------- | ------------------------ | ----------------- | --------------------------------------------------------------------------------------- |
| `/`                          | Homepage                 | Live              | Lead-gen entry point and primary CTA hub                                                |
| `/services`                  | Services hub             | Release candidate | Organizes all active service pages and helps homeowners choose the closest service fit  |
| `/service-areas`             | Service-area hub         | Release candidate | Organizes all six approved city pages with service-led local context                    |
| `/privacy`                   | Legal page               | Live              | Public privacy policy                                                                   |
| `/request-quote`             | Quote destination        | Release candidate | Form MVP exists on `dev`/preview; production `main` remains contact-based until release |
| `/thank-you`                 | Post-submit confirmation | Live              | `noindex`, not a public content page                                                    |
| `/driveway-pressure-washing` | Service page             | Live              | Primary service page                                                                    |
| `/sidewalk-walkway-cleaning` | Service page             | Live              | Primary service page                                                                    |
| `/concrete-cleaning`         | Service page             | Live              | Primary service page                                                                    |
| `/service-areas/deltona`     | Service-area page        | Index approved    | Approved for launch indexing in #63                                                     |
| `/service-areas/orange-city` | Service-area page        | Index approved    | Approved for launch indexing in #63                                                     |
| `/service-areas/debary`      | Service-area page        | Index approved    | Approved for launch indexing in #63                                                     |
| `/service-areas/deland`      | Service-area page        | Index approved    | Approved for launch indexing in #63                                                     |
| `/service-areas/sanford`     | Service-area page        | Index approved    | Approved for launch indexing in #63                                                     |
| `/service-areas/lake-mary`   | Service-area page        | Index approved    | Approved for launch indexing in #63                                                     |

## Planned Primary Service Areas

All currently approved primary service-area routes are live and index-approved for launch: Deltona, Orange City, DeBary, DeLand, Sanford, and Lake Mary. Add more only when separate research and implementation issues can support them as real service-area pages.

## Planned Content Types

Add only when the operational proof exists:

- `/projects/[slug]` project pages, after the architecture in
  [ADR 0006: Real Project Publishing System](../adr/0006-real-project-publishing-system.md)
  is approved and real verification plus permission records exist
- FAQ expansions tied to actual customer questions
- Service-area expansions with unique local content

## Route Rules

- Every indexable page needs a unique title and description.
- Utility pages such as `/thank-you` should stay out of the sitemap.
- Dev-only QA routes such as `/dev/city-context-images` are excluded from this public route inventory and the sitemap.
- Do not create thin city/service combinations.
- Do not add a route unless it has a clear user purpose.
