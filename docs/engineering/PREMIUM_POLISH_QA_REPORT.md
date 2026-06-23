# Premium Polish Final QA Report

- Issue: #97
- Parent epic: #89
- Audit date: June 21, 2026
- Source: `dev` at `229137e` after PR #112
- Audit branch: `qa/premium-polish-final-audit`
- Recommendation: **Needs one launch-readiness fix before #89 closes**

## Executive decision

The current local production build meets the premium-polish standard for visual
cohesion, responsive behavior, homeowner-first content, claim safety,
proof-safe media, quote-path clarity, accessibility basics, and technical SEO.
The homepage, service system, city system, quote flow, thank-you page, privacy
page, header, footer, and mobile CTA now read as one site. Issue #77 is ready to
close as completed.

Epic #89 is **not ready to close** because the latest Cloudflare `dev` preview
cannot be reviewed. Wrangler lists commit `229137e`, but its commit preview and
the `dev` alias return HTTP 404. The working `preview-dev` alias is still on
`7465a84`, before PRs #111 and #112. Follow-up issue #113 tracks this blocker.

No production deployment or Cloudflare account/configuration change was made
during this audit.

## Method and environment

The audit used:

- Astro production output served locally from `dist/`.
- The in-app Browser for the full 15-route responsive DOM/runtime matrix.
- Google Chrome `149.0.7827.156` through the Chrome DevTools Protocol for
  screenshots, deep mobile scrolling, fixed CTA inspection, network failures,
  and representative interactions.
- Repository audits for route inventory, metadata, canonicals, sitemap,
  robots, schema, breadcrumbs, proof metadata, CTA policy, and theme drift.
- Wrangler and direct HTTP requests for read-only Cloudflare preview checks.

The in-app Browser completed navigation, DOM, console, viewport, and interaction
checks. Its screenshot and scroll controls did not move/capture the local page
reliably, so the explicitly permitted Chrome/CDP fallback supplied that
evidence. Temporary screenshots, profiles, and harness files stayed under
`/tmp`; no QA artifacts were committed.

## Automated validation

| Check                 | Result | Notes                                                                       |
| --------------------- | ------ | --------------------------------------------------------------------------- |
| `pnpm check`          | Pass   | Formatting, ESLint, build, pattern audit, and site audit passed.            |
| `pnpm build`          | Pass   | 16 pages built: 15 public routes plus the noindex dev media fixture.        |
| `pnpm audit:patterns` | Pass   | Shared theme and semantic quote CTA policy remain enforced.                 |
| `pnpm audit:site`     | Pass   | Route, SEO, content, media, tracking, and new breadcrumb assertions passed. |
| `git diff --check`    | Pass   | No whitespace errors.                                                       |

## Rendered route and viewport matrix

Every route below was reviewed at 390, 430, 768, 1024, and 1440 CSS pixels.
The 430px pass emphasized homepage hero and mobile CTA behavior.

