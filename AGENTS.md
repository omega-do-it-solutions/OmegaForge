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

Use [docs/ai/skill-routing.md](docs/ai/skill-routing.md) to select one primary
workflow per task stage and only the specialist skills required by the concrete
areas involved. Named skills in the current request take priority, but never
broaden the user's mutation authority.

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

## Foundation Updates

Use `$update-stack` only to bring a previously bootstrapped project's
OmegaForge-owned engineering guidance, built-in skills, and foundation state
forward from a trusted newer OmegaForge source. It is not permission to
re-bootstrap, refactor application code, upgrade dependencies, or alter product,
runtime, delivery, or data files. It must preserve the project's selected
architecture profile and custom guidance, and report unresolved merge conflicts
instead of overwriting them.

## Project Handoff Cleanup

Use `$clean-template-residue` after a derived project has a verified runnable
baseline, or later when asked to remove stale OmegaForge-facing repository
material. It must preserve the engineering foundation used by future agent work
and `$update-stack`, distinguish project policies from template community files,
and hold licenses, notices, and attribution for explicit owner review.

Cleanup is approval-gated and evidence-based. Print an exact path-level manifest
before removing or replacing anything unless the active bootstrap proposal
already approved those same actions and the files have not changed. Never treat
an OmegaForge mention alone as proof that a file is disposable.

## Application Shape

Default to `apps/web` only when one web application can safely own the UI and
server behavior. Keep server code modular so it can be extracted later.

Add `apps/api` when the backend needs an independent lifecycle, multiple clients,
substantial domain logic, complex permissions, a stable public API, independent
scaling, or many integrations. Add `apps/worker` only for asynchronous,
scheduled, retryable, or long-running work.

Add `apps/mobile` when the documented first release requires an iOS or Android
application, or a workflow genuinely needs phone capabilities such as camera,
scanning, location, notifications, or offline use. Do not create it merely
because a mobile app may be useful later.

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

## Project Audits

Use `$audit-project` when asked to inspect codebase health, repair architecture
drift, clean up AI-generated code that has gone off track, or decompose oversized
mixed-responsibility files. Audit the implemented code as well as foundation
documents. Treat file length as an inspection signal, not a splitting target;
divide code by feature ownership, workflow, state, I/O, and reasons to change.

An explicit audit-and-fix request authorizes safe behavior-preserving repairs.
Product changes, public breaking changes, dependency replacements, schema or
data migrations, deployment changes, and destructive rewrites retain their
normal approval requirements.

## Code Quality

Keep code cohesive, loosely coupled, and easy for a human to trace. Organize by
business feature, then separate UI or transport, application logic, domain rules,
and infrastructure only where those responsibilities exist.

Classify code by ownership before placing it. Application composition owns
bootstrap, global providers, session/security setup, configuration, telemetry,
and root or area layouts; routes and transport entries adapt framework input to
features; features own recognizable product capabilities; shared locations own
only stable cross-feature primitives, contracts, and domain-neutral utilities.
Do not turn `features/` into a catch-all for layouts, routers, technical
providers, configuration, or generic utilities. A provider-management screen is
still a feature; a provider that wires the whole application is not. Follow the
selected framework map in `docs/ai/application-structure.md` when bootstrapping,
adding a module, or reorganizing application code.

Apply SOLID and DRY as decision tools, not as reasons to add boilerplate. Depend
on narrow project-owned interfaces at volatile boundaries. Extract duplicated
business knowledge, but do not unify code that only looks similar and may evolve
differently.

Split a module when it owns multiple workflows, changes for unrelated reasons,
has independently testable state or I/O, or has become difficult to navigate.
Do not split code solely to satisfy a line-count target. Keep dependencies flowing
toward business logic and prevent circular or deep cross-feature imports.

Treat frontend route and page files as composition entry points, not as the
default home for an entire screen implementation. Extract a feature-owned UI
component when a section has its own responsibility, interaction, state, data
request, validation, accessibility behavior, failure state, or focused tests,
even when that component is used only once. Reuse is not a prerequisite for
component extraction. Keep page-specific components and logic with their owning
feature; reserve shared or global component locations for stable primitives and
patterns used across features. A directory named `components` is optional, but
clear component boundaries and feature ownership are mandatory.

