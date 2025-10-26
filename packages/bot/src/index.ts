import { createServer } from 'http'

import { Telegraf, Markup, session, Scenes } from 'telegraf'

import { config } from './config'
import { aiScene } from './scenes/ai-scene'
import { questScene } from './scenes/quest-scene'

type ShutdownSignal = 'SIGINT' | 'SIGTERM'

const bot = new Telegraf<Scenes.SceneContext>(config.TELEGRAM_BOT_TOKEN)

const stage = new Scenes.Stage<Scenes.SceneContext>([questScene, aiScene])

bot.use(session())
bot.use(stage.middleware())

bot.catch((err, ctx) => {
    console.error('Unhandled error while processing', ctx.update)
    console.error('Error:', err)
    
    try {
        ctx.reply('⚠️ Произошла ошибка. Пожалуйста, попробуйте снова или начните заново с команды /start').catch(console.error)
    } catch (replyError) {
        console.error('Failed to send error message to user:', replyError)
    }
})

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
        ])
    )
})

bot.hears('🤖 Получить совет от ИИ', async (ctx) => {
    await ctx.reply(
        '🤖 AI Советчик активирован!\n\nЗадай мне любой вопрос по программированию, и я постараюсь помочь.\n\nПримеры вопросов:\n• Что такое async/await?\n• Как работает замыкание?\n• В чём разница между let и const?',
        Markup.inlineKeyboard([
            [Markup.button.callback('❓ Задать вопрос', 'ask_ai')],
        ])
    )
})

bot.hears('🏆 Открыть мини-приложение', async (ctx) => {
    const webAppUrl = config.WEB_APP_URL

    await ctx.reply(
        '🎨 Мини-приложение\n\nЗдесь ты можешь:\n• Посмотреть таблицу лидеров\n• Проверить свою статистику\n• Увидеть достижения',
        Markup.inlineKeyboard([
            [Markup.button.webApp('🚀 Открыть приложение', webAppUrl)],
        ])
    )
})

bot.hears('ℹ️ О боте', async (ctx) => {
    await ctx.reply(
        `ℹ️ О боте\n\n` +
        `Это тестовый бот для студии VELIZHANIN.\n\n` +
        `🎯 Функции:\n` +
        `• Интерактивный квест с вопросами\n` +
        `• AI-советчик на базе Groq\n` +
        `• Мини-приложение с таблицей лидеров\n` +
        `• Отслеживание прогресса\n\n` +
        `💻 Стек технологий:\n` +
        `• TypeScript + Telegraf\n` +
        `• NestJS + Prisma\n` +
        `• React + TailwindCSS\n` +
        `• PostgreSQL\n\n` +
        `Разработано для тестового задания`
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

const healthServer = createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/healthz') {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ status: 'ok' }))
        return
    }

    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'Not Found' }))
})

healthServer.listen(config.HEALTHCHECK_PORT, () => {
    console.log(`🩺 Healthcheck server listening on port ${config.HEALTHCHECK_PORT}`)
})

bot.launch().then(() => {
    console.log('🤖 Bot started successfully!')
    console.log(`📱 Bot username: @${bot.botInfo?.username}`)
})

const shutdown = (signal: ShutdownSignal) => {
    console.log(`Received ${signal}, shutting down...`)
    healthServer.close(() => {
        console.log('🩺 Healthcheck server stopped')
    })
    bot.stop(signal)
}

process.once('SIGINT', () => shutdown('SIGINT'))
process.once('SIGTERM', () => shutdown('SIGTERM'))
