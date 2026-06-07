# CFL Wash Co. Product Requirements

## Purpose

Define the product foundation for the CFL Wash Co. website as a local lead-generation site for Central Florida exterior cleaning.

## Source Of Truth

Use the current repo state, `README.md`, `docs/strategy/CLAIMS.md`, `docs/strategy/SEO.md`, `docs/strategy/LAUNCH.md`, and `docs/design/DESIGN.md` as the canonical inputs for scope and constraints.

## Product Goal

Help homeowners request a quote for driveway, sidewalk, walkway, and concrete cleaning with minimal friction and no unsupported claims.

## Target Audience

Homeowners in Central Florida, with emphasis on:

- Deltona
- Orange City
- DeBary
- DeLand
- Sanford
- Lake Mary

## MVP Scope

The site should support:

- Clear service discovery
- Clear service-area discovery
- Quote request entry points
- Quote confirmation / thank-you routing
- Claim-safe content
- Technical SEO foundation
- Basic analytics hooks

## Non-Goals

Do not add:

- Quote backend
- Online scheduling
- Online payment
- Customer portal
- CRM
- Review harvesting flows
- Blog-first content strategy
- Unsupported trust claims

## Primary Services

The current MVP service set is:

- Driveway Pressure Washing
- Sidewalk and Walkway Cleaning
- Concrete Cleaning

Supportive language may mention HOA notice cleanup and curb appeal cleanup, but those are not separate product pillars yet.

## Quote Strategy

The quote experience progresses through these phases:

1. Contact-based MVP in the current production release on `main`
2. Quote page with a form UI in the integrated release candidate on `dev`
3. Working backend submission flow in the integrated release candidate on `dev`
4. Guided quote estimator

See `docs/product/QUOTE_SYSTEM.md` for the phase detail.

## SEO Strategy

Separate technical SEO from content SEO.

- Technical SEO: crawlability, metadata, canonicals, sitemap, robots, indexing control, structured data readiness.
- Content SEO: copy expansion, FAQs, project proof, and service-area depth after the foundation exists.

See `docs/seo/TECHNICAL_SEO.md`.

## Current Product State

The repo already has:

- Astro + Cloudflare Pages foundation
- Service pages
- Service-area pages for Deltona, Orange City, and DeBary
- Quote-form MVP release candidate at `/request-quote` on `dev` and preview
- Noindexed confirmation route at `/thank-you`
- Metadata/canonical hooks in the shared layout
- Optional GA4 and Cloudflare Web Analytics hooks

## Success Criteria

The foundation is successful when:

- Every primary route has a clear purpose
- The quote path is obvious and honest
- Indexing rules are explicit
- Claim safety is preserved
- Future quote storage, CRM, or estimator work can be added without reworking the site architecture
