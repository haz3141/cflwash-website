# CFL Wash Co. Design System

This document is the implementation source of truth for the website UI system.

It complements:

- [DESIGN.md](./DESIGN.md) for brand direction and UX intent
- [BRAND_ASSETS.md](./BRAND_ASSETS.md) for logo and image inventory
- [ANALYTICS_TRACKING_PLAN.md](../seo/ANALYTICS_TRACKING_PLAN.md) for CTA tracking conventions
- [CLAIMS.md](../strategy/CLAIMS.md) for claim-safe copy rules

## Principles

- Premium but restrained.
- Local and homeowner-friendly.
- Clean surfaces, clear hierarchy, low friction.
- Use structure, spacing, and contrast before decoration.
- Favor reusable components over page-specific styling.
- Keep the quote path obvious.

## Token Architecture

The codebase uses a hybrid token model:

- Brand primitive tokens live in Tailwind 4 `@theme` when generated utilities are useful.
- Semantic aliases live in `:root` and should be preferred by components.
- Raw palette values should be avoided in shared UI unless a one-off exception is documented.
- Legacy aliases such as `--color-primary` and `--section-spacing` remain available for compatibility, but new work should use the semantic names above.

Use `@theme` for durable brand primitives, spacing, type, radius, shadows, transitions, and container values that should map to Tailwind utilities. Use `:root` for meanings such as page, surface, text, border, action, accent, inverse, focus, feedback, section, and container roles. Components should not reach for brand primitives directly unless the primitive is the actual design meaning.

### Primitive Tokens

Primitive categories include:

- Brand colors
- Neutral colors
- Font family
- Text sizes
- Line heights
- Letter spacing
- Spacing scale
- Radius scale
- Shadow scale
- Transition durations
- Easing curves
- Container sizes

The base spacing scale is 4px with an 8px visual rhythm:

- `4`
- `8`
- `12`
- `16`
- `20`
- `24`
- `32`
- `40`
- `48`
- `64`
- `80`
- `96`

### Semantic Tokens

Components should consume semantic tokens such as:

- `--color-page`
- `--color-surface`
- `--color-surface-raised`
- `--color-surface-water`
- `--color-surface-soft`
- `--color-surface-warm`
- `--color-surface-inverse`
- `--color-text`
- `--color-text-muted`
- `--color-text-inverse`
- `--color-border`
- `--color-border-strong`
- `--color-action`
- `--color-action-hover`
- `--color-action-active`
- `--color-accent`
- `--color-accent-hover`
- `--color-cta-surface`
- `--color-media-frame`
- `--color-inverse-border`
- `--color-inverse-muted`
- `--color-focus-ring`
- `--color-focus-ring-inverse`
- `--layout-gap`

Shared utility classes such as `.media-frame`, `.feature-panel`, `.card-link`,
`.pill-link`, `.text-link`, `.inverse-link`, `.form-control`,
`.status-message`, `.eyebrow-action`, token shadow utilities, and the homepage
art utilities exist only for recurring visual treatments. Do not use raw
page-local hex, shadow, or gradient values for the approved navy / cream /
white / blue / gold system when a token, primitive prop, or shared utility
exists.

## Color Rules

- Deep navy anchors headings, inverse surfaces, and premium footer treatment.
- Water blue is the primary action and link color.
- Curb green is sparingly used for support cues.
- Warm gold is reserved for subtle emphasis.
- White and warm off-white remain the page base and inverse text colors.
- Avoid industrial black/yellow styling.
- Avoid low-contrast gold text.

## Typography

The site uses Manrope Variable with a clean sans fallback stack.

Scale targets:

- Display: `clamp(2.75rem, 2rem + 3.2vw, 4.75rem)`
- Interior hero: `clamp(2.25rem, 1.8rem + 2.3vw, 4rem)`
- H2: `clamp(2rem, 1.5rem + 1.6vw, 3rem)`
- H3: `clamp(1.25rem, 1.1rem + 0.4vw, 1.5rem)`
- Lead: `clamp(1.125rem, 1rem + 0.35vw, 1.25rem)`
- Body: `1rem`
- Small: `0.875rem`
- Eyebrow: `0.75rem`

