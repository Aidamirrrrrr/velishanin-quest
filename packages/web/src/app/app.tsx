import { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { InitializationScreen } from './initialization-screen'
import { Layout } from './layout'
import { LoadingFallback } from './loading-fallback'

import { ROUTER_MAP, getProtectedElement } from '@/constants/routes'
import { useInitTelegram } from '@/hooks/use-init-telegram'
import useTelegramStore from '@/stores/use-telegram-store'

export default function App() {
    const { isReady } = useTelegramStore()
    const { isAuthenticating, authError } = useInitTelegram()

    if (!isReady) {
        return <InitializationScreen isAuthenticating={isAuthenticating} authError={authError} />
    }

    return (
        <BrowserRouter>
            <Layout>
                <Suspense fallback={<LoadingFallback />}>
                    <Routes>
                        {ROUTER_MAP.map(({ path, element, protected: isProtected }) => (
                            <Route key={path} path={path} element={isProtected ? getProtectedElement(element) : element} />
                        ))}
                    </Routes>
                </Suspense>
            </Layout>
        </BrowserRouter>
    )
}
