export interface LeaderboardEntry {
    rank: number
    user: {
        id: number
        firstName: string
        username?: string
    }
    totalPoints: number
    questsCompleted: number
}
