# Premium Service Pages Design

- Status: approved through delegated design judgment
- Issue: #92
- Branch: `feat/premium-service-pages`
- Visual reference: the current homepage direction on `dev`

## Goal

Make `/services`, `/driveway-pressure-washing`,
`/sidewalk-walkway-cleaning`, and `/concrete-cleaning` feel like one premium,
conversion-focused service journey while preserving the concrete-first launch
offer, proof-safe media rules, SEO behavior, and quote backend.

## Chosen direction

Use an editorial service-menu system rather than another equal card grid. The
hub will present the three active services as substantial media-led rows with
clear fit guidance and one obvious path into each detail page. The three detail
pages will share a single page pattern so their hero, content rhythm, CTA
hierarchy, and responsive behavior can be tuned centrally.

This direction is preferred over two alternatives:

1. A three-card visual grid would be straightforward but would preserve the
   generic catalog feeling called out in the premium audit.
2. Three bespoke detail layouts could create more page-level variety but would
   introduce theme drift and make later #94 copy work harder to maintain.

## Visual system

The existing navy, cream, water, white, and gold system remains unchanged. No
new palette, gradient, shadow family, icon family, or decorative asset is
introduced. The current proof-safe service illustrations remain the primary
media and keep their visible disclosure captions and media metadata.

The global rhythm refinement is intentionally small:

- prevent split-hero grid items from forcing a desktop-width intrinsic media
  size on mobile;
- tune the interior hero scale and shared layout gaps through tokens rather
  than page-local responsive classes;
- keep section spacing, container gutters, card padding, and CTA spacing owned
  by shared tokens and primitives.

## Service hub composition

1. Split hero with the service offer, quote action, call action, and proof-safe
   service media.
2. Curated service menu with three open, media-led rows. Each row includes the
   service name, current summary, concise fit guidance, and a descriptive link.
3. Compact connected-surface guidance explaining how one quote can include
   related concrete areas without presenting a new bundled service.
4. Restrained service-area bridge.
5. One decisive branded final CTA.

The hub remains a service chooser, not a broad content rewrite or project-proof
page.

## Service detail composition

All three routes use one shared `ServiceDetailPage` pattern with page-owned
content data.

1. Split hero with a shorter service-specific H1, concise fit statement,
   primary quote CTA, call CTA when the verified phone is available, email
   fallback otherwise, and the registered proof-safe illustration.
2. Open scope list for included surfaces or situations. This avoids another
   card grid while keeping all current service boundaries visible.
3. One guidance band combining quote considerations with preparation. The
   two subjects remain distinct through headings and dividers, not separate
   stacks of cards.
4. Compact ordered process.
5. Quiet related-service and active-area navigation.
6. Static FAQ rows.
7. One inverse final CTA with quote first and call/email second.

The structure keeps existing content available while reducing repeated visual
weight. Small hero and label edits are allowed for clarity; the full brand
voice and service-copy rewrite remains deferred to #94.

## Responsive behavior

- At 390px and 430px, hero copy wraps inside the viewport, actions are full
  width, the quote and call/email actions appear before hero media, and the
  sticky CTA does not cover required content.
- At 768px, the composition remains stacked with deliberate spacing and no
  premature desktop density.
- At 1024px and 1440px, split heroes and editorial menu rows use balanced copy
  and media columns with a readable measure.
- Every affected route must have no horizontal overflow, one H1, visible CTA
  access, intact images, and no console or page errors.

## Accessibility and semantics

- Preserve one H1 per route and logical H2/H3 order.
- Preserve visible focus states and minimum control target sizes.
- Keep service selection as real links with descriptive accessible text.
- Preserve ordered-list semantics for process steps and list semantics for
  scope and preparation items.
- Keep image alt text, intrinsic dimensions, proof-status attributes, and
  visible illustrative captions.

## SEO, analytics, and claim safety

- Preserve current titles, meta descriptions, canonicals, breadcrumbs,
  breadcrumb schema, sitemap inclusion, and indexability.
- Preserve `data-cta` and `data-cta-location` tracking values.
- Do not add services, cities, completed-project language, before/after proof,
  reviews, ratings, rankings, guarantees, insurance claims, same-day claims,
  fixed pricing, booking, payment, roof cleaning, house washing, sealing,
  repair, or restoration.
- Keep all media registered through `publicMedia` and marked `not-proof`.

## Component boundaries

- `HeroSection` owns the shared split layout and mobile min-width behavior.
- `ServiceMenu` owns the hub's repeated service-menu rows.
- `ServiceDetailPage` owns the shared detail-page composition and CTA fallback
  logic while receiving route-specific content as data.
- Existing `Section`, `SectionHeader`, `MediaFrame`, `ProcessSteps`, `LinkGrid`,
  `FAQList`, `CTASection`, `Button`, and `IconBadge` primitives remain the
  building blocks.
- Service detail content types and records live under `src/data/` so #94 can
  revise copy without forking layout markup.

## Verification

Automated verification must cover the new shared structures, CTA tracking,
SEO invariants, registered proof-safe media, and claim restrictions. Required
commands are:

- `pnpm check`
- `pnpm build`
- `pnpm audit:patterns`
- `pnpm audit:site`
- `git diff --check`

Rendered QA covers all four routes at 390px, 430px when checking mobile hero
and CTA spacing, 768px, 1024px, and 1440px. The current homepage is the visual
reference because the user opted out of token-intensive generated concepts.
