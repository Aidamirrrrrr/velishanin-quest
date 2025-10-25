import { Injectable } from '@nestjs/common'

import type { UserStats } from './types/user.types'
import type { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    public async getUserStats(telegramId: number): Promise<UserStats | null> {
        const user = await this.prisma.user.findUnique({
            where: { telegramId },
            include: {
                questResults: true,
            },
        })

        if (!user) {
            return null
        }

        const totalPoints = user.questResults.reduce((sum, qr) => sum + qr.score, 0)
        const rank = await this.getUserRank(totalPoints)

        return {
            userId: user.id,
            totalQuests: user.questResults.length,
            totalPoints,
            rank,
            lastQuestAt: user.questResults[0]?.completedAt,
        }
    }

    private async getUserRank(totalPoints: number): Promise<number> {
        const allUsers = await this.prisma.user.findMany({
            include: {
                questResults: {
                    select: {
                        score: true,
                    },
                },
            },
        })

        const usersWithMorePoints = allUsers.filter((user) => {
            const userTotalPoints = user.questResults.reduce((sum, qr) => sum + qr.score, 0)
            return userTotalPoints > totalPoints
        })

        return usersWithMorePoints.length + 1
    }
}
