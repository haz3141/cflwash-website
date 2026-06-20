# Premium Service Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the service hub and three active service-detail routes as a centrally tunable, premium, proof-safe conversion journey for issue #92.

**Architecture:** Keep Astro pages thin and page content data-driven. Add a shared `ServiceMenu` pattern for the hub and a shared `ServiceDetailPage` pattern for the three detail routes, while extending existing audits before each implementation so the new structural, SEO, CTA, and media contracts fail first and remain enforceable.

**Tech Stack:** Astro 6, TypeScript, Tailwind CSS 4, Manrope Variable, Lucide Astro, Node-based repository audits, headless Chrome fallback for responsive QA.

---

## File map

- Modify `scripts/audit-patterns.mjs`: enforce the split-hero mobile sizing contract and register/document new page patterns.
- Modify `scripts/audit-site.mjs`: enforce the service-menu and service-detail structural contracts in built HTML.
- Modify `src/styles/tokens.css`: add only shared interior layout-gap and refined hero-scale tokens.
- Modify `src/components/patterns/HeroSection.astro`: prevent intrinsic media width from expanding the mobile grid.
- Create `src/components/patterns/ServiceMenu.astro`: render the hub's three media-led editorial service rows.
- Create `src/components/patterns/ServiceDetailPage.astro`: own shared service-detail composition and CTA fallback behavior.
- Create `src/data/serviceDetailPageTypes.ts`: define the content contract for one detail page.
- Create `src/data/serviceDetailPages.ts`: preserve and organize current route-specific content, with only small hero edits.
- Modify `src/pages/services.astro`: replace the generic service card grid with `ServiceMenu`.
- Modify the three service-detail route files: pass the matching record to the shared page pattern.
- Modify `docs/design/DESIGN_SYSTEM.md`: document new tokens, rhythm rules, and component APIs.
- Modify `docs/design/PREMIUM_POLISH_AUDIT.md`: record the #92 implementation outcome and responsive QA notes.

### Task 1: Lock and fix the shared mobile hero rhythm

**Files:**

- Modify: `scripts/audit-patterns.mjs`
- Modify: `src/styles/tokens.css`
- Modify: `src/components/patterns/HeroSection.astro`
- Modify: `docs/design/DESIGN_SYSTEM.md`

- [ ] **Step 1: Add a failing split-hero contract audit**

Read `HeroSection.astro` in `scripts/audit-patterns.mjs` and require the shared split layout to include a minimum-width reset and the design system to document `--layout-gap`:

```js
const heroSectionPath = join(patternsDir, 'HeroSection.astro')
const heroSectionSource = readFileSync(heroSectionPath, 'utf8')

if (!heroSectionSource.includes('min-w-0')) {
  failures.push(
    'HeroSection must reset split-grid item minimum width so intrinsic media cannot cause mobile overflow.',
  )
}

if (!designSystem.includes('`--layout-gap`')) {
  failures.push('Design system documentation must define `--layout-gap`.')
}
```

- [ ] **Step 2: Run the audit and verify RED**

Run: `pnpm audit:patterns`

Expected: FAIL with both the missing `min-w-0` contract and missing
`--layout-gap` documentation.

- [ ] **Step 3: Implement the shared rhythm fix**

In `tokens.css`, refine the interior hero minimum and add one shared responsive
layout gap:

```css
--text-hero: clamp(2.25rem, 1.8rem + 2.3vw, 4rem);
/* semantic layout token in :root */
--layout-gap: clamp(2rem, 4vw, 4rem);
```

In `HeroSection.astro`, apply `min-w-0` to the split grid and both split grid
children, and replace the fixed `gap-10` with `gap-[var(--layout-gap)]`. Keep
existing tone, H1, CTA slot, media slot, and desktop column behavior intact.

Document the token and the mobile intrinsic-width rule in
`DESIGN_SYSTEM.md`.

- [ ] **Step 4: Verify GREEN**

Run: `pnpm audit:patterns && pnpm build && pnpm audit:site`

Expected: all three commands exit 0.

- [ ] **Step 5: Commit the shared rhythm change**

```bash
git add scripts/audit-patterns.mjs src/styles/tokens.css \
  src/components/patterns/HeroSection.astro docs/design/DESIGN_SYSTEM.md
git commit -m "fix(design-system): stabilize interior hero rhythm"
```

