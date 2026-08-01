# Engineering Contract

## Purpose

This repository is a reusable technical foundation for AI-developed products.
Treat user prompts as business intent and choose implementation details from the
existing project architecture, this contract, and the relevant project skills.

Do not require users to name frameworks, layers, patterns, libraries, capacity,
hosting, availability, recovery, or data-residency targets. Infer the smallest
suitable technical posture from the product description and present the selected
defaults for approval. Ask one plain-language question only when the stated
product behavior is ambiguous or contradictory; do not turn technical planning
into an interview for a non-technical owner.

## Sources Of Truth

Use the following sources in order:

1. The current user request for the desired change
2. `docs/product.md` for product behavior and business rules
3. This file for permanent engineering boundaries
4. Existing code, tests, and public contracts for established implementation
5. A relevant skill under `.agents/skills` for task-specific procedure

If product documentation and the request conflict, call out the conflict before
changing established business behavior.

## Workspace

Use pnpm for JavaScript and TypeScript work. Do not introduce npm, Yarn, Bun, or
additional JavaScript lockfiles inside a pnpm project.

```text
apps/
├── web/       # Browser-facing application; may also own a small server
├── api/       # Optional independent backend
├── worker/    # Optional queues, schedules, and long-running work
└── mobile/    # Optional mobile client

packages/      # Stable code or contracts shared by at least two applications
docker/        # App-specific container files when they exist
docs/          # Product knowledge and exceptional technical decisions
scripts/       # Repeatable project automation
```

Applications are deployable units. Packages are not deployable and must not
become a dumping ground for code used by only one application.

## Project Bootstrap

Use `$product-details` when a non-technical owner wants a guided, iterative
conversation to create or improve `docs/product.md`. That dedicated product
discovery flow may ask one short business question at a time. Do not turn
`$bootstrap-project` itself into that interview: it must use the completed
document and infer technical defaults.

Use `$bootstrap-project` when starting or resuming a repository from this
template. Read `docs/ai/bootstrap.md` completely before changing any project
file. Its protected, targeted-edit, generated, and local-only mutation classes
are mandatory.

Capture business requirements first. The agent must decide and print the
smallest suitable technical profile, explain the choices and rejected larger
alternatives, list exact intended file mutations, and wait for technical-owner
approval. Only after approval may it scaffold, provision, and start a runnable
baseline. Generators may write only into verified empty application directories
and must never replace root framework files. Bootstrap does not include product
features. Git metadata is optional: bootstrap must not initialize, alter, or
require a Git repository unless the user separately asks for Git work.

## Application Shape

Default to `apps/web` only when one web application can safely own the UI and
server behavior. Keep server code modular so it can be extracted later.

Add `apps/api` when the backend needs an independent lifecycle, multiple clients,
substantial domain logic, complex permissions, a stable public API, independent
scaling, or many integrations. Add `apps/worker` only for asynchronous,
scheduled, retryable, or long-running work.

Default to a modular monolith. Do not introduce microservices, event buses, or
distributed infrastructure without demonstrated operational need.

Read `docs/ai/architecture.md` when selecting or changing the application shape,
adding a module, or implementing a non-trivial feature across multiple layers.

Derive data-flow architecture from the scale and freshness requirements in
`docs/product.md`. Use polling for ordinary, non-urgent refreshes; use SSE for
one-way timely updates to connected clients; use WebSockets only when clients
must also exchange real-time messages. Use durable event processing and workers
when events must survive retries, outages, or request termination. Do not add a
streaming transport or event bus without a stated business need.

## Feature Implementation

Use `$implement-feature` for features and behavior-changing bug fixes, plus any
specialized skill that matches the affected area.

Implement the smallest complete vertical slice:

1. Identify the application and feature that own the behavior.
2. Derive observable acceptance behavior from the business request.
3. Validate input at system boundaries.
4. Put business decisions in a service, use case, or domain module.
5. Keep routes, controllers, UI event handlers, and queue consumers thin.
6. Isolate persistence and external side effects.
7. Connect applications through explicit typed contracts.
8. Test the changed behavior and relevant failure paths.

Skip layers that do not apply. Do not create empty abstractions, speculative
packages, placeholder services, or unrelated refactors.

## Code Quality

Keep code cohesive, loosely coupled, and easy for a human to trace. Organize by
business feature, then separate UI or transport, application logic, domain rules,
and infrastructure only where those responsibilities exist.

Apply SOLID and DRY as decision tools, not as reasons to add boilerplate. Depend
on narrow project-owned interfaces at volatile boundaries. Extract duplicated
business knowledge, but do not unify code that only looks similar and may evolve
differently.

