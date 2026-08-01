# Architecture

Read this file when starting a project, changing application boundaries, adding
a module, or implementing a non-trivial feature across multiple layers.
During project creation, follow the startup sequence and file mutation rules in
`docs/ai/bootstrap.md`.

## Selected Project Profile

Fill this section during project bootstrap and keep it current. Once selected,
agents must follow this profile instead of reconsidering the stack for each
feature.

- Shape: Unselected (`web-only`, `web-api`, or `web-api-worker`)
- Web: Unselected
- UI system: Tailwind CSS with daisyUI
- API: Not currently required
- Worker: Not currently required
- Database: Unselected
- Object storage: Self-hosted SeaweedFS; deployed topology unselected
- Scale forecast: Unselected
- Data flow and real-time delivery: Unselected
- Capacity and data lifecycle: Unselected
- Runtime environments: Development and production; configuration unselected
- CI: Unselected
- Deployment: Unselected

## Decision

Start with the smallest shape that supports the known product.

### Web-only

Use `apps/web` when:

- There is one browser client.
- Requests are short-lived.
- Business logic is modest and can remain modular inside the web application.
- The UI and server can deploy and scale together.

Framework server routes must delegate to feature services. Do not put persistence
or substantial business logic directly in route files.

### Web and API

Add `apps/api` when one or more of these are real current requirements:

- Multiple clients need the same backend.
- The backend needs independent deployment or scaling.
- Domain logic or permissions are substantial.
- The product exposes a stable external API.
- Integrations and webhooks form a significant subsystem.

### Worker

Add `apps/worker` when work must survive request termination, retry safely, run
on a schedule, or process for a long time. Queue messages should contain stable
identifiers, not large payloads or file bytes.

## Boundaries

- Organize application code by business feature or domain.
- Keep HTTP, UI, queue, and CLI entry points thin.
- Keep external providers behind narrow application-owned interfaces.
- Share only stable contracts or utilities used by at least two applications.
- Prefer a modular monolith until separate services have an operational owner and
  a demonstrated scaling, reliability, security, or deployment need.

## Environment Boundaries

Each deployable application has distinct development and production commands and
validated runtime configuration. Development may use local Compose dependencies,
safe synthetic seeds, and a development server. Production uses built artifacts,
runtime-injected secrets, health/readiness checks, and an observable one-shot
migration release step. Never run automatic seeds or a development server in
production.

Choose and record whether local development configuration is shared at the
workspace root or owned by individual applications. Root configuration is the
default for shared dependencies and cross-application values. Every spawned
process must explicitly receive the configuration it needs; automatic loading by
one framework does not satisfy another process. Bootstrap creates missing local
environment files from their matching examples without overwriting existing
files.

## Data Flow, Scale, And Real-Time Delivery

Treat the product's expected volume, peak load, retention, reporting needs, and
freshness requirement as architecture inputs. Capture them in `docs/product.md`
in business terms and select the smallest delivery pattern that meets them.

Bootstrap classifies the product as **small**, **medium**, **large**, or
**huge** from its documented workflows, clients, permissions, integrations,
long-running work, data history, and future direction. This is an agent-owned
planning forecast, not a question for the business owner to answer with technical
numbers. The technical profile states the selected forecast and conservative
defaults for capacity, availability, recovery, hosting, region, and operations;
the owner approves or revises that recommendation as one coherent proposal.

- **Small:** one client and modest data or operational workflow; favor one
  deployable application and ordinary request/response.
- **Medium:** multiple roles, recurring operational records, or limited external
  integration; use clear feature boundaries and add independent infrastructure
  only where currently needed.
- **Large:** multiple clients, substantial permissions, integrations, data
  flows, or important timeliness needs; separate deployable responsibilities and
  durable processing where the workflow requires them.
- **Huge:** multi-tenant, high-volume, time-sensitive, or regulated operations
  with multiple independent consumers; establish reliable event flow, explicit
  capacity and retention strategy, real-time delivery where needed, and
  independently scalable applications.

- Use request/response with bounded polling when data need not appear while a
  user is viewing a screen.
- Use Server-Sent Events (SSE) for timely, one-way updates from the server to
  connected browsers. Authenticate subscriptions, authorize every stream, scope
  each event to its tenant or audience, support reconnect using a stable cursor
  or event identifier, and bound connection and fan-out resources.
- Use WebSockets only when browser-to-server real-time messages are a genuine
  product requirement. Do not use them as a default replacement for polling or
  SSE.
- Use a worker and durable event flow when events must survive request
  termination, provider outages, retries, scheduled work, or independent
  consumers. Persist database-originated events through a transactional outbox
  or equivalent durable publication path; consumers must be idempotent,
  observable, retryable, and protected by bounded concurrency and backpressure.
