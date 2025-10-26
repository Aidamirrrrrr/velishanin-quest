import { Link, useLocation } from 'react-router-dom'

import { ROUTES } from '@/constants/routes'

const NAV_ITEMS = [
    { path: ROUTES.HOME, icon: '🏠', label: 'Главная' },
    { path: ROUTES.LEADERBOARD, icon: '🏆', label: 'Топ' },
    { path: ROUTES.PROFILE, icon: '👤', label: 'Профиль' },
]

export function BottomNavigation() {
    const location = useLocation()

    const isActive = (path: string) => location.pathname === path

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-telegram-secondary/95 backdrop-blur-md border-t border-telegram-hint/20 shadow-lg z-50">
            <div className="max-w-2xl mx-auto px-4 py-3 flex justify-around items-center">
                {NAV_ITEMS.map(({ path, icon, label }) => (
                    <Link
                        key={path}
                        to={path}
                        className={`flex flex-col items-center gap-1 transition-colors ${
                            isActive(path) ? 'text-telegram-button' : 'text-telegram-hint'
                        }`}
                    >
                        <span className="text-2xl">{icon}</span>
                        <span className="text-xs font-medium">{label}</span>
                    </Link>
                ))}
            </div>
        </nav>
    )
}
