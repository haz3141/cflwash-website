# Premium Service Copy Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use
> superpowers:subagent-driven-development (recommended) or
> superpowers:executing-plans to implement this plan task-by-task. Steps use
> checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite the homepage, service hub, and three service-detail routes in
a premium, homeowner-focused, concrete-first voice without changing the #92
layout or introducing unsupported claims.

**Architecture:** Keep every existing Astro composition, centralized content
contract, route, CTA, proof-safe media record, and tracking attribute. Update
homepage strings in `HomeHero.astro` and `index.astro`, shared service summaries
in `services.ts`, hub strings in `services.astro`, and the three typed detail
records in `serviceDetailPages.ts`. Add a durable rendered-QA record only after
the built output passes.

**Tech Stack:** Astro 6, TypeScript content records, Tailwind CSS 4, pnpm,
repository pattern/site audits, in-app Browser or documented Chrome fallback.

---

### Task 1: Sharpen the homepage voice

**Files:**

- Modify: `src/components/home/HomeHero.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Rewrite the hero around the concrete-first offer**

Use these exact hero benefit labels:

```ts
const heroBenefits = [
  { icon: Sparkles, title: 'Cleaner curb appeal' },
  { icon: House, title: 'HOA notice support' },
  { icon: ShieldCheck, title: 'Concrete-focused service' },
  { icon: CalendarCheck2, title: 'Clear next steps' },
]
```

Replace the hero H1 and lead with:

```text
Driveway and Concrete Cleaning in Central Florida

Driveways, sidewalks, walkways, patios, and other residential concrete—cleaned
through a clear, quote-first process.
```

Keep the hero structure, media tiles, proof attributes, CTA labels, and CTA
tracking unchanged.

- [ ] **Step 2: Replace procedural homepage support copy**

Use this trust strip:

```ts
const trustItems = [
  {
    icon: MapPin,
    title: 'Central Florida service',
    description: 'Local pages for the six cities currently served.',
  },
  {
    icon: Droplets,
    title: 'Concrete-focused cleaning',
    description: 'Driveways, sidewalks, walkways, entries, and similar areas.',
  },
  {
    icon: ClipboardCheck,
    title: 'Simple quote request',
    description: 'Send the property, surfaces, photos, and useful notes.',
  },
  {
    icon: BadgeCheck,
    title: 'Clear visit plan',
    description: 'Know which concrete areas are included before a visit.',
  },
]
```

Update the service cards to describe visible buildup and homeowner intent
without promising removal. Keep HOA notice support and curb-appeal cleanup as
situations linked to `/request-quote`, not new service routes. Use these exact
descriptions:

```text
Driveway Pressure Washing — Clean visible buildup from the concrete that frames
the front of your home.

Sidewalk Cleaning — Refresh street-facing sidewalk panels and the route along
the property.

Walkway Cleaning — Clean the entry paths and concrete walks leading to the
door.

Concrete Cleaning — Handle patios, pads, aprons, curbs, and entry slabs beyond
the main driveway.

HOA Notice Cleanup — Share the cited concrete area, notice wording, and current
photos in one request.

Curb Appeal Cleanup — Bring the driveway, front walk, and entry concrete into
one focused request.
```

Replace the reasons with:

```ts
const reasons = [
  'Six published Central Florida service areas',
  'A focused residential concrete offer',
  'One request for the surfaces that matter',
  'Clear details before a cleaning visit is arranged',
]
```

Use these process labels:

```text
Show Us the Concrete — Share the city, surfaces, photos, access notes, and any
HOA wording.

Talk Through the Details — Questions can be discussed at the configured phone
number or through the published contact details.

Confirm the Visit Plan — Know which areas are included before the cleaning
visit is arranged.
```

- [ ] **Step 3: Tighten homepage metadata and section copy**

Set the metadata and key section copy to:

```text
Title: Concrete Pressure Washing in Central Florida | CFL Wash Co.
Description: Driveway, sidewalk, walkway, and concrete cleaning for Central
Florida homeowners. Tell CFL Wash Co. what needs attention and request a quote.

