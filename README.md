# OmegaForge

A lean, stack-flexible foundation for projects implemented by coding agents from
business-focused prompts.

The framework standardizes repository boundaries, feature implementation, data
handling, object storage, verification, and delivery without forcing every
project to use the same frontend or backend framework.

## Start A Project

1. Create the product repository from the OmegaForge GitHub template and clone
   it locally.
2. Open Codex at the repository root and ask it to use `$bootstrap-project`.
3. Answer the business questions, including primary and secondary brand colors
   as hex codes; Codex records them in `docs/product.md` and uses them for the
   initial daisyUI theme.
4. Codex prints the recommended technical profile, its reasons, and the exact
   files it intends to create or edit. No code is generated yet.
5. The technical owner approves or revises the proposal.
6. Only after approval, Codex scaffolds the runnable boilerplate, installs with
   pnpm, and runs the framework checks.

The mutation boundaries and resumable startup phases are defined in
`docs/ai/bootstrap.md`. Bootstrap does not include product features, push, or
deployment.

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
metadata only; portable behavior stays in `SKILL.md`.
