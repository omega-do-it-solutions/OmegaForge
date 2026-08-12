---
name: bootstrap-project
description: Safely start or resume a product repository derived from OmegaForge. Use when creating a new project from the GitHub template, interviewing the business owner, deciding the initial application shape and stack, presenting the technical profile for approval, scaffolding runnable applications, or completing an interrupted bootstrap.
---

# Bootstrap Project

Bootstrap the smallest approved product shape without letting generators take
over the repository or starting feature implementation prematurely.

## Required Context

Before any action, read these files completely:

1. `AGENTS.md`
2. `docs/ai/bootstrap.md`
3. `docs/product.md`
4. `docs/ai/architecture.md`
5. `docs/ai/dependency-security.md`
6. `docs/ai/skill-routing.md`
7. `docs/ai/interface-design.md`
8. `docs/ai/application-structure.md`

The mutation classes, decision rules, and phases in `docs/ai/bootstrap.md` are
mandatory. This skill is not permission to alter protected framework files.

## Workflow

### 1. Preflight

Confirm the repository root, existing lockfiles, workspace configuration, and
intended application directories. Inspect `git status --short` only when root
Git metadata exists; otherwise record its absence and continue. Never initialize
or alter Git during bootstrap. Stop for unexplained changes when Git exists or a
non-empty scaffold target in every workspace. For known partial bootstrap work,
identify the first incomplete phase and resume without regenerating files.

### 2. Interview The Business Owner

Read the product document first and derive the technical posture from its
business facts. Do not conduct a technical interview. Ask at most one
plain-language question only when product behavior is ambiguous or contradictory.
Infer scale, availability, recovery, hosting, region, provider, and data-flow
defaults; present them in the technical profile for approval instead of asking a
non-technical owner for estimates. Capture product purpose, users, workflows,
public versus internal screens, roles and permissions, payments or irreversible
actions, known business risks and the harm they must avoid, browser, iOS,
Android, or other first-release clients, any phone-specific needs, SEO needs,
integrations, background work, data, files, expected outcomes, and primary and
secondary brand colors as hex codes. Update
`docs/product.md` while preserving its required headings. Do not ask the business
owner to choose frameworks. Capture and confirm the product category, audience
exposure, distinct first-release surfaces, and work posture in `Interface
Identity`. Derive each surface's shell from `docs/ai/interface-design.md`; do
not ask the owner to choose layout components.

### 3. Decide And Print The Technical Profile

Derive the smallest suitable stack using Phase 2 of the bootstrap contract.
Default to React when neither the user nor the existing project establishes a
concrete Vue advantage: choose a Vite React SPA, full-stack Next.js application,
or rendering-focused Next.js frontend according to the product's needs. Select
Vue or Nuxt only for an explicit user choice or a concrete established advantage,
and explain that advantage in the profile. Add an API and worker only where their
durable responsibilities require them.

Select the matching source organization from
`docs/ai/application-structure.md` at the same time as the framework. The
technical profile must name it and distinguish application composition, route or
transport entries, business features/modules, and shared code. Preserve
framework-owned route/runtime directories rather than applying a generic tree to
Next.js or Nuxt. For an independent Node API, select Fastify when explicit plugin
composition is the smallest fit and NestJS when its module and dependency-
injection model materially helps the documented domain; if Nest uses Fastify as
its adapter, it still follows Nest module ownership.

Add `apps/mobile` only when the documented first release needs iOS, Android, or
phone-specific capabilities. Default to React Native with Expo for one shared
iOS and Android application, with TypeScript and Expo Router; select separate
native applications only for a documented platform-specific need. Apply the
mobile foundation in `docs/ai/architecture.md`, give mobile its own line in the
technical profile, and do not publish to an app store or create store
credentials.

Treat Expo Router's `app/` as the mobile route tree and apply its matching
feature ownership map from `docs/ai/application-structure.md`; do not add a
competing generic route tree or put app-wide navigation setup in a business
feature.