Follow the installed frontend framework and router through `$frontend`, and
follow `$backend` for server framework modules and plugins. Preserve
framework-reserved directories: Next.js App Router's `app/` and Nuxt's `app/`
and `server/` retain their native routing and runtime meaning rather than taking
on a generic Vite-style role; Expo Router's `app/` is also its route tree.
React/Vite and Vue Router applications use an explicit application-composition
layer alongside thin router entries; Next, Nuxt, and Expo route files remain
thin framework adapters; Nest modules and Fastify plugins are feature
boundaries. Keep feature components, hooks/composables, models, API modules,
server use cases, and tests with the owning feature while reserving global
component locations for stable cross-feature UI only.

Follow the detailed code structure, SOLID, DRY, debuggability, and scalability
rules in `docs/ai/architecture.md`.

## Interface Identity

Read the `Interface Identity` section of `docs/product.md` and
`docs/ai/interface-design.md` before selecting or changing an application shell,
navigation model, content-width posture, or page density. Use
`$design-interface` when defining or revising those decisions.

Do not treat every authenticated screen as the same kind of dashboard. Internal
admin, customer self-service, public content, storefront, checkout,
collaborative workspace, and guided transactional surfaces have different user
mentalities. A mixed product must define separate application or area shells
for its distinct audiences while sharing product tokens and accessible
primitives.

For internal admin and operational surfaces, default to a persistent header and
a logical-start sidebar on wide screens, with a readable expanded mode, an
accessible collapsible icon rail where suitable, and an overlay drawer on narrow
screens. Public, customer, commerce, workspace, and guided surfaces must use the
simplest shell that fits their documented navigation depth and work rather than
inheriting the admin shell automatically.

## UI System

Use Tailwind CSS with daisyUI as the single visual component system for web
interfaces. For every new or changed page, section, modal, form, navigation,
feedback state, or other interface, check daisyUI first and use its premade
components and elements wherever they can satisfy the requirement. Compose
product-specific interfaces from daisyUI primitives before creating custom
visual elements. Create a custom visual element only when daisyUI has no suitable
component or element, and do not reproduce an existing daisyUI component with
custom markup and utility classes.

Using daisyUI class names is necessary but not sufficient for acceptable UI.
Start from the closest official daisyUI example for the installed version and
preserve or improve its visual clarity when adapting it to the product. The
rendered result must look intentional and polished, with clear surfaces and
boundaries, readable contrast, meaningful semantic colors, consistent spacing,
visible hierarchy, and coherent responsive alignment. Do not accept a pale,
ambiguous, visually broken, or unfinished component merely because it uses
daisyUI classes. Prefer daisyUI's documented variants and theme tokens before
adding one-off utility styling, and fix theme or configuration problems when a
component renders materially worse than the corresponding documentation example.

Do not install or mix another visual UI kit. Headless behavior primitives are
allowed only when daisyUI does not provide the required accessible interaction;
style them exclusively with the project's daisyUI theme and tokens.

### Composition And UX Quality

Organize each page around user tasks and meaningful data relationships, not
around whichever components are easiest to stack. Use headings, reading order,
alignment, and proximity to make groups immediately understandable. Elements
that belong together must be closer to each other than to neighboring groups.
Controls that change a region must be visually attached to that region: for
example, tabs must sit directly above their tab panels, with a smaller gap below
the tabs than above them, a clear active state, and correct tab semantics.

Keep layouts visually balanced at every supported viewport. Use appropriate
content widths, responsive grids, column spans, and alignment so a narrow stack
does not leave a large unused area without purpose. Whitespace is valuable when
it creates focus or separates groups; remove or redistribute it when it is merely
dead space caused by poor sizing or placement. Review this balance in both LTR
and RTL layouts when the product supports them.

