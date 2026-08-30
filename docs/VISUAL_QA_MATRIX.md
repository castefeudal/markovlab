# Visual QA matrix — MARKOVLAB 5.2.1-r2 candidate

| Surface | Automated | Browser before release | Production after release |
| --- | --- | --- | --- |
| Home RU/EN × Light/Paper/Dark/Midnight | renderer/token coverage | pending | pending |
| BMI and fat-gain Basic/Pro | direct pointer transaction + trace coverage | pre-fix pointer failure reproduced; stale r1 runtime identified | required: manual pointer trace + `aria-pressed=true` + Scenario B on r2 SHA |
| Body worked example and print report | localization regression | pending | pending |
| Profile, Progress, Evidence | renderer coverage | pending | pending |
| 320/390/430/768/1024/1366/1440/1920 | responsive code review | pending | pending |
| Lazy images after scroll | asset existence only | pending | pending |

`pending` is deliberately not a pass. Each production screenshot must be captured after scroll where lazy images are expected, and image `naturalWidth` must be non-zero. This table does not claim mobile, touch, zoom, screen-reader or offline execution before that evidence exists.
