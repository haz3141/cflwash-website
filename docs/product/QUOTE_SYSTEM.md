# Quote System

## Goal

Provide a staged quote workflow that starts simple and can evolve without changing the site structure.

## Phase 1: Contact-Based MVP

Status: current/near-term

Characteristics:

- Request a quote CTA routes to a contact destination
- Quote request can be handled by email or other direct contact method
- No backend form processing
- No scheduling
- No payment

Requirements:

- The route must exist
- The copy must state that quote request is the current next step
- The site must not imply instant booking or confirmed scheduling

## Phase 2: Quote Page With Form UI

Status: planned

Characteristics:

- `/request-quote` becomes a real form page
- The form is presented on the site, even if submission is still temporary
- The route should collect only the fields needed for a basic estimate

Suggested fields:

- Name
- Email or phone
- Service area or address
- Requested service
- Job notes

Requirements:

- Clear submit button
- Clear success/failure states
- `/thank-you` remains the post-submit destination

## Phase 3: Working Backend

Status: later implementation

Characteristics:

- Form submission is processed server-side or through a managed backend
- Notifications are delivered to the business inbox
- Failed submissions are handled cleanly

Requirements:

- No data loss on submit
- No silent failure
- A stable confirmation flow
- Tracking hooks for quote conversions

## Phase 4: Guided Quote Estimator

Status: future enhancement

Characteristics:

- The quote flow asks a sequence of guided questions
- Inputs are shaped toward faster triage and better lead qualification
- May support service, city, surface, and condition-based branching

Requirements:

- Keep the estimator lightweight
- Do not add complexity before the basic quote flow works
- Preserve the same destination and analytics model used by earlier phases

## Current Implementation Notes

- The repo currently has a quote destination route, but not a form backend.
- The site should keep using quote-first language until the later phases exist.
- Do not add a quote backend as part of documentation work.