Rules:

- Use tight line heights for headings.
- Keep paragraph measure around 60 to 68 characters.
- Prefer sentence-case headings.
- Use uppercase eyebrow labels only when they help scanning.
- Keep body text readable on mobile first.

Shared utility classes:

- `.text-display`
- `.text-hero`
- `.text-section-title`
- `.text-section-subtitle`
- `.text-lead`
- `.text-body`
- `.text-small`
- `.text-eyebrow`
- `.measure-copy`
- `.measure-card`

## Spacing And Layout

Standard section spacing:

- `--section-space: clamp(3.5rem, 7vw, 6rem)`
- `--section-space-compact: clamp(2.5rem, 5vw, 4rem)`
- `--section-space-spacious: clamp(4.5rem, 8vw, 7rem)`
- `--layout-gap: clamp(2rem, 4vw, 4rem)` (32px to 64px) for major split
  compositions such as split heroes

Rhythm targets:

- Eyebrow to heading: 12px
- Heading to description: 16px
- Section header to content: 32px to 40px
- Card padding: 24px mobile, up to 32px desktop
- Compact and card grid gaps: 16px to 24px mobile, 24px to 32px desktop
- CTA groups: 12px

Layout rules:

- Keep the site width around 72rem.
- Use consistent gutters via `--container-gutter`.
- Design mobile first.
- Avoid layouts that only work at a single screenshot width.

## Radius, Border, Shadow

Radius targets:

- Small: 6px
- Medium: 10px
- Large: 16px
- Extra large: 24px, reserved for major visual containers
- Pill: only for buttons, tags, or controls

Border rules:

- Use borders for most structural separation.
- Reserve elevation for sticky chrome, featured panels, and major media.
- Do not stack soft shadows on every card.

Shadow tokens:

- `--shadow-xs`: subtle separation
- `--shadow-sm`: sticky chrome or elevated cards
- `--shadow-media`: hero and major visual containers

## Motion And Focus

Transition rules:

- Fast interaction: 150ms
- Normal interaction: 220ms
- Use the shared easing curve for hover and focus transitions.
- Respect `prefers-reduced-motion`.
- Do not add ornamental animation, parallax, counters, or scroll effects.

Focus rules:

- Every interactive element must show a visible keyboard focus state.
- Keep focus rings clear on both light and dark surfaces.
- Icon-only controls require an accessible label.

## Icons

`@lucide/astro` is the only icon family for this site.

Icon rules:

- Use inline SVG only.
- Use `currentColor`.
- Keep stroke width around 1.75 to 2.
- Decorative icons use `aria-hidden="true"`.
- Icon-only controls need a label.
- Use icons sparingly.
- Do not use stars, shields, medals, awards, or certificates.

Standard sizes:

- 16px: metadata and compact inline UI
- 20px: buttons and compact feature treatments
- 24px: standard feature icons
- 32px: larger service or process treatments

Suggested semantic mapping:

- Driveway: `CarFront`
- Walkways: `Footprints`
- Concrete: `Blocks`
- Quote request: `ClipboardList`
- Request review/details: `MessageSquareText`
- Cleaning result: `Sparkles`
- Service area: `MapPin`
- Email: `Mail`
- HOA notice: `ClipboardCheck`

## Responsive Behavior

Review and test at:

- 390px
- 768px
- 1024px
- 1440px

Key expectations:

- Header stays compact and readable.
- Footer remains premium and legible.
- Card grids stack cleanly before widening.
- Text measure stays comfortable on all viewports.
- No overlap or layout shift in the chrome.

## Visual QA Process

For sitewide theme work, compare every public route against the current homepage visual system at 390px, 768px, 1024px, and 1440px. Check typography scale, section spacing, cream/water/white surface rhythm, dark navy inverse surfaces, CTA panels, cards, borders, radii, shadows, media frames, link behavior, button behavior, header, footer, and mobile sticky CTA.

Use the in-app Browser when available. Record any route-specific notes in the PR description, including intentional deviations and any viewport that could not be reviewed. Functional checks and `pnpm build` do not replace visual QA.

