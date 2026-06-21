# Premium Polish Audit and Creative Brief

- Status: implementation baseline for issue #90 and epic #89
- Audit date: June 19, 2026
- Source revision: `dev` at `76101d9`
- Reference route: `/`

## Purpose

This document defines what “premium” means for the CFL Wash Co. website and
records the rendered gaps that later premium-polish issues must resolve. It is
the durable baseline for design, media, content, conversion, and final QA work.

This audit does not authorize public design or copy changes by itself. Later
issues must preserve the current routes, service inventory, six-city inventory,
quote backend behavior, SEO metadata, canonicals, sitemap behavior, schema,
breadcrumbs, and CTA tracking attributes unless their scope explicitly says
otherwise.

## Executive summary

The current site is technically sound and claim-conscious, but premium quality
is uneven. The homepage has a distinct brand composition: a cream hero, large
illustrated badge, water-wave transition, navy proof-safe band, editorial dark
section, and a composed closing quote area. Interior pages use the same tokens,
typeface, header, footer, buttons, and section surfaces, but most return to a
predictable sequence of heading, paragraph, card grid, another card grid, and a
blue final CTA. They look clean, but they still read as a polished SEO template
rather than a fully art-directed local-service brand.

The most important gaps are:

1. Service-detail heroes lose their intended automatic artwork in the built
   output. The three pages open as wide text-only blocks, while the source
   pattern implies a split-media hero.
2. The service-area hub and all six city pages depend too heavily on municipal
   or civic context. Every city page also repeats the same decorative hero
   image, so the pages are locally named but visually interchangeable.
3. Service pages and city pages are long and card-heavy. At 390px, service
   pages render at roughly 7,800px and city pages at roughly 8,400–8,600px.
   The repetition is structurally clear but not premium or fast to scan.
4. The quote fallback is honest but visually reads like a broken state. In the
   audited build, a large card leads with “Online quote form temporarily
   unavailable,” leaves substantial empty space, and repeats email fallback
   actions.
5. The copy protects against unsupported claims, but frequent use of “request,”
   “review,” “scope,” “appropriate,” “details,” and “before scheduling” makes
   the brand sound procedural. Safety language is often doing the work that a
   confident service explanation should do.
6. Mobile layouts do not overflow and the sticky CTA remains usable, but the
   fixed bar duplicates hero CTAs and can cover the content currently at the
   bottom of the viewport. Dense card stacks make that visual weight more
   noticeable.

The previously reported duplicated process numbering was not reproduced. The
rendered service and city process sections show one visible number per step,
and `ProcessSteps` suppresses native list markers. Later work should preserve
that behavior rather than redesigning it as a bug fix.

## Creative brief at a glance

| Brief element              | Direction                                                                                                                                                                                               |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Primary audience           | Central Florida homeowners deciding whether CFL Wash Co. is a credible fit for visible driveway, sidewalk, walkway, entry, patio, curb, or other current concrete cleaning needs.                       |
| Audience state             | They may be responding to visible buildup, a curb-appeal goal, an HOA notice, a move, or routine property upkeep. They want a simple next step and realistic expectations, not industry jargon.         |
| Single-minded message      | CFL Wash Co. makes it straightforward to request a clear quote for concrete-focused exterior cleaning in its current Central Florida service area.                                                      |
| Desired impression         | Local, capable, careful, modern, easy to work with, and honest about the current offer and available proof.                                                                                             |
| Desired action             | Request a quote with the city, surfaces, photos, access notes, and any relevant HOA wording; call or email as the secondary path.                                                                       |
| Brand personality          | Calm confidence, homeowner-friendly specificity, restrained visual quality, and practical local knowledge without swagger or invented authority.                                                        |
| Evidence available now     | Clear service inventory, six published service areas, working contact paths, surface-aware quote guidance, honest limitations, documented brand art, and attributed city-context media.                 |
| Evidence not available yet | Reviews, ratings, testimonials, completed-project proof, verified process/team photography, guarantees, awards, job counts, and verified licensing or insurance claims.                                 |
| Visual idea                | Bright residential surfaces and clear blue-water cues grounded by navy structure and warm gold actions. Real service or process media should carry the story when verified; civic context should not.   |
| Content idea               | Lead with the concrete surface and homeowner situation, explain what affects the work once, and close with a direct request-quote path.                                                                 |
| Non-goals                  | Broad exterior-cleaning expansion, a roof/soft-wash brand, a booking portal, fabricated proof, generic luxury language, city tourism content, or a redesign that destabilizes the quote backend or SEO. |

Success means a homeowner can answer three questions quickly on every route:

1. Does CFL Wash Co. handle the concrete surface or situation I have?
2. Does the company serve my location and set realistic expectations?
3. What do I send to request a quote?

## Audit method and evidence

### Scope

The built Astro output was reviewed at these viewport sizes:

- 390 × 844
- 768 × 1024
- 1024 × 768
- 1440 × 900

Every route required by issues #89 and #90 was rendered:

- `/`
- `/services`
- `/service-areas`
- `/request-quote`
- `/thank-you`
- `/privacy`
- `/driveway-pressure-washing`
- `/sidewalk-walkway-cleaning`
- `/concrete-cleaning`
- `/service-areas/deltona`
- `/service-areas/orange-city`
- `/service-areas/debary`
- `/service-areas/deland`
- `/service-areas/sanford`
- `/service-areas/lake-mary`

### What was checked

Each route was assessed for first impression, homepage consistency, hero
strength, section rhythm, card density, CTA visibility, mobile scanability,
type hierarchy, media role, premium-versus-template impression, copy clarity,
repetition, unsupported-claim risk, quote-flow clarity, and honest trust/proof
gaps.

The automated rendered pass also checked HTTP status, title, H1 count,
horizontal overflow, image load state, console warnings/errors, page errors,
section structure, process-list rendering, and CTA visibility. A services-hero
quote CTA was exercised through to `/request-quote` and arrived at the expected
title with no console errors.

The in-app browser handled navigation, DOM, console, and interaction checks.
Its screenshot command timed out twice on the local page, so screenshot capture
used Playwright with the installed Chrome executable. Screenshots and temporary
metrics remained outside the repository.

### Clean technical baseline

Across all 60 route/viewport combinations:

- every route returned HTTP 200;
- every route rendered exactly one H1;
- no horizontal overflow was detected;
- no broken rendered images were detected;
- no relevant console warning, console error, or page error was detected.

`pnpm check` passed before this document was written. These results prove a
clean implementation baseline; they do not prove premium visual quality.

## Verified findings

| ID   | Finding                                                           | Evidence                                                                                                                                                                                                                                                          | Later owner                         |
| ---- | ----------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| F-01 | The homepage is more art-directed than the interior pages.        | The homepage uses six visually distinct bands and deliberate cream/navy/wave rhythm. Interior pages mostly alternate white and soft sections with repeated bordered cards.                                                                                        | #91, #92, #93                       |
| F-02 | Interior pages still feel structurally older after token cleanup. | Tokens and chrome are consistent, but service pages use eight sections and 14 articles each; city pages use nine sections and 12 articles each with nearly identical composition.                                                                                 | #91, #92, #93                       |
| F-03 | Built service-detail heroes omit intended media.                  | `/driveway-pressure-washing`, `/sidewalk-walkway-cleaning`, and `/concrete-cleaning` render zero main-content images. Their built HTML does not contain the `HeroSection` automatic media markup even though `HeroSection.astro` contains pathname-based entries. | #91, #92, #98                       |
| F-04 | City imagery is too civic and not service-led.                    | The area hub shows six city halls/theaters/municipal landmarks. Each city page repeats one generic decorative property hero, then uses a civic photo as secondary “city context.”                                                                                 | #93, #98                            |
| F-05 | Service and city pages are too long and card-dense on mobile.     | At 390px, service pages are 7,779–7,933px high and city pages are 8,423–8,638px high. FAQ, process, service, related-link, and scenario cards stack consecutively.                                                                                                | #91–#95                             |
| F-06 | The quote fallback looks unfinished.                              | The audited build leads its primary conversion surface with “Online quote form temporarily unavailable,” a large mostly empty card, and repeated email actions.                                                                                                   | #96                                 |
| F-07 | Safe copy often sounds procedural or policy-like.                 | Exact sentences about property details, photos, review, scope, and scheduling repeat across all six city pages. Service pages use “quote” 7–10 times and “scope” 4–7 times in main paragraphs.                                                                    | #94, #95, #96                       |
| F-08 | Mobile conversion chrome is usable but heavy.                     | The fixed Call/Request a Quote bar has no overflow, but it duplicates hero CTAs and overlays the bottom portion of the current viewport while reading or scrolling.                                                                                               | #96                                 |
| F-09 | Process numbering is currently correct.                           | Rendered process text and screenshots show `1`, `2`, `3` once. `ProcessSteps.astro` uses an ordered list with `list-none` and explicit visible markers. No `1. 1` output was found.                                                                               | Preserve in #91–#97                 |
| F-10 | The proof gap is handled honestly but remains visible.            | No owner-provided project/result photography is active. Decorative art and civic context avoid fake proof, but repetition cannot create the trust or specificity of real process/team/project media.                                                              | #98; future #50/#51 remain deferred |

