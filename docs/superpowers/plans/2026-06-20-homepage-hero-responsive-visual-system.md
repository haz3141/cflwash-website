# Homepage Hero Responsive Visual System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver a service-led homepage hero that is compact and conversion-first on mobile, intentionally stacked on tablet, split at 960px, proof-safe, responsive-image optimized, and ready for a PR into `dev`.

**Architecture:** Keep `src/pages/index.astro` as the homepage composer and concentrate hero behavior in `src/components/home/HomeHero.astro`. Use one semantic hero structure with CSS grid areas for responsive ordering, registered `publicMedia` assets for the mosaic, existing design tokens for framing, and built-output audit assertions for the user-visible contract.

**Tech Stack:** Astro 6, Tailwind CSS 4 utilities, shared CSS variables, Node-based output audits, pnpm, Browser/IAB visual QA.

---

### Task 1: Add A Homepage Hero Output Contract

**Files:**

- Modify: `scripts/audit-site.mjs:800`
- Test: `scripts/audit-site.mjs`

- [ ] **Step 1: Add assertions that describe the required rendered hero**

After the existing `const homepage = ...` declaration, parse the hero by adding a stable `data-home-hero` marker to the expected output contract and assert:

```js
const homepageHeroMatch = homepage.match(
  /<section\b[^>]*data-home-hero[^>]*>([\s\S]*?)<\/section>/i,
)
const homepageHero = homepageHeroMatch?.[0] ?? ''
const expectedHeroHeading =
  'Driveway, Sidewalk, and Exterior Cleaning in Central Florida'
const heroImages = getTags(homepageHero, 'img').map((tag) =>
  parseAttributes(tag),
)

if (!homepageHero) {
  failures.push('Homepage must render the responsive service-led hero.')
}

if (findHeading(homepageHero, 1) !== expectedHeroHeading) {
  failures.push('Homepage hero must render the approved service-led H1.')
}

if (
  !homepageHero.includes('Request a Quote') ||
  !homepageHero.includes('Call')
) {
  failures.push(
    'Homepage hero must render the approved quote and call actions.',
  )
}

if (homepageHero.includes('/images/brand/badge-illustrated.png')) {
  failures.push(
    'Homepage hero must not render the white-background illustrated badge.',
  )
}
```

Loop through `serviceIllustrations` and verify the hero contains exactly one image per registered ID, `data-media-role="service-illustration"`, `data-proof-status="not-proof"`, `width="1280"`, `height="853"`, a non-empty `sizes`, and all four responsive candidates. Verify `/images/brand/logo-mark-transparent.png` has empty alt text and intrinsic `640` by `640` dimensions.

- [ ] **Step 2: Run the output audit and confirm it fails against the inherited branch**

Run:

```bash
pnpm build && pnpm audit:site
```

Expected: `pnpm build` passes and `pnpm audit:site` fails because the current hero lacks the stable marker, duplicates mobile and desktop images, omits media metadata, omits responsive image attributes, and omits intrinsic dimensions.

### Task 2: Consolidate The Hero Into One Responsive Structure

**Files:**

- Modify: `src/components/home/HomeHero.astro:1-207`
- Modify: `src/styles/global.css:195-226`
- Test: `scripts/audit-site.mjs`

- [ ] **Step 1: Define one typed service-tile inventory in `HomeHero.astro`**

Use the registered media objects rather than repeating image markup:

```ts
const serviceTiles = [
  { label: 'Driveways', media: publicMedia.serviceDriveway, kind: 'main' },
  { label: 'Sidewalks', media: publicMedia.serviceWalkway, kind: 'side' },
  { label: 'Patios', media: publicMedia.serviceConcrete, kind: 'side' },
] as const

const responsiveSources = (media: (typeof serviceTiles)[number]['media']) =>
  media.image.sources.map(({ src, width }) => `${src} ${width}w`).join(', ')
```

- [ ] **Step 2: Replace duplicated mobile and desktop hero markup with grid areas**

Keep one copy group, one CTA row, one mosaic, one benefit list, and one serving line:

