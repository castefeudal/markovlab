# MARKOVLAB 5.2.1 — final corrective report

Date: 27 August 2026.

## Scope and source of truth

- Baseline: `origin/main` at `97bf6cfd69c1c461b6241847fd362086158d39c0`.
- Working branch: `work/markovlab-final-corrective`.
- Registry preserved: 86 calculator IDs, 9 laboratories, local-first storage and vanilla ES modules.

## Reproduced production defect

On production `#calc/bmi`, Chromium showed the `+5%` control as the hit-tested element. A real pointer path did not change `aria-pressed` or Scenario B, while `Enter` did. This is classified as a site defect: it was reproduced on the same visible element, not inferred from DOM presence.

## Corrective changes

- Replaced competing capture, direct and delegated Pro listeners with one delegated `#app` activation path.
- Added an inspectable runtime event trace: `window.__MARKOVLAB_PRO_EVENT_TRACE__` records `pointerdown → pointerup → click`; the active form also exposes the trace in `data-pro-event-trace` for QA.
- A pointer click now has one transaction: selected state, Scenario A/B output and source attribution update together. Runtime failures log to the console, populate a visible error, and are retained in `window.__MARKOVLAB_PRO_LAST_ERROR__`.
- Made the scenario data value explicit (`data-pro-delta="5"`) and retained native button/radio semantics plus Enter, Space, arrows, Home and End.
- Localized select values in Russian worked examples and print inputs, including `male`, `intermediate` and `sedentary`.
- Reworked inverse-surface foreground tokens. Author, About and Trust eyebrow/link foreground now resolve through an inverse-safe accent token; overlays use one semantic surface contract.
- Advanced the runtime cache identity to `5.2.1-r1` and service-worker cache to `markovlab-v5.2.1-r1`.

## Executed checks

- `npm test`: 114 passed, 0 failed.
- `npm run build:data`: passed.
- `npm run docs:matrix`: passed.
- JavaScript syntax and `git diff --check`: passed.

## Browser evidence status

| Check | Status | Evidence |
| --- | --- | --- |
| Production pre-fix pointer failure | executed | Chromium pointer path: no selected state or Scenario B; keyboard succeeds. |
| Local post-fix browser e2e | blocked | This runtime has Playwright but lacks its Chromium binary; browser download did not complete. |
| Published post-fix pointer trace | pending deployment | Must show `pointerdown → pointerup → click`, `aria-pressed=true`, and Scenario B after the deployed SHA is live. |
| Contrast measurements on rendered surfaces | code-reviewed | Semantic foreground/surface contract is in place; final computed-style ratios remain a deployment gate. |

No browser scenario above is represented as executed unless stated in this table.
