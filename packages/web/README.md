# Web (Mini App)

Telegram Mini App для VELIZHANIN Quest - мини-приложение с таблицей лидеров и статистикой пользователей.

## Технологии

- **React 18** - UI библиотека
- **TypeScript** - строгая типизация
- **Vite** - быстрый сборщик
- **TailwindCSS** - utility-first CSS фреймворк
- **React Query** - управление серверным состоянием
- **React Router** - маршрутизация
- **Zod** - валидация схем и типизация API
- **Axios** - HTTP клиент

## Структура

```
src/
├── components/      # React компоненты
│   ├── layout/      # Layout компоненты
│   └── ui/          # UI компоненты (shadcn/ui)
├── hooks/           # Кастомные React hooks
├── pages/           # Страницы приложения
├── schemas/         # Zod схемы для валидации
├── services/        # API сервисы
├── lib/             # Утилиты
└── main.tsx         # Точка входа
```

## Страницы

- **Home** (`/`) - Главная страница с навигацией
- **Leaderboard** (`/leaderboard`) - Таблица лидеров (топ-10 игроков)
- **Profile** (`/profile`) - Профиль пользователя со статистикой

## API интеграция

### Endpoints:

- `POST /api/auth/telegram` - Авторизация через Telegram WebApp
- `GET /api/leaderboard?limit=10` - Получить таблицу лидеров
- `GET /api/user/:telegramId` - Получить статистику пользователя

### Авторизация:

- JWT токен в httpOnly cookie
- Telegram `initData` для валидации
- Автоматическая авторизация при открытии

## Разработка

### Запуск dev сервера:

```bash
pnpm dev
```

Приложение откроется на `http://localhost:3000`

### Сборка:

```bash
pnpm build
```

Результат в папке `dist/`

### Проверка типов:

```bash
pnpm type-check
```

### Линтинг:

```bash
pnpm lint
```

## Environment Variables

Создайте `.env` файл:

```env
VITE_API_URL="http://localhost:3001"
```

## Особенности

### Telegram WebApp SDK

- Интеграция с Telegram WebApp API
- Автоматическое получение `initData`
- Адаптация под тему Telegram
- Управление кнопками (BackButton, MainButton)

### UI/UX

- Адаптивный дизайн (mobile-first)
- Темная тема по умолчанию
- Плавные анимации
- Telegram-подобный интерфейс

### Производительность

- Code splitting
- Lazy loading страниц
- Оптимизированные запросы (React Query)
- Минификация и tree-shaking

## Расширения VS Code (рекомендуется)

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin
