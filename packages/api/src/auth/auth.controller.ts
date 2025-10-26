import { Controller, Post, Body, Res, HttpCode, HttpStatus } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { AuthService } from './auth.service'
import { jwtTimeToMilliseconds } from './utils/jwt-time.util'

import type { TelegramAuthDto } from './dto/telegram-auth.dto'
import type { Response } from 'express'

@Controller('api/auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly configService: ConfigService
    ) {}

    @Post('telegram')
    @HttpCode(HttpStatus.OK)
    public async authenticateWithTelegram(@Body() body: TelegramAuthDto, @Res({ passthrough: true }) res: Response) {
        const result = await this.authService.authenticateWithTelegram(body.initData)

        const jwtExpiresIn = this.configService.getOrThrow<string>('JWT_EXPIRES_IN')
        const cookieMaxAge = jwtTimeToMilliseconds(jwtExpiresIn)
        const cookieName = this.configService.getOrThrow<string>('JWT_COOKIE_NAME')

        res.cookie(cookieName, result.accessToken, {
            httpOnly: true,
            secure: this.configService.getOrThrow<string>('NODE_ENV') === 'production',
            sameSite: 'lax',
            maxAge: cookieMaxAge,
        })

        return {
            user: result.user,
        }
    }
}
