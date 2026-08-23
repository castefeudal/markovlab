# MARKOVLAB 5.0 Visual QA Matrix

Baseline production was inspected in Chromium on 24 August 2026. Final production review is recorded after merge; rows distinguish actual screenshots from static responsive/code review.

| Route / state | Mobile | Tablet | Desktop | RU | EN | Light | Dark | Midnight | Evidence | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Home | 320–430 code | 768–1024 code | 1366–1920 code | ✓ | ✓ | ✓ | tokens | tokens | preview + production pending | Ready for deploy review |
| Library | 320–430 code | 768–1024 code | 1366–1920 code | ✓ | ✓ | ✓ | tokens | tokens | renderer + regression test | Ready for deploy review |
| Laboratory | 320–430 code | 768–1024 code | 1366–1920 code | ✓ | ✓ | ✓ | tokens | tokens | v4 baseline + v5 overrides | Ready for deploy review |
| Calculator form | 320–430 code | 768–1024 code | 1366–1920 code | ✓ | ✓ | ✓ | tokens | tokens | 85 empty/result render tests | Ready for deploy review |
| Calculator result | 320–430 code | 768–1024 code | 1366–1920 code | ✓ | ✓ | ✓ | tokens | tokens | density regression test | Ready for deploy review |
| Profile | 320–430 code | 768–1024 code | 1366–1920 code | ✓ | ✓ | ✓ | tokens | tokens | route render test | Ready for deploy review |
| Progress/history | 320–430 code | 768–1024 code | 1366–1920 code | ✓ | ✓ | ✓ | tokens | tokens | route render test | Ready for deploy review |
| Evidence | 320–430 code | 768–1024 code | 1366–1920 code | ✓ | ✓ | ✓ | tokens | tokens | optimized 1400×1050 visual | Ready for deploy review |
| Command palette | mobile drawer | tablet dialog | desktop dialog | ✓ | ✓ | ✓ | ✓ | ✓ | keyboard/search tests | Pass |
| 404 | responsive | responsive | responsive | ✓ | ✓ | system | system | system | static page review | Pass |
| Print | — | A4 | A4 | ✓ | ✓ | print | print | print | CSS + renderer review | Pass |

## Required final screenshot set

- Home, Library, Laboratory, calculator form/result, Profile, Progress and Evidence;
- RU/EN;
- Light/Dark/Midnight;
- mobile Home and calculator;
- before/after archive.

No row is labelled “screenshot reviewed” until the deployed v5 asset has actually been opened and captured.