```astro
<section
  data-home-hero
  class="relative overflow-hidden bg-[var(--color-surface-warm)] pb-8 pt-6 sm:pb-12 sm:pt-10 min-[60rem]:pb-16 min-[60rem]:pt-14"
>
  <div
    class="hero-art-panel pointer-events-none absolute inset-0 opacity-45"
    aria-hidden="true"
  >
  </div>
  <div
    class="home-hero-layout relative mx-auto w-full max-w-[82rem] px-[var(--container-gutter)]"
  >
    <div
      class="home-hero-copy flex flex-col items-center text-center min-[60rem]:items-start min-[60rem]:text-left"
    >
      <!-- eyebrow, one H1, subhead, Request a Quote and Call -->
    </div>
    <div
      class="home-hero-visual hero-mosaic-container mx-auto w-full max-w-[42rem] min-[60rem]:max-w-none"
    >
      <!-- one mapped three-image mosaic, one HOA Cleanup tag, one transparent seal -->
    </div>
    <div
      class="home-hero-benefits grid w-full grid-cols-2 gap-4 sm:grid-cols-4"
    >
      <!-- existing claim-safe benefits -->
    </div>
    <p
      class="home-hero-serving flex items-center justify-center gap-2 min-[60rem]:justify-start"
    >
      <!-- existing serving line -->
    </p>
  </div>
</section>
```

Use the exact approved copy from the design spec. Keep `Button` variants and CTA tracking attributes. Include the `Phone` icon on the call action and keep one H1.

- [ ] **Step 3: Add proof-safe responsive image markup**

Each mapped service tile must use:

```astro
<div
  class:list={[tile.kind === 'main' ? 'mosaic-card-main' : 'mosaic-card-side']}
  data-media-id={tile.media.id}
  data-media-role={tile.media.role}
  data-proof-status={tile.media.proofStatus}
>
  <img
    src={tile.media.image.src}
    srcset={responsiveSources(tile.media)}
    sizes="(min-width: 960px) 24vw, (min-width: 768px) 40vw, 78vw"
    alt={tile.media.alt}
    width={tile.media.image.width}
    height={tile.media.image.height}
    loading={tile.kind === 'main' ? 'eager' : 'lazy'}
    decoding="async"
    fetchpriority={tile.kind === 'main' ? 'high' : 'auto'}
    class="h-full w-full object-cover"
  />
</div>
```

Render the decorative seal once with empty alt text, `width="640"`, `height="640"`, async decoding, and a small bounded size. Do not render `badge-illustrated.png`.

- [ ] **Step 4: Implement the 960px responsive layout and compact mosaic in shared CSS**

Replace the existing generic mosaic rules with component-specific grid areas and token-backed framing:

```css
.home-hero-layout {
  display: grid;
  gap: 1.5rem;
  grid-template-areas: 'copy' 'visual' 'benefits' 'serving';
}

.home-hero-copy {
  grid-area: copy;
}
.home-hero-visual {
  grid-area: visual;
}
.home-hero-benefits {
  grid-area: benefits;
}
.home-hero-serving {
  grid-area: serving;
}

@media (min-width: 60rem) {
  .home-hero-layout {
    align-items: center;
    column-gap: clamp(2rem, 4vw, 4rem);
    grid-template-areas:
      'copy visual'
      'benefits visual'
      'serving visual';
    grid-template-columns: minmax(0, 0.95fr) minmax(27rem, 1.05fr);
    row-gap: 1.75rem;
  }
}
```

Use `--shadow-media` and `--shadow-card` for mosaic tiles. Keep the mosaic bounded to a shallow mobile/tablet ratio and allow a near-square desktop composition. Add transition rules only inside `@media (hover: hover)` and disable transforms under `prefers-reduced-motion: reduce`.

- [ ] **Step 5: Run the focused audit and formatting checks**

Run:

```bash
pnpm format
pnpm build
pnpm audit:site
pnpm audit:patterns
```

Expected: all commands pass and the built homepage contains one responsive hero image set with complete media metadata.

### Task 3: Remove Theme Drift And Update Authoritative Documentation

**Files:**

- Modify: `src/styles/tokens.css:67-71`
- Modify: `docs/design/PREMIUM_MEDIA_SYSTEM.md`
- Modify: `docs/design/BRAND_ASSETS.md`
- Modify: `docs/design/DESIGN_SYSTEM.md`
- Test: `scripts/audit-patterns.mjs`

