---
name: audit-project
description: Audit and remediate an OmegaForge-derived project's product alignment, architecture, code organization, code quality, security boundaries, dependencies, and verification posture. Use when the user asks to audit, review, clean up, assess codebase health, find architecture drift, repair AI-generated code that went off track, split oversized or mixed-responsibility files, or bring an implementation back into alignment with docs/product.md, AGENTS.md, and docs/ai.
---

# Audit Project

Audit the implemented project, not only its foundation documents or most recent
diff. Find evidence-backed drift and repair confirmed problems within the
authority granted by the user.

## Establish The Baseline

1. Read `AGENTS.md`, `docs/product.md`, `docs/ai/architecture.md`,
   `docs/ai/application-structure.md`, `docs/ai/interface-design.md`, and
   `docs/ai/skill-routing.md` completely.
2. Read `docs/ai/dependency-security.md` when dependencies, containers, or
   infrastructure are in scope.
3. Inspect Git status and preserve all pre-existing worktree changes. Do not
   initialize Git when it is absent.
4. Identify the selected applications, frameworks, source-organization model,
   public contracts, persistence boundaries, and available verification commands.
5. Derive expected behavior from `docs/product.md` and established tests. Do not
   turn undocumented implementation accidents into product requirements.

The current request controls mutation authority. A review-only request produces
findings without edits. An explicit audit-and-fix request authorizes safe,
behavior-preserving remediation of confirmed drift. It does not authorize a
product-behavior change, public-contract break, dependency replacement, schema
or data migration, deployment change, or destructive rewrite without separate
approval.

## Inspect The Whole Implementation

Build a project inventory before focusing on individual findings. Inspect code,
tests, configuration, and relevant documentation across every in-scope
application and package.

Audit for:

- implemented behavior that conflicts with the product brief or business rules;
- application shells, navigation, density, or page composition that conflict
  with the documented interface identity or collapse distinct audiences into a
  generic dashboard;
- application-composition, route, feature, shared-code, and framework-reserved
  directory violations;
- business logic in UI handlers, route entries, controllers, queue consumers,
  repositories, or provider adapters;
- mixed responsibilities, oversized modules, broad public surfaces, deep
  cross-feature imports, dependency cycles, and catch-all directories;
- duplicated business knowledge, validation, authorization, or state rules;
- missing input validation, failure handling, authorization, transactional
  boundaries, idempotency, or private-file controls where the workflow needs them;
- dead or unreachable code when removal can be demonstrated safely;
- dependencies or infrastructure that are unused, unsupported, unpinned, or
  inconsistent with the approved profile;
- missing focused tests for important implemented behavior and failure paths;
  and
- development, build, production-start, migration, health, and release behavior
  that contradicts the selected project profile.

Use relevant static analysis, dependency inspection, framework tools, and test
commands when they already exist. Do not add an audit framework merely to run
the audit.

## Treat File Size As A Signal

Measure unusually large source files to prioritize inspection, but never use a
line-count target as the reason for a refactor. A file with thousands of lines is
a strong signal that AI-generated work may have accumulated unrelated
responsibilities; inspect its imports, state, workflows, side effects, change
reasons, and test seams before deciding the split.

Split a file when it owns multiple workflows, changes for unrelated reasons,
contains independently testable state or I/O, crosses ownership boundaries, or
has become difficult to navigate. Decompose it along the project's established
architecture:

- keep framework route and transport entries thin;
- move recognizable business capabilities into their owning feature or module;
- keep business decisions in services, use cases, or domain modules;
- isolate persistence and external providers behind narrow project-owned
  boundaries;
- extract feature-owned UI sections with their state, validation, requests, and
  failure behavior; and
- move code to shared locations only when it is stable and genuinely
  cross-feature.

Do not split a cohesive file into arbitrary small blocks, create placeholder
folders, scatter code that changes together, or introduce abstractions whose
only purpose is reducing line count.

## Classify Findings

For each finding, record the evidence, violated source of truth, impact, and
smallest safe remediation. Classify it as:

- **Confirmed drift:** a demonstrable conflict with product, architecture,
  security, dependency, or delivery contracts;
- **Maintainability risk:** not yet incorrect, but already difficult to change,
  verify, or trace;
- **Intentional exception:** documented and justified project-specific behavior;
  or
- **Unproven concern:** insufficient evidence; report it without changing code.

Prioritize by user harm, security or data risk, behavioral correctness,
operational risk, and then maintainability. Cosmetic consistency alone is low
priority.

## Remediate Confirmed Drift

Use `docs/ai/skill-routing.md` to load only the specialist skills required by the
affected code. Apply fixes in small, coherent waves:

1. Capture the relevant existing behavior with focused tests when practical.
2. Repair ownership and dependency direction before polishing local code.
3. Preserve public behavior and contracts unless the user approved a change.
4. Split mixed-responsibility files along real feature, application, domain, and
   infrastructure boundaries.
5. Update imports, focused tests, and directly affected documentation together.
6. Run targeted checks after each risky structural change so failures remain
   attributable.

Avoid unrelated formatting, speculative abstractions, framework migrations, and
wholesale rewrites. Stop and request approval when the safe repair requires a
material product decision, irreversible data work, a public breaking change, a
new dependency, or a different approved architecture profile.

## Verify And Report

Run focused tests for repaired behavior, lint and type checking for affected
applications, and builds when contracts, configuration, or application
boundaries changed. Run dependency and production-start checks only when their
areas were audited or modified. Finish with `git diff --check` when Git exists.

Report:

- audit scope and evidence inspected;
- findings grouped by classification and priority;
- confirmed problems fixed, including every structural split and its ownership
  rationale;
- verification commands and results;
- intentional exceptions and unproven concerns left unchanged; and
- remaining risks, approval-gated work, or areas that could not be inspected.

Do not claim the project is clean when the audit was scoped, verification failed,
or relevant areas were unavailable.
