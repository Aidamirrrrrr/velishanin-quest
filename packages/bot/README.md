# Bot

Telegram бот для VELIZHANIN Quest на базе Telegraf с интеграцией AI.

## Технологии

- **Telegraf** - мощный фреймворк для Telegram Bot API
- **Groq SDK** - интеграция с AI (LLaMA 3.1 70B)
- **TypeScript** - строгая типизация
- **Scenes** - управление диалогами и состоянием
- **Axios** - HTTP клиент для API запросов
- **dotenv** - управление переменными окружения

## Структура

```
src/
├── config/           # Конфигурация (env variables)
├── scenes/           # Telegraf сцены
│   ├── quest-scene.ts   # Квест с вопросами
│   └── ai-scene.ts      # AI-советчик
├── services/         # Сервисы
│   └── api.service.ts   # HTTP клиент для API
├── types/            # TypeScript типы
└── index.ts          # Точка входа, регистрация handlers
```

## Функционал

### Команды

- `/start` - Начало работы, показ главного меню

### Меню кнопки

- **Пройти квест** - 3 вопроса по программированию
- **Получить совет от ИИ** - AI-советчик (Groq API)
- **Открыть мини-приложение** - WebApp с таблицей лидеров
- **О боте** - Информация о проекте

### Квест (Quest Scene)

1. Получает квест от API
2. Показывает 3 вопроса с вариантами ответа
3. Собирает ответы пользователя
4. Отправляет результаты на API
5. Показывает итоговый результат

### AI-советчик (AI Scene)

1. Пользователь задает вопрос по программированию
2. Бот отправляет запрос к Groq API (LLaMA 3.1 70B)
3. Получает и показывает ответ
4. Возможность задать еще вопросы

## Разработка

### Установка зависимостей:

```bash
pnpm install
```

### Настройка:

Создайте `.env` файл (см. ниже)

### Запуск dev режима:

```bash
pnpm dev
```

Бот автоматически перезапускается при изменениях (tsx watch)

### Сборка:

```bash
pnpm build
```

Результат в папке `dist/`

### Production:

```bash
pnpm start
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
TELEGRAM_BOT_TOKEN="your_telegram_bot_token"
API_URL="http://localhost:3001"
WEB_APP_URL="http://localhost:3000"
GROQ_API_KEY="your_groq_api_key"
NODE_ENV="development"
```

### Получение токенов:

#### Telegram Bot Token

1. Найти @BotFather в Telegram
2. Отправить `/newbot`
3. Следовать инструкциям
4. Скопировать токен

#### Groq API Key (бесплатно)

1. Перейти на https://console.groq.com/
2. Зарегистрироваться (через Google/GitHub)
3. Создать API ключ
4. Скопировать ключ

## Архитектура

### Config Service

Централизованное управление переменными окружения:

```typescript
config.TELEGRAM_BOT_TOKEN
config.API_URL
config.GROQ_API_KEY
```

### API Service

HTTP клиент для взаимодействия с backend:

```typescript
apiService.getQuest(questId)
apiService.submitQuest(telegramId, questId, answers)
```

### Scenes (Сцены)

Управление диалогами через Telegraf Scenes:

- Отдельное состояние для каждой сцены
- Автоматический вход/выход
- Session management

## Интеграция с API

### Endpoints:

- `GET /api/quest/:id` - Получить квест
- `POST /api/bot/quest/submit` - Отправить результаты

### Авторизация:

Бот отправляет `telegramId` напрямую (без JWT)

## AI Интеграция

### Groq API

- Модель: `llama-3.1-70b-versatile`
- Быстрые ответы (самая быстрая инференс-платформа)
- Бесплатный tier: 14,400 запросов/день
- System prompt настроен для программирования

### Пример конфигурации:

```typescript
groq.chat.completions.create({
    model: 'llama-3.1-70b-versatile',
    messages: [
        {
            role: 'system',
            content: 'Ты - опытный программист-наставник...',
        },
        {
            role: 'user',
            content: question,
        },
    ],
    max_tokens: 500,
    temperature: 0.7,
})
```

## Обработка ошибок

### API ошибки

- Логирование в консоль
- Отправка понятного сообщения пользователю
- Возврат в главное меню

### Groq API ошибки

- Обработка insufficient_quota
- Обработка invalid_api_key
- Graceful fallback

## Мониторинг

### Логи

```typescript
// Автоматическое логирование всех update
bot.use(async (ctx, next) => {
    const start = Date.now()
    await next()
    console.log(`${ctx.updateType} - ${Date.now() - start}ms`)
})
```

### Graceful Shutdown

```typescript
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
```

## Лимиты Telegram

- 30 сообщений/секунду
- 20 сообщений/минуту в один чат
- Рекомендуется добавить rate limiting

## Расширение функционала

### Добавить новую сцену:

1. Создать файл в `src/scenes/`
2. Экспортировать `BaseScene`
3. Зарегистрировать в `Stage`
4. Добавить action для входа

### Добавить новый квест:

1. Создать файл в `packages/api/src/quest/quests/`
2. Экспортировать объект `Quest`
3. Добавить в `QuestService.getQuestById()`

## Безопасность

- Не хранить токены в коде
- Использовать `.env` файл (добавлен в `.gitignore`)
- Валидация входных данных
- Обработка всех ошибок
