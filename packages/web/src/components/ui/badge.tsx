import type { ReactNode } from 'react'

interface BadgeProps {
    variant?: 'primary' | 'secondary' | 'success' | 'warning'
    children: ReactNode
    className?: string
}

export function Badge({ variant = 'primary', children, className = '' }: BadgeProps) {
    const variantClasses = {
        primary: 'bg-telegram-button text-telegram-buttonText',
        secondary: 'bg-telegram-secondary text-telegram-text',
        success: 'bg-green-500 text-white',
        warning: 'bg-yellow-400 text-yellow-900',
    }

    return (
        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${variantClasses[variant]} ${className}`}>
            {children}
        </span>
    )
}
