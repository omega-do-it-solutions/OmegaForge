# Interface Identity And Shell Design

Choose page layout from the product's audience and work, not from a generic
dashboard aesthetic. Record the durable decision in `docs/product.md` under
`Interface Identity`, then use that profile during bootstrap and every frontend
change.

## Identity Model

Describe both the product and each interface surface. A product category alone
is not precise enough: an ecommerce product can contain a public storefront, a
customer account area, a focused checkout, and an internal staff console.

Record:

- **Product category:** the primary business experience and any meaningful
  secondary category.
- **Audience exposure:** internal-only, authenticated external, anonymous
  public, or mixed.
- **First-release surfaces:** a named area with its audience, primary jobs,
  shell posture, navigation model, and content density.
- **Work posture:** operational and data-dense, balanced workspace, spacious
  self-service, content-led discovery, or guided and low-distraction.
- **Constraints:** primary devices, locale direction, accessibility needs, and
  any reason users cross between surfaces.

Prefer the narrowest accurate category. Use `mixed` only when multiple
first-release surfaces genuinely need different shells. Do not treat `admin`,
`dashboard`, `portal`, `platform`, or `modern` as sufficient design direction.

## Category Patterns

These patterns are defaults to reason from, not rigid templates.

| Category or surface | Design mentality | Default shell posture |
| --- | --- | --- |
| Internal operations or admin | Optimize repeated work, scanning, comparison, exception handling, bulk actions, and clear system state. Favor useful density over promotional presentation. | Persistent header plus navigation sidebar on wide screens. Keep the sidebar expanded by default, allow a labeled icon-rail collapse, and use an overlay drawer on narrow screens. Give working content the available width. |
| Customer self-service or account portal | Help people understand status and complete occasional personal tasks with low cognitive load. Use more guidance, whitespace, and reassurance than an admin console. | Full-width global header with a centered, bounded workspace. Add local sidebar navigation only when several peer account areas justify it; otherwise use shallow header navigation or in-page navigation. |
| Public content, service, or marketing | Prioritize comprehension, trust, discovery, SEO, and a clear primary action. Page rhythm may be more expressive than authenticated work areas. | Global header and footer with content-appropriate width. Do not add a persistent application sidebar unless the public information architecture genuinely requires one. |
| Commerce storefront or marketplace | Prioritize product discovery, comparison, search, categories, price and availability clarity, cart confidence, and conversion. | Storefront header with identity, search, categories, account, and cart; responsive catalog and filter regions. Give checkout a separate low-distraction shell. Treat merchant or staff operations as an internal admin surface. |
| Collaborative product workspace | Optimize switching between persistent work areas, projects, teams, and recent context while keeping the current object clear. | Application header with workspace or project context. Add a sidebar when multiple persistent areas or nested navigation require it; otherwise prefer a simpler header shell. |
| Guided transactional service | Keep attention on completing a bounded journey correctly. Explain progress, validation, consequences, saving, and confirmation. | Minimal global navigation with a step or task flow. Avoid a large dashboard shell that competes with the transaction. |
| Mixed product | Preserve each audience's mental model while maintaining recognizable brand and interaction foundations. | Create explicit route or application shells per surface. Never force public, customer, checkout, and staff areas into one universal layout. |

## Shell Selection Rules

Select a shell in this order:

1. Identify the audience and their primary job on the surface.
2. Determine whether work is frequent and operational or occasional and guided.
3. Count meaningful top-level areas and navigation depth; do not count every
   entity or user-generated item as shell navigation.
4. Determine whether users need persistent cross-area context, comparison, or
   rapid switching.
5. Account for narrow screens, touch use, locale direction, and accessibility.
6. Select the simplest shell that preserves orientation and efficient task
   completion.

Use header-only navigation for a small, shallow set of areas. Combine a header
and sidebar when navigation is broad, nested, or frequently switched. Put
deeper object navigation, filters, tabs, or breadcrumbs in the content region
instead of creating an unbounded or deeply nested sidebar.

## Admin And Operational Shell

For an internal admin or staff surface, use both a persistent header and a
sidebar unless the documented navigation is exceptionally shallow:

- Place product identity, page or organization context, global search when
  useful, notifications, help, locale or theme controls, and the user menu in
  the header according to their real scope.
- Place stable product-area navigation in a semantic `nav` on the logical start
  side: left in LTR and right in RTL.
- Group navigation by staff workflows and permissions, not by database tables
  or company departments. Keep labels short and keep the current location
  unmistakable.
- On wide screens, default to the readable expanded sidebar. Allow collapse to
  an icon rail only when every item has a strong icon, an accessible name, a
  visible active state, and a tooltip on pointer hover and keyboard focus.
- Keep the collapse control visible, keyboard-operable, and exposed with
  `aria-expanded`. Preserve the user's preference when appropriate without
  making navigation undiscoverable for first-time users.
- On narrow screens, hide the rail and use a modal or overlay drawer triggered
  from the header. Manage focus, close on selection or Escape where expected,
  and prevent background interaction while open.
- Use the main workspace width for tables, filters, comparisons, editors, and
  dashboards. Do not center operational screens inside a consumer-sized column
  or turn every workflow into decorative summary cards.

## Customer, Public, And Commerce Shells

- Keep the global header full width, but bound ordinary reading and account
  content to a comfortable centered container. Let catalogs, boards, maps, and
  other inherently wide work use justified wider regions.
- Use a local customer sidebar only for stable peer destinations such as
  profile, orders, billing, and security. Collapse it to an accessible drawer
  or another shallow navigation pattern on narrow screens.
- Keep public navigation focused on the most important top-level destinations;
  navigation is not a complete site map.
- Separate storefront discovery from checkout. Remove promotional and unrelated
  navigation from irreversible or attention-sensitive steps when that improves
  completion and trust.
- Do not make customer or public pages imitate staff tools through dense tables,
  persistent utility rails, internal terminology, or permission-oriented menus.

## Multiple Surfaces

When a product serves different audiences:

- define a shell for each surface and name its route or application boundary;
- share brand, semantic tokens, accessible primitives, and interaction quality;
- allow navigation, density, content width, and visual rhythm to differ;
- provide an explicit, permission-aware transition only when one person may
  move between surfaces; and
- never expose staff navigation merely by hiding items in the client—server
  authorization remains authoritative.

Application and area shells belong to application composition. Route entries
compose the appropriate shell and feature; business features must not own the
global header, sidebar, router, session bootstrap, or app-wide providers.

## Verification

Before accepting an interface:

- compare the rendered shell with the recorded surface identity;
- verify wide, medium, and narrow layouts in every supported direction;
- verify sidebar expanded, collapsed, overlay, active, hover, focus, and
  permission-filtered states;
- verify skip navigation, semantic landmarks, heading hierarchy, focus return,
  keyboard operation, readable tooltips, and reduced motion;
- verify that collapsing navigation does not collapse accessible names or hide
  critical actions;
- verify page density, widths, tables, filters, empty states, errors, and main
  actions against the users' actual work; and
- verify that distinct surfaces did not accidentally converge into one generic
  dashboard shell.

## Pattern Basis

Use these sources for reasoning and then implement with the installed daisyUI
version and project tokens:

- [Carbon global header and UI shell](https://carbondesignsystem.com/patterns/global-header/)
- [daisyUI responsive and collapsible drawer](https://daisyui.com/components/drawer/)
- [Shopify application navigation](https://shopify.dev/docs/apps/design/navigation)
- [GOV.UK service navigation](https://design-system.service.gov.uk/patterns/navigate-a-service/)
- [Apple sidebar guidance](https://developer.apple.com/design/human-interface-guidelines/sidebars)