## Definition of premium for CFL Wash Co.

Premium does not mean adding decoration, gradients, motion, or unsupported
proof. It means that every page communicates a clear homeowner decision with
the confidence, restraint, visual hierarchy, and specificity expected from a
professional local-service brand.

### Premium design principles

1. **One clear page story.** Every route should have an intentional opening,
   two to five distinct supporting beats, and a decisive close. A page must not
   feel like independent SEO modules stacked until the keyword inventory is
   exhausted.
2. **Homeowner outcome before operating policy.** Lead with the surface, the
   visible problem, and the practical outcome. Put quote qualifications and
   expectation limits where they answer a real question.
3. **Editorial rhythm over card accumulation.** Use full-width bands, split
   features, concise lists, comparison rows, and media-led sections. Reserve
   cards for selectable choices, bounded FAQs, or truly independent items.
4. **Meaningful media hierarchy.** A hero image establishes service and mood;
   process or equipment media explains how the work happens; verified project
   images prove outcomes; city context only locates the service. These roles
   must not be interchangeable.
5. **The homepage sets tone, not a component to copy literally.** Interior
   routes should inherit its cream/white/water/navy/gold rhythm, confident type,
   strong media, and composed CTA treatment without copying the homepage wave,
   badge, or custom sections onto every page.
6. **Local should feel residential, not municipal.** Locality should come from
   service-area naming, recognizable Central Florida property conditions,
   climate-relevant concrete concerns, and verified service intent. City hall
   imagery is secondary context, not the primary local story.
7. **Conversion is visible but not repetitive.** Show one primary quote action
   in the hero and one decisive final CTA. Phone or email is secondary. Avoid
   adding another full CTA treatment to every intermediate section.
8. **Restraint creates quality.** Use current tokens, borders, radii, and
   shadows. Do not add ornamental animation, decorative badges, fake trust
   symbols, one-off gradients, or page-local theme rules.
9. **Utility pages stay intentionally quiet.** Privacy and confirmation pages
   should share the brand’s spacing and typography without pretending to be
   marketing pages.
10. **Mobile is a first-class composition.** At 390px, the first viewport must
    establish brand, page purpose, and a quote path without a wall of copy or a
    collision with fixed conversion chrome.

### Premium content principles

1. **Concrete first.** Name driveways, sidewalks, walkways, entries, patios,
   pads, aprons, curbs, and other current concrete surfaces before using broad
   “exterior cleaning” language.
2. **Specific, calm confidence.** Prefer direct service explanations over
   repeated caveats. One precise expectation note is stronger than several
   sentences about review and scope.
3. **Benefits without invented outcomes.** It is safe to discuss curb appeal,
   visible buildup, a cleaner-looking approach, easier quote preparation, and
   clear included areas. Do not promise complete stain removal or “like new”
   results.
4. **Put conditions next to the claim they qualify.** Surface age, coatings,
   drainage, access, and staining belong in a focused “what affects the work”
   section or relevant FAQ, not in every hero and CTA.
5. **Use one conversion vocabulary.** Default to “Request a quote.” Use “free
   quote” only after the business confirms that all quote paths are always
   offered at no cost. Do not imply booking, pricing confirmation, or scheduled
   service.
6. **Differentiate cities by homeowner situation, not unsupported trivia.**
   City copy may discuss relevant property-layout considerations already
   supported by the approved source material. It must not invent neighborhood
   expertise, completed jobs, response times, offices, or hyperlocal proof.
7. **Write for scanning.** Headings should carry meaning without the paragraph
   below them. Paragraphs should normally be two to four lines at desktop copy
   measure and should not restate the heading.
8. **Keep FAQs useful and selective.** A page should answer the questions most
   likely to change a quote request, not repeat service descriptions or claim
   disclaimers already covered above.
9. **Trust comes from clarity until proof exists.** Explain the service focus,
   quote inputs, surface considerations, and next step. Do not fill the proof
   gap with fabricated reviews, badges, ratings, guarantees, or vague premium
   adjectives.
10. **Preserve SEO facts naturally.** Keep service names, city names, canonical
    routes, metadata intent, breadcrumbs, and factual coverage visible without
    repeating the same phrase in every section.

## Route-by-route gap analysis

Rendered heights below are evidence of density, not performance targets. Values
show 1440px desktop / 390px mobile.

### Homepage and hubs

| Route            |          Height | Current strengths                                                                                                                     | Premium gaps                                                                                                                                                                                                                                                               | Required direction                                                                                                                                                                                                                             |
| ---------------- | --------------: | ------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`              | 3,496 / 6,759px | Strongest brand impression; clear cream/navy/gold identity; visible quote path; composed section changes; honest proof-safe language. | The oversized illustrated badge dominates the hero. Six service cards repeat the same decorative image, which reduces category distinction and makes the proof gap obvious. Some copy (“More than clean…confidence”) is generic compared with the concrete-first promise.  | Keep the homepage as the visual reference. Use #98 to diversify proof-safe service imagery and #94 to sharpen generic benefit language. Do not restructure the homepage from this audit.                                                       |
| `/services`      | 3,860 / 5,605px | Best interior-page hero; clear current-service inventory; one useful “connected surfaces” explanation; decisive final CTA.            | The same decorative property art used elsewhere does not identify the hub. The 1024 × 768 first viewport can show the large headline/media without the page-owned hero CTA. The lower page returns to three cards, three columns, a link-only section, and a standard CTA. | Keep the split hero but use service-led media. Tighten the H1 measure at 1024px so a primary action remains discoverable. Convert the middle into a clearer service comparison and one concise bundle explanation. Owners: #91, #92, #94, #98. |
| `/service-areas` | 3,771 / 7,323px | Coverage is explicit and claim-safe; all six approved cities are easy to find; attribution is visible.                                | Six large civic-image cards dominate the route and make the brand feel like a municipal directory. On mobile, the page becomes a long city-card catalog before reaching services or the final CTA.                                                                         | Use a residential/service-area visual story, keep civic photos as optional context, and make city selection faster. Preserve all six links and attributions. Owners: #93, #95, #98.                                                            |

### Quote and utility routes

| Route            |          Height | Current strengths                                                                                                                    | Premium gaps                                                                                                                                                                                                                                                                                                         | Required direction                                                                                                                                                                                                          |
| ---------------- | --------------: | ------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/request-quote` | 3,002 / 4,682px | Clear page purpose, honest no-booking language, working phone/email fallbacks, useful service/city links, successful CTA navigation. | In the audited no-Turnstile state, “temporarily unavailable” is the dominant message. The left card reserves far more height than its content needs and repeats email already offered in the hero and right card. The fallback looks like a configuration failure rather than an intentional email-first quote path. | #96 must design both configured-form and email-first states as first-class experiences. Collapse unused space, use one primary fallback action, keep privacy/expectation language secondary, and preserve backend behavior. |
| `/thank-you`     |   991 / 1,667px | Concise, noindex utility experience; clear way home and email follow-up; restrained design.                                          | “We have your request details” is only true after a successful submission, but the static URL is directly reachable. The page is visually generic and ends quickly in the large global footer.                                                                                                                       | #96 should ensure the confirmation language is tied to successful form navigation or make direct access neutral. Keep the page short; add only a compact next-step cue, not marketing sections.                             |
| `/privacy`       | 2,133 / 3,265px | Clear language, correct low-promotional tone, no unnecessary CTA, readable headings.                                                 | The entire policy sits in one large bordered card, so the page reads like an admin document rather than a refined legal utility. On mobile, the card padding and long linear block increase perceived weight.                                                                                                        | Preserve all legal meaning. Use quieter section dividers, a narrower readable measure, and consistent utility-page spacing. Do not add promotional proof or a forced CTA. Owner: #91, with final review in #97.             |

