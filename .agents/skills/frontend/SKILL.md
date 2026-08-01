---
name: frontend
description: Implement and refactor browser-facing pages, daisyUI components, forms, client state, accessibility, responsive behavior, and user experience in the project's established frontend framework. Use for work under a web or mobile UI application or any task that changes user interaction or presentation.
---

# Frontend

## Follow The Installed Framework

Inspect the application manifest, configuration, components, and existing
patterns before editing. Use installed libraries and framework-native features.
Do not introduce a second router, state library, form system, UI kit, validation
library, styling system, or HTTP client without an explicit replacement need.

Read version-matched local framework documentation when the installed framework
ships it or the task touches version-sensitive behavior.

## Use The Required UI System

Use Tailwind CSS with daisyUI as the only visual component system. Before adding
or changing UI primitives, read [references/daisyui.md](references/daisyui.md).

Do not add another visual UI kit. A headless primitive is acceptable only for an
accessible interaction daisyUI does not implement; keep all presentation in the
project's daisyUI theme and Tailwind utilities.

## Structure By Feature

- Keep route files focused on route concerns, data wiring, and composition.
- Move substantial sections and interaction state into feature-owned modules.
- Put reusable primitives in the established shared component location.
- Keep server state, form state, and purely visual state distinct.
- Fetch authoritative data through the established API or server boundary.
- Do not duplicate backend business rules in UI-only checks.

Extract code when a section owns its own state, requests, filters, forms,
pagination, or failure behavior. Do not extract trivial one-use markup solely to
reduce line count.

## User Experience

- Implement loading, empty, success, validation, and failure states.
- Preserve keyboard access, labels, focus behavior, and semantic structure.
- Respect documented locale, direction, timezone, currency, and formatting.
- Make layouts usable at supported viewport sizes.
- Present human-readable errors without exposing stack traces or raw provider
  messages.
- Reuse product tokens and components before inventing local visual rules.

## Contracts And Verification

Validate user input at the client for experience and again at the trusted server
boundary. Keep API contracts typed when the stack supports it.

Test changed interactions and accessibility-critical behavior. Run the affected
application's lint and type checking, and build when routing, rendering mode,
configuration, or shared contracts change.
