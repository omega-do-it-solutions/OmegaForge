# Product

Complete this file when a project is created. Keep it focused on business facts,
not implementation preferences.

## Purpose

OmegaForge's public handbook helps people at every level of technical experience
use the OmegaForge template to start projects, maintain projects created with
Forge, and update those projects safely with AI assistance. It provides a simple,
bilingual, Persian-first guided path for people who do not want to manage
engineering details and a separate technical view for engineers who want to use
AI as a disciplined assistant in their workstation. Persian remains the default,
and the complete handbook and copy-ready prompts are also available in English.
These are presentation languages for the handbook, not a language boundary in
OmegaForge: visitors may communicate with their AI assistant in any language the
assistant supports and should receive responses in the language they use.

## Platforms

- First-release interface: a simple, single-page website with multiple sections,
  used in a browser.
- It is publicly available on desktop, laptop, and mobile browsers. No separate
  iOS or Android app is needed.
- Visitors can switch the complete interface between Persian with RTL layout and
  English with LTR layout without leaving or reloading the page.
- The selected language and light or dark theme persist on the visitor's device
  and are restored after a refresh. First-time visitors default to Persian and
  their operating-system theme preference.
- When the desktop header navigation is visible, its active link updates on
  selection and follows the section currently being read while scrolling.

## Future Direction

- No future expansion is currently planned. This is a focused public manual
  currently presented in Persian and English. The underlying OmegaForge
  workflows remain usable in any language supported by the chosen AI assistant.

## Brand Identity

- Primary color (hex): `#7856FF`
- Secondary color (hex): `#171717` (Tailwind `neutral-900`)

## Public Story

- Omega Do is presented as a Vienna-based digital team working across visual
  design, web and application development, and AI agents and automation.
- The handbook explains that OmegaForge serves people who want the agent to
  manage technical decisions as well as engineers who want durable context,
  explicit boundaries, focused skills, and verification around AI-assisted work.
- It explains that a single prompt is not enough for dependable software, so
  Forge combines durable product context, engineering boundaries, specialized
  skills, safeguards, and verification in a public reusable foundation.

## Users And Roles

- All visitors use the same public bilingual handbook.
- Visitors may use a guided prompt path or open the technical guide according to
  the depth of information they need; these are not separate roles or accounts.
- There are no accounts, sign-in, or role-based access levels in the first
  release.

## Main Workflows

1. Choose the handbook language: A visitor selects Persian or English. The
   complete page, interface labels, direction, guidance, and copy-ready prompts
   change together. This selection does not restrict the language they may use
   when continuing the conversation with their AI assistant.
2. Choose the level of detail: The workflow section initially shows guided,
   copy-ready prompts. A visitor can switch to an accessible technical tab that
   explains the repository context chain, engineering boundaries, workstation
   loop, verification, and retained human control without adding that density to
   the main reading path.
3. Prepare safely: Before choosing a prompt, a visitor learns that they need a
   local coding assistant with project-file access, VS Code, an empty project
   location, and prompts free of credentials or sensitive production data.
4. Create a new project: A visitor opens the handbook's project-creation
   section, enters a new project name and target path in the handbook's fields,
   and copies the completed ready-to-use prompt into Codex or Claude. The prompt
   instructs the assistant to clone the public OmegaForge GitHub repository
   into that new path, open the cloned project in VS Code, then use
   `product-details` to prepare the project brief and `bootstrap-project` to
   create the project foundation. The expected outcome is a new project based on
   OmegaForge without command-line knowledge or post-copy prompt editing.
5. Update an existing project foundation: A visitor opens the handbook's update
   section and uses a ready-to-use prompt that tells Codex or
   Claude to use `update-stack`. The expected outcome is a safe update of the
   OmegaForge-owned foundation guidance while preserving the project's own work.
6. Maintain an existing project: A visitor opens the handbook's
   maintenance section, describes their goal in a ready-to-use prompt, and asks
   Codex or Claude to select and use the relevant OmegaForge skill. The expected
   outcome is guided, professional handling of changes and maintenance work in
   accordance with the applicable OmegaForge rules.
7. Understand what happens next: The handbook shows that the assistant clarifies
   the idea, presents a proposal, waits at required approval points, and reports
   the verified result and remaining constraints.
