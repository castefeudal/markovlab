# Final product audit

Date: 2026-08-16  
Baseline: MARKOVLAB 2.0.0  
Release: MARKOVLAB 3.0.0 — Visual & Product Completion

## Intake completed

Read in full: README, PRODUCT_SPEC, DESIGN_UX, prior AUDIT, EVIDENCE, FORMULAS, QA_REPORT, QA_CHECKLIST, ROADMAP, DEPLOY, RELEASE_NOTE, `index.html`, `404.html`, all CSS, renderer/application/router/storage/validator/recommendation/formula/calculator/source/i18n modules, manifest, service worker, tests, JSON registries and brand assets. Baseline tests were 39/39.

## Strong foundations retained

- 85 calculator IDs and nine domains.
- Pure formula layer, stable source registry and explicit result models.
- Local-first architecture, no account/backend/analytics.
- Independent method/evidence axes, visible limitations and non-diagnostic language.
- RU/EN, four themes, PWA/offline, hash routing and GitHub Pages subpath safety.
- State v2 and v1 migration.

## 3.0 findings and corrections

| Finding | Implemented correction |
| --- | --- |
| Visual system remained mostly SVG/card-driven | Added a coherent 16-asset scientific-editorial WebP system and RU/EN social identity |
| Domain pages shared too much visual/copy structure | Added nine unique hero instruments, boundaries and hand-curated workflows |
| Calculator use text and field hints were generic | Added 85 bilingual use cases and semantic field guidance |
| Result visualization could imply arbitrary scale | Removed the pseudo-percentage renderer and introduced an explicit semantic policy |
| Confidence copy repeated across methods | Added method-specific deterministic confidence context |
| Home hero CTA fell below the initial desktop viewport | Rebalanced grid, typography and vertical rhythm after browser inspection |
| Route changes could preserve previous scroll | Added scroll reset and focus management |
| Result focus could sit under sticky UI | Added result scroll margin and start alignment |
| Activity insight fired without entered minutes | Required an actual activity-duration input and added regression coverage |
| Multiword search required contiguous text | Added token-aware matching and per-token highlight |
| Trend x-axis lacked visible dates | Added localized first/last date labels while preserving straight segments |
| Version/asset/docs drift | Unified 3.0.0 versioning, cache, data catalog and documentation |

## Outcome

The application now reads as one product system rather than a set of calculators. Automated gate: 44/44. Real Chromium inspection covered first visit, Home, Library, category, calculator empty/result/error, profile, history, trends, evidence, About, onboarding and command palette in RU/EN, Light/Dark/Midnight, 390 px, 768 px and desktop compositions.

## External release input

The production domain is unknown and intentionally not invented. The only input is `assets/js/config.js → productionBaseUrl`.
