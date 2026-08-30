# QA report — MARKOVLAB 5.2.1-r2 candidate

Date: 30 August 2026.

## Executed

- Automated regression: 120 passed, 0 failed.
- Registry/data/docs build gates, JavaScript syntax and whitespace check: passed.
- Production Chromium baseline: `#calc/bmi` and `#calc/fat-gain-surplus` pointer activation reproduced as failed while Enter succeeded. Locator click and Chromium coordinate click both left `aria-pressed=false`; hit testing returned the actual scenario button.
- Production cache diagnosis: the browser loaded `app.js?v=5.2.1-r1`, but `window.__MARKOVLAB_PRO_EVENT_TRACE__` was absent. This proves the running entry module was stale relative to the merged main source and is why `r2` changes every runtime entry request and the service-worker cache identity.
- Catalogue integrity: all-library renderer exposes 86/86 tool rows; every Home `#calc/*` route resolves to an existing registry ID.
- Plate-loader vector: target 101 kg, bar 20 kg and standard one-pair inventory reports 100 kg as nearest lower and 102.5 kg as nearest upper; it never presents 100 kg as the requested 101 kg.
- History locale vector: a canonical `US fl oz` result renders `жидк. унц. США` in RU and `US fl oz` in EN.

## Code-reviewed

- The Pro control now uses a target-level pointer transaction. Capture and bubble listeners at window, document, app, form, group and button record event metadata; the button's `pointerup` applies one scenario transaction and its following click is deduplicated.
- History v4 stores canonical structured results and localizes only at render time. v1–v3 records migrate without loss; legacy summaries remain as a fallback when old records contain no structured result.
- PWA runtime cache identity is `5.2.1-r2`.

## Blocked / pending

- Post-deployment Chromium run, human manual pointer click, touch-device, offline reload, install/update and rendered responsive/zoom/assistive-technology matrix are pending the deployed SHA.

## Release rule

This candidate is not browser-confirmed until a deployed manual pointer click records `pointerdown → pointerup → click`, changes `aria-pressed` to `true`, and renders Scenario B. Do not replace this with a DOM, regex or keyboard-only claim.
