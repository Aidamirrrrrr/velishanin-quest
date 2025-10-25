import type { ReactNode } from 'react'

interface ErrorStateProps {
    emoji?: string
    title: string
    message: string
    action?: ReactNode
    hint?: string
    withBackground?: boolean
}

export function ErrorState({ emoji = '😕', title, message, action, hint, withBackground = false }: ErrorStateProps) {
    const bgClass = withBackground ? 'bg-telegram-bg' : ''

    return (
        <div className={`flex flex-col items-center justify-center min-h-screen p-4 ${bgClass}`}>
            <div className="text-6xl mb-4">{emoji}</div>
            <h2 className="text-xl font-bold mb-2">{title}</h2>
            <p className="text-telegram-hint mb-4">{message}</p>
            {action && <div className="mb-4">{action}</div>}
            {hint && <p className="text-xs text-telegram-hint mt-4">{hint}</p>}
        </div>
    )
}
