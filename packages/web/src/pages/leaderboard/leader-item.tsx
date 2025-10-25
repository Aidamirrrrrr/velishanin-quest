import { getMedalEmoji } from './utils'

import type { LeaderboardItem } from '@/types'

import { Avatar, ProgressBar, Badge } from '@/components/ui'

interface LeaderItemProps {
    leader: LeaderboardItem
    index: number
    isCurrentUser: boolean
}

export const LeaderItem = ({ leader, index, isCurrentUser }: LeaderItemProps) => (
    <div
        className={`bg-telegram-secondary rounded-xl p-4 transition-all hover:scale-[1.02] card-shadow animate-slide-up ${
            isCurrentUser ? 'ring-2 ring-telegram-button' : ''
        }`}
        style={{ animationDelay: `${index * 0.05}s` }}
    >
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="text-2xl font-bold w-10 text-center">{getMedalEmoji(leader.rank)}</div>

                <Avatar name={leader.user.firstName} size="md" />

                <div>
                    <p className="font-semibold text-telegram-text">
                        {leader.user.firstName}
                        {isCurrentUser && <Badge className="ml-2">Ты</Badge>}
                    </p>
                    <p className="text-sm text-telegram-hint">Прохождений: {leader.questsCompleted}</p>
                </div>
            </div>

            <div className="text-right">
                <p className="text-2xl font-bold text-telegram-text">{leader.totalPoints}</p>
                <p className="text-xs text-telegram-hint">очков</p>
            </div>
        </div>

        <div className="mt-3">
            <ProgressBar value={leader.totalPoints} max={100} color="auto" />
        </div>
    </div>
)
