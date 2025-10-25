import { Navigate } from 'react-router-dom'

import type { ReactNode } from 'react'

import { ROUTES } from '@/constants/routes'
import useTelegramStore from '@/stores/use-telegram-store'

interface ProtectedRouteProps {
    children: ReactNode
    redirectTo?: string
}

export function ProtectedRoute({ children, redirectTo = ROUTES.HOME }: ProtectedRouteProps) {
    const { user } = useTelegramStore()

    if (!user) {
        return <Navigate to={redirectTo} replace />
    }

    return <>{children}</>
}
