# MARKOVLAB 10X Report

## Baseline

- Repository: `castefeudal/markovlab`
- Baseline branch: `main`
- Baseline SHA: `be64df389605762b8ab58966c151ef9127b311e7`
- Baseline tests: 71 passed, 0 failed.
- Baseline screenshots: Home, library, category, calculator form/result, profile, insights, evidence and mobile states.

## Problems

The v3.1 core was already useful and mathematically mature, but discovery still exposed too much of the 85-tool registry at once; the hero did not own a distinctive product image; language selection was not a complete first-class shell control; profile value was represented mainly as completion; and the release evidence did not include current browser screenshots. The first 4.0 visual pass then remained too close to a generic SaaS dashboard: inflated navigation pills, oversized headings, decorative image treatment, excessive card chrome and a vertically stretched result surface. The 4.1 pass directly removes those weaknesses. Browser QA also exposed an over-broad `section + section` rule that created artificial whitespace inside the result, plus untranslated document chrome in English; both are fixed and regression-covered.

## Product Architecture

The stable vanilla ES-module architecture remains. Hash routes preserve GitHub Pages compatibility. The top-level model is Home, Laboratory, Progress, Profile, Evidence and About; Settings/Data lives in compact popovers. Home becomes a return dashboard when local activity exists.

## Brand

The identity is “precision instrument × scientific editorial product × personal analytics”. Mineral ivory, graphite, forest, mint and restrained brass replace generic SaaS styling.

## Logo

The existing original M/axis/progress mark was expanded and documented as a complete primary, horizontal, compact, monochrome, dark-background, favicon, app-icon, avatar and OpenGraph system.

## Visual Design

The release uses a restrained editorial type scale, technical index navigation, deliberate text/instrument compositions, quieter surface depth, formal spacing, hierarchy in the library, a compact two-column calculator result signature and explicit responsive rules through 320 px. Global section spacing is now scoped only to page-level blocks, so nested evidence and result sections retain useful density.

## Images

Three new original production visuals were generated, inspected and optimized: hero precision instrument, local privacy vault and honest progress instrument. They join the coordinated local laboratory, evidence, profile, onboarding and empty-state WebP series.

## UX

Natural-language discovery, persistent RU/EN and theme controls, command palette keyboard flow, three-step onboarding, meaningful empty states and clearer local-data actions reduce time to first useful result.

## Calculator Experience

All 85 calculators retain their IDs and formulas. Pages provide purpose, when useful, required inputs, localized field help and validation, result meaning, method/evidence, uncertainty, limitation, action, formula/sources and related next steps. Explicit click and submit paths now share one calculation flow.

## Content

`CONTENT_COMPLETENESS_MATRIX.md` contains 85/85 rows and verifies purpose, description, input help, example, meaning, evidence, uncertainty, limitation, action, references, related tools and RU/EN coverage.

## RU/EN

The shell, navigation, search aliases, calculators, errors, dialogs, 404, print content and manifests are bilingual. First launch uses browser Russian only for `ru*`; every other browser language starts in English. Manual choice persists locally.

## Themes

Light, Dark, Midnight and System share semantic tokens but have independent surfaces, borders, imagery treatment and chart contrast. An inline bootstrap applies locale/theme before stylesheets to prevent FOUC.

## Accessibility

Landmarks, skip link, native labels, visible focus, live result/alerts, keyboard palette, touch targets, reduced motion, semantic chart alternatives and 320 px reflow are retained or strengthened. Target: WCAG 2.2 AA.

## Performance

The product remains build-free vanilla JavaScript with no remote runtime dependencies or font requests. The three new WebPs total under 230 KB; hero is preloaded, supporting visuals lazy-load, and the service worker caches the release shell.

## PWA

Localized manifests, raster any/maskable icons, relative scope, shortcuts, update messaging, bounded same-origin caching and offline navigation fallback are release-tested.

## Evidence

Method type and evidence strength remain independent dimensions. The interface distinguishes exact equations, validated/population estimates, heuristics and guidelines, then exposes sources, assumptions and the primary limitation.

## Testing

Final local gate: 90 passed, 0 failed. It covers formulas, registry, render states, search intents, localization parity including document chrome, storage/import/migration, assets, PWA, version consistency, early bootstrap syntax, stale-cache prevention and completeness matrices.

## Browser QA

Chromium scenarios executed: first/return Home, natural-language search, RU↔EN, Light/Dark/Midnight, calculator input/result, save to history, Progress, Profile, Evidence, menu controls and 320/390 responsive surfaces. Application console: no uncaught errors or failed resources after fixes.

## Before/After

Paired captures live in `assets/screenshots/before/` and `assets/screenshots/after/`; the separate screenshot archive contains the wider release matrix.

## Deployment

GitHub Actions runs the quality gate on pull requests and Pages deployment from `main`. Production canonical: `https://castefeudal.github.io/markovlab/`.

## Remaining limitations

Firefox, WebKit, native NVDA/VoiceOver and installed-device PWA checks require external runtimes not available in this session. No product feature is intentionally left as a placeholder.