| Route                        | 390 / 430 | 768  | 1024 | 1440 | Route note                                                                                        |
| ---------------------------- | --------- | ---- | ---- | ---- | ------------------------------------------------------------------------------------------------- |
| `/`                          | Pass      | Pass | Pass | Pass | Balanced mobile hero, early quote action, integrated proof-safe art, and cohesive section rhythm. |
| `/services`                  | Pass      | Pass | Pass | Pass | Curated service chooser remains open and editorial rather than card-dense.                        |
| `/driveway-pressure-washing` | Pass      | Pass | Pass | Pass | Specific front-approach story, clear action pair, and service illustration disclosure.            |
| `/sidewalk-walkway-cleaning` | Pass      | Pass | Pass | Pass | Long heading wraps intentionally and the path-to-door positioning remains distinct.               |
| `/concrete-cleaning`         | Pass      | Pass | Pass | Pass | Broader concrete category stays distinct without expanding service scope.                         |
| `/service-areas`             | Pass      | Pass | Pass | Pass | Six-city chooser is fast to scan and no longer civic-image led.                                   |
| `/service-areas/deltona`     | Pass      | Pass | Pass | Pass | Driveway/HOA scenario is clear; civic media remains secondary context.                            |
| `/service-areas/orange-city` | Pass      | Pass | Pass | Pass | Compact-entry and shaded-walk copy is distinct and homeowner useful.                              |
| `/service-areas/debary`      | Pass      | Pass | Pass | Pass | Tree-cover and access guidance remains practical and concise.                                     |
| `/service-areas/deland`      | Pass      | Pass | Pass | Pass | Mixed-age concrete expectations are clear and claim-safe.                                         |
| `/service-areas/sanford`     | Pass      | Pass | Pass | Pass | Mixed-material and access guidance differentiates the route.                                      |
| `/service-areas/lake-mary`   | Pass      | Pass | Pass | Pass | Gate, parking, townhome, and finish guidance remains specific.                                    |
| `/request-quote`             | Pass      | Pass | Pass | Pass | Fallback state is usable locally; configured Turnstile state awaits #113.                         |
| `/thank-you`                 | Pass      | Pass | Pass | Pass | Direct visits do not overclaim receipt, booking, or response timing.                              |
| `/privacy`                   | Pass      | Pass | Pass | Pass | Quiet utility layout remains visually aligned with the rest of the site.                          |

Across the 75 route/viewport combinations:

- exactly one visible H1 rendered per route;
- no horizontal overflow or framework overlay appeared;
- no relevant console or page error appeared;
- no visible image or requested resource failed;
- quote CTAs retained `/request-quote` targets and tracking attributes;
- headings remained unclipped with intentional mobile wrapping;
- header, footer, page CTA, and mobile CTA treatments stayed visually unified;
- service and city illustrations remained visibly disclosed as non-project
  media.

Representative 390px interactions from the homepage, a service page, and a city
page reached `/request-quote` with the expected title and H1. The mobile menu
opened, closed with Escape, and restored focus to its trigger. The sticky CTA
started hidden while the first page-owned action was visible, appeared during
mobile scrolling, stayed within the viewport, and yielded near final CTA/footer
stop regions. It is intentionally absent on `/thank-you` and `/privacy`.

## Design and accessibility QA

Result: **Pass locally.**

- Homepage and interior routes use the same navy, cream, water, white, blue,
  and restrained gold system without reviving an older theme.
- Split heroes at 1024/1440 and stacked heroes below 1024 preserve useful copy
  measures and media crops.
- Section rhythm is controlled; hubs, detail pages, and city pages no longer
  read as repeated bordered-card stacks.
- Primary quote actions remain clear on light and inverse surfaces. Persistent
  chrome uses the approved accent treatment from #110.
- Heading order, labels, landmarks, alt text, captions, minimum-height primary
  controls, focus tokens, and mobile menu keyboard behavior are intact.
- Breadcrumb current-page semantics were corrected during this audit. Service
  routes now render `Home > Services > current service` in both UI and JSON-LD.

This was a focused launch QA pass, not a formal WCAG conformance audit. No aXe
or assistive-technology certification is claimed.

## Content and claim-safety QA

Result: **Pass.**

- Copy is practical, concrete-first, and written for homeowners.
- The service pages have distinct reasons to request rather than generic SEO
  positioning.
- City pages answer coverage, surface, homeowner-scenario, quote-input, and
  contact questions without civic-research filler or unsupported job history.
- The quote path consistently distinguishes a request from pricing, booking,
  payment, or confirmed scheduling.
- Public internal language such as “focused launch scope” and “current launch
  services” was removed during this audit and added to the site audit guardrail.

No public copy implies reviews, testimonials, ratings, guarantees, licensing,
insurance, rankings, same-day service, response-time promises, completed jobs,
before/after proof, fixed prices, online booking, online payment, automated
pricing, new cities, new services, roof/soft-wash expansion, or city-specific
completed work.

## Media and proof-safety QA

Result: **Pass.**

- No active asset is classified as verified project proof.
- Service media remains `service-illustration` / `not-proof` with visible
  “Not completed project photography” disclosure.
