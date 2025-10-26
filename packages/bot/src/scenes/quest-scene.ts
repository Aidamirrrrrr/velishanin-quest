import { Scenes, Markup } from 'telegraf'

import { config } from '../config'
import { apiService } from '../services/api.service'

import type { Answer } from '../types/quest.types'

interface QuestSessionData extends Scenes.SceneSessionData {
    currentQuestion: number
    answers: Omit<Answer, 'isCorrect' | 'pointsEarned'>[]
}

export const questScene = new Scenes.BaseScene<Scenes.SceneContext<QuestSessionData>>('quest')

questScene.enter(async (ctx) => {
    ctx.scene.session.currentQuestion = 0
    ctx.scene.session.answers = []

    try {
        const quest = await apiService.getQuest('programming')

        if (!quest || !quest.questions || quest.questions.length === 0) {
            await ctx.reply('Квест временно недоступен')
            return ctx.scene.leave()
        }

        const question = quest.questions[0]
        await ctx.reply(
            `❓ Вопрос 1 из 3\n\n${question.text}`,
            Markup.inlineKeyboard(
                question.options.map((option: string, index: number) => [Markup.button.callback(option, `answer_${index}`)])
            )
        )
    } catch (error) {
        console.error('Error fetching quest:', error)
        await ctx.reply('Ошибка загрузки квеста. Попробуйте позже.')
        return ctx.scene.leave()
    }
})

questScene.action(/answer_(\d+)/, async (ctx) => {
    await ctx.answerCbQuery()

    if (!ctx.scene.session.answers || ctx.scene.session.currentQuestion === undefined) {
        await ctx.reply('⚠️ Сессия истекла. Пожалуйста, начните квест заново с команды /start')
        return ctx.scene.leave()
    }

    const selectedOption = parseInt(ctx.match[1])
    const currentQ = ctx.scene.session.currentQuestion

    ctx.scene.session.answers.push({
        questionId: `q${currentQ + 1}`,
        selectedOption,
    })

    ctx.scene.session.currentQuestion += 1

    if (ctx.scene.session.currentQuestion < 3) {
        try {
            const quest = await apiService.getQuest('programming')
            const question = quest.questions[ctx.scene.session.currentQuestion]

            await ctx.editMessageText(
                `❓ Вопрос ${ctx.scene.session.currentQuestion + 1} из 3\n\n${question.text}`,
                Markup.inlineKeyboard(
                    question.options.map((option: string, index: number) => [Markup.button.callback(option, `answer_${index}`)])
                )
            )
        } catch (error) {
            console.error('Error:', error)
            await ctx.reply('Ошибка. Попробуйте снова.')
            return ctx.scene.leave()
        }
    } else {
        try {
            const telegramId = ctx.from?.id
            const firstName = ctx.from?.first_name
            const username = ctx.from?.username
            
            if (!telegramId || !firstName) {
                await ctx.reply('Ошибка: не удалось определить пользователя')
                return ctx.scene.leave()
            }

            const result = await apiService.submitQuest(telegramId, firstName, username, 'programming', ctx.scene.session.answers)

            const { totalScore, maxScore, percentage } = result

            await ctx.editMessageText(
                `🎉 Квест завершён!\n\n` +
                    `Твой результат: ${totalScore}/${maxScore} очков (${percentage}%)\n\n` +
                    `${percentage >= 80 ? '🏆 Отлично!' : percentage >= 60 ? '👍 Хорошо!' : '📚 Продолжай учиться!'}\n\n` +
                    `Проверь свою позицию в таблице лидеров!`,
                Markup.inlineKeyboard([
                    [Markup.button.callback('🏆 Таблица лидеров', 'open_webapp')],
                    [Markup.button.callback('🔄 Пройти ещё раз', 'restart_quest')],
                ])
            )
        } catch (error: unknown) {
            console.error('Error submitting quest:', error)
            console.error('Error details:', JSON.stringify(error, null, 2))
            
            let message = 'Попробуйте позже'
            if (error && typeof error === 'object') {
                if ('response' in error && error.response && typeof error.response === 'object') {
                    console.error('Response error:', JSON.stringify(error.response, null, 2))
                    if ('data' in error.response && error.response.data && typeof error.response.data === 'object' && 'message' in error.response.data) {
                        message = String(error.response.data.message)
                    }
                } else if ('message' in error) {
                    console.error('Error message:', error.message)
                    message = String(error.message)
                }
            }
            
            await ctx.reply(`Ошибка сохранения результатов:\n${message}`)
        }

        return ctx.scene.leave()
    }
})

questScene.action('restart_quest', async (ctx) => {
    await ctx.answerCbQuery()
    return ctx.scene.reenter()
})

questScene.action('open_webapp', async (ctx) => {
    await ctx.answerCbQuery()
    const webAppUrl = config.WEB_APP_URL
    await ctx.reply('Открой мини-приложение:', Markup.inlineKeyboard([[Markup.button.webApp('🚀 Открыть', webAppUrl)]]))
})

export default questScene
