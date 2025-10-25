import { httpClient } from './http-client'

import type { UserStats } from '@/types'

import { UserStatsSchema } from '@/schemas/api-schemas'

class UserService {
    public async getUserStats(userId: number): Promise<UserStats | null> {
        try {
            return await httpClient.request(`/api/user/${userId}`, UserStatsSchema)
        } catch (error) {
            if (error instanceof Error && error.message.includes('404')) {
                return null
            }
            throw error
        }
    }
}

export const userService = new UserService()
