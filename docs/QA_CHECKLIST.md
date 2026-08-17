# Release checklist MARKOVLAB 3.1.0

## Автоматически — выполнено

- [x] `npm test`: 49 passed, 0 failed.
- [x] 85/85 калькуляторов и 9/9 лабораторий.
- [x] Formula regression vectors и source ID integrity.
- [x] Полнота индивидуального контента и матрица 85 инструментов.
- [x] Русские metadata, manifest, PWA shortcuts и result units.
- [x] Согласованная версия 3.1.0.
- [x] Migration, import security, structured history и trends.
- [x] Нет произвольной шкалы результата или fake gauge.
- [x] Локальные assets существуют; remote runtime JS/CSS/font отсутствуют.
- [x] JavaScript и service worker проходят syntax gate.
- [x] ZIP проходит проверку целостности и smoke test после распаковки.

## Ранее проверено в реальном Chromium на базе 3.0

- [x] Главная, библиотека, категория и калькулятор.
- [x] Profile, history, trends, evidence, About, search и onboarding.
- [x] Выборочные mobile/desktop layouts и темы.

## Обязательно проверить на production HTTPS origin

- [ ] Полная screenshot matrix 320/390/768/1024/1440/1920.
- [ ] Chromium, Firefox и WebKit/Safari.
- [ ] Light, Dark, Midnight и System.
- [ ] 200%/400% reflow и forced colors.
- [ ] Нативный NVDA или VoiceOver smoke test.
- [ ] Service worker: online install → disconnected reload → update.
- [ ] Реальный browser print preview.
- [ ] Install prompt и maskable crop на устройстве.
- [ ] LCP, INP и CLS на опубликованном origin.

Непроверенные в текущей среде пункты намеренно не помечены как пройденные.
