# daisyUI

Use this reference for every task that adds, changes, or reviews web-interface
components.

## Set Up The Application

1. Inspect the selected frontend framework and installed Tailwind version.
2. Read the current official daisyUI installation guide for that framework.
3. Install dependencies with pnpm in the owning web application, not at the
   workspace root unless the workspace configuration genuinely owns them.
4. Configure daisyUI through the project's Tailwind CSS entry point.
5. Commit the resulting lockfile and keep versions reproducible.

Do not use a CDN build in an application project. Do not copy configuration from
a different Tailwind or daisyUI major version.

Official references:

- [Installation](https://daisyui.com/docs/install/)
- [Components](https://daisyui.com/components/)
- [Themes](https://daisyui.com/docs/themes/)

## Build Components

- Prefer daisyUI semantic classes for buttons, forms, navigation, cards, tables,
  dialogs, feedback, and other supported primitives.
- Use Tailwind utilities for layout, responsive behavior, spacing, and deliberate
  product-specific adjustments.
- Compose recurring product patterns as application-owned components with clear
  props, events, slots, or children.
- Keep business requests, server state, mutations, and workflow orchestration in
  the owning feature rather than inside visual primitives.
- Do not wrap every primitive. Create a wrapper only when the product adds stable
  behavior, accessibility, defaults, or visual policy.
- Do not reproduce a daisyUI component with large custom utility strings when its
  semantic component classes already express the intended result.

## Build Application Shells

Read `docs/ai/interface-design.md` before choosing shell composition. For an
approved sidebar shell, start from the current official
[drawer](https://daisyui.com/components/drawer/) structure and compose it with
daisyUI `navbar`, `menu`, `tooltip`, and project-owned navigation components.

- Use responsive drawer behavior so wide screens can keep navigation visible
  while narrow screens use an overlay controlled from the header.
- For an approved desktop icon-rail mode, use the documented open and closed
  state variants. Keep accessible names in the DOM and show readable tooltips on
  pointer hover and keyboard focus; do not make unlabeled icons the only cue.
- Place the drawer on the logical start side for the active direction, including
  the right side for RTL. Verify rather than assuming direction-aware geometry.
- Give the toggle an accessible name and state, preserve visible focus, manage
  overlay focus and dismissal, and keep the current navigation item exposed with
  `aria-current="page"`.
- Keep shell state and navigation composition outside business features. Persist
  a desktop collapse preference only when useful, and do not let it force the
  mobile overlay open or closed.

Do not copy a dashboard template or its branding. The approved interface
identity determines whether a drawer belongs at all.

## Meet The Visual Quality Bar

Using a daisyUI component name is not evidence that the rendered interface is
finished or visually acceptable. Before adapting a component, open the current
official documentation for the installed daisyUI version and begin with the
closest example for the required behavior. Use its structure, documented
variants, responsive composition, and semantic treatment as the baseline.

Inspect the rendered result and require all of the following:

- Surfaces, borders, elevation, and interactive regions are visually distinct.
- Text, icons, controls, and semantic states have readable contrast.
- Info, success, warning, and error states communicate their meaning visually.
- Spacing, sizing, alignment, and typography create an intentional hierarchy.
- The component remains coherent in supported themes, directions, and widths.

When different components share a row, treat them as one composition instead of
accepting each component's default box geometry independently. Align the owning
wrappers' outer edges, headings, content start lines, padding, and intentional
height or stretch. Prefer top and content alignment over forced equal heights
when the components contain different amounts of information.

Choose form containers by meaning as well as appearance. Use `fieldset` with a
`legend` for a named group of related controls. A standalone input or select
normally needs its own accessible label but not a fieldset; place it in a card,
section, or another peer container when that produces the correct shared
geometry. Never discard a meaningful grouping solely to fix styling. Inspect
mixed-component rows in LTR, RTL, responsive, expanded, and collapsed states.

Do not approve a pale, ambiguous, visually broken, or unfinished result merely
because it contains daisyUI classes. If it is materially worse than the official
example, first check the markup, documented variant, active theme tokens,
Tailwind and daisyUI configuration, CSS order, and unintended overrides. Prefer
fixing those causes and using documented daisyUI variants over compensating with
scattered one-off styles.

## Keep One Visual Language

Do not install or use another visual component system. Do not paste components
whose styling depends on another design system's tokens or runtime.

Headless libraries may supply missing focus management, positioning, keyboard
interaction, or accessibility behavior. They must remain visually unstyled and
receive their complete presentation from daisyUI theme classes and Tailwind.

## Theme The Product

- Define the product theme centrally during bootstrap.
- Prefer semantic theme roles such as primary, secondary, accent, neutral, info,
  success, warning, error, base surfaces, and content colors.
- Avoid scattered raw color values that bypass the selected theme.
- Keep light, dark, and branded variations intentional; do not enable every
  bundled theme in a production application.
- Treat changes to shared theme roles as cross-application visual changes and
  review affected screens.

## Preserve Accessibility

daisyUI provides visual classes, not the complete behavior for every interactive
pattern. Use semantic elements and implement labels, descriptions, focus order,
keyboard behavior, error association, and announcements required by the control.

Prefer native behavior when it satisfies the interaction. Test dialogs, menus,
dropdowns, drawers, tabs, forms, and other stateful components with keyboard-only
navigation and visible focus.

## Verify

- Check supported responsive widths and documented themes.
- Check loading, empty, validation, success, disabled, and failure states.
- Compare adapted components with the closest current official daisyUI example
  and confirm that their visual clarity has not been lost.
- Run the frontend application's lint, type checking, interaction tests, and
  build when configuration or shared primitives change.
- Confirm no dependency or class from a second visual UI system was introduced.
