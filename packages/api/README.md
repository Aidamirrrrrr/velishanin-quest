# API

REST API для VELIZHANIN Quest на базе NestJS с PostgreSQL и Prisma ORM.

## Технологии

- **NestJS** - прогрессивный Node.js фреймворк
- **Prisma** - современный ORM для TypeScript
- **PostgreSQL** - реляционная база данных
- **JWT** - авторизация через httpOnly cookies
- **class-validator** - валидация DTO
- **class-transformer** - трансформация объектов
- **Passport** - стратегии аутентификации
- **Helmet** - защита HTTP заголовков
- **cookie-parser** - парсинг cookies

## Структура

```
src/
├── auth/              # Аутентификация (JWT, Telegram)
│   ├── decorators/   # Декораторы (CurrentUser)
│   ├── dto/          # DTO для авторизации
│   ├── guards/       # Guards (JwtAuthGuard)
│   ├── strategies/   # Passport стратегии (JWT)
│   └── utils/        # Утилиты (jwt-time)
├── bot/              # Эндпоинты для бота
│   └── dto/          # DTO для бота
├── leaderboard/      # Таблица лидеров
│   └── types/        # TypeScript типы
├── quest/            # Квесты
│   ├── dto/          # DTO для квестов
│   ├── quests/       # Данные квестов
│   └── types/        # TypeScript типы
├── user/             # Пользователи
│   └── types/        # TypeScript типы
├── prisma/           # Prisma сервис
├── app.module.ts     # Корневой модуль
└── main.ts           # Точка входа
```

## API Endpoints

### Auth
- `POST /api/auth/telegram` - Авторизация через Telegram WebApp (возвращает JWT в cookie)

### Leaderboard
- `GET /api/leaderboard?limit=10` - Получить таблицу лидеров

### User
- `GET /api/user/:telegramId` - Получить статистику пользователя

### Quest
- `GET /api/quest/:id` - Получить квест по ID
- `POST /api/quest/submit` - Отправить результаты квеста (требует JWT)

### Bot (без JWT)
- `POST /api/bot/quest/submit` - Отправить результаты от бота (с telegramId)

## База данных

### Схема Prisma

```prisma
model User {
  id           Int           @id @default(autoincrement())
  telegramId   BigInt        @unique
  firstName    String
  username     String?
  isPremium    Boolean       @default(false)
  questResults QuestResult[]
}

model QuestResult {
  id          Int      @id @default(autoincrement())
  userId      Int
  questId     String
  score       Int
  answers     Json
  completedAt DateTime @default(now())
  user        User     @relation(fields: [userId], references: [id])
}
```

## Разработка

### Установка зависимостей:
```bash
pnpm install
```

### Настройка базы данных:
```bash
# Генерация Prisma Client
pnpm db:generate

# Применение миграций
pnpm db:push

# Открыть Prisma Studio (GUI для БД)
pnpm db:studio
```

### Запуск dev сервера:
```bash
pnpm dev
```

API будет доступен на `http://localhost:3001`

### Сборка:
```bash
pnpm build
```

### Production:
```bash
pnpm start:prod
```

### Проверка:
```bash
# TypeScript
pnpm type-check

# Линтинг
pnpm lint

# Форматирование
pnpm format
```

## Environment Variables

Создайте `.env` файл:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/velizhanin_quest"
TELEGRAM_BOT_TOKEN="your_telegram_bot_token"
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="3h"
JWT_COOKIE_NAME="access_token"
NODE_ENV="development"
PORT=3001
CORS_ORIGIN="*"
```

## Авторизация

### Telegram WebApp
1. Frontend отправляет `initData` от Telegram
2. API валидирует подпись через HMAC
3. Создает/находит пользователя в БД
4. Возвращает JWT в httpOnly cookie

### JWT Cookie
- `httpOnly: true` - защита от XSS
- `secure: true` (production) - только HTTPS
- `sameSite: 'lax'` - защита от CSRF

### Защищенные эндпоинты
Используют `@UseGuards(JwtAuthGuard)` и декоратор `@CurrentUser()`

## Валидация

Все входящие данные валидируются через `class-validator`:

```typescript
export class TelegramAuthDto {
    @IsString()
    @IsNotEmpty()
    public initData: string
}
```

## CORS

Настроен для работы с Telegram Mini App:
- Credentials: true
- Origin: configurable через env

## Мониторинг

### Health Check
```bash
curl http://localhost:3001/api/health
```

### Logs
```bash
# Development - автоматические логи NestJS
# Production - настроить winston/pino
```

## Безопасность

- Helmet для HTTP заголовков
- CORS настроен
- JWT в httpOnly cookies
- Валидация всех входящих данных
- Проверка Telegram initData через HMAC
- Rate limiting (рекомендуется добавить)
