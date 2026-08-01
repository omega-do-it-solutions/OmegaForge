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
- Run the frontend application's lint, type checking, interaction tests, and
  build when configuration or shared primitives change.
- Confirm no dependency or class from a second visual UI system was introduced.
