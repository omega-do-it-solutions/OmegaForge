# Framework-Aware Application Structure

Use this document when bootstrapping an application, adding a module, or
reorganizing application code. It defines ownership, not a mandatory count of
folders. Create a directory only when a concrete responsibility needs it.

Framework-reserved directories always keep their native meaning. Do not force a
Vite-style `app/` tree into Next.js or Nuxt, where `app/` is framework-owned.

## Ownership Model

Classify code by why it changes before deciding where it lives.

| Owner | Owns | Does not own |
| --- | --- | --- |
| Application composition | Bootstrap, global providers, session restoration, technical security, configuration, telemetry, root or area shells | A product workflow merely because it is visible everywhere |
| Route or transport entry | URL/request parameters, metadata, framework loading/error boundaries, guards, validation, delegation, response mapping | Business decisions, queries, forms, or page sections |
| Feature or module | One recognizable product capability and its UI, use cases, policies, API boundary, state, tests, and feature-specific adapters | Global routing, layouts, technical providers, configuration, or generic utilities |
| Shared code | Stable cross-feature UI primitives, product patterns, contracts, and domain-neutral utilities | Feature-specific behavior or imports from a feature, route, or app composition |

Examples that often need a split:

- Login, invitation, and account-recovery screens can be an identity feature;
  session restoration, token parsing, route protection, and global ability setup
  belong to application composition or security.
- A screen that configures an external provider is a business feature; a React,
  Vue, Nest, or Fastify provider/plugin that configures the whole application is
  application infrastructure.
- A dashboard stays a feature when it owns a cohesive workflow. Treat it as a
  route-level composition only when it genuinely assembles independent domains.

Do not create catch-all `features/layout`, `features/router`,
`features/providers`, `features/config`, `features/utils`, root `services`, root
`controllers`, root `repositories`, or root `common` directories. A framework's
native directory may use one of those names only for its documented purpose.

## Boundary Rules

- Keep framework entry files and route or transport adapters thin. They may
  compose features but must not become the default home for workflow logic.
- Keep related UI, state, request code, validation, and tests with the feature
  that owns the user or business behavior. Do not extract a static fragment only
  to satisfy a folder template.
- Give a feature or module a small, intentional public surface. Do not deep
  import another feature's internals or use broad barrels that hide cycles.
- Let shared code depend only on other shared code and stable external
  contracts. Move code there after it is a stable cross-feature concept, not on
  first reuse.
- Application-wide session, authorization, API-client, logging, and config
  contracts may be deliberately consumed by features. Expose a narrow public
  API; never make features reach into a layout, router, or provider internals.
- Use import-boundary lint rules or project aliases when the application has
  enough modules for accidental cross-feature imports to become likely.

## Vite React With React Router

Use an explicit application-composition layer alongside thin router entries.

```text
src/
├── main.tsx                         # Browser bootstrap only
├── app/
│   ├── App.tsx                      # Root composition
│   ├── providers/                   # Query, theme, i18n, and similar roots
│   ├── session/                     # Session bootstrap and narrow hooks
│   ├── security/                    # Global client authorization contract
│   ├── config/
│   └── layouts/                     # Application or area shells
├── routes/
│   ├── AppRouter.tsx
│   └── guards/
├── pages/                           # Optional: multi-feature route composition
├── features/
│   └── orders/
│       ├── OrdersPage.tsx
│       ├── components/
│       ├── api.ts
│       ├── hooks/
│       ├── model.ts
│       └── tests/
├── components/                      # Stable cross-feature UI and patterns
└── lib/                             # Domain-neutral utilities and API client
```

`routes/` may render a feature page directly. Do not add `pages/` merely to
wrap every feature page. Put a shell, router, global provider, or configuration
file in `app/`, not in `features/`.

## Next.js App Router

Next's `app/` directory is its filesystem router. Preserve that meaning rather
than creating a second generic `app/` architecture alongside it.

