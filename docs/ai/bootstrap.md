# Project Bootstrap Contract

Use this contract when creating or resuming a project from OmegaForge. Startup
has two distinct stages: decide and approve the technical profile, then scaffold
an up-and-running baseline. The agent must not write application code before the
approval gate.

A later change to OmegaForge itself is framework maintenance, not bootstrap.
For a project already bootstrapped from OmegaForge, use `$update-stack` for a
foundation-only update of allowed guidance, built-in skills, and foundation
state. It must not re-bootstrap or alter product, application, runtime,
dependency, delivery, or data files.

## Mutation Classes

### Protected

Bootstrap work must not modify, replace, move, or delete:

- `.git/**`
- `AGENTS.md`
- `CLAUDE.md`
- `.agents/skills/**`
- `.claude/skills`
- `docs/ai/bootstrap.md`
- `docs/ai/application-structure.md`
- `docs/ai/interface-design.md`
- `docs/ai/skill-routing.md`
- `docs/ai/foundation-state.md`
- Every section of `docs/ai/architecture.md` except `Selected Project Profile`

Do not create alternate copies of agent rules or skills. A protected-file change
requires a separate framework-maintenance task and technical review.

Git metadata is optional. When a root `.git` directory exists, bootstrap may
inspect it but must not modify it. When it is absent, bootstrap must continue
normally and must not initialize a repository, create a nested repository, or
treat the absence as a verification blocker.

### Targeted Edit Only

Read these files before editing, change only the necessary fields or sections,
and preserve unrelated content. Never replace the whole file with a generator's
version.

| Path | Allowed startup changes | Preserve |
| --- | --- | --- |
| `docs/product.md` | Fill product-specific content | Required headings and unresolved questions |
| `docs/ai/architecture.md` | Edit only `Selected Project Profile` | Every architecture rule below it |
| `package.json` | Project name, description, and necessary root scripts | `private`, `packageManager`, workspace checks, and storage commands |
| `pnpm-workspace.yaml` | Add required globs or catalog entries | Existing `apps/*` and `packages/*` coverage |
| `compose.yaml` | Change project identifier and add approved local services | Self-hosted SeaweedFS profile and S3-compatible contract |
| `.env.example` | Change project identifier and append non-secret variables | Existing storage variables and still-used keys |
| `.gitignore` | Append new generated or local-only paths | Existing secret, dependency, build, and runtime exclusions |
| `.dockerignore` | Append build-context exclusions | Existing dependency, VCS, secret, and runtime exclusions |
| `.npmrc` | Add a required pnpm setting | Existing pnpm behavior |
| `README.md` | Replace template-oriented content with a project-specific README after the runnable baseline is verified | Accurate project setup, operations, and contributor guidance |

`pnpm-lock.yaml` is tool-managed. Change it only by running pnpm from the
repository root; never edit it manually. Stop for technical approval if a
targeted edit would remove or invalidate an existing rule.

### Generated Or Application-Owned

These paths may be created and changed when included in the approved profile:

- `apps/web/**`
- `apps/api/**`
- `apps/worker/**`
- `apps/mobile/**`
- `packages/<name>/**`, only for a stable contract or behavior used by at least
  two applications
- App-specific files under `docker/**`
- Repeatable automation under `scripts/**`
- Approved CI configuration

Run official generators only against a missing or empty target directory. Do
not use force flags. Disable generator-owned Git initialization and prefer
`--no-install`, then install once from the repository root with pnpm. Delete a
directory's `.gitkeep` only when real content replaces it.

Never accept a generated root `package.json`, workspace file, lockfile,
`.gitignore`, README, or agent instruction file. Merge only the required values
through targeted edits.

### Post-Verification Handoff

