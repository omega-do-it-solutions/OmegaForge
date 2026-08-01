# Project Bootstrap Contract

Use this contract when creating or resuming a project from OmegaForge. Startup
has two distinct stages: decide and approve the technical profile, then scaffold
an up-and-running baseline. The agent must not write application code before the
approval gate.

A later change to OmegaForge itself is framework maintenance, not bootstrap.

## Mutation Classes

### Protected

Bootstrap work must not modify, replace, move, or delete:

- `.git/**`
- `AGENTS.md`
- `CLAUDE.md`
- `.agents/skills/**`
- `.claude/skills`
- `docs/ai/bootstrap.md`
- Every section of `docs/ai/architecture.md` except `Selected Project Profile`

Do not create alternate copies of agent rules or skills. A protected-file change
requires a separate framework-maintenance task and technical review.

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
- Initialize nested Git repositories or alter repository history.
- Discard, reset, clean, or overwrite unexplained working-tree changes.
- Introduce npm, Yarn, Bun, or another JavaScript lockfile.
- Hardcode secrets, production credentials, or customer data.
- Push, deploy, provision production infrastructure, or run shared migrations.
- Replace daisyUI with another visual system.
- Replace the self-hosted S3-compatible storage policy or store file bytes in
  the database.
- Create speculative applications, packages, services, or abstractions.
- Start feature implementation before the technical profile is approved.

## Startup Roadmap

### Phase 0: Preflight

1. Read `AGENTS.md`, this contract, `docs/product.md`, and
   `docs/ai/architecture.md`.
2. Confirm the repository root and run `git status --short`.
3. Confirm pnpm and the selected framework's required runtime are available.
4. Inspect every intended scaffold target before running a generator.
5. Stop and report an unexplained change, non-empty target, nested repository,
   or competing lockfile. For known partial bootstrap work, resume from the first
   incomplete phase instead of regenerating.

### Phase 1: Capture Business Needs

Interview the business owner in plain language, one material question at a time.
Establish:

- product purpose, users, and main workflows;
- primary and secondary brand colors as six-digit hex codes, for example
  `#1D4ED8` and `#F97316`;
- public pages versus authenticated or internal screens;
- roles, permissions, payments, and irreversible actions;
- expected clients such as web, mobile, partner API, or automation;
- search-engine visibility and content-rendering needs;
- integrations, webhooks, scheduled or long-running work;
- structured data, uploads, generated files, and retention needs;
- expected scale, deployment constraints, and success criteria.

Update only `docs/product.md`. Do not ask the business owner to choose frameworks
and do not scaffold code yet.

### Phase 2: Decide The Technical Profile

The agent owns the technical recommendation. Choose the smallest shape that fits
the known product instead of defaulting every project to the same stack.

#### Frontend decision

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

#### Backend decision

- Use no independent API when the product is mostly static or when a modest
  full-stack Nuxt/Next application can safely own its server behavior.
- Add `apps/api` when multiple clients share business behavior, permissions or
  domain logic are substantial, a stable external API is required, integrations
  are significant, or the backend needs independent deployment or scaling.
- Select the backend framework based on the approved runtime, domain complexity,
  ecosystem needs, and operational model. Explain the concrete reason; do not
  choose by habit.
- Add `apps/worker` only for durable scheduled, retryable, queue-based, or
  long-running work. Do not run such work inside web request handlers.

#### Data and delivery decision

- Select a relational database when structured business records exist and name
  the ORM or query layer only if it is needed.
- Select self-hosted S3-compatible object storage when users or the system
  create files. SeaweedFS is the default locally and in deployed environments;
  document the production topology, backup, and recovery plan rather than
  selecting a managed cloud storage provider.
- Decide Docker, CI, and deployment from the actual runtime and hosting needs,
  while keeping deployable applications independently containerizable.

Framework limitations and version-specific behavior must be verified against
official documentation before the profile is proposed.

### Phase 3: Print The Proposal And Wait

Before any project mutation, print this reviewable profile:

```text
PROJECT TECHNICAL PROFILE

Product shape:
Frontend:
Rendering mode:
Backend:
Worker:
Database and data access:
Object storage:
Authentication:
Brand colors:
External integrations:
Package manager:
UI system:
Local infrastructure:
CI:
Deployment target:

Why this fits:
- ...

Why larger alternatives were rejected:
- ...

Applications to create:
- ...

Existing files to edit (targeted only):
- path: exact intended change

Assumptions and risks:
- ...
```

End with a direct approval request. The agent may revise the proposal after
feedback, but must not scaffold, install, or implement until the technical owner
explicitly approves the profile and mutation list.

The profile must state the supplied primary and secondary hex codes, including
any accessibility or contrast risk the agent identified.

### Phase 4: Set Project Identity

After approval, apply targeted project-name and identifier edits to root metadata,
Compose, and the environment example. Preserve framework-owned content. Write
the final project README in Phase 9 after the runnable baseline is verified.

### Phase 5: Scaffold The Boilerplate

Generate only the approved applications into verified empty directories. Use
pnpm-compatible, non-interactive options where safe. Prevent generators from
installing dependencies, initializing Git, or overwriting root files.

The boilerplate must be runnable, but contain only foundation work: framework
entry points, health behavior where applicable, Tailwind and daisyUI setup,
environment validation, approved database/storage connectivity, Docker support,
and basic verification. Define one central daisyUI product theme that maps the
approved primary and secondary brand color codes to the corresponding semantic
theme tokens. Do not scatter those raw values through UI components. Do not
implement product features in this phase.

### Phase 6: Integrate The Profile

Connect only the approved database, object storage, Docker, CI, API, and worker
pieces. Keep secrets in environment variables. Update only `Selected Project
Profile` in `docs/ai/architecture.md`.

### Phase 7: Install Once

Run `pnpm install` from the repository root. Resolve workspace integration
without creating additional lockfiles.

### Phase 8: Verify

Run relevant application checks, then root lint, typecheck, tests, build, and
Compose validation where available. Confirm:

- no nested `.git` directory or extra lockfile exists;
- protected files and architecture rules are unchanged;
- targeted files retained their required content;
- the selected daisyUI theme centrally uses the approved primary and secondary
  color codes and no component duplicates them as raw values;
- `README.md` describes the bootstrapped product rather than OmegaForge, and its
  setup and commands match the generated applications;
- no secret or local runtime data is staged;
- `.claude/skills` still resolves;
- the runnable applications exactly match the approved profile.

### Phase 9: Write The Project README

Replace the template README with a project-owned README. It must identify the
product and its purpose, explain the selected application shape, list real
prerequisites and non-secret environment setup, document local development,
verification, and operational commands that actually exist, and cover any
required local services or migrations.

Do not retain OmegaForge's template overview, template-copying instructions,
generic application-shape examples, or framework-specific commands that do not
apply to the bootstrapped project. Do not invent deployment instructions,
integrations, features, or commands that were not created. Never include
secrets. This README rewrite is a deliberate project-identity change, not a
generator-owned file replacement.

### Phase 10: Hand Off

Report the approved profile, created and targeted-edited files, commands run,
verification results, local run commands, assumptions, and remaining risks.
Include `git status` and a concise diff summary. Do not push or deploy.

## Approval And Resume Rules

Technical approval after Phase 3 is the normal startup gate. Additional approval
is required only for destructive changes, production access, replacing a fixed
framework choice, or changing an established business rule.

The workflow is idempotent: inspect before every phase, skip completed work, and
merge partial work deliberately. Existing files are evidence, not permission to
overwrite them. The selected profile and Git diff are the bootstrap record; do
not add a separate state file unless later automation demonstrates a need.
