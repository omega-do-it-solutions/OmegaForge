# Vue And Nuxt Structure

Use Single-File Components to colocate the template, presentation logic, and
component-scoped styling that form one cohesive visual responsibility. Extract
feature-owned child components and composables when a page or component grows
multiple independent concerns. Reuse is not required for either extraction.

## Default Structure

For Vue Router or another explicit router, prefer:

```text
src/
├── pages/                              # Thin route pages
│   └── SearchSettingsPage.vue
├── features/
│   └── search-settings/
│       ├── components/
│       │   └── SearchProfileForm.vue
│       ├── composables/
│       │   └── useSearchSettings.ts
│       ├── api.ts
│       ├── form-model.ts
│       └── SearchSettingsPage.test.ts
└── components/                         # Stable cross-feature product UI only
```

For Nuxt, keep `pages/` files focused on routing and composition. Feature-owned
implementation may remain under `features/<feature>/`. When an established Nuxt
project deliberately uses component auto-import, keep page-specific components
under a clear namespace such as `components/search-settings/` rather than mixing
them with global primitives.

## Boundaries

- Give each non-trivial visual responsibility its own `.vue` file, including
  one-use sections when that improves cohesion, navigation, or testing.
- Extract complex stateful logic into feature-owned composables based on logical
  concern, even when the composable is not reused elsewhere.
- Keep route pages responsible for route parameters, metadata, middleware, and
  composing the feature UI.
- Keep page-specific components under the owning feature or explicit namespace;
  do not treat the root components directory as the default home for all UI.
- Use consistent PascalCase or kebab-case filenames. Prefix tightly coupled
  component names with the parent or feature name when it makes ownership clear.
- Promote a component to shared UI only when it is a stable cross-feature
  product concept or primitive.
- Colocate focused tests with the owning feature unless the established test
  runner requires another location.

Official guidance:

- [Single-File Components](https://vuejs.org/guide/scaling-up/sfc)
- [Composables](https://vuejs.org/guide/reusability/composables)
- [Strongly Recommended Style Rules](https://vuejs.org/style-guide/rules-strongly-recommended.html)
