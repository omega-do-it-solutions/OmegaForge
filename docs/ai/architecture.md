# Architecture

Read this file when starting a project, changing application boundaries, adding
a module, or implementing a non-trivial feature across multiple layers.
During project creation, follow the startup sequence and file mutation rules in
`docs/ai/bootstrap.md`.

## Selected Project Profile

Fill this section during project bootstrap and keep it current. Once selected,
agents must follow this profile instead of reconsidering the stack for each
feature.

- Shape: `web-only`
- Web: Vite React single-page application with TypeScript and static production output
- Application source organization (per application): Vite React with `src/main.tsx` browser bootstrap, `src/app/` application composition, and feature-owned handbook code in `src/features/handbook/`
- UI system: Tailwind CSS with daisyUI
- API: Not currently required
- Worker: Not currently required
- Database: Not required; the handbook stores no records
- Object storage: Not provisioned; the handbook handles no files
- Scale forecast: Small; fewer than 10 internal staff members
- Data flow and real-time delivery: Static content only; no polling, SSE, WebSockets, or durable event flow
- Capacity and data lifecycle: Static assets only, deployed atomically and recoverable by redeploying a known-good `manual` branch revision
- Runtime environments: Development through Vite and production static hosting; no application secrets or app-specific environment file
- CI: Cloudflare Pages Git integration runs the workspace checks and production build for the `manual` branch
- Deployment: Cloudflare Pages static site from `apps/web/dist`, with `manual` as the production branch and a separately authorized custom subdomain

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
- Classify application composition, route or transport adapters, business
  features, and shared code separately. Application composition owns global
  providers, session/security setup, configuration, telemetry, and shells;
  features own product behavior; shared locations contain only stable
  cross-feature concepts. Do not use `features/` as a home for routing, layouts,
  technical providers, configuration, or generic utilities.
- Preserve framework-reserved routing and runtime directories instead of forcing
  one literal tree across all frameworks. The selected profile must name the
  applicable source organization from
  [application-structure.md](application-structure.md).
- Keep HTTP, UI, queue, and CLI entry points thin.
- Keep external providers behind narrow application-owned interfaces.
- Put code in `packages/` only when a stable contract or utility is used by at
  least two applications. Within one application, use shared locations only for
  stable cross-feature concepts.
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

## Mobile Product Foundation

Apply these standards only when `apps/mobile` is approved. They are not a reason
to create a mobile application or install every mobile package in advance.

- **Runtime and navigation:** Use TypeScript, React Native, Expo, and
  `expo-router`. Keep routes in the router-owned directory and do not add a
  second navigation system.
- **HTTP and server state:** Use the same project-owned `axios` API client and
  `@tanstack/react-query` contract as the React web application. Configure
  refetch behavior around app foregrounding and connectivity where the mobile
  workflow needs current information. TanStack Query remains the owner of server
  state.
- **Client state, forms, and permissions:** Use `zustand` only for shared
  client-only state, `react-hook-form` with `zod` for forms, and
  `@casl/ability` with `@casl/react` for UI capability checks. Server-side
  authorization remains authoritative.
- **Secure local values:** Use `expo-secure-store` only for small secret values
  such as session tokens. Never place credentials, long-lived provider secrets,
  or large application data there; never use an unencrypted client store for
  authentication tokens.
- **Design system:** Use React Native primitives and a project-owned mobile
  token layer for color, typography, spacing, radius, and light/dark behavior.
  Map the product's approved primary and secondary colors into those tokens.
  Do not use daisyUI, browser DOM components, or a web UI kit in native screens.
- **Mobile patterns:** Prefer accessible lists, cards, search, filters, and
  detail screens over desktop-style tables. TanStack Table, Tiptap, and
  ApexCharts are web-only defaults, not mobile baseline dependencies.
- **Device capabilities:** Add Expo modules for notifications, camera, code
  scanning, location, files, or offline behavior only when documented product
  workflows need them. Push notifications require a development or release
  build; do not treat Expo Go as complete device verification.
