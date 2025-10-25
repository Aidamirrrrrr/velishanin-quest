export interface TelegramUser {
    id: number
    first_name: string
    username?: string
    is_premium?: boolean
}

export interface TelegramWebApp {
    initData: string
    initDataUnsafe: {
        user?: TelegramUser
    }
    themeParams: ThemeParams

    ready(): void
    expand(): void
    close(): void
    showAlert(message: string, callback?: () => void): void
    showConfirm(message: string, callback?: (confirmed: boolean) => void): void
    openTelegramLink(url: string): void
    MainButton: MainButton
}

export interface ThemeParams {
    bg_color?: string
    text_color?: string
    hint_color?: string
    link_color?: string
    button_color?: string
    button_text_color?: string
    secondary_bg_color?: string
}

export interface MainButton {
    setText(text: string): void
    onClick(callback: () => void): void
    show(): void
    hide(): void
}
