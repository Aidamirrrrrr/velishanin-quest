interface UserRankCardProps {
    rank: number
    score: number
}

export const UserRankCard = ({ rank, score }: UserRankCardProps) => (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-4 mb-4 text-white card-shadow animate-slide-up">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm opacity-90">Твоя позиция</p>
                <p className="text-3xl font-bold">#{rank}</p>
            </div>
            <div className="text-right">
                <p className="text-sm opacity-90">Очки</p>
                <p className="text-2xl font-bold">{score}</p>
            </div>
        </div>
    </div>
)
