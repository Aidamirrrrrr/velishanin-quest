import type { TelegramWebApp, TelegramUser } from './telegram'

export interface TelegramStore {
    webApp: TelegramWebApp | null
    user: TelegramUser | null
    isReady: boolean

    setWebApp: (webApp: TelegramWebApp | null) => void
    setUser: (user: TelegramUser | null) => void
    setReady: (isReady: boolean) => void
}
