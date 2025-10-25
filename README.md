# VELIZHANIN Quest

> **Тестовое задание** для вакансии "Технический специалист по Telegram-ботам и мини-приложениям"  
> Студия VELIZHANIN | Контент Могущество.Клуб

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=flat&logo=nestjs&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![Telegraf](https://img.shields.io/badge/Telegraf-26A5E4?style=flat&logo=telegram&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white)

## Описание проекта

Полнофункциональный Telegram-бот с мини-приложением для прохождения программистских квестов. Проект включает:

- **Telegram-бот** - интерактивный бот с квестами и AI-советчиком
- **Mini App** - мини-приложение с таблицей лидеров и статистикой
- **AI-интеграция** - советчик на базе Groq API (LLaMA 3.1 70B)
- **База данных** - PostgreSQL с Prisma ORM
- **REST API** - NestJS бэкенд с валидацией и авторизацией

---

## Структура проекта

```
velizhanin-quest/
├── packages/
│   ├── api/        # NestJS REST API + Prisma + PostgreSQL
│   ├── bot/        # Telegram Bot (Telegraf + TypeScript)
│   └── web/        # React Mini App (Vite + TailwindCSS)
├── package.json    # Monorepo root
└── README.md
```

---

## Технологический стек

### Backend (API)
- **NestJS** - прогрессивный Node.js фреймворк
- **Prisma** - современный ORM для TypeScript
- **PostgreSQL** - реляционная база данных
- **JWT** - авторизация через httpOnly cookies
- **class-validator** - валидация DTO

### Bot
- **Telegraf** - мощный фреймворк для Telegram Bot API
- **Groq SDK** - интеграция с AI (LLaMA 3.1 70B)
- **TypeScript** - строгая типизация
- **Scenes** - управление диалогами

### Frontend (Mini App)
- **React 18** - UI библиотека
- **TypeScript** - типизация
- **Vite** - быстрый сборщик
- **TailwindCSS** - utility-first CSS
- **React Query** - управление состоянием
- **Zod** - валидация схем

---

##  Быстрый старт

### Требования
- Node.js >= 20.0.0
- pnpm >= 9.0.0
- PostgreSQL >= 14

### 1. Клонировать репозиторий
```bash
git clone <repository-url>
cd velizhanin-quest
```

### 2. Установить зависимости
```bash
pnpm install
```

### 3. Настроить переменные окружения

#### API (`packages/api/.env`)
```env
DATABASE_URL="postgresql://user:password@localhost:5432/velizhanin_quest"
TELEGRAM_BOT_TOKEN="your_telegram_bot_token"
JWT_SECRET="your-super-secret-jwt-key-change-this"
JWT_EXPIRES_IN="3h"
JWT_COOKIE_NAME="access_token"
NODE_ENV="development"
PORT=3001
CORS_ORIGIN="*"
```

#### Bot (`packages/bot/.env`)
```env
TELEGRAM_BOT_TOKEN="your_telegram_bot_token"
API_URL="http://localhost:3001"
WEB_APP_URL="http://localhost:3000"
GROQ_API_KEY="your_groq_api_key"
NODE_ENV="development"
```

#### Web (`packages/web/.env`)
```env
VITE_API_URL="http://localhost:3001"
```

### 4. Настроить базу данных
```bash
# Создать миграции и применить их
pnpm db:generate
pnpm db:push

# (Опционально) Открыть Prisma Studio
pnpm db:studio
```

### 5. Запустить в dev режиме
```bash
# Запустить все сервисы одновременно
pnpm dev

# Или запустить отдельно:
pnpm --filter @velizhanin-quest/api dev
pnpm --filter @velizhanin-quest/bot dev
pnpm --filter @velizhanin-quest/web dev
```

---

##  Функционал

### Telegram Bot

####  Пройти квест
- 3 вопроса по программированию
- Варианты ответа с inline-кнопками
- Подсчет очков и процента правильных ответов
- Сохранение результатов в БД
- Возможность пройти повторно

####  Получить совет от ИИ
- Интеграция с Groq API (LLaMA 3.1 70B)
- Быстрые ответы на вопросы по программированию
- Поддержка диалога (можно задать несколько вопросов)
- Обработка ошибок API

####  Мини-приложение
- Открывается внутри Telegram через WebApp
- Таблица лидеров с топ-10 игроков
- Профиль пользователя с детальной статистикой
- Адаптивный дизайн

####  О боте
- Информация о проекте
- Список технологий
- Описание функционала

### Mini App (Web)

- **Главная страница** - навигация
- **Таблица лидеров** - топ пользователей по очкам
- **Профиль** - статистика пользователя:
  - Всего квестов пройдено
  - Всего очков
  - Ранг в таблице лидеров
  - Средний балл

### REST API

#### Endpoints:
- `POST /api/auth/telegram` - авторизация через Telegram
- `GET /api/leaderboard` - таблица лидеров
- `GET /api/user/:telegramId` - статистика пользователя
- `GET /api/quest/:id` - получить квест
- `POST /api/bot/quest/submit` - отправить результаты (для бота)

---

##  Полезные команды

```bash
# Разработка
pnpm dev                 # Запуск всех сервисов
pnpm build               # Сборка всех пакетов
pnpm lint                # Проверка кода линтером
pnpm type-check          # Проверка типов TypeScript
pnpm format              # Форматирование кода

# База данных
pnpm db:generate         # Генерация Prisma Client
pnpm db:push             # Применение изменений схемы
pnpm db:studio           # Открыть Prisma Studio

# Очистка
pnpm clean               # Удалить node_modules и dist
```

---

##  Получение API ключей

### Telegram Bot Token
1. Найти [@BotFather](https://t.me/BotFather) в Telegram
2. Отправить `/newbot`
3. Следовать инструкциям
4. Скопировать токен

### Groq API Key (бесплатно!)
1. Перейти на [console.groq.com](https://console.groq.com/)
2. Зарегистрироваться (через Google/GitHub)
3. Создать API ключ в разделе "API Keys"
4. Скопировать ключ

---

##  Архитектура

### Авторизация
- JWT токены в httpOnly cookies (защита от XSS)
- Telegram Mini App отправляет `initData` для валидации
- Бот отправляет `telegramId` напрямую

### База данных
```prisma
model User {
  id           Int           @id @default(autoincrement())
  telegramId   BigInt        @unique
  firstName    String
  username     String?
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

---

##  Особенности проекта

### Code Quality
-  TypeScript строгий режим
-  ESLint с правилами TypeScript
-  Prettier для форматирования
-  Нет `any` типов (правило `no-explicit-any: error`)
-  Обязательные модификаторы доступа
-  Автосортировка импортов

### Безопасность
-  JWT в httpOnly cookies
-  CORS настроен
-  Helmet для защиты заголовков
-  Валидация всех входящих данных (class-validator)
-  Проверка Telegram initData

### Developer Experience
-  Монорепо с pnpm workspaces
-  Горячая перезагрузка (HMR)
-  Типизация API между пакетами
-  Единый стиль кода
-  Автоматические проверки

---

##  Видео/Описание работы

### Как начать общение с ботом:
1. Открыть бота в Telegram: `@your_bot_username`
2. Нажать `/start`
3. Выбрать действие из меню

### Реализованные функции:
1. **Квест** - 3 вопроса с подсчетом очков
2. **AI-советчик** - ответы на вопросы по программированию
3. **Мини-приложение** - таблица лидеров и статистика
4. **База данных** - сохранение результатов
5. **Авторизация** - через Telegram WebApp

### Мини-приложение:
1. Открывается кнопкой "🏆 Открыть мини-приложение"
2. Показывает топ-10 игроков
3. Отображает личную статистику
4. Обновляется в реальном времени

---

##  Соответствие требованиям ТЗ

| Требование | Статус | Примечание |
|-----------|---------|------------|
| Telegram-бот с меню | ✅ | 4 кнопки меню |
| Квест с 3 вопросами | ✅ | + подсчет очков |
| AI-советчик | ✅ | Groq API (LLaMA 3.1) |
| О боте | ✅ | Полное описание |
| Мини-приложение | ✅ | React + TypeScript |
| Таблица лидеров | ✅ | Топ-10 + поиск |
| База данных | ✅ | PostgreSQL + Prisma |
| API интеграция | ✅ | NestJS REST API |
| Качество кода | ✅ | TS + ESLint + Prettier |
| Структура проекта | ✅ | Monorepo |

---

## Production

Проект готов к деплою на любую платформу, поддерживающую Node.js.

**Требования:**
- Node.js >= 20
- PostgreSQL >= 14
- Environment variables (см. .env.example в каждом пакете)

**Сборка:**
```bash
pnpm install
pnpm build
```

Каждый пакет может быть задеплоен независимо.

---

##  Автор

**Aidamir Kambiev**

Разработано для тестового задания  
Студия VELIZHANIN | Контент Могущество.Клуб

---

##  Лицензия

MIT License - см. файл [LICENSE](LICENSE)

Copyright (c) 2025 Aidamir Kambiev
