# Analytics Tracking Plan

## Goal

Track quote intent and major navigation without turning the site into a heavy analytics project.

## Current Hooks

The layout can load either or both of:

- Google Analytics 4 via `PUBLIC_GA4_MEASUREMENT_ID`
- Cloudflare Web Analytics via `PUBLIC_CF_WEB_ANALYTICS_TOKEN`

If neither variable is set, analytics should remain off.

## Event Model

Track only high-signal actions at first:

- `quote_click`
- `call_click`
- `email_click`
- `service_page_view`
- `service_area_page_view`
- `thank_you_view`

## Event Metadata

Capture context that helps interpret intent:

- Page route
- CTA location
- Service slug when applicable
- Service-area slug when applicable

## Attribution Notes

Use a simple lead-source log during the early launch period so analytics data can be matched to real leads.

## Implementation Priority

1. Preserve basic page analytics
2. Track CTA clicks
3. Track quote completion
4. Add deeper funnel reporting only after the quote flow exists

## Do Not Add Yet

- Complex event taxonomies
- Multi-step funnel dashboards before the funnel exists
- Conversion modeling without submission data