## Component APIs

### Page Pattern Components

The component hierarchy is intentionally layered:

- `src/components/ui/` contains low-level primitives: `Button`, `Card`, `Container`, `IconBadge`, `Section`, and `SectionHeader`.
- `src/components/home/` contains homepage-only compositions such as `HomeHero`, `HomeServiceCard`, and `WaterWaveDivider`.
- `src/components/patterns/` contains reusable page compositions that own common responsive structure while pages still own copy, SEO, content order, and page-specific slots.
- `src/components/site/` remains reserved for global chrome such as the header, footer, analytics, schema, and mobile sticky CTA.

Use page patterns when at least two current pages share the same structure. Do not create speculative variants for future page ideas.

#### HomeHero

Purpose: homepage-only, service-led conversion hero owned by
`src/components/home/HomeHero.astro`.

Rules:

- Keep one semantic content and media structure across all breakpoints.
- Use a centered stacked layout below 960px and a copy/mosaic split at 960px and above.
- Keep the eyebrow, H1, supporting copy, and primary quote action ahead of the visual on mobile.
- Use only registered `service-illustration` / `not-proof` media with responsive candidates and intrinsic dimensions.
- Use `logo-mark-transparent.png` only as a small decorative seal; never use the white-background illustrated badge as the main hero image.
- Keep the primary action labeled `Request a Quote` and the secondary phone action labeled `Call`.

#### HeroSection

Purpose: page-opening structure for split media-led interiors and compact utility pages.

Allowed variants:

- `split`: copy plus explicit media slot, stacked on mobile and two-column on desktop.
- `compact`: quiet utility-page intro with optional aside slot.

Allowed tones:

- `default`
- `soft`

Slots:

- `actions` for page-owned CTA buttons and analytics attributes.
- `media` for split-hero visual media.
- `aside` for compact supporting panels such as Deltona quote priorities.

Rules:

- Keep the visible H1 copy page-owned and claim-safe.
- Supply content-relevant media explicitly from the page or shared page pattern.
- Never infer hero media from `Astro.url.pathname` or another route side table.
- Reset the split grid and both direct grid children with `min-w-0` so intrinsic
  media cannot expand the mobile layout.
- Do not add `centered`, `full-bleed`, or `editorial` variants until real current pages require them.
- Do not hide CTA fallback logic inside the component.

#### MediaFrame

Purpose: proof-safe framing for registered hero and feature media.

Props:

- `media`: a `PublicMediaAsset` with stable ID, role, proof status, source type,
  alt text, caption, intrinsic dimensions, and responsive sources.
- `loading?: 'eager' | 'lazy'`
- `fetchpriority?: 'high' | 'low' | 'auto'`
- `sizes?: string`
- `class?: string`
- `imageClass?: string`

Rules:

- Add reusable public content media to `src/data/publicMedia.ts`; licensed city
  records use the same role vocabulary in `src/data/cityContextImages.ts`.
- Always provide intrinsic dimensions and accurate alt text.
- Use a visible caption when an illustrative image could be mistaken for completed-project proof.
- Use eager loading and high fetch priority only for above-the-fold media.
- Follow `PREMIUM_MEDIA_SYSTEM.md` for role selection, disclosures, delivery,
  rights records, and the future verified-proof boundary.

#### CityContextMedia

Purpose: attributed licensed place photography that identifies a city without
acting as service or completed-project proof.

Allowed variants:

- `standard`: framed review treatment for the dev-only city-image fixture.
- `compact`: small open callout used later on public city pages.

Rules:

- Public city pages must use `compact`, expose `data-city-context-callout`, and
  keep the label `City context only` visible.
- Preserve the registered `city-context` role, `context-only` proof status,
  factual alt text, responsive sources, intrinsic dimensions, caption, and
  attribution.
- Never use civic photography in a hero, as a service result, or as evidence of
  city-specific work history.

#### ServiceMenu

Purpose: curated editorial navigation for the three active launch services on
the services hub.

Inputs:

