# QA and release report

Release candidate: **3.0.0**  
Date: **2026-08-16**

## Outcome

Production source, all 85 calculators, persistence/migration, import boundary, bilingual renderers, individualized content, brand imagery and PWA assets pass the automated gate: **44 tests passed, 0 failed**. Every JavaScript/module file and service worker passes `node --check`.

## Automated coverage

- Formula vectors: body ratios, Mifflin–St Jeor, Cunningham, Mosteller, composition, Epley/Brzycki, pace/speed, sleep across midnight, compounding, loans, CAGR, real return, margin/markup and conversions.
- Registry/content: 85 unique calculators, nine domains, valid fields, bilingual individual use cases, field help, curated workflows, related tools, visualization mapping and source resolution.
- Rendering: all primary pages and all 85 empty/result calculator states in RU/EN without `NaN`/`undefined`.
- Accessibility: landmarks, skip target, current navigation, native labels, descriptions, error targets and isolated external links.
- Persistence/security: v1→v2 migration, structured history, bounded arrays, allowlisted profile/import, future/malformed/prototype-pollution rejection.
- PWA/static: raster any/maskable icons, Apple/brand assets, same-origin caching, navigation-only HTML fallback, explicit update flow, JSON validity and no remote runtime CSS/JS/font.

## Real browser QA — Chromium

The application was served through the project preview and inspected in a live Chromium session. A bounded iframe harness rendered exact responsive CSS widths while preserving real browser layout and interaction.

| Area | Verified result |
| --- | --- |
| First visit/onboarding | deliberate modal, correct focusable controls, no overflow |
| Home | RU Light/Dark, EN Light at 390 px; RU Light/Midnight desktop; primary CTA visible |
| Tablet | 768×1024 Profile Light and Evidence Dark; no horizontal overflow |
| Category | Body hero, content hierarchy and local image rendering |
| Calculator | BMI empty, valid result, mobile focus/scroll, copy hierarchy and no pseudo-gauge |
| Validation | focus moves to error summary; field exposes `aria-invalid="true"` |
| Profile | save → reload retained 7 demo values; snapshot action worked |
| History | save result → list → reopen restored weight/height |
| Trends | two snapshots produced unsmoothed charts and current/previous/delta summaries |
| Search | `вес рост` returned BMI/BSA with both tokens highlighted; ArrowDown/Enter opened selection |
| Language/theme | RU→EN and Light→Dark persisted through reload; Midnight visually distinct |
| Evidence/About/Library | hierarchy, links, 85 cards, version and zero horizontal overflow |
| Console | no application-origin uncaught error; only the cloud-browser extension emitted its own metadata warning |

## Accessibility and reflow

Keyboard command-palette navigation, native form controls, result focus, route focus, validation announcement target and chart names/titles were exercised. Responsive checks at 375 effective CSS px and 753 effective CSS px cover the 390/768 frames including scrollbar width. A 680 px reflow equivalent was also source/DOM checked; no page-level horizontal overflow appeared. A screen-reader semantic smoke test used the browser accessibility DOM; a full NVDA/VoiceOver auditory session was not available.

## PWA/offline

Manifest/icon paths, same-origin scope, navigation fallback, cache versioning and update application are covered by automated tests. After the preview server was stopped, the controlled browser security policy blocked the offline URL reload before the page could report a result. That environment block is recorded rather than converted into a pass; the service-worker navigation fallback and “missing asset is not HTML” behavior remain covered by source tests.

## Scientific integrity

No formula or threshold changed in 3.0. Existing documented source verification and regression vectors remain the scientific source of truth. The UI pass removed false precision, preserved population/individual boundaries and made method-specific uncertainty more visible.

## Limitations of this runner

Only Chromium was exposed by the controlled browser service. Firefox/WebKit, a native NVDA/VoiceOver auditory session and the final disconnected-origin reload were not permitted by this runner and are not falsely marked as passes. Browser-produced screenshot bytes were visually inspected during QA, but the controlled browser filesystem was read-only, so the archive includes the reproducible responsive harness rather than fabricated screenshot files.

## Release input

Set the real `productionBaseUrl` when the public domain is selected. No product-code failure blocks GitHub Pages publication.
