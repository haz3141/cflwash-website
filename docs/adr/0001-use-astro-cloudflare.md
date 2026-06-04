# ADR 0001: Use Astro and Cloudflare Pages

## Status

Accepted

## Context

The site is a small, local lead-generation project that needs fast static delivery, simple routing, and low operational overhead.

## Decision

Use Astro for the site framework and Cloudflare Pages for deployment.

## Consequences

- File-based routing stays simple
- Static output fits the current product scope
- Deployment stays lightweight
- Shared metadata and layout logic can be centralized
- The stack remains compatible with future quote flow work
