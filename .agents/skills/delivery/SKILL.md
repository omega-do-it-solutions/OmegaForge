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

## Environment Contract

Every deployable application distinguishes `APP_ENV=development` and
`APP_ENV=production` through validated startup configuration. Development runs
with the documented development command and may use local Compose dependencies.
Production runs a built artifact through its production start command; never
deploy a development server. A native mobile application is different: its
production output is a signed Android and/or iOS release artifact, not a
long-running server process.

Keep local, non-secret configuration in `.env.example` and `.env`. Inject
production configuration and secrets at runtime from the selected host or secret
store. Do not commit or bake secrets into images. Define health or readiness
behavior for startup and post-deployment checks.

Choose and document the local configuration layout during bootstrap. Default to
a root `.env` for shared workspace configuration; use application-owned
environment files only for genuinely app-specific values or framework needs.
Create each missing `.env` from its matching `.env.example` without overwriting
an existing file. Ensure root lifecycle commands explicitly load or propagate
the chosen files to every web, API, worker, and mobile process. Do not rely on automatic
environment loading by one framework to configure sibling processes.

Run schema migrations as an observable, one-shot production release task, not
as normal application startup behavior. Seeds are limited to safe development or
test data and must never be automatic in production.

## Build Production Images

- Use reproducible dependency installation from the committed lockfile.
- Use multi-stage builds to keep compilers and source out of runtime images when
  it materially reduces size or attack surface.
- Run as a non-root user when the runtime supports it.
- Copy only required artifacts and use a narrow build context.
- Inject configuration and secrets at runtime; never bake credentials into an
  image or commit them.
- Define startup, shutdown, and health behavior appropriate to the application.
- Select maintained stable or LTS base and infrastructure image lines, verify
  their current security status, pin release artifacts immutably, and document
  the update path. Follow `docs/ai/dependency-security.md` for exceptions.

## Native Mobile Builds

Do not containerize `apps/mobile` by default. Use Expo development builds for
real device-capability testing; Expo Go is suitable only for early compatibility
checks. Build the approved Android and/or iOS release artifacts in a compatible
local or CI environment, verify the requested targets, and report any unavailable
emulator, simulator, or device separately.

Keep mobile runtime configuration limited to non-secret values such as an API
base URL. Keep access tokens in `expo-secure-store`; never embed server, object
storage, signing, store, or provider credentials in the app. Do not create store
accounts, signing credentials, publish builds, or enable an over-the-air update
service without explicit owner authorization.

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
5. Scan the committed dependency graph and images against current vulnerability
   data, enforcing `docs/ai/dependency-security.md`; do not release with an
   unmitigated critical or high-severity production finding.
6. Publish immutable artifacts only after verification succeeds.
7. Run database migrations as an observable, one-shot release step.
8. Verify health after deployment and retain a rollback path.

Keep production deploy credentials in the CI or platform secret store. Do not
print them or place them in generated configuration.

## Safety And Verification

Validate Compose configuration and build affected images locally when possible.
Test container health and graceful shutdown. Do not push images, deploy, destroy
infrastructure, or run production migrations without explicit user authorization.
