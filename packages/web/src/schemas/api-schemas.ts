import { z } from 'zod'

export const LeaderboardItemSchema = z.object({
    rank: z.number().int().positive(),
    user: z.object({
        id: z.number().int().positive(),
        firstName: z.string().min(1),
        username: z.string().nullable().optional(),
    }),
    totalPoints: z.number().int().min(0),
    questsCompleted: z.number().int().min(0),
})

export const LeaderboardSchema = z.array(LeaderboardItemSchema)

export const UserStatsSchema = z.object({
    userId: z.number().int().positive(),
    totalQuests: z.number().int().min(0),
    totalPoints: z.number().int().min(0),
    rank: z.number().int().positive(),
    lastQuestAt: z.iso.datetime().optional(),
})
