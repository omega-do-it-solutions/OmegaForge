# Changelog

All notable OmegaForge blueprint changes are recorded here. Version numbers use
semantic versioning. The historical entries below are reconstructed from the
repository's commit history, beginning with the original template.

## [Unreleased]

## [0.6.0] - 2026-08-09

### Added

- A dependency-version security contract covering runtimes, frameworks,
  libraries, packages, plugins, build tools, container base images, and
  infrastructure components.
- A documented exception process requiring explicit technical-owner approval,
  compensating controls, ownership, and an upgrade or removal deadline.

### Changed

- Bootstrap profiles now select supported LTS release lines when available and
  maintained stable lines otherwise, verified against current compatibility,
  support, and security information.
- Prerelease, deprecated, end-of-life, unsupported, and known-affected direct
  dependencies are rejected from production foundations by default.
- Bootstrap, feature, frontend, backend, and delivery workflows now require
  lockfile-based vulnerability checks and block unmitigated critical or
  high-severity production findings.

## [0.5.0] - 2026-08-06

### Added

- A framework-aware application-structure guide covering Vite React, Next.js
  App Router, Vue Router, Nuxt 4, Expo Router, NestJS, and Fastify.
- NestJS and Fastify backend skill references covering module/plugin ownership,
  framework composition roots, and testable server boundaries.
- `$update-stack`, a foundation-only workflow for safely bringing an older
  OmegaForge project's guidance, built-in skills, and foundation metadata
  forward without changing application code or runtime configuration.

### Changed

- Bootstrap technical profiles must now name the selected application source
  organization alongside the framework.
- Global application composition—layouts, routing, technical providers,
  session/security setup, configuration, and telemetry—is explicitly separated
  from business features across supported frameworks.
- Bootstrap now directs existing projects to `$update-stack` for framework
  maintenance and protects the resulting foundation-state record.

## [0.4.0] - 2026-08-02

### Added

- Framework-specific frontend structure references for React, Next.js, Vue,
  and Nuxt, with feature-owned component, state, request, and test boundaries.
- Alignment rules for mixed peer components, including consistent outer
  geometry, headings, content start lines, padding, responsive behavior, and
  expanded or collapsed states in both LTR and RTL layouts.

### Changed

- Route and page files are now explicitly composition entry points; substantial
  one-use sections must be extracted when they own a distinct responsibility,
  interaction, state, validation, request, failure state, or focused test.
- Fieldsets are reserved for genuinely named groups of related controls.
  Standalone labeled fields may use cards or sections when those containers
  preserve the surrounding composition and alignment more clearly.
- Shared component locations are reserved for stable cross-feature primitives
  and product patterns instead of becoming the default destination for every
  page-specific component.

## [0.3.0] - 2026-08-02

### Added

- Permanent page-composition and UX rules for meaningful data grouping,
  proximity, balanced responsive layouts, intentional whitespace, professional
  color use, restrained container borders, and accessible disclosure motion.
- Full-page visual review requirements covering hierarchy, density, control-to-
  content relationships, supported directions, themes, and viewport widths.

### Changed

- Web UI work must check daisyUI first, use its premade components wherever they
  fit, and create custom visual elements only when no suitable daisyUI element
  exists.
- Frontend work must start from the closest version-matched official daisyUI
  example and preserve or improve its visual clarity instead of treating class
  names alone as proof of acceptable design.
- Frontend skill guidance now rejects pale, ambiguous, visually broken, or
  unfinished output and requires diagnosis of theme, configuration, CSS order,
  and override problems before adding one-off styling.

## [0.2.0] - 2026-08-01

### Added

- Guided `$product-details` discovery that builds `docs/product.md` in small,
  non-technical, business-language steps, including Farsi support.
- Question cards with the question, why it matters, an example answer, an
  owner-voiced suggested answer, and visible section-by-section progress.
- Product-document sections for platforms and business risks, including iOS and
  Android requirements, phone capabilities, customer harm, trust, legal, and
  provider concerns.
- Mobile application standards for Expo, React Native, TypeScript, Expo Router,
  Axios, TanStack Query, Zustand, React Hook Form, Zod, CASL, SecureStore, mobile
  design tokens, device modules, and React Native Testing Library.

### Changed

- Bootstrap now derives scale, real-time delivery, operating defaults, recovery,
  hosting posture, and technical choices from business facts instead of asking
  non-technical owners for infrastructure estimates.
- Bootstrap now supports a verified `apps/mobile` baseline, development builds,
  Android/iOS release artifacts, and device verification without treating a
  mobile app like a production web server.
- The frontend foundation now standardizes Axios, TanStack Query, TanStack
  Table, CASL, Phosphor icons, Zod forms, Tiptap, ApexCharts, Day.js, and the
  appropriate client-state store only when each capability is in scope.
- Project startup now treats Git as optional, creates missing local environment
  files safely, explicitly propagates configuration to every process, starts
  local dependencies, runs applicable migrations and seeds, and smoke-tests
  development and production-safe baselines.
- Development and production contracts now distinguish server processes from
  native mobile release artifacts, keep production migrations observable, and
  prohibit automatic production seeds.

### Fixed

- Restored React as the default frontend choice; Nuxt is selected only for an
  explicit preference or a concrete Vue advantage.
- Made self-hosted S3-compatible storage with SeaweedFS the default local and
  deployed object-storage posture.
- Required a generated project README to replace template-oriented OmegaForge
  setup text after a successful bootstrap.

## [0.1.0] - 2026-08-01

### Added

- Initial OmegaForge workspace template with pnpm, agent rules, modular
  application boundaries, product documentation, bootstrap contract, reusable
  implementation skills, Docker Compose local storage, and SeaweedFS support.
- Architecture guidance for modular monoliths, relational data, private
  S3-compatible file handling, delivery, verification, and Tailwind + daisyUI
  web interfaces.
