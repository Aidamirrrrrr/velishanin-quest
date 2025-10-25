import { NavigationGrid } from './navigation-grid'
import { UserWelcomeCard } from './user-welcome-card'

import useTelegramStore from '@/stores/use-telegram-store'

export default function Home() {
    const { user, webApp } = useTelegramStore()

    return (
        <div className="min-h-screen bg-telegram-bg p-4">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8 animate-fade-in">
                    <div className="text-6xl mb-4">🎯</div>
                    <h1 className="text-3xl font-bold mb-2">Программистский Квест</h1>
                    <p className="text-telegram-hint">Проверь свои знания и попади в топ!</p>
                </div>

                {user && <UserWelcomeCard user={user} />}

                <NavigationGrid webApp={webApp} />

                <div className="mt-8 text-center text-telegram-hint text-sm">
                    <p>💡 Пройди квест в боте, чтобы улучшить свои результаты</p>
                </div>
            </div>
        </div>
    )
}
