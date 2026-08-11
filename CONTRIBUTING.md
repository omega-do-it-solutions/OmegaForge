# Contributing To OmegaForge

Thank you for helping improve OmegaForge. Contributions should strengthen its
portable engineering foundation without turning it into a fixed-stack starter
application.

## Before You Start

1. Read [README.md](README.md), [AGENTS.md](AGENTS.md), and the
   [public manual](https://forge.omegado.com).
2. Search existing issues before opening a new one.
3. Open an issue before a substantial change so its purpose and foundation
   scope can be agreed before implementation.
4. Do not include credentials, customer data, private prompts, or proprietary
   downstream application code in an issue or pull request.

Security concerns must follow [SECURITY.md](SECURITY.md) instead of the public
issue tracker.

## Foundation Boundaries

Contributions should preserve these principles:

- Product requirements drive technical choices.
- The technical profile is presented for owner approval before scaffolding.
- Application frameworks, dependencies, Dockerfiles, Compose topology, CI,
  hosting, and deployment remain project-specific.
- OmegaForge-owned guidance stays portable across supported coding agents.
- Bootstrap and foundation updates preserve existing work and stop rather than
  guessing when ownership or safe mutation boundaries are unclear.
- New rules should address demonstrated needs and must not add speculative
  application layers, services, or infrastructure.

## Pull Requests

Keep each pull request focused. Explain:

- the problem being solved;
- why the change belongs in OmegaForge rather than a generated project;
- the files and public behavior affected;
- how the change was verified; and
- any compatibility or upgrade effect for existing OmegaForge projects.

Update [CHANGELOG.md](CHANGELOG.md) under `Unreleased` for user-visible changes.
Keep skill behavior in `SKILL.md`; agent-specific metadata files must remain
presentation-only.

Before submitting, run the applicable repository checks:

```sh
pnpm check
pnpm compose:check
git diff --check
```

Documentation-only changes do not need application tests that do not exist, but
all commands and links they introduce must be accurate. By submitting a
contribution, you agree that it may be distributed under the repository's
[Apache License 2.0](LICENSE).
