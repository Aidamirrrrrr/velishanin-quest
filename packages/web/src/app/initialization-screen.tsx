import { Spinner } from '@/components/ui'

interface InitializationScreenProps {
    isAuthenticating: boolean
    authError: string | null
}

export const InitializationScreen = ({ isAuthenticating, authError }: InitializationScreenProps) => (
    <div className="flex items-center justify-center min-h-screen bg-telegram-bg">
        <div className="text-center max-w-md px-4">
            <Spinner className="mx-auto mb-4" />
            <p className="text-telegram-hint mb-2">Инициализация...</p>

            {isAuthenticating && <p className="text-sm text-telegram-hint">🔐 Авторизация...</p>}

            {authError && (
                <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                    <p className="text-sm text-red-500">⚠️ {authError}</p>
                    <p className="text-xs text-telegram-hint mt-2">Приложение продолжит работу без авторизации</p>
                </div>
            )}
        </div>
    </div>
)
