# ADR 0005: Secure Photo-Assisted Quote Workflow

## Status

Proposed

## Issue

GitHub issue: [#39 Design a secure photo-assisted quote workflow](https://github.com/haz3141/cflwash-website/issues/39)

## Context And Problem Statement

CFL Wash Co. may eventually let customers add optional project photos to a quote request. Photos can help staff understand surface type, approximate scope, staining, access, drainage, and HOA-notice context. They also introduce a new class of risk: private property images, large uploads, malformed files, link replay, object retention, staff access, email leakage, and recurring storage cost.

The current quote system is a text-first release candidate on `dev`:

Astro static form UI -> `POST /api/quote` -> Cloudflare Pages Function -> Cloudflare Turnstile server-side verification -> server-side validation and sanitization -> Resend notification email -> `/thank-you` after confirmed success.

The existing quote endpoint is intentionally narrow and currently enforces a 16 KiB request body limit. File uploads must not be added to the frozen quote backend until a separate implementation issue is approved.

## Goals

- Preserve the current text-only quote flow as the reliable fallback.
- Let staff request or receive a small number of private project photos after a quote request exists.
- Keep photo objects private by default and non-enumerable.
- Make photo upload failure non-blocking for the text quote request.
- Define file type, size, count, retention, cleanup, and staff-access rules before implementation.
- Separate quote-photo consent from public project publication consent.
- Document Cloudflare resources and configuration required later without creating them now.

## Non-Goals

- No runtime implementation in this branch.
- No quote form changes.
- No quote backend changes.
- No R2 bucket, binding, secret, environment variable, DNS, or production setting changes.
- No public project gallery or project route.
- No image moderation, automatic pricing, computer vision, or customer portal.
- No claim that this architecture guarantees legal compliance.

## Current Quote-System Constraints

- `POST /api/quote` accepts JSON only and rejects unsupported methods, origins, content types, malformed bodies, oversized bodies, honeypot submissions, failed Turnstile validation, and failed email delivery.
- The backend logs only request ID, timestamp, status, and coarse category.
- Submitted customer values must not be logged or sent to analytics.
- The notification email is the current operational handoff. It includes customer text details and must not gain photo attachments in this architecture.
- Turnstile is currently tied to the quote submit action. A future upload flow may use its own challenge, but the existing quote challenge must not be treated as blanket authorization for later uploads.

## Customer Journey

1. Customer submits the existing text quote form.
2. The text quote succeeds or fails independently of any photo flow.
3. If the text quote succeeds, the customer may see an optional add-photos path on the confirmation experience or receive a time-limited follow-up link.
4. The optional photo flow explains that photos are used to review the quote request, not to publish project proof.
5. The customer may upload up to three photos, one slot at a time.
6. Each file upload can fail, retry, or be abandoned without losing the text quote.
7. Staff receive a notification that private photos are available for the quote request.

## Text-Only Fallback

The text quote remains complete without photos. Email fallback remains available for customers who cannot or do not want to upload files. The photo flow must never create a state where the customer thinks the text quote failed because an optional photo failed.

## Architecture Option Comparison

| Option                                                                                        | Customer friction and mobile fit                                                                           | Complexity | Attack surface                                                           | Authorization and replay                                                 | Validation and privacy                                                                              | Cleanup and observability                                         | Cost                                                        | Decision                                                             |
| --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------- | -------------------------------------------------------------------- |
| Direct browser upload to private R2 using short-lived signed authorization                    | Good if optional, but the customer may need to handle upload before knowing the quote request was accepted | Moderate   | Presigned URLs, CORS, private keys, object naming                        | Good only when each URL is short-lived, slot-bound, and single-use       | Browser MIME and extension still need server-side final validation                                  | R2 metrics and lifecycle help; orphan risk remains                | Low at launch volumes under strict limits                   | Rejected for MVP because upload before text acceptance adds coupling |
| Upload through a Cloudflare Worker or Pages Function with strict limits                       | Simple mental model for customers; weak mobile connections can time out through the edge function          | Highest    | Function becomes file-ingest service with parsing and streaming concerns | Strong server-side gate if implemented carefully                         | Best opportunity to inspect bytes before write, but larger body handling increases operational risk | Worker/Pages metrics help; function failures can block uploads    | Low to moderate, but more function usage and limit pressure | Rejected for MVP because it expands the frozen quote backend surface |
| Post-submission upload through a time-limited link associated with a quote-request identifier | Best fit: quote first, photos later, retryable and optional                                                | Moderate   | Separate upload issuer, private R2, finalizer, cleanup                   | Strong if link is short-lived, request-bound, slot-bound, and single-use | Direct private R2 upload plus finalize validation keeps objects private                             | Lifecycle rules, manifest states, and coarse logs support cleanup | Low under launch limits; pricing depends on usage and plan  | Recommended MVP                                                      |
| Continue requesting photos manually after the quote request and defer web uploads             | Highest operational friction but lowest web risk                                                           | Lowest     | No web upload endpoint                                                   | No web replay risk                                                       | Staff handle files outside the website                                                              | No website cleanup; operational inbox cleanup remains manual      | Near zero website cost                                      | Keep as fallback, not final architecture                             |

## Recommended MVP Option

Use a post-submission photo flow tied to the quote request identifier:

- Keep `POST /api/quote` text-only.
- Generate the quote request ID during the text quote submission, as today.
- Add a future separate upload-session issuer that receives a valid quote request ID and creates a short-lived photo session.
- Use private Cloudflare R2 for object storage.
- Mint one short-lived, single-use upload authorization per file slot.
- Upload directly from the browser to private R2.
- Run a server-side finalize step after each upload to validate the stored object's expected metadata, extension, MIME claim, and file signature.
- Notify staff with the quote request ID, upload status, and private retrieval path. Do not attach photos to email.
- Retain the manual email-photo path as an operational fallback.

This recommendation follows from the current repo constraints: the quote backend is frozen, the current endpoint is intentionally small, and optional media should not be allowed to threaten text quote delivery.

## Decision Rationale

The recommended option keeps the highest-value invariant: quote submission must work without files. It also avoids turning the existing quote function into a file-processing endpoint while still giving customers a modern mobile-friendly path when photos are useful.

Cloudflare R2 supports object storage and private bucket patterns, including presigned upload URLs and lifecycle rules. Workers and Pages Functions can issue upload sessions and finalize metadata without accepting the full image bytes. OWASP file-upload guidance supports validating extensions, MIME type, file signatures, filename safety, size limits, and storage permissions server-side instead of trusting browser hints.

## Rejected Alternatives

- **Direct browser upload before quote submission:** rejected because a failed photo upload could prevent or discourage text quote submission.
- **Multipart form upload to `POST /api/quote`:** rejected because the current quote endpoint is frozen, JSON-only, and intentionally small.
- **Proxy all image bytes through a Pages Function:** rejected for the MVP because it increases body-size, CPU, memory, and parsing concerns without enough launch benefit.
- **Public bucket uploads:** rejected because private property photos must not be publicly enumerable.
- **Email attachments in staff notifications:** rejected because customer images would spread into inbox retention, forwarding, and access patterns that are harder to audit and delete.
- **Manual photo follow-up only:** retained as fallback but rejected as the target because it leaves the quote-photo UX unresolved.

## Request And Upload Sequence

1. Customer submits text quote to `POST /api/quote`.
2. The function validates JSON, verifies Turnstile, sends the text notification email, and returns `{ "ok": true, "requestId": "..." }`.
3. A future confirmation experience offers optional photo upload using that `requestId`.
4. Customer requests an upload session from a new photo-session endpoint.
5. The endpoint verifies the request ID shape and upload eligibility, applies rate limits, and creates an upload manifest with up to three empty slots.
6. For each slot, the endpoint issues a short-lived, single-use upload authorization.
7. Browser uploads one image directly to the private R2 object key for that slot.
8. Browser calls a finalize endpoint with the slot ID.
9. Finalize reads object metadata and a small byte range or object body sufficient for signature verification, rejects mismatches, and marks the slot as accepted or rejected.
10. Staff receive a photo-available notice only after at least one slot is finalized as accepted.
11. Staff retrieve photos through private, time-limited access, not public object URLs.

## Trust Boundaries

- Browser input is untrusted.
- Browser-provided filename, extension, `Content-Type`, and `Blob.type` are untrusted.
- `accept` and `capture` attributes are user-agent hints, not security controls.
- Presigned URLs and upload-session tokens are bearer credentials and must be short-lived.
- R2 objects are private storage, not proof that the content is safe or publishable.
- Staff retrieval links are sensitive and must expire.
- Cloudflare environment variables, R2 credentials, and signing material are secrets.

## Threat Model

| Threat                                 | Mitigation                                                                                                                                                                 |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Upload of executable or active content | Accept JPEG, PNG, and WebP only. Reject documents, SVG, PDFs, ZIPs, videos, HTML, and unknown formats. Verify extension, declared type, and file signature server-side.    |
| MIME spoofing                          | Do not trust browser MIME. Treat it as an advisory field only.                                                                                                             |
| Polyglot or malformed image            | Use magic-byte validation, size limits, reject ambiguous signatures, and avoid serving original uploads publicly. Defer deeper image rewriting to a later issue if needed. |
| Replay of upload authorization         | Use slot-bound, single-use authorizations with short TTLs and idempotent finalize behavior.                                                                                |
| Public object enumeration              | Use private bucket, random object keys, no customer names in keys, no public bucket listing, and no predictable path segments.                                             |
| Orphaned objects                       | Mark slots pending, accepted, rejected, expired, or deleted. Use lifecycle cleanup for expired pending objects.                                                            |
| Cost spike                             | Limit slots, per-file size, total request bytes, session lifetime, and session issuance rate.                                                                              |
| Sensitive visual information           | Disclose that sensitive documents should not be uploaded, review photos before internal reuse, and keep private media out of public publishing paths.                      |
| Email leakage                          | Send notifications only. Do not attach photos. Do not include public URLs.                                                                                                 |
| Secret leakage                         | Keep signing keys and bucket bindings out of source, logs, PRs, and analytics.                                                                                             |

## File Validation

Accepted formats for the MVP:

- JPEG: `.jpg`, `.jpeg`, `image/jpeg`
- PNG: `.png`, `image/png`
- WebP: `.webp`, `image/webp`

Deferred until real mobile testing proves need:

- HEIC/HEIF from iOS. Add only if staff tools, validation, and conversion workflow can support it.

Rejected:

- SVG, PDF, ZIP, HTML, XML, Office documents, videos, archives, scripts, executables, and unknown binary types.

Validation rules:

- Normalize extension to lowercase.
- Reject multiple or misleading active extensions.
- Do not use the original filename for object naming.
- Treat the browser-provided MIME type as a hint.
- Inspect file signatures server-side during finalize.
- Reject mismatches between allowed extension, declared type, and signature.
- Reject malformed, empty, truncated, or oversized files.
- Treat polyglot concerns conservatively: if signature or parser behavior is ambiguous, reject the file and keep the text quote.

## Limits

Recommended MVP limits:

- Files per quote request: maximum 3.
- Per-file size: maximum 8 MiB.
- Total accepted upload size per quote request: maximum 20 MiB.
- Upload session lifetime: 24 hours from quote acceptance.
- Per-slot upload authorization lifetime: 15 to 60 minutes.
- Active sessions per quote request: 1.
- Retry behavior: allow replacing a failed or expired slot while the session is active; do not allow more than three accepted objects.

These are product and abuse-control limits, not platform maximums.

## Object Naming And Storage Privacy

Use private R2 storage only. Object names must not include customer name, email, phone, street address, original filename, neighborhood, or unredacted quote details.

Recommended object-key shape:

```text
quote-media/{yyyy}/{mm}/{quoteRequestId}/{slotId}-{randomId}.{normalizedExt}
```

Rules:

- `quoteRequestId` must be non-sensitive and high entropy.
- `slotId` must be generated server-side.
- `randomId` must be generated server-side.
- Original filename may be stored only as redacted metadata if operationally required.
- Never expose bucket listing.
- Never publish R2 object URLs directly.

## Authorization And Replay Prevention

- Upload sessions must be bound to one quote request ID.
- Each photo slot gets one active upload authorization at a time.
- Authorizations must expire quickly and be invalid after a successful finalize.
- Finalize must be idempotent for a completed slot.
- Staff retrieval links must be time-limited and scoped to one object or one request.
- A future implementation may add a signed token store or KV/D1 manifest. That storage choice is a later bounded issue.

## Rate Limiting And Turnstile Relationship

The quote submit Turnstile token proves only that the text quote submission passed its challenge. It does not authorize indefinite media upload.

Future photo endpoints should apply their own abuse controls:

- Rate limit upload-session issuance by quote request ID and coarse client signals.
- Rate limit failed finalize attempts.
- Consider a separate Turnstile challenge for photo-session creation if abuse appears.
- Avoid logging IP addresses unless a documented security review approves the retention and redaction policy.

## Partial Upload And Retry Behavior

- MVP should use single-object PUT uploads, not multipart uploads, because the proposed 8 MiB per-file limit does not require multipart complexity.
- If upload fails before finalize, the slot remains pending until retried or expired.
- If finalize rejects the file, the slot becomes rejected and may be replaced during the session lifetime.
- If the user closes the page, the text quote remains delivered.
- If Cloudflare, R2, or network errors prevent upload, the UI should tell the user to continue by email.

## Failure Behavior That Preserves The Text Quote

- Text quote success must not depend on photo upload success.
- Photo upload failure must not redirect away from `/thank-you` or hide the business contact fallback.
- Staff should still receive the original quote email even when zero photos are uploaded.
- Staff notification for photos should be separate from the original text quote notification.

## Quote-Request Identifier Design

The quote request ID should be:

- Generated server-side.
- Non-sequential.
- Non-sensitive.
- Included in the original text quote response and staff email.
- Safe to use as a lookup key only when combined with a short-lived signed token.
- Not sufficient by itself to retrieve private media.

The current `crypto.randomUUID()` request ID pattern is acceptable for the text quote identity, but future photo access must not rely on an ID alone as authorization.

## Object Metadata Model

Minimum manifest fields:

- `quoteRequestId`
- `photoSessionId`
- `slotId`
- `objectKey`
- `status`: `pending`, `uploaded`, `accepted`, `rejected`, `expired`, `deleted`
- `declaredContentType`
- `detectedFileType`
- `normalizedExtension`
- `byteLength`
- `uploadedAt`
- `finalizedAt`
- `expiresAt`
- `failureReasonCategory`
- `retentionCategory`

Do not store customer name, email, phone, street address, raw notes, full user agent, IP address, or Turnstile token in object metadata.

## Staff Retrieval Workflow

- Staff email receives a notice that private photos are available for a request ID.
- Staff access happens through a protected internal workflow or short-lived retrieval URL.
- Retrieval URLs must expire and must not be listed in analytics.
- Staff should download only when needed for quote review.
- Staff must not move private quote photos into public project media without a separate publication approval record.

## Email-Notification Behavior

- Original quote email remains text-only.
- Photo notification email includes request ID, photo count, upload status, and next action.
- Do not attach photos.
- Do not include public object URLs.
- If private links are emailed, make them short-lived and avoid forwarding-sensitive wording.
- If photo upload partially succeeds, staff notification should state accepted count and rejected/pending count by category only.

## Orphan Cleanup

Use both application-state cleanup and R2 lifecycle rules:

- Pending session with no finalized files: expire after 24 hours.
- Uploaded but unfinalized object: delete after 24 to 48 hours.
- Rejected object: delete after 24 to 48 hours.
- Accepted object for unconverted lead: delete according to quote-media retention.
- If multipart uploads are ever introduced, configure lifecycle behavior to abort incomplete multipart uploads sooner than the platform default when appropriate.

## Shared Media Governance

Media classes are separate:

- Privately submitted quote photos.
- Internally retained job documentation.
- Approved before-and-after project media.
- Publicly published project media.
- Customer reviews or testimonials.

Rules:

- Submitting quote photos does not grant publication permission.
- Completing a job does not grant publication permission.
- Permission to publish photos does not automatically grant permission to publish a testimonial.
- Permission to name a city does not grant permission to identify a neighborhood or property.
- Publication requires a separate explicit approval record.
- Private media must not become public automatically.

Recommended permission states:

- `received_privately`
- `pending_review`
- `internal_use_approved`
- `publication_permission_requested`
- `publication_approved`
- `publication_denied`
- `withdrawn`
- `retention_expired`
- `deleted`
- `takedown_requested`

Any private-to-public transition must be explicit and auditable.

## Retention And Deletion

Recommended defaults:

- Quote media for unconverted leads: delete after 30 days.
- Quote media for converted or completed jobs with no publication permission: delete after 90 days unless moved to an approved internal job-documentation record.
- Internal job documentation: retain only under a documented operational policy approved before implementation.
- Public-project source media: retain while the public project remains approved, plus only as long as needed for correction and takedown workflows.
- Orphaned uploads: delete within 24 to 48 hours.
- Customer deletion request: verify request, remove private objects and derived images where operationally allowed, and document deletion status.
- Publication takedown: remove public page/media from routes, sitemap, internal links, and derived image outputs in the next deployment.
- Backups and derived images: implementation must document whether backups exist, how long they persist, and how derived images are invalidated.

Deletion or publication should require an authorized staff role. The implementation must define who may approve deletion, who may approve publication, and how the approval is recorded.

## EXIF And GPS Treatment

- Do not rely on EXIF or GPS metadata for quoting.
- Do not display EXIF or GPS metadata to staff unless a future operational policy explicitly requires it.
- Strip EXIF and GPS before any image becomes public project media.
- If private upload MVP cannot strip metadata immediately, keep originals private and never serve them publicly.
- Treat location-bearing metadata as sensitive.

## Sensitive Visual Information

Customers should be told not to upload payment information, identity documents, HOA account documents, gate codes, or other sensitive records.

Staff review must check for:

- Faces.
- Children.
- License plates.
- House numbers.
- Mail labels.
- HOA documents.
- Gate codes.
- Security cameras, alarm panels, and access systems.
- Vehicle identifiers.
- Neighboring properties.
- Interior or private areas.
- Payment cards, IDs, checks, or financial documents.

Sensitive visual information should be cropped, redacted, rejected, or kept private depending on context. Publication requires a separate review.

## Logging And Secret Handling

Allowed logs:

- Request ID.
- Photo session ID.
- Slot ID.
- Coarse status.
- Coarse error category.
- Byte length bucket, if useful.
- Timestamp.

Forbidden logs:

- Customer names, emails, phones, addresses, quote details, original filenames with identifiers, full object URLs, upload tokens, retrieval tokens, Turnstile tokens, API keys, R2 credentials, signed URLs, raw request bodies, and provider payloads.

Secrets and bindings must stay in Cloudflare configuration or local ignored files. They must not appear in source, PRs, screenshots, logs, analytics, or support tickets.

## Observability

Future implementation should track:

- Upload-session creation count.
- Accepted, rejected, expired, and deleted slot counts.
- Rejection categories.
- Average file size bucket.
- Orphan cleanup count.
- Staff retrieval errors.
- R2 storage and operations usage.
- Function error rate and latency.

Metrics must avoid customer-entered values and sensitive object names.

## Cost Envelope

Sources: Cloudflare R2 pricing and Workers pricing, accessed 2026-06-11. Actual billing depends on account plan, configured resources, request patterns, retention, and Cloudflare pricing at implementation time.

Assumptions:

- R2 Standard storage.
- Maximum 3 photos per request.
- Maximum 8 MiB per photo and 20 MiB accepted per quote request.
- Private upload flow uses Class A write operations and Class B read/list/head operations.
- Retention deletes unconverted quote media after 30 days.

| Lead volume | Example assumption                                     | Storage implication                | Cost posture                                                                                                 |
| ----------- | ------------------------------------------------------ | ---------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Low         | 25 photo-assisted leads per month at the 20 MiB cap    | About 0.5 GB-month before deletion | Expected to stay within current R2 free-tier assumptions if no other heavy usage exists                      |
| Moderate    | 250 photo-assisted leads per month at the 20 MiB cap   | About 5 GB-month before deletion   | Still near current free-tier storage, but operation counts and account plan must be monitored                |
| Higher      | 1,000 photo-assisted leads per month at the 20 MiB cap | About 20 GB-month before deletion  | May exceed current free-tier storage; paid R2 storage and operation pricing should be modeled before rollout |

Do not present these examples as guaranteed bills. They are planning envelopes only.

Current R2 pricing source states a free tier and paid storage/operation rates; Workers and Pages Functions pricing may introduce account plan considerations. Recheck pricing before implementation.

## Required Cloudflare Resources And Environment Configuration

Future implementation likely requires:

- Private R2 bucket for quote media.
- Pages Function or Worker binding to that bucket.
- Upload-session signing secret or token store.
- Optional KV, D1, Durable Object, or other manifest storage for upload-session state.
- Rate limiting configuration for upload-session and finalize endpoints.
- Lifecycle rules for orphan and retention cleanup.
- Separate preview and production configuration.

This ADR does not create any resource, binding, secret, environment variable, or production setting.

## Privacy-Policy And Consent Changes Required

Before implementation, update customer-facing language to explain:

- Photos are optional.
- Photos are used to review and respond to the quote request.
- Photos may contain private property information.
- Customers should not upload payment cards, identity documents, gate codes, HOA account documents, or other sensitive records.
- Quote-photo submission does not grant publication permission.
- Publication requires separate explicit approval.
- How customers can request deletion or takedown.
- Which operational providers may process private quote media.

These are implementation prerequisites, not legal conclusions. Privacy policy, consent wording, terms, disclosures, and operational procedures may need legal review before production.

## Security Review Checklist

- Confirm quote text submission still succeeds without files.
- Confirm upload endpoints cannot retrieve photos with only a request ID.
- Confirm object keys are random and non-identifying.
- Confirm bucket is private and listing is disabled.
- Confirm CORS is limited to required origins and methods.
- Confirm upload authorization is short-lived and slot-bound.
- Confirm finalize rejects unexpected extension, MIME, signature, size, and empty files.
- Confirm rejected and orphaned objects are deleted.
- Confirm logs contain no customer fields, tokens, signed URLs, or secrets.
- Confirm emails contain no attachments and no public object URLs.
- Confirm staff retrieval uses least privilege and short-lived access.
- Confirm lifecycle rules match retention policy.
- Confirm backup and derived-image behavior is documented.

## Rollout And Rollback Strategy

Rollout:

1. Implement behind an environment-gated feature flag or route condition.
2. Test in preview with non-production bucket and secrets.
3. Validate mobile camera upload, constrained network retries, rejected formats, oversized files, expired links, and email fallback.
4. Pilot with staff-only or limited real-user exposure.
5. Monitor usage, rejection, storage, and cleanup.
6. Expand only after privacy and operational procedures are approved.

Rollback:

- Disable photo-session issuance.
- Keep the text quote flow active.
- Keep staff retrieval for already accepted photos until deletion/retention decisions are complete.
- Run cleanup for pending, rejected, and orphaned objects.
- Remove public UI entry points without deleting private media prematurely.

## Open Questions

- Which storage primitive should hold the upload manifest: KV, D1, Durable Object, or another Cloudflare-backed store?
- Should staff retrieval use Cloudflare Access, signed links, or an internal tool?
- Is HEIC/HEIF support required for real iPhone users, and who will convert or preview those files?
- What exact retention period will legal/operations approve for converted jobs and completed-job documentation?
- Will privacy policy and consent language be reviewed by counsel before production?
- Should photo upload have its own Turnstile challenge when abuse patterns are known?
- How should backups and deployment artifacts handle deleted media?

## Proposed Bounded Implementation Issues

| Title                                             | Goal                                                                                    | Dependencies                          | Likely files                                                                              | Acceptance criteria                                                                                        | Recommended model                                         | Parallel-safe                                    |
| ------------------------------------------------- | --------------------------------------------------------------------------------------- | ------------------------------------- | ----------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- | ------------------------------------------------ |
| Define quote-media manifest and consent copy      | Finalize upload states, metadata, customer-facing disclosure, and operations policy     | ADR 0005 approval                     | `docs/product/QUOTE_SYSTEM.md`, `docs/engineering/QUOTE_FORM_OPERATIONS.md`, privacy docs | Manifest fields, retention rules, deletion roles, and consent wording are approved without runtime changes | Frontier model for privacy/security judgment              | Yes, docs only                                   |
| Provision non-production quote-media storage      | Create preview-only R2 bucket, lifecycle rules, and bindings after approval             | Manifest issue, Cloudflare approval   | Cloudflare dashboard or Wrangler config, deployment docs                                  | Preview resources exist, no production resources changed, lifecycle rules documented                       | Mini model with Cloudflare skill, human approval required | No, resource-scoped                              |
| Build upload-session issuer and finalize endpoint | Add endpoints that issue slot-bound upload authorization and validate completed objects | Storage provisioned                   | Future `functions/api/quote-media/*`, validation modules                                  | Text quote endpoint unchanged; accepted/rejected/expired states tested; no secrets logged                  | Frontier model for security-sensitive implementation      | No                                               |
| Add optional photo UI after quote success         | Add mobile-friendly optional upload path that does not block text quote success         | Endpoint implementation               | Future quote UI or confirmation route files                                               | Text-only flow remains available; upload retry/removal/error states are accessible                         | Mini model, with frontend QA                              | Can run parallel after endpoint contract freezes |
| Add staff retrieval workflow                      | Let authorized staff retrieve private photos without public URLs                        | Accepted private storage and manifest | Future staff-only workflow docs or tool                                                   | Retrieval is least-privilege, time-limited, logged coarsely, and non-enumerable                            | Frontier model if auth design is involved                 | No                                               |
| Add cleanup and retention automation              | Delete orphaned, expired, rejected, and retention-expired media                         | Manifest and storage resources        | Future cleanup Worker, scheduled job, lifecycle config docs                               | Cleanup is idempotent, observable, and tested against sample states                                        | Mini model                                                | Yes if manifest contract is stable               |
| Validate mobile and constrained-network behavior  | Exercise real device camera uploads, retries, expiration, and fallbacks                 | UI and endpoint work                  | QA docs, audit scripts if needed                                                          | Mobile success/failure matrix documented; no text quote regression                                         | Mini model with browser/device testing                    | Yes after feature implementation                 |

## Authoritative Sources

All source URLs were accessed on 2026-06-11. Product behavior, limits, and pricing must be rechecked before implementation.

| Source                                                                                                                         | Supports                                                                                                     |
| ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| [Cloudflare R2 upload objects](https://developers.cloudflare.com/r2/objects/upload-objects/)                                   | Presigned upload patterns and direct-to-R2 object upload behavior                                            |
| [Cloudflare R2 CORS](https://developers.cloudflare.com/r2/buckets/cors/)                                                       | Browser upload CORS requirements for R2                                                                      |
| [Cloudflare R2 limits](https://developers.cloudflare.com/r2/platform/limits/)                                                  | Object and multipart limits                                                                                  |
| [Cloudflare R2 pricing](https://developers.cloudflare.com/r2/pricing/)                                                         | Free-tier and paid storage/operation pricing assumptions                                                     |
| [Cloudflare R2 object lifecycles](https://developers.cloudflare.com/r2/buckets/object-lifecycles/)                             | Lifecycle deletion and incomplete multipart cleanup behavior                                                 |
| [Cloudflare R2 data security](https://developers.cloudflare.com/r2/reference/data-security/)                                   | R2 data security characteristics                                                                             |
| [Cloudflare R2 access tutorial](https://developers.cloudflare.com/r2/tutorials/cloudflare-access/)                             | Private staff-access patterns and presigned URL guidance                                                     |
| [Cloudflare R2 metrics and analytics](https://developers.cloudflare.com/r2/platform/metrics-analytics/)                        | R2 storage and request observability                                                                         |
| [Cloudflare R2 audit logs](https://developers.cloudflare.com/r2/platform/audit-logs/)                                          | Account-level audit logging for R2 changes                                                                   |
| [Cloudflare Pages Functions](https://developers.cloudflare.com/pages/functions/)                                               | Pages Functions runtime model                                                                                |
| [Cloudflare Pages limits](https://developers.cloudflare.com/pages/platform/limits/)                                            | Pages limits and relationship to Workers plans                                                               |
| [Cloudflare Workers limits](https://developers.cloudflare.com/workers/platform/limits/)                                        | Request, CPU, and runtime constraints relevant to file proxying                                              |
| [Cloudflare Workers pricing](https://developers.cloudflare.com/workers/platform/pricing/)                                      | Free and paid plan assumptions for future functions/workers                                                  |
| [Cloudflare Workers best practices](https://developers.cloudflare.com/workers/best-practices/workers-best-practices/)          | Worker implementation guidance, bindings, and streaming considerations                                       |
| [Cloudflare Workers metrics and analytics](https://developers.cloudflare.com/workers/observability/metrics-and-analytics/)     | Worker observability                                                                                         |
| [Cloudflare Turnstile server-side validation](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/) | Server-side Turnstile validation model                                                                       |
| [Cloudflare Turnstile token validation](https://developers.cloudflare.com/turnstile/turnstile-analytics/token-validation/)     | Token validation behavior, single-use expectations, and token lifetime                                       |
| [Cloudflare WAF rate limiting rules](https://developers.cloudflare.com/waf/rate-limiting-rules/)                               | Rate limiting as an abuse-control option                                                                     |
| [OWASP File Upload Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html)                   | Extension validation, MIME spoofing, file signatures, random filenames, storage permissions, and size limits |
| [MDN `accept` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/accept)                        | `accept` as a file-picker hint, not validation                                                               |
| [MDN file input](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/file)                              | File input behavior and server-side validation need                                                          |
| [MDN `Blob.type`](https://developer.mozilla.org/en-US/docs/Web/API/Blob/type)                                                  | Browser type reporting based on file metadata rather than byte inspection                                    |
| [MDN `capture` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/capture)                      | Mobile capture hint behavior                                                                                 |
