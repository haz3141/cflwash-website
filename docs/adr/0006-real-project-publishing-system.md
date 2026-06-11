# ADR 0006: Real Project Publishing System

## Status

Proposed

## Issue

GitHub issue: [#40 Design the real-project and before-after publishing system](https://github.com/haz3141/cflwash-website/issues/40)

Related architecture: issue #39 and PR #48 define a private quote-photo workflow. This ADR does not depend on that branch or file. It repeats the required media-governance boundaries so project publishing can be reviewed independently.

## Context And Problem Statement

CFL Wash Co. should eventually publish real project pages, before-and-after imagery, and location-relevant case studies after actual jobs exist and customer permission is recorded. Those pages can support trust, conversion, and local SEO. They also create risk if the site publishes thin local pages, invented proof, private property details, customer identities, or outcomes that cannot be verified.

The current site is an Astro static site on Cloudflare Pages. Current public routes are the homepage, request quote, thank-you, three service pages, and three service-area pages. Current SEO docs reserve future `/projects/[slug]` pages only after real project proof exists. This branch must not create routes, content collections, runtime schema files, image components, CMS integrations, public fixtures, or sample customer proof.

## Goals

- Define a claim-safe publishing architecture for real completed projects.
- Require factual verification and permission before any public project page exists.
- Keep private quote media, internal job media, public project photos, and testimonials separate.
- Prefer the simplest architecture that fits Astro and Cloudflare Pages without premature recurring cost.
- Define fields, states, validation, privacy, SEO, accessibility, image, takedown, and implementation sequencing rules.
- Provide a schema-only fictional fixture inside documentation only.

## Non-Goals

- No runtime implementation.
- No public project routes.
- No Astro content collection creation.
- No runtime schema files.
- No image components or media library.
- No external CMS.
- No sample customer project, testimonial, review, or proof.
- No Cloudflare resource provisioning or production setting changes.

## Proof And Permission Principles

- Every public project page must document a real completed CFL Wash Co. job.
- Project facts must be verified before publication.
- Customer permission must be recorded before publishing private property media.
- Quote photo consent is not project-publication consent.
- Completing a job is not project-publication consent.
- Permission to publish photos is not permission to publish a testimonial.
- Permission to name a city is not permission to identify a neighborhood, subdivision, street, property, or customer.
- Publication must be explicit, auditable, and reversible.

## Separation Of Facts, Images, Identity, Testimonial, And Location

Treat these records as separate:

- **Project facts:** service performed, date granularity, surfaces cleaned, scope, condition, outcome, limitations.
- **Project images:** before/after images selected and sanitized for public use.
- **Customer identity:** name, initials, address, contact information, or other identifying details.
- **Customer testimonial:** review or quote text, source, and permission.
- **Location disclosure:** city, broader area, neighborhood, or property-level details.

Publishing one class of data does not authorize publishing another.

## Minimum Verification Record Before Publication

Each project must have an internal verification record with:

- Completed job date or approved generalized date.
- Service type or types actually performed.
- Verified city or approved broader location.
- Surface type and condition notes.
- Scope performed.
- Outcome wording with limitations.
- Media ownership or customer permission source.
- Staff reviewer.
- Claims-policy review date.
- Permission record ID.
- Last verification date.

## Required Permission Record Before Publication

The permission record must document:

- Customer or property-authorized approver.
- Approved media IDs or image groups.
- Approved location granularity.
- Whether house numbers, vehicles, people, or neighboring properties may appear.
- Whether customer name or initials may appear.
- Whether a testimonial is approved, if one is used.
- Approval date.
- Expiration or withdrawal conditions, if any.
- Takedown contact path.

Permission records should remain private operational records, not public frontmatter fields.

## Shared Media Governance

Media classes are separate:

- Privately submitted quote photos.
- Internally retained job documentation.
- Approved before-and-after project media.
- Publicly published project media.
- Customer reviews or testimonials.

Rules:

- Private media must not become public automatically.
- Internal job documentation must not become public automatically.
- Publication requires a separate explicit approval record.
- Testimonial or review publication requires separate permission from photo/project publication.
- Location permission must be applied at the narrowest approved level.

Recommended permission states:

- `received_privately`
- `pending_review`
- `internal_use_approved`
- `publication_permission_requested`
- `publication_approved`
- `publication_denied`
- `withdrawn`
- `retention_expired`
- `deleted`
- `takedown_requested`

## Architecture Option Comparison

| Option                                                                            | Schema validation                           | Draft and approval control                            | Image organization and responsive output                    | Authoring complexity       | SEO and sitemap control                                                               | Privacy and takedown                                        | Recurring cost                  | Decision                                                                            |
| --------------------------------------------------------------------------------- | ------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------------- | -------------------------- | ------------------------------------------------------------------------------------- | ----------------------------------------------------------- | ------------------------------- | ----------------------------------------------------------------------------------- |
| Astro content collections with local Markdown or MDX and repository-managed media | Strong: schema validation and typed entries | Strong: build only approved/published entries         | Strong: local `src` images can use Astro image optimization | Moderate but durable       | Strong: route generation, noindex, internal links, and sitemap inclusion can be gated | Strong when private permissions stay outside public content | No new recurring CMS cost       | Recommended                                                                         |
| Structured TypeScript or JSON for a very small project count                      | Medium: custom validation required          | Medium: workable for a few entries, fragile over time | Medium: image imports can work but organization drifts      | Low at first, higher later | Medium: easy to miss filters as routes grow                                           | Medium: takedown depends on manual discipline               | No new recurring cost           | Rejected as canonical architecture; acceptable only for a temporary micro-prototype |
| External CMS or storage-backed publishing after demand justifies it               | Strong if CMS workflow is configured well   | Strong but outside repo review                        | Strong or weak depending on CMS/media pipeline              | High for current stage     | Medium: remote drafts and webhook/build behavior require more controls                | Medium to strong, but multi-system takedown is harder       | New vendor and operational cost | Deferred                                                                            |

## Recommended Content Architecture

Use an Astro content collection named `projects` in a future implementation. Markdown should be the default authoring format. MDX should be allowed only when a project genuinely needs reusable inline components and the review workflow can handle the extra complexity.

Store public project media as repository-managed local images under `src`, not unprocessed files in `public`, so Astro can optimize responsive output. Keep private permission records and customer-sensitive operational notes outside the public content collection.

The future implementation must generate project routes only for entries whose state and gate fields prove they are approved for publication. Drafts, review entries, withdrawn entries, schema-only fixtures, and denied projects must not generate routes, internal links, or sitemap entries.

## Rejected Alternatives

- **Plain TypeScript or JSON as the long-term source of truth:** simple at the first one or two projects, but easy to grow into custom validation and scattered media rules.
- **External CMS at launch:** premature recurring cost and operational surface before there is enough publishable project volume or editor demand.
- **Public folder proof images:** unprocessed public files are easier to expose accidentally and harder to govern with content entries.
- **Placeholder or fictional project examples:** violates claim safety and thin-content rules.
- **Publishing an index before any approved project exists:** creates a thin or empty route.

## Content Schema

Required future fields:

- `slug`
- `title`
- `excerpt`
- `status`
- `indexable`
- `canonicalPath`
- `serviceTypes`
- `city`
- `locationDisclosureScope`
- `projectDate`
- `dateGranularity`
- `surfacesCleaned`
- `conditionNotes`
- `scopePerformed`
- `outcomeSummary`
- `limitations`
- `beforeAfterPairs`
- `relatedServiceSlugs`
- `relatedCitySlug`
- `permissionRecordId`
- `verificationRecordId`
- `mediaOwnershipRecordId`
- `claimsReviewedAt`
- `lastVerifiedAt`

Optional fields:

- `neighborhood` only when explicitly approved and useful.
- `customerDisplayName` only when separately approved.
- `testimonial` only when separately approved.
- `correctionNotice` for factual or media corrections.
- `withdrawalReason` for removed entries.

## Publication-State Model

Recommended states:

- `draft`: private work in progress; no public output.
- `pending_review`: facts or media gathered; no public output.
- `approved`: verified and permissioned, eligible for a future publish commit.
- `published`: generated as a public page, included in sitemap and internal links.
- `corrected`: published with documented factual or media correction.
- `withdrawn`: removed from public routes, sitemap, and links due to permission, quality, or business decision.
- `archived`: retained internally but not public.

Only `published` and `corrected` entries may generate public output.

## Draft, Approved, Published, Withdrawn, And Archived Behavior

- `draft` and `pending_review`: never route, never link, never sitemap, never proof-module output.
- `approved`: may exist in the repository but should not route until status becomes `published`.
- `published`: route, canonical, sitemap, indexable page, internal links, and proof modules are allowed.
- `corrected`: route remains public, with updated content and internal correction record.
- `withdrawn`: route removed or marked non-indexable during transition, removed from sitemap and internal links, and media removed from public output.
- `archived`: no public output; retained only under an internal retention policy.

## Required Field Validation

Future schema validation must enforce:

- Slug shape and uniqueness.
- Status enum.
- At least one current launch service type.
- City must match an active service area or approved broader area.
- Exact address prohibited.
- Neighborhood optional and allowed only with explicit approval.
- Project date granularity must be one of exact day, month, season, or year.
- Outcome and limitation fields required.
- At least one approved before/after pair before a detail page is publishable.
- Alt text and captions required for each public image.
- Permission, verification, and media ownership record IDs required before publication.
- `indexable` must be false unless status is `published` or `corrected`.

## Rules That Prevent Accidental Publication

- Route generation filters by state and approval gates.
- Sitemap generation includes only public published/corrected project URLs.
- Project index renders only public published/corrected projects.
- Service-page and city-page proof modules query only public published/corrected projects.
- Schema-only fixtures must live inside docs and never under runtime content paths.
- Permission records must be stored outside public route-generating data.
- Build checks should fail when a publishable entry lacks required proof and permission fields.

## Schema-Only Example Fixture

This example is fictional, schema-only, and documentation-only. It does not represent a completed CFL Wash Co. project. It must not be copied into `src/content`, generate a route, enter the sitemap, appear in build output, or be used as public proof.

```yaml
slug: fictional-city-driveway-cleaning-schema-example
title: Fictional City Driveway Cleaning Schema Example
excerpt: Fictional example showing required project fields only.
status: draft
indexable: false
canonicalPath: null
serviceTypes:
  - driveway-pressure-washing
city: Fictional City
locationDisclosureScope: city
projectDate:
  value: '2026-06'
  granularity: month
surfacesCleaned:
  - concrete driveway
conditionNotes: Fictional condition note for schema demonstration only.
scopePerformed: Fictional scope summary for schema demonstration only.
outcomeSummary: Fictional outcome wording with no claim of guaranteed results.
limitations: Fictional limitation note explaining that some staining may remain.
beforeAfterPairs:
  - beforeImage: docs-only/fictional-before.webp
    afterImage: docs-only/fictional-after.webp
    beforeAlt: Fictional before image alt text for schema demonstration.
    afterAlt: Fictional after image alt text for schema demonstration.
    caption: Fictional caption. Not a CFL Wash Co. project.
    sameAngle: true
    wetDryNotes: Fictional note about lighting and drying.
relatedServiceSlugs:
  - driveway-pressure-washing
relatedCitySlug: null
permissionRecordId: fictional-docs-only-permission-record
verificationRecordId: fictional-docs-only-verification-record
mediaOwnershipRecordId: fictional-docs-only-media-record
testimonial: null
claimsReviewedAt: null
lastVerifiedAt: null
```

## Project Index Behavior

- Do not create `/projects` until at least one verified, permissioned, published project exists.
- Initial index should be a simple chronological list.
- Do not show empty, coming-soon, or sample project cards.
- Each card should show title, city or approved broader area, service type, excerpt, one approved image, and link to the project page.
- Do not show customer names, addresses, ratings, or reviews unless separately approved and verified.

## Individual Project-Page Specification

Each future project page should include:

- H1 with service and approved location.
- Short context and quote-safe summary.
- Before/after media section.
- What was cleaned.
- Surface condition and constraints.
- Outcome and limitations.
- Related service and city links.
- CTA to request a similar quote.
- Optional testimonial only with separate permission.
- No address, exact property identification, or unsupported claim.

## Optional Before-And-After Component Requirements

- Default layout should work as side-by-side or stacked images without interaction.
- A slider or comparison control may be added later only if it has a keyboard-operable alternative and does not depend on drag-only interaction.
- Labels must identify before and after states in visible text.
- The component must support captions and wet/dry or lighting notes.
- Images must have stable dimensions to avoid layout shift.

## Mobile And Keyboard Accessibility Requirements

- All project media and navigation must work at mobile widths.
- Interactive controls must be reachable and operable by keyboard.
- Do not require dragging as the only way to compare images.
- If a pointer gesture is used, provide a single-pointer or button alternative.
- Maintain visible focus states.
- Captions and alt text must not be hidden from assistive technology when they convey meaning.

## Responsive Image Formats And Sizes

Future implementation should use Astro image tooling for repository-managed media:

- Generate responsive sizes for mobile, tablet, and desktop layouts.
- Prefer modern formats such as WebP or AVIF when compatible with the existing image pipeline.
- Preserve original source images privately or internally only when retention is approved.
- Use width, height, and aspect-ratio constraints to prevent layout shift.
- Keep Open Graph images separate from project proof when proof is not approved for sharing.

## Image Naming And Organization

Recommended future path:

```text
src/assets/projects/{project-slug}/before-01.webp
src/assets/projects/{project-slug}/after-01.webp
```

Rules:

- Do not include customer names, addresses, phone numbers, HOA names, or exact neighborhoods in filenames.
- Use stable project slugs that do not identify the property.
- Keep originals, edited public images, and derived images distinct.
- Do not place schema-only examples in runtime asset paths.

## EXIF And GPS Treatment

- Strip GPS and EXIF location data before publication.
- Do not expose camera metadata that can identify a property, timestamp pattern, device, or person.
- IPTC/XMP ownership or license metadata may be retained or added only when it does not leak private location or customer details.
- Do not rely on metadata as the only ownership record; keep a separate private media ownership record.

## Sensitive Visual Information Rules

Before publication, inspect images for:

- Faces.
- Children.
- License plates.
- House numbers.
- Mail labels.
- HOA documents.
- Gate codes.
- Security systems.
- Vehicle identifiers.
- Neighboring properties.
- Interior or private areas.
- Payment or identity documents.

If any of these appear, crop, blur, reject, or obtain explicit additional approval before publication. Children, payment documents, identity documents, gate codes, and private interior areas should not be published for ordinary project proof.

## Alt Text And Caption Rules

- Alt text should describe the visible project image and relevant surface state.
- Do not include exact addresses or customer names in alt text.
- Do not stuff service-area keywords.
- Captions should identify before/after state, surface type, approved city or broader area, and any wet/dry or lighting limitation.
- If an image is decorative, use empty alt text, but project proof images are normally informative.

## Media Ownership And License Record

Each public image needs a private record showing:

- Photographer or source.
- Ownership or license basis.
- Customer/property publication permission.
- Approved usage: website, social, ads, print, or internal only.
- Approved duration or withdrawal terms.
- Required credit, if any.
- Sanitization performed.

## Customer Permission Record

Permission must be recorded before publication and must identify:

- Which images or image groups are approved.
- What location granularity is approved.
- Whether property identifiers may remain visible.
- Whether customer identity may appear.
- Who approved publication and when.
- How withdrawal or correction requests are handled.

## Testimonial Permission As A Separate Record

Do not publish testimonials or reviews because photo permission exists.

Testimonial record must separately identify:

- Exact testimonial text or source platform.
- Approved display name.
- Approved page or placement.
- Review source link, when practical.
- Permission date.
- Withdrawal process.

## Location-Granularity Rules

- Exact address is prohibited.
- City or broader area is the default.
- Neighborhood, subdivision, HOA, or corridor may be used only when explicitly approved and useful to the homeowner.
- Permission to name a city does not grant permission to identify a neighborhood or property.
- Avoid location detail in filenames, alt text, captions, URLs, schema, and Open Graph when not approved.

## Outcome And Limitation Wording

Use realistic wording:

- Surface grime was cleaned.
- Visible buildup was reduced.
- Driveway or concrete appearance improved.
- Result depended on surface age, staining, drainage, and prior treatments.

Avoid:

- Guaranteed stain removal.
- Restoration claims.
- Like-new claims as a guaranteed result.
- HOA approval or compliance guarantees.
- Increased property value.
- Permanent results.
- Eco-friendly, licensed, insured, or other unverified claims.

## Anti-Thin-Content Requirements

- One page per real completed project.
- No cloned pages with swapped city or service names.
- No project page without unique facts, media, and outcome notes.
- No indexable page for a single image with minimal copy.
- No doorway pages for city/service permutations.
- No fake counts, ratings, testimonials, or awards.
- No stock photos as project proof.

## Duplicate-Content Prevention

- Each project must have one canonical URL.
- Reuse project proof modules on service and city pages by linking to the canonical project page.
- Do not publish separate pages for the same project under each service or city variation.
- If one job covered multiple services, use one project page with multiple related services.

## Internal-Linking Rules

- Each project page links to the relevant service page.
- Each project page links to one approved city/service-area page when location permission allows it.
- Service pages may link to relevant published projects.
- City pages may link to relevant published projects from that approved city or broader area.
- Anchor text should be descriptive and natural.
- Do not create grids of thin city/service links.

## Service-Page And City-Page Proof-Module Behavior

- Omit proof modules when no approved project exists.
- Do not show coming-soon placeholders.
- Modules may show one to three relevant published projects.
- Cards must not reveal more location detail than approved.
- Proof modules should support existing service/city content, not replace it.

## Sitemap, Canonical, Noindex, And Draft Exclusion Behavior

- Published/corrected project pages get self-referencing canonicals.
- Draft, pending, approved-but-unpublished, withdrawn, archived, and schema-only documentation examples are excluded from sitemap output.
- Transition pages should use `noindex` only when a route temporarily remains reachable during withdrawal or correction.
- Do not block a page with `robots.txt` when relying on `noindex`.
- Sitemap and internal-link queries must use the same publication gate.

## Structured-Data Recommendation

Start without project-specific structured data unless the implementation can keep it fully consistent with visible content and permission records.

If added later, prefer conservative page-level structured data such as `WebPage` with `ImageObject` references for approved public images. Do not add `Review`, aggregate ratings, LocalBusiness fields, address details, or unsupported service claims. Use schema only for facts visible on the page and approved for publication.

## Pagination And Filtering Thresholds

- 1 to 6 published projects: simple chronological index.
- 7 to 12 published projects: consider pagination only if page weight or scanning suffers.
- More than 12 published projects: consider service or city filters only if each filter has enough unique published projects to avoid thin filtered views.
- Do not generate indexable filtered pages until there is a separate SEO decision.

## Takedown, Correction, And Permission-Withdrawal Procedures

When a takedown or withdrawal request is received:

1. Verify the requester and permission record.
2. Mark project state as `withdrawn` or remove the public entry.
3. Remove public images from project pages, proof modules, Open Graph images, sitemap, and internal links.
4. Rebuild and redeploy.
5. Document the action, date, reviewer, and remaining internal retention status.

For factual corrections:

1. Verify the correction source.
2. Update the page and any linked proof modules.
3. Preserve a private correction record.
4. Rebuild and redeploy.

This architecture does not guarantee legal compliance. Privacy policy updates, customer-facing consent language, terms or disclosure review, legal review, and operational procedures may be required before production.

## Rollout Strategy

1. Wait for real completed projects with approved media and permission records.
2. Implement schema and build gates before route templates.
3. Add one real verified project internally and confirm draft exclusion.
4. Publish only after permission and claims review.
5. Add project index only when at least one project is public.
6. Add proof modules to service/city pages after project pages work.
7. Add filters, pagination, or CMS only after real volume justifies them.

## Open Questions

- Where will private permission records live before a CRM exists?
- Who approves publication and takedown requests?
- What image sanitization toolchain will strip EXIF/GPS and prepare public derivatives?
- Will public project pages use Markdown only or allow MDX for selected entries?
- What minimum number of projects justifies `/projects` index publication?
- Should project pages use any structured data in the first implementation, or wait until several pages exist?
- How long should public-project source media be retained after takedown?

## Proposed Bounded Implementation Issues

| Title                                                | Goal                                                                              | Dependencies                                      | Likely files                                               | Acceptance criteria                                                                                | Recommended model                          | Parallel-safe                      |
| ---------------------------------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------- | ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------ | ---------------------------------- |
| Define project schema and private permission record  | Finalize fields, status gates, validation rules, and where private records live   | ADR 0006 approval                                 | Future `src/content.config.ts`, docs under `docs/product/` | Schema prevents publication without required proof, permission, ownership, and verification fields | Frontier model for architecture judgment   | No                                 |
| Add project content collection without public routes | Create collection and build-time validation only                                  | Schema issue                                      | Future `src/content/projects/`, `src/content.config.ts`    | Draft fixtures do not generate routes, sitemap entries, or internal links                          | Mini model                                 | Yes after schema finalizes         |
| Build project detail route and index gates           | Generate `/projects/[slug]` and `/projects` only for published entries            | Collection issue, real approved project available | Future `src/pages/projects/` files, layout components      | Only published/corrected entries route; draft, pending, approved, withdrawn, archived excluded     | Frontier model if SEO/routing is complex   | No                                 |
| Add accessible before/after project presentation     | Build reusable public media component with non-drag comparison fallback           | Detail route issue                                | Future project component files                             | Works on mobile and keyboard; labels, captions, alt text, and stable dimensions present            | Mini model with frontend QA                | Yes if route contract is stable    |
| Add media sanitization and naming workflow           | Document and automate EXIF/GPS removal, naming, and public derivative preparation | Permission record issue                           | Future scripts/docs                                        | Public images have no sensitive metadata, filenames are non-identifying, originals are governed    | Mini model                                 | Yes                                |
| Add service and city proof modules                   | Link relevant published projects from existing service/city pages                 | Published project pages                           | Future service/city page modules                           | Modules omit themselves when no project exists and do not create thin or unsupported claims        | Mini model                                 | Yes after project query API exists |
| Add takedown and correction operations               | Document and test withdrawal/correction workflow                                  | Route and media workflow                          | Future operations docs and audit scripts                   | Withdrawn project leaves no route, sitemap entry, internal link, or public image reference         | Frontier model for policy-sensitive review | No                                 |

## Authoritative Sources

All source URLs were accessed on 2026-06-11. Product behavior and search guidance must be rechecked before implementation.

| Source                                                                                                                                | Supports                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| [Astro content collections](https://docs.astro.build/en/guides/content-collections/)                                                  | Content collection schema validation, type-safe entries, and build-time content organization    |
| [Astro images guide](https://docs.astro.build/en/guides/images/)                                                                      | Local image handling, public image behavior, and image use in content                           |
| [Astro assets reference](https://docs.astro.build/en/reference/modules/astro-assets/)                                                 | Image optimization and transformation APIs                                                      |
| [Google image SEO best practices](https://developers.google.com/search/docs/appearance/google-images)                                 | Image filenames, alt text, page context, and image discovery guidance                           |
| [Google noindex guidance](https://developers.google.com/search/docs/crawling-indexing/block-indexing)                                 | `noindex` behavior and limitations when pages are blocked from crawling                         |
| [Google sitemap overview](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview)                              | Sitemap purpose and inclusion of important public pages                                         |
| [Google image sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps)                          | Image discovery through sitemap metadata                                                        |
| [Google link best practices](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)                             | Crawlable internal links and descriptive anchor text                                            |
| [Google structured-data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)                   | Structured-data consistency and quality policies                                                |
| [Google image license metadata](https://developers.google.com/search/docs/appearance/structured-data/image-license-metadata)          | Structured data and IPTC metadata for images                                                    |
| [WCAG 2.2 Dragging Movements](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html)                                    | Requirement for alternatives to drag-only controls                                              |
| [WAI keyboard compatibility](https://www.w3.org/WAI/perspective-videos/keyboard/)                                                     | Keyboard access expectation for interactive functionality                                       |
| [WAI images tutorial](https://www.w3.org/WAI/tutorials/images/)                                                                       | Alt text treatment for informative and decorative images                                        |
| [IPTC Photo Metadata](https://iptc.org/standards/photo-metadata/)                                                                     | Photo administrative, descriptive, rights, and licensing metadata concepts                      |
| [IPTC quick guide for Google Images](https://iptc.org/standards/photo-metadata/quick-guide-to-iptc-photo-metadata-and-google-images/) | IPTC metadata fields recognized in Google Images contexts                                       |
| [schema.org WebPage](https://schema.org/WebPage)                                                                                      | Conservative page-level structured-data option                                                  |
| [schema.org CreativeWork](https://schema.org/CreativeWork)                                                                            | Generic creative content properties relevant to case-study-like pages                           |
| [schema.org ImageObject](https://schema.org/ImageObject)                                                                              | Image object properties                                                                         |
| [schema.org Review](https://schema.org/Review)                                                                                        | Separate review/testimonial structured-data concerns, not recommended without separate approval |
