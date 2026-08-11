---
name: implement-feature
description: Implement product features and behavior-changing fixes from business-focused prompts as the smallest complete vertical slice. Use for requests that add or change user-visible workflows, business rules, API behavior, stored state, or interactions spanning multiple technical layers.
---

# Implement Feature

## Establish The Behavior

1. Read `AGENTS.md` and the relevant parts of `docs/product.md`.
2. Read `docs/ai/skill-routing.md` and select only the specialists required by
   concrete affected areas.
3. Read the code structure sections of `docs/ai/architecture.md` when the change
   adds a module, crosses layers, or introduces a new boundary.
4. Inspect the owning feature, its tests, and adjacent established patterns.
5. Translate the request into observable acceptance behavior and failure cases.
6. Ask only when ambiguity affects business behavior, permissions, money,
   external side effects, security, or irreversible data.

Do not turn routine technical decisions into questions for a business user.

## Select The Smallest Shape

- Change the existing owning application when its boundary remains appropriate.
- Load `$frontend`, `$backend`, `$database`, `$object-storage`, or `$delivery`
  according to `docs/ai/skill-routing.md` only when that area is involved.
- Add a new application or package only when the boundary rules in
  `docs/ai/architecture.md` require it.
- Before adding or upgrading a dependency, read
  `docs/ai/dependency-security.md`. Use a compatible supported LTS release when
  available and a maintained stable release otherwise; verify current advisories
  and do not introduce prerelease, end-of-life, unsupported, deprecated, or
  known-affected direct versions.
- Prefer a direct implementation over a generic framework built for imagined
  future features.

## Implement A Vertical Slice

Apply only the steps the feature needs:

1. Define or update input validation and typed contracts.
2. Implement business decisions in the owning service, use case, or module.
3. Add persistence through the established data-access boundary.
4. Isolate external calls and make retryable side effects idempotent.
5. Keep transport and UI handlers focused on validation, authorization,
   delegation, and response mapping.
6. Expose useful loading, empty, success, and failure states to the user.
7. Split independent responsibilities while keeping code that changes together
   close to its owning feature.
8. Keep dependencies flowing toward business logic and provider details behind
   narrow project-owned interfaces.
9. Update focused tests for the changed behavior and important failures.

Avoid unrelated refactors. If a small prerequisite refactor is necessary, keep
it explicit and limited to enabling the requested behavior.

## Verify And Report

Run focused tests plus lint and type checking for affected applications. Run a
build when contracts, configuration, application boundaries, or delivery files
change. When dependencies change, scan the committed lockfile with the
ecosystem's supported vulnerability tool and apply the blocking and exception
rules in `docs/ai/dependency-security.md`.

Report:

- Observable behavior delivered
- Important implementation decisions
- Verification commands and results
- Assumptions and remaining risks
