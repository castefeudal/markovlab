# Публикация MARKOVLAB

## Единственный внешний ввод

Укажите настоящий production URL в `assets/js/config.js`, затем выполните `npm run release:metadata`. Скрипт из этой единственной точки формирует canonical, sitemap, robots, OG URL и JSON‑LD URL.

## Локальная проверка

```bash
npm test
npm run docs:matrix
npm run release:metadata
npm run dev
```

Проверьте русскую поверхность, профиль, расчёт, историю, снимки, import/export, темы, печать и консоль.

## GitHub Pages

1. Публикуйте содержимое папки `markovlab/`.
2. Сохраняйте относительные пути и `404.html`.
3. Не меняйте scope/start URL service worker без проверки подпути.
4. После HTTPS‑публикации дождитесь activation service worker и выполните offline reload.

## Release gate на опубликованном origin

- Chromium, Firefox, WebKit/Safari;
- viewport matrix и 200%/400% reflow;
- Light/Dark/Midnight/System;
- install/update/offline;
- print preview;
- NVDA или VoiceOver smoke test;
- Lighthouse/Web Vitals;
- отсутствие 404, mixed content и ошибок консоли.

## Обновление PWA

При изменении shell/assets измените cache ID в `sw.js`. Не добавляйте тяжёлые декоративные изображения в precache. Отсутствующий asset не должен получать HTML fallback; fallback допустим только для navigation request.