### Service-detail routes

All three service pages share the same core finding: the built page has no
main-content image, eight sections, 14 article/card units, multiple quote-scope
caveats, related links, FAQs, and a final CTA. Their information is useful, but
the repeated architecture makes them feel generated from one SEO template.

| Route                        |          Height | Route-specific gap                                                                                                                                                                                                                                  | Required direction                                                                                                                                                                                                                                                                   |
| ---------------------------- | --------------: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `/driveway-pressure-washing` | 5,284 / 7,779px | The hero is text-only despite intended media. “Surface, drainage, access, and staining,” preparation, process, related services, and FAQs all use separate card/list systems. “Quote” appears ten times and “scope” seven times in main paragraphs. | Make driveway/front-approach impact the visual and narrative anchor. Consolidate surface conditions and preparation. Keep stain limitations in one focused block plus the relevant FAQ. Owners: #92, #94, #98.                                                                       |
| `/sidewalk-walkway-cleaning` | 5,429 / 7,933px | The route has the same missing-media and eight-section rhythm. Path/walkway distinctions are useful, but condition, preparation, process, related links, and FAQs repeat the same service-page cadence.                                             | Use path continuity, entry safety/appearance, and connected walking surfaces as the visual story without making safety guarantees. Consolidate repeated operating caveats. Owners: #92, #94, #98.                                                                                    |
| `/concrete-cleaning`         | 5,197 / 7,785px | The broadest service has the least specific hero experience. Long lists of possible surfaces and exclusions can read as taxonomy rather than homeowner guidance.                                                                                    | Position this page as the option for concrete that is not primarily a driveway or walkway. Use a concise surface selector or editorial examples, then one conditions block. Keep sealing, repair, restoration, and non-concrete work explicitly out of scope. Owners: #92, #94, #98. |

### City routes

All six city pages use the same 9-section, 12-article shell. Each has useful
city-specific reason and FAQ copy, but the visual sequence is nearly identical:
the same decorative property hero, the same three service links, three reason
columns, one civic image, the same three quote steps, six FAQ cards, nearby-city
pills, and the same final CTA. Exact process, service, and scheduling sentences
repeat across all six routes.

