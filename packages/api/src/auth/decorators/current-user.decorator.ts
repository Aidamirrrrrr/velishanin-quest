import { createParamDecorator } from '@nestjs/common'

import type { ExecutionContext } from '@nestjs/common'

export interface CurrentUserData {
    id: number
    telegramId: number | bigint
    firstName: string
    username: string | null
}

export const CurrentUser = createParamDecorator((data: unknown, ctx: ExecutionContext): CurrentUserData => {
    const request = ctx.switchToHttp().getRequest()
    return request.user
})
