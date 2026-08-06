---
name: update-stack
description: Safely update a previously bootstrapped OmegaForge project's OmegaForge-owned engineering guidance, built-in skills, and foundation state from a trusted newer source. Use for foundation documentation and skill upgrades only; never use it for application code, runtime dependencies, infrastructure, product requirements, data, or deployment changes.
---

# Update Stack

Update only OmegaForge's portable foundation. This is a maintenance operation,
not feature work, a dependency upgrade, or a re-bootstrap.

## Required Context

Before changing anything, identify the trusted newer OmegaForge source and the
existing project target. Read their `AGENTS.md`, `docs/ai/architecture.md`, and
relevant skill trees. Read the target's `docs/product.md` as context only; do
not edit it. Inspect Git status in both repositories when Git exists.

Read [references/managed-scope.md](references/managed-scope.md) completely.
It defines the allowed scope and the merge rules for project-specific profile
content.

Never infer the target from a broad parent directory. If the user has not named
one and there is no unambiguous project already in the task context, ask for the
target path before writing.

## Workflow

### 1. Establish Safe Provenance

Confirm that the source is an OmegaForge foundation and that the target was
bootstrapped from OmegaForge or has compatible foundation files. Record the
source version and immutable revision when available. Include uncommitted source
foundation changes only when the user explicitly asked to receive them, and list
them separately from the immutable revision.

Inspect the target's history, version markers, and file content for a known
OmegaForge baseline. Do not treat a matching package-manager version alone as
proof that every stack-owned file can be overwritten.

Without a known baseline for a target file, do not replace or merge it. Only add
missing, no-collision source-owned files, and report all other candidates as
unresolved. Never guess an older source version.

### 2. Audit Before Writing

Build a file-by-file update matrix:

- **Add:** a missing, source-owned foundation file.
- **Replace:** a target file that exactly matches a known older OmegaForge
  baseline.
- **Merge:** a source-owned file with target-specific additions that can be
  preserved through a clean, reviewable three-way merge.
- **Skip and report:** a target file whose ownership or safe merge base is
  unclear.

Print the matrix as a `FOUNDATION UPDATE PLAN` before writing. Require explicit
approval unless the user has already explicitly requested the applied update in
the current request. The approval must cover only the listed foundation paths;
do not broaden scope from it.

Do not delete target-only skills, documentation, or files. Do not use a force
copy, `git reset`, `git checkout`, `git clean`, a generator, a package-manager
install, or a migration command.

### 3. Apply Only Foundation Changes

Update only files in the allowed scope from the reference. Preserve the selected
project profile in `docs/ai/architecture.md`; merge new framework rules around
it. Only add a newly required, descriptive profile field when it follows from
existing approved profile or source evidence; otherwise report it for a separate
architecture decision. Do not rewrite the full document.

For built-in skills, update source-owned files and add missing source-owned
skills or references. Preserve target-only custom skills. Repair
`.claude/skills` only when it is the canonical link to `.agents/skills`; do not
replace a custom Claude skill layout.

Stop before writing a conflicted file. Explain the conflict and ask for a
decision rather than discarding project-specific engineering rules.

When a source revision and prior baseline are known, add or update
`docs/ai/foundation-state.md` as a foundation-only record of the source,
previous baseline, managed paths, and preserved local exceptions. It is not a
runtime configuration file and must not describe product behavior.

### 4. Verify Scope And Integrity

Verify that every changed target path belongs to the allowed scope. Confirm that
no path under `apps/`, `packages/`, product documentation, runtime
configuration, dependency manifests, lockfiles, delivery configuration, or
data/migration directories changed. Preserve pre-existing dirty worktree changes
and distinguish them from this update.

Run `git diff --check` when Git exists. Run the skill validator for every added
or changed skill. Do not run application builds, migrations, installs, or
feature tests for this foundation-only update unless a changed foundation file
directly requires a safe documentation-only validation.

## Report

State the source and target, source version/commit when known, updated and added
foundation files, skipped or conflicted files, verification performed, and an
explicit statement that no product/application/dependency/infrastructure files
were changed. Do not claim the target application's code structure was migrated;
that is a separate approved refactor.
