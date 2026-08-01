# Engineering Contract

## Purpose

This repository is a reusable technical foundation for AI-developed products.
Treat user prompts as business intent and choose implementation details from the
existing project architecture, this contract, and the relevant project skills.

Do not require users to name frameworks, layers, patterns, or libraries. Ask a
question only when different answers would materially change business behavior,
permissions, money, external side effects, security, or irreversible data.

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

Use `$bootstrap-project` when starting or resuming a repository from this
template. Read `docs/ai/bootstrap.md` completely before changing any project
file. Its protected, targeted-edit, generated, and local-only mutation classes
are mandatory.

Capture business requirements first. The agent must decide and print the
smallest suitable technical profile, explain the choices and rejected larger
alternatives, list exact intended file mutations, and wait for technical-owner
approval. Only after approval may it scaffold a runnable boilerplate. Generators
may write only into verified empty application directories and must never
replace root framework files. Bootstrap does not include product features.

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

- `$bootstrap-project`: interview, stack proposal, approval, and safe scaffolding
- `$implement-feature`: business request to smallest complete vertical slice
- `$frontend`: pages, components, forms, client state, accessibility, and UX
- `$backend`: APIs, domain modules, authorization, integrations, and workers
- `$database`: relational models, queries, transactions, and migrations
- `$object-storage`: S3-compatible files, uploads, downloads, and lifecycle
- `$delivery`: Docker, Compose, CI/CD, release, and deployment behavior

## Completion

Report what changed, what was verified, assumptions made, and remaining risks.
Do not claim success when required verification failed or was not possible.
