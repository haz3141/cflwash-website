# Analytics Tracking Plan

## Goal

Track quote intent and major navigation without turning the site into a heavy analytics project.

## Current Production State

Google Analytics 4 is installed on the live production site.

- Production domain: `https://cflwash.com`
- Configuration method: Cloudflare Pages production environment variable
- Environment variable: `PUBLIC_GA4_MEASUREMENT_ID`
- Live production HTML has been verified to include the Google tag
- GA4 Enhanced Measurement is enabled for the web stream

Do not hardcode the measurement ID in the repository.

Cloudflare Web Analytics remains optional through:

- `PUBLIC_CF_WEB_ANALYTICS_TOKEN`

If neither analytics variable is set, analytics should remain off.

## Current Hooks

The layout can load either or both of:

- Google Analytics 4 via `PUBLIC_GA4_MEASUREMENT_ID`
- Cloudflare Web Analytics via `PUBLIC_CF_WEB_ANALYTICS_TOKEN`

CTA elements already include practical `data-cta` and `data-cta-location` attributes where appropriate. A document-level click listener now uses those hooks for lightweight GA4 event tracking.

GA4 automatic page views remain enabled. The site bootstrap overrides `page_location` with `window.location.origin + window.location.pathname` so query strings and URL fragments are excluded from the page location sent by this site. Custom CTA and quote-submission events should send only approved low-risk parameters.

## Event Model

Track only high-signal actions at first:

- `quote_click`
- `call_click`
- `email_click`
- `quote_submit`

Allowed event parameters:

- `cta_location`
- `page_path`
- `service_slug` for `quote_submit`

Never send personal information to GA4 from these events. Keep names, email addresses, phone numbers, mailto URLs, tel URLs, full link destinations, link text, form values, quote notes, street addresses, and query-string values containing user input out of analytics.

Current intent hierarchy:

1. `quote_submit` after confirmed backend success
2. `quote_click` as the primary pre-submit intent signal
3. `email_click`
4. `call_click`

Do not mark an event as a conversion unless it represents a real business action.

`quote_submit` is available in the quote-form release candidate and must only fire after `POST /api/quote` returns confirmed success. Direct visits to `/thank-you` must not emit it.

## Event Metadata

Capture context that helps interpret intent:

- Page pathname
- CTA location
- Service slug for confirmed quote submissions

Avoid sending personally identifiable information to GA4. Do not include names, email addresses, phone numbers, street addresses, quote notes, uploaded photo information, or full link destinations in event parameters.

## Attribution Notes

Use a simple lead-source log during the early launch period so analytics data can be matched to real leads.

Useful manual fields:

- Lead date
- Lead source
- Landing page if known
- City
- Requested service
- Contact method
- Outcome

## Verification

After any analytics configuration change:

1. Redeploy the Cloudflare Pages production build.
2. Verify the live HTML includes the Google tag.
3. Open `https://cflwash.com` in a normal browser session.
4. Check GA4 Realtime for expected configured events without sending full URLs or submitted form values.
5. Confirm preview deployments are not tracked unless intentionally configured.

## Implementation Priority

1. Preserve environment-driven analytics loading
2. Confirm GA4 Realtime data for approved events
3. Track CTA clicks with `quote_click`, `email_click`, and `call_click`
4. Track confirmed quote completion with `quote_submit`
5. Add deeper funnel reporting only after the quote flow has enough real usage data

## Do Not Add Yet

- Complex event taxonomies
- Multi-step funnel dashboards before the funnel exists
- Conversion modeling without submission data
- Personally identifiable information in analytics events
- Preview-environment tracking unless explicitly needed
