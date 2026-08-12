# OmegaForge Manual Changelog

All notable changes to the public OmegaForge Manual are recorded here. Manual
versions are independent from OmegaForge foundation versions. The current
released manual version is also stored in `VERSION`.

## Unreleased

## 0.6.0 - 2026-08-12

### Added

- A ready-made `$clean-template-residue` workflow for turning OmegaForge's
  project-facing community files, repository metadata, and placeholders over to
  a derived project through an approval-gated cleanup manifest.
- Plain-language guidance explaining that the engineering foundation remains in
  the project and that licenses, notices, and attribution require an explicit
  owner decision.

### Changed

- Aligned the manual with OmegaForge v0.9.0 and its post-bootstrap project
  handoff cleanup.
- Linked Mo. MIKAELI's creator credit to his GitHub profile.

## 0.5.0 - 2026-08-11

### Added

- A ready-made `$design-interface` workflow for defining or correcting product
  category, audience surfaces, application shells, navigation, and UI density.
- A ready-made `$audit-project` workflow for auditing implemented code,
  repairing verified architecture drift, and decomposing oversized files by
  responsibility rather than arbitrary line counts.
- Plain-language guidance explaining why internal admin, public, customer,
  commerce, checkout, collaborative, and guided surfaces may need different
  layouts within the same product.

### Changed

- Aligned the manual with OmegaForge v0.8.0 and its smarter skill routing,
  interface-identity intake, category-aware frontend rules, and code audit
  workflow.
- Updated new-project guidance to explain that product discovery records who
  uses each surface and bootstrap derives the appropriate application shell.

## 0.4.0 - 2026-08-11

### Added

- Public Apache 2.0 license access and structured GitHub paths for manual bugs,
  documentation suggestions, and translations.
- Creator credit for Mo. MIKAELI alongside Emad Moghimi and Omega Do IT
  Solutions.

### Changed

- Aligned the manual with OmegaForge v0.7.0 and clarified that each project's
  approved technical profile owns its stack, application Dockerfiles, Compose
  topology, CI, hosting, and deployment choices.
- Clarified that OmegaForge's root Compose service is an optional local
  SeaweedFS dependency rather than an application or production topology.

## 0.3.0 - 2026-08-10

### Added

- A refactor workflow that creates a clean OmegaForge project and derives its
  `docs/product.md` from the documentation and implemented business behavior of
  a read-only source project.
- A separate bootstrap step explaining research and stack recommendations,
  owner review and alterations, explicit approval, project creation, checks,
  startup, and sample-page review.
- The official Omega Do wordmark as a theme-aware SVG and a branded favicon.
- Smooth FAQ expand and collapse animations with reduced-motion support.
- A lightweight `VERSION` source, a locally linked manual changelog, and
  developer attribution for Emad Moghimi.

### Changed

- Replaced the React and Forge workspace with a standalone English HTML, CSS,
  and JavaScript site that needs no build process or application server.
- Split new-project setup into product-definition and bootstrap steps.
- Added fresh-project and refactor-project tabs to product definition.
- Standardized English typography on Inter and interface icons on Phosphor.
- Simplified the hero heading and removed the unnecessary generic feature and
  maintenance prompt.

### Removed

- The Persian translation, language switcher, React application, workspace
  configuration, and other framework-specific project files.

## 0.2.0 - 2026-08-09

### Changed

- Rewrote the Persian and English handbook copy in a shorter, more direct voice.
- Replaced the workflow tab border with a clean filled selection state and kept
  the viewport fixed when switching between guided and technical content.
- Replaced the technical stepper with an aligned lifecycle summary and clarified
  its engineering terminology.
- Reduced the hero heading height and let its two-tone text wrap naturally across
  responsive layouts.

## 0.1.0 - 2026-08-09

### Added

- A complete public handbook in Persian and English, with RTL and LTR layouts
  and language-independent prompts for supported AI assistants.
- Guided create, update, and maintenance workflows, plus a separate technical
  guide for engineers using Forge in AI-assisted software development.
- Public background on Omega Do, why OmegaForge exists, how it works, setup
  readiness, expected outcomes, privacy boundaries, FAQs, and contribution
  links.
- Persisted language and theme preferences, smooth section navigation, and a
  throttled active-section indicator in the header.

### Changed

- Split the handbook into section-owned content and React components with lazy
  loading for independently delivered page sections.
- Reworked the technical guide for clearer scanning and distributed the ambient
  background decoration across the full page.