Services H2: Concrete cleaning for the surfaces around your home
Services lead: Start with the driveway, walking surfaces, another concrete
area, or the situation prompting the cleanup. The illustrations identify
service categories and are not photos of completed CFL Wash Co. projects.

Brand eyebrow: Why CFL Wash Co.
Brand H2: A focused service and a straightforward next step.
Brand lead: Tell us which concrete areas matter to the property. The request
stays centered on those surfaces, with the included areas clarified before a
visit is arranged.

Final eyebrow: Ready to clean up the concrete?
Final H2: Show us the surfaces that need attention.
Final lead: Send the city or address, a few clear photos, access notes, and any
HOA wording that applies.
Final CTA: Request a Quote
```

- [ ] **Step 4: Verify and commit the homepage rewrite**

Run:

```bash
pnpm exec prettier --check src/components/home/HomeHero.astro src/pages/index.astro
pnpm build
pnpm audit:site
git diff --check
```

Expected: all commands exit 0; `/` retains one H1, the canonical route, proof
attributes, and its tracked quote/call actions.

Commit:

```bash
git add src/components/home/HomeHero.astro src/pages/index.astro
git commit -m "content(home): sharpen concrete-first copy"
```

### Task 2: Turn the service hub into a clear chooser

**Files:**

- Modify: `src/data/services.ts`
- Modify: `src/pages/services.astro`

- [ ] **Step 1: Rewrite the shared service summaries**

Use these exact descriptions and summaries:

```text
Driveway description: Concrete driveway pressure washing for visible buildup,
tire marks, everyday grime, and curb appeal.
Driveway summary: Focused cleaning for the driveway and front approach, with
room to include connected entry concrete.

Walkway description: Sidewalk, walkway, and entry-path cleaning for the
concrete route around the home.
Walkway summary: Cleaning for front walks, entry paths, sidewalk panels, and
connected pedestrian concrete.

Concrete description: Concrete cleaning for patios, pads, aprons, curbs, entry
slabs, and similar residential areas.
Concrete summary: A flexible option for concrete areas that are not primarily
a driveway or walkway.
```

- [ ] **Step 2: Rewrite the hub hero, selection guidance, and CTA**

Use these exact fit lines:

```text
Best when the driveway and front approach are the biggest visible priority.
Best for front walks, entry paths, sidewalk panels, and connected pedestrian
concrete.
Best for patios, pads, aprons, curbs, and entry slabs that do not fit the first
two services.
```

Use this hub content:

```text
Hero title: Concrete cleaning for the surfaces around your home.
Hero description: Compare three concrete-focused services for Central Florida
homes. Start with the surface that matters most; connected concrete can be
included in the same request.

Menu title: Start with the concrete that needs attention
Menu description: Choose driveway cleaning, walking-surface cleaning, or
another concrete area. Each page explains where the service fits, what can
affect the work, and what to send.

Guidance title: Include connected concrete in one request
Guidance description: If the driveway, front walk, sidewalk, entry, or patio
all need attention, list them together. Wide photos show how the areas connect;
close photos show stains, finishes, and wear.

Column 1: Lead with the main surface — Choose the service that best matches the
area driving the cleanup.
Column 2: Add nearby concrete — Include connected areas you want considered at
the same property.
Column 3: Flag specialty finishes — Point out pavers, coatings, sealers, paint,
decorative finishes, or exposed aggregate.

Area description: See the six published cities currently served and find the
page for your location.

