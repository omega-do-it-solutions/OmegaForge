---
name: design-interface
description: Define, review, or revise an OmegaForge product's interface identity, product category, audience surfaces, application shells, navigation posture, content density, and responsive design mentality. Use when the owner asks what kind of interface a product should have, wants to distinguish internal admin, public, customer, commerce, workspace, or guided-service experiences, wants to change an established layout direction, or reports that generated UI feels like the wrong kind of product.
---

# Design Interface

Define a durable interface identity before choosing page composition. Treat the
product category as evidence, not as a visual template, and assign a deliberate
shell to each distinct audience surface.

## Required Context

Before proposing or changing an interface profile, read:

1. `AGENTS.md`
2. `docs/product.md`
3. `docs/ai/interface-design.md`
4. `docs/ai/architecture.md`
5. `docs/ai/application-structure.md`
6. `docs/ai/skill-routing.md`

If application code exists, also inspect its route tree, root and area layouts,
navigation, responsive behavior, permissions, locale direction, and established
design tokens. Load `$frontend` before changing interface code.

## Establish The Current Truth

Determine from product facts and implemented behavior:

- the primary product category and any secondary category;
- whether access is internal-only, authenticated external, anonymous public, or
  mixed;
- each first-release surface, its audience, their recurring jobs, and whether
  they cross between surfaces;
- navigation breadth and depth, work frequency, information density, decision
  risk, primary devices, locale direction, and accessibility needs;
- the current shell for each surface and any mismatch with the documented
  identity.

Do not infer an admin experience merely from an `/admin` route, or a consumer
experience from modern visual styling. Validate identity from who uses the
surface and what work they repeatedly perform.

When product facts are missing or contradictory, ask one short business-language
question at a time. Do not ask the owner to choose components, breakpoints, or a
CSS layout. Present those as derived design decisions.

## Define The Interface Profile

Use the categories and shell selection rules in `docs/ai/interface-design.md`.
A mixed product must name each surface independently. For example, commerce may
have a public storefront, a customer account area, a low-distraction checkout,
and an internal operations console; sharing brand tokens does not make them one
shell.

Present this reviewable profile before a material identity change:

```text
INTERFACE DESIGN PROFILE

Product category:
Audience exposure:
First-release surfaces:
- Surface: audience, primary jobs, shell, navigation, density
Responsive posture:
Locale and direction:
Shared visual language:
Intentional differences between surfaces:
Current implementation conflicts:
Documentation changes:
Application changes, if requested:

Why this fits:
- ...
```

If the requested identity is already unambiguous, the user has explicitly asked
for implementation, and no established product statement conflicts, treat that
request as approval. Otherwise wait for the owner to approve the profile before
changing `docs/product.md` or migrating an established shell.

## Record And Implement

Update only the `Interface Identity` section of `docs/product.md` for the
product decision. Preserve all accurate requirements and record each distinct
surface rather than reducing a mixed product to one label.

When implementation is requested:

1. Load `$frontend` and follow the installed framework and daisyUI rules.
2. Put global and area shells in application composition, not in a business
   feature.
3. Reuse shared tokens and primitives while allowing different shells for
   different audiences.
4. Preserve routes, permissions, workflows, and public contracts unless the
   user explicitly requests their change.
5. Migrate in coherent shell and route-area slices; do not rewrite unrelated
   feature content to make it visually uniform.
6. Verify the complete rendered experience at supported widths, directions,
   keyboard paths, expanded and collapsed navigation states, and permission
   variants.

Do not add a second UI kit or install a dashboard template. Use the category to
shape information architecture, navigation, density, and composition—not to
copy another product's branding.

## Report

State the recorded identity, shells selected per surface, documentation and code
changed, responsive and accessibility checks run, intentionally preserved
differences, and any remaining mismatch or decision that needs owner input.
