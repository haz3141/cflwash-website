# QA Checklist

## Branch And Environment State

- [ ] `main` is treated as the current production release.
- [ ] `dev` is treated as the integrated quote-form release candidate.
- [ ] `preview/quote-form-mvp` is treated as the tested Cloudflare preview deployment.
- [ ] No readiness work modifies `main` directly.
- [ ] Preview and production secrets remain separate in Cloudflare Pages.

## Before Merge

- [ ] `pnpm check` passes.
- [ ] `git diff --check` passes.
- [ ] `pnpm audit:patterns` passes after any public UI/theme change.
- [ ] `pnpm audit:patterns` reports only the documented scan exclusions: `src/styles/tokens.css`, `src/styles/global.css`, and dev-only QA pages under `src/pages/dev/`.
- [ ] No unsupported claims were added.
- [ ] No credentials, API keys, Turnstile secrets, or Resend keys were committed.
- [ ] New docs match the current repo state and do not claim the quote form is live in production before release.

## Built Output Checks

- [ ] `pnpm build` generates `/request-quote`, `/privacy`, and `/thank-you`.
- [ ] `/thank-you` remains `noindex, follow` and stays out of sitemap output.
- [ ] `/request-quote` includes an email fallback and privacy notice link.
- [ ] Without `PUBLIC_TURNSTILE_SITE_KEY`, the online form does not render as functional.
- [ ] With a fake `PUBLIC_TURNSTILE_SITE_KEY`, the quote form renders and references `POST /api/quote`.
- [ ] Turnstile client script appears only once on the quote page.
- [ ] Without `PUBLIC_GA4_MEASUREMENT_ID`, Google Analytics scripts are absent.

## Quote Form Checks

- [ ] Required fields and maximum lengths match `functions/lib/quote-validation.ts`.
- [ ] Service options match slugs from `src/data/services.ts`.
- [ ] Native and server validation errors are visible, accessible, and focusable.
- [ ] Turnstile expiration, timeout, errors, and failed submissions clear the token.
- [ ] Pending submissions cannot be submitted twice.
- [ ] Form values remain after validation, verification, or delivery failure.
- [ ] Successful submission redirects to `/thank-you` only after backend confirmation.
- [ ] Delivery failure makes the email fallback prominent.

## Visual Theme Checks

- [ ] The current homepage remains the visual reference for navy, cream, water, white, and gold theme rhythm.
- [ ] Public routes are reviewed at 390px, 768px, 1024px, and 1440px: `/`, `/services`, `/service-areas`, `/request-quote`, `/thank-you`, `/privacy`, `/driveway-pressure-washing`, `/sidewalk-walkway-cleaning`, `/concrete-cleaning`, and all six `/service-areas/*` pages.
- [ ] Header, footer, and mobile sticky CTA match the shared inverse/action system.
- [ ] Interior heroes, cards, links, CTA panels, media frames, borders, radii, shadows, and section spacing feel connected to the homepage.
- [ ] No page-local theme styling was added where a token, primitive prop, pattern prop, or shared utility fits, including legacy `bg`, `text`, `border`, `ring`, `divide`, `outline`, `decoration`, `placeholder`, `accent`, `caret`, `fill`, `stroke`, `from`, `via`, or `to` color utilities.
- [ ] PR notes include route and viewport visual QA notes, plus any intentional deviations.

## Backend Smoke Checks

- [ ] `GET /api/quote` returns `405` with `Allow: POST`.
- [ ] Non-JSON requests return `415 invalid_request`.
- [ ] Malformed JSON returns `400 invalid_request`.
- [ ] Empty or invalid fields return `400 validation_error`.
- [ ] Unknown fields are rejected.
- [ ] Invalid service slugs return `400 validation_error`.
- [ ] Filled honeypot submissions return `400 verification_failed`.
- [ ] Fake Turnstile tokens return `400 verification_failed`.
- [ ] Mismatched `Origin` is rejected.
- [ ] Oversized bodies return `413 invalid_request`.

## Analytics And Privacy

- [ ] `quote_submit` fires only after confirmed backend success.
- [ ] Direct visits to `/thank-you` do not fire `quote_submit`.
- [ ] Quote submission analytics send only `page_path` and `service_slug`.
- [ ] GA4 events do not include submitted PII, request IDs, Turnstile tokens, full URLs, or mailto/tel destinations.
- [ ] Preview deployments omit analytics unless intentionally configured.
- [ ] `/privacy` reflects Cloudflare hosting, Turnstile, Resend delivery, GA4, and optional Cloudflare Web Analytics.

## Release Checks

- [ ] Cloudflare preview deployment is tested before promotion to production.
- [ ] Preview routes return `X-Robots-Tag: noindex` where applicable.
- [ ] Preview end-to-end submission verifies Turnstile, Resend delivery, Email Routing, Reply-To, and `/thank-you` redirect.
- [ ] Production environment variables are configured before merging the quote-form release to `main`.
- [ ] Production release is verified after deployment without using preview secrets.
