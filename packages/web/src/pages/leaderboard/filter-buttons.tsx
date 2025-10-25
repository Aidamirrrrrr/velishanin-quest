import type { FilterType } from '@/types'

import { Button } from '@/components/ui'

interface FilterButtonsProps {
    filter: FilterType
    onFilterChange: (filter: FilterType) => void
}

export const FilterButtons = ({ filter, onFilterChange }: FilterButtonsProps) => (
    <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        <Button size="sm" variant="secondary" active={filter === 'all'} onClick={() => onFilterChange('all')}>
            Все время
        </Button>
        <Button size="sm" variant="secondary" active={filter === 'week'} onClick={() => onFilterChange('week')}>
            Неделя
        </Button>
        <Button size="sm" variant="secondary" active={filter === 'day'} onClick={() => onFilterChange('day')}>
            Сегодня
        </Button>
    </div>
)
