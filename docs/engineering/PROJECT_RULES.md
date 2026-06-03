# Project Rules

## Commits

Use Atomic Conventional Commits:

`<type>[optional scope]: <description>`

Examples for this repo:

- `docs(design): refine CFL Wash Co design guide`
- `refactor(design-system): organize reusable components`
- `style(theme): add CFL Wash Co design tokens`
- `chore(format): add Prettier configuration`
- `chore(lint): add ESLint configuration`
- `feat(home): implement CFL Wash Co homepage`

Keep each commit focused on one coherent change. Use feature branches for meaningful work.

## Validation

Before committing, run the available checks:

- `pnpm format:check`
- `pnpm lint`
- `pnpm build`

Use `pnpm check` when you want the combined validation path.

## Design System

- `src/components/ui/` is for reusable primitives such as buttons, cards, and sections.
- `src/components/site/` is for shared layout and site chrome such as the header, footer, and sticky CTAs.
- `src/components/sections/` is for reusable page sections.
- Put structured content in `src/data/` where practical.
- Avoid one-off styling when a reusable primitive already fits.
- Avoid over-abstraction. Add a new abstraction only when it removes real duplication or clarifies composition.
- Do not add shadcn/ui, Magic UI, React, Vue, Svelte, or other component libraries for this static Astro foundation.

## Claim Safety

- Do not invent reviews, testimonials, ratings, awards, job counts, or customer counts.
- Do not claim licensed, insured, bonded, 5-star, same-day, guaranteed, or eco-friendly status unless verified.
- Do not display a fake phone number.
- Do not imply booking, scheduling, payment, customer accounts, or instant confirmation until those workflows exist.
- Keep quote CTAs honest: requesting a quote is the current next step.
