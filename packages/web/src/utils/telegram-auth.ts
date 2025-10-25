import { authService } from '@/services/auth'

interface AuthResult {
    success: boolean
    error: string | null
}

export const authenticateUser = async (initData: string): Promise<AuthResult> => {
    if (!initData) {
        return {
            success: false,
            error: 'InitData отсутствует - откройте через Telegram',
        }
    }

    try {
        await authService.authenticateWithTelegram(initData)
        return { success: true, error: null }
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Ошибка авторизации',
        }
    }
}
