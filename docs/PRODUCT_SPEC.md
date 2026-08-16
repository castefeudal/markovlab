# MARKOVLAB 3.0 — implemented product specification

## Job to be done

Enter shared data once, answer a measurable question, understand what the result means and how uncertain it is, take a proportionate next action, then compare later observations without sending personal data to a server.

## Information architecture

Hash routes: `#home`, `#calculators`, `#category/<id>`, `#calc/<id>`, `#profile`, `#insights`, `#evidence`, `#about`. Desktop uses a persistent sidebar; compact layouts use a five-item safe-area bottom navigation.

The nine domains are standalone editorial laboratory pages. Each calculator uses one scientific-communication template but has individual purpose/use copy, field help, limitations, worked example and semantic related path.

## State schema

Release 3.0 deliberately keeps storage schema v2 so existing users are not migrated without a data need:

```json
{
  "version": 2,
  "lang": "ru",
  "theme": "system",
  "profile": {},
  "favorites": [],
  "history": [],
  "snapshots": [],
  "recents": [],
  "onboardingDismissed": false
}
```

Legacy `markovlab-state-v1` migrates once. Calculator drafts live only in `sessionStorage`. History stores sanitized structured inputs and results so a record can reopen. History and snapshots are capped at 200.

## Calculator contract

Every registry entry has a stable ID, domain, RU/EN title and description, method type, evidence strength, source IDs, typed fields and pure calculation. `content.js` adds individual use context, semantic field guidance, a visualization policy and related calculators. Every result exposes primary/secondary values, interpretation, uncertainty context, limitation, action, assumptions/formula and source links.

Visualization is opt-in: exact-number only, valid interval, composition, comparison, delta, conversion or scenario. No arbitrary percentages, speedometers or traffic-light scales are generated.

## UX contract

- Profile values prefill calculators and are visibly identified; local overrides do not mutate the profile.
- Invalid forms expose a focusable summary, labels, `aria-invalid` and described field errors.
- Successful mobile calculation moves focus to the complete result with sticky-header offset.
- Route changes reset scroll position and focus the main landmark.
- Save result, snapshot, export and import remain explicit; destructive actions use contextual dialogs.
- Token-aware search covers RU/EN titles, aliases, descriptions, categories, keywords and common questions.
- Trends use straight segments only, expose dates and numeric current/previous/difference summaries.

## Privacy and security

No backend, telemetry, analytics, trackers, remote fonts/scripts/styles or runtime CDN. Import is limited to 2 MB, parsed defensively, version-checked, allowlisted, calculator-ID validated, date-normalized and bounded. Rendered user data is escaped. External sources use `target="_blank"` with `rel="noopener noreferrer"`.

## Release architecture

Static ES modules, relative assets, hash routing, same-origin service worker and no framework/build requirement preserve GitHub Pages subpath compatibility.
