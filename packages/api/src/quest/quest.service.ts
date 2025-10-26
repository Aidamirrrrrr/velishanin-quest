import { Injectable, Logger, NotFoundException } from '@nestjs/common'

import { PrismaService } from '../prisma/prisma.service'
import { PROGRAMMING_QUEST } from './quests/programming-quest'

import type { AnswerDto } from './dto/submit-quest.dto'
import type { Quest } from './types/quest.types'

@Injectable()
export class QuestService {
    private readonly logger = new Logger(QuestService.name)

    constructor(private prisma: PrismaService) {}

    public async getQuestById(id: string): Promise<Quest | null> {
        this.logger.debug(`Fetching quest by id: ${id}`)
        if (id === 'programming') {
            this.logger.debug('Returning PROGRAMMING_QUEST')
            return PROGRAMMING_QUEST
        }
        this.logger.warn(`Quest not found for id: ${id}`)
        return null
    }

    public async submitQuest(
        telegramId: number,
        firstName: string,
        username: string | undefined,
        questId: string,
        answers: AnswerDto[]
    ) {
        this.logger.log(`Submitting quest: ${questId} for user: ${telegramId}`)
        this.logger.debug(`Received answers: ${JSON.stringify(answers)}`)
        
        const quest = await this.getQuestById(questId)
        if (!quest) {
            this.logger.error(`Quest not found: ${questId}`)
            throw new NotFoundException(`Quest with id '${questId}' not found`)
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
                this.logger.error(`Question not found: ${answer.questionId} in quest: ${questId}`)
                this.logger.error(`Available questions: ${quest.questions.map(q => q.id).join(', ')}`)
                throw new NotFoundException(`Question ${answer.questionId} not found in quest ${questId}`)
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
