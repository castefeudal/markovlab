# Overlay theme contract

All dialogs, menus, popovers, selects, command palette surfaces, toasts and fixed notices inherit the same semantic tokens defined in `assets/css/styles-v5.css`.

## Token groups

- page / elevated / recessed surfaces
- primary / secondary / tertiary text
- soft / strong borders
- accent and focus ring
- inverse surface and inverse text
- overlay backdrop and shadow

The implementation uses `--surface-elevated`, `--surface-recessed`, `--text-primary`, `--text-secondary`, `--text-tertiary`, `--border-soft`, `--border-strong-v5`, `--focus-ring`, `--overlay-backdrop`, `--surface-inverse-v5` and `--text-inverse-v5`. A `--sunken` alias remains only for legacy v3 selectors and resolves to the current recessed surface.

## Interaction contract

- Native buttons/selects are used for Pro controls where possible.
- Focus-visible is always visible and uses the active accent.
- Escape closes dialogs and open menus; menu focus state is reset with `aria-expanded`.
- Popovers close on outside click without intercepting unrelated page controls.
- Dialog surfaces expose an accessible name and use the native dialog focus model.
- `color-scheme`, options, selection colour and controls follow the resolved theme.

## Theme matrix

| Theme | Page | Elevated surface | Accent character | Overlay treatment |
| --- | --- | --- | --- | --- |
| Light | mineral ivory | warm paper | forest green | dark neutral backdrop |
| Paper | sand / cream | cream paper | olive green + terracotta | warm brown backdrop |
| Dark | deep graphite-green | elevated green-black | mint | opaque black-green backdrop |
| Midnight | blue-black | navy graphite | cool mint | opaque blue-black backdrop |
| System | follows OS | follows OS | follows OS | follows OS |

The screenshot defect was caused by secondary text and borders being mixed with legacy values on dark surfaces. The corrective layer raises those values through the shared contract instead of applying a global inversion filter.
