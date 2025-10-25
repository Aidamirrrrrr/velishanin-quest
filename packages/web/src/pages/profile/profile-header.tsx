import type { TelegramUser } from '@/types'

import { Avatar, Badge } from '@/components/ui'

interface ProfileHeaderProps {
    user: TelegramUser
}

export const ProfileHeader = ({ user }: ProfileHeaderProps) => (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 mb-6 text-white animate-fade-in">
        <div className="flex items-center gap-4 mb-4">
            <Avatar name={user.first_name} size="xl" variant="light" />
            <div>
                <h2 className="text-2xl font-bold">{user.first_name}</h2>
                {user.username && <p className="text-white/80">@{user.username}</p>}
                {user.is_premium && (
                    <Badge variant="warning" className="mt-1">
                        ⭐ Premium
                    </Badge>
                )}
            </div>
        </div>
    </div>
)
