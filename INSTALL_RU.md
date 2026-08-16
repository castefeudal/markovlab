# MARKOVLAB — Инструкция по развёртыванию

## Быстрый старт

### Вариант A: локально

```bash
npm install
npm run dev
```

Откройте `http://localhost:4173/`

### Вариант B: production build

```bash
npm install
npm run build
npx serve dist
```

### Вариант C: GitHub Pages (рекомендуется)

1. Создайте репозиторий на GitHub (например, `markovlab`)
2. Загрузите все файлы
3. **Settings → Pages → Source → GitHub Actions**
4. Сайт развернётся автоматически

---

## Команды

| Команда | Описание |
|---|---|
| `npm install` | Инициализация |
| `npm run dev` | Dev-сервер :4173 |
| `npm test` | 66 тестов |
| `npm run build` | Production → dist/ |
| `npm run check` | Тесты + build |
| `npm run preview` | Preview dist/ |

---

## Добавить калькулятор

1. Математика → `assets/js/formulas.js`
2. Запись → `assets/js/calculators.js` (массив `CALCULATORS`)
3. Контент → `assets/js/content.js`
4. `npm test` — все 66 должны пройти

## Добавить перевод

`assets/js/i18n.js` — два объекта `copy.ru` и `copy.en` с одинаковыми ключами.

---

## Кастомный домен

Файл `CNAME` в корне с содержимым `your-domain.com`. DNS: CNAME → `USERNAME.github.io`.
