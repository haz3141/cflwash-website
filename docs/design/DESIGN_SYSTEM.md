# CFL Wash Co. Design System

This document is the implementation source of truth for the website UI system.

It complements:

- [DESIGN.md](./DESIGN.md) for brand direction and UX intent
- [BRAND_ASSETS.md](./BRAND_ASSETS.md) for logo and image inventory
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

- Primitive tokens live in Tailwind 4 `@theme` when generated utilities are useful.
- Semantic aliases live in `:root` and should be preferred by components.
- Raw palette values should be avoided in shared UI unless a one-off exception is documented.
- Legacy aliases such as `--color-primary` and `--section-spacing` remain available for compatibility, but new work should use the semantic names above.

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
- `--color-secondary`
- `--color-accent`
- `--color-focus-ring`
- `--color-focus-ring-inverse`

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

Rhythm targets:

- Eyebrow to heading: 12px
- Heading to description: 16px
- Section header to content: 32px to 40px
- Card padding: 24px mobile, up to 32px desktop
- Grid gaps: 16px to 24px mobile, 24px to 32px desktop
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

## Component APIs

### Button

Props:

- `href?: string`
- `variant?: 'primary' | 'secondary' | 'ghost' | 'inverse'`
- `size?: 'sm' | 'md' | 'lg'`
- `fullWidth?: boolean`
- `disabled?: boolean`
- `type?: 'button' | 'submit' | 'reset'`
- `class?: string`

Slots:

- `startIcon`
- `endIcon`

Rules:

- Use `primary` for the main action.
- Use `secondary` for lower-emphasis actions.
- Use `ghost` for the least-emphasis actions.
- Use `inverse` on dark surfaces.
- Keep touch targets at or above 44px.
- Preserve visible focus states.
- Disabled anchors must be non-interactive and labelled correctly.

### Card

Props:

- `tone?: 'default' | 'soft' | 'warm' | 'inverse'`
- `padding?: 'sm' | 'md' | 'lg'`
- `elevated?: boolean`
- `class?: string`

Rules:

- Use borders first, elevation second.
- Do not nest cards inside cards.
- Use `soft` or `warm` only when the section tone supports it.

### Section

Props:

- `id?: string`
- `eyebrow?: string`
- `title?: string`
- `description?: string`
- `spacing?: 'compact' | 'default' | 'spacious' | 'none'`
- `tone?: 'default' | 'soft' | 'warm' | 'inverse'`
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
- `tone?: 'default' | 'soft' | 'warm' | 'inverse'`
- `size?: 'sm' | 'md' | 'lg'`
- `class?: string`

Rules:

- Use for compact service, process, or metadata markers.
- Do not use as decoration beside every text block.

## Asset Usage

- Header uses the transparent primary logo on a light surface.
- Footer uses the reversed logo on a deep navy surface.
- Compact mark is reserved for small-size contexts and favicon work.
- Do not place raster logos on accidental white boxes.
- Do not call a raster logo a vector master.

See [BRAND_ASSETS.md](./BRAND_ASSETS.md) for the inventory and limitations.

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

- `Button` with `variant="primary"` for the quote CTA.
- `Card tone="soft" padding="lg"` for a section panel.
- `Section tone="warm" spacing="compact"` for a supporting surface.
- `IconBadge icon={MapPin}` for a compact service-area cue.

Incorrect:

- Hard-coding `#1f5dbe` in a page file when `--color-action` exists.
- Using stars or shields as trust icons.
- Nesting cards inside cards.
- Adding a new one-off wrapper instead of using `Container`, `Section`, or `SectionHeader`.
