# Quote Form Operations

## Required Environment Variables

Cloudflare Pages Functions for `POST /api/quote` require:

- `TURNSTILE_SECRET_KEY` for Cloudflare Turnstile server-side verification. Secret.
- `RESEND_API_KEY` for Resend email delivery. Secret.
- `QUOTE_NOTIFICATION_EMAIL` for the internal notification recipient. Sensitive configuration.
- `QUOTE_FROM_EMAIL` for the verified sender address used with Resend. Sensitive configuration.

Never hardcode these values in source files.

## Environment Separation

- Configure preview and production values separately in Cloudflare Pages.
- Do not assume preview secrets are identical to production secrets.
- Rotate preview and production credentials independently when needed.
- Verify the preview environment points to the correct preview recipient address before testing end-to-end delivery.

## Local Development

- Keep real local values in `.dev.vars`, which is gitignored.
- Use `.dev.vars.example` only as a placeholder template with blank values.
- Do not put real secrets in `.env`, screenshots, terminal captures, analytics events, PR text, or commit messages.

## Local Commands

Static build:

```sh
pnpm build
```

Pages Functions local runtime:

```sh
pnpm exec wrangler pages dev dist --port 8788
```

Wrangler will load local bindings from `.dev.vars` when present. Use non-production credentials only.

## Expected Response Categories

- `200` with `{ "ok": true, "requestId": "..." }` after Turnstile passes and Resend accepts the email.
- `400` with `validation_error` and `fieldErrors` for invalid field values.
- `400` with `verification_failed` for honeypot or Turnstile failure.
- `400`, `403`, `405`, `413`, or `415` with `invalid_request` for malformed requests, unsupported methods, content-type failures, origin mismatch, or oversized bodies.
- `503` with `delivery_unavailable` for missing configuration or email delivery failure.

## Logging Rules

Allowed log fields:

- `requestId`
- `timestamp`
- `status`
- coarse category such as `success`, `invalid_request`, `validation_error`, `verification_failed`, `configuration_error`, `delivery_error`, or `unexpected_error`

Never log:

- submitted names, emails, phones, cities, service details, or project details
- request bodies
- Turnstile tokens
- visitor IP addresses
- API keys
- provider response payloads

## Secret Rotation

- Rotate `TURNSTILE_SECRET_KEY` in Cloudflare Turnstile and update the matching Pages environment variable.
- Rotate `RESEND_API_KEY` in Resend and update the matching Pages environment variable.
- Confirm old credentials are revoked after the new values are deployed and validated.
- Re-test preview first, then production, after each rotation.

## Release Verification

- Run `pnpm check` before release work.
- Validate the function locally with Wrangler before pushing.
- Verify end-to-end submission and email delivery in a Cloudflare preview deployment.
- Confirm Turnstile hostname and action checks succeed in preview before promoting to production.

Secrets must never enter Git, screenshots, PR text, support tickets, or analytics.
