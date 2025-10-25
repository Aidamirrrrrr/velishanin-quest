import { Link } from 'react-router-dom'

import { Button } from '@/components/ui'
import { ROUTES } from '@/constants/routes'

export const EmptyState = () => (
    <div className="text-center py-12">
        <div className="text-6xl mb-4">🎯</div>
        <h3 className="text-xl font-bold mb-2">Пока нет статистики</h3>
        <p className="text-telegram-hint mb-6">Пройди первый квест, чтобы увидеть свои результаты</p>
        <Link to={ROUTES.HOME}>
            <Button>На главную</Button>
        </Link>
    </div>
)
