# MARKOVLAB Brand System 4.0

## Concept

MARKOVLAB is a precision instrument for personal decisions. The identity combines an **M**, a calibrated axis and a rising measurement trace. It deliberately avoids flasks, atoms, brains, medical symbols and generic AI gradients.

Brand attributes: precise, scientific, editorial, tactile, controlled, candid and personal.

## Logo system

The master mark is SVG. `assets/brand/` contains:

- `logo-primary.svg` — primary lockup;
- `logo-horizontal.svg` and dark/light variants — navigation and reports;
- `logo-mark.svg` — compact mark;
- `logo-mono.svg` — one‑colour reproduction;
- `favicon.svg`, social avatars, OpenGraph assets and PWA icons.

Clear space is one half of the mark diameter on every side. Do not rotate, distort, add glow, recolour individual strokes or place the mark on visually noisy imagery. At 16–24 px use the compact mark; below 16 px use the raster favicon.

## Colour

The core palette is mineral ivory, deep forest, graphite, controlled mint and restrained brass. Semantic colours never replace explanatory text.

| Role | Intent |
| --- | --- |
| Page / recessed | quiet mineral field |
| Surface / elevated | readable editorial layers |
| Graphite | primary information |
| Forest | action and calibrated progress |
| Mint | local/private/supportive states |
| Brass | reference marks and secondary emphasis |
| Info / success / warning / danger | explicit semantic states only |

Light, Dark and Midnight are independently tuned token sets. System resolves early from `prefers-color-scheme`; all choices persist locally.

## Typography

The product uses a local system stack with high-quality Cyrillic coverage and no remote font dependency. Display headings are compact and editorial; body copy keeps readable line length; labels are short and technical; metric values use tabular numerals. Units remain visually subordinate but never ambiguous.

## Imagery

Art direction: precision instruments, measured geometry and premium studio materials. Mineral backgrounds, forest metal, mint traces and small brass details form one series. Images contain no accidental text, fake charts, patients, fitness models or decorative “AI” objects.

Hero, privacy and progress imagery is original generated artwork; laboratory and supporting imagery remains a coordinated local WebP series. Meaningful images receive localized captions; decorative images use `alt=""`.

## Iconography

One inline SVG family is used throughout. Icons share stroke weight, rounded joins and a geometric silhouette. Emoji and unrelated icon libraries are not mixed into the interface.

## Data visualisation

Charts use direct labels, visible axes, restrained grids and real recorded points. Lines represent chronology, bars comparison, intervals uncertainty, and stacked segments composition. Gauges, speedometers, arbitrary health scores and invented smoothing are prohibited.

## Motion

Transitions are generally 100–300 ms and communicate state change: hover, focus, dialog entry, result reveal, favourite, save and chart update. `prefers-reduced-motion` removes nonessential movement and smooth scrolling.

## Voice

Copy is calm, specific and non-diagnostic. MARKOVLAB distinguishes exact mathematics, validated estimates, population estimates, heuristics and guidelines. The interface states the main limitation before encouraging action.
