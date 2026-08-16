# Что исправлено / добавлено — MARKOVLAB 3.0.0

## Добавлено

1. **`scripts/build.mjs`** — production build → `dist/` (449 файлов, 2.14 MB)
   - 170 SEO-страниц калькуляторов (85 × RU + EN)
   - 18 SEO-страниц лабораторий (9 × RU + EN)
   - 170 OG-карточек (SVG)
   - sitemap.xml (189 URLs)
   - robots.txt

2. **`.github/workflows/deploy-pages.yml`** — CI/CD: test → build → deploy Pages

3. **`.gitignore`** — node_modules, dist, .DS_Store, .env

4. **Тесты валидации** (+22 теста, итого 66):
   - `content-validator.test.mjs` — валидация калькуляторов, контента, ассетов
   - `i18n-coverage.test.mjs` — полнота RU/EN переводов
   - `version-consistency.test.mjs` — единообразие версий

5. **`package.json`** — скрипты `build`, `check`, `preview`

6. **`INSTALL_RU.md`** — инструкция на русском

## Исправлено

- Build script генерирует правильные пути: `dist/ru/tools/{id}/index.html` (без slug)
- Тесты используют прямой `import` вместо сломанного `createRequire`
- GitHub Actions: `npm install` вместо `npm ci` (нет lock-файла)
- OG-карточки используют цвета проекта, не generic Tailwind
