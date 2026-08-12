---
name: clean-template-residue
description: Inspect and safely remove or replace OmegaForge-specific template residue in a derived project after bootstrap or before repository handoff. Use when asked to clean, finalize, detach, de-template, or remove boilerplate, branding, community files, GitHub metadata, placeholders, or stale OmegaForge project identity while preserving the reusable engineering foundation and handling licenses and notices conservatively.
---

# Clean Template Residue

Convert a bootstrapped repository from template-facing to project-facing without
discarding project work, legal material, or the foundation used for future agent
work and `$update-stack` updates.

## Required Context

Before proposing any mutation:

1. Read `AGENTS.md`, `docs/product.md`, and `README.md` when they exist.
2. Read the mutation classes and final phases in `docs/ai/bootstrap.md`.
3. Read `docs/ai/foundation-state.md` when it exists.
4. Inspect root metadata, `.github/**`, placeholder files, and Git status when
   root Git metadata exists.
5. Confirm that the repository is a derived product. If its README, package
   identity, contribution process, and release metadata show that it is the
   OmegaForge source repository itself, stop without cleaning it.

Do not require a clean whole worktree. Stop only when an intended cleanup path
has unexplained changes or its ownership cannot be established safely.

## Ownership Classes

Classify every candidate before proposing an action.

### Preserve The Foundation

Preserve these by default even though they legitimately mention OmegaForge:

- `AGENTS.md` and compatible forwarding files such as `CLAUDE.md`;
- `.agents/skills/**` and `.claude/skills`;
- generic engineering guidance under `docs/ai/**`, including foundation state;
- `docs/product.md`, application code, tests, runtime configuration, lockfiles,
  and delivery files; and
- Git metadata and local environment files.

Do not call a file residue merely because it originated in OmegaForge. Retain
anything that governs, builds, runs, tests, updates, or documents the derived
project unless a separate authorized workflow replaces it.

### Project Handoff Candidates

Inspect these paths and close variants for stale template ownership:

- `README.md`, package metadata, repository URLs, badges, and project identity;
- `CHANGELOG.md`, `CONTRIBUTING.md`, `SECURITY.md`, `SUPPORT.md`, and
  `RELEASING.md`;
- `.github/CODEOWNERS`, pull-request templates, issue templates, funding or
  support links, and OmegaForge-only release automation; and
- `.gitkeep` or equivalent placeholders in directories that now contain real
  project files.

Replace a file when the derived project needs that contract and accurate
project facts are available. Remove it when it is unchanged template-only
community or release material and the project does not need a replacement.
Retain it for review when it contains project-specific edits, useful policy, or
facts that cannot be reconstructed safely. Never invent maintainers, support
addresses, disclosure channels, release processes, repository URLs, or license
terms merely to make a replacement look complete.

### Hold Legal And Attribution Material

Treat `LICENSE`, `NOTICE`, copyright statements, attribution files, and package
license fields as a separate legal class. Do not delete, relocate, rewrite, or
reinterpret them without explicit owner direction about the derived project's
licensing and retained OmegaForge material. A private or closed-source project
is not by itself evidence that these files may be removed.

If that direction is absent, retain the legal files, flag any inconsistent
package metadata, and continue with independently safe cleanup actions.

## Workflow

### 1. Establish Evidence

Identify the known OmegaForge source revision from foundation state, Git
history, package metadata, or an owner-supplied source. Compare candidate
content with that source when available. Otherwise use exact branding,
template-specific links, contributor identities, release instructions, and
project facts as evidence; do not infer ownership from filenames alone.

Search case-insensitively for `OmegaForge`, OmegaForge repository and manual
URLs, OmegaForge maintainer identities, and template-only instructions. Exclude
dependencies, build output, caches, generated artifacts, and Git internals.
Classify every remaining match as expected foundation or attribution, stale
project-facing residue, project-owned context, or uncertain.

### 2. Print The Cleanup Manifest

Before changing files, print `TEMPLATE CLEANUP MANIFEST` with one row per
candidate:

| Path | Class | Evidence | Proposed action | Recovery |
| --- | --- | --- | --- | --- |

Use only `preserve`, `replace`, `remove`, or `hold for owner review` as actions.
List exact paths rather than globs and describe replacement content precisely.
State which expected OmegaForge references will remain and why.

Wait for approval of the exact manifest before removing or replacing anything.
A second approval is unnecessary only when the active bootstrap proposal already
approved the same path-level actions and the candidate contents have not changed
since that approval.

### 3. Apply The Approved Actions

Apply only approved rows. Preserve unrelated work and do not broaden a cleanup
request into application, dependency, infrastructure, or product changes.

- Use targeted edits for replacements and explicit path deletion for removals.
- Remove a placeholder only when real tracked content makes it redundant.
- Leave held and legal-class files unchanged.
- Reinspect a candidate immediately before mutation; stop on content drift.
- Never use `git clean`, resets, force flags, broad recursive deletion, or an
  unresolved glob.

Do not initialize, alter, push, or deploy Git history as part of cleanup.

### 4. Verify The Handoff

After applying the manifest:

1. Review Git status and the exact diff when Git metadata exists; otherwise
   inspect every changed path directly.
2. Repeat the OmegaForge-reference search and classify all remaining matches.
3. Confirm `AGENTS.md`, built-in skills, `docs/ai/**`, and `.claude/skills`
   remain present and usable.
4. Confirm the README and package identity describe the derived project rather
   than the template.
5. Check links from changed Markdown and GitHub metadata.
6. Parse changed structured files and run focused repository checks when the
   cleanup changed configuration rather than documentation alone.
7. Confirm no secret, local runtime data, application file, or unapproved path
   entered the diff.

Report removed, replaced, preserved, and held files separately. State whether
removed files are recoverable from version control and call out unresolved
licensing or ownership decisions without claiming legal clearance.