After the runnable baseline and project README are verified, use
`$clean-template-residue` to apply only the exact handoff actions approved in
the technical profile. Candidate paths include project-facing community and
release files such as `CHANGELOG.md`, `CONTRIBUTING.md`, `SECURITY.md`,
`SUPPORT.md`, `RELEASING.md`, `.github/CODEOWNERS`, issue and pull-request
templates, OmegaForge-only repository metadata, and redundant placeholders.

Classify every candidate from its content and ownership rather than its filename.
Replace it when the derived project needs an accurate project-owned equivalent,
remove it only when it is unchanged template-only residue, and hold it when it
contains project changes or uncertain policy. `LICENSE`, `NOTICE`, attribution,
and package license fields remain outside automatic cleanup and require explicit
owner direction. Protected foundation paths remain protected throughout handoff.

### Local Only

These may change locally but must not be committed:

- `.env` and other files containing real credentials
- `node_modules/`
- build output, caches, logs, temporary files, and local runtime data
- object-storage or database volumes and dumps containing real data

Create `.env` from `.env.example` only if `.env` does not exist. Never overwrite
an environment file or print its secrets.

## Hard Boundaries

During bootstrap, never:

- Force a scaffold into a non-empty directory.
- Initialize, alter, or create nested Git repositories during bootstrap.
- Discard, reset, clean, or overwrite unexplained working-tree changes.
- Introduce npm, Yarn, Bun, or another JavaScript lockfile.
- Hardcode secrets, production credentials, or customer data.
- Push, deploy, provision production infrastructure, or run shared migrations.
- Replace daisyUI with another visual system.
- Replace the self-hosted S3-compatible storage policy or store file bytes in
  the database.
- Create speculative applications, packages, services, or abstractions.
- Start feature implementation before the technical profile is approved.
- Remove retained engineering guidance or built-in skills as template residue.
- Delete or rewrite license, notice, copyright, or attribution material without
  explicit owner direction.

## Startup Roadmap

### Phase 0: Preflight

1. Read `AGENTS.md`, this contract, `docs/product.md`,
   `docs/ai/architecture.md`, `docs/ai/skill-routing.md`,
   `docs/ai/interface-design.md`, and `docs/ai/application-structure.md`.
2. Confirm the repository root. When `.git` exists, run `git status --short`;
   otherwise record that Git metadata is absent and continue.
3. Confirm pnpm and the selected framework's required runtime are available.
4. Inspect every intended scaffold target before running a generator.
5. When Git metadata exists, stop and report an unexplained working-tree change.
   In every workspace, stop for a non-empty scaffold target, nested repository,
   or competing lockfile. The absence of Git metadata is not a reason to stop.
   For known partial bootstrap work, resume from the first incomplete phase
   instead of regenerating.

### Phase 1: Capture Business Needs

Read `docs/product.md` and derive the product posture from its business facts.
Do not run a broad technical interview. Ask at most one plain-language question
only when the documented product behavior is ambiguous or contradictory. Never
ask the owner to estimate technical capacity, event volume, latency, hosting,
uptime, recovery, data residency, providers, or architecture. Establish from the
product description:

- product purpose, users, and main workflows;
- product category, audience exposure, and each distinct first-release surface,
  including whether its work is operational, self-service, content-led,
  commerce-oriented, collaborative, or guided;
- first-release browser, iOS, Android, partner, or automation clients, and any
  phone-specific workflow need such as camera, scanning, location,
  notifications, or offline work;
- known business, customer, legal, trust, safety, data-quality, and provider
  risks, plus the outcome or harm the product must avoid;
- future business direction, including known customer, operational, market, and
  regulatory needs that should influence today's foundation;
- primary and secondary brand colors as six-digit hex codes, for example
  `#1D4ED8` and `#F97316`;
- public pages versus authenticated or internal screens;
- roles, permissions, payments, and irreversible actions;
- expected clients such as web, mobile, partner API, or automation;
- search-engine visibility and content-rendering needs;
- integrations, webhooks, scheduled or long-running work;
- structured data, uploads, generated files, and retention needs;
- expected users, records, requests, event volume, peak periods, data history,
  retention, and freshness needs at launch and as the product grows;
