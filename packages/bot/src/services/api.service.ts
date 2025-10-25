import axios, { type AxiosInstance } from 'axios'

import { config } from '../config'

import type { Quest, Answer } from '../types/quest.types'

export class ApiService {
    private client: AxiosInstance

    constructor() {
        this.client = axios.create({
            baseURL: config.API_URL,
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }

    public async getQuest(questId: string): Promise<Quest> {
        const response = await this.client.get<Quest>(`/api/quest/${questId}`)
        return response.data
    }

    public async submitQuest(telegramId: number, questId: string, answers: Omit<Answer, 'isCorrect' | 'pointsEarned'>[]) {
        const response = await this.client.post('/api/bot/quest/submit', {
            telegramId,
            questId,
            answers,
        })
        return response.data
    }
}

export const apiService = new ApiService()