- **Testing:** Use `@testing-library/react-native` for mobile component and
  workflow tests. Test device-specific behavior on an available emulator,
  simulator, or physical device.
- **Release updates:** Do not make over-the-air updates a default dependency or
  release path. Choose an update service only after the product has an approved
  release, rollback, and ownership policy.

During bootstrap, install only the applicable packages in `apps/mobile` and list
the selected mobile standards in the technical profile. Mobile and web may share
typed contracts or feature-agnostic utilities only when both applications use
them; do not force UI components or application state into `packages/`.

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

The framework-aware ownership model and directory maps are defined in
[application-structure.md](application-structure.md). They apply to new
applications and deliberate structural refactors; existing applications retain
their framework-required entry files and migrate one ownership boundary at a
time.

### Frontend Feature Ownership

Router-owned page files are adapters between the routing framework and a
feature. Keep them focused on route parameters, route-level loading or metadata,
feature entry composition, and framework-required boundaries. Do not allow a
page file to accumulate every section, form, request, state transition, and
interaction merely because the pieces are not reused elsewhere.

Create feature-local components for independently understandable visual or
interactive responsibilities, including one-use sections. Extract hooks,
contexts or providers, composables, schemas, models, API modules, and tests when
they own distinct logic or state. Reuse may justify promotion to a shared
location, but it is not required for separation of concerns. Conversely, do not
split trivial static markup or create empty organizational folders solely to
match an example tree.

Use these framework defaults unless the installed router or an established
project convention requires a compatible variation:

- **Vite React and Vue Router:** use an explicit application-composition layer,
  thin route entries, and feature-owned screens or SFCs. A separate page layer
  is optional and exists only for genuine multi-feature composition.
- **Next.js App Router:** treat `app/` as the framework route tree. Keep its
  `page`, `layout`, loading, error, and route-handler files focused on framework
  concerns; put reusable product code in feature, component, library, or
  server-owned locations.
- **Nuxt 4:** treat `app/` and `server/` as framework-owned source trees. Keep
  `app/pages` and Nitro handlers thin; use `app/features` for client feature
  implementation and runtime-neutral `shared/` code only where it is safe for
  both browser and server.
- **Expo Router:** treat `app/` as the mobile route tree. Keep route files and
  navigation layouts focused on framework concerns, and place native feature UI,
  state, requests, and tests beside it in feature-owned modules.

The frontend skill's React and Vue references add framework-specific lifecycle
and rendering constraints. Shared UI contains stable cross-feature product
patterns and primitives; it must not become a collection of every component in
the application.

### Backend Module Ownership

Keep process bootstrap, global configuration, technical security, database
clients, observability, and health behavior in application composition. Keep
one business capability's transport adapters, use cases, domain rules,
infrastructure adapters, and tests in its feature or module. Authentication
mechanisms are application infrastructure; identity workflows and business
authorization policies stay with their owning feature.

- **NestJS:** `main.ts` and `AppModule` are composition roots. A Nest module is
  the feature boundary: controllers and DTOs adapt HTTP, providers are private
  by default, and exports form the module's small public surface. Do not make
  ordinary feature modules global, duplicate providers across modules, or rely
  on routine circular imports.
- **Fastify:** a registered feature plugin is the feature boundary. Register
  application plugins before feature plugins, preserve encapsulation, and use
  `fastify-plugin` only for deliberately shared technical infrastructure. Keep
  `buildServer()` testable without listening; only the process entry point starts
  the server.
- **Nest with the Fastify adapter:** use Nest module ownership, not a second
  raw-Fastify plugin tree.

The backend skill's NestJS and Fastify references define the matching directory
maps. Do not create root `controllers`, `services`, `repositories`, or `common`
catch-alls outside a framework's deliberate application-composition area.

Split a file or module when one or more of these are true:

- It owns multiple workflows or changes for unrelated reasons.
- A section has independent state, I/O, validation, or failure behavior.
- A unit can be named or tested independently, even if it is used only once.
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
