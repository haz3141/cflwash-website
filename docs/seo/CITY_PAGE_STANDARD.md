# City Page Standard

## Purpose

City service-area pages should help homeowners understand whether CFL Wash Co.'s current launch services fit their property, not create thin local SEO pages. The Deltona page is the first benchmark for this standard.

## Publication Protocol

Every city page must start from a durable research brief in `docs/seo/cities/`.

Use these statuses:

- `VERIFIED`: supported by an official or reliable source.
- `OBSERVED`: directly observed by CFL Wash Co. or the owner and safe to publish.
- `CUSTOMER-DERIVED`: based on real customer/job information, anonymized and approved for publication.
- `NEEDS VERIFICATION`: research lead only; do not publish.
- `DO NOT PUBLISH`: retained internally for context but excluded from public copy.

Only `VERIFIED`, `OBSERVED`, and `CUSTOMER-DERIVED` may inform public copy.

## Required Page Elements

Each benchmark city page must include:

- Unique SEO title, meta description, canonical path, H1, and introduction.
- Natural vocabulary for pressure washing, residential pressure washing, driveway pressure washing, sidewalk and walkway cleaning, concrete cleaning, and power washing only where natural.
- City-specific residential, property, and surface context from the research brief.
- At least three useful homeowner scenarios that would not transfer cleanly to another city.
- Clear launch-service scope with links to `/driveway-pressure-washing`, `/sidewalk-walkway-cleaning`, and `/concrete-cleaning`.
- HOA-notice guidance that asks for notice details without implying affiliation, approval, prior work, or private-rule knowledge.
- Verified neighborhoods, subdivisions, districts, or nearby communities only when they help a homeowner understand service fit or quote logistics.
- Quote-preparation guidance covering surface type, approximate scope, photos, access, gates, vehicles, staining, drainage, prior coatings, and notice details.
- Four to six city-specific FAQs.
- Nearby active-area links without a giant service-area list.
- Request a Quote and Call CTAs using existing `data-cta` analytics attributes.
- Real project proof only when publishable work exists; omit the section rather than adding a placeholder or coming-soon block.
- Conditional wording for pavers, painted concrete, sealed surfaces, decorative finishes, exposed aggregate, and coated surfaces.

## Design And Implementation

- Keep Astro 6 and Tailwind 4.
- Reuse `Layout`, `Section`, `Card`, `Button`, semantic tokens, and existing data structures where practical.
- Preserve the site-wide header, footer, navigation, quote form, mobile sticky CTA, and analytics hooks.
- Keep individual `.astro` page files for the first city batch.
- Avoid turning every section into a three-card grid. Use a mix of editorial layouts, lists, callouts, and scoped cards.
- Keep copy premium, restrained, local, and homeowner-friendly.
- Do not add unsupported structured data, a city-specific business address, dependencies, or new services.

## Claim Safety

Do not publish:

- Reviews, ratings, awards, job counts, years of experience, customer counts, or project examples without proof.
- Licensed, insured, bonded, same-day, guaranteed, top-rated, best, eco-friendly, chemical-free, or safe-for-all-surfaces claims without verification.
- Roof cleaning, house washing, sealing, repair, restoration, fleet washing, or broad commercial washing as active launch services.
- Paver sealing, paver re-sanding, polymeric sand work, paver restoration, concrete repair, resurfacing, or restoration.
- Private HOA rules, HOA approval, HOA affiliation, preferred-vendor status, or legal advice about sidewalk ownership or maintenance.

## Page Review Checklist

Before completion:

- Compare against every active city page.
- Identify which passages are uniquely city-specific.
- Rewrite generic passages that could move to another city unchanged.
- Confirm every named neighborhood, community, HOA, corridor, or boundary note is useful to the homeowner and supported by the brief.
- Confirm paver and non-standard-surface wording remains conditional.
- Confirm no unsupported claims or invented local proof are present.
- Confirm internal links resolve.
- Confirm CTA analytics attributes remain present.
- Review at 390px, 768px, 1024px, and 1440px.
- Run `pnpm format:check`, `pnpm check`, `pnpm build`, and `git diff --check`.

## Anti-Thin-Content Test

A city page fails if most of its substance can be reused by swapping the city name.

The page also fails if it:

- Publishes a keyword list of neighborhoods or HOAs.
- Adds city history, demographics, ZIP codes, attractions, or road names without helping a homeowner prepare a quote.
- Repeats broad service-page content without local value.
- Claims completed work, reviews, affiliations, guarantees, insurance, licensing, rankings, or results that have not been verified.
- Uses arbitrary word count as a substitute for useful local answers.
- Creates new city-service routes without a separate issue and evidence.

## Deltona Benchmark Notes

The Deltona benchmark uses official city and county sources to support a deeper home-market page. Its public copy focuses on Deltona's residential lot pattern, uneven sidewalk availability, right-of-way-adjacent concrete, stormwater and drainage considerations, quote preparation, and boundary-sensitive nearby-area guidance.