- expected scale, deployment constraints, and success criteria;
- development workflow and production operational constraints, including any
  required hosting, access, uptime, backup, or release expectations.

Update only `docs/product.md`. Do not ask the business owner to choose frameworks
and do not scaffold code yet.

### Phase 2: Decide The Technical Profile

The agent owns the technical recommendation. Choose the smallest shape that fits
the known product instead of defaulting every project to the same stack.

Treat known future business direction and documented business risks as current
architecture input. Choose the required technologies, safeguards, extensible
boundaries, operational posture, and launch defaults before presenting the
profile; do not label foreseeable decisions as "later," "unresolved,"
or unowned technical assumptions or risks. Infer a small, medium, large, or
huge scale forecast from the documented workflows, users, integrations, data,
and future direction. Select conservative technical, operational, availability,
recovery, hosting, provider, and regional defaults appropriate to that forecast;
present them for approval rather than requesting technical estimates. Establish
the foundation now, but do not build future product workflows, fake integrations,
or empty abstractions.

This does not suppress a documented product risk. Turn each material business,
customer, legal, trust, safety, data-quality, or provider risk into an owned
launch safeguard and describe its business outcome, rather than presenting it
as an undecided technical risk.

#### Dependency version decision

- Follow `docs/ai/dependency-security.md` for every runtime, framework, package,
  build tool, base image, and infrastructure component in the proposed profile.
- Prefer an actively supported LTS line when the ecosystem publishes one;
  otherwise choose a maintained stable release line. Select a compatible patched
  release within that line.
- Verify current support status, release compatibility, and published security
  advisories from current sources before proposing exact versions. Do not trust
  `latest`, generator defaults, template examples, or remembered version numbers.
- Do not propose alpha, beta, release-candidate, canary, nightly, preview,
  experimental, deprecated, end-of-life, unsupported, or known-affected direct
  dependencies. Stop for explicit technical-owner approval if a documented
  product need has no safe supported alternative.
- State the chosen runtime and framework support lines in the technical profile,
  together with the point-in-time security verification that supports them.

#### Frontend decision

- Use the confirmed `Interface Identity` and `docs/ai/interface-design.md` to
  derive a shell, navigation posture, content width, and density for each
  surface. Do not let framework defaults or a generic dashboard starter decide
  whether the product looks like an admin console, customer portal, storefront,
  public service, workspace, or guided flow.
- A mixed product must identify separate public, customer, checkout, and staff
  shells where those surfaces exist. Share product tokens and primitives without
  forcing their navigation or density into one universal layout.
- React is the default frontend choice when the product has no existing
  framework constraint or explicit user preference. Prefer a React SPA built
  with Vite for an authenticated internal admin, dashboard, or back-office UI
  when SEO and server rendering have no value and the backend is separate.
- Prefer Next.js for React when public pages need server or hybrid rendering,
  SEO, content pre-rendering, or server-side composition. A small single-client
  product may use Next.js as a full-stack web application when its server work
  is request/response oriented and can share a deployment lifecycle with the
  UI.
- Choose Vue and Nuxt only when the user explicitly requests them or there is a
  concrete advantage such as an established Vue codebase, a Vue-skilled team,
  a required Vue/Nuxt integration, or a compatible existing component system.
  A generic preference for Vue templates or an agent's subjective assessment of
  a simpler mental model is not sufficient.
- When Nuxt is selected, the technical profile must name the concrete advantage
  and explain why React and Next.js do not meet it as well. Otherwise select the
  corresponding React option.
- A separate API does not automatically forbid Nuxt or Next.js. Keep one only
  when its rendering, routing, or backend-for-frontend benefits are still useful;
  otherwise choose the simpler Vite SPA.
- Use Tailwind CSS with daisyUI for every selected web frontend.
- Select and name the matching source-organization convention from
  `docs/ai/application-structure.md`. Preserve framework-owned route and runtime
  directories; do not leave application shells, routers, technical providers,
  or configuration mislabeled as business features.

