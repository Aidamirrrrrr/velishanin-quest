import type { ThemeParams } from '@/types'

const THEME_MAPPING: Record<keyof ThemeParams, string> = {
    bg_color: '--tg-theme-bg-color',
    text_color: '--tg-theme-text-color',
    hint_color: '--tg-theme-hint-color',
    link_color: '--tg-theme-link-color',
    button_color: '--tg-theme-button-color',
    button_text_color: '--tg-theme-button-text-color',
    secondary_bg_color: '--tg-theme-secondary-bg-color',
}

export const applyTelegramTheme = (params: ThemeParams): void => {
    const root = document.documentElement.style

    Object.entries(THEME_MAPPING).forEach(([key, cssVar]) => {
        const value = params[key as keyof ThemeParams]
        if (value) {
            root.setProperty(cssVar, value)
        }
    })
}
