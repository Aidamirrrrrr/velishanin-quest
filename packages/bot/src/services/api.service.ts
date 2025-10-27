import axios, { type AxiosInstance, isAxiosError } from 'axios'

import { config } from '../config'

import type { Quest, Answer } from '../types/quest.types'

export class ApiService {
    private client: AxiosInstance
    private readonly MAX_RETRIES = 2
    private readonly TIMEOUT = 30000

    constructor() {
        this.client = axios.create({
            baseURL: config.API_URL,
            headers: {
                'Content-Type': 'application/json',
            },
            timeout: this.TIMEOUT,
        })
    }

    private async retryRequest<T>(fn: () => Promise<T>, retries = this.MAX_RETRIES): Promise<T> {
        try {
            return await fn()
        } catch (error) {
            if (retries > 0 && isAxiosError(error)) {
                const shouldRetry =
                    !error.response ||
                    error.code === 'ECONNABORTED' ||
                    error.code === 'ETIMEDOUT' ||
                    (error.response.status >= 500 && error.response.status < 600)

                if (shouldRetry) {
                    console.log(`Retrying request... (${this.MAX_RETRIES - retries + 1}/${this.MAX_RETRIES})`)
                    await new Promise((resolve) => setTimeout(resolve, 1000 * (this.MAX_RETRIES - retries + 1)))
                    return this.retryRequest(fn, retries - 1)
                }
            }
            throw error
        }
    }

    public async getQuest(questId: string): Promise<Quest> {
        return this.retryRequest(async () => {
            const response = await this.client.get<Quest>(`/api/quest/${questId}`)
            return response.data
        })
    }

    public async submitQuest(
        telegramId: number,
        firstName: string,
        username: string | undefined,
        questId: string,
        answers: Omit<Answer, 'isCorrect' | 'pointsEarned'>[]
    ) {
        return this.retryRequest(async () => {
            const response = await this.client.post('/api/bot/quest/submit', {
                telegramId,
                firstName,
                username,
                questId,
                answers,
            })
            return response.data
        })
    }
}

export const apiService = new ApiService()
