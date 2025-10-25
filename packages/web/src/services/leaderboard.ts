import { httpClient } from './http-client'

import type { LeaderboardItem } from '@/types'

import { LeaderboardSchema } from '@/schemas/api-schemas'

class LeaderboardService {
    public async getLeaderboard(limit: number = 10): Promise<LeaderboardItem[]> {
        return httpClient.request(`/api/leaderboard?limit=${limit}`, LeaderboardSchema)
    }
}

export const leaderboardService = new LeaderboardService()