8. Understand the project: A visitor reads who Omega Do is, the problem that led
   to OmegaForge, why a single AI prompt was not enough, and how Forge turns the
   answer into a public template, specialized skills, and reviewable rules.
9. Resolve common problems: A visitor can open accessible FAQ disclosures for
   disabled copy controls, missing skills, occupied paths, clone or update
   failures, and technical questions they cannot answer.
10. Contribute publicly: A visitor can open a prefilled GitHub issue to report a
   problem, suggest clearer copy, or contribute a translation, and can inspect
   the manual's own changelog.

## Business Rules

- Each handbook prompt must direct Codex or Claude to use the appropriate
  OmegaForge skill and follow its established rules.
- Persian and English prompts must preserve the same workflow, safety checks,
  skill selection, and required approval points.
- Neither localized prompt may force the assistant to continue in Persian or
  English. Every prompt must ask the assistant to respond in the language the
  visitor uses in the conversation.
- The handbook must distinguish its own no-storage behavior from the separate
  privacy policy of whichever AI assistant receives a copied prompt.
- The manual has its own semantic version and changelog, independent from the
  OmegaForge foundation release history.
- The page must show both the manual version and the OmegaForge version it is
  aligned with. The aligned Forge version and review date must be updated when
  the handbook is realigned with a newer foundation release.
- Valid language and theme preferences must be restored from browser storage.
  Missing, invalid, or unavailable storage must fall back safely without
  preventing the handbook from loading.
- Guided prompts should keep explanations clear and concise, while the technical
  tab may expose repository structure and engineering behavior in greater depth.
  Required safeguards and approval points in the applicable OmegaForge rules
  still apply in both views.
- The technical tab must favor scanning over density: one visual execution flow,
  one compact repository-source mapping, and one clearly separated summary of
  retained human control.
- Decorative background lighting must remain subtle and distributed across the
  page rather than clustering around the hero.
- Scroll-based navigation state must be throttled so it does not update React on
  every raw browser scroll event.

## Risks

- Public visitors may encounter outdated prompts if the handbook falls behind
  the OmegaForge `main` version. The handbook must be kept updated alongside
  `main` so its prompts remain aligned with current Forge rules.

## Data And Files

- The handbook only displays Persian and English guidance, technical reference
  material, and ready-to-copy AI prompts.
- It stores only the selected language and theme in the visitor's browser. These
  preferences are not personal information and are not sent to OmegaForge.
- It does not accept uploads, generate downloads, manage files, or store prompt
  entries in the first release.
- Copied prompts leave the handbook when a visitor places them in an external AI
  assistant and are then governed by that service's privacy behavior.

## Scale And Freshness

- The handbook is public and intended for a modest audience across technical
  experience levels; it remains a static site with no user-specific processing.
- It is updated continuously alongside the OmegaForge `main` source so visitors
  use current guidance and prompts.
- The page displays its manual version, aligned OmegaForge version, last review
  month, and a direct link to the manual changelog.

## External Systems

- The handbook does not connect directly to Codex, Claude, or any other
  external system. It only provides copy-ready Persian and English prompts for
  visitors to use in their own AI assistant session; those sessions and the
  OmegaForge workflow itself may continue in any language supported by that
  assistant.

## Success

- The first release is successful when it is a well-designed, easy-to-read,
  easy-to-understand public bilingual presentation that helps newcomers use
  OmegaForge without managing technical details and gives engineers a concise,
  accurate model for applying Forge in an AI-assisted workstation. It should
  clearly explain who created Forge and why it exists. Visitors should also
  understand how to prepare safely, what happens after a prompt is sent, where
  external privacy begins, how to recover from common problems, and how to
  contribute. Their language and theme choices should remain unchanged after a
  refresh, and they should understand that the handbook's two interface
  languages do not restrict their conversation language. The technical view
  should be easy to scan in both directions, ambient decoration should remain
  balanced throughout the page, and header navigation should clearly show the
  current reading position.

## Out Of Scope

- A separate mobile application
- User accounts, sign-in, and role-based access
- Direct connections to Codex, Claude, or another AI service
- Storing user data, accepting uploads, generating downloads, or file management
