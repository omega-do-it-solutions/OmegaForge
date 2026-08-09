# Dependency Version Security

Read this file before selecting, adding, or upgrading a runtime, framework,
library, package, plugin, build tool, container base image, or infrastructure
component.

## Selection Policy

1. Confirm the dependency is necessary and prefer an already approved project
   dependency when it satisfies the capability.
2. Check the project's current official release, support, maintenance, and
   security information. Version safety is time-sensitive; do not rely on model
   memory, a generator default, an example command, the `latest` tag, or an old
   template.
3. Select an actively supported LTS release line when the ecosystem publishes
   one. When no LTS policy exists, select a maintained stable release line.
4. Within that line, use a patched release that is compatible with the approved
   runtime and peer dependencies and is not listed as affected by a published
   advisory.
5. Do not select alpha, beta, release-candidate, canary, nightly, preview,
   experimental, deprecated, end-of-life, or otherwise unsupported direct
   dependencies for a production foundation.
6. Pin the package manager, commit the lockfile, and use the ecosystem's
   reproducible or frozen install mode in CI and production builds. Do not use
   floating container tags or unbounded dependency ranges for release artifacts.

A version being new, popular, or labeled stable does not prove that it is safe.
Support status, compatibility, and current advisories are separate checks.

## Verification

Before accepting a dependency change:

- Record the selected release line and why it is supported for the project's
  expected lifetime.
- Review official framework or runtime security notices and a current advisory
  source for the resolved dependency graph.
- Inspect direct and transitive production dependencies with the selected
  ecosystem's supported audit or vulnerability scanner.
- Confirm runtime, framework, adapter, plugin, and peer-dependency compatibility.
- Run the affected tests, type checking, build, and production startup checks.
- Re-run the vulnerability scan in CI from the committed lockfile so later
  advisory updates can block an unsafe release.

Do not knowingly choose or retain a version affected by a published advisory
when a compatible fixed version exists. Critical or high-severity production
findings block bootstrap and release until they are upgraded, removed, or
mitigated through an explicitly approved exception. Review lower-severity and
development-only findings in context; do not silently ignore them.

A clean scan is point-in-time evidence, not a permanent guarantee. Keep the
selected release line supported and apply security patches without waiting for a
feature request.

## Exceptions

Do not introduce a prerelease, unsupported, end-of-life, or known-affected
version merely to access a convenient feature. If a documented product need has
no safe supported alternative, stop and obtain explicit technical-owner approval
before installation. Record:

- the exact dependency and version;
- the product need and alternatives considered;
- the known exposure and affected environments;
- compensating controls and verification;
- the owner and deadline for upgrade, replacement, or removal.

An exception is narrow and temporary. It does not authorize other experimental
or vulnerable dependencies.
