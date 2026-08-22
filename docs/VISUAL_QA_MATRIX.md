# MARKOVLAB 4.0 Visual QA Matrix

Reviewed 22 August 2026 in Chromium using the production static tree and `tests/visual-harness.html`. “Pass” means the screenshot was inspected for clipping, horizontal overflow, hierarchy, contrast, long copy, controls and fixed navigation.

| Route / state | Mobile | Tablet | Desktop | RU | EN | Light | Dark | Midnight | Screenshot | Result |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Home | 320, 390, 430 | 768, 1024 | 1366, 1440, 1920 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | Pass |
| Library | 390 | 768 | 1366 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | Pass |
| Body laboratory | 390 | 768 | 1366 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | Pass |
| BMI form | 390 | 768 | 1366 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | Pass |
| BMI result | 390 | 768 | 1366 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | Pass |
| Profile | 390 | 820 | 1366 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | Pass |
| Progress/history | 390 | 820 | 1366 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | Pass |
| Evidence | 390 | 820 | 1366 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | Pass |
| About | 390 | 768 | 1366 | ✓ | ✓ | ✓ | ✓ | ✓ | reviewed | Pass |
| Command palette | 390 | 768 | 1366 | ✓ | ✓ | ✓ | ✓ | ✓ | reviewed | Pass |
| Onboarding, 3 steps | 390 | 768 | 1366 | ✓ | ✓ | ✓ | ✓ | ✓ | reviewed | Pass |
| Theme/data popovers | 390 | 768 | 1366 | ✓ | ✓ | ✓ | ✓ | ✓ | reviewed | Pass |
| 404 | 390 | 768 | 1366 | ✓ | ✓ | ✓ | ✓ | ✓ | reviewed | Pass |
| Print report | — | A4 | A4 | ✓ | ✓ | ✓ | ✓ | ✓ | CSS review | Pass |

## Matrix samples

- `assets/screenshots/after/home-ru-light.jpg`
- `assets/screenshots/after/home-ru-dark.jpg`
- `assets/screenshots/after/mobile-home-390.jpg`
- `assets/screenshots/after/mobile-calculator-390.jpg`
- `assets/screenshots/after/calculator-result.jpg`

## Iterations recorded

1. Structure: library hierarchy, personalized return surface and calculator information order.
2. Visual: full-bleed instrument hero, mineral/forest depth and result signature.
3. Polish: 320 px Russian heading fit, persistent mobile RU/EN control, popover event reliability and horizontal reflow containment.

Firefox, WebKit and native assistive-technology runs remain separate release-environment checks; they are not falsely marked as executed here.
