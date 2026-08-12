# Skill Routing

Select skills from current business intent and the concrete project areas the
task affects. Do not ask a non-technical owner to choose skills, and do not load
specialists for capabilities that are only possible future work.

## Routing Order

1. Honor a skill explicitly named in the current request.
2. Select one primary workflow for each requested task stage.
3. Add only the specialist skills required by affected code, data, files, or
   delivery behavior.
4. Re-evaluate routing when inspection reveals a concrete additional area.
5. Follow the repository's source-of-truth order when instructions conflict.

A workflow skill coordinates each stage. Specialist skills contribute their
area rules; they do not broaden mutation authority or replace the primary
workflow. Sequential stages may use different workflows, but do not run
competing primary workflows for the same work.

## Primary Workflows

| User intent or repository signal | Primary skill |
| --- | --- |
| Describe, clarify, or complete a product brief | `$product-details` |
| Define or revise product category, audience surfaces, application shells, navigation posture, or design mentality | `$design-interface` |
| Start or resume a project from the OmegaForge foundation | `$bootstrap-project` |
| Remove or replace stale OmegaForge template material after bootstrap | `$clean-template-residue` |
| Update only OmegaForge-owned guidance in an existing derived project | `$update-stack` |
| Add a feature or behavior-changing fix | `$implement-feature` |
| Audit codebase health, repair architecture drift, clean up AI-generated code, or split oversized mixed-responsibility files | `$audit-project` |

Use `$product-details` to discover the complete business brief and
`$design-interface` to focus on or revise its interface identity. Do not use
`$bootstrap-project` for features, `$update-stack` for runtime or application
maintenance, `$clean-template-residue` to remove the retained engineering
foundation or make licensing decisions, or `$audit-project` as permission to
redesign product behavior.

## Specialist Activation

| Concrete affected area | Add this skill |
| --- | --- |
| Pages, components, forms, client state, accessibility, responsive behavior, or browser/mobile UX | `$frontend` |
| APIs, trusted business workflows, authorization, integrations, queues, schedules, or workers | `$backend` |
| Relational models, constraints, queries, transactions, repositories, or migrations | `$database` |
| Uploads, downloads, generated assets, attachments, media, imports, exports, retention, or file deletion | `$object-storage` |
| Docker, Compose, CI/CD, release preparation, migrations as release steps, health behavior, or deployment | `$delivery` |

Load multiple specialists only for a task that actually crosses those areas. For
example, an upload workflow may combine `$implement-feature`, `$frontend`,
`$backend`, `$database`, and `$object-storage`; a frontend-only layout repair
does not need the database or delivery skills.

## Product-Signal Activation

During product discovery and bootstrap, infer technical needs from facts already
captured in `docs/product.md`:

| Product fact | Routing effect |
| --- | --- |
| Browser, iOS, or Android interface | Apply `$frontend` when that interface is created or changed |
| Internal, public, customer, commerce, workspace, guided, or mixed audience surface | Apply `$design-interface` when its identity or shell is defined or revised; add `$frontend` only when code changes |
| Structured records and relational workflows | Apply `$database` when persistence is designed or changed |
| User-owned or generated binary files | Apply `$object-storage` for their complete lifecycle |
| Independent API, multiple clients, substantial permissions, or provider workflows | Apply `$backend` to the independent trusted-server boundary |
| Asynchronous, scheduled, retryable, or long-running work | Apply `$backend`; add `$delivery` when its runtime or release path is created |
| Selected container, CI, hosting, migration, or production-start work | Apply `$delivery` only after the project profile selects that behavior |

Product facts activate relevant reasoning; they do not force a framework,
provider, Docker topology, or deployment platform.

## Audit Expansion

`$audit-project` begins with whole-project inspection and then activates
specialists from evidence:

- a large page mixing form state, requests, and unrelated visual sections adds
  `$frontend` for remediation;
- a controller containing business decisions adds `$backend`;
- unsafe transaction or migration behavior adds `$database`;
- public file access or leaked storage credentials adds `$object-storage`; and
- project-specific container or release drift adds `$delivery`.

File size alone does not select a specialist or dictate a split. Ownership,
responsibility, behavior, state, and I/O determine the repair boundary.

## Routing Report

State the primary workflow and added specialists when routing materially affects
scope, approval, or verification. Do not burden the user with an internal routing
transcript for a simple single-skill task.
