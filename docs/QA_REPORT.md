# QA Report — MARKOVLAB 4.0.0

Date: 22 August 2026.

## Release verdict

Automated gate: **89 passed, 0 failed**. Chromium product scenarios and responsive screenshots were executed against the final static tree. Browser QA found and drove fixes for the early-theme bootstrap, theme/data menu event path, explicit calculator activation, 320 px Russian heading fit and horizontal reflow. Production Pages verification additionally exposed a stale-service-worker module edge case; versioned CSS/module URLs now force existing PWA clients onto the 4.0 asset graph.

## Automated coverage

- Registry: 85 unique calculators, 9 valid domains, valid schemas and finite default results.
- Formula vectors: BMI/ratios, Mifflin–St Jeor, Cunningham, Mosteller, body composition, Epley/Brzycki, pace/speed, overnight sleep, compound interest, loan, CAGR, real return, margins and conversions.
- Content: individualized result guidance, field help, examples, evidence, limitations, actions, sources, related tools and both 85-row matrices.
- RU/EN: dictionary parity, calculator/field coverage, no missing or placeholder strings, localized 404 and manifests.
- Search: twelve requested natural-language intents plus fuzzy typo handling.
- State: v1/v2→v3 migration, profile/history/snapshots/favourites roundtrip, bounded arrays, malformed/future/oversized/prototype-pollution rejection.
- PWA: icons, cache core, same-origin interception, update lifecycle, localized manifests and offline shell.
- Shell: valid early bootstrap JavaScript, no-FOUC ordering, current version, no remote runtime CSS/JS.

## Browser scenarios

Chromium passed:

1. Load Home in RU/Light and RU/Dark with zero application console errors.
2. Open the hierarchical library and search «процент жира»; relevant circumference/body-fat methods rank first.
3. Switch RU→EN and confirm English product copy and search examples.
4. Open theme controls and apply Light, Dark and Midnight.
5. Calculate BMI with 90 kg / 182 cm; receive localized 27.2/27,2 result, meaning, confidence, limitation and next step.
6. Save the result and verify it appears in Progress/history.
7. Review Profile ROI copy and Evidence hierarchy.
8. Inspect 320×568 and 390×844 mobile Home plus 390×844 calculator.

## Visual checks

Screens were inspected at 320, 390, 430, 768, 1024, 1366, 1440 and 1920 target widths through responsive harness and desktop browser sessions. The Theme × Language matrix covered RU/EN across Light, Dark and Midnight on Home, Calculator and Profile. Details: `VISUAL_QA_MATRIX.md`.

## Accessibility and safety

- Landmarks, heading order, skip link, native labels and error targets remain validated.
- Keyboard palette supports Escape, arrows and Enter; focus is visible; results and toasts use live semantics.
- Reduced motion disables nonessential transitions and smooth result scrolling.
- Health copy remains non-diagnostic and separates method, evidence and clinical interpretation.
- External source links use `noopener noreferrer`.

## Performance and assets

- No framework migration, remote fonts, CDN scripts, analytics or trackers.
- New hero/privacy/progress visuals are optimized WebP files of approximately 35 KB, 64 KB and 123 KB.
- Hero is preloaded with explicit dimensions; supporting visuals lazy-load.
- `git diff --check`, JavaScript syntax checks, resource checks and placeholder scan pass.

## External-runtime limits

Firefox, WebKit, native NVDA/VoiceOver, physical-device standalone PWA and DevTools throttled Core Web Vitals were not available in this runtime and are not falsely recorded as executed. The product retains code-level and Chromium evidence for those paths.
