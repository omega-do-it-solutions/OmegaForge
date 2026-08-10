# OmegaForge Manual Changelog

All notable changes to the public OmegaForge Manual are recorded here. Manual
versions are independent from OmegaForge foundation versions. The current
released manual version is also stored in `VERSION`.

## Unreleased

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
