# QA Checklist

## Before Merge

- [ ] `pnpm check` passes
- [ ] No app code was changed when the task is docs-only
- [ ] New docs match current repo state
- [ ] No unsupported claims were added
- [ ] Quote flow description still reflects a quote-first MVP

## Content And Route Checks

- [ ] Homepage, service pages, and service-area pages are all listed correctly
- [ ] `/request-quote` is described as a destination, not a backend
- [ ] `/thank-you` remains noindex and utility-only
- [ ] Planned pages are clearly labeled as planned
- [ ] No thin city/service pages are introduced

## SEO Checks

- [ ] Canonical URLs are documented as production-domain only
- [ ] Technical SEO is separated from content SEO
- [ ] Sitemap and robots requirements are explicit
- [ ] Analytics are treated as optional and configuration-driven

## Quote Flow Checks

- [ ] Contact-based MVP is documented first
- [ ] Form UI is documented as a later phase
- [ ] Backend submission is documented as a later phase
- [ ] Guided estimator is documented as a future phase
