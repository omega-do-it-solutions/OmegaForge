# OmegaForge

A lean, stack-flexible foundation for projects implemented by coding agents from
business-focused prompts.

The framework standardizes repository boundaries, feature implementation, data
handling, object storage, verification, and delivery without forcing every
project to use the same frontend or backend framework.

Release history is maintained in [CHANGELOG.md](CHANGELOG.md).

## Documentation

Read the complete step-by-step manual at
[forge.omegado.com](https://forge.omegado.com).

## Origin And Credits

OmegaForge is an original project created by Emad Moghimi and Mo. MIKAELI for
Omega Do IT Solutions. It is maintained as the company's reusable foundation
for AI-developed products.

- Emad Moghimi — Creator
- Mo. MIKAELI — Creator
- Omega Do IT Solutions — Project owner and maintainer

## Responsibility Boundaries

OmegaForge stays stack-flexible by separating the reusable foundation from the
product it creates.

| OmegaForge owns | The generated project owns |
| --- | --- |
| Engineering contracts and built-in skills | Application code and business behavior |
| Product discovery and technical-profile workflow | Approved frameworks, runtimes, and dependencies |
| Bootstrap safety and approval boundaries | Project-specific Dockerfiles and Compose topology |
| Portable architecture and security guidance | CI/CD, hosting, production infrastructure, and operations |
| Foundation update rules | Product releases, data, and deployment decisions |

## What OmegaForge Does Not Predefine

OmegaForge does not impose a fixed application stack, application Dockerfile,
deployment topology, CI provider, database, or hosting platform. Bootstrap
derives those choices from the completed product brief, presents the technical
profile and exact intended mutations, and waits for owner approval before
scaffolding them.

The root `compose.yaml` provides only the optional local SeaweedFS service used
by the foundation's S3-compatible storage contract. It is not an application or
production deployment topology.

## Start A Project

1. Create or unpack the product repository from the OmegaForge template. Git is
   optional and is not required for bootstrap.
2. For a guided, non-technical conversation that builds the product brief, ask
   Codex to use `$product-details`. It updates `docs/product.md` one small
   business topic at a time, including product category, audience surfaces,
   interface identity, and confirmed primary and secondary brand colors.
3. Ask Codex to use `$bootstrap-project`.
4. Codex prints the recommended technical profile, its reasons, and the exact
   files it intends to create or edit. No code is generated yet.
5. The technical owner approves or revises the proposal.
6. Only after approval, Codex scaffolds the runnable baseline, installs with
   pnpm, starts required local services, runs applicable migrations and seeds,
   then starts and smoke-tests the project before handoff.

The mutation boundaries and resumable startup phases are defined in
`docs/ai/bootstrap.md`. Bootstrap does not include product features, push, or
deployment.

## Define Or Change The Interface Identity

Ask Codex to use `$design-interface` when defining or revising whether a product
is an internal operations tool, customer portal, public service, storefront,
collaborative workspace, guided transaction, or a mix. It records each audience
surface in `docs/product.md` and derives its application shell, navigation,
content width, density, responsive behavior, and direction from
[`docs/ai/interface-design.md`](docs/ai/interface-design.md).

Internal admin surfaces default to a persistent header and responsive,
collapsible sidebar. Public, customer, commerce, checkout, and guided surfaces
receive their own context-appropriate shells instead of inheriting a generic
dashboard layout. Mixed products may share theme tokens and components while
keeping distinct audience shells.

## Update An Existing OmegaForge Foundation

For a project created from an earlier OmegaForge version, ask Codex to use
`$update-stack` and name the trusted newer OmegaForge source or release. It
audits the foundation baseline and updates only OmegaForge-owned engineering
guidance, built-in skills, and foundation metadata. It preserves application and
package code, product documentation, dependencies, infrastructure, and existing
worktree changes; it does not migrate application structure or upgrade runtime
dependencies.

## Clean Up A Derived Project

After bootstrap verifies the runnable baseline and writes the project README,
`$clean-template-residue` turns the repository's remaining project-facing
metadata over to the derived product. It inventories OmegaForge-specific
community files, GitHub templates, ownership metadata, release instructions,
and redundant placeholders, then presents exact replacements and removals for
approval.

The cleanup preserves `AGENTS.md`, built-in skills, and `docs/ai` as the ongoing
engineering foundation. It also holds licenses, notices, and attribution for an
explicit owner decision instead of deleting legal material automatically.

## Audit An Existing Project

Ask Codex to use `$audit-project` to inspect an OmegaForge-derived project's
implemented code, product alignment, architecture, ownership boundaries,
dependencies, and verification posture. The workflow repairs confirmed,
behavior-preserving drift when fixes are authorized and reports approval-gated
or unproven concerns separately.

Oversized files are inspection signals rather than automatic violations. A file
that has accumulated unrelated workflows, state, I/O, or reasons to change is
split along the feature and application boundaries in
`docs/ai/application-structure.md`, not into arbitrary line-count chunks.

## Application Shapes

Small products can use one full-stack web application:

```text
apps/web
```

Products with an independent backend can add an API, and only add a worker when
asynchronous processing is required:

```text
apps/web
apps/api
apps/worker    # optional
```

## Commands

```sh
pnpm dev
pnpm lint
pnpm typecheck
pnpm test
pnpm check
pnpm build

pnpm storage:up
pnpm storage:logs
pnpm storage:down
```

Recursive workspace commands run only scripts that an application or package
actually defines.

## Object Storage

Application code targets an S3-compatible contract. The included Compose service
uses SeaweedFS for local development and integration testing:

```sh
cp .env.example .env
pnpm storage:up
```

The local S3 endpoint is `http://localhost:18333`. SeaweedFS is the default
self-hosted S3-compatible service for both local and deployed environments.
Production deployment requires an explicit SeaweedFS topology for capacity,
replication, backup, monitoring, upgrades, security, and recovery.

## Agent Compatibility

`AGENTS.md` is canonical. `CLAUDE.md` imports it for Claude Code. Skills are
authored once under `.agents/skills`; `.claude/skills` points to the same skills.
Current Grok tooling can consume the AGENTS/Claude-compatible setup without a
third copy. OpenAI-specific `agents/openai.yaml` files contain presentation
metadata only; portable behavior stays in `SKILL.md`. Skill selection and
composition are defined in [docs/ai/skill-routing.md](docs/ai/skill-routing.md).

## Community And Support

- Read [CONTRIBUTING.md](CONTRIBUTING.md) before proposing a change.
- Use [SUPPORT.md](SUPPORT.md) to choose the right support channel.
- Report security concerns according to [SECURITY.md](SECURITY.md).
- See [RELEASING.md](RELEASING.md) for the version and release process.

## Built With OmegaForge

Public downstream projects may be listed here with their owners' permission.
Using OmegaForge does not require a project to disclose its source code or its
use of the foundation. To propose a public listing, open a pull request that
includes the project name, public URL, and the OmegaForge version used.

## License

OmegaForge is licensed under the [Apache License 2.0](LICENSE). Projects created
from OmegaForge may use their owners' chosen licenses, while any OmegaForge
material they retain remains subject to the Apache License 2.0 and its notice
requirements.
