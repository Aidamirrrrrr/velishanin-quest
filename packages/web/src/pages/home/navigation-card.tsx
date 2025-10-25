import { Link } from 'react-router-dom'

interface NavigationCardProps {
    icon: string
    title: string
    description: string
    to?: string
    onClick?: () => void
    variant?: 'gradient' | 'secondary' | 'primary'
    className?: string
}

export function NavigationCard({ icon, title, description, to, onClick, variant = 'secondary', className = '' }: NavigationCardProps) {
    const variantClasses = {
        gradient: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white',
        secondary: 'bg-telegram-secondary text-telegram-text',
        primary: 'bg-telegram-button text-telegram-buttonText',
    }

    const descriptionClasses = {
        gradient: 'text-white/80',
        secondary: 'text-telegram-hint',
        primary: 'text-telegram-buttonText/80',
    }

    const content = (
        <div className="flex items-center justify-between">
            <div>
                <h3 className="text-xl font-bold mb-1">
                    {icon} {title}
                </h3>
                <p className={`text-sm ${descriptionClasses[variant]}`}>{description}</p>
            </div>
            <div className="text-3xl">→</div>
        </div>
    )

    const baseClasses = `${variantClasses[variant]} rounded-2xl p-6 hover:scale-105 transition-transform card-shadow ${className}`

    if (to) {
        return (
            <Link to={to} className={baseClasses}>
                {content}
            </Link>
        )
    }

    return (
        <button onClick={onClick} className={`${baseClasses} w-full text-left`}>
            {content}
        </button>
    )
}
