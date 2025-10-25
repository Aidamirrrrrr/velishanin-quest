import { BottomNavigation } from './bottom-navigation'

import type { ReactNode } from 'react'

interface LayoutProps {
    children: ReactNode
}

export function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen bg-telegram-bg pb-20">
            <main>{children}</main>
            <BottomNavigation />
        </div>
    )
}
