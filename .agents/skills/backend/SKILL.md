---
name: backend
description: Implement and refactor APIs, server-side business workflows, authorization, third-party integrations, queues, scheduled jobs, and workers. Use for backend applications, full-stack server modules, webhooks, or any task involving trusted server behavior and external side effects.
---

# Backend

## Preserve Boundaries

Default to a modular monolith organized by business feature. Keep controllers,
route handlers, resolvers, queue consumers, and commands thin. They should
authenticate, authorize, validate, delegate, and map responses.

Place business decisions in feature-owned services or use cases. Keep transport
DTOs separate from persistence models when their responsibilities differ. Put
provider-specific behavior behind narrow application-owned interfaces.

Do not create microservices merely because modules are large or logically
separate.

## Handle Requests Safely

- Validate untrusted input at every external boundary.
- Enforce authorization on the server through reusable policies or guards.
- Return stable, documented error shapes without leaking secrets or internals.
- Apply transactions around invariants that must commit together.
- Add timeouts to external calls and classify retryable failures.
- Make webhooks, retries, payments, uploads, and queue work idempotent.
- Use structured logs with request, job, or correlation identifiers.

Never hold file bytes in database records or queue messages. Use object keys and
load `$object-storage` for file workflows.

## Choose Synchronous Or Asynchronous Work

Keep short work in the request path. Move work to a worker when it is long-running,
scheduled, retryable after response completion, rate-limited, or operationally
independent. Persist enough state for the user to observe progress and failures.

Queue payloads should be small, versionable, and safe to retry. Prefer stable
record identifiers over snapshots of mutable business data.

## Verify

Test business services independently and add integration coverage at database,
authorization, provider, and transport boundaries where failures matter. Verify
duplicate delivery and retry behavior for idempotent operations.
