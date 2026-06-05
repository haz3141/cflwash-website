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

## Event Model

Track only high-signal actions at first:

- `quote_click`
- `call_click`
- `email_click`

Allowed event parameters:

- `cta_location`
- `page_path`

Never send personal information to GA4 from these events. Keep names, email addresses, phone numbers, mailto URLs, tel URLs, full link destinations, link text, form values, quote notes, street addresses, and query-string values containing user input out of analytics.

Current intent hierarchy:

1. `quote_click` as the primary intent signal, but not yet the main conversion
2. `email_click`
3. `call_click`
4. `quote_submit` only after a real backend exists

Do not mark an event as a conversion unless it represents a real business action.

## Event Metadata

Capture context that helps interpret intent:

- Page pathname
- CTA location

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
4. Check GA4 Realtime for an active user or page view.
5. Confirm preview deployments are not tracked unless intentionally configured.

## Implementation Priority

1. Preserve basic page analytics
2. Confirm GA4 Realtime data
3. Track CTA clicks with `quote_click`, `email_click`, and `call_click`
4. Track quote completion only after the quote backend exists
5. Add deeper funnel reporting only after the quote flow exists

## Do Not Add Yet

- Complex event taxonomies
- Multi-step funnel dashboards before the funnel exists
- Conversion modeling without submission data
- Personally identifiable information in analytics events
- Preview-environment tracking unless explicitly needed