- `items`: exactly the active driveway, sidewalk and walkway, and concrete
  services, each with its canonical slug, existing name, summary, fit guidance,
  registered `PublicMediaAsset`, and Lucide icon.

Content and media rules:

- Keep the menu limited to the three active service routes; do not add future
  services, speculative variants, or unsupported claims.
- Use each service's registered illustration with its exact alt text,
  responsive sources, intrinsic dimensions, media role, and proof status.
- Keep the proof-safe caption visible and include attribution whenever the
  registry supplies it.
- Keep service names, summaries, fit guidance, and descriptive link labels
  page-owned and claim-safe.

Layout rules:

- Render one semantic, non-nested list of open rows separated by borders and
  whitespace; do not wrap rows or their content in `Card` components or nested
  framed cards.
- Keep media before content in the DOM, stack each row on smaller screens, and
  use a balanced two-column layout at the large breakpoint.
- Use shared tokens, `IconBadge`, `.media-frame`, `.text-link`, and documented
  shadow utilities rather than page-local colors, shadows, or CTA treatments.

#### ServiceDetailPage

Purpose: shared, centrally tunable layout for the three active service-detail
routes.

Content ownership and data contract:

- Accept one `ServiceDetailPageContent` record from
  `src/data/serviceDetailPages.ts`; route wrappers select the matching record
  and do not duplicate page markup.
- Keep SEO title and description, hero copy and registered media, scope,
  guidance, preparation, process, related-section copy, FAQs, and final CTA
  copy in the data record.
- Derive the current service name and related service links from `services`,
  and derive the six active area links from `serviceAreas`.

Section rhythm and density:

- Use a soft split hero, white open scope list, light water guidance band,
  white compact process, quiet warm related-navigation band, light FAQ band,
  and one inverse final CTA.
- Render scope as one semantic two-column open list with dividers; do not use a
  card for each inclusion.
- Render guidance as one open divided list beside exactly one restrained Card
  for preparation. Do not turn the four guidance items or four preparation
  items into card grids.
- Keep the process on the open compact `ProcessSteps` variant and use compact
  `LinkGrid` groups for two related services and six active service areas.

Responsive and conversion rules:

- Stack hero copy, actions, and media on smaller screens; keep quote first,
  make hero and final actions full width on mobile, and return them to auto
  width from `sm`.
- Use the verified phone as the secondary call action when configured. Use an
  email action with a Mail icon when the phone is unavailable.
- Preserve exact hero tracking location `service-{slug}` and final tracking
  location `service-{slug}-final` on both the quote and secondary actions.

Preservation rules:

- Preserve each route's canonical path, SEO metadata, visible breadcrumbs,
  breadcrumb schema, one-H1 structure, registered `PublicMediaAsset`, eager
  hero loading, intrinsic image dimensions, media role, proof status, alt text,
  and visible proof-safe caption.
- Keep the pattern limited to the three active launch services. Do not add
  speculative services, project proof, unsupported claims, or the full #94
  brand-voice rewrite through this component.

#### SplitFeature

Purpose: recurring two-column sections with a text column and flexible secondary content.

Allowed options:

- `tone`: `default` or `soft`.
- `columns`: `content-heavy` or `media-heavy`.
- `align`: `start` or `center`.
- `titleSize`: `compact` for service/city sections or `section` for homepage-scale sections.
- `descriptionSize`: `body` or `lead`.

Slots:

- Default slot for the secondary content column.
- `actions` for buttons or closely related content beneath the text.

Rules:

- Use it for real split sections, not for every card grid.
- Keep local examples, cards, lists, and links in page-owned slot content.
- Preserve the current fixed page gutters used by split sections; do not normalize them to container gutters unless the page itself is being redesigned.

#### ProcessSteps

Purpose: accessible numbered process lists.

Allowed variants:

- `compact`: inline number marker and title for service pages.
- `featured`: larger number-led cards for the homepage process.

Allowed `cardTone` values:

- `raised`
- `soft`

Semantics:

- Renders an ordered list.
- Uses visible numeric markers as the primary visual system.
- Marks the list and steps in generated HTML so production audits can verify one sequence without duplicated numbering.