### Task 2: Replace the hub card catalog with a premium service menu

**Files:**

- Modify: `scripts/audit-patterns.mjs`
- Modify: `scripts/audit-site.mjs`
- Create: `src/components/patterns/ServiceMenu.astro`
- Modify: `src/pages/services.astro`
- Modify: `docs/design/DESIGN_SYSTEM.md`

- [ ] **Step 1: Add failing service-menu audits**

Add `ServiceMenu.astro` to `requiredComponents` in `audit-patterns.mjs`. In
`audit-site.mjs`, inspect `/services` built HTML and require:

```js
const serviceMenu =
  servicesHub.match(
    /<div\b[^>]*data-service-menu[^>]*>[\s\S]*?<\/div>/i,
  )?.[0] ?? ''

if (!serviceMenu) {
  failures.push('The services hub must render the curated service menu.')
}

if (countOccurrences(serviceMenu, 'data-service-menu-item') !== 3) {
  failures.push(
    'The services hub service menu must contain exactly three active services.',
  )
}

for (const { id } of serviceIllustrations) {
  if (!serviceMenu.includes(`data-media-id="${id}"`)) {
    failures.push(
      `The services hub service menu must render registered media \`${id}\`.`,
    )
  }
}

if (countOccurrences(serviceMenu, 'data-service-fit') !== 3) {
  failures.push('Every service-menu item must include concise fit guidance.')
}
```

Because a non-greedy single closing `div` cannot safely capture nested markup,
implement the production marker as a non-nested `<section data-service-menu>`
or extract menu bounds using explicit `<!-- service-menu:start/end -->`
comments. Use one robust strategy in both markup and audit.

- [ ] **Step 2: Build and verify RED**

Run: `pnpm build && pnpm audit:patterns && pnpm audit:site`

Expected: FAIL because `ServiceMenu.astro`, its documentation heading, and the
hub markers do not exist.

- [ ] **Step 3: Create `ServiceMenu.astro`**

Define the exact item API:

```ts
type ServiceMenuItem = {
  slug: string
  name: string
  summary: string
  fit: string
  media: PublicMediaAsset
  icon: any
}

type Props = { items: ServiceMenuItem[] }
```

Render one semantic list containing three editorial rows. Each row must:

- include `data-service-menu-item`, `data-media-id`, `data-media-role`, and
  `data-proof-status` on the row;
- render a responsive `<img>` with intrinsic dimensions and registered alt;
- render the visible proof-safe caption;
- use an open layout with borders and whitespace rather than a nested `Card`;
- place icon, service name, summary, `data-service-fit`, and descriptive link in
  the content column;
- stack media before content on mobile and use balanced columns at `lg`;
- use only semantic tokens, shared shadow utilities, and Lucide icons.

- [ ] **Step 4: Compose the hub through the new pattern**

In `services.astro`, build `serviceMenuItems` from the existing `services`
records, `serviceFits`, `publicMedia`, and icon map. Replace only the current
three-card service grid with `<ServiceMenu items={serviceMenuItems} />`.
Preserve the hero, connected-surface guidance, area link, metadata, canonical,
breadcrumbs, CTA tracking values, and final CTA.

Document `#### ServiceMenu` and its responsive/media rules in
`DESIGN_SYSTEM.md`.

- [ ] **Step 5: Verify GREEN**

Run: `pnpm build && pnpm audit:patterns && pnpm audit:site`

Expected: all commands exit 0 and the pattern report lists `ServiceMenu` on
`src/pages/services.astro`.

- [ ] **Step 6: Commit the hub redesign**

```bash
git add scripts/audit-patterns.mjs scripts/audit-site.mjs \
  src/components/patterns/ServiceMenu.astro src/pages/services.astro \
  docs/design/DESIGN_SYSTEM.md
git commit -m "feat(services): add premium service menu"
```

### Task 3: Centralize and redesign the three service-detail pages

**Files:**

- Modify: `scripts/audit-patterns.mjs`
- Modify: `scripts/audit-site.mjs`
- Create: `src/data/serviceDetailPageTypes.ts`
- Create: `src/data/serviceDetailPages.ts`
- Create: `src/components/patterns/ServiceDetailPage.astro`
- Modify: `src/pages/driveway-pressure-washing.astro`
- Modify: `src/pages/sidewalk-walkway-cleaning.astro`
- Modify: `src/pages/concrete-cleaning.astro`
- Modify: `docs/design/DESIGN_SYSTEM.md`

