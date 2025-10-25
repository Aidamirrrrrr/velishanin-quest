import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import type { TelegramStore, TelegramWebApp, TelegramUser } from '@/types'

const useTelegramStore = create<TelegramStore>()(
    devtools(
        (set) => ({
            webApp: null,
            user: null,
            isReady: false,

            setWebApp: (webApp: TelegramWebApp | null) => set({ webApp }),
            setUser: (user: TelegramUser | null) => set({ user }),
            setReady: (isReady: boolean) => set({ isReady }),
        }),
        { name: 'TelegramStore' }
    )
)

export default useTelegramStore
