# QA‑отчёт MARKOVLAB 3.1.0

Дата: 17 августа 2026.

## Итог

Автоматический release gate текущего исходного дерева: **49 тестов пройдено, 0 ошибок**. Проверены 85 калькуляторов, формулы, registry, источники, локализация, содержательная полнота, state/import boundaries, маршруты, PWA‑ресурсы и отсутствие удалённых runtime‑зависимостей.

## Что проверено автоматически

- 85 уникальных calculator ID и 9 лабораторий.
- Representative formula vectors: антропометрия, Mifflin–St Jeor, Cunningham, Mosteller, Epley/Brzycki, темп/скорость, сон через полночь, проценты, кредит, CAGR, реальная доходность и конвертеры.
- Непустой индивидуальный контент, связанные инструменты, ограничения, действия, примеры и visualization policy.
- 85 строк в `CALCULATOR_COMPLETENESS_MATRIX.md`.
- Русские metadata, manifest и PWA shortcuts; согласованная версия 3.1.0.
- Render основных страниц и состояний без `NaN`/`undefined`.
- v1→v2 migration, структурированная история, bounded arrays, malformed/future/oversized/prototype‑pollution import rejection.
- Существование brand/PWA/image assets, отсутствие remote runtime scripts/styles/fonts.
- JavaScript и service worker проходят `node --check`.

## Реальная браузерная проверка

Базовая версия 3.0 ранее была фактически просмотрена в Chromium на desktop и mobile: главная, библиотека, категории, калькулятор до/после расчёта, профиль, история/динамика, доказательность, поиск и onboarding.

Для кандидата 3.1 в текущей изолированной среде cloud browser запретил `localhost`, `host.docker.internal` и `file://`. Поэтому новая screenshot matrix, Firefox/WebKit, отключённая сеть с перезагрузкой origin, print preview и нативный NVDA/VoiceOver **не отмечены как pass**. Кодовые и автоматические проверки не подменяют эти пункты.

## Проверено визуально по ресурсам

- 16 WebP‑изображений имеют корректный формат, размеры, локальные пути и единый forest/mint/mineral/graphite/brass язык.
- Изображения не содержат пользовательских данных, мелкого интерфейсного текста или медицинских/банковских клише.
- Новые декоративные изображения не добавлялись: существующая система покрывает необходимые роли, а дополнительные raster‑assets увеличили бы вес без улучшения задачи.

## Перед публикацией

1. Указать реальный production URL в `assets/js/config.js`.
2. Выполнить release‑матрицу Chromium + Firefox + WebKit на опубликованном HTTPS origin.
3. Выполнить offline reload, print preview и NVDA/VoiceOver smoke test.
4. При успешной проверке сохранить реальные screenshots в `assets/screenshots/`; текущий релиз не выдаёт концептуальные mockups за browser evidence.

Известных ошибок формул, storage‑потери, сломанных assets или failing automated tests нет.