Rules:

- Do not add icon support until a current page requires it.
- Keep the process to clear, short steps.
- Use the open compact timeline by default; reserve cards for the explicitly featured variant.

#### LinkGrid

Purpose: repeated link groups such as active service areas, related services, nearby cities, and service links.

Allowed variants:

- `compact`: open divided navigation rows.
- `cards`: page-surface linked cards for broader grids.

Allowed columns:

- `one`
- `two`
- `three`

Allowed item state:

- `inactive`: non-link item, used for future service areas that should not imply a published route.

Rules:

- Inactive items must not render as anchors.
- Linked items are the default behavior when an `href` is present.
- Use descriptions only when the current page already has supporting summary text.

#### CTASection

Purpose: final conversion sections on homepage, service pages, and service-area pages.

Allowed surfaces:

- `default`: majority service/city appearance with fixed horizontal padding, no shadow, and no overflow clipping.
- `elevated`: homepage treatment with subtle elevation.

Allowed tones:

- `action`: water-blue conversion panel.
- `inverse`: deep-navy conversion panel.

Allowed title widths:

- `default`
- `wide`

Slots:

- `actions` for page-owned `Button` components.

Rules:

- Preserve `data-cta` and `data-cta-location` on the Button instances.
- Do not centralize phone/email fallback logic in the pattern.
- Use the strong branded panel sparingly, usually once near the end of a page.
- Keep the default panel restrained; reserve elevation for the homepage or another current page that explicitly needs it.
- Use inverse panels to vary long interior-page rhythm without adding page-local colors.

#### FAQList

Purpose: static accessible FAQ lists with open, divided rows for service and city pages.

Allowed columns:

- `two`: deeper FAQ sets such as Deltona.
- `three`: shorter service/city FAQ sets.

Rules:

- Render static content; do not build an accordion until a real content need requires it.
- Keep each question and answer page-owned.
- Do not wrap every FAQ in a card; section tone and dividers carry the hierarchy.

#### ServiceAreaPage

Purpose: shared layout for the six approved service-area pages.

Inputs:

- `page: ServiceAreaPageContent` from `src/data/serviceAreaPages/*`.

Rules:

- Keep city-specific copy, explicit registered hero media, FAQs, nearby cities,
  and SEO data in the data file.
- Use a proof-safe service illustration in the split hero. The mapping may
  reflect an existing homeowner scenario, but must not imply work completed in
  that city.
- Use the shared soft hero, open service navigation, water scenario band,
  white compact local-context treatment, warm process, soft FAQ, compact nearby
  links, and inverse close. Do not fork the six route templates.
- Render one stronger lead scenario and two quieter supporting scenarios as an
  open editorial composition, not bordered cards.
- Keep civic imagery inside the compact `CityContextMedia` callout after the
  service and homeowner content. It must remain secondary and attributed.
- Keep hero and final actions full width on mobile, quote first, and call/email
  second.
- Preserve canonical paths under `/service-areas/{slug}`.
- Preserve `data-cta` and `data-cta-location` values on quote, call, and email actions.
- Do not add cities through this pattern unless the city is approved in the service-area data and SEO inventory.
- Use city-context images only as location context, never as completed project proof.

### Service-area hub composition

`/service-areas` uses the shared split `HeroSection` with registered residential
brand artwork, one semantic `data-service-area-menu` list for the six approved
cities, compact open service links, and one inverse final CTA. The city chooser
uses two open columns only when space allows and collapses to one column on
mobile. It must not use civic photography, city-boundary maps, card grids, or a
separate page-local visual system.

### Page Rhythm Rules

- Use a background-tone change or a border as the primary separator, usually not both.
- Avoid more than two consecutive card-grid sections.
- Avoid repeating the same three-column card pattern multiple times on one page.
- Use strong branded CTA sections sparingly.
- Let page-specific content choose section order and tone.
- Keep cards for selectable, scannable, or truly distinct items.
- Prefer lists, timelines, split features, or editorial layouts when cards add no value.

### Supporting Patterns Held Back