```text
src/
├── app/                             # Framework route tree
│   ├── layout.tsx                   # Required root layout and root composition
│   ├── providers.tsx                # Narrow client-provider boundary
│   ├── (marketing)/
│   ├── (product)/
│   │   └── orders/
│   │       └── page.tsx             # Thin route composition
│   └── api/
│       └── orders/route.ts          # Thin HTTP adapter when needed
├── features/
│   └── orders/
│       ├── ui/
│       ├── client/
│       ├── server/
│       ├── model/
│       └── tests/
├── components/                      # Stable cross-feature UI
├── lib/                             # Framework-neutral helpers and contracts
└── server/                          # Cross-feature DB, auth, config, providers
```

Use route groups for URL-neutral grouping and shared group layouts. Route-local
private components or helpers may be colocated in an underscore-prefixed folder
when that is clearer than a feature. Keep `page.tsx`, `layout.tsx`, `loading.tsx`,
`error.tsx`, and `route.ts` focused on their framework role. Server Components
are the default: place `'use client'` boundaries and client providers as deep as
practical, and never import server-only secrets into client code.

Do not add a parallel generic `routes/` or `pages/` tree to a new App Router
application.

## Vue With Vue Router

Use the same ownership model as Vite React while following Vue's SFC and router
conventions.

```text
src/
├── main.ts                          # Browser bootstrap only
├── app/
│   ├── App.vue
│   ├── providers/
│   ├── session/
│   ├── security/
│   ├── config/
│   └── layouts/
├── router/
│   ├── index.ts
│   └── guards.ts
├── pages/                           # Thin route-level SFCs when useful
├── features/
│   └── orders/
│       ├── OrdersPage.vue
│       ├── components/
│       ├── composables/
│       ├── api.ts
│       ├── model.ts
│       └── tests/
├── components/                      # Stable cross-feature SFCs and patterns
└── lib/
```

A router record may render a feature page directly. Keep a route page only when
it owns route-level composition, metadata, or guards. Keep feature composables
and one-use SFCs with their feature; do not place every component in the global
auto-import location.

## Nuxt 4

Nuxt 4's default source directory is `app/`. Its `pages`, `layouts`,
`middleware`, `plugins`, and server directories are framework conventions, not
generic folder names to repurpose.

```text
app/
├── app.vue
├── app.config.ts
├── layouts/
├── middleware/
├── plugins/
├── pages/                           # Thin filesystem route composition
├── core/                            # Session, security, config, app-wide setup
├── features/
│   └── orders/
│       ├── ui/
│       ├── composables/
│       ├── api/
│       ├── model/
│       └── tests/
├── components/                      # Stable auto-imported shared UI only
└── composables/                     # Stable app-wide composables only
server/
├── api/                             # Thin Nitro handlers
├── routes/                          # Thin server route handlers
├── middleware/
├── plugins/
└── features/                        # Server-only feature services/adapters
shared/                              # Browser-and-Nitro-safe contracts/utilities
```

Import feature code explicitly from `app/features`; do not rely on auto-import
for nested feature composables. Keep client Vue code out of `server/`, keep
server-only code out of `app/`, and put only runtime-neutral code in `shared/`.
Do not use Nuxt Layers as the default replacement for feature folders; use them
only for genuinely reusable application layers or independently composed areas.

Existing Nuxt 3 applications retain their established layout unless an explicit
Nuxt migration is approved. New Nuxt applications use Nuxt 4 conventions.

## React Native With Expo Router

Expo Router's `src/app/` directory is its filesystem route tree in current Expo
templates, so use the same care as Next.js: keep route files and layouts
framework-focused and put product behavior beside it in feature-owned modules.

