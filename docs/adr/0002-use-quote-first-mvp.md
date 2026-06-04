# ADR 0002: Use a Quote-First MVP

## Status

Accepted

## Context

The business needs a website that generates leads before it needs a full booking or estimating system.

## Decision

Make quote request the primary call to action and keep the initial workflow contact-based.

## Consequences

- No backend quote system is required for launch
- `/request-quote` can exist as a stable destination before forms are built
- The site avoids implying instant booking, scheduling, or payment
- The quote system can be layered in later without changing the site's core purpose