#### Mobile decision

- Add `apps/mobile` only when the documented first release needs an iOS or
  Android client, or when a workflow needs phone capabilities. Do not scaffold
  a mobile app for a hypothetical future channel.
- Default to one React Native application using Expo for a shared iOS and
  Android product, with TypeScript and Expo Router. Choose separate
  platform-native applications only when a documented capability, platform
  policy, or existing native code makes the cross-platform approach unsuitable;
  explain that concrete reason.
- Use the mobile foundation in `docs/ai/architecture.md`: Axios and TanStack
  Query for server state, Zustand only for shared client-only state, React Hook
  Form with Zod, CASL UI checks, `expo-secure-store` for small auth secrets,
  native tokenized components, and React Native Testing Library. Install each
  dependency only when its product capability is in scope.
- Apply the Expo Router source organization from
  `docs/ai/application-structure.md`: its `app/` directory remains the mobile
  route tree, while feature behavior sits in sibling feature-owned modules.
- When a mobile client shares product data or server behavior, give it an
  explicit authenticated server contract. Add or retain `apps/api` when that
  shared behavior cannot safely remain inside a web-only server lifecycle.
- Treat store accounts, signing, and store publication as separate owner
  authorization. Bootstrap may create and run the local mobile baseline, but
  must not publish an app or create store credentials.

#### Backend decision

- Use no independent API when the product is mostly static or when a modest
  full-stack Nuxt/Next application can safely own its server behavior.
- Add `apps/api` when multiple clients share business behavior, permissions or
  domain logic are substantial, a stable external API is required, integrations
  are significant, or the backend needs independent deployment or scaling.
- Select the backend framework and source organization based on the approved
  runtime, domain complexity, ecosystem needs, and operational model. For a
  direct Node API, prefer Fastify when a lean explicit plugin composition is the
  smallest fit; select NestJS when its module, dependency-injection, and
  integration model materially improves a substantial domain. Explain the
  concrete reason; do not choose by habit. NestJS using the Fastify adapter still
  follows Nest module ownership.
- Add `apps/worker` only for durable scheduled, retryable, queue-based, or
  long-running work. Do not run such work inside web request handlers.

#### Data flow and real-time decision

- Use ordinary request/response and bounded polling when the business does not
  require updates to appear while a user is viewing a screen.
- Use SSE when connected clients need timely, one-way server-to-browser updates,
  such as live shipment status, dispatch exceptions, progress, or operational
  alerts. SSE is a delivery mechanism, not a replacement for durable backend
  event processing.
- Use WebSockets only when the product requires bidirectional real-time client
  messages, such as collaboration, presence, or interactive control. Do not use
  them merely to refresh a dashboard.
- Add a durable event flow and worker when a state change must survive retries,
  outages, independent consumers, scheduled processing, or request termination.
  Use transactional outbox or equivalent durable publication for database-backed
  events, idempotent consumers, bounded retries, dead-letter visibility, and
  backpressure. Do not add Kafka, an event bus, or streaming infrastructure
  without documented volume, reliability, or independent-consumer needs.
- Choose data partitioning, indexes, retention, archiving, aggregation, and
  pagination from the stated or inferred record volume, access patterns,
  freshness target, and reporting needs. Explain the selected approach in
  business terms.

#### Data and delivery decision

- Select a relational database when structured business records exist and name
  the ORM or query layer only if it is needed.
- Select self-hosted S3-compatible object storage when users or the system
  create files. SeaweedFS is the default locally and in deployed environments;
  document the production topology, backup, and recovery plan rather than
  selecting a managed cloud storage provider.
- Decide Docker, CI, and deployment from the actual runtime and hosting needs,
  while keeping deployable applications independently containerizable.