```text
src/
├── app/
│   ├── _layout.tsx                  # Root navigation and providers
│   ├── (auth)/
│   ├── (product)/
│   │   └── orders.tsx               # Thin route composition
│   └── modal.tsx
├── features/
│   └── orders/
│       ├── ui/
│       ├── hooks/
│       ├── api.ts
│       ├── model.ts
│       └── tests/
├── components/                      # Stable cross-feature native UI
└── lib/                             # Domain-neutral utilities and API client
```

Keep navigation, deep-link parameters, and route-level loading or error behavior
in Expo Router files. Keep screens, form state, requests, and feature-specific
components in `features/`. Do not add a competing `routes/` tree or reuse web
components in native UI. Shared typed contracts may live in a workspace package
only when both applications use the same stable contract.

## NestJS

Nest feature modules are the backend boundary. Keep `main.ts` and `AppModule`
as composition only; a Nest module owns a business capability and exposes only
its deliberate public providers.

```text
src/
├── main.ts                          # Process bootstrap, lifecycle, listen
├── app.module.ts                    # Root composition
├── app/
│   ├── config/
│   ├── database/
│   ├── http/                        # Global validation, filters, interceptors
│   ├── security/                    # Authentication mechanism and principals
│   ├── observability/
│   └── health/
└── features/
    └── orders/
        ├── orders.module.ts         # Feature wiring and intentional exports
        ├── http/
        │   ├── orders.controller.ts
        │   └── dto/
        ├── application/
        │   ├── use-cases/
        │   └── ports/
        ├── domain/
        ├── infrastructure/
        │   ├── persistence/
        │   └── providers/
        └── tests/
```

Keep controllers and DTOs as HTTP adapters. Keep domain code independent of
Nest, an ORM, and external providers. A small feature may stay flatter; do not
create empty layer directories. Do not make routine feature modules global,
duplicate a provider in multiple modules, or use `forwardRef` as an ordinary
dependency-management tool. If Nest uses the Fastify adapter, follow this Nest
module structure rather than layering a second raw-Fastify plugin architecture
on top.

## Fastify

Treat each Fastify feature as a registered plugin, not merely a directory named
after a feature. Fastify plugin encapsulation is a real boundary.

```text
src/
├── main.ts                          # Read config; start and stop the process
├── server.ts                        # buildServer() and explicit registration
├── app/
│   ├── config/
│   ├── plugins/                     # DB, auth, logging, metrics
│   ├── http/                        # Global errors, hooks, health
│   └── types/
│       └── fastify.d.ts             # Intentional global decorator typing
└── features/
    └── orders/
        ├── orders.plugin.ts         # Feature entry and route-prefix boundary
        ├── http/
        │   ├── routes.ts
        │   ├── handlers/
        │   └── schemas/
        ├── application/
        ├── domain/
        ├── infrastructure/
        └── tests/
```

Register cross-cutting plugins before feature plugins. Keep a feature's routes,
hooks, and decorators inside its encapsulated plugin unless they are truly
application-wide. Use `fastify-plugin` only when deliberately exposing shared
technical infrastructure, not for every feature. Route handlers validate and
map input/output; use cases own business decisions. Make `buildServer()`
independently testable with `fastify.inject()`; only `main.ts` calls `listen()`.

## Bootstrap And Refactoring

Record the selected framework and source organization in the technical profile
before scaffolding. After a generator runs, normalize only the generated
application directory into the applicable structure. Do not create empty
placeholder folders or combine a broad structural move with in-progress feature
work. Move one ownership boundary at a time, repair imports and focused tests,
then run the relevant lint, typecheck, test, and build commands.

## Official Framework Semantics

- [Next.js App Router project structure](https://nextjs.org/docs/app/getting-started/project-structure)
- [Nuxt 4 directory structure](https://nuxt.com/docs/4.x/directory-structure)
- [Expo Router notation](https://docs.expo.dev/router/basics/notation/)
- [NestJS modules](https://docs.nestjs.com/modules)
- [Fastify plugins](https://fastify.dev/docs/latest/Reference/Plugins/)