Final title: Show us the concrete you want cleaned.
Final description: Send the service address, wide and close photos, access
notes, and any HOA wording that applies. Start with one area or include
connected concrete in the same request.
```

Update the meta description to:

```text
Compare CFL Wash Co. driveway, sidewalk, walkway, and concrete cleaning
services for Central Florida homes, then request a quote.
```

- [ ] **Step 3: Verify and commit the hub rewrite**

Run:

```bash
pnpm exec prettier --check src/data/services.ts src/pages/services.astro
pnpm build
pnpm audit:patterns
pnpm audit:site
git diff --check
```

Expected: all commands exit 0; `/services` retains the #92 hero/menu/guidance/
area/CTA structure and tracked hero/final actions.

Commit:

```bash
git add src/data/services.ts src/pages/services.astro
git commit -m "content(services): clarify service chooser"
```

### Task 3: Rewrite the three service-detail narratives

**Files:**

- Modify: `src/data/serviceDetailPages.ts`

- [ ] **Step 1: Rewrite driveway content around the front approach**

Use these section anchors:

```text
H1: Driveway pressure washing for a cleaner front approach.
Scope: Focused on the concrete that frames your home
Guidance: What shapes the driveway cleaning approach
Preparation: Get the driveway ready
Process: From driveway photos to a clear plan
Related: Handle the front approach in one request
FAQ: Driveway pressure washing questions
CTA: Ready to refresh the driveway?
```

The scope list must cover concrete driveways, aprons/accessible edges,
connected entry concrete, and a clear list of included areas. The guidance list
must consolidate condition/finish, water flow, room to work, and set-in stains.
The preparation list must cover vehicles, loose items, fragile or damaged
areas, and pets/people. The process must ask once for city, photos, priority
areas, and HOA wording; clarify surface/access/connected areas; then clean only
the concrete included in the quote. FAQs must state that not every stain will
clear, specialty surfaces require confirmation, and HOA wording/photos should
be provided when applicable.

- [ ] **Step 2: Rewrite walkway content around the path to the door**

Use these section anchors:

```text
H1: Sidewalk and walkway cleaning for a better first impression.
Scope: Clean the path people see and use
Guidance: Details around the path matter
Preparation: Clear the walking areas
Process: A simple path from photos to cleaning
Related: Connect the walk with the front approach
FAQ: Sidewalk and walkway cleaning questions
CTA: Ready for cleaner-looking paths and walks?
```

The scope must cover front walks, entry paths, reachable sidewalk panels,
connected walking areas, and transitions. Guidance must consolidate surface
layout, doors/landscape edges, access, and older marks. Preparation must cover
loose items, gates, thresholds/damage, and keeping people/pets clear during the
visit. The process must request photos and location once, clarify included
panels and access, then clean the agreed concrete. FAQs must avoid promising
public-sidewalk eligibility, total organic-stain removal, or unconfirmed
no-owner-presence arrangements.

- [ ] **Step 3: Rewrite broad concrete content as the third service choice**

Use these section anchors:

```text
H1: Concrete cleaning for the spaces beyond the driveway.
Scope: A practical fit for other concrete areas
Guidance: Match the approach to the concrete
Preparation: Open up the work area
Process: Start with the surface in front of you
Related: Use a more specific page when it fits
FAQ: Concrete cleaning questions
CTA: Have another concrete area in mind?
```

The scope must list patios/porch-adjacent slabs, aprons/curbs/entries,
utility/trash-bin pads, and connected residential concrete. Guidance must
consolidate finish/age, water flow, access, and staining. Preparation must cover
movable items, access/pets, coatings/cracks/avoid areas, and priority stains.
The process must describe the surface, confirm fit/included areas, and clean the
agreed concrete. FAQs must name the supported concrete examples, keep repair,
resurfacing, restoration, and sealing excluded, and qualify curb-appeal
improvement by condition and staining.

- [ ] **Step 4: Tighten unique metadata and final CTA descriptions**

Use these exact meta descriptions:

```text
Concrete driveway pressure washing for visible buildup, tire marks, and curb
appeal in Central Florida. Share photos and request a quote from CFL Wash Co.

Sidewalk, walkway, and entry-path cleaning for Central Florida homes. See where
the service fits, what to send, and how to request a quote.

