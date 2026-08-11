---
name: frontend
description: Implement and refactor browser-facing application shells, navigation, pages, framework-native feature structure, daisyUI components, forms, client state, accessibility, responsive behavior, and category-aware user experience in the project's established frontend framework. Use for work under a web or mobile UI application or any task that changes user interaction, presentation, page composition, layout identity, or frontend code organization.
---

# Frontend

## Follow The Installed Framework

Inspect the application manifest, configuration, components, and existing
patterns before editing. Use installed libraries and framework-native features.
Do not introduce a second router, state library, form system, UI kit, validation
library, styling system, or HTTP client without an explicit replacement need.

Read version-matched local framework documentation when the installed framework
ships it or the task touches version-sensitive behavior.

Before adding or upgrading a frontend runtime, framework, adapter, or package,
read `docs/ai/dependency-security.md`. Verify current support, compatibility, and
security information; do not select versions from generator defaults or memory.

Before creating or reorganizing frontend pages, components, or feature modules,
read `docs/ai/application-structure.md` and the matching reference:
[references/react.md](references/react.md) for Vite React, Next.js, or Expo
Router, or
[references/vue.md](references/vue.md) for Vue Router or Nuxt. Follow the
installed router's required entry-file conventions over generic example paths.

Before creating or changing an application shell, navigation, page layout, or
substantial page composition, read the `Interface Identity` section of
`docs/product.md` and `docs/ai/interface-design.md`. If the identity is missing,
contradictory, or materially different from the existing interface, use
`$design-interface` before inventing a shell.

## Use The Required UI System

For web applications, use Tailwind CSS with daisyUI as the only visual component
system. Before adding or changing web UI primitives, read
[references/daisyui.md](references/daisyui.md).

Do not add another web visual UI kit. A headless primitive is acceptable only
for an accessible interaction daisyUI does not implement; keep all presentation
in the project's daisyUI theme and Tailwind utilities.

For `apps/mobile`, use React Native primitives and the project's mobile token
layer. Reuse brand and semantic tokens, but do not import daisyUI, browser DOM
components, or a second mobile UI kit by default.

## Use The Product Foundation

Read `docs/ai/architecture.md` before selecting frontend dependencies. Use the
approved foundation for the capability in scope: Axios with TanStack Query for
API server state; TanStack Table for interactive tables; CASL for permission-aware
UI; Phosphor Icons; Zod with React Hook Form or VeeValidate for forms; Tiptap for
rich text; ApexCharts for analytics; Day.js for dates; and Pinia or Zustand for
shared client-only state according to the selected framework.

Use the exact adapter packages documented in the architecture: `axios`,
`@tanstack/react-query` or `@tanstack/vue-query`, `@tanstack/react-table` or
`@tanstack/vue-table`, `@casl/ability` with `@casl/react` or `@casl/vue`,
`@phosphor-icons/react` or `@phosphor-icons/vue`, `react-hook-form` or
`vee-validate` with `zod`, `@tiptap/react` or `@tiptap/vue-3`, `apexcharts` with
`react-apexcharts` or `vue3-apexcharts`, `dayjs`, `pinia`, and `zustand`.

These are default choices, not a reason to install every package. Keep TanStack
Query as the owner of server state, keep authorization authoritative on the
server, and do not add a competing library in any of these categories without an
explicit architecture decision.

For `apps/mobile`, also follow the mobile foundation in
`docs/ai/architecture.md`: use Expo, React Native, TypeScript, and Expo Router;
use the same Axios and `@tanstack/react-query` server-state contract; use
Zustand, React Hook Form, Zod, and CASL only when their capability is in scope;
and use `expo-secure-store` for small authentication secrets. Use lists and
cards instead of desktop tables. Add Expo device modules only for documented
workflows, and use `@testing-library/react-native` for changed mobile behavior.

## Organize By Ownership

Do not use `features/` as a generic source directory. Classify application
composition, route entries, business features, and shared code first. Put root
providers, session/security bootstrap, configuration, telemetry, and global or
area layouts in the applicable application-composition location. Keep a route
entry focused on framework routing and composition. A feature owns one
recognizable product capability; a stable shared component or utility earns a
cross-feature location only after its boundary is clear.

Respect framework-reserved directories. In particular, Next.js App Router's
`app/` and Nuxt's `app/` and `server/` keep their framework routing/runtime
semantics; do not overlay a generic Vite-style `app/` tree or add a competing
route tree to them.