- [ ] **Step 1: Remove redundant hero-only shadow tokens**

Delete `--shadow-lg`, `--shadow-xl`, and `--shadow-2xl`; the consolidated hero uses established `--shadow-media` and `--shadow-card` tokens.

- [ ] **Step 2: Document the current hero media hierarchy**

Update `PREMIUM_MEDIA_SYSTEM.md` so the homepage route states that registered driveway, walkway, and concrete service illustrations lead the hero mosaic, while the transparent logo mark is decorative identity only. Remove the outdated statement that the white-background badge leads the hero.

Update `BRAND_ASSETS.md` to state that `logo-mark-transparent.png` may be used as a small hero seal, never as the main hero image. Document that `badge-illustrated.png` is not approved for public compositing because its white RGB background is not transparent.

Add a `HomeHero` subsection to the page-pattern documentation in `DESIGN_SYSTEM.md`, describing ownership, the 960px split, one-structure rule, proof-safe media contract, and CTA hierarchy.

- [ ] **Step 3: Run documentation and theme audits**

Run:

```bash
pnpm format:check
pnpm audit:patterns
pnpm audit:site
git diff --check
```

Expected: all commands pass with no raw page-local theme drift or stale media hierarchy.

### Task 4: Verify Rendered Behavior And Publish The `dev` PR

**Files:**

- Create: `.artifacts/home-hero/390.png`
- Create: `.artifacts/home-hero/430.png`
- Create: `.artifacts/home-hero/768.png`
- Create: `.artifacts/home-hero/1024.png`
- Create: `.artifacts/home-hero/1440.png`
- Modify: PR metadata only after commits are pushed

- [ ] **Step 1: Install dependencies and run the full required validation**

Run:

```bash
pnpm install
pnpm check
pnpm build
pnpm audit:patterns
pnpm audit:site
git diff --check
```

Expected: every command exits zero. `pnpm check` already includes build and both audits; the explicit reruns provide the requested evidence.

- [ ] **Step 2: Start the local preview and complete Browser/IAB QA**

Run `pnpm dev --host 127.0.0.1` and use Browser/IAB to capture `/` at 390, 430, 768, 1024, and 1440px. At every width inspect `document.documentElement.scrollWidth === document.documentElement.clientWidth`, header fit, H1 priority, primary CTA visibility, mosaic crop, label legibility, seal transparency, wave spacing, and sticky CTA coverage.

At 390px verify the first viewport contains the H1 and primary CTA before the visual. At 768px verify the layout remains stacked. At 1024px verify the two-column split has activated. At 1440px verify controlled content width and balanced columns.

- [ ] **Step 3: Inspect screenshots and repair all material mismatches**

Use `view_image` on each screenshot. Record a fidelity ledger covering copy, hierarchy, typography, palette, mosaic treatment, spacing, responsive transition, and sticky safe area. Repeat implementation and QA until no material mismatch remains.

- [ ] **Step 4: Commit focused changes**

```bash
git add src/components/home/HomeHero.astro src/components/patterns/HomeHero.astro src/styles/global.css src/styles/tokens.css src/layouts/Layout.astro src/pages/index.astro scripts/audit-site.mjs
git commit -m "fix(home): harden responsive hero visual system"

git add docs/design/BRAND_ASSETS.md docs/design/DESIGN_SYSTEM.md docs/design/PREMIUM_MEDIA_SYSTEM.md docs/superpowers/specs/2026-06-20-homepage-hero-responsive-visual-system-design.md docs/superpowers/plans/2026-06-20-homepage-hero-responsive-visual-system.md
git commit -m "docs(design): document responsive homepage hero"
```

- [ ] **Step 5: Push and open the PR against `dev`**

Push the continued branch and open a PR titled `Fix homepage hero responsive visual system` into `dev`. Use the requested Summary, Validation, and Visual Notes sections, include `Closes #102`, list route notes for 390, 768, 1024, and 1440px, attach or link screenshots, and confirm the Cloudflare preview check or URL is present before declaring completion.
