/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

import type { ReactNode } from 'react'

import { ProtectedRoute } from '@/app/protected-route'

export const ROUTES = {
    HOME: '/',
    LEADERBOARD: '/leaderboard',
    PROFILE: '/profile',
} as const

const Home = lazy(() => import('../pages/home'))
const Leaderboard = lazy(() => import('../pages/leaderboard'))
const Profile = lazy(() => import('../pages/profile'))

export interface RouteConfig {
    path: string
    element: ReactNode
    protected?: boolean
}

export const ROUTER_MAP: RouteConfig[] = [
    {
        path: ROUTES.HOME,
        element: <Home />,
    },
    {
        path: ROUTES.LEADERBOARD,
        element: <Leaderboard />,
    },
    {
        path: ROUTES.PROFILE,
        element: <Profile />,
        protected: true,
    },
    {
        path: '*',
        element: <Navigate to={ROUTES.HOME} replace />,
    },
]

export const getProtectedElement = (element: ReactNode) => <ProtectedRoute>{element}</ProtectedRoute>