- Keep route and page files focused on framework-required route concerns,
  feature entry wiring, and composition.
- Extract a feature-owned component when a visual section has a coherent
  responsibility, state, interaction, request, validation, accessibility
  behavior, failure state, or focused tests. Do this even when it is used once;
  reuse is not a prerequisite for separation of concerns.
- Keep page-specific components, hooks, context or providers, composables,
  models, API modules, and tests with the owning feature according to the
  framework reference.
- Put only stable cross-feature primitives and product patterns in the
  established shared component location. Do not move a component there merely
  because a framework supports global registration or auto-import.
- Treat `components/`, `hooks/`, `context/`, `composables/`, and `tests/` as
  optional organization for real responsibilities, not folders every feature
  must contain.
- Keep server state, form state, and purely visual state distinct.
- Fetch authoritative data through the established API or server boundary.
- Do not duplicate backend business rules in UI-only checks.

Extract code when a section owns its own state, requests, filters, forms,
pagination, failure behavior, or independently understandable UI responsibility.
Do not keep an oversized page intact just because its sections are used once,
and do not extract trivial static markup solely to reduce line count.

## User Experience

- Match every page to its documented audience surface and shell. Do not make an
  internal operations area resemble a consumer portal, or make a public or
  customer area inherit staff-tool density and navigation.
- For internal admin and operational surfaces, default to a persistent header
  and logical-start sidebar on wide screens. Support a readable expanded mode,
  an accessible labeled icon-rail collapse when suitable, and an overlay drawer
  on narrow screens. Keep operational content wide enough for its real tables,
  filters, comparisons, and workflows.
- For customer self-service, public, commerce, collaborative, and guided
  surfaces, select the shell from `docs/ai/interface-design.md`; do not add a
  sidebar merely because the page is authenticated or called a dashboard.
- Give mixed products separate application or area shells for public, customer,
  checkout, and staff experiences. Share tokens and primitives, not necessarily
  navigation, density, or content width.
- Place shell composition in the framework's application-composition or area
  layout boundary. Keep feature code responsible for feature content and intent,
  not the global header, sidebar, router, or session bootstrap.
- Implement loading, empty, success, validation, and failure states.
- Preserve keyboard access, labels, focus behavior, and semantic structure.
- Respect documented locale, direction, timezone, currency, and formatting.
- Make layouts usable at supported viewport sizes.
- Group related content and controls by meaning and task. Use proximity,
  alignment, headings, and reading order so ownership is immediately clear.
- Place controls next to the content they affect. Keep tabs closer to their
  panels than to preceding content and provide an unmistakable active state.
- Balance each responsive layout and avoid unexplained dead space caused by
  unnecessarily narrow, one-sided, or poorly spanned content.
- Give peer panels in the same row or grid a shared outer geometry. Align their
  edges, headings, content start lines, padding, and intentional height or
  stretch even when they use different daisyUI components.
- Use a fieldset only for a genuinely named group of related controls. Put a
  standalone field, with its accessible label intact, in a card, section, or
  other peer container when that better matches the surrounding composition.
- Do not force equal heights when peer content is meaningfully different; align
  top edges and internal start lines instead. Check LTR, RTL, responsive,
  expanded, and collapsed states for offsets.
- Use color with restraint and purpose: neutral surfaces for structure and theme
  colors for brand, status, selection, feedback, and important actions. Preserve
  contrast without making the interface either visually loud or washed out.
- Avoid nested bordered containers. Use one wrapper boundary, then spacing,
  headings, alignment, subtle surfaces, or a single divider for internal groups
  unless an additional border communicates a necessary semantic boundary.
- Give meaningful expandable sections a brief, smooth transition while keeping
  minor text and control updates immediate. Preserve focus and honor reduced
  motion preferences.
- Present human-readable errors without exposing stack traces or raw provider
  messages.
- Reuse product tokens and components before inventing local visual rules.
- Inspect the full rendered page at supported widths and directions; correct
  page-level grouping, whitespace, density, hierarchy, and balance before
  considering the UI complete.

## Contracts And Verification

Validate user input at the client for experience and again at the trusted server
boundary. Keep API contracts typed when the stack supports it.

Test changed interactions and accessibility-critical behavior. Run the affected
application's lint and type checking, and build when routing, rendering mode,
configuration, or shared contracts change.
