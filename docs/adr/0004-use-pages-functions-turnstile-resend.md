# ADR 0004: Use Pages Functions, Turnstile, and Resend for Quote Submission

## Status

Accepted

## Context

The site needs a first working quote form that fits the current Astro and Cloudflare Pages architecture without introducing a larger backend system.

The business goal is lead capture, not account creation, scheduling, payments, or CRM orchestration. The implementation must keep the current quote-first workflow, avoid premature database work, and add only the minimum server-side handling needed to accept and deliver quote requests safely.

## Decision

Implement the first working quote form as a static Astro UI that submits to a single Cloudflare Pages Function endpoint at `POST /api/quote`.

That endpoint will:

- Validate the request body
- Verify Cloudflare Turnstile server-side
- Sanitize customer input
- Send a notification email through Resend
- Return success that allows the client to redirect to `/thank-you` after confirmed success

## Architecture

Selected flow:

Astro static form UI
→ `POST /api/quote`
→ Cloudflare Pages Function
→ Cloudflare Turnstile verification
→ server-side validation and sanitization
→ Resend notification email
→ `hello@cflwash.com`
→ `/thank-you` after confirmed success

The backend must not add a database in the first release.

## Consequences

- The site keeps its static Astro foundation
- The form contract stays narrow and easy to validate
- Spam protection happens before delivery
- Email delivery remains the first operational notification path
- The quote flow can be shipped without CRM or storage work
- Later database or CRM integration can be added without changing the public form contract
- The implementation remains aligned with Cloudflare-native deployment

## Security And Privacy Considerations

- Turnstile tokens must be verified server-side, treated as single-use, and treated as short-lived
- Honeypot submissions must be rejected
- Request size limits must be enforced
- Unsupported methods and content types must be rejected
- All customer content must be escaped before HTML email rendering
- Plain-text and HTML email must both be sent
- The validated customer email must be used as `Reply-To`
- Success must be returned only after the email provider accepts the request
- No provider responses, secrets, stack traces, or internal exceptions may be exposed
- Logging must be limited to request ID, timestamp, success or failure status, and coarse error category
- No submitted form values may be sent to GA4

## Rejected Alternatives

- Client-only email submission
  - Would expose the delivery step to spam and fail to provide reliable server-side validation
- Mailto as the permanent form backend
  - Would not create a dependable submission workflow or error handling path
- Full server-rendered Astro conversion
  - Adds unnecessary surface area for a single quote endpoint
- Database-first implementation
  - Introduces storage and schema work before the lead-delivery flow exists
- Large form SaaS dependency
  - Adds third-party lock-in and unnecessary operational complexity for the MVP
- Building an estimator before basic lead delivery works
  - Increases scope before the core quote request path is proven