- `TrustStrip` should wait until another current page shares the homepage trust-row need.
- `FeatureList` should wait until bullets, prep notes, and scenario lists converge on one clear API.
- A full `MediaPanel` component should wait until media captions, proof photos, and city context converge on one API. Until then, use `.media-frame` for repeated hero and feature image framing.

### Theme Drift Guardrails

Theme drift is any public page, layout, or shared component that recreates the visual system outside tokens, primitives, pattern props, or documented utilities. Examples include raw hex/rgb/rgba colors outside `src/styles/tokens.css` or asset/SVG contexts, legacy Tailwind color utilities, raw `white/*` inverse utilities, arbitrary shadows when a token utility exists, one-off gradients outside approved global utilities, inline `style` attributes, public page `<style>` blocks for theme decisions, and duplicated CTA/link/button class clusters.

`scripts/audit-patterns.mjs` enforces the obvious cases across public pages, shared components, layouts, and styles. Legacy color utility checks cover `bg`, `text`, `border`, `from`, `via`, `to`, `ring`, `divide`, `outline`, `decoration`, `placeholder`, `accent`, `caret`, `fill`, and `stroke` utility families for old slate/blue/gray values and raw white inverse values. The audit reports file and line numbers, and its documented scan exclusions are limited to `src/styles/tokens.css`, `src/styles/global.css`, and dev-only QA pages under `src/pages/dev/`.

If a real design need is not expressible through an existing primitive or pattern, add the smallest prop or shared utility first, document it here, and then use it. Do not patch page-local classes around the audit.

Astro scoped styles are allowed only for isolated component internals, such as layout mechanics that are not part of the global theme. They are not allowed for page-level colors, shadows, CTA treatments, card treatments, section backgrounds, or typography scale decisions on public pages.

### Button

Props:

- `href?: string`
- `variant?: 'primary' | 'secondary' | 'ghost' | 'inverse' | 'accent' | 'light' | 'inverseGhost'`
- `size?: 'sm' | 'md' | 'lg'`
- `fullWidth?: boolean`
- `disabled?: boolean`
- `type?: 'button' | 'submit' | 'reset'`
- `class?: string`

Slots:

- `startIcon`
- `endIcon`

Rules:

- Use `primary` for the main action on light page surfaces unless a documented semantic policy says otherwise.
- Use `secondary` for lower-emphasis actions.
- Use `ghost` for the least-emphasis actions.
- Use `inverse` on dark surfaces.
- Use `accent` for the gold marketing CTA treatment.
- Use `light` inside branded CTA panels where a white action button is needed.
- Use `inverseGhost` for secondary actions on branded CTA panels.
- Keep touch targets at or above 44px.
- Preserve visible focus states.
- Disabled anchors must be non-interactive and labelled correctly.

#### Semantic quote CTA policy

Use the shared `Button` component for every public quote CTA. Do not create a
second button component, page-local button color overrides, or page-by-page CTA
color exceptions unless the exception is documented here first.

- Light page surfaces: quote CTA = `primary`; secondary action = `secondary`.
- Branded or inverse CTA panels: quote CTA = `light`; secondary action = `inverseGhost`.
- Persistent global chrome: quote CTA = `accent`.

Apply that policy by surface:

- Header, footer, the desktop/mobile header quote actions, and the mobile sticky quote CTA stay `accent`.
- Homepage hero and homepage final CTA use `primary` because both sit on light or warm page surfaces.
- Service hub hero, service-detail heroes, service-area hub hero, and city-page heroes use `primary`.
- Inverse CTA panels on services, service areas, and city pages use `light` for the quote action and `inverseGhost` for the secondary action.
- Quote-page submission and thank-you utility actions stay on the light-surface policy: `primary` for the main action, `secondary` for lower-emphasis follow-up.

Semantic note:

- The Button `secondary` variant is the low-emphasis light-surface button treatment. There is intentionally no same-named semantic color alias because that name suggested a green action color that did not match the component system.

### Card

Props:

- `tone?: 'default' | 'raised' | 'soft' | 'water' | 'warm' | 'inverse'`
- `padding?: 'sm' | 'md' | 'lg'`
- `elevated?: boolean`
- `class?: string`

