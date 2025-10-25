import { Injectable } from '@nestjs/common'

import type { LeaderboardEntry } from './types/leaderboard.types'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class LeaderboardService {
    constructor(private prisma: PrismaService) {}

    public async getLeaderboard(limit: number = 10): Promise<LeaderboardEntry[]> {
        const users = await this.prisma.user.findMany({
            include: {
                questResults: {
                    select: {
                        score: true,
                    },
                },
            },
        })

        const usersWithStats = users
            .map((user) => {
                const totalPoints = user.questResults.reduce((sum, qr) => sum + qr.score, 0)
                const questsCompleted = user.questResults.length

                return {
                    user: {
                        id: user.id,
                        firstName: user.firstName,
                        username: user.username,
                    },
                    totalPoints,
                    questsCompleted,
                }
            })
            .sort((a, b) => b.totalPoints - a.totalPoints)
            .slice(0, limit)
            .map((item, index) => ({
                ...item,
                rank: index + 1,
            }))

        return usersWithStats
    }
}