Split a module when it owns multiple workflows, changes for unrelated reasons,
has independently testable state or I/O, or has become difficult to navigate.
Do not split code solely to satisfy a line-count target. Keep dependencies flowing
toward business logic and prevent circular or deep cross-feature imports.

Follow the detailed code structure, SOLID, DRY, debuggability, and scalability
rules in `docs/ai/architecture.md`.

## UI System

Use Tailwind CSS with daisyUI as the single visual component system for web
interfaces. Do not install or mix another visual UI kit. Headless behavior
primitives are allowed only when daisyUI does not provide the required accessible
interaction; style them exclusively with the project's daisyUI theme and tokens.

Keep product-specific composed components in application code instead of editing
or duplicating library internals. Use `$frontend` and read its daisyUI reference
for any user-interface work.

## Data And Files

Use a relational database for structured, queryable business records unless the
project documents a different choice. Change schemas through reviewed migrations.

Store uploaded or generated binary content in self-hosted S3-compatible object
storage. SeaweedFS is the default for local and deployed environments; another
self-hosted compatible service requires a concrete operational reason. Keep only
metadata, ownership, object keys, checksums, and lifecycle state in the database.
Do not store file bytes or base64 payloads in relational tables. Do not select a
managed cloud storage provider unless the technical owner explicitly changes this
policy.

Object storage is private by default. Never expose storage credentials to a
client. Use short-lived presigned operations or an authorized server endpoint.
Use `$object-storage` for any upload, download, generated asset, attachment,
media, import, export, retention, or deletion workflow.

## Dependencies

Prefer installed libraries and existing patterns. Add a dependency only when it
materially simplifies a required capability and is appropriate for the selected
runtime. Do not add overlapping libraries for validation, state, HTTP access,
logging, UI primitives, or persistence without explaining the replacement plan.

## Docker And Delivery

Containerize deployable applications when the selected deployment platform uses
containers. Docker Compose is for local infrastructure and integration testing;
it is not automatically the production topology.

Never bake secrets into images or commit real credentials. Production images
must use reproducible installs, multi-stage builds where useful, non-root runtime
users when supported, and explicit health behavior.

Use `$delivery` for Docker, Compose, CI/CD, releases, and deployment work.
Production deployment and destructive infrastructure operations require explicit
user authorization.

## Development And Production Environments

Every deployable application must distinguish development from production through
validated runtime configuration. Use `APP_ENV=development` for local work and
`APP_ENV=production` for deployed processes, alongside framework-required
environment settings. Do not use development servers in production: development
uses `pnpm dev`; production builds with `pnpm build` and runs the application's
production start command.

Keep local non-secret defaults in `.env.example` and create `.env` only for local
development. Inject production configuration and secrets at runtime through the
selected host or secret store; never commit, print, or bake them into an image.

During bootstrap, choose and document the local configuration layout. Use a root
`.env` for values shared by workspace applications; add an application-owned
`.env` only when that application has genuinely distinct configuration or its
framework requires it. Create every missing local `.env` from its matching
`.env.example` without overwriting existing files. Root lifecycle commands must
explicitly load or propagate the chosen environment files to every process.
Do not assume a framework's automatic `.env` loading also configures sibling
Node, API, or worker processes.

Start local dependencies through documented, idempotent scripts. Run database
migrations once as an observable production release step, never at arbitrary app
startup. Development and test seeds may contain only safe synthetic data; never
automatically seed production. Every deployable service needs a health or
readiness check suitable for startup and post-deployment verification.

## Verification

Run verification proportional to the change:

- Run focused tests for changed behavior.
- Run lint and type checking for affected applications.
- Run builds when changing contracts, configuration, application boundaries, or
  delivery files.
- Run the full `pnpm check` and `pnpm build` before a release candidate.

Do not skip relevant verification merely because the user did not request it.
Do not run unrelated expensive suites for a small isolated change.

## Skills

- `$product-details`: guided business interview to create or improve `docs/product.md`
- `$bootstrap-project`: interview, stack proposal, approval, and safe scaffolding
- `$implement-feature`: business request to smallest complete vertical slice
- `$frontend`: pages, components, forms, client state, accessibility, and UX
- `$backend`: APIs, domain modules, authorization, integrations, and workers
- `$database`: relational models, queries, transactions, and migrations
- `$object-storage`: S3-compatible files, uploads, downloads, and lifecycle
- `$delivery`: Docker, Compose, CI/CD, release, and deployment behavior

## Completion

Report what changed, what was verified, decisions made for the documented product
trajectory, and any externally imposed constraints. Do not claim success when
required verification failed or was not possible.
