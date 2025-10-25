interface AvatarProps {
    name: string
    size?: 'sm' | 'md' | 'lg' | 'xl'
    variant?: 'gradient' | 'light'
    className?: string
}

export function Avatar({ name, size = 'md', variant = 'gradient', className = '' }: AvatarProps) {
    const sizeClasses = {
        sm: 'w-10 h-10 text-base',
        md: 'w-12 h-12 text-lg',
        lg: 'w-16 h-16 text-2xl',
        xl: 'w-20 h-20 text-4xl',
    }

    const variantClasses = {
        gradient: 'bg-gradient-to-br from-blue-400 to-purple-500',
        light: 'bg-white/20 backdrop-blur',
    }

    const initial = name.charAt(0).toUpperCase()

    return (
        <div
            className={`rounded-full ${variantClasses[variant]} flex items-center justify-center text-white font-bold ${sizeClasses[size]} ${className}`}
        >
            {initial}
        </div>
    )
}