- [ ] **Step 1: Add failing service-detail structure audits**

Add `ServiceDetailPage.astro` to `requiredComponents`. For each route in
`serviceDetailRoutes`, require exactly one of each shared structure and the
existing tracked hero/final actions:

```js
for (const marker of [
  'data-service-detail-page',
  'data-service-scope',
  'data-service-guidance',
  'data-service-preparation',
]) {
  if (countOccurrences(record.html, marker) !== 1) {
    failures.push(
      `Service-detail route \`${route}\` must render one \`${marker}\` structure.`,
    )
  }
}

const slug = route.slice(1)
for (const location of [`service-${slug}`, `service-${slug}-final`]) {
  if (!record.html.includes(`data-cta-location="${location}"`)) {
    failures.push(
      `Service-detail route \`${route}\` must preserve CTA location \`${location}\`.`,
    )
  }
}
```

Also require the hero location to include both a quote CTA and either the
verified phone call CTA or email fallback. Keep the existing media, H1,
canonical, breadcrumb, sitemap, and structured-data audits active.

- [ ] **Step 2: Build and verify RED**

Run: `pnpm build && pnpm audit:patterns && pnpm audit:site`

Expected: FAIL because the shared component, documentation, and new structure
markers do not exist.

- [ ] **Step 3: Define the route-content contract**

Create `serviceDetailPageTypes.ts` with explicit types for:

```ts
export type ServiceDetailPageContent = {
  slug:
    | 'driveway-pressure-washing'
    | 'sidewalk-walkway-cleaning'
    | 'concrete-cleaning'
  seoTitle: string
  seoDescription: string
  hero: {
    eyebrow: string
    title: string
    description: string
    media: PublicMediaAsset
  }
  scope: {
    eyebrow: string
    title: string
    description: string
    items: string[]
  }
  guidance: {
    eyebrow: string
    title: string
    description: string
    items: GuidanceItem[]
  }
  preparation: { title: string; description: string; items: string[] }
  process: {
    eyebrow: string
    title: string
    description: string
    steps: ProcessStep[]
  }
  related: { eyebrow: string; title: string; description: string }
  faq: { eyebrow: string; title: string; items: FAQItem[] }
  cta: { title: string; description: string }
}
```

Create `serviceDetailPages.ts` by moving the current page arrays and strings
into three typed records. Preserve SEO strings and substantive scope,
consideration, preparation, process, FAQ, and CTA copy. Limit copy edits to the
three H1s and hero descriptions needed to fit the first viewport cleanly.

- [ ] **Step 4: Implement `ServiceDetailPage.astro`**

The shared pattern must:

- own `Layout`, breadcrumb schema, visible breadcrumbs, one H1, service media,
  quote/call-or-email hero actions, related links, FAQs, and final CTA;
- wrap the main composition in `data-service-detail-page`;
- render scope as an open semantic list marked `data-service-scope`;
- render guidance as an editorial list and preparation as one restrained panel
  in the same section, marked separately;
- retain one `ProcessSteps` ordered list with three steps;
- use compact `LinkGrid` groups for two related services and six active areas;
- preserve `data-cta-location="service-${slug}"` and
  `data-cta-location="service-${slug}-final"` exactly;
- derive service name and related service links from existing `services`, and
  derive area links from existing `serviceAreas`;
- use existing primitives and no page-local style block or inline style.

Document `#### ServiceDetailPage`, its content ownership, CTA fallback, rhythm,
and proof-safety contract in `DESIGN_SYSTEM.md`.

- [ ] **Step 5: Replace the three route templates**

Each route becomes a thin wrapper:

```astro
---
import ServiceDetailPage from '../components/patterns/ServiceDetailPage.astro'
import { serviceDetailPages } from '../data/serviceDetailPages'
---

<ServiceDetailPage page={serviceDetailPages.driveway} />
```

Use the matching `walkway` and `concrete` records on the other routes. Do not
change route paths.

- [ ] **Step 6: Verify GREEN**

Run: `pnpm build && pnpm audit:patterns && pnpm audit:site`

