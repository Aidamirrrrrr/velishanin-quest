import type { TelegramUser } from '@/types'

import { Avatar } from '@/components/ui'

interface UserWelcomeCardProps {
    user: TelegramUser
}

export const UserWelcomeCard = ({ user }: UserWelcomeCardProps) => (
    <div className="bg-telegram-secondary rounded-2xl p-6 mb-6 animate-slide-up">
        <div className="flex items-center gap-4 mb-4">
            <Avatar name={user.first_name} size="lg" />
            <div>
                <h2 className="text-xl font-bold">{user.first_name}</h2>
                {user.username && <p className="text-telegram-hint">@{user.username}</p>}
            </div>
        </div>
    </div>
)