Rules:

- Use borders first, elevation second.
- Do not nest cards inside cards.
- Use `raised` for white cards on tinted sections.
- Use `water` or `warm` only when the section tone supports it.

### Section

Props:

- `id?: string`
- `eyebrow?: string`
- `title?: string`
- `description?: string`
- `spacing?: 'compact' | 'default' | 'spacious' | 'none'`
- `tone?: 'default' | 'soft' | 'water' | 'warm' | 'inverse'`
- `contentWidth?: 'narrow' | 'default' | 'wide' | 'full'`
- `class?: string`

Rules:

- Prefer `Section` over hand-written section wrappers.
- Use `tone` to express the surface.
- Use `spacing` to keep vertical rhythm consistent.
- Use `contentWidth` to control measure when text needs it.

### Container

Props:

- `as?: 'div' | 'section' | 'header' | 'footer' | 'nav'`
- `class?: string`

Rules:

- Use for shared shell width and gutters.
- Keep the container width consistent across header, footer, and sections.

### SectionHeader

Props:

- `eyebrow?: string`
- `title?: string`
- `description?: string`
- `align?: 'left' | 'center'`
- `tone?: 'default' | 'inverse'`
- `class?: string`

Rules:

- Use for reusable section headings instead of repeating the same header markup.
- Keep copy measure compact.

### IconBadge

Props:

- `icon: any`
- `tone?: 'default' | 'soft' | 'water' | 'warm' | 'action' | 'accent' | 'inverse'`
- `size?: 'sm' | 'md' | 'lg'`
- `class?: string`

Rules:

- Use `action` for blue circular markers and `accent` for navy/gold markers.
- Use for compact service, process, or metadata markers.
- Do not use as decoration beside every text block.

## Asset Usage

- Header uses the transparent primary logo on a light surface.
- Footer uses the reversed logo on a deep navy surface.
- Compact mark is reserved for small-size contexts and favicon work.
- Do not place raster logos on accidental white boxes.
- Do not call a raster logo a vector master.

See [BRAND_ASSETS.md](./BRAND_ASSETS.md) for the inventory and limitations.

## Contact Data

- `src/data/site.ts` is the single source of truth for the public phone number and site email.
- Use `phoneDisplay` for visible UI labels.
- Use `phoneE164` for structured data and machine-readable contact values.
- Use `phoneHref` for `tel:` links.
- Request a Quote remains the primary action; Call is the preferred secondary action when configured; Email stays available as a supporting fallback.
- Do not duplicate raw digits in page templates when the centralized site data already supplies the value.

## Structured Data

- Generate site-wide `Organization` JSON-LD from centralized site data.
- Use the verified site name, URL, email, logo, phone number, and service area only.
- Defer `LocalBusiness` until a verified public address and address strategy are established.

## Accessibility

- Preserve semantic HTML.
- Keep focus visible.
- Use meaningful link text.
- Decorative icons must be hidden from assistive tech.
- Avoid motion that ignores reduced-motion preferences.
- Make sure icon-only controls have an accessible label.

## Contribution Rules

- Reuse existing primitives before adding new abstractions.
- Keep changes focused.
- Prefer semantic tokens over raw palette values.
- Document new UI patterns here before using them broadly.
- Do not add unsupported claims or proof.
- Do not add new UI frameworks or animation libraries.

## Correct / Incorrect

Correct:

- `Button` with `variant="primary"` for a quote CTA on a light page surface.
- `Button` with `variant="light"` for a quote CTA inside an inverse CTA panel.
- `Button` with `variant="accent"` for a quote CTA in persistent global chrome.
- `Card tone="soft" padding="lg"` for a section panel.
- `Section tone="warm" spacing="compact"` for a supporting surface.
- `IconBadge icon={MapPin}` for a compact service-area cue.

Incorrect:

- Hard-coding `#1f5dbe` in a page file when `--color-action` exists.
- Using stars or shields as trust icons.
- Nesting cards inside cards.
- Adding a new one-off wrapper instead of using `Container`, `Section`, or `SectionHeader`.
