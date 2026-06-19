# CFL Wash Co. Codex Instructions

Read these files before making changes:

- `docs/engineering/PROJECT_RULES.md`
- `docs/design/DESIGN.md`
- `docs/strategy/LAUNCH.md`
- `docs/strategy/SEO.md`
- `docs/strategy/CLAIMS.md`

## Git workflow

- Use `dev` as the integration branch.
- Do not commit directly to `main`.
- Do not deploy production unless explicitly instructed.
- Keep commits focused and use conventional commit messages.
- Do not merge or commit unless explicitly instructed.
- The repository default branch is `main`, so GitHub closing keywords in PRs merged into `dev` do not reliably close issues.
- Every PR into `dev` must name its linked issue with `Closes #<issue>` for traceability.
- Immediately after a PR merges into `dev`, verify the linked issue state and manually close it when GitHub did not do so automatically.
- Close delivered work as `completed`; close superseded or intentionally abandoned work as `not planned`. Never mark unimplemented work as completed.
- Delete the merged feature branch and verify that no stale remote branch remains.

## Current development stage

The quote backend is frozen unless testing exposes a real defect.

Current priorities:

- Brand integration
- Visual polish
- Real photography
- Mobile layout
- Service and service-area content
- Accessibility
- Conversion polish
- Performance

## Content and claims

- Do not introduce unsupported reviews, ratings, guarantees, licensing, insurance, same-day service, instant booking, or complete stain-removal claims.
- Do not present roof cleaning, house washing, sealing, repair, restoration, or fleet washing as active launch services.
- Do not invent projects, photos, testimonials, service areas, contact information, or business proof.
- Preserve verified canonical paths and existing SEO constraints.

## Cloudflare

- Use installed Cloudflare skills and current official Cloudflare documentation when relevant.
- Prefer Wrangler for local development and project-specific Cloudflare commands.
- Ask before changing DNS, domains, account resources, environment variables, secrets, Turnstile configuration, or production settings.
- Never expose or commit credentials or secrets.
- Continue using the established GitHub-to-Cloudflare deployment workflow unless explicitly instructed otherwise.

## Scope control

- Preserve the quote backend, header, footer, homepage composition, and shared design system unless the assigned task requires changing them.
- Avoid unrelated refactors.
- Reuse existing components and data structures before creating new abstractions.
- Use centralized design tokens, UI primitive variants, page patterns, and documented shared utilities for theme work; avoid page-local one-off colors, shadows, CTA overrides, and decorative styling unless the exception is documented.
- Treat theme drift as raw colors outside token/asset contexts, legacy Tailwind color utilities, raw inverse `white/*` utilities, arbitrary shadows, one-off gradients, inline style attributes, public page theme `<style>` blocks, or duplicated button/link/card/CTA treatments.
- For visual theme work, review public routes at 390px, 768px, 1024px, and 1440px and record route notes for the PR.
- For issue-specific work, read only the files named in the issue first and do not reread unrelated documentation unless the issue explicitly requires it.

## Model routing

- Use the smallest model likely to complete the task correctly.
- Use a mini model for bounded mechanical edits, docs, tests, and straightforward fixes.
- Use a frontier model for visual judgment, architecture, security-sensitive changes, difficult debugging, or broad multi-file reasoning.

## Validation

Before completing implementation work, run:

- `pnpm check`
- `git diff --check`

For changes affecting generated output or deployment behavior, also run:

- `pnpm build`
