import type { z } from 'zod'

const API_URL = import.meta.env.VITE_API_URL

export class ApiValidationError extends Error {
    constructor(
        message: string,
        public zodError: z.ZodError
    ) {
        super(message)
        this.name = 'ApiValidationError'
    }
}

interface RequestOptions extends globalThis.RequestInit {
    headers?: globalThis.HeadersInit
}

export class HttpClient {
    private readonly baseURL: string

    constructor(baseURL: string) {
        this.baseURL = baseURL
    }

    public async requestWithoutAuth<T>(endpoint: string, schema: z.ZodSchema<T>, options: RequestOptions = {}): Promise<T> {
        return this.makeRequest(endpoint, schema, options)
    }

    public async request<T>(endpoint: string, schema: z.ZodSchema<T>, options: RequestOptions = {}): Promise<T> {
        return this.makeRequest(endpoint, schema, options)
    }

    private async makeRequest<T>(endpoint: string, schema: z.ZodSchema<T>, options: RequestOptions): Promise<T> {
        try {
            const headers: Record<string, string> = {
                'Content-Type': 'application/json',
                ...(options.headers as Record<string, string>),
            }

            const url = `${this.baseURL}${endpoint}`
            const response = await fetch(url, {
                headers,
                credentials: 'include',
                ...options,
            })

            if (!response.ok) {
                throw new Error(`HTTP Error ${response.status}: ${response.statusText}`)
            }

            const data = await response.json()

            const validationResult = schema.safeParse(data)

            if (!validationResult.success) {
                throw new ApiValidationError('API response validation failed', validationResult.error)
            }

            return validationResult.data
        } catch (error) {
            if (error instanceof ApiValidationError) {
                console.error(`Validation Error [${endpoint}]:`, error.zodError.format())
            } else {
                console.error(`API Error [${endpoint}]:`, error)
            }
            throw error
        }
    }
}

export const httpClient = new HttpClient(API_URL)
