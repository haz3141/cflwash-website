# Premium City Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the service-area hub and six approved city routes as a premium, proof-safe local coverage journey for issue #93.

**Architecture:** Keep the six city routes as thin wrappers around the existing `ServiceAreaPage`. Add explicit typed hero media to each city record, strengthen the shared page composition, and use open semantic navigation on the hub. Extend the production-output audit before implementation so hub density, media roles, civic-image demotion, CTA tracking, and SEO preservation remain enforceable.

**Tech Stack:** Astro 6, TypeScript, Tailwind CSS 4, Manrope Variable, Lucide Astro, Node-based repository audits, in-app Browser with headless Chrome fallback only if unavailable.

---

## File map

- Modify `scripts/audit-site.mjs`: enforce hub-menu, city-hero-media, compact-context, CTA, and SEO contracts.
- Modify `src/data/serviceAreaPageTypes.ts`: add explicit proof-safe city hero media.
- Modify `src/data/serviceAreaPages/*.ts`: select the registered service illustration matching each existing city scenario.
- Modify `src/pages/service-areas.astro`: implement the split hero, open city menu, compact service bridge, and inverse close.
- Modify `src/components/patterns/CityContextMedia.astro`: add a compact context-only variant without changing the dev fixture default.
- Modify `src/components/patterns/ServiceAreaPage.astro`: implement the shared service-led city composition.
- Modify `docs/design/DESIGN_SYSTEM.md`: document the hub and city composition contracts.
- Modify `docs/design/PREMIUM_MEDIA_SYSTEM.md`: document service-led city heroes and secondary civic media.
- Modify `docs/design/PREMIUM_POLISH_AUDIT.md`: record implementation and rendered QA evidence.

### Task 1: Lock the #93 output contracts

- [ ] Add `heroMediaId` to every `expectedCityPages` audit record.
- [ ] Require `/service-areas` to render one `data-service-area-menu` list with exactly six marked items, all six canonical city routes, registered brand artwork, no civic asset, and one open three-service bridge.
- [ ] Require every city route to render `data-city-page`, one expected service-illustration hero, one visible proof caption, one `data-city-scenarios` region, one compact `data-city-context-callout`, one ordered process, and preserved hero/final CTA locations.
- [ ] Build and run `pnpm audit:site`; verify RED because the new structures and service-led hero mappings do not exist.

### Task 2: Add explicit city hero media data

- [ ] Add `heroMedia: PublicMediaAsset` to `ServiceAreaPageContent`.
- [ ] Import `publicMedia` in each city record and map driveway media to Deltona/DeBary, walkway media to Orange City/DeLand, and concrete media to Sanford/Lake Mary.
- [ ] Build and confirm TypeScript/Astro compilation remains clean.

### Task 3: Redesign the service-area hub

- [ ] Convert the compact hero to a split hero with the direct six-city H1, quote-first contact actions, and existing registered residential artwork.
- [ ] Replace six city cards with one semantic open divided list marked `data-service-area-menu`; preserve all city routes and current descriptions.
- [ ] Replace the service card grid with compact `LinkGrid` navigation inside a water surface.
- [ ] Keep one inverse final CTA and preserve exact hub tracking locations.
- [ ] Build and run the hub audits until GREEN.

### Task 4: Redesign the shared city-page pattern

- [ ] Render `page.heroMedia` eagerly through `MediaFrame` and mark the shared main composition with `data-city-page`.
- [ ] Preserve the service-fit rail and use open service navigation.
- [ ] Render city reasons in an editorial lead/support layout marked `data-city-scenarios`, without cards.
- [ ] Add a compact `CityContextMedia` variant and use it only in the later local-context section, with the existing media role, proof status, image, caption, and attribution.
- [ ] Use white/water/warm/soft/inverse section rhythm, full-width mobile final actions, and one ordered process.
- [ ] Preserve city metadata, canonicals, breadcrumbs, schema, indexability, nearby routes, and exact city CTA tracking locations.
- [ ] Build and run the city audits until GREEN.

### Task 5: Document, render, and finish

- [ ] Update the design-system and media-system contracts before final validation.
- [ ] Run all seven routes at 390, 430, 768, 1024, and 1440 pixels. Record route notes for overflow, images, console/page errors, one H1, mobile CTA visibility, hero consistency, civic-image demotion, service/quote clarity, rhythm, proof metadata, and claim safety.
- [ ] Exercise `/service-areas` to one city route and its hero quote CTA at 390px.
- [ ] Compare the accepted hub/city concepts with current screenshots through `view_image`; record at least five fidelity points and fix material mismatches.
- [ ] Append the #93 review to `PREMIUM_POLISH_AUDIT.md`.
- [ ] Run `pnpm check`, `pnpm build`, `pnpm audit:patterns`, `pnpm audit:site`, and `git diff --check` from a fresh state.
- [ ] Commit focused changes, push `feat/premium-city-pages`, and open a draft PR into `dev` with `Part of #89`, `Closes #93`, #95/#77 deferral notes, validation, rendered QA, and claim-safety confirmation.
