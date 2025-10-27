import type { ReactNode, ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline'
    size?: 'sm' | 'md' | 'lg'
    fullWidth?: boolean
    active?: boolean
    children: ReactNode
}

export function Button({
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    active = false,
    className = '',
    disabled = false,
    children,
    ...props
}: ButtonProps) {
    const baseClasses = 'rounded-full font-medium transition-all whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed'

    const getVariantClasses = () => {
        if (active) {
            return 'bg-telegram-button text-telegram-buttonText shadow-md'
        }

        const variants = {
            primary: 'bg-telegram-button text-telegram-buttonText hover:opacity-90 active:scale-95 shadow-sm',
            secondary: 'bg-telegram-secondary text-telegram-text hover:opacity-80 active:scale-95 shadow-sm',
            outline:
                'border-2 border-telegram-button text-telegram-button hover:bg-telegram-button hover:text-telegram-buttonText active:scale-95',
        }

        return variants[variant]
    }

    const sizeClasses = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
    }

    const widthClass = fullWidth ? 'w-full' : ''

    return (
        <button
            disabled={disabled}
            className={`${baseClasses} ${getVariantClasses()} ${sizeClasses[size]} ${widthClass} ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}
