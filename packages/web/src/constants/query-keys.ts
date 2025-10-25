export const queryKeys = {
    leaderboard: (limit: number) => ['leaderboard', limit] as const,
    userStats: (userId: number | null | undefined) => ['userStats', userId] as const,
} as const