| Route                        |          Height | Distinct current material                                                                        | Premium gap and direction                                                                                                                                                                                               |
| ---------------------------- | --------------: | ------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/service-areas/deltona`     | 5,697 / 8,538px | Driveway-first layouts, HOA notice use case, Deltona City Hall context.                          | Keep the driveway/front-approach angle. Demote the city hall image and reduce repeated quote instructions. Use verified residential or service-process media when available. Owners: #93, #95, #98.                     |
| `/service-areas/orange-city` | 5,758 / 8,638px | Compact front entries, shade/leaf buildup, move-in/sale preparation, historic town-hall context. | The unique material is buried inside the shared template. Bring one strong homeowner scenario earlier; retain the civic image only as secondary context. Owners: #93, #95, #98.                                         |
| `/service-areas/debary`      | 5,697 / 8,423px | Wooded streets, varied layouts, shaded buildup, DeBary Hall context.                             | The wooded/shade condition is a useful service-relevant distinction, but the same generic hero and shared scaffolding weaken it. Lead with that distinction and shorten repeated process copy. Owners: #93, #95, #98.   |
| `/service-areas/deland`      | 5,725 / 8,471px | Mature trees, mixed-age concrete, older entries, Athens Theatre context.                         | The theatre image provides place identity but no service relevance. Use mixed-age surface considerations as the page’s differentiating content and keep condition language precise. Owners: #93, #95, #98.              |
| `/service-areas/sanford`     | 5,758 / 8,535px | Older/newer communities, mixed materials, access notes, Sanford City Hall context.               | City Hall reinforces the municipal-directory feel. Promote mixed-material/access guidance and remove repeated generic paragraphs that do not add Sanford value. Owners: #93, #95, #98.                                  |
| `/service-areas/lake-mary`   | 5,786 / 8,562px | Planned communities, townhomes, decorative hardscape, Lake Mary City Hall sign context.          | The unique HOA/gate/parking and decorative-surface questions are useful but arrive inside the same long page. Prioritize those homeowner decisions and treat the civic sign as optional context. Owners: #93, #95, #98. |

## Component and pattern recommendations

These recommendations describe later implementation work. They do not authorize
changes in issue #90.

| Pattern or file                                             | Current gap                                                                                                                                                      | Durable recommendation                                                                                                                                                                                                                            | Owner                                |
| ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| `src/components/patterns/HeroSection.astro`                 | Automatic media is inferred from `Astro.url.pathname` and is absent from the built service-detail HTML. One shared decorative image is also doing too many jobs. | Make media explicit in page data or slots. Define intentional service, city, and utility hero compositions based on current routes. Never infer content-critical media from a pathname side table. Preserve one H1 and page-owned CTAs.           | #91, #92, #93, #98                   |
| `src/components/home/HomeServiceCard.astro`                 | Six homepage cards repeat one image and depend on a dense two-column mobile grid.                                                                                | Feed a proof-safe per-category media model from #98. Preserve the compact card only if each category becomes visually distinct; otherwise use a simpler icon-led service selector until valid media exists.                                       | #98, later homepage polish if scoped |
| `src/components/patterns/ServiceAreaPage.astro`             | The shared shell creates six pages with nearly identical pacing and many repeated sections.                                                                      | Keep one shared implementation, but support a smaller set of meaningful story slots: service-led hero, one city-specific homeowner scenario, concise quote guidance, selective FAQs, nearby areas, and final CTA. Do not fork six page templates. | #93, #95                             |
| `src/components/patterns/CityContextMedia.astro`            | Civic photos are clearly attributed but visually overrepresented.                                                                                                | Formalize media role metadata (`decorative`, `city context`, `process`, `project proof`) and visible captions where ambiguity exists. City context should be secondary and never presented as work proof.                                         | #98, #93                             |
| `src/components/patterns/LinkGrid.astro`                    | Supporting links often become another field of bordered cards.                                                                                                   | Keep cards for primary selectable services. Use compact link rows or pills for related services, nearby cities, and secondary navigation so supporting content does not compete with the page story.                                              | #91, #92, #93                        |
| `src/components/patterns/ProcessSteps.astro`                | No numbering defect exists. The same three-card presentation appears on many pages.                                                                              | Preserve ordered-list semantics and single visible markers. Allow a quieter compact timeline/list treatment only if #91 needs it to reduce card density; do not add decorative icons or duplicate numbering.                                      | #91                                  |
| `src/components/patterns/FAQList.astro`                     | Three service FAQs and six city FAQs become long card stacks on mobile.                                                                                          | First reduce and prioritize copy. If more than four FAQs remain necessary, evaluate an accessible disclosure pattern; do not introduce an accordion solely for decoration.                                                                        | #91, #94, #95                        |
| `src/components/patterns/CTASection.astro`                  | The blue final panel is consistent but repeated identically across hubs, services, and cities.                                                                   | Keep one strong final CTA per page. Add only the minimum composition variants required by real routes and keep action hierarchy consistent: quote first, phone/email second.                                                                      | #91, #96                             |
| `src/components/quote/QuoteForm.astro`                      | Missing Turnstile renders as a large failure-like card with redundant email actions.                                                                             | Treat configured form and email-first fallback as equally intentional states. Remove empty reserved space, lead with the working action, keep privacy and no-booking language clear, and do not alter backend submission behavior.                | #96                                  |
| `src/components/site/MobileStickyCTA.astro`                 | The fixed bar duplicates nearby actions and covers the bottom of the active viewport.                                                                            | Preserve easy access and 44px targets. Evaluate hiding or reducing the bar when a hero/final CTA is already visible, and verify footer/form focus states are never obscured.                                                                      | #96                                  |
| `src/components/ui/Section.astro` and `SectionHeader.astro` | Tokens are consistent, but equal spacing and repeated heading/card blocks flatten hierarchy.                                                                     | Use the existing tone and spacing APIs more intentionally. Add a shared prop only when a real page pattern cannot express needed hierarchy; do not add page-local spacing or color overrides.                                                     | #91                                  |

## Mobile-specific issues and requirements

1. **First-view density:** Service-detail and city heroes use long paragraphs plus
   two full-width actions. Keep the first viewport focused on service/city,
   homeowner outcome, and one primary action. Move secondary caveats lower.
2. **Sticky CTA duplication:** The fixed bar is useful, but it appears while
   equivalent hero CTAs are still visible and while reading card content.
   #96 should test visibility rules, safe-area padding, keyboard focus, and
   proximity to the final CTA/footer.
3. **Long card stacks:** Three service cards, four condition cards, four prep
   items, three process cards, related links, three FAQs, and the CTA produce an
   almost 8,000px service page. City pages are longer. Later work should remove
   redundant modules before reducing spacing.
4. **City hub length:** Six photo cards with captions and attribution make
   `/service-areas` 7,323px tall at 390px. Use a faster city-selection pattern
   and place attribution without making it the dominant visual rhythm.
5. **Breakpoint discontinuity:** The 768px layout uses the mobile menu and
   stacked hero media, while 1024px uses the desktop header and split layouts.
   At 1024 × 768, the services hub’s headline/media can push its page-owned CTA
   below the first viewport. Validate copy measure and hero height at both
   breakpoints, not only at 390 and 1440.
6. **Heading wraps:** Long service and city H1/H2 copy creates three to five
   lines at 390px. Rewrite before reducing font size. Keep type scale and avoid
   arbitrary page-local overrides.
7. **Footer weight:** The full footer is appropriate globally but dominates the
   short `/thank-you` route and adds substantial length to every mobile page.
   Do not create a special footer without a shared product decision; make the
   utility content above it feel complete.
8. **No layout regressions:** Preserve the current absence of horizontal
   overflow, broken images, clipped controls, and inaccessible touch targets.

## Content rewrite priorities

### Priority 0: conversion truth and state clarity

- Rewrite the no-Turnstile quote fallback as an intentional email-first quote
  path without implying the site is broken.
- Ensure `/thank-you` does not claim receipt when reached outside a successful
  submission path.
- Standardize the primary CTA to “Request a quote” unless “free quote” is
  operationally verified for every path.
- Preserve the distinction between requesting a quote and booking, pricing,
  scheduling, or confirmation.

Owner: #96.

### Priority 1: service-page confidence

- Give each service one concise value proposition and a specific homeowner use
  case.
- Consolidate repeated surface-condition, drainage, access, stain, preparation,
  and scope language into fewer sections.
- Remove paragraphs that merely restate a heading or another card.
- Keep limitations precise: pressure washing can help with visible buildup, but
  some stains, coatings, damage, or older discoloration may remain.
- Keep driveway, sidewalk/walkway, and broader concrete positioning distinct.

Owner: #94, implemented with #92 composition.

### Priority 2: city-page differentiation

- Retain one city-specific homeowner scenario and the most useful surface or
  access consideration per city.
- Replace six copies of generic process and scheduling language with one concise
  shared presentation.
- Reduce six FAQs to the questions that genuinely differ or affect a quote.
- Avoid unsupported neighborhood, climate, prevalence, job-history, and local
  expertise claims.
- Keep nearby-city navigation concise and factual.

Owner: #95, implemented with #93 composition.

### Priority 3: hub and homepage refinement

- Clarify how `/services` helps a homeowner choose among the three active
  service pages.
- Make `/service-areas` a fast coverage selector rather than a civic-photo
  gallery.
- Replace generic premium language with concrete-specific benefit language on
  the homepage when #94 reaches shared copy.
- Preserve all active routes and the six-city inventory.

Owners: #92–#95; homepage changes require explicit scope.

## Claim-safety and proof boundaries

### Allowed factual foundation

Later issues may continue to state that CFL Wash Co.:

- serves Central Florida homeowners;
- offers driveway pressure washing, sidewalk and walkway cleaning, and concrete
  cleaning;
- publishes service-area pages for Deltona, Orange City, DeBary, DeLand,
  Sanford, and Lake Mary;
- supports curb-appeal and HOA-notice-related concrete cleaning requests;
- reviews quote details before scheduling;
- uses requesting a quote as the current next step.

### Prohibited additions without verification

Do not add or imply:

- reviews, testimonials, ratings, customer counts, job counts, awards, rankings,
  certifications, or completed-project claims;
- licensing, insurance, bonding, guarantees, same-day service, response times,
  24/7 availability, instant booking, confirmed scheduling, or online payment;
- complete stain removal, “like new” results, no-damage claims, safety for every
  surface, or environmental claims;
- roof cleaning, house washing, sealing, repair, restoration, fleet washing, or
  new services;
- new cities, local offices, city-specific job history, neighborhood expertise,
  or service outside verified operational intent;
- owner/project photos that lack permission and a documented proof record.

### Proof-safe media ladder

Use media in this order of trust, with its role explicit:

1. **Decorative brand artwork:** mood and category support only; never completed
   work proof.
2. **City context:** location only; secondary to the service story and visibly
   attributed where required.
3. **Verified business/process media:** equipment, owner/operator, preparation,
   and in-progress work after ownership and permission are documented.
4. **Verified project proof:** real CFL Wash Co. before/after or result media
   with permission, accurate labels, and no misleading edits.

Issue #98 may define the media system, but it must not activate photo upload or
future project systems before issues #50 and #51 are ready.

## Implementation sequence and dependency gates

1. **#91 — Premium visual language and shared page patterns**
   - Translate these principles into approved pattern behavior.
   - Fix explicit hero-media ownership and establish editorial rhythm options.
   - Preserve current routes, SEO, chrome, tokens, and numbering semantics.
2. **#98 — Premium imagery and proof-safe media system**
   - Define media roles, rights/permission metadata, captions, crops, fallbacks,
     and responsive behavior.
   - Supply service-led and residential context without fabricated proof.
3. **#92 — Service hub and service-detail redesign**
   - Apply #91 and #98 to `/services` and the three service pages.
   - Reduce section/card repetition before #94 rewrites final copy.
4. **#93 — Service-area hub and city-page redesign**
   - Apply #91 and #98 to `/service-areas` and all six city pages.
   - Keep one shared data-driven implementation and all canonical paths.
5. **#94 — Service content rewrite**
   - Rewrite homepage-shared service language, `/services`, and the three
     service pages to the content principles above.
6. **#95 — City and service-area content rewrite**
   - Differentiate each city with supported homeowner value, reduce repetition,
     and preserve six-city SEO facts.
7. **#96 — Quote, CTA, and launch-flow polish**
   - Polish configured form, fallback, thank-you, CTA hierarchy, and mobile
     sticky behavior without changing the frozen backend absent a real defect.
8. **#97 — Final visual, content, SEO, and launch-readiness QA**
   - Re-run the complete route/viewport matrix and verify every principle,
     constraint, tracking attribute, and preserved SEO behavior.

No downstream issue should compensate for an unresolved earlier dependency
with page-local styles, duplicated content, fake proof, or an unapproved service
expansion.

## Visual QA checklist for later PRs

Every later premium-polish PR must reference this checklist and record route
notes for the routes it affects.

### Required route and viewport evidence

- [ ] Render every affected route at 390, 768, 1024, and 1440px.
- [ ] Include screenshots or a contact sheet in PR notes when visual output
      changes.
- [ ] Compare affected interior routes with `/` for type hierarchy, surface
      rhythm, media quality, CTA hierarchy, and overall brand cohesion.
- [ ] Record intentional route-specific deviations.

### First impression and hierarchy

- [ ] Page identity, service/city purpose, and one primary action are clear in
      the first viewport.
- [ ] Exactly one visible H1 exists and long headings wrap intentionally.
- [ ] Hero media has an explicit role, correct crop, intrinsic dimensions, and
      proof-safe alt/caption treatment.
- [ ] At 1024 × 768, headline or media does not unintentionally push the only
      page-owned primary action out of sight.

### Page rhythm and density

- [ ] The route has an intentional opening, supporting sequence, and close.
- [ ] No more than two consecutive sections use the same card-grid treatment.
- [ ] Cards represent selectable or independent content rather than ordinary
      paragraphs.
- [ ] Repeated quote, scope, process, and limitation copy has been removed.
- [ ] The final CTA is decisive and not duplicated by adjacent sections.

### Mobile and accessibility

- [ ] No horizontal scroll, clipping, overlap, unreadable wrapping, or layout
      shift appears at any required viewport.
- [ ] Header navigation opens, closes, supports Escape, and preserves focus.
- [ ] Sticky CTA does not obscure form controls, focused content, final CTA, or
      footer links; safe-area spacing is correct.
- [ ] Touch targets remain at least 44px and keyboard focus is visible.
- [ ] Ordered process lists announce one sequence and display one number per
      step.
- [ ] Heading order, landmarks, link text, and image alternatives remain
      meaningful.

### Media and claim safety

- [ ] Decorative artwork, city context, process media, and project proof are
      distinguishable.
- [ ] No stock, generated, decorative, or civic image is presented as CFL Wash
      Co. completed-work proof.
- [ ] Rights, attribution, permission, and crop documentation are present where
      required.
- [ ] No unsupported review, rating, guarantee, insurance, licensing,
      response-time, booking, project, service, city, or result claim was added.

### Conversion, SEO, and runtime

- [ ] Quote, phone, and email hierarchy matches the route and state.
- [ ] Configured form and fallback states both look intentional and remain
      truthful.
- [ ] `data-cta` and `data-cta-location` attributes are preserved and correct.
- [ ] Canonical paths, metadata, sitemap inclusion, noindex rules, schema, and
      breadcrumbs are unchanged unless explicitly scoped and tested.
- [ ] No framework overlay, relevant console error, broken image, or failed
      target interaction is present.
- [ ] `pnpm check` and `git diff --check` pass; run `pnpm build` and the audit
      scripts whenever generated output or rendering behavior changes.

## Completion standard for the premium pass

The later implementation is successful when the homepage, hubs, service pages,
city pages, quote flow, utility pages, header, footer, and mobile CTA feel like
one brand without becoming one repeated template. The result must be visually
rich, concrete-first, easy to scan, conversion-clear, SEO-stable, and honest
about the proof currently available.

## Issue #92 implementation review

- Review date: June 20, 2026
- Reviewed branch: `feat/premium-service-pages`
- Entry revision: `013016477ef7cd218c134665f2731cc1750942dc`
- Render target: `http://127.0.0.1:4321`
- Browser: headless Google Chrome `149.0.7827.156` through the Chrome DevTools
  Protocol

