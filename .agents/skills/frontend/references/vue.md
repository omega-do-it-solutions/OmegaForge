# Vue And Nuxt Structure

Read `docs/ai/application-structure.md` before using this reference. Apply the
matching model; Vue Router and Nuxt reserve different framework directories.

## Vue With Vue Router

Use `src/app/` for application composition, `src/router/` for router setup and
guards, and `src/features/<domain>/` for product behavior. Keep `main.ts`
limited to application bootstrap. A route may render a feature SFC directly; a
`pages/` directory is optional and only belongs where route-level composition is
real.

```text
src/
├── main.ts
├── app/                 # App.vue, providers, session, security, config, layouts
├── router/              # Router records and navigation guards
├── features/
│   └── search-settings/
│       ├── SearchSettingsPage.vue
│       ├── components/
│       ├── composables/
│       ├── api.ts
│       ├── form-model.ts
│       └── tests/
├── components/          # Stable cross-feature SFCs and patterns only
└── lib/                 # Domain-neutral utilities and API client
```

Use a cohesive Single-File Component for one visual responsibility. Extract a
feature-owned child SFC or composable when it owns independent state, requests,
validation, accessibility behavior, or tests. Do not use the global components
directory as the default destination for feature-specific SFCs.

## Nuxt 4

Nuxt 4's default source directory is `app/`. Its `app/pages`, `app/layouts`,
`app/middleware`, `app/plugins`, `server`, and `shared` directories have
framework-defined roles. Do not impose a generic Vite-style app or router tree
on top of them.

```text
app/
├── app.vue
├── app.config.ts
├── layouts/
├── middleware/
├── plugins/
├── pages/               # Thin filesystem route composition
├── core/                # Session, security, config, and app-wide setup
├── features/
│   └── search-settings/
│       ├── ui/
│       ├── composables/
│       ├── api/
│       ├── model/
│       └── tests/
├── components/          # Stable auto-imported shared UI only
└── composables/         # Stable app-wide composables only
server/
├── api/                 # Thin Nitro request handlers
├── routes/
├── middleware/
├── plugins/
└── features/            # Server-only feature services and adapters
shared/                  # Browser-and-Nitro-safe contracts/utilities only
```

Keep `app/pages` focused on route parameters, metadata, middleware, and feature
composition. Import `app/features` explicitly; nested feature composables are
not a reason to broaden Nuxt's auto-import configuration. Keep client code out
of `server/`, server-only code out of `app/`, and UI code out of `shared/`.

Use Nuxt Layers only for a genuinely reusable application layer or independently
composed area, not as the default location for each product feature. Existing
Nuxt 3 applications retain their established convention until an approved Nuxt
migration; new Nuxt applications follow Nuxt 4 conventions.

## Boundaries

- Give each non-trivial visual responsibility its own `.vue` file, including
  one-use sections when that improves cohesion, navigation, or testing.
- Keep route pages responsible for route parameters, metadata, middleware, and
  composing the feature UI.
- Promote a component or composable to app-wide/shared only after it represents
  a stable cross-feature product concept or runtime-neutral utility.
- Colocate focused tests with the owning feature unless the test runner requires
  another location.

Official guidance:

- [Vue Single-File Components](https://vuejs.org/guide/scaling-up/sfc)
- [Vue composables](https://vuejs.org/guide/reusability/composables)
- [Nuxt 4 directory structure](https://nuxt.com/docs/4.x/directory-structure)
- [Nuxt 4 layouts](https://nuxt.com/docs/4.x/directory-structure/app/layouts)
