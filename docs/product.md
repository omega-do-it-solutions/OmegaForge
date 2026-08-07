# Product

Complete this file when a project is created. Keep it focused on business facts,
not implementation preferences.

## Purpose

OmegaForge's handbook helps non-technical colleagues and company staff use the
OmegaForge template to start projects, understand the recommended project
structure and technology choices, maintain projects created with Forge, and
update those projects safely. It provides a simple, Farsi-first manual so staff
do not need to rely on command-line knowledge or strong English skills.

## Platforms

- First-release interface: a simple, single-page website with multiple sections,
  used in a browser.
- It is available to staff on desktop, laptop, and mobile browsers. No separate
  iOS or Android app is needed.

## Future Direction

- No future expansion is currently planned. This is a focused internal company
  manual to help workers use OmegaForge.

## Brand Identity

- Primary color (hex): `#7856FF`
- Secondary color (hex): `#171717` (Tailwind `neutral-900`)

## Users And Roles

- All colleagues and company staff use the same shared Farsi handbook.
- There are no accounts, sign-in, or role-based access levels in the first
  release.

## Main Workflows

1. Create a new project: A colleague opens the handbook's Farsi project-creation
   section, enters a new project name and target path in the handbook's fields,
   and copies the completed ready-to-use prompt into Codex or Claude. The prompt
   instructs the assistant to clone the authorized OmegaForge GitHub repository
   into that new path, open the cloned project in VS Code, then use
   `product-details` to prepare the project brief and `bootstrap-project` to
   create the project foundation. The expected outcome is a new project based on
   OmegaForge without command-line knowledge or post-copy prompt editing.
2. Update an existing project foundation: A colleague opens the handbook's
   Farsi update section and uses a ready-to-use prompt that tells Codex or
   Claude to use `update-stack`. The expected outcome is a safe update of the
   OmegaForge-owned foundation guidance while preserving the project's own work.
3. Maintain an existing project: A colleague opens the handbook's Farsi
   maintenance section, describes their goal in a ready-to-use prompt, and asks
   Codex or Claude to select and use the relevant OmegaForge skill. The expected
   outcome is guided, professional handling of changes and maintenance work in
   accordance with the applicable OmegaForge rules.

## Business Rules

- Each handbook prompt must direct Codex or Claude to use the appropriate
  OmegaForge skill and follow its established rules.
- Prompts should favor completing the requested workflow with minimal technical
  explanation for the colleague. Required safeguards and approval points in the
  applicable OmegaForge rules still apply.

## Risks

- No current first-release risk is identified from outdated prompts: the
  handbook will be kept updated in step with the current OmegaForge `main`
  version so its prompts remain aligned with Forge rules.

## Data And Files

- The handbook only displays Farsi guidance and ready-to-copy AI prompts.
- It does not store colleague information, accept uploads, generate downloads,
  or manage files in the first release.

## Scale And Freshness

- The handbook serves fewer than 10 internal staff members.
- It is updated continuously alongside the OmegaForge `main` source so workers
  use current guidance and prompts.

## External Systems

- The handbook does not connect directly to Codex, Claude, or any other
  external system. It only provides copy-ready Farsi prompts for colleagues to
  use in their own AI assistant session.

## Success

- The first release is successful when it is a well-designed, easy-to-read,
  easy-to-understand Farsi presentation that helps non-technical staff use
  OmegaForge for project creation, updates, and maintenance.

## Out Of Scope

- A separate mobile application
- User accounts, sign-in, and role-based access
- Direct connections to Codex, Claude, or another AI service
- Storing user data, accepting uploads, generating downloads, or file management
