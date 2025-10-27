import { NavigationCard } from './navigation-card'

import { ROUTES } from '@/constants/routes'

export const NavigationGrid = () => (
    <div className="grid gap-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <NavigationCard icon="🏆" title="Таблица лидеров" description="Топ программистов" to={ROUTES.LEADERBOARD} variant="gradient" />

        <NavigationCard icon="👤" title="Мой профиль" description="Статистика и достижения" to={ROUTES.PROFILE} variant="secondary" />
    </div>
)
