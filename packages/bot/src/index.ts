import { Telegraf, Markup, session, Scenes } from 'telegraf'

import { config } from './config'
import { aiScene } from './scenes/ai-scene'
import { questScene } from './scenes/quest-scene'

const bot = new Telegraf<Scenes.SceneContext>(config.TELEGRAM_BOT_TOKEN)

const stage = new Scenes.Stage<Scenes.SceneContext>([questScene, aiScene])

bot.use(session())
bot.use(stage.middleware())

bot.use(async (ctx, next) => {
    const start = Date.now()
    await next()
    const ms = Date.now() - start
    console.log(`${ctx.updateType} - ${ms}ms`)
})

bot.command('start', async (ctx) => {
    const firstName = ctx.from.first_name

    await ctx.reply(
        `👋 Привет, ${firstName}!\n\nЯ - бот для программистского квеста!\n\nВыбери действие:`,
        Markup.keyboard([
            ['🎯 Пройти квест', '🤖 Получить совет от ИИ'],
            ['🏆 Открыть мини-приложение', 'ℹ️ О боте'],
        ]).resize()
    )
})

bot.hears('🎯 Пройти квест', async (ctx) => {
    await ctx.reply(
        '🎮 Готов начать квест?\n\nЯ задам тебе 3 вопроса по программированию.\nЗа каждый правильный ответ — 10 очков!\n\nУдачи! 🚀',
        Markup.inlineKeyboard([
            [Markup.button.callback('▶️ Начать квест', 'start_quest')],
            [Markup.button.callback('◀️ Назад в меню', 'back_to_menu')],
        ])
    )
})

bot.hears('🤖 Получить совет от ИИ', async (ctx) => {
    await ctx.reply(
        '🤖 AI Советчик активирован!\n\nЗадай мне любой вопрос по программированию, и я постараюсь помочь.\n\nПримеры вопросов:\n• Что такое async/await?\n• Как работает замыкание?\n• В чём разница между let и const?',
        Markup.inlineKeyboard([
            [Markup.button.callback('❓ Задать вопрос', 'ask_ai')],
            [Markup.button.callback('◀️ Назад в меню', 'back_to_menu')],
        ])
    )
})

bot.hears('🏆 Открыть мини-приложение', async (ctx) => {
    const webAppUrl = config.WEB_APP_URL

    await ctx.reply(
        '🎨 Мини-приложение\n\nЗдесь ты можешь:\n• Посмотреть таблицу лидеров\n• Проверить свою статистику\n• Увидеть достижения',
        Markup.inlineKeyboard([
            [Markup.button.webApp('🚀 Открыть приложение', webAppUrl)],
            [Markup.button.callback('◀️ Назад в меню', 'back_to_menu')],
        ])
    )
})

bot.hears('ℹ️ О боте', async (ctx) => {
    await ctx.reply(
        `ℹ️ О боте\n\n` +
            `Это тестовый бот для студии VELIZHANIN.\n\n` +
            `🎯 Функции:\n` +
            `• Интерактивный квест с вопросами\n` +
            `• AI-советчик на базе OpenAI\n` +
            `• Мини-приложение с таблицей лидеров\n` +
            `• Отслеживание прогресса\n\n` +
            `💻 Стек технологий:\n` +
            `• TypeScript + Telegraf\n` +
            `• NestJS + Prisma\n` +
            `• React + TailwindCSS\n` +
            `• PostgreSQL\n\n` +
            `Разработано с ❤️ для тестового задания`,
        Markup.inlineKeyboard([[Markup.button.callback('◀️ Назад в меню', 'back_to_menu')]])
    )
})

bot.action('back_to_menu', async (ctx) => {
    await ctx.answerCbQuery()
    await ctx.editMessageText('Выбери действие:')
    await ctx.reply(
        'Главное меню:',
        Markup.keyboard([
            ['🎯 Пройти квест', '🤖 Получить совет от ИИ'],
            ['🏆 Открыть мини-приложение', 'ℹ️ О боте'],
        ]).resize()
    )
})

bot.action('start_quest', async (ctx) => {
    await ctx.answerCbQuery()
    await ctx.scene.enter('quest')
})

bot.action('ask_ai', async (ctx) => {
    await ctx.answerCbQuery()
    await ctx.scene.enter('ai')
})

bot.use(questScene.middleware())
bot.use(aiScene.middleware())

bot.launch().then(() => {
    console.log('🤖 Bot started successfully!')
    console.log(`📱 Bot username: @${bot.botInfo?.username}`)
})

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
