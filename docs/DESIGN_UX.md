# MARKOVLAB 3.0 design and UX system

## Direction

Modern scientific editorial system × precision instrument interface. The intended character is calm, exact, tactile, private and premium; clarity and evidence remain more important than decoration.

## Tokens

`assets/css/styles.css` provides the stable component foundation. `assets/css/styles-v3.css` adds final semantic tokens for page/elevated/sunken surfaces, primary/secondary/tertiary text, subtle/normal/strong borders, semantic and evidence colors, chart colors, radii, shadows, typography, motion and responsive composition.

Light is mineral/ivory, Dark is deep forest/graphite, and Midnight uses a blue-black technical surface so it is visibly distinct from Dark. System maps to the OS preference. A deterministic system font stack supplies Cyrillic and avoids a missing or remote font request. Metrics use tabular numerals.

## Brand and imagery

The M/orbit/measurement-axis mark remains optically simple from favicon to horizontal lockup. The imagery system uses original local WebP assets: a product-loop hero, nine domain instruments, profile reuse, evidence axes, progress, privacy, onboarding and empty-state art. Images contain no readable text, stock people, clinical clichés or arbitrary gauges.

## Domain language

| Laboratory | Visual model |
| --- | --- |
| Body | anthropometric axes, circumference and proportion planes |
| Energy | calibrated input/transfer/output flow |
| Nutrition | measured composition and energy-density planes |
| Strength | force balance, load and vectors |
| Cardio | cadence rollers, rhythm and timing |
| Recovery | circadian rings and restoration reservoir |
| Focus | time blocks, signal and noise |
| Money | cash-flow modules and unsmoothed scenario paths |
| Utility | coordinated scales and conversion bridge |

## Components and states

Buttons, icon buttons, text actions, links, chips, method/evidence badges, inputs/selects, dialogs, command palette, cards, result/source/insight/history/trend cards, alerts, toast, empty states, breadcrumbs, sidebar, topbar and bottom navigation cover default, hover, focus-visible, active, selected, disabled/invalid and destructive states where applicable.

## Result ethics

The primary result is the visual climax. Supporting order is context → confidence → limitation → action → formula/source. Visualization is shown only when the value has a meaningful interval, composition, comparison, delta, conversion or scenario relationship. Exact results and estimates that would gain false precision remain numeric only.

## Responsive model

- ≥1180 px: fixed sidebar, sticky topbar and controlled 1480 px content width.
- 900–1179 px: bottom navigation, deliberate tablet grids and one-column calculator/category flow.
- ≤640 px: touch-first forms/actions, compact hero, full-width result, sheet dialogs and safe-area navigation.
- ≤360 px and short landscape: additional density and navigation handling without hiding core actions.

Primary controls target roughly 44×44 CSS px. A successful mobile calculation scrolls to and focuses the result. Route navigation resets scroll and focuses the main landmark.

## Accessibility

Native semantics come first. The product includes a skip link, landmarks, heading order, `aria-current`, visible focus, labels/descriptions, focusable error summary, `aria-invalid`, polite result/toast regions, dialog focus behavior, accessible chart names/titles, reduced motion, forced-colors fallback, reflow and non-color evidence labels.

## Motion

State changes use restrained 140–220 ms transitions. No decorative loop runs continuously. `prefers-reduced-motion` removes nonessential motion and switches result scrolling to instant behavior.
