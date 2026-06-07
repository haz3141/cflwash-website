# CFL Wash Co. Codex Instructions

Read these files before making changes:

- `PROJECT_RULES.md`
- `docs/DESIGN.md`
- `docs/LAUNCH.md`
- `docs/SEO.md`
- `docs/CLAIMS.md`

## Git workflow

- Use `dev` as the integration branch.
- Do not commit directly to `main`.
- Do not deploy production unless explicitly instructed.
- Keep commits focused and use conventional commit messages.
- Do not merge or commit unless explicitly instructed.

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

## Validation

Before completing implementation work, run:

- `pnpm check`
- `git diff --check`

For changes affecting generated output or deployment behavior, also run:

- `pnpm build`
