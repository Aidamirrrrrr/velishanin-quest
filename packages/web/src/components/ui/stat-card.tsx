import type { ReactNode } from 'react'

interface StatCardProps {
    label: string
    value: number | string
    extra?: ReactNode
    className?: string
}

export function StatCard({ label, value, extra, className = '' }: StatCardProps) {
    return (
        <div className={`bg-telegram-secondary rounded-2xl p-6 ${className}`}>
            <h3 className="text-sm text-telegram-hint mb-2">{label}</h3>
            <p className="text-4xl font-bold text-telegram-text">{value}</p>
            {extra && <div className="mt-3">{extra}</div>}
        </div>
    )
}
