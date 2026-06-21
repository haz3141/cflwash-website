# Premium City Pages Design

- Status: approved through delegated design judgment
- Issue: #93
- Branch: `feat/premium-city-pages`
- Dependencies: #91, #98, #102, #92, and #94 on current `dev`
- Visual concepts:
  - `/Users/hazael/.codex/generated_images/019ee7b0-e6bc-7883-968f-f2a2cfd2141a/exec-e185a084-f5df-47ea-b3c0-2102123cd013.png`
  - `/Users/hazael/.codex/generated_images/019ee7b0-e6bc-7883-968f-f2a2cfd2141a/exec-2200e857-a87e-4e79-96bd-04beaf123bff.png`

## Goal

Make `/service-areas` and the six approved city routes feel like one premium,
homeowner-focused local-service journey. The hub must work as a fast coverage
chooser. Each city page must lead with an active service and quote path while
treating civic photography as a small, attributed location reference rather
than conversion proof.

## Chosen direction

Use an editorial coverage system built from the shared interior-page patterns:

1. Move the hub's registered residential artwork into a split hero and replace
   the six bordered city cards with one open, divided city menu.
2. Give each city page an explicit registered service illustration selected by
   its existing homeowner scenario. The visible caption continues to state
   that the image is illustrative and not completed-project photography.
3. Keep one centrally tunable `ServiceAreaPage` implementation, but vary the
   hero media and city-owned content through typed data.
4. Preserve the existing services, reasons, quote steps, FAQs, nearby links,
   SEO data, and tracking. Change only the composition and the small amount of
   copy needed to make the hub hierarchy direct.
5. Reduce the civic image to a compact `City context only` callout inside the
   later local-context section, with the existing rights and attribution text.

This is preferred over two alternatives. Keeping the current generic brand-art
hero on all six pages would preserve visual interchangeability. Creating six
bespoke layouts would introduce theme drift and make the coordinated #95 copy
rewrite unnecessarily difficult.

## Service-area hub composition

1. Soft split hero with the six-city coverage statement, concise concrete-first
   description, quote action, call/email fallback, and registered residential
   brand artwork.
2. White city chooser with six open linked rows in a two-column desktop grid
   and one-column mobile list. Each row uses a map-pin cue, city name, existing
   short description, and descriptive route link.
3. Water-tinted service bridge with the three active canonical service links
   rendered as open navigation, not cards.
4. One inverse final CTA with quote first and call/email second.

The hub includes no civic photography, map boundary, unsupported coverage
claim, or new city.

## Shared city-page composition

1. Soft split hero with city-specific H1 and description, quote action,
   configured call/email fallback, and explicit service illustration.
2. Compact service-fit rail confirming the active concrete focus, quote-first
   workflow, and city coverage.
3. Open service navigation for the three active services.
4. City-owned homeowner scenarios using one stronger lead scenario and two
   quieter supporting scenarios without bordered cards.
5. Local-context section with existing city copy, one concise quote cue, and a
   compact context-only civic image with visible attribution.
6. Warm compact three-step quote process.
7. Soft open FAQ rows, compact nearby-city links, and one inverse final CTA.

The city records keep their current content for #95. This issue does not reduce
or rewrite the six FAQ sets, replace local research, or claim city-specific job
history.

## Media mapping

- Deltona and DeBary: `service-driveway`
- Orange City and DeLand: `service-walkway`
- Sanford and Lake Mary: `service-concrete`

The mapping follows existing page scenarios only. It does not represent work
performed in those cities. Every hero retains `service-illustration`,
`not-proof`, responsive sources, intrinsic dimensions, factual alt text, and
the exact visible proof disclosure. Every civic image remains unique,
`city-context`, `context-only`, lazily loaded, attributed, and secondary.

## Responsive behavior

- At 390px and 430px, hero copy, quote and call/email actions, and media stack
  in that order. Actions are full width and meet the 44px target floor.
- At 768px, city menus and major sections remain comfortably stacked without
  premature desktop columns.
- At 1024px and 1440px, split heroes balance copy and media while the hub menu
  uses two open columns and city pages use deliberate editorial splits.
- No required viewport may show horizontal overflow, clipped copy, broken
  images, a hidden first-view quote path, or sticky/final CTA overlap.

## Accessibility, SEO, tracking, and claims

- Preserve exactly one visible H1, meaningful heading order, semantic lists,
  ordered quote steps, visible focus states, and descriptive link text.
- Preserve titles, descriptions, canonical paths, indexability, sitemap
  inclusion, breadcrumbs, breadcrumb schema, and the six-city inventory.
- Preserve `data-cta` and existing `data-cta-location` values for every city
  hero, local quote link when present, and final CTA.
- Do not change the quote backend, header, footer, homepage, or service-detail
  composition.
- Do not add reviews, ratings, guarantees, insurance/licensing claims,
  rankings, response times, same-day service, completed projects, fixed prices,
  booking/payment, new services, new cities, or full city-copy changes.

## Verification

Automated checks must enforce the hub menu, six explicit hero-media mappings,
compact city-context callouts, proof metadata, CTA locations, process semantics,
SEO invariants, and route inventory. Required commands:

- `pnpm check`
- `pnpm build`
- `pnpm audit:patterns`
- `pnpm audit:site`
- `git diff --check`

Rendered QA covers all seven routes at 390, 430, 768, 1024, and 1440 CSS
pixels, with homepage and current service pages used as the implementation
quality reference. Screenshots and temporary QA data remain outside the repo.
