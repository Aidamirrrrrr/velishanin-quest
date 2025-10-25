import type { UserStats } from '@/types'

import { StatCard } from '@/components/ui'

interface StatsGridProps {
    stats: UserStats
}

export const StatsGrid = ({ stats }: StatsGridProps) => (
    <div className="grid gap-4 animate-slide-up">
        <StatCard label="Всего квестов" value={stats.totalQuests} />

        <StatCard label="Ранг" value={`#${stats.rank}`} />

        <StatCard label="Всего очков" value={stats.totalPoints} />

        <StatCard label="Средний балл" value={stats.totalQuests > 0 ? Math.round(stats.totalPoints / stats.totalQuests) : 0} />
    </div>
)
