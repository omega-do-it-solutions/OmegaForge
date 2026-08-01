---
name: delivery
description: Implement and maintain Dockerfiles, Docker Compose services, CI/CD pipelines, release checks, migrations, health behavior, and deployment configuration. Use for containerization, infrastructure dependencies, build pipelines, release preparation, deployment, or production verification.
---

# Delivery

## Select The Runtime Contract

Inspect the chosen hosting platform before designing containers or CI. Use native
static deployment when it is the simpler operational fit. Containerize each
independently deployable long-running application when the platform uses
containers.

Treat Docker Compose as a local and integration topology unless production use
is explicitly selected and designed.

## Build Production Images

- Use reproducible dependency installation from the committed lockfile.
- Use multi-stage builds to keep compilers and source out of runtime images when
  it materially reduces size or attack surface.
- Run as a non-root user when the runtime supports it.
- Copy only required artifacts and use a narrow build context.
- Inject configuration and secrets at runtime; never bake credentials into an
  image or commit them.
- Define startup, shutdown, and health behavior appropriate to the application.
- Pin intentionally and document the update path for base and infrastructure
  images.

## Compose Local Infrastructure

Expose only ports developers or tests require. Persist only state that should
survive container recreation. Use named volumes for local databases and object
storage. Keep credentials clearly local and overridable through `.env`.

Do not add an infrastructure service until a product capability uses it.

## Build CI/CD

Adapt to the repository's selected provider. A normal pipeline should:

1. Install the pinned package manager and dependencies.
2. Run lint and type checking.
3. Run relevant unit and integration tests.
4. Build applications and production images.
5. Scan dependencies, secrets, and images where tooling exists.
6. Publish immutable artifacts only after verification succeeds.
7. Run database migrations as an observable, one-shot release step.
8. Verify health after deployment and retain a rollback path.

Keep production deploy credentials in the CI or platform secret store. Do not
print them or place them in generated configuration.

## Safety And Verification

Validate Compose configuration and build affected images locally when possible.
Test container health and graceful shutdown. Do not push images, deploy, destroy
infrastructure, or run production migrations without explicit user authorization.
