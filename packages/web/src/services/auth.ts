import { HttpClient } from './http-client'

import type { z } from 'zod'

import { AuthResponseSchema } from '@/schemas/auth-schemas'

type AuthResponse = z.infer<typeof AuthResponseSchema>

const API_URL = import.meta.env.VITE_API_URL
const publicHttpClient = new HttpClient(API_URL)

class AuthService {
    private isAuth: boolean = false

    public async authenticateWithTelegram(initData: string): Promise<AuthResponse> {
        const data = await publicHttpClient.requestWithoutAuth('/api/auth/telegram', AuthResponseSchema, {
            method: 'POST',
            body: JSON.stringify({ initData }),
        })

        this.isAuth = true

        return data
    }

    public getToken(): string | null {
        return null
    }

    public clearToken(): void {
        this.isAuth = false
    }

    public isAuthenticated(): boolean {
        return this.isAuth
    }
}

export const authService = new AuthService()
