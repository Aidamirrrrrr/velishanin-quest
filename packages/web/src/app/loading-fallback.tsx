import { Spinner } from '@/components/ui'

export const LoadingFallback = () => (
    <div className="flex items-center justify-center min-h-screen bg-telegram-bg">
        <Spinner />
    </div>
)
