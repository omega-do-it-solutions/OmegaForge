# Foundation-Only Update Scope

Use this reference with `$update-stack`. Its scope is intentionally narrower
than bootstrap.

## Allowed Scope

Consider only these OmegaForge-owned paths:

- `AGENTS.md`
- `CLAUDE.md`, only when it remains the canonical `@AGENTS.md` forwarding file
- built-in files under `.agents/skills/`
- `.claude/skills`, only when it remains the canonical link to `.agents/skills`
- `docs/ai/bootstrap.md`
- `docs/ai/application-structure.md`
- `docs/ai/interface-design.md`
- `docs/ai/skill-routing.md`
- `docs/ai/foundation-state.md`, containing only update provenance and local
  foundation exceptions
- generic engineering rules in `docs/ai/architecture.md`

The source may add a new built-in skill or a new generic `docs/ai/` foundation
document. Add it only after verifying that it is source-owned and does not
overlap a target product document.

## Never Change In This Operation

Never change or generate:

- `apps/**`, `packages/**`, `docker/**`, `scripts/**`, CI, or deployment files
- `docs/product.md`, product roadmaps, refactor notes, product README, or
  product changelog
- `package.json`, workspace configuration, dependency manifests, lockfiles, or
  environment files
- database schemas, migrations, seeds, queues, object storage, local volumes,
  or Git metadata
- target-only skills and documentation

Do not rename, move, or delete any target file as part of an update-stack run.

## Merge Rules

- A trusted source must identify a release, commit, or other immutable revision.
  If the user explicitly requests uncommitted source foundation changes too,
  list those changes separately in the plan and state record.
- A target file has a known baseline only when its content can be tied to a
  specific older OmegaForge revision. A matching package version alone is not
  enough. Without that baseline, add only missing, no-collision source-owned
  files and leave all replacements or merges unchanged for review.
- Replace a source-owned file only when it exactly matches a known earlier
  OmegaForge baseline and has no target-local change.
- Use a three-way merge only when the source baseline is known and the merge is
  clean and reviewable. Preserve target-specific additions.
- For `docs/ai/architecture.md`, preserve every approved profile decision.
  Add a newly required descriptive profile field only when existing
  documentation or code proves it; otherwise mark it as needing a later approved
  architecture decision rather than inventing a product change.
- For `AGENTS.md`, preserve project-specific instructions while incorporating
  non-conflicting newer OmegaForge rules.
- For `.agents/skills`, update only skill directories present in the source.
  Never remove an extra target skill. Validate every skill copied or merged.
- When a conflict cannot be resolved without choosing between project-specific
  and newer foundation policy, leave the target file unchanged and report the
  exact conflict.

## Foundation State Record

When source and baseline are known, maintain this minimal target-only record:

```md
# OmegaForge Foundation State

- Last applied source: OmegaForge <release or revision>
- Previous known baseline: OmegaForge <release or revision>
- Applied on: YYYY-MM-DD
- Managed units: <source-owned docs and skill paths updated or added>
- Preserved local exceptions: <target-specific profile or guidance kept intact>
```

Do not use the record to track application releases, package versions, runtime
configuration, product requirements, or deployment state.

## Target Verification

Capture target Git status before and after the update when possible. The final
set of changed paths must be a subset of the allowed scope. A dirty application
worktree is not a blocker if the update does not overlap it; do not normalize or
hide its existing changes.