When components are peers in the same row or grid, give their owning wrappers a
shared visual geometry: align their outer edges, headings, content start lines,
padding, and intended heights or stretches. Do not let the default geometry of
different daisyUI components, such as an accordion beside a fieldset, produce an
accidental offset. Choose the semantic element for the content, then compose it
inside a peer wrapper that preserves the row's alignment. Use a `fieldset` and
`legend` when multiple related controls genuinely form one named group; a lone
field normally belongs in a card, section, or other peer container with its own
label. Do not keep or remove meaningful semantics only to force a visual match.
When equal heights would create empty space or misrepresent different content,
align the top edges and internal start lines instead. Verify alignment in LTR,
RTL, responsive stacked layouts, and expanded and collapsed states.

Use color deliberately and professionally. Keep neutral surfaces dominant and
apply brand, accent, and semantic colors where they communicate selection,
status, priority, feedback, or an important action. Do not flood large surfaces
with competing colors or decorate every card and button, but do not make the page
so neutral that states, hierarchy, and interaction disappear. Use theme tokens
and maintain accessible contrast in every supported theme.

Avoid excessive nested boxes. Prefer one clear boundary at the owning wrapper
level, then group its internal content with spacing, headings, alignment, subtle
surface changes, or a single divider. Do not place bordered fields inside a
bordered section inside another bordered card unless each boundary represents a
distinct interaction or semantic group that users genuinely need to perceive.

For user-triggered expansion or collapse of a meaningful section, panel, or
disclosure, use a short, restrained transition so surrounding content does not
appear to jump abruptly. Do not animate every small text change, inline message,
or minor control. Preserve focus and interaction behavior, avoid delaying the
task, and honor reduced-motion preferences.

Review the complete rendered page, not only individual components. A page is not
finished when its components are locally correct but its overall grouping,
density, whitespace, color balance, hierarchy, or control-to-content
relationships are unclear.

For `apps/mobile`, use React Native primitives and project-owned mobile design
tokens. Reuse the approved brand colors and semantic meaning, but do not import
daisyUI, web DOM components, or a competing mobile UI kit by default.

Keep product-specific composed components in application code instead of editing
or duplicating library internals. Use `$frontend` and read its daisyUI reference
for any user-interface work. Inspect the rendered interface, not only its class
names, before considering UI work complete.

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

Choose dependency versions using [docs/ai/dependency-security.md](docs/ai/dependency-security.md).
Use an actively supported LTS line when the project publishes one; otherwise use
a maintained stable release. Verify the selected version against current official
support information and published security advisories instead of trusting
`latest`, an old template, or model memory. Do not introduce prerelease, end-of-
life, deprecated, or known-vulnerable direct dependencies. An exception requires
explicit technical-owner approval and a documented mitigation and removal or
upgrade plan.

Commit the package-manager lockfile, use reproducible installs, and scan the
resolved dependency graph after additions and upgrades. Do not knowingly retain
an affected version when a compatible fixed release exists, and do not release
with an unmitigated critical or high-severity production dependency finding.

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
production start command. A native mobile app is the exception: it runs through
an Expo development server and development build locally, then produces a
tested Android and/or iOS release artifact instead of a production server
process.

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
- `$design-interface`: define or revise product category, audience surfaces,
  application shells, navigation posture, and design mentality
- `$bootstrap-project`: interview, stack proposal, approval, and safe scaffolding
- `$clean-template-residue`: approval-gated removal or replacement of stale
  OmegaForge project-facing template material
- `$update-stack`: foundation-only guidance and built-in skill updates for a
  previously bootstrapped project
- `$implement-feature`: business request to smallest complete vertical slice
- `$audit-project`: whole-project code and architecture audit with safe,
  evidence-backed remediation
- `$frontend`: pages, components, forms, client state, accessibility, and UX
- `$backend`: APIs, domain modules, authorization, integrations, and workers
- `$database`: relational models, queries, transactions, and migrations
- `$object-storage`: S3-compatible files, uploads, downloads, and lifecycle
- `$delivery`: Docker, Compose, CI/CD, release, and deployment behavior

## Completion

Report what changed, what was verified, decisions made for the documented product
trajectory, and any externally imposed constraints. Do not claim success when
required verification failed or was not possible.
