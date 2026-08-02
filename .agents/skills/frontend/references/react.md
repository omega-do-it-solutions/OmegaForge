# React And Next.js Structure

Use feature ownership and component hierarchy as the organizing model. React
does not require a whole page to remain in one file. A component may exist to
isolate one responsibility even when it is rendered only once.

## Default Structure

For a Vite or React Router application, prefer:

```text
src/
├── routes/                         # Thin router registration or route entries
├── features/
│   └── search-settings/
│       ├── SearchSettingsPage.tsx  # Feature entry and composition
│       ├── components/
│       │   └── SearchProfileForm.tsx
│       ├── context/                # Only when a subtree needs shared state
│       ├── hooks/                  # Feature-owned stateful UI logic
│       ├── api.ts                  # Feature request boundary
│       ├── form-model.ts           # Validation and form model
│       └── SearchSettingsPage.test.tsx
└── components/                     # Stable cross-feature product UI only
```

For Next.js, keep framework files thin and import the feature implementation:

```text
app/search-settings/page.tsx
features/search-settings/
├── SearchSettingsPage.tsx
├── components/
├── hooks/
├── context/
├── api.ts
└── SearchSettingsPage.test.tsx
```

Colocating private components, tests, and providers inside a route folder is
also acceptable when the installed Next.js version and established project
pattern support it. Do not duplicate the same feature across both structures.

## Boundaries

- Keep the router entry responsible for route parameters, metadata, loading and
  error boundaries, and composing the feature entry.
- Split components by UI or workflow responsibility, not by an arbitrary line
  count and not only when reuse appears.
- Extract context or a provider only when multiple descendants need coordinated
  state; prefer props or feature-local state for simpler trees.
- Keep requests in the feature API boundary and business decisions on the
  trusted server or feature application layer.
- Promote a component to shared UI only after it represents a stable
  cross-feature product concept or primitive.
- Colocate focused tests with the owning feature unless the established test
  runner requires another location.

Official guidance:

- [Thinking in React](https://react.dev/learn/thinking-in-react)
- [Your First Component](https://react.dev/learn/your-first-component)
- [Scaling Up with Reducer and Context](https://react.dev/learn/scaling-up-with-reducer-and-context)