### Implemented composition

Issue #92 carries the global interior-page improvements from issue #91 into
the services hub and the three canonical service-detail routes. The shared
split hero now uses the homepage's large, restrained type hierarchy, semantic
layout gap, centered desktop composition, and token-driven section spacing.
The `min-w-0` boundaries on the split grid, copy, and media children remove the
intrinsic-width expansion that previously clipped 390px rendering.

The `/services` hub now uses the editorial `ServiceMenu`: three bounded service
rows pair registered service illustration media with a concise service fit,
summary, and route link. Supporting service-selection guidance uses dividers
instead of another card grid. Each service route now delegates to the shared
`ServiceDetailPage`, which owns the explicit service illustration, hero and
final actions, scope list, guidance/preparation split, process, supporting
links, FAQ, and close. This keeps the routes data-driven without presenting
them as three undifferentiated card templates.

The media is deliberately proof-safe. Every service illustration is registered
as `data-media-role="service-illustration"` and
`data-proof-status="not-proof"`, uses its documented responsive sources and
intrinsic dimensions, and carries the visible caption “Illustrative service
image. Not completed project photography.” No proof asset was changed.

### Rendered QA method

The in-app Browser was retried before this review and failed exactly with
`Browser is not available: iab`. Project Playwright is not installed, so the
explicitly approved fallback used the installed headless Google Chrome and the
Chrome DevTools Protocol with a temporary browser profile. The fallback
collected computed DOM/CSS geometry, console and runtime events, network
failures, interaction state, and PNG screenshots. The browser profile, harness,
results, and screenshots remained under `/tmp`; no QA artifact was added to the
repository.

The matrix used these CSS viewports:

- `390 × 844`
- `430 × 932`
- `768 × 1024`
- `1024 × 768`
- `1440 × 900`

The 1440px homepage first viewport was captured and inspected as the accepted
visual reference. Every issue #92 route received a viewport screenshot at all
five sizes. Each route also received a full-page capture at 390px and 1440px.
Representative hub and detail screenshots were inspected at original size and
as full-page compositions.

### Route and viewport notes

| Route                        | 390px                                                                                                                              | 430px                                                                                                          | 768px                                                                                                                   | 1024px                                                                                                                              | 1440px                                                                                                                                                       |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `/services`                  | Hero copy, both actions, and media form a clean single column; the service menu becomes three readable editorial rows.             | The same stack gains a wider copy measure without an awkward action or heading wrap.                           | Hero and menu remain stacked, preserving useful illustration scale and quiet section separation.                        | Hero and service rows become two-column compositions; the hero quote action remains in the first viewport.                          | The split hero, generous gutters, three editorial rows, soft selection guidance, compact area link, and elevated close form a deliberate long-page rhythm.   |
| `/driveway-pressure-washing` | One H1, quote and configured call actions, and the driveway illustration appear in that order with no clipping.                    | The wider mobile measure reduces heading and paragraph wrapping while preserving the same action hierarchy.    | The hero stays stacked; scope and guidance lists use the available width without premature columns.                     | Hero media moves beside the copy, scope becomes two columns, and the first-view quote action stays visible.                         | The driveway-specific crop anchors the split hero; water, warm, soft, and inverse sections separate the service story without repeated card grids.           |
| `/sidewalk-walkway-cleaning` | The longer H1 wraps intentionally, both 52px actions remain reachable before media, and the path image retains its useful subject. | The 430px measure shortens the heading while keeping the quote and call pair comfortably separated from media. | Stacked composition avoids a squeezed walkway crop and keeps the process and supporting links scan-friendly.            | The split hero and wider content treatments activate without overflow; caption and proof status remain explicit.                    | The service-specific walkway framing, divided scope, guidance/preparation split, warm links, FAQ, and inverse close remain visually distinct and consistent. |
| `/concrete-cleaning`         | The four-surface H1, copy, actions, and concrete illustration remain contained in the mobile gutter.                               | Copy gains breathing room with no orphaned CTA or clipped media edge.                                          | The broad-service hero remains stacked and the subsequent taxonomy reads as lists rather than a dense catalog of cards. | Split hero composition activates; quote and call remain visible before the first scroll and the caption sits safely below the crop. | The broader patio/pad/curb positioning is visually clear while retaining the same shared pattern, palette, and conversion close as the specific routes.      |

Across all 20 route/viewport combinations:

- `scrollWidth` equaled `clientWidth`; horizontal overflow was `0px`;
- exactly one visible H1 rendered, with the route-specific visible text;
- every image completed with positive natural width and height;
- no relevant console warning/error, runtime exception, failed resource load,
  framework error overlay, or page error appeared;
- the hero quote and configured call actions were present and visible; at 390px
  and 430px both actions preceded the media and met the 44px touch-target floor;
- proof-safe media attributes, captions, responsive sources, crops, and
  intrinsic dimensions remained intact;
- 390px, 430px, and 768px used stacked hero composition, while 1024px and
  1440px used the intended split composition;
