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

The mutation classes, decision rules, and phases in `docs/ai/bootstrap.md` are
mandatory. This skill is not permission to alter protected framework files.

## Workflow

### 1. Preflight

Confirm the repository root and inspect `git status --short`, existing lockfiles,
workspace configuration, and intended application directories. Stop and report
unexplained changes or a non-empty scaffold target. For known partial bootstrap
work, identify the first incomplete phase and resume without regenerating files.

### 2. Interview The Business Owner

Ask one plain-language question at a time. Capture product purpose, users,
workflows, public versus internal screens, roles and permissions, payments or
irreversible actions, clients, SEO needs, integrations, background work, data,
files, and expected outcomes. Update `docs/product.md` while preserving its
required headings. Do not ask the business owner to choose frameworks.

### 3. Decide And Print The Technical Profile

Derive the smallest suitable stack using Phase 2 of the bootstrap contract.
Choose deliberately between a Vite-based Vue or React SPA, a full-stack Nuxt or
Next.js application, a rendering-focused Nuxt or Next.js frontend with a separate
API, and a worker where durable background work requires it.

Verify version-sensitive framework claims using official documentation. Print
the complete `PROJECT TECHNICAL PROFILE` from Phase 3, including reasons,
rejected larger alternatives, applications to create, and every targeted file
edit. daisyUI and the S3-compatible file contract are fixed choices.

End with a direct approval request. Do not edit configuration, install packages,
run generators, or write application code before explicit technical approval.

### 4. Bootstrap The Runnable Baseline

After approval, follow Phases 4 through 7 in order.
Keep protected files untouched, use targeted edits instead of whole-file
replacement, and run generators only in verified empty application directories.
Use pnpm from the repository root and never permit a generator to initialize Git
or create another lockfile.

Create only an up-and-running technical baseline. Do not implement product
features during bootstrap.

### 5. Verify And Report

Follow Phases 8 and 9. Verify runnable applications, protected files, workspace
checks, Compose configuration, the skills link, lockfiles, and secret hygiene.
Report generated files separately from targeted edits and state anything that
could not be verified. Do not push or deploy.

## Operating Boundaries

- Prefer an idempotent resume over rerunning a generator.
- Do not create unused applications, services, packages, or empty architecture.
- Do not overwrite an existing `.env` file.
- Do not use force flags to bypass conflicts.
- Ask for additional approval only when the bootstrap contract identifies a gate.
