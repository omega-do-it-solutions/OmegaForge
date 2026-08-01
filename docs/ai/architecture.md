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