- Do not introduce an event bus, Kafka, or streaming platform merely because
  data volume may grow. Add it only when documented throughput, retention,
  replay, fan-out, or independent-consumer requirements exceed the selected
  database-backed queue or worker design.

Design high-volume records for their observed access path: cursor pagination,
selective projections, indexes, retention and archival policies, aggregates for
reports, and bounded exports. Keep real-time notifications small and reference
stable record identifiers; clients fetch authoritative current state through the
normal API when necessary.

## UI Architecture

Tailwind CSS with daisyUI is the required visual system for every web interface.
The frontend framework may be Vue, Nuxt, React, Next.js, or another supported
Tailwind environment, but the visual system remains daisyUI.

- Install daisyUI only inside applications that render a web interface.
- Do not install or mix a second visual component library.
- Use daisyUI's semantic component and theme classes for visual primitives.
- Use Tailwind utilities for layout, responsive behavior, and narrow adjustments.
- Define product color, typography, radius, spacing, and theme decisions centrally
  instead of scattering raw visual values through feature code.
- Build application-owned components for recurring product patterns. Do not wrap
  every daisyUI primitive without a product-specific reason.
- Keep feature behavior, requests, and business state outside purely visual
  components.
- Use semantic HTML and implement keyboard, focus, labeling, and screen-reader
  behavior explicitly. Visual classes alone do not guarantee accessible behavior.
- A headless interaction primitive may be used for missing complex behavior, but
  it must not introduce a competing visual language.

Changing away from daisyUI is an architecture migration, not a feature-level
dependency choice. It requires explicit technical approval and removal of the
previous system rather than running two systems in parallel.

## Frontend Product Foundation

Use the following libraries as the standard implementation choices when the
corresponding capability is in scope. Do not substitute overlapping libraries
without an explicit architecture decision, and do not install unused packages
into a baseline merely because a future feature is conceivable.

- **HTTP and server state:** Use `axios` through a project-owned API client. Use
  TanStack Query for fetching, caching, mutations, invalidation, pagination, and
  other server state: `@tanstack/react-query` for React/Next and
  `@tanstack/vue-query` for Vue/Nuxt. Do not store server state in a client-state
  store.
- **Data tables:** Use the TanStack Table adapter for every interactive product
  table: `@tanstack/react-table` for React/Next and `@tanstack/vue-table` for
  Vue/Nuxt. It is headless; render it with semantic HTML, daisyUI, and project
  components rather than a competing visual table library.
- **Authorization experience:** Use `@casl/ability` and the matching
  `@casl/react` or `@casl/vue` integration for UI capability checks when roles
  or permissions are in scope. Browser checks improve the experience only; every
  action remains authorized by a server-side policy.
- **Icons:** Use `@phosphor-icons/react` or `@phosphor-icons/vue` as the sole
  icon library. Use accessible labels where an icon has an action or meaning.
- **Forms:** Use Zod as the shared validation schema language. In React/Next use
  `react-hook-form` with `zod`; in Vue/Nuxt use `vee-validate` with `zod`.
  Validate again at the server boundary.
- **Rich text:** Use `@tiptap/react` or `@tiptap/vue-3` when a product requires
  a rich Markdown/document editor. Keep stored content, sanitization,
  authorization, and upload behavior in the owning feature.
- **Charts:** Use `apexcharts` with `react-apexcharts` or `vue3-apexcharts` for
  product analytics visualizations. Do not use a chart where a small accessible
  summary table communicates the result more clearly.
- **Dates:** Use `dayjs`, including its timezone support where the product has
  timezone-aware behavior. Keep canonical timestamps and business rules outside
  presentation components.
- **Client state:** Use `pinia` for Vue/Nuxt client state and `zustand` for
  React/Next client state only when client-only state is shared beyond a
  component or feature-local model. TanStack Query remains the owner of server
  state.

During bootstrap, list the applicable selections in the technical profile and
install them in the owning web application. The project may add a new foundation
library only through an explicit architecture decision that explains why the
standard choice is insufficient.

## Dependency Direction

Dependencies should point toward business behavior:

```text
UI / HTTP / queue / CLI entry points
                 ↓
       application services / use cases
                 ↓
            domain rules

infrastructure adapters ──implement──> project-owned interfaces
```

- Domain rules must not import UI, HTTP, database, queue, or provider code.
- Application services may coordinate domain rules and project-owned interfaces.
- Infrastructure implements those interfaces for databases, object storage,
  email, payments, third-party APIs, queues, and other volatile dependencies.
- Entry points authenticate, authorize, validate, delegate, and map results.
- In a simple feature, functions and modules are enough. Do not manufacture every
  layer or interface when there is no boundary or variation to protect.

## Code Organization And Splitting

Organize by business capability first. Keep code that changes together close
together. A feature may contain only the folders it actually needs:

```text
features/<feature>/
├── domain/          # Business rules and state transitions
├── application/     # Use cases and orchestration
├── infrastructure/  # Database and external-provider adapters
├── ui/              # Feature-owned views and interaction code
└── tests/            # Focused behavior and boundary tests
```

Do not create empty folders to imitate this example.

Split a file or module when one or more of these are true:

- It owns multiple workflows or changes for unrelated reasons.
- A section has independent state, I/O, validation, or failure behavior.
- A unit can be named, tested, or reused independently.
- Understanding a change requires navigating unrelated implementation details.
- The file repeatedly causes merge conflicts between unrelated work.

File length is a warning signal, not an architecture rule. Do not extract trivial
one-use code only to reach an arbitrary line count.

Each feature should expose a small intentional public surface. Avoid deep imports
into another feature's internals, circular dependencies, and broad barrel exports
that hide dependency direction. Move code to `packages/` only after at least two
applications need the same stable contract or behavior.

Use runtime code splitting where it improves real behavior: split frontend routes
and heavy optional experiences, isolate backend feature modules, and move
long-running work to workers. Do not add lazy loading or service boundaries
without a bundle, performance, scaling, or reliability reason.

## Separation Of Concerns

- UI components render state and emit user intent; feature orchestration owns
  requests, mutations, and workflow state.
- Controllers and routes own transport concerns; services own business behavior.
- Repositories and adapters own persistence or provider details; they do not make
  product decisions.
- Validation at an untrusted boundary protects the system; domain validation
  protects business invariants.
- Authorization decisions belong in reusable server-side policies, not scattered
  conditionals in controllers or UI components.
- Configuration, logging, caching, and retries remain infrastructure concerns
  unless the product explicitly defines their behavior.

Keep related logic together even when it crosses technical concepts. Separation
of concerns does not mean placing every function in a different file.

## SOLID Without Ceremony

- **Single responsibility:** Give a module one coherent reason to change. Split
  mixed business, transport, persistence, and presentation responsibilities.
- **Open/closed:** Add extension points only where stable variation already
  exists, such as storage or payment providers. Prefer direct changes elsewhere.
- **Liskov substitution:** Implementations of an interface must preserve its
  documented behavior, errors, and lifecycle expectations.
- **Interface segregation:** Define narrow interfaces around what each consumer
  needs instead of large universal service interfaces.
- **Dependency inversion:** Make business code depend on project-owned contracts,
  while framework and provider code depends inward by implementing them.

SOLID does not require classes, dependency injection containers, repositories for
every table, or an interface for every function. Use the simplest construct that
preserves the boundary.

## DRY Without False Abstraction

Remove duplication of business knowledge: invariants, formulas, permission rules,
schemas, protocol mappings, and lifecycle decisions should have one authoritative
implementation.

Do not deduplicate code merely because two blocks look similar. Similar UI or
workflow code may represent different concepts that will evolve independently.
Prefer a small amount of obvious duplication over a generic abstraction with
flags, conditionals, or unclear ownership. Extract when the shared concept is
stable or repeated change demonstrates the common boundary.

## Human Debuggability

- Use business-meaningful names and explicit state transitions.
- Keep pure decision logic separate from I/O so it can be tested and inspected.
- Preserve error causes and add useful context; never silently swallow failures.
- Emit structured logs at request, job, provider, and state-transition boundaries.
- Propagate request, job, or correlation identifiers through asynchronous work.
- Avoid hidden global state, action-at-a-distance side effects, unexplained magic
  values, and overly clever control flow.
- Comment why a surprising decision exists, not what readable code already says.
- Keep focused tests near the behavior they protect and make failures explain the
  broken business expectation.

A human should be able to start at a route, page action, or job and follow a
short, explicit path to the business rule and its side effects.

## Maintainability And Scalability

- Prefer localized feature changes over modifications across unrelated modules.
- Keep application instances stateless where practical; store durable state in
  the database or object storage rather than local process files.
- Make externally visible mutations idempotent when retries are possible.
- Bound list queries, queue concurrency, retries, uploads, and external calls.
- Use transactions for atomic invariants and workers for durable asynchronous
  work.
- Design APIs and events with explicit version and compatibility expectations.
- Measure queries, bundles, latency, throughput, and memory before optimizing.
- Scale a proven bottleneck independently only after modular boundaries make the
  extraction clear.

Maintainable code is the first scaling mechanism. Prefer a clear modular monolith
over operational complexity added for hypothetical traffic.

## Reconsider The Shape When

- Releases are blocked because unrelated areas must deploy together.
- One workload needs materially different scaling or availability.
- Security boundaries require process or network isolation.
- Multiple applications duplicate the same business behavior.

Do not split solely because the repository has become large.