- Every deployable application must define development and production runtime
  commands, validated `APP_ENV` configuration, health/readiness behavior, and a
  production-safe release path. Development uses the development server;
  server production uses a built artifact and production start command. Native
  mobile production uses an Android and/or iOS release artifact, not a server
  start command.
- Local database services, migrations, and safe synthetic seeds may support
  development. Production migrations run once as an observable release step;
  production must never run seeds automatically or run migrations opportunistically
  during normal application startup.

Framework limitations, support status, version compatibility, and security
advisories must be verified from current authoritative sources before the profile
is proposed.

### Phase 3: Print The Proposal And Wait

Before any project mutation, print this reviewable profile:

```text
PROJECT TECHNICAL PROFILE

Product shape:
Interface identity:
Application shells (per audience surface):
Frontend:
Mobile:
Rendering mode:
Backend:
Application source organization (per application):
Worker:
Database and data access:
Object storage:
Authentication:
Brand colors:
External integrations:
Package manager:
Dependency version posture:
UI system:
Frontend foundation:
Scale forecast:
Data flow and real-time delivery:
Capacity and data lifecycle:
Local infrastructure:
Local configuration layout:
Product trajectory and future readiness:
Bootstrap runtime commands:
Development runtime:
Production release:
CI:
Deployment target:
Template residue cleanup:
- path: preserve, replace, remove, or hold for owner review; evidence

Why this fits:
- ...

Why larger alternatives were rejected:
- ...

Applications to create:
- ...

Existing files to edit (targeted only):
- path: exact intended change

```

End with a direct approval request. The agent may revise the proposal after
feedback, but must not scaffold, install, or implement until the technical owner
explicitly approves the profile and mutation list.

The profile must state the supplied primary and secondary hex codes, including
any accessibility or contrast risk the agent identified.
It must name the confirmed product category, audience exposure, first-release
surfaces, work posture, and selected shell and navigation model for each surface.
It must explain any intentional difference between public, customer, checkout,
and staff areas without asking the owner to choose CSS or layout primitives.
When `Mobile` is selected, it must state the iOS and Android targets, the chosen
mobile approach, the phone-specific capabilities in scope, and the server
contract that supports them.
It must also list the expected bootstrap runtime commands, including only the
database, migration, seed, local-service, and application-start commands that
the approved profile actually requires. It must identify the development command,
server production build and start commands, mobile development-build and release
artifact commands when applicable, production migration behavior, health or
readiness endpoint where applicable, and how production secrets are injected.
It must name every root or application configuration file and state how each
running process receives its development configuration.
The `Product trajectory and future readiness` section must use business language
to state the known future outcome and the concrete foundation established now.
It must not defer a material product or technical decision as an assumption or
risk.
The `Scale forecast`, `Data flow and real-time delivery`, and `Capacity and data
lifecycle` sections must state the inferred small, medium, large, or huge tier;
the selected default volume and freshness outcome; delivery and durability
pattern; scaling boundary; and why polling, SSE, WebSockets, or a durable event
flow was selected or rejected. They must not ask the owner for technical
estimates.
The `Template residue cleanup` section must classify exact project-facing files
as preserve, replace, remove, or hold for owner review. It must preserve the
foundation paths and keep legal and attribution files unchanged unless the owner
explicitly directs their treatment. These actions are part of the technical
approval only when listed path by path.

### Phase 4: Set Project Identity

After approval, apply targeted project-name and identifier edits to root metadata,
Compose, and the environment example. Preserve framework-owned content. Write
the final project README in Phase 9 after the runnable baseline is verified.

### Phase 5: Scaffold The Boilerplate

Generate only the approved applications into verified empty directories. Use
pnpm-compatible, non-interactive options where safe. Prevent generators from
installing dependencies, initializing Git, or overwriting root files.

