# Post-Launch Status

This document records the current live production state for CFL Wash Co. after the initial MVP launch.

## Live Production State

- Production domain: `https://cflwash.com`
- Canonical host: `cflwash.com`
- Redirecting alias: `https://www.cflwash.com` redirects to `https://cflwash.com` with a 301
- Cloudflare Pages production deployment: live
- Production Pages URL: `https://cflwash-website.pages.dev`
- Source branch after release: `main`
- Active development branch after release sync: `dev`

## Verified Domain Behavior

The production domain was verified with `curl` after launch:

- `https://cflwash.com` returns `200`
- `https://cflwash.com/request-quote` returns `200`
- `https://cflwash.com/robots.txt` returns `200`
- `https://cflwash.com/sitemap-index.xml` returns `200`
- `https://www.cflwash.com` returns `301` to `https://cflwash.com/`
- `https://www.cflwash.com/request-quote` returns `301` to `https://cflwash.com/request-quote`
- `www` redirects preserve path and query strings

## Indexing And Crawlability

- `robots.txt` is live at `https://cflwash.com/robots.txt`
- Sitemap index is live at `https://cflwash.com/sitemap-index.xml`
- `/thank-you` contains `noindex, follow`
- Public production HTML was checked for obvious internal placeholder language and fake phone-number patterns
- Canonical URLs point to `https://cflwash.com`

## Analytics

Google Analytics 4 is installed on the production site through Cloudflare Pages environment variables.

- Analytics provider: Google Analytics 4
- Config method: `PUBLIC_GA4_MEASUREMENT_ID` in Cloudflare Pages production environment variables
- Production HTML verified to include the Google tag
- GA4 Enhanced Measurement is enabled in the web stream

Do not hardcode the GA4 measurement ID in source files. Keep analytics configuration environment-driven.

## Search Console

Google Search Console should use a Domain property for:

```text
cflwash.com
```

After verification, submit:

```text
https://cflwash.com/sitemap-index.xml
```

Keep the DNS verification TXT record in Cloudflare after verification succeeds.

## Current Conversion Path

The current production site on `main` uses a quote-first, contact-based MVP path:

- Primary quote route: `/request-quote`
- Active contact method: email-based quote request path
- Phone CTAs remain conditional and should only appear after a real phone number is confirmed
- No booking, scheduling, payments, account system, CRM, or quote estimator exists in production

The integrated quote-form MVP exists on `dev` as a release candidate and has been tested through the `preview/quote-form-mvp` Cloudflare preview deployment. It should not be described as live in production until promoted to `main` and verified after production deployment.

## Still Deferred

Do not add these until the underlying business details or workflows are ready:

- LocalBusiness schema
- Service schema
- Final SEO/city copy expansion
- New city pages beyond current supported routes
- Project pages before real jobs/photos/permission
- Guided quote estimator
- Online booking, scheduling, payment, account, CRM, or marketplace flows
- Insurance, licensing, same-day, review, rating, or guarantee claims without proof

## Next Recommended Work

1. Confirm Search Console Domain property and sitemap submission.
2. Confirm GA4 realtime data after production deployment.
3. Decide the real phone/contact path.
4. Promote the quote-form release candidate only after production secrets and release checks are ready.
5. Start small design/content polish branches.
6. Expand service/city content only when there is real operational intent and useful page value.
