# Quote Form MVP

## Purpose

Freeze the first working quote form contract for CFL Wash Co. This document defines the UI, API, backend, analytics, and privacy rules for the integrated quote-form release candidate.

The implementation exists on `dev` and has been tested through the `preview/quote-form-mvp` Cloudflare preview deployment. It is not live in production until promoted to `main` and verified after production deployment.

## MVP Architecture

Selected architecture:

Astro static form UI
→ `POST /api/quote`
→ Cloudflare Pages Function
→ Cloudflare Turnstile server-side verification
→ Server-side validation and sanitization
→ Resend notification email
→ `hello@cflwash.com`
→ `/thank-you` after confirmed success

Why this fits the current site:

- Keeps the existing static Astro architecture
- Adds one focused server-side endpoint instead of a larger application layer
- Uses Cloudflare-native deployment primitives already matched to the repo
- Adds server-side spam protection before any email is sent
- Avoids premature CRM or database complexity
- Preserves the quote-first workflow already established in the product docs
- Leaves room for later database or CRM integration without changing the form contract

No database is part of the first backend.

## Form Contract

The first working quote form on `/request-quote` must submit exactly these fields:

- `name`
- `email`
- `phone`
- `city`
- `service`
- `details`
- `consent`
- `website`
- `turnstileToken`

Field rules:

`name`

- Required
- Trimmed
- 2 to 100 characters

`email`

- Required
- Trimmed and normalized
- Maximum 254 characters
- Valid email format

`phone`

- Optional
- Trimmed
- Maximum 30 characters

`city`

- Required
- Trimmed
- 2 to 100 characters

`service`

- Required
- Must match an existing slug from [`src/data/services.ts`](../../src/data/services.ts)

`details`

- Required
- Trimmed
- 10 to 2000 characters

`consent`

- Required
- Must be `true`

`website`

- Hidden honeypot
- Must be empty

`turnstileToken`

- Required
- Validated only on the server

Out of scope for the MVP:

- File uploads
- Street addresses
- Schedules
- Payment data
- Automatic pricing

## API Contract

Endpoint:

`POST /api/quote`

Request content type:

`application/json`

Representative request:

```json
{
  "name": "Customer name",
  "email": "customer@example.com",
  "phone": "",
  "city": "Deltona",
  "service": "driveway-pressure-washing",
  "details": "Driveway and sidewalk need cleaning.",
  "consent": true,
  "website": "",
  "turnstileToken": "token"
}
```

Response categories:

Success:

```json
{
  "ok": true,
  "requestId": "generated-id"
}
```

Validation failure:

```json
{
  "ok": false,
  "code": "validation_error",
  "fieldErrors": {
    "email": "Enter a valid email address."
  }
}
```

Verification failure:

```json
{
  "ok": false,
  "code": "verification_failed"
}
```

Delivery failure:

```json
{
  "ok": false,
  "code": "delivery_unavailable"
}
```

Method or content-type failure:

```json
{
  "ok": false,
  "code": "invalid_request"
}
```

HTTP status categories:

- Success responses should use a 2xx status
- Validation and request-shape failures should use a 4xx status
- Turnstile verification failures should use a 4xx status
- Email delivery failures should use a 5xx status
- Unsupported method or content type should use an appropriate 4xx status

The backend must not expose provider responses, secrets, stack traces, or internal exceptions.

## Backend Requirements

The backend must:

- Accept `POST` only
- Reject unsupported content types
- Enforce a reasonable request-size limit
- Reject unexpected service values
- Normalize whitespace
- Enforce all maximum lengths
- Validate Turnstile server-side
- Treat Turnstile tokens as single-use and short-lived
- Reject a filled honeypot
- Escape all customer content before HTML email rendering
- Send both plain-text and HTML email
- Use the validated customer email as `Reply-To`
- Return success only after the email provider accepts the request
- Generate a non-sensitive request ID
- Never expose provider responses, secrets, stack traces, or internal exceptions

## Logging And Privacy

Allowed logging fields:

- Request ID
- Timestamp
- Success or failure status
- Coarse error category

Forbidden logging fields:

- `name`
- `email`
- `phone`
- `city`
- `details`
- Turnstile token
- API keys
- Full request body

None of the submitted form values may be sent to GA4.

## Analytics Contract

Analytics events:

- `quote_click`
- `email_click`
- `call_click`
- `quote_submit`

Event intent:

- `quote_click`: intent event already handled separately
- `email_click`: email fallback intent event
- `call_click`: future phone intent event
- `quote_submit`: sent only after confirmed backend success and used as the future primary GA4 key event

Allowed `quote_submit` parameters:

- `page_path`
- `service_slug`

Disallowed analytics data:

- City
- Any other user-entered values
- Any form field contents beyond the approved parameters

A direct visit to `/thank-you` must not create a `quote_submit` event.

## Environment Variables

Public:

- `PUBLIC_TURNSTILE_SITE_KEY`

Secrets or server configuration:

- `TURNSTILE_SECRET_KEY`
- `RESEND_API_KEY`
- `QUOTE_NOTIFICATION_EMAIL`
- `QUOTE_FROM_EMAIL`

Rules:

- Secrets must never be committed
- Secrets must not appear in PRs, screenshots, logs, or Codex prompts
- Production and preview environments should use intentionally configured values
- The GA4 measurement ID remains separately configured through `PUBLIC_GA4_MEASUREMENT_ID`

## Email Contract

Recipient:

- `QUOTE_NOTIFICATION_EMAIL`

Suggested production recipient:

- `hello@cflwash.com`

Sender:

- `QUOTE_FROM_EMAIL`

Suggested format after domain verification:

- `CFL Wash Co. Website <quotes@cflwash.com>`

The email must contain:

- Request ID
- Name
- Email
- Optional phone
- City
- Selected service
- Project details
- Submission timestamp
- Source page

Do not put raw customer text into the email subject.

## Frontend Behavior

The future UI must include:

- Semantic labels
- Required and optional indicators
- Appropriate autocomplete attributes
- Accessible inline errors
- Global failure message
- Disabled and loading submit state
- Duplicate-submit prevention
- Preservation of entered values after validation errors
- Turnstile widget
- Consent checkbox with privacy-page link
- Existing email fallback
- Redirect to `/thank-you` only after backend success
- No guaranteed response time
- No instant quote or confirmed booking language

## Preview And QA Plan

The implementation must be tested for:

- Valid submission
- Missing required fields
- Invalid email
- Invalid service slug
- Oversized fields
- Honeypot filled
- Missing Turnstile token
- Invalid Turnstile token
- Reused Turnstile token
- Email provider failure
- Duplicate submission
- Network interruption
- Mobile usability
- Keyboard usage
- Screen-reader labels and errors
- Exactly one notification email
- Exactly one `quote_submit` event
- No form data in GA4
- Direct `/thank-you` visit does not count as submission

## Deferred Features

Explicitly deferred:

- Photo uploads
- File storage
- Guided estimator
- Automatic pricing
- Scheduling
- Payments
- SMS
- Customer accounts
- CRM
- D1 or database storage
- AI chat
- Service-area expansion
- New schema work