The boilerplate must be runnable, but contain only foundation work: framework
entry points, health behavior where applicable, Tailwind and daisyUI setup for
web, mobile token setup for native applications, environment validation,
approved database/storage connectivity, Docker support where applicable, and
basic verification. Establish only the approved application or area shells
required by documented first-release surfaces; include their responsive
navigation behavior but no invented feature pages, metrics, or sample product
data. Define one central daisyUI product theme that maps the
approved primary and secondary brand color codes to the corresponding semantic
web theme tokens, and map those colors to the mobile token layer when a mobile
application exists. Do not scatter those raw values through UI components. Do
not implement product features in this phase. For each server application,
provide distinct development, build, and production-start commands; never use a
development server as the production command. For a native mobile application,
provide its development-server command, Android/iOS development-build command,
and release-artifact build command instead. Create a matching `.env.example` at
every approved configuration location. Install the approved frontend foundation
libraries only when their corresponding product capability is in scope; do not
add unused packages merely for a hypothetical future feature.

After a generator runs, establish only the concrete files needed by the approved
source organization. Preserve framework-owned route and runtime directories;
create the application-composition, route or transport, feature/module, and
shared boundaries only where the baseline has a real responsibility. Do not
scaffold empty `features`, `pages`, `components`, `controllers`, `services`, or
`repositories` folders merely to imitate a directory tree.

### Phase 6: Integrate The Profile

Connect only the approved database, object storage, Docker, CI, API, and worker
pieces. Keep secrets in environment variables. Update only `Selected Project
Profile` in `docs/ai/architecture.md`. When the profile has a database or other
local dependency, add idempotent root scripts for the required lifecycle, such
as `db:up`, `db:down`, `db:migrate`, and `db:seed`. Do not add a migration or
seed command when no baseline schema or seed data exists. Validate `APP_ENV` and
all required configuration at process startup. Keep local defaults in `.env.example`;
production configuration and secrets must be injected outside the repository.
Root lifecycle commands must explicitly load or propagate the chosen root and
application environment files to every spawned application process; do not rely
on one framework's automatic environment loading to configure a sibling API or
worker.

### Phase 7: Install And Provision The Local Baseline

Run `pnpm install` from the repository root. Resolve workspace integration
without creating additional lockfiles. At every approved root or application
configuration location, create `.env` from its matching `.env.example` only if
the `.env` does not already exist. Do not overwrite existing environment files
or duplicate shared values into application files without a documented need.
Inspect the committed lockfile with the package manager's supported vulnerability
scanner and confirm direct dependencies match the approved stable or LTS support
lines. Critical or high-severity production findings block bootstrap; review and
report every remaining finding rather than silently accepting it. Apply the
exception process in `docs/ai/dependency-security.md` when no safe supported
alternative exists.
Start every approved local dependency through its documented root command, wait
for its health check, then run the required migrations and seed scripts. Run a
seed only when the approved baseline defines one; bootstrap must not invent
product records or feature behavior merely to seed data.

### Phase 8: Verify And Start The Project

Run relevant application checks, then root lint, typecheck, tests, build, and
Compose validation where available. Start the project with its documented root
development command, normally `pnpm dev`, as a managed background process.
Wait for a health endpoint or a successful application response and verify that
it can connect to every required local dependency. Starting the process is
required; documenting the command without running it is not sufficient.

When `apps/mobile` is approved, start its development command and verify the
mobile bundle can launch. Run it on an available Android emulator, iOS simulator,
or physical device when one is available; otherwise report that device-level
verification was unavailable rather than claiming it passed.

After the development smoke test, start each built server application once with
its production start command and non-secret production-equivalent local
configuration. Verify its health or readiness response, then stop that
production-mode process cleanly. For a native mobile application, build the
approved Android and/or iOS release artifact and report the available emulator,
simulator, or device verification. A successful build alone does not validate a
server production startup contract or a mobile release artifact.

Keep the successfully started development process available to the person
bootstrapping while the agent session can manage it. If the environment cannot
retain a managed process, stop it cleanly after the smoke test and report the
exact command that starts it. Confirm:

- no nested `.git` directory or extra lockfile exists; when root Git metadata
  exists, its status was reviewed, otherwise its absence was recorded;
- protected files and architecture rules are unchanged; when Git metadata is
  absent, verify this through targeted file inspection rather than a Git diff;
- targeted files retained their required content;
- every approved local `.env` file exists, and root lifecycle commands provide
  its required configuration to every web, API, worker, and mobile process;
- approved local services are healthy, and every applicable migration and seed
  command completed successfully;
- the application started successfully and its health or readiness check passed;
- each approved mobile baseline started successfully, with its available
  emulator, simulator, or device verification reported separately;
- server production builds and production start commands were smoke-tested
  without development-only settings, mobile release artifacts were built and
  their device verification was reported, and production seeds are not part of
  the release path;
- the selected daisyUI theme centrally uses the approved primary and secondary
  color codes and no component duplicates them as raw values;
- every created application or area shell matches the documented interface
  identity, including wide and narrow navigation posture and LTR or RTL logical
  placement where applicable;
- no secret or local runtime data is staged when Git metadata exists, or present
  in files intended for handoff when it does not;
- `.claude/skills` still resolves;
- each application follows its approved source organization, with global
  composition and route/transport code distinct from business features/modules;
- the runnable applications exactly match the approved profile.

### Phase 9: Write The Project README

Replace the template README with a project-owned README. It must identify the
product and its purpose, explain the selected application shape, list real
prerequisites and non-secret environment setup, document local development,
verification, and operational commands that actually exist, and cover any
required local services, migrations, seeds, and startup health checks.

Document the local configuration layout, every required `.env.example` and
local `.env` location, and how root commands make shared settings available to
each application. Do not ask a developer to manually export a local environment
file before ordinary development commands work.

Document development and production separately. State server production build
and start commands, native mobile development and release-artifact commands,
runtime configuration and secret-injection expectations, health or readiness
check where applicable, and the one-shot migration release step. Do not document
a production seed command or imply that a development server runs in production.

Do not retain OmegaForge's template overview, template-copying instructions,
generic application-shape examples, or framework-specific commands that do not
apply to the bootstrapped project. Do not invent deployment instructions,
integrations, features, or commands that were not created. Never include
secrets. This README rewrite is a deliberate project-identity change, not a
generator-owned file replacement.

### Phase 10: Clean Template Residue

Read and apply `$clean-template-residue`. Reinspect every candidate and apply
only the path-level replacements and removals approved in Phase 3 whose contents
have not drifted. If cleanup was omitted from the proposal, a new candidate is
discovered, or a candidate changed after approval, print the cleanup manifest
and wait for approval before mutating those paths.

Preserve the reusable engineering foundation and leave legal or attribution
material unchanged without explicit owner direction. Verify that the final
README, package identity, and project-facing metadata describe the derived
project, then classify every remaining OmegaForge reference as expected
foundation, required attribution, project context, or unresolved residue.

### Phase 11: Hand Off

Report the approved profile, created and targeted-edited files, commands run,
verification results, the running-process state or the exact restart command,
template files removed or replaced, foundation and legal files retained, product
trajectory decisions made, and any externally imposed constraints. Include
`git status` and a concise diff summary when Git metadata exists; otherwise state
that the workspace has no Git metadata and summarize inspected file changes. Do
not push or deploy.

## Approval And Resume Rules

Technical approval after Phase 3 is the normal startup gate. Additional approval
is required only for destructive changes, production access, replacing a fixed
framework choice, or changing an established business rule. Exact cleanup
deletions included in the approved Phase 3 manifest do not need a second
approval; new, changed, ambiguous, or previously unlisted cleanup actions do.

The workflow is idempotent: inspect before every phase, skip completed work, and
merge partial work deliberately. Existing files are evidence, not permission to
overwrite them. The selected profile and Git diff are the bootstrap record; do
not add a separate state file unless later automation demonstrates a need.