- the mobile sticky CTA started hidden, `aria-hidden`, and inert while the hero
  quote action was visible, then became visible after scrolling beyond it; its
  bottom edge and both horizontal edges remained within the viewport with no
  overflow.

The interaction path also passed at 390px:

1. `/services` → “View Driveway Pressure Washing” navigated to
   `/driveway-pressure-washing`.
2. The selected route rendered its expected title and H1.
3. A hero call link was read without activation and matched the configured
   `tel:+14074310856` exactly.
4. The hero “Request a Quote” link navigated to `/request-quote`, whose visible
   H1 was “Request a quote for your cleaning project.”

### Homepage fidelity ledger

| Fidelity point         | Rendered comparison and disposition                                                                                                                                                                                                                                                                                   |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Typography             | Shared Manrope type tokens, compact uppercase eyebrows, large sentence-case H1s, muted lead copy, and smaller supporting type preserve the homepage hierarchy. Long service names wrap intentionally at 390px and remain balanced at desktop.                                                                         |
| Palette                | Navy chrome and closing panels, white and warm/cream surfaces, water-tinted guidance, blue actions, and restrained gold accents stay within the accepted homepage palette. The interior hero's shared blue primary button is an intentional pattern variant; quote remains the first and strongest page-owned action. |
| Container and gutters  | Shared `Container`, section-space tokens, and `--layout-gap` align hero and body content with the homepage. The previous 390px split-hero width mismatch is resolved by the shared minimum-width resets; all measured overflow deltas are zero.                                                                       |
| Section surface rhythm | The hub moves from soft hero to white editorial menu, soft guidance, compact white area link, elevated CTA, and navy footer. Detail routes alternate soft, white, water, white, warm, soft, and inverse surfaces, echoing the homepage's banded rhythm without copying its marketing composition.                     |
| Media framing          | Rounded token-driven frames, quiet media shadows, consistent captions, deliberate portrait desktop crops, and wider stacked crops match the homepage's polished image treatment while making the non-proof role more explicit.                                                                                        |
| CTA hierarchy          | Hero quote is primary, configured phone is secondary, and each route closes with one decisive quote-first inverse panel. The mobile sticky CTA yields to the visible hero action and returns only after scroll, avoiding first-view competition.                                                                      |
| Responsive collapse    | The 390px and 430px layouts stack copy, actions, and media; 768px deliberately retains that stack; 1024px and 1440px use split heroes and wider editorial structures. No breakpoint creates a squeezed intermediate composition.                                                                                      |

### Material mismatches resolved

The review specifically rechecked the material issues that motivated this
implementation:

- the severe pre-change 390px split-hero clipping is gone;
- service-detail hero media is explicit in built output instead of disappearing
  behind pathname inference;
- the services hub no longer returns to three generic service cards;
- service-detail scope and guidance use quieter lists and one purposeful split
  rather than a run of equal-weight card grids;
- service illustrations, captions, and data attributes cannot be mistaken for
  completed-project proof;
- mobile quote access is immediate without a competing sticky bar over the
  first view.

No additional fixable visual inconsistency, broken state, overflow, clipping,
awkward gap, image failure, sticky overlap, or first-view CTA failure remained
after the rendered review, so Task 4 required no component or token repair.

### Deferred follow-up

The full issue #94 service-copy rewrite remains intentionally deferred. Issue
#92 preserves the current factual copy while giving it the approved hierarchy
and composition; this review does not pre-empt #94 with piecemeal page-local
rewrites. The remaining long mobile reading length is content-led rather than a
layout defect and should be reconsidered only as part of that coordinated copy
pass.

## Issue #94 implementation review

- Review date: June 20, 2026
- Reviewed branch: `content/premium-service-copy`
- Entry revision: `44a211c`
- Render target: `http://127.0.0.1:4321`
- Browser: headless Google Chrome `149.0.7827.156` through the Chrome DevTools
  Protocol

### Structure-preserving copy strategy

Issue #94 rewrites the existing homepage, service hub, and three service-detail
content slots without changing the composition delivered by issue #92. No new
component, content field, section, page-local style, CTA treatment, or layout
variant was added. The `ServiceMenu`, `ServiceDetailPage`, section sequence,
responsive behavior, media records, proof captions, canonical routes,
breadcrumbs, CTA destinations, and tracking attributes remain in place.

The public voice now leads with the homeowner's concrete surface and visible
concern. Conditions and limitations are concentrated in each detail page's
existing guidance section and relevant FAQ instead of being repeated through
the hero, lists, process, and final CTA. The centralized visitor copy in
`serviceDetailPages.ts` no longer uses `scope`, `appropriate`, or `review`;
`scope` remains only as the internal typed content key required by the shared
page component.

### Before and after positioning

| Route                        | Before                                                                                               | After                                                                                                                                               |
| ---------------------------- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`                          | Broad exterior-cleaning language, process-heavy trust labels, and a generic confidence statement.    | Driveway and residential concrete cleaning lead the hero; trust labels describe local coverage, service focus, quote simplicity, and visit clarity. |
| `/services`                  | The correct inventory was presented through internal vocabulary about active scope, review, and fit. | The hub is a direct chooser: start with the main surface, add connected concrete, and flag specialty finishes.                                      |
| `/driveway-pressure-washing` | Surface conditions and quote mechanics competed with the front-approach benefit throughout the page. | The front approach and curb appeal lead; condition, water flow, access, and set-in staining sit in one focused guidance section.                    |
| `/sidewalk-walkway-cleaning` | Repeated quote and condition language weakened the useful distinction between walking-surface types. | The route from street to door leads; panels, paths, nearby edges, access, and older marks are explained once and in homeowner language.             |
| `/concrete-cleaning`         | A long taxonomy of appropriate surfaces and exclusions made the broad service feel procedural.       | The page is the clear third choice for patios, pads, aprons, curbs, entries, and other residential concrete beyond the driveway or primary walkway. |

### Metadata changes

The homepage title changed from broad pressure washing to `Concrete Pressure
Washing in Central Florida | CFL Wash Co.` and its description now names the
four core concrete-cleaning categories before the quote action. The service-hub
description now frames the page as a comparison among the three active
services. Each service-detail description was tightened around its distinct
surface, Central Florida coverage, and quote action. Existing service-detail
titles, canonical paths, breadcrumbs, structured data, and sitemap inclusion
were preserved.

### Rendered QA method

The in-app Browser was available in the session but failed during the required
bootstrap with `Browser is not available: iab`. The project has no Playwright
command installed. The documented fallback used installed headless Google
Chrome through the Chrome DevTools Protocol with temporary profiles and scripts
under `/tmp`; no browser dependency, screenshot, result file, or harness was
added to the repository.

The rendered matrix covered all five routes at:

- `390 × 844`
- `430 × 932`
- `768 × 1024`
- `1024 × 768`
- `1440 × 900`

Fresh first-viewport screenshots at 390px, 1024px, and 1440px were inspected at
original size. A separate scroll pass exercised lazy media and the final CTA
area before measuring image completion and sticky-CTA overlap.

### Route and viewport notes

| Route                        | 390px                                                                                                                       | 430px                                                                                            | 768px                                                                                   | 1024px                                                                                                              | 1440px                                                                                                                |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `/`                          | The three-line concrete-first H1, concise lead, quote/call pair, and service mosaic fit the first view without competition. | The same centered composition gains a wider lead measure while retaining the early quote action. | The mobile composition remains balanced and all four short benefit labels scan cleanly. | The split hero keeps the quote action visible; the new H1 remains a deliberate three-line block.                    | Copy and mosaic carry balanced visual weight, with the concrete offer clearer than the prior broad exterior wording.  |
| `/services`                  | The service-choice H1 wraps cleanly to three lines, with both hero actions visible before the media.                        | The lead shortens naturally with no isolated word or button wrap.                                | The stacked hero remains easy to scan and keeps the primary action high.                | The split hero activates with a visible quote action and unchanged service illustration treatment.                  | The chooser copy fits the established premium split hero and leads naturally into the three editorial service rows.   |
| `/driveway-pressure-washing` | The front-approach H1 forms a compact three-line block; quote and call remain visible before the illustration.              | Wider measure reduces body wrapping without weakening the H1.                                    | The stacked hero holds its intended copy/media order.                                   | The four-line split-hero H1 reads as an intentional editorial block; both actions remain fully visible.             | The shorter, benefit-led narrative balances the driveway image and preserves the premium page rhythm.                 |
| `/sidewalk-walkway-cleaning` | The longest H1 uses four balanced lines and keeps both actions in the first viewport.                                       | The H1 settles to three lines and the lead remains readable.                                     | The stacked layout reduces the H1 to two lines without crowding the media.              | The four-line split treatment is intentional, with no orphan, clipping, or loss of the proof caption.               | The path-to-door story and illustration form a cohesive service identity distinct from driveway cleaning.             |
| `/concrete-cleaning`         | The broader service H1 uses three balanced lines; the CTA pair and top of the service illustration remain visible.          | The final CTA line and body copy gain breathing room without extending the first view.           | The stacked hero reduces the H1 to two lines and keeps the service selector clear.      | The four-line split headline and concrete image remain balanced, with the primary action above the viewport bottom. | The beyond-the-driveway positioning is immediately distinct while using the same approved service-detail composition. |

Across all 25 route/viewport combinations:

- document width never exceeded viewport width;
- exactly one H1 rendered on every route and all heading containers retained
  their full text width without clipping;
- the first page-owned quote action remained visible in the initial viewport;
- every lazy and eager image completed with positive natural dimensions after
  the scroll pass;
- all media elements retained `data-media-role` and `data-proof-status` values,
  and the visible illustrative-image captions remained unchanged;
- no framework overlay, relevant console warning/error, runtime exception,
  failed request, final-CTA/sticky-CTA overlap, or broken target appeared.

The 390px interaction path also passed:

1. `/services` → `Driveway Pressure Washing` navigated to
   `/driveway-pressure-washing`.
2. The service page rendered its new H1 and unchanged hero quote action.
3. `Request a Quote` navigated to `/request-quote`, whose title remained
   `Request a Cleaning Quote | CFL Wash Co.`.

### Claim safety and deferred work

The rewrite adds no review, rating, guarantee, insurance, licensing, ranking,
response-time, same-day, completed-project, price, booking, payment, or new
service/city claim. Stain language is explicitly qualified: surface buildup can
improve, while oil, rust, irrigation marks, wear, and deeper discoloration may
remain. Pavers, coatings, paint, exposed aggregate, and other specialty
finishes require confirmation rather than being presented as active service
promises. Concrete repair, resurfacing, restoration, and sealing remain
explicitly excluded.

All service imagery remains registered `service-illustration` media with
`not-proof` status and the existing visible disclosure. Issues #50 and #51
remain deferred. Issue #77 remains open until the coordinated #93 and #95 work
is complete.

## Issue #93 implementation review

- Review date: June 20, 2026
- Reviewed branch: `feat/premium-city-pages`
- Entry revision: `42dad27288b9567d99472eb4041cb4d61e1947f7`
- Render target: built preview at `http://127.0.0.1:4322`
- Browser: headless Google Chrome `149.0.7827.156` through the Chrome DevTools
  Protocol

