# MARKOVLAB 3.0 release checklist

## Automated — passed

- [x] `npm test`: 44 passed, 0 failed.
- [x] All JS/service-worker files pass syntax check.
- [x] 85 calculators execute finite defaults and resolve source IDs.
- [x] Every calculator has bilingual individual use context, field help, related path and visualization policy.
- [x] Nine domains have unique limits, imagery and curated four-step workflows.
- [x] Formula regression vectors pass; formulas were unchanged.
- [x] RU/EN dictionaries match.
- [x] v1 migration, v2 import/export and structured history boundaries pass.
- [x] Major pages and every calculator state render without broken values.
- [x] No arbitrary result percentage or fake gauge remains.
- [x] Manifest icons and PWA core paths exist; no remote runtime JS/CSS/font.

## Real Chromium — passed

- [x] Home, Library, Category, Calculator empty/result/error, Profile, Insights, History, Trends, Evidence, About, Search and Onboarding inspected.
- [x] 390×844 RU Light, RU Dark and EN Light compositions rendered without horizontal overflow.
- [x] 768×1024 Light/Dark compositions rendered without horizontal overflow.
- [x] Desktop Light/Dark/Midnight and RU/EN inspected; Midnight is distinct.
- [x] Profile save/reload, calculator prefill/override, calculation and validation exercised.
- [x] History save/reopen and two-snapshot trend flow exercised.
- [x] Multiword RU search and keyboard ArrowDown/Enter exercised.
- [x] Language/theme persistence across reload exercised.
- [x] Result and error-summary focus transitions verified.
- [x] Application-origin console remained free of uncaught errors.

## Source/security inspection — passed

- [x] No visible TODO, lorem ipsum, broken image or remote runtime dependency.
- [x] No opaque AI/health score or diagnostic claim.
- [x] Destructive actions use contextual confirmation dialogs.
- [x] Malformed/future/oversized import, prototype keys and external-link isolation are covered.
- [x] Light/Dark/Midnight/System tokens, reduced motion, forced colors and print rules exist.
- [x] Version matches package/config/UI/cache/docs.

## Honest external/manual limits

- [ ] Firefox and WebKit: not exposed by this controlled browser runner.
- [ ] Full NVDA/VoiceOver auditory pass: assistive-technology runtime not exposed.
- [ ] Disconnected-origin reload: controlled browser blocked the stopped local origin; source/PWA tests pass.
- [ ] Final secure-origin install prompt and OS icon masks: require the published HTTPS origin/device.
- [ ] Set the real production URL and generate domain-bearing sitemap/canonical metadata.

Unchecked entries are external environment/release inputs, not claimed as passes.
