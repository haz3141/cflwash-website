# CFL Wash Co. Design Guide

## Brand Purpose

CFL Wash Co. is a premium local exterior cleaning brand for Central Florida homeowners who want clean driveways, sidewalks, walkways, and concrete without a complicated sales process.

The website and brand system should make three things clear:

- CFL Wash Co. is local to Central Florida.
- The MVP offer is concrete-focused curb appeal cleaning.
- Requesting a quote should feel simple, direct, and trustworthy.

## Visual Direction

Use a bright Central Florida daylight feel: clean, polished, local, and easy to scan. The brand should feel premium for a neighborhood service business, not luxury for its own sake.

Primary direction:

- Simple scalable primary wordmark: `CFL Wash Co.`
- Richer campaign/art direction: "Premium Florida Curb Appeal Badge"
- Lead-generation website first, visual brand system second
- Homeowner-friendly, not industrial or corporate
- Clear proof areas for future before/after photos

## Color System

Use colors that support clean exterior surfaces, water, Florida light, and curb appeal.

Recommended system:

- Background: clean white and soft off-white
- Text: deep navy, slate, or near-black
- Primary accent: fresh water blue
- Secondary accent: restrained lawn/curb-appeal green
- Warm neutral: light concrete, sand, or sun-warmed off-white
- Borders: soft slate or cool gray

Suggested starting tokens:

- Deep Navy: `#0A1B2E`
- Water Blue: `#1F5DBE`
- Curb Green: `#206B3A`
- Sun Gold: `#E0AA3A`
- Warm Off-White: `#F6F1E6`
- Concrete Light: `#EEF2F4`
- Slate Text: `#23262B`
- Muted Text: `#5B6673`
- Soft Border: `#D9E2EA`
- White: `#FFFFFF`

Rules:

- Keep the base light and high-contrast.
- Use blue for primary CTAs, links, and active states.
- Use green sparingly for curb appeal cues, not as the whole theme.
- Use warm neutrals as support, not a dominant beige palette.
- Avoid harsh black/yellow construction styling.

## Typography

Current implementation uses a system sans stack. Future typography should stay clean, legible, and service-business appropriate.

Rules:

- Use a strong sans-serif for headings and UI.
- Keep body text highly readable on mobile.
- Prefer sentence-case headings over shouty all-caps.
- Use small uppercase eyebrow labels only when they help scanning.
- Do not use decorative tropical, brush, script, or novelty fonts.
- Do not make the wordmark dependent on a hard-to-read display typeface.

## Component Rules

Core reusable components:

- Header
- Footer
- Button
- Section
- ServiceCard
- CTA
- Future proof/photo grid
- Future FAQ block
- Future area card

Rules:

- CTAs should be obvious: `Request a Quote`, `Call`, `Email`.
- Buttons should have clear hover/focus states.
- Cards should be simple, with restrained borders and moderate radius. Use approximately 8px-16px radius for most cards. Avoid excessive pill shapes, nested cards, or generic dashboard-style containers.
- Do not put cards inside cards.
- Keep service and area cards dense enough for scanning.
- Use real links for phone, email, services, and area pages.
- Avoid UI that implies instant booking, online scheduling, online payment, or customer accounts before those features exist.

## Homepage Structure

Recommended homepage order:

- Header with wordmark, services, service areas, request quote, and call CTA
- Hero focused on driveway, sidewalk, walkway, and concrete cleaning
- Trust/service bar with safe claims only
- Core services: driveway pressure washing, sidewalk/walkway cleaning, concrete cleaning
- HOA notice and curb appeal feature
- Before/after proof section with placeholders until real jobs exist
- Service areas: Deltona, Orange City, DeBary, DeLand, Sanford, Lake Mary
- Three-step process: request quote, confirm details, get cleaned and receive photos when that workflow is in place
- Short homeowner FAQ
- Final CTA

Current implementation is a static Astro/Tailwind lead-gen foundation. Design work should enhance this structure instead of replacing it with a marketing-only landing page.

If the homepage or navigation lists a service area, Codex should make sure the matching data entry and route exist first. Current service-area route coverage may lag the full primary service-area list during MVP build-out.

## Stitch Usage Rules

Use Stitch to explore polished layouts, homepage sections, and responsive visual direction.

Stitch should:

- Preserve the MVP service focus.
- Use `CFL Wash Co.` as the primary wordmark text.
- Treat `cflwash.com` as the production domain.
- Keep the quote CTA available in the header, hero, service sections, and final CTA.
- Design reusable website sections, not a one-off mockup.
- Leave room for real before/after photos.
- Include mobile layout direction.
- Keep copy claim-safe.

Stitch should not:

- Create final logos that must be used as-is.
- Invent reviews, star ratings, awards, insurance status, or license status.
- Make roof cleaning, house washing, fleet washing, or commercial work the primary offer.
- Design a booking portal, payment flow, dashboard, or marketplace.

## Art Direction Rules

The primary wordmark should be simple and scalable. The richer "Premium Florida Curb Appeal Badge" direction can be used for hero graphics, signs, shirts, social graphics, and future brand assets.

Badge art direction may include:

- Clean concrete or driveway shapes
- Water spray or wash lines
- Subtle Florida sun/daylight cues
- Palm or lawn cues used sparingly
- Premium local-service composition

Rules:

- Do not finalize logo art inside docs.
- Keep badge art secondary to the readable wordmark.
- Make graphics usable across shirts, signs, social, and web.
- Avoid overly beachy, tourist, mascot, or generic pressure-washer clip art.

## Current Brand Asset Implementation

The launch site currently uses approved raster draft assets under `public/images/brand/`:

- `logo-primary.png` for the header and footer identity.
- `logo-mark.png` as the compact mark source for app icon exports.
- `badge-illustrated.jpg` as a secondary storytelling asset for future use.
- `hero-homepage.jpg` for the homepage hero visual.
- `og-default.jpg` for default Open Graph and social sharing metadata.

The favicon and app icons use a simplified derived `CFL` treatment for small-size browser legibility. These website assets are acceptable for the current launch integration, but they are not final SVG/vector logo masters. Future brand cleanup should recreate the primary logo, compact mark, reversed variants, favicon source, and badge artwork as production vector assets before broader print, apparel, signage, or long-term brand use.

Rendered page images should keep intrinsic dimensions or stable aspect ratios, use empty alt text when decorative, and avoid treating generated artwork as proof of completed project work.

## What To Avoid

- Fake reviews or invented customer quotes
- `5-star rated` unless verified
- `fully insured` unless verified
- `licensed` unless verified
- `same-day service` unless verified
- Roof cleaning or house washing as the hero offer
- Fleet washing or commercial services as the MVP focus
- Dark industrial layouts
- Generic janitorial visuals
- Overly corporate tech-startup styling
- Decorative layouts that make quote requests harder
- Final logo or final artwork decisions in documentation
