import { NavigationCard } from './navigation-card'

import type { TelegramWebApp } from '@/types'

import { ROUTES } from '@/constants/routes'

interface NavigationGridProps {
    webApp: TelegramWebApp | null
}

export const NavigationGrid = ({ webApp }: NavigationGridProps) => (
    <div className="grid gap-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <NavigationCard icon="🏆" title="Таблица лидеров" description="Топ программистов" to={ROUTES.LEADERBOARD} variant="gradient" />

        <NavigationCard icon="👤" title="Мой профиль" description="Статистика и достижения" to={ROUTES.PROFILE} variant="secondary" />

        <NavigationCard
            icon="🚀"
            title="Начать квест"
            description="Открыть бота"
            onClick={() => webApp?.openTelegramLink(`https://t.me/${import.meta.env.VITE_BOT_USERNAME}`)}
            variant="primary"
        />
    </div>
)