Expected: all commands exit 0; built routes retain registered media, exactly
one ordered process, tracking locations, canonicals, breadcrumbs, and sitemap
inclusion.

- [ ] **Step 7: Commit the detail-page redesign**

```bash
git add scripts/audit-patterns.mjs scripts/audit-site.mjs \
  src/data/serviceDetailPageTypes.ts src/data/serviceDetailPages.ts \
  src/components/patterns/ServiceDetailPage.astro \
  src/pages/driveway-pressure-washing.astro \
  src/pages/sidewalk-walkway-cleaning.astro \
  src/pages/concrete-cleaning.astro docs/design/DESIGN_SYSTEM.md
git commit -m "feat(services): redesign service detail pages"
```

### Task 4: Render, compare, repair, and document #92

**Files:**

- Modify as needed: only files already in #92 scope
- Modify: `docs/design/PREMIUM_POLISH_AUDIT.md`

- [ ] **Step 1: Start the local site and capture the reference**

Run `pnpm dev --host 127.0.0.1`. Because Browser/IAB returned unavailable and
Playwright is not installed, use the existing headless Chrome binary with a
temporary profile as the approved fallback. Capture `/` at 1440px as the
homepage visual reference and inspect it with `view_image`.

- [ ] **Step 2: Run the full responsive matrix**

Capture and inspect all four affected routes at 390, 768, 1024, and 1440px,
plus 430px for the hero/CTA check. For every route and viewport, record:

- document width versus viewport width;
- H1 count;
- image completion and natural dimensions;
- relevant browser console/page errors;
- hero quote and call/email visibility;
- section rhythm, card density, media placement, and footer/sticky-CTA spacing;
- proof-safe media attributes and visible caption.

Use Chrome DevTools Protocol or a small temporary script outside the repository
for computed width, console, and image checks. Do not add QA dependencies or
commit screenshots.

- [ ] **Step 3: Keep a fidelity ledger and repair all material mismatches**

Compare the service routes to the captured homepage reference at no fewer than
five points: typography, palette, container/gutter model, section surface
rhythm, media framing, CTA hierarchy, and responsive collapse. Fix any clipped
content, overflow, broken wrapping, awkward gaps, overlong first viewport,
generic card repetition, or inconsistent CTA treatment through shared tokens
and patterns only.

- [ ] **Step 4: Record the implementation audit**

Update `PREMIUM_POLISH_AUDIT.md` with a dated #92 note summarizing:

- global token/hero rhythm changes;
- hub and detail-page composition changes;
- route notes for 390, 430, 768, 1024, and 1440px;
- Browser/IAB unavailability and the exact headless Chrome fallback;
- confirmation that #94 copy rewrite remains deferred;
- known follow-ups, if any.

- [ ] **Step 5: Run fresh completion verification**

Run, in full:

```bash
pnpm check
pnpm build
pnpm audit:patterns
pnpm audit:site
git diff --check
```

Expected: every command exits 0 with no lint, formatting, build, pattern,
site-audit, or whitespace failures.

- [ ] **Step 6: Commit QA documentation and any verified repairs**

```bash
git add docs/design/PREMIUM_POLISH_AUDIT.md scripts/audit-patterns.mjs \
  scripts/audit-site.mjs src/styles/tokens.css \
  src/components/patterns/HeroSection.astro \
  src/components/patterns/ServiceMenu.astro \
  src/components/patterns/ServiceDetailPage.astro \
  src/pages/services.astro src/pages/driveway-pressure-washing.astro \
  src/pages/sidewalk-walkway-cleaning.astro \
  src/pages/concrete-cleaning.astro docs/design/DESIGN_SYSTEM.md
git commit -m "docs(qa): record premium service page review"
```

- [ ] **Step 7: Final acceptance audit**

Re-read issue #92, the design spec, and this plan. Confirm every acceptance
criterion from the actual built output and responsive evidence. Confirm no
unsupported claim, service, city, backend change, metadata change, or proof
misrepresentation entered the diff.

- [ ] **Step 8: Publish the scoped PR**

After fresh verification, push `feat/premium-service-pages` and create one PR
into `dev` with a title identifying #92. The body must include `Part of #89`,
`Closes #92`, global rhythm and service-page summaries, #94 deferral,
validation, rendered QA, claim-safety confirmation, and known follow-ups. Do
not merge the PR or deploy production.
