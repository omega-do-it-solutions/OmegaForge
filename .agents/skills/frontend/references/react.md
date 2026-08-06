# React, Next.js, And Expo Structure

Read `docs/ai/application-structure.md` before using this reference. Apply the
matching model; Vite React, Next.js, and Expo Router do not use the same literal
directory tree.

## Vite React With React Router

Use `src/app/` for application composition, `src/routes/` for thin route
registration or adapters, and `src/features/<domain>/` for business behavior.
Keep `main.tsx` limited to browser bootstrap. A feature may expose its screen
directly to a route; a separate `pages/` directory is optional and only useful
when a route composes multiple independent features.

```text
src/
├── main.tsx
├── app/                 # App root, providers, session, security, config, layouts
├── routes/              # Router, route guards, route-specific adapters
├── features/
│   └── search-settings/
│       ├── SearchSettingsPage.tsx
│       ├── components/
│       ├── hooks/
│       ├── api.ts
│       ├── form-model.ts
│       └── tests/
├── components/          # Stable cross-feature product UI only
└── lib/                 # Domain-neutral utilities and API client
```

An auth screen can remain in `features/auth`; session restoration, protected
route behavior, and global authorization setup belong in `app/session` or
`app/security`. A business screen named "providers" is a feature; React context
providers are application composition.

## Next.js App Router

Do not copy the Vite `src/app/` convention into Next. Next's `app/` directory
is its router and owns `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, and
`route.ts`. Keep those files focused on route parameters, metadata, rendering
boundaries, and feature composition.

```text
src/
├── app/                 # Framework route tree and root layout/providers
│   ├── layout.tsx
│   ├── providers.tsx
│   ├── (public)/
│   └── (product)/search-settings/page.tsx
├── features/
│   └── search-settings/
│       ├── ui/
│       ├── client/
│       ├── server/
│       ├── model/
│       └── tests/
├── components/          # Stable cross-feature UI only
├── lib/                 # Framework-neutral utilities/contracts
└── server/              # Shared DB, auth, config, provider adapters
```

Use route groups for URL-neutral organization and shared layouts. Colocate a
truly route-private helper in an underscore-prefixed folder when that is clearer
than creating a feature. Do not add a parallel generic `routes/` or `pages/`
tree to an App Router application.

Pages and layouts are Server Components by default. Keep server-only data and
secrets in server-only modules, and place `'use client'` boundaries and client
providers as deep as practical. A Next route handler is a transport adapter; it
delegates to feature-owned server behavior.

## React Native With Expo Router

Expo Router's `src/app/` is its filesystem route tree in current Expo templates.
Keep `_layout.tsx` and route files focused on navigation, deep-link parameters,
and route-level composition; place native UI and behavior in sibling feature
modules.

```text
src/
├── app/
│   ├── _layout.tsx
│   ├── (auth)/
│   └── (product)/search-settings.tsx
├── features/
│   └── search-settings/
│       ├── ui/
│       ├── hooks/
│       ├── api.ts
│       ├── model.ts
│       └── tests/
├── components/      # Stable cross-feature native UI only
└── lib/             # Domain-neutral utilities and API client
```

Do not add a competing `routes/` directory or reuse web components in native
screens. Share a contract through a workspace package only after both web and
mobile applications depend on the same stable contract.

## Boundaries

- Split components by visual or workflow responsibility, not by arbitrary line
  count or only when reuse appears.
- Extract context or a provider only when descendants genuinely coordinate
  state; prefer props or feature-local state for simpler trees.
- Keep requests in the feature API boundary and business decisions on the
  trusted server or feature application layer.
- Promote a component to shared UI only after it represents a stable
  cross-feature product concept or primitive.
- Colocate focused tests with the owning feature unless the test runner requires
  another location.

Official guidance:

- [Next.js project structure](https://nextjs.org/docs/app/getting-started/project-structure)
- [Next.js layouts and pages](https://nextjs.org/docs/app/getting-started/layouts-and-pages)
- [Next.js Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)
- [Expo Router notation](https://docs.expo.dev/router/basics/notation/)
- [Thinking in React](https://react.dev/learn/thinking-in-react)