Concrete cleaning for patios, pads, aprons, curbs, and entry areas across
Central Florida. Share the surface and request a quote from CFL Wash Co.
```

Keep each existing SEO title unless rendered review reveals a real accuracy or
wrapping issue. Final CTA descriptions must request only the minimum useful
inputs for that service and must not repeat the full process section.

- [ ] **Step 5: Verify and commit the detail rewrite**

Run:

```bash
pnpm exec prettier --check src/data/serviceDetailPages.ts
pnpm build
pnpm audit:patterns
pnpm audit:site
git diff --check
```

Expected: all commands exit 0; all three routes keep one H1, the #92 structure,
registered illustrative media, unique metadata, canonical paths, breadcrumbs,
and tracked quote/call-or-email actions.

Commit:

```bash
git add src/data/serviceDetailPages.ts
git commit -m "content(services): rewrite service detail narratives"
```

### Task 4: Render, audit, document, and publish #94

**Files:**

- Modify as needed: only files already listed in Tasks 1–3
- Modify: `docs/design/PREMIUM_POLISH_AUDIT.md`

- [ ] **Step 1: Run the full responsive matrix**

Start the site with `pnpm dev --host 127.0.0.1`. Use the in-app Browser first.
If unavailable, record the reason and use an installed Chrome/Playwright
fallback without adding a repository dependency.

Review `/`, `/services`, `/driveway-pressure-washing`,
`/sidewalk-walkway-cleaning`, and `/concrete-cleaning` at 390, 430, 768, 1024,
and 1440 CSS pixels. For every route and width, confirm:

- exactly one H1 and intentional heading wraps;
- no horizontal overflow, clipping, or overlap;
- visible primary quote CTA and clear call/email hierarchy;
- intact service media and proof-safe disclosure;
- unchanged #92 service-page composition;
- no relevant console error, page error, or failed resource;
- sticky CTA does not obscure the final CTA or footer.

- [ ] **Step 2: Run the content and claim-safety audit**

Search affected source and rendered HTML for repetitive internal vocabulary and
prohibited claims:

```bash
rg -ni "scope|appropriate|review|before scheduling|free quote|5-star|fully insured|licensed|same-day|guarantee|instant booking|online payment|roof cleaning|house washing|fleet washing|like new|every stain" \
  src/components/home/HomeHero.astro src/pages/index.astro \
  src/pages/services.astro src/data/services.ts \
  src/data/serviceDetailPages.ts dist/index.html dist/services.html \
  dist/driveway-pressure-washing.html dist/sidewalk-walkway-cleaning.html \
  dist/concrete-cleaning.html
```

Expected: any remaining match is an intentional, factual limitation or
developer-facing attribute; public copy contains no unsupported claim.

- [ ] **Step 3: Record the #94 implementation review**

Append a dated `Issue #94 implementation review` section to
`docs/design/PREMIUM_POLISH_AUDIT.md` containing:

- the structure-preserving copy strategy;
- before/after positioning for homepage, hub, driveway, walkway, and concrete;
- metadata changes;
- claim-safety and proof-safe media confirmation;
- route notes for 390, 430, 768, 1024, and 1440px;
- the browser method and any fallback;
- confirmation that #50 and #51 remain deferred and #77 remains open pending
  #93 and #95.

- [ ] **Step 4: Run fresh completion verification**

Run:

```bash
pnpm check
pnpm build
pnpm audit:patterns
pnpm audit:site
git diff --check
```

Expected: every command exits 0.

- [ ] **Step 5: Commit the QA record**

```bash
git add docs/design/PREMIUM_POLISH_AUDIT.md
git commit -m "docs(qa): record premium service copy review"
```

- [ ] **Step 6: Perform the final acceptance audit and publish**

Re-read issue #94, the design spec, and this plan. Verify every acceptance
criterion against the current diff, built output, responsive evidence, and
GitHub state. Then push `content/premium-service-copy` and open a PR into `dev`
with title `content: rewrite premium service copy` and a body containing:

- `Part of #89`
- `Closes #94`
- summary of homepage, hub, and service-detail copy changes
- confirmation the #92 layout is preserved
- claim-safety and proof-safe media confirmation
- validation checklist
- rendered QA summary for all required routes and widths
- confirmation #50/#51 remain deferred and #77 remains open

Do not merge the PR or deploy production.
