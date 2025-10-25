interface ProgressBarProps {
    value: number
    max: number
    color?: 'yellow' | 'blue' | 'green' | 'gray' | 'auto'
    className?: string
}

export function ProgressBar({ value, max, color = 'auto', className = '' }: ProgressBarProps) {
    const percentage = Math.min((value / max) * 100, 100)

    const getColorClass = () => {
        if (color !== 'auto') {
            const colors = {
                yellow: 'bg-gradient-to-r from-yellow-400 to-yellow-600',
                blue: 'bg-gradient-to-r from-blue-400 to-blue-600',
                green: 'bg-gradient-to-r from-green-400 to-green-600',
                gray: 'bg-gradient-to-r from-gray-400 to-gray-600',
            }
            return colors[color]
        }

        if (percentage >= 90) return 'bg-gradient-to-r from-yellow-400 to-yellow-600'
        if (percentage >= 75) return 'bg-gradient-to-r from-blue-400 to-blue-600'
        if (percentage >= 60) return 'bg-gradient-to-r from-green-400 to-green-600'
        return 'bg-gradient-to-r from-gray-400 to-gray-600'
    }

    return (
        <div className={`bg-gray-200 rounded-full h-2 overflow-hidden ${className}`}>
            <div className={`h-full ${getColorClass()} transition-all duration-500`} style={{ width: `${percentage}%` }} />
        </div>
    )
}
