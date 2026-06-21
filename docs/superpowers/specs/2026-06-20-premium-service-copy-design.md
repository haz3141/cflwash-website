# Premium Service Copy Design

- Status: approved for implementation
- Issue: #94
- Parent: #89
- Baseline: `dev` at `2881132`, including the #92 service-page system from PR #106
- Routes: `/`, `/services`, `/driveway-pressure-washing`,
  `/sidewalk-walkway-cleaning`, `/concrete-cleaning`

## Purpose

Rewrite the homepage and service-route copy so CFL Wash Co. sounds like a
premium local exterior-cleaning brand: direct, practical, homeowner-focused,
and confident about its concrete-first offer. The copy must make the active
service and quote path easier to understand without adding proof, capabilities,
or promises the business has not verified.

## Chosen approach

Use a structure-preserving full rewrite. Keep the #92 layouts, components,
section order, media, CTA hierarchy, tracking attributes, routes, schema, and
quote behavior intact. Replace the copy inside the existing content slots,
including centralized service data and the restrained homepage strings that
still sound broad, procedural, or generic.

This approach is preferred over:

1. A phrase-only cleanup, which would leave the repetitive narrative and weak
   service differentiation in place.
2. New copy-specific layout slots, which would create unnecessary design risk
   immediately after #92 and exceed the content scope of #94.

## Voice system

### Lead with concrete homeowner context

- Name the surface first: driveway, sidewalk, walkway, entry path, patio, pad,
  apron, curb, or entry slab.
- Describe visible concerns in plain language: everyday grime, organic buildup,
  tire marks, irrigation staining, or a front approach that looks overlooked.
- Connect the service to curb appeal, property upkeep, or an HOA notice without
  promising a specific result.

### Use calm confidence

- State what CFL Wash Co. cleans and how a homeowner starts.
- Prefer short, active sentences over repeated references to review, scope,
  appropriateness, or scheduling policy.
- Use one expectation note where it matters instead of repeating caveats in the
  hero, service list, process, FAQ, and final CTA.

### Keep conversion language consistent

- Use `Request a Quote` as the primary CTA label.
- Do not use `free quote` until no-cost quotes are operationally verified for
  every path.
- Distinguish a quote request from booking, pricing confirmation, scheduling,
  or guaranteed service.
- Ask for a city or address, useful photos, access notes, priority areas, and
  HOA wording only where those details help the next step.

### Preserve claim safety

- Do not promise complete stain removal, like-new results, safety improvements,
  response times, acceptance of specialty surfaces, or a guaranteed visit.
- Keep pavers, coatings, paint, exposed aggregate, cracks, and set-in staining
  framed as details that can change the approach or visible result.
- Keep repair, resurfacing, restoration, and sealing outside the active offer.
- Preserve every proof-safe media disclosure; illustrative images remain
  category support, not completed-project evidence.

## Route design

### Homepage

- Narrow the hero from broad exterior cleaning to driveway and residential
  concrete cleaning.
- Replace process-heavy trust labels with concrete service, local coverage,
  quote simplicity, and clear-visit language.
- Tighten the six service/situation cards without turning HOA notice support or
  curb-appeal cleanup into standalone services.
- Replace generic premium language in the dark brand section with a focused,
  straightforward service promise.
- Keep the final quote instructions concise and replace `Get Your Free Quote`
  with `Request a Quote`.
- Preserve the #102 hero composition and all homepage media treatment.

### Service hub

- Make the hero a simple service chooser: start with the primary surface and
  include connected concrete in the same request.
- Differentiate the three active services by homeowner fit:
  driveway/front approach, walking/entry surfaces, and other concrete areas.
- Remove taxonomy and internal-process phrasing from the service menu,
  connected-area guidance, service-area link, and final CTA.
- Preserve the #92 `ServiceMenu`, section rhythm, hero actions, and final CTA
  composition.

### Driveway pressure washing

- Anchor the page in the front approach and curb appeal.
- Describe visible driveway buildup without implying every stain will clear.
- Consolidate condition, water flow, room to work, and set-in staining in the
  existing guidance section.
- Make preparation and the three-step process practical and non-repetitive.
- Keep specialty-surface and HOA questions precise and useful.

### Sidewalk and walkway cleaning

- Anchor the page in the path from the street to the door.
- Keep sidewalk panels, front walks, entry paths, and connected walking areas
  distinct from the driveway service.
- Discuss doors, landscape edges, drainage, access, and older marks once in the
  guidance section.
- Avoid safety guarantees or language that implies every public sidewalk can be
  serviced.

### Concrete cleaning

- Position the page as the option for concrete beyond the driveway or primary
  walkway.
- Use patios, pads, aprons, curbs, and entry slabs as concrete examples without
  creating additional service categories.
- Keep the surface selector short, then concentrate finish, water flow, access,
  and staining limits in one section.
- State explicitly in the FAQ that sealing, repair, resurfacing, and restoration
  are not offered at launch.

## Metadata

Metadata may be tightened when it improves accuracy:

- Homepage title should identify concrete pressure washing rather than broad
  pressure washing.
- Service descriptions should name the service and Central Florida once, then
  state the quote action naturally.
- Every affected route must retain a unique title, description, self-canonical,
  sitemap entry, breadcrumbs where present, and structured data behavior.

## Files and ownership

- `src/components/home/HomeHero.astro`: homepage hero and benefit labels.
- `src/pages/index.astro`: homepage metadata, trust strip, service cards, brand
  section, and final quote content.
- `src/data/services.ts`: shared service descriptions and hub summaries.
- `src/pages/services.astro`: service-fit guidance, hub copy, and hub metadata.
- `src/data/serviceDetailPages.ts`: all three service-detail narratives and
  metadata.
- `docs/design/PREMIUM_POLISH_AUDIT.md`: durable #94 implementation and rendered
  QA record after verification.

No new component, content schema, or page-local style is required.

## Acceptance evidence

Completion requires:

- a diff limited to the approved content files and QA documentation;
- rendered review of all five routes at 390, 430, 768, 1024, and 1440 CSS
  pixels;
- intentional heading wraps, visible primary CTAs, no overflow or broken media,
  and preserved #92 page composition;
- a content audit confirming no unsupported proof, service, city, guarantee,
  response-time, booking, price, licensing, insurance, or stain-removal claim;
- passing `pnpm check`, `pnpm build`, `pnpm audit:patterns`,
  `pnpm audit:site`, and `git diff --check`.