### Implemented coverage composition

The service-area hub is now a coverage chooser rather than a city-card catalog.
Its registered residential artwork moved into the split hero, quote and call
actions remain first-view controls, the six approved city routes render as one
open semantic menu, the three active services use compact divided navigation,
and the route closes with one inverse CTA. Civic photography does not appear on
the hub.

All six city routes continue to delegate to one `ServiceAreaPage`. Each typed
city record now owns explicit proof-safe hero media: driveway illustration for
Deltona and DeBary, walkway illustration for Orange City and DeLand, and
concrete illustration for Sanford and Lake Mary. The mapping reflects existing
homeowner scenarios only; every image remains `service-illustration`,
`not-proof`, and visibly labeled as not completed-project photography.

City pages use an open service selector, a water-tinted editorial scenario
composition, compact local context, warm quote process, separate soft FAQ band,
compact nearby-area links, and one inverse close. Licensed civic photography is
now a small `City context only` callout. At 390px its displayed image width is
104px on every route; the factual alt text, responsive sources, intrinsic
dimensions, `city-context` / `context-only` metadata, caption, and attribution
remain intact.

### Rendered QA method

The in-app Browser skill was loaded first, but runtime setup returned
`Browser is not available: iab`. The established fallback used installed
headless Chrome through the DevTools Protocol. A temporary harness, browser
profile, JSON metrics, and screenshots remained under `/tmp`; no QA dependency
or artifact was added to the repository.

The final pass ran against built output, not the dev server. It covered all
seven affected routes at:

- `390 × 844`
- `430 × 932`
- `768 × 1024`
- `1024 × 768`
- `1440 × 900`

Each route was opened fresh, fonts were awaited, the first viewport was
captured, the full document was scrolled in increments to trigger lazy media,
and the final state was measured. Full-page captures were also produced at
390px and 1440px. Native-width comparison captures used the 985px hub concept
and 864px city concept dimensions.

### Route and viewport notes

| Route                        | 390px and 430px                                                                                                                      | 768px                                                                                    | 1024px                                                                                                      | 1440px                                                                                                                |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `/service-areas`             | Quote/call precede the residential artwork; six city rows form one fast single-column chooser; final mobile height is 4,891/4,815px. | Hero and chooser remain stacked with comfortable gutters and open service navigation.    | Split hero activates with both actions visible; the city chooser begins in the first viewport continuation. | Balanced split hero, two-column open city menu, compact service band, and inverse close read as one coverage journey. |
| `/service-areas/deltona`     | Driveway-led hero, both actions, disclosure, and service-fit rail remain clear; civic image is a 104px context thumbnail.            | Stacked service media and open sections retain readable measures without dense cards.    | Split hero and three-part fit rail render without clipping; quote remains first-view.                       | Driveway scenario leads; local context is compact; warm process and soft FAQ bands are visually distinct.             |
| `/service-areas/orange-city` | Walkway-led hero differentiates the page without implying city work; long city name wraps intentionally with both actions visible.   | Existing compact-entry and shade scenarios remain readable in the shared composition.    | Hero, service selector, and proof caption fit the established interior-page rhythm.                         | Walkway media and page-owned scenarios create distinction while civic photography remains secondary.                  |
| `/service-areas/debary`      | Driveway-led hero and cleaner-front-approach copy fit without overflow; context thumbnail and attribution remain legible.            | Wooded/shaded conditions remain page-owned while layout stays consistent with the set.   | Split media and call-to-action pair remain visible and aligned.                                             | Scenario hierarchy promotes the existing shaded-buildup angle without a bespoke template.                             |
| `/service-areas/deland`      | Walkway-led hero, actions, and disclosure remain above the service-fit rail; no crowded city navigation appears.                     | Mixed-age surface guidance reads as content rather than another card field.              | The longer local material remains contained with no first-view CTA loss.                                    | Civic theatre imagery is reduced to the same small attributed context role as every other city.                       |
| `/service-areas/sanford`     | Concrete-led hero distinguishes the broader mixed-material use case; actions and H1 stay fully visible.                              | Open navigation and scenario rows avoid repeating card-grid cadence.                     | Split hero and fit rail remain balanced without image or heading clipping.                                  | The mixed-material/access story leads the body; Sanford City Hall remains a context-only thumbnail.                   |
| `/service-areas/lake-mary`   | Concrete-led hero, quote/call pair, and planned-community copy remain readable; the civic sign is visually subordinate.              | Gate, parking, and specialty-surface material remains available without layout crowding. | Split hero, media disclosure, and three fit statements stay within the first-view composition.              | Existing HOA/access distinctions are easier to locate while the shared layout remains cohesive.                       |

Across all 35 route/viewport combinations:

- document width equaled viewport width with `0px` horizontal overflow;
- exactly one visible H1 rendered with the expected route-specific text;
- the hero quote action was visible and fully inside the first viewport;
- every eager and lazy image completed with positive natural dimensions;
- city pages rendered exactly one expected service illustration and one unique
  city-context asset with their registered role and proof status;