- City photography remains `city-context` / `context-only`, visibly labeled,
  factually captioned, and attributed where required.
- Responsive sources and intrinsic dimensions remain present; no visible asset
  failed in rendered checks.
- `docs/design/IMAGE_AUDIT.md` was corrected to match the current city hero
  implementation.
- Real project publishing remains deferred to #51.

## SEO and technical QA

Result: **Pass locally; Cloudflare preview blocked.**

- All 15 local public routes return 200.
- All 14 indexable routes have unique, accurate titles and descriptions,
  self-referencing `https://cflwash.com` canonicals, and sitemap inclusion.
- `/thank-you` remains `noindex, follow` and excluded from the sitemap.
- `/dev/city-context-images` remains noindex and sitemap-excluded.
- `robots.txt` references the generated sitemap and keeps the documented
  crawler posture.
- City and service inventories match the approved three services and six
  cities.
- Breadcrumb UI and BreadcrumbList schema are intact. The three service routes
  now include the missing `/services` intermediate level.
- Organization schema uses verified identity/contact facts only. No address,
  hours, LocalBusiness subtype, rating, review, license, insurance, or other
  unsupported property was added.
- PR #112 changed no `functions/**` quote-backend file.

## Quote-flow QA

Result: **Local fallback pass; configured preview state blocked by #113.**

- `/request-quote` loads with clear required-detail guidance and truthful
  request-versus-scheduling language.
- With no local `PUBLIC_TURNSTILE_SITE_KEY`, the intentional email fallback is
  shown instead of a functional form. Email/call alternatives remain usable.
- The configured Turnstile form, validation, and post-submit redirect could not
  be reverified on the final Cloudflare candidate because that preview returns 404.
- `/thank-you` works as a direct visit and a potential success destination
  without asserting that a request was received or a visit booked.
- `/privacy` accurately describes the current limited-use workflow.
- No quote backend behavior changed in this audit.

## Small QA fixes included

1. Normalize prerendered `.html` paths before service breadcrumb hierarchy
   matching.
2. Render the final breadcrumb as non-linked `aria-current="page"` on every
   public interior route.
3. Add automated assertions for current-page breadcrumb semantics and the
   service hub level in UI/schema.
4. Remove two public internal-stage phrases and ban their return in the site
   audit.
5. Correct stale city-media documentation.

## Remaining blocker

### #113 — Latest dev Cloudflare preview returns 404

- Wrangler lists `e988e140` for branch `dev`, source `229137e`.
- `https://e988e140.cflwash-website.pages.dev/` returns 404.
- `https://dev.cflwash-website.pages.dev/` returns 404.
- `https://preview-dev.cflwash-website.pages.dev/` returns 200 but points to
  source `7465a84`, before PRs #111 and #112.

This blocks final Cloudflare preview review, configured Turnstile verification,
and closure of #89. It does not invalidate the local rendered, content,
claim-safety, media, or SEO results.

## Non-blocking polish items

- The no-Turnstile quote fallback repeats some detail guidance and
  booking/pricing caveats across the hero and fallback panels. It remains clear
  and truthful; a broader rewrite was intentionally not folded into #97.
- Real business, process, and completed-project photography would strengthen
  trust after verified assets and permissions exist. This remains governed by
  #51 and is not a launch claim-safety defect.

## Issue cleanup decisions

- **#77:** Ready to close as `completed`. PRs #108/#109 and this audit satisfy
  its layout, usefulness, local differentiation, mobile, CTA, SEO, and
  claim-safety requirements.
- **#89:** Keep open. Close only after #113 is resolved and the latest
  Cloudflare preview passes the final route and quote-flow smoke check.
- **#50:** Remains open and deferred. Its photo-assisted quote triggers are not
  complete and no upload work was started.
- **#51:** Remains open and deferred. No verified project-proof publishing
  system or project pages were started.

## Final recommendation

**Needs fixes.** The premium product pass itself is locally ready, and #97 can
close when this report PR merges. Epic #89 must remain open until #113 restores
and verifies a current Cloudflare preview.
