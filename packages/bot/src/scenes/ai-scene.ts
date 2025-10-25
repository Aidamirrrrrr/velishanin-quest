import Groq from 'groq-sdk'
import { Scenes, Markup } from 'telegraf'

import { config } from '../config'

const groq = new Groq({
    apiKey: config.GROQ_API_KEY,
})

interface AISessionData extends Scenes.SceneSessionData {
    waitingForQuestion: boolean
}

export const aiScene = new Scenes.BaseScene<Scenes.SceneContext<AISessionData>>('ai')

aiScene.enter(async (ctx) => {
    ctx.scene.session.waitingForQuestion = true
    await ctx.reply(
        '🤖 Задай мне вопрос по программированию:\n\n' +
        'Например:\n' +
        '• Что такое TypeScript?\n' +
        '• Как работает async/await?\n' +
        '• В чём разница между map и forEach?',
        Markup.inlineKeyboard([[Markup.button.callback('❌ Отмена', 'cancel_ai')]])
    )
})

aiScene.on('text', async (ctx) => {
    if (!ctx.scene.session.waitingForQuestion) {
        return
    }

    const question = ctx.message.text

    await ctx.reply('🤔 Думаю...')

    try {
        const completion = await groq.chat.completions.create({
            model: "llama-3.1-8b-instant",
            messages: [
                {
                    role: 'system',
                    content: 'Ты - опытный программист-наставник. Объясняй концепции просто и с примерами кода. Отвечай на русском языке.',
                },
                {
                    role: 'user',
                    content: question,
                },
            ],
            max_tokens: 500,
            temperature: 0.7,
        })

        const answer = completion.choices[0]?.message?.content || 'Извини, не смог сформулировать ответ.'

        await ctx.reply(
            `💡 ${answer}`,
            Markup.inlineKeyboard([
                [Markup.button.callback('❓ Задать ещё вопрос', 'ask_more')],
                [Markup.button.callback('◀️ Главное меню', 'back_to_menu')],
            ])
        )

        ctx.scene.session.waitingForQuestion = false
    } catch (error: unknown) {
        console.error('OpenAI Error:', error)

        let errorMessage = 'Произошла ошибка при обращении к AI.'

        if (error && typeof error === 'object' && 'code' in error) {
            if (error.code === 'insufficient_quota') {
                errorMessage = 'Квота OpenAI исчерпана. Попробуйте позже или обратитесь к администратору.'
            } else if (error.code === 'invalid_api_key') {
                errorMessage = 'Неверный API ключ OpenAI.'
            }
        }

        await ctx.reply(`❌ ${errorMessage}`, Markup.inlineKeyboard([[Markup.button.callback('◀️ Главное меню', 'back_to_menu')]]))

        return ctx.scene.leave()
    }
})

aiScene.action('ask_more', async (ctx) => {
    await ctx.answerCbQuery()
    ctx.scene.session.waitingForQuestion = true
    await ctx.reply('Задай следующий вопрос:', Markup.inlineKeyboard([[Markup.button.callback('❌ Отмена', 'cancel_ai')]]))
})

aiScene.action('cancel_ai', async (ctx) => {
    await ctx.answerCbQuery('Отменено')
    await ctx.reply('Возвращаюсь в главное меню...')
    return ctx.scene.leave()
})

aiScene.action('back_to_menu', async (ctx) => {
    await ctx.answerCbQuery()
    await ctx.reply('Возвращаюсь в главное меню...')
    return ctx.scene.leave()
})

export default aiScene