- no framework error overlay, relevant console warning/error, runtime
  exception, failed resource, or page error appeared;
- the 104px mobile civic thumbnail stayed materially smaller than the
  service-led hero media;
- the mobile sticky action remained viewport-contained and did not cover the
  measured final action when the final state was checked.

The 390px interaction path also passed:

1. `/service-areas` → Deltona city-menu link navigated to
   `/service-areas/deltona`.
2. The city route rendered `Pressure washing in Deltona, FL` and the registered
   driveway illustration.
3. The hero `Request a Quote` action navigated to `/request-quote`, whose H1
   remained `Request a quote for your cleaning project.`

### Concept fidelity ledger

| Fidelity point         | Concept and render comparison                                                                                                                                                                                                   |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| First-view hierarchy   | Both hub and city renders preserve the concept's service/location H1, restrained lead, quote-first action pair, single framed media moment, and visible next-section continuation.                                              |
| Typography and palette | Shared Manrope, navy headings, water-blue actions, gold global CTA, soft hero surface, white editorial areas, water scenario band, warm process, and inverse close match the approved homepage-derived system.                  |
| Container model        | The implementation uses open divided city/service/scenario rows rather than the prior card catalog or mockup-invented component families.                                                                                       |
| Media treatment        | Hub artwork and service illustrations keep stable crops, restrained media elevation, intrinsic sizing, responsive sources, and visible proof captions. Civic photography is a small attributed factual inset.                   |
| Responsive behavior    | The accepted system keeps stacked heroes below 1024px and split heroes at 1024px and above. The generated concepts used desktop splits at 985px/864px; retaining the established breakpoint is an intentional consistency rule. |
| Copy and claims        | Public copy remains the current verified repository copy. Mockup-invented results, hours, pricing, phone numbers, extra cities, accordion behavior, and service claims were not implemented.                                    |
| Section rhythm         | The render follows soft hero → white services → water scenarios → compact white local context → warm process → soft FAQ → white nearby links → inverse CTA, matching the intended editorial cadence without one-off styling.    |

The image review identified and fixed one material mismatch before the final
pass: the process and FAQ sections initially shared the warm surface, creating
one long beige block. The final implementation locks warm process and separate
soft FAQ surfaces in the production audit. Local context was also tightened to
the compact shared spacing. No remaining fixable hierarchy, palette, media,
container, responsive, or CTA mismatch was found after the built-preview
review.

### Claim safety and deferred work

Issue #93 adds no reviews, testimonials, ratings, guarantees, insurance or
licensing claims, rankings, response-time or same-day claims, completed-project
claims, fixed pricing, booking/payment claims, new services, new cities, or
city-specific work history. It changes no quote backend behavior, canonical
path, metadata, breadcrumb, schema, sitemap/indexability rule, or tracked city
CTA location.

The full city and service-area copy rewrite remains deferred to #95. Current
city-specific text and six FAQ sets stay in place even where later editing can
reduce page length or procedural wording. This implementation resolves the
design/layout side of #77 by centralizing the premium composition, replacing
the civic-led hierarchy, reducing hub/card density, and clarifying mobile
conversion paths. Issue #77 should remain open until #95 proves the remaining
content and usefulness requirements.

## Issue #95 implementation review

- Review date: June 21, 2026
- Reviewed branch: `content/premium-city-copy`
- Entry revision: `7465a841c17af1a42749d16362c3d05f20d19cd9`
- Render target: built preview at `http://127.0.0.1:4322`
- Browser: headless Google Chrome `149.0.7827.156` through the Chrome DevTools
  Protocol

### Structure-preserving content strategy

Issue #95 keeps the complete issue #93 layout and media system. The hub remains
the same split hero, six-city menu, active-service navigation, and inverse
close. Every city still delegates to `ServiceAreaPage` and retains the same
soft hero, service selector, water scenario band, compact local context, warm
quote process, soft FAQ section, nearby links, and inverse CTA. No component
field, section, route, CTA destination, tracking location, or visual variant
was added.

The copy now answers the homeowner's buying questions directly. The shared
service-fit strip names the concrete surfaces that can be requested, explains
that a few useful photos are enough to start, and distinguishes a quote request
from scheduling. Scenario headings explain when cleaning makes sense. The
quote checklist asks for the address, surface list, wide and close photos,
access or finish details, and any HOA notice. Each city keeps four selective
FAQs instead of six.

### Hub and city positioning

The service-area hub now uses a shorter concrete-cleaning promise, tells the
visitor to choose the property city, and explains what each city page provides.
Its outside-coverage close asks for the address, surfaces, photos, and any HOA
notice without using `scope`, `review`, or scheduling-policy language.

| Route                        | Homeowner-first distinction                                                                                                  |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `/service-areas/deltona`     | Dark driveways, the connected driveway/front-walk approach, sidewalk panels, and HOA-notice cleanup.                         |
| `/service-areas/orange-city` | Compact entries, shaded walks, driveway refresh, and preparation for listing photos, showings, hosting, or moving day.       |
| `/service-areas/debary`      | Tree-cover buildup, connected driveway and walk requests, and shared-drive, gate, or narrow-path access.                     |
| `/service-areas/deland`      | Older and newer concrete at one property, realistic age/wear expectations, entry routes, and listing or event preparation.   |
| `/service-areas/sanford`     | Concrete beside brick, pavers, paint, or curbs, plus alley, curbside, gate, drain, and parked-vehicle access.                |
| `/service-areas/lake-mary`   | Gate instructions, shared parking, townhome entries, HOA notices, and sealed, decorative, or paver-adjacent surface details. |

The six content records are 12–18% shorter by source word count than their
issue #93 versions. Public copy removes the prior Graves Avenue, Rhode Island
Avenue, DeBary Main Street, SunRail, downtown historic district, school-link
sidewalk, Georgetown, Park Avenue corridor, Rinehart Road, and Soldiers Creek
references. Civic captions remain unchanged because they identify licensed
context-only media rather than selling the service.

### Rendered QA method and results

The in-app Browser bootstrap returned `Browser is not available: iab`.
Project Playwright is not installed, so the established issue #93 fallback used
installed headless Chrome through the DevTools Protocol. All temporary scripts,
profiles, screenshots, and JSON results remained under `/tmp`; no browser
dependency or QA artifact was added to the repository.

The built-output matrix covered all seven affected routes at:

- `390 × 844`
- `430 × 932`
- `768 × 1024`
- `1024 × 768`
- `1440 × 900`

Across all 35 route/viewport combinations:

- document width matched viewport width with no horizontal overflow;
- each route rendered one expected H1 with no clipped or orphaned H1/H2 line;
- hero quote and configured call actions were visible in the initial viewport;
- the service-area hub and all city pages retained the issue #93 composition;
- every image loaded with positive natural dimensions;
- every city retained one expected service illustration, its visible
  not-completed-project disclosure, and one compact attributed city-context
  callout;
- the final quote action remained visible and the mobile sticky CTA stayed
  contained without overlapping it;
- no framework overlay, relevant console warning/error, runtime exception,
  failed request, or page error appeared.

The 390px interaction path also passed:

1. `/service-areas` → Deltona opened `/service-areas/deltona` with the expected
   city H1.
2. The Deltona hero `Request a Quote` action opened `/request-quote`.
3. The destination retained `Request a quote for your cleaning project.` as
   its H1 and `Request a Cleaning Quote | CFL Wash Co.` as its title.

### Claim safety and relationship to #77

Issue #95 adds no reviews, ratings, testimonials, guarantees, insurance or
licensing claims, rankings, response-time or same-day claims, completed-job or
city-work-history claims, fixed pricing, booking/payment claims, new services,
new cities, or service-area expansion. It preserves the six titles, canonical
paths, breadcrumbs, schema, sitemap/indexability rules, CTA tracking, proof
statuses, image captions, and attribution.

After issue #95 merges, issue #77 can close as completed. Issue #93 resolved
its shared layout, civic-image hierarchy, card density, mobile rhythm, and CTA
requirements; issue #95 now resolves the remaining homeowner usefulness,
length, repetition, local differentiation, FAQ, and civic-document copy
requirements. Issues #50 and #51 remain deferred.
