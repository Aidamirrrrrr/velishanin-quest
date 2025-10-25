import { z } from 'zod'

export const AuthResponseSchema = z.object({
    user: z.object({
        id: z.number(),
        telegramId: z.union([z.number(), z.bigint()]),
        firstName: z.string(),
        username: z.string().nullable(),
    }),
})
