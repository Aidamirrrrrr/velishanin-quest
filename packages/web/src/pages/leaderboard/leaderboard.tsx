import { useState, useMemo } from 'react'

import { FilterButtons } from './filter-buttons'
import { Footer } from './footer'
import { Header } from './header'
import { LeaderItem } from './leader-item'
import { UserRankCard } from './user-rank-card'

import type { LeaderboardItem, FilterType } from '@/types'

import { ErrorState, Spinner, Button } from '@/components/ui'
import { useLeaderboard } from '@/hooks/use-leaderboard'
import useTelegramStore from '@/stores/use-telegram-store'

export default function Leaderboard() {
    const [filter, setFilter] = useState<FilterType>('all')

    const { user } = useTelegramStore()

    const { data: leaders = [], isLoading, isError, error, refetch } = useLeaderboard(10)

    const userRank = useMemo(() => {
        if (!user || !leaders.length) return null
        const found = leaders.find((leader: LeaderboardItem) => leader.user.id === user.id)
        return found ? found.rank : null
    }, [user, leaders])

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Spinner />
            </div>
        )
    }

    if (isError) {
        return (
            <ErrorState
                emoji="😕"
                title="Ошибка загрузки"
                message={error?.message || 'Не удалось загрузить данные'}
                action={<Button onClick={() => refetch()}>🔄 Попробовать снова</Button>}
                hint="💡 Убедитесь что бот запущен и API доступно"
            />
        )
    }

    if (leaders.length === 0) {
        return <ErrorState emoji="🏆" title="Таблица пуста" message={`Пока никто не прошёл квест.\nБудь первым! 🚀`} />
    }

    return (
        <div className="max-w-2xl mx-auto p-4 animate-fade-in">
            <Header />

            {userRank && <UserRankCard rank={userRank} score={leaders.find((l) => l.rank === userRank)?.totalPoints || 0} />}

            <FilterButtons filter={filter} onFilterChange={setFilter} />

            <div className="space-y-2">
                {leaders.map((leader: LeaderboardItem, index: number) => (
                    <LeaderItem key={leader.user.id} leader={leader} index={index} isCurrentUser={user?.id === leader.user.id} />
                ))}
            </div>

            <Footer />
        </div>
    )
}