Classify the product as small, medium, large, or huge from the documented scope,
then derive real-time delivery and data-flow architecture from that forecast.
State the conservative operating defaults, whether bounded polling, SSE,
WebSockets, or a durable event flow is selected, why it fits, and why larger
alternatives are not yet needed.

Verify framework support lines, version compatibility, and current security
advisories using authoritative current sources. Prefer supported LTS releases
when available and maintained stable releases otherwise; do not propose a
prerelease, end-of-life, unsupported, deprecated, or known-affected direct
dependency. Print the complete `PROJECT TECHNICAL PROFILE` from Phase 3,
including dependency version posture, approved brand colors, interface identity
and shells, reasons, rejected larger alternatives, applications to create,
every targeted file edit, and the exact post-verification template cleanup
manifest.
daisyUI and the S3-compatible file contract are fixed choices. Resolve known
material launch, growth, and business-risk safeguards before the profile.
Describe their business outcome and the foundation established now instead of
listing unowned technical assumptions, undecided technical risks, or unresolved
future choices.

End with a direct approval request. Do not edit configuration, install packages,
run generators, or write application code before explicit technical approval.

### 4. Bootstrap The Runnable Baseline

After approval, follow Phases 4 through 7 in order.
Keep protected files untouched, use targeted edits instead of whole-file
replacement, and run generators only in verified empty application directories.
Use pnpm from the repository root and never permit a generator to initialize Git
or create another lockfile.

Create only an up-and-running technical baseline. Configure a central daisyUI
theme whose `primary` and `secondary` tokens use the approved brand colors and
establish only the approved application or area shells required by the
first-release surfaces. Run the approved local-service, migration, and seed
commands where they exist, then
start and smoke-test the application before handoff. Do not invent product data
or implement product features during bootstrap. Provide separate validated
development, build, and production-start commands for server applications, plus
development-build and Android/iOS release-artifact commands for mobile, with a
production-safe migration path and no automatic production seed behavior. Create
every missing root or application `.env` from its matching `.env.example`,
explicitly wire those files into every spawned process, and verify their
configuration before handoff.

After a generator runs, establish only the concrete application-composition,
route/transport, feature/module, and shared files required by the approved
baseline. Do not create placeholder trees. Keep Next.js and Nuxt framework
directories in their native roles, and do not label global layouts, routers,
technical providers, or configuration as features.

### 5. Verify, Clean Up, And Report

Follow Phases 8 through 11. Confirm the local dependencies, migrations, and
app startup actually succeed; do not merely document commands. Keep the managed
development process available when the environment supports it, otherwise stop
it cleanly after the smoke test and report the restart command. After
verification, start each built server application once with its production
command, health-check it, and stop that production-mode process cleanly. Build
the selected mobile release artifacts and report available device verification.
Run the ecosystem's supported dependency scanner against the committed lockfile;
critical or high-severity production findings block completion, and all other
findings must be reviewed and reported under the dependency security contract.
Then replace the template README with a project-owned README that
reflects the generated product, real commands, and local setup; it must not
retain OmegaForge onboarding or template instructions.

Before handoff, read and apply `$clean-template-residue`. Include its exact
path-level manifest in the technical proposal so unchanged approved template
community files and repository metadata can be replaced or removed without a
second approval. Preserve the engineering foundation, and hold licenses,
notices, attribution, changed candidates, and unlisted actions unless the owner
explicitly approves their treatment. Report generated files separately from
targeted edits and cleanup actions, and state anything that could not be
verified. Do not push or deploy.

## Operating Boundaries

- Prefer an idempotent resume over rerunning a generator.
- Do not create unused applications, services, packages, or empty architecture.
- Do not overwrite an existing `.env` file.
- Do not use force flags to bypass conflicts.
- Do not remove the retained engineering foundation or legal and attribution
  files as template residue.
- Ask for additional approval only when the bootstrap contract identifies a gate.
