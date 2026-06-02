# CFL Wash Co. SEO Strategy

## MVP Page Map

Current routes:

- `/`
- `/request-quote`
- `/thank-you`
- `/driveway-pressure-washing`
- `/sidewalk-walkway-cleaning`
- `/concrete-cleaning`
- `/service-areas/deltona`
- `/service-areas/orange-city`
- `/service-areas/debary`

Recommended MVP additions:

- `/service-areas/deland`
- `/service-areas/sanford`
- `/service-areas/lake-mary`
- Future project pages under `/projects/[slug]`

Keep the MVP focused on local lead generation before adding blog content.

## Service Page Strategy

Each service page should target one primary service and explain:

- What the service is
- Common surfaces or situations
- Who it helps
- Service areas covered
- What to expect
- Quote CTA
- Relevant FAQs
- Real project proof when available

MVP service pages:

- Driveway Pressure Washing
- Sidewalk and Walkway Cleaning
- Concrete Cleaning

Supportive service language may mention HOA notice cleanup and curb appeal cleaning, but do not create thin standalone pages until there is enough unique content.

Do not make roof cleaning, house washing, fleet washing, or commercial washing the primary SEO focus yet.

## Service-Area Page Strategy

Primary service areas:

- Deltona
- Orange City
- DeBary
- DeLand
- Sanford
- Lake Mary

Each service-area page should include:

- City-specific heading and metadata
- Services available in that city
- Common local use cases, such as HOA notice cleanup or driveway refresh
- Nearby service areas
- Quote CTA
- Real project proof from that city when available

Rules:

- Do not publish city pages with swapped city names and no unique value.
- Do not claim physical offices in cities unless verified.
- Do not imply coverage outside the actual service area.
- Expand only when there is real operational intent to serve the city.

## Project-Page Strategy

Project pages are the best way to build proof without fake claims.

Recommended URL pattern:

- `/projects/deltona-driveway-pressure-washing-[short-id]`

Each project page should include:

- Service performed
- City
- Surface type
- Problem or reason for cleaning
- Before/after photos with permission
- Short process summary
- Result description without exaggeration
- CTA to request a similar quote

Do not include customer names, addresses, license plates, children, or identifiable private details without explicit permission.

## Metadata, Canonical, Sitemap, And Robots Requirements

Metadata:

- Every indexable page needs a unique `<title>`.
- Every indexable page needs a unique meta description.
- Titles should include service or city plus `CFL Wash Co.`.
- Descriptions should be claim-safe and locally specific.

Canonical:

- Every indexable page needs a self-referencing canonical.
- Use `https://cflwash.com` as the production domain.
- Do not canonicalize production pages to the Cloudflare Pages preview URL.

Sitemap:

- Include all indexable production pages.
- Exclude thank-you pages, form endpoints, drafts, and thin placeholders.
- Keep sitemap URLs on `https://cflwash.com`.

Robots:

- Allow normal crawling for public pages.
- Keep sitemap reference current.
- `public/robots.txt` currently allows `OAI-SearchBot`; keep this intentional if AI-search visibility is desired.

## LocalBusiness And Service Schema Notes

Add schema only after verified business details are ready.

LocalBusiness schema should include:

- Business name
- Website
- Verified phone number
- Service area
- Business type/category
- SameAs links when profiles exist

Service schema may be used for:

- Driveway pressure washing
- Sidewalk and walkway cleaning
- Concrete cleaning

Schema rules:

- Do not include fake aggregate ratings.
- Do not include reviews unless they are real and published with permission.
- Do not claim insurance, licensing, hours, or address data unless verified.
- Keep schema consistent with visible page content.

## AI-Search Visibility Notes

AI search systems need clear, factual, crawlable content.

Rules:

- Use direct page headings and service names.
- State the brand, domain, service areas, and services plainly.
- Keep core facts in HTML, not only images.
- Allow crawlers that the business intentionally wants to support.
- Use real project pages and FAQs to answer specific local queries.
- Avoid exaggerated claims that could be repeated incorrectly.

Useful factual phrasing:

- `CFL Wash Co. provides driveway, sidewalk, walkway, and concrete cleaning in Central Florida.`
- `Primary service areas include Deltona, Orange City, DeBary, DeLand, Sanford, and Lake Mary.`

## Content Rules For Avoiding Thin Or Fake Pages

- Every page must have a real purpose beyond keyword targeting.
- Do not create pages from city/service combinations unless they have unique content.
- Do not invent local projects, reviews, ratings, staff, photos, or case studies.
- Do not use stock photos as proof of completed work.
- Do not make unverified claims about licensing, insurance, ratings, or response time.
- Add project proof and customer language only after the work actually happens.
- Keep copy simple and specific instead of keyword-stuffed.
