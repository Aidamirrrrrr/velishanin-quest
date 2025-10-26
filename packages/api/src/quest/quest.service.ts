import { Injectable } from '@nestjs/common'

import { PrismaService } from '../prisma/prisma.service'
import { PROGRAMMING_QUEST } from './quests/programming-quest'

import type { AnswerDto } from './dto/submit-quest.dto'
import type { Quest } from './types/quest.types'

@Injectable()
export class QuestService {
    constructor(private prisma: PrismaService) {}

    public async getQuestById(id: string): Promise<Quest | null> {
        if (id === 'programming') {
            return PROGRAMMING_QUEST
        }
        return null
    }

    public async submitQuest(
        telegramId: number,
        firstName: string,
        username: string | undefined,
        questId: string,
        answers: AnswerDto[]
    ) {
        const quest = await this.getQuestById(questId)
        if (!quest) {
            throw new Error('Quest not found')
        }

        let user = await this.prisma.user.findUnique({
            where: { telegramId },
        })

        if (!user) {
            user = await this.prisma.user.create({
                data: {
                    telegramId,
                    firstName,
                    username,
                    isPremium: false,
                },
            })
        }

        let totalScore = 0
        const processedAnswers = answers.map((answer) => {
            const question = quest.questions.find((q) => q.id === answer.questionId)
            if (!question) {
                throw new Error(`Question ${answer.questionId} not found`)
            }
            const isCorrect = answer.selectedOption === question.correctAnswer
            const pointsEarned = isCorrect ? question.points : 0
            totalScore += pointsEarned

            return {
                ...answer,
                isCorrect,
                pointsEarned,
            }
        })

        const questResult = await this.prisma.questResult.create({
            data: {
                userId: user.id,
                questId,
                score: totalScore,
                answers: processedAnswers,
            },
        })

        return {
            questResult,
            totalScore,
            maxScore: quest.maxPoints,
            percentage: Math.round((totalScore / quest.maxPoints) * 100),
        }
    }
}
