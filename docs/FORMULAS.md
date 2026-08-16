# Formula reference

Implementation source of truth: `assets/js/formulas.js`. Unless noted, arithmetic tools use the entered units exactly. Biological estimates are rounded to match method precision rather than JavaScript precision.

## Body

| Tool | Formula | Units / rounding | Scope and limitation | Source |
|---|---|---|---|---|
| BMI | `weight_kg / height_m²` | kg/m², 1 decimal | Adult population screening; does not distinguish muscle and fat | WHO anthropometry |
| BMI-associated range | `BMI_bound × height_m²` | kg, 1 decimal | Scenario from chosen cut-offs; not an ideal weight | WHO anthropometry |
| WHtR | `waist_cm / height_cm` | ratio, 2 decimals | Screening ratio; tape technique/population matter | WHO waist report; systematic review |
| WHR | `waist_cm / hip_cm` | ratio, 2 decimals | Screening distribution ratio, not visceral-fat measurement | WHO waist report |
| Navy circumference | Male: `86.01 log10(waist−neck) − 70.041 log10(height) + 36.76`; female: `163.205 log10(waist+hip−neck) − 97.684 log10(height) − 78.387` using inches | %, 1 decimal | Field estimate; not DXA; circumference protocol is critical | US Navy validation literature |
| Relative Fat Mass | `64 − 20×height/waist + 12 if female` | %, 1 decimal | Adult anthropometric prediction | Woolcott & Bergman, 2018 |
| Deurenberg | `1.2×BMI + 0.23×age − 10.8×male − 5.4` | %, 1 decimal | Population equation; ethnicity and training status affect error | Deurenberg et al., 1991 |
| Fat / fat-free mass | `weight×BF%`; `weight−fat` | kg, 1 decimal | Inherits error of entered BF% | Arithmetic |
| FFMI | `FFM / height_m²` | 1 decimal | Inherits body-composition error | Arithmetic index |
| Normalized FFMI | `FFMI + 6.1×(1.80−height_m)` | 1 decimal | Comparison heuristic, not a clinical boundary | Published convention; limited evidence label |
| Mosteller BSA | `sqrt(height_cm×weight_kg/3600)` | m², 2 decimals | Estimate; not for unsupervised clinical dosing | Mosteller, 1987 |
| Weight change | `end−start`; `%=(end−start)/start×100` | kg / %, 1 decimal | Short windows are affected by body water | Arithmetic |
| Weekly trend | `(end−start)/days×7` | kg/week, 2 decimals | Linear average, not tissue-specific change | Arithmetic |
| Target waist scenario | `height×selected WHtR` | cm, 1 decimal | User-selected scenario, not prescription | WHtR screening literature |

Regression vectors: BMI(80 kg, 180 cm) = 24.6914; Mosteller(80 kg, 180 cm) = 2.000 m²; composition(80 kg, 20%) = 16 kg fat and 64 kg FFM.

## Energy and nutrition

| Tool | Formula | Scope / limitation | Source |
|---|---|---|---|
| Mifflin–St Jeor | `10W + 6.25H − 5A + 5` male; `−161` female | Resting-energy prediction, not indirect calorimetry | Mifflin et al., 1990 |
| Cunningham | `370 + 21.6×FFM` | Prediction that inherits FFM error | Cunningham, 1991 |
| TDEE factor | `resting energy × activity factor` | Coarse scenario; TDEE is dynamic | Heuristic built on resting estimate |
| Observed TDEE | `average intake − weight change×7700/days` | Calibration heuristic; water/adaptation distort short periods | Energy-equivalent arithmetic |
| Calorie scenario | `maintenance×(1+adjustment%)` | Scenario, not guaranteed weight trajectory | Arithmetic/heuristic |
| Energy equivalent | `kcal/7700` | Rough equivalent only; never a linear long-term forecast | Heuristic |
| Protein range | `weight×low/high g·kg⁻¹` | Goal, age, diet and clinical context matter | ISSN position stand; EFSA DRV |
| Protein per meal | `daily protein/meals` | Distribution heuristic, not a biological maximum | ISSN context |
| Macro calories | `4P + 4C + 9F + 7Alcohol` | Standard metabolizable-energy factors; labels may differ | Arithmetic convention |
| Carb remainder | `(kcal−4P−9F)/4` | Negative output indicates inconsistent targets | Arithmetic |
| Fat range | `kcal×selected%/9` | User-selected share | Arithmetic scenario |
| Fiber reference | `kcal/1000×selected g` | Scalable reference; tolerance differs | Guideline-style user-selectable reference |
| Hydration | `weight×selected mL/kg` | Context-sensitive heuristic; heat, sweat, food and health matter | Explicit heuristic |
| Caffeine dose | `mg/weight_kg` | Absolute single/daily dose and timing also matter | EFSA, 2015 |
| TEF | `kcal×selected percentage range` | Model, not measured individual thermogenesis | Explicit heuristic |
| Calorie density | `kcal/grams×100` | Exact within entered label data | Arithmetic |
| Protein price | `price/protein_g×100` | Cost only, not food-quality score | Arithmetic |

