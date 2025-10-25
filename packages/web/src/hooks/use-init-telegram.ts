import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'

import { authService } from '@/services/auth'
import useTelegramStore from '@/stores/use-telegram-store'
import { applyTelegramTheme } from '@/utils/telegram-theme'

export const useInitTelegram = () => {
    const { setWebApp, setUser, setReady } = useTelegramStore()

    const authMutation = useMutation({
        mutationFn: (initData: string) => authService.authenticateWithTelegram(initData),
        onError: (error) => {
            console.error('Ошибка авторизации:', error)
        },
    })

    useEffect(() => {
        const initTelegram = async () => {
            if (typeof window === 'undefined' || !window.Telegram?.WebApp) {
                console.warn('Telegram WebApp не доступен')
                setReady(true)
                return
            }

            const webapp = window.Telegram.WebApp

            webapp.ready()
            webapp.expand()

            if (webapp.themeParams) {
                applyTelegramTheme(webapp.themeParams)
            }

            setWebApp(webapp)
            setUser(webapp.initDataUnsafe?.user || null)

            if (webapp.initData) {
                authMutation.mutate(webapp.initData)
            }

            setReady(true)
        }

        initTelegram()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return {
        isAuthenticating: authMutation.isPending,
        authError: authMutation.error?.message || null,
    }
}
