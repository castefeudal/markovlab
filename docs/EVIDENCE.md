# Evidence and safety policy

## Two axes

Each tool exposes a **method type** (`math`, `guideline`, `validated-estimate`, `screening`, `heuristic`, `experimental`) and a separate **evidence strength** (`high`, `moderate`, `limited`, `experimental`). Evidence strength describes the basis of a method, not the accuracy of an individual result.

## Source hierarchy

Current official guidance and primary/original validation papers are preferred, followed by systematic reviews and authoritative institutional references. Source URLs are centralized in `assets/js/references.js` and mirrored to `data/sources.json`; access date is 2026-08-15.

## Safety rules implemented

- BMI, WHtR and WHR are screening ratios, never diagnoses.
- Mifflin–St Jeor, Cunningham, body-fat, HRmax and field VO₂ tools are estimates, not measurements.
- TDEE, calorie targets, hydration, TEF, readiness and financial-independence outputs are scenarios/heuristics.
- A 7700 kcal/kg conversion is only an energy-equivalent arithmetic model, never a deterministic long-term weight forecast.
- Every health-adjacent result carries an in-context non-diagnostic boundary.
- Clinical dosing and diagnostic tools are excluded.
- WHO-5 is excluded from public core because the release did not complete a current licensing/usage and clinical-review gate.

## Interpretation hierarchy

Read every result in this order: result → context → method/evidence → limitation → proportional next action → formula/source. Ranges are used where they better represent real uncertainty.

MARKOVLAB 3.0 adds method-specific confidence language and an explicit visualization policy. Exact arithmetic may be deterministic while its inputs remain uncertain; population equations may be well supported while individual prediction error remains material. No single combined method/evidence score is computed.

## Source verification

Key current values were checked against WHO, EFSA, AASM/SRS and primary PubMed records. Automated integrity tests verify that every referenced ID resolves. Link availability can change after release; link checking is recorded separately in QA.

The 3.0 finishing pass re-opened representative official/primary records for WHO physical-activity guidance, the Mifflin–St Jeor paper, the AASM/SRS adult sleep consensus and EFSA caffeine guidance. WHO and PubMed records resolved; EFSA temporarily rate-limited the automated fetch, while its registry URL and source metadata were retained unchanged. No formula or threshold was modified from that review.
