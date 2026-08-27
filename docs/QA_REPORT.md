# QA report — MARKOVLAB 5.2.1

Date: 27 August 2026.

## Executed

- Automated regression: 114 passed, 0 failed.
- Registry/data/docs build gates, JavaScript syntax and whitespace check: passed.
- Production Chromium preflight: `#calc/bmi` pointer activation reproduced as failed; keyboard activation succeeded. The target element was verified by hit testing.

## Code-reviewed

- One delegated Pro activation path records `pointerdown`, `pointerup` and `click` before calculating Scenario B.
- The localized worked-example and print paths map select IDs to active-language labels.
- PWA runtime cache identity is `5.2.1-r1`.

## Blocked / pending

- Local Playwright Chromium binary was unavailable; an attempted browser download did not complete in this environment.
- Post-deployment Chromium, touch-device, offline reload and rendered contrast measurements are pending the deployed SHA.

## Release rule

The release is not browser-confirmed until a deployed manual pointer click records `pointerdown → pointerup → click`, changes `aria-pressed` to `true`, and renders Scenario B. Do not replace this with a DOM, regex or keyboard-only claim.
