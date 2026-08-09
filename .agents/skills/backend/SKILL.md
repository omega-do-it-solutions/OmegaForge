---
name: backend
description: Implement and refactor APIs, server-side business workflows, authorization, third-party integrations, queues, scheduled jobs, and workers. Use for backend applications, full-stack server modules, webhooks, or any task involving trusted server behavior and external side effects.
---

# Backend

## Follow The Selected Framework

Before creating or reorganizing a server module, read
`docs/ai/application-structure.md` and the matching reference:
[references/nestjs.md](references/nestjs.md) for NestJS or
[references/fastify.md](references/fastify.md) for a direct Fastify application.
When NestJS uses the Fastify adapter, follow the NestJS structure because Nest
owns the application and module boundary.

Before adding or upgrading a backend runtime, framework, adapter, plugin, or
package, read `docs/ai/dependency-security.md`. Verify current support,
compatibility, and security information; do not select versions from generator
defaults or memory.

## Preserve Boundaries

Default to a modular monolith organized by business feature. Keep controllers,
route handlers, resolvers, queue consumers, and commands thin. They should
authenticate, authorize, validate, delegate, and map responses.

Keep process bootstrap, global configuration, technical authentication,
database clients, observability, and health behavior in application composition.
Keep identity workflows and business authorization policies with their owning
feature. Do not create root `controllers`, `services`, `repositories`, or
`common` catch-alls, and do not call a global plugin, layout, router, or provider
a feature merely because it lives under the source directory.

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

## Deliver Real-Time Data Deliberately

Use SSE for authorized, one-way server-to-client updates when the product needs
information to appear while a user is viewing a screen. Scope subscriptions by
tenant and audience, support reconnect with a cursor or event identifier, and
bound fan-out, connection lifetime, and event size. Send a stable record
identifier or compact state change; let the client retrieve authoritative data
through its normal API client.

Use WebSockets only when clients must also send real-time messages. Keep polling
when its freshness is sufficient. SSE and WebSockets do not make backend events
durable: when delivery must survive retries, outages, or independent consumers,
publish through a transactional outbox or equivalent durable mechanism and
process it with idempotent, observable workers. Do not introduce an event bus or
streaming platform without demonstrated throughput, replay, fan-out, or consumer
independence requirements.

## Verify

Test business services independently and add integration coverage at database,
authorization, provider, and transport boundaries where failures matter. Verify
duplicate delivery and retry behavior for idempotent operations.