Regression vector: Mifflin male, 80 kg, 180 cm, 35 y = 1755 kcal/day.

## Strength

| Tool | Formula | Scope / limitation |
|---|---|---|
| Epley e1RM | `load×(1+reps/30)` | Estimate; error increases with reps and context |
| Brzycki e1RM | `load×36/(37−reps)` | Estimate; registry restricts reps to 20 |
| Ensemble | arithmetic mean of Epley and Brzycki | Comparison estimate, not measured 1RM |
| Load from %1RM | `1RM×percentage` | Depends on 1RM quality and daily readiness |
| Relative strength | `load/bodyweight` | Compare only like movement/technique |
| Volume load | `load×reps×sets` | Mechanical volume is not hypertrophy stimulus |
| Weekly tonnage | `volume×sessions` | Same limitation as volume load |
| Plate loader | `(target−bar)/2`, descending paired plates | Verify actual bar/plate labels |
| Strength density | `volume/minutes` | More is not automatically better |
| RIR potential reps | `completed reps + RIR` | Subjective heuristic; novice calibration may be poor |

Regression vector at 100 kg × 5 reps: Epley = 116.667 kg; Brzycki = 112.5 kg.

## Cardio

| Tool | Formula | Scope / limitation | Source |
|---|---|---|---|
| Pace from speed | `60/speed_kmh` | Unit conversion | Arithmetic |
| Speed from pace | `60/pace_min_km` | Unit conversion | Arithmetic |
| Race time | `distance×pace` | Constant-average scenario | Arithmetic |
| Riegel | `T2=T1×(D2/D1)^k`, default `k=1.06` | Prediction, not promise; transfer degrades over large distance changes | Published model convention |
| Cooper VO₂ | `(distance_m−504.9)/44.73` | Field estimate; not CPET; validation scope limited | Validation literature |
| Rockport VO₂ | `132.853 − .0769×weight_lb − .3877×age + 6.315×male − 3.2649×time_min − .1565×HR` | Standardized one-mile field test; not CPET | Kline et al., 1987 |
| Age-predicted HRmax | `208−0.7×age` | Population estimate with large individual error | Tanaka et al., 2001 |
| HRR zone | `HRrest+(HRmax−HRrest)×intensity` | Medication, heat, stress and HRmax error affect output | Karvonen convention |
| MET calories | `MET×3.5×kg/200×minutes` | Population approximation | Standard MET arithmetic |
| Steps distance | `steps×stride_cm/100000` | Stride changes with speed/terrain | Arithmetic |
| Cadence speed | `steps/min×stride_m×60/1000` | Constant-average scenario | Arithmetic |
| W/kg | `watts/bodyweight` | Protocol and power-meter accuracy matter | Arithmetic |
| FTP range | `FTP×selected percentages` | Zone system/protocol heuristic | User-selected scenario |
| Aerobic equivalent | `moderate minutes + 2×vigorous minutes` | Does not capture all load dimensions | WHO activity guidance |

Regression vector: 12 km/h = 5:00 min/km and round-trips to 12 km/h.

## Recovery, focus and time

| Tool | Formula | Scope / limitation |
|---|---|---|
| Sleep duration | clock difference; add 24 h when negative | Time in interval, not measured sleep |
| Sleep gap | `actual−target` | Evaluate regular average, not one night |
| Sleep midpoint | `bedtime + duration/2` | Schedule marker |
| Social jetlag | smallest circular difference between midpoints | Reflection metric, not diagnosis |
| Sleep efficiency | `sleep/time in bed×100` | Depends on sleep measurement quality |
| Caffeine remaining | `dose×0.5^(hours/half-life)` | Half-life varies substantially |
| Subjective readiness | bounded transparent linear combination of sleep, soreness, stress and motivation | Custom heuristic; not biomarker or validated clinical scale |
| Focus ratio | `focused/available×100` | Time allocation, not output quality |
| Habit adherence | `completed/planned×100` | Depends on meaningful plan |
| Goal progress | `current/target×100` | Only for meaningful quantitative goals |
| Time budget | `168−sleep−work−commitments` | Categories must not overlap |
| Life balance | `100−10×population SD(ratings)` bounded at zero | Reflection heuristic, not quality-of-life measurement |
| Decision/priority | `impact×confidence/(effort+risk)` | Subjective comparison heuristic |

Regression vector: 23:30 → 07:30 = 8.0 hours.

## Money and converters

Money tools are arithmetic/scenarios, not financial advice. Compound interest uses monthly compounding and an annuity contribution; a 0% branch avoids division by zero. Loan payment uses the standard amortizing-payment formula with an explicit 0% branch. Debt payoff rejects payments that do not cover monthly interest. CAGR is `(end/start)^(1/years)−1`; real return is `(1+nominal)/(1+inflation)−1`; margin uses selling price as denominator while markup uses cost. FIRE target is `annual expenses/withdrawal rate` and is explicitly a user-assumption scenario.

Converters use: 1 kg = 2.2046226218 lb; 1 in = 2.54 cm; 1 mi = 1.609344 km; 1 kcal = 4.184 kJ; 1 US fl oz = 29.5735295625 mL. Round-trip regression tests cover every pair.
