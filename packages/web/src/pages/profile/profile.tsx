import { EmptyState } from './empty-state'
import { ProfileHeader } from './profile-header'
import { StatsGrid } from './stats-grid'

import { Spinner } from '@/components/ui'
import { useUserStats } from '@/hooks/use-leaderboard'
import useTelegramStore from '@/stores/use-telegram-store'

export default function Profile() {
    const { user } = useTelegramStore()
    const { data: stats, isLoading } = useUserStats(user?.id)

    if (isLoading) {
        return (
            <div className="min-h-screen bg-telegram-bg flex items-center justify-center">
                <Spinner />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-telegram-bg">
            <div className="max-w-2xl mx-auto p-4">
                {user && (
                    <>
                        <ProfileHeader user={user} />
                        {stats ? <StatsGrid stats={stats} /> : <EmptyState />}
                    </>
                )}
            </div>
        </div>
    )
}
