# Page Inventory

## Current Routes

| Route                        | Purpose                  | Status            | Notes                                                                                   |
| ---------------------------- | ------------------------ | ----------------- | --------------------------------------------------------------------------------------- |
| `/`                          | Homepage                 | Live              | Lead-gen entry point and primary CTA hub                                                |
| `/request-quote`             | Quote destination        | Release candidate | Form MVP exists on `dev`/preview; production `main` remains contact-based until release |
| `/thank-you`                 | Post-submit confirmation | Live              | `noindex`, not a public content page                                                    |
| `/driveway-pressure-washing` | Service page             | Live              | Primary service page                                                                    |
| `/sidewalk-walkway-cleaning` | Service page             | Live              | Primary service page                                                                    |
| `/concrete-cleaning`         | Service page             | Live              | Primary service page                                                                    |
| `/service-areas/deltona`     | Service-area page        | Live              | Primary area page                                                                       |
| `/service-areas/orange-city` | Service-area page        | Live              | Primary area page                                                                       |
| `/service-areas/debary`      | Service-area page        | Live              | Primary area page                                                                       |

## Planned Primary Service Areas

These are named in strategy docs and should only be added when the site is ready to support them as real service-area pages:

- `/service-areas/deland`
- `/service-areas/sanford`
- `/service-areas/lake-mary`

## Planned Content Types

Add only when the operational proof exists:

- `/projects/[slug]` project pages
- FAQ expansions tied to actual customer questions
- Service-area expansions with unique local content

## Route Rules

- Every indexable page needs a unique title and description.
- Utility pages such as `/thank-you` should stay out of the sitemap.
- Do not create thin city/service combinations.
- Do not add a route unless it has a clear user purpose.
