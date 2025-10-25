import { useQuery } from '@tanstack/react-query'

import type { LeaderboardItem, UserStats } from '@/types'
import type { UseQueryOptions } from '@tanstack/react-query'

import { queryKeys } from '@/constants/query-keys'
import { leaderboardService } from '@/services/leaderboard'
import { userService } from '@/services/user'

export const useLeaderboard = (limit: number = 10, options?: Omit<UseQueryOptions<LeaderboardItem[], Error>, 'queryKey' | 'queryFn'>) => {
    return useQuery<LeaderboardItem[], Error>({
        queryKey: queryKeys.leaderboard(limit),
        queryFn: () => leaderboardService.getLeaderboard(limit),
        ...options,
    })
}

export const useUserStats = (
    userId: number | null | undefined,
    options?: Omit<UseQueryOptions<UserStats | null, Error>, 'queryKey' | 'queryFn' | 'enabled'>
) => {
    return useQuery<UserStats | null, Error>({
        queryKey: queryKeys.userStats(userId),
        queryFn: () => userService.getUserStats(userId!),
        enabled: !!userId,
        ...options,
    })
}
