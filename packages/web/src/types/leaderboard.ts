import type { LeaderboardItemSchema, UserStatsSchema } from '@/schemas/api-schemas'
import type { z } from 'zod'

export type FilterType = 'all' | 'week' | 'day'

export type LeaderboardItem = z.infer<typeof LeaderboardItemSchema>
export type UserStats = z.infer<typeof UserStatsSchema>
