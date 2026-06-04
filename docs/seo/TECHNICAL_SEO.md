# Technical SEO Foundation

## Scope

This document covers crawlability, indexing, metadata, and structured-data readiness only. It does not cover final content writing or keyword strategy.

## Current Foundation

- Astro site URL is set to `https://cflwash.com`
- Pages use a shared layout for title, description, canonical, robots, Open Graph, and Twitter metadata
- `noindex` is supported for utility pages
- `public/robots.txt` exists and points to the sitemap URL
- Service pages and service-area pages have stable file-based routes

## Required Technical Rules

- Every indexable page needs a unique title
- Every indexable page needs a unique meta description
- Canonicals must point to the production domain
- Utility pages must be excluded from indexing
- Sitemap should include only public indexable pages
- Robots should reference the live sitemap

## Structured Data Readiness

Schema can be added later when business details are verified.

Likely schema types:

- LocalBusiness
- Service

Do not add:

- Fake ratings
- Reviews without permission
- Insurance or licensing claims without proof
- Hours or address data without verification

## Site Architecture Notes

- Keep service pages focused on the current MVP services
- Keep service-area pages tied to real coverage intent
- Add project pages only after real project proof exists
- Do not create content pages solely to target keywords

## Separation From Content SEO

Technical SEO owns:

- Metadata
- Canonicals
- Sitemap
- Robots
- Indexing control
- Schema readiness

Content SEO owns:

- Headline and body copy expansion
- FAQs
- Project pages
- Local proof
- Service-area depth
