import * as crypto from 'crypto'

import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'

import { PrismaService } from '../prisma/prisma.service'
import type { JwtPayload } from './strategies/jwt.strategy'

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
        private configService: ConfigService
    ) {}

    public async authenticateWithTelegram(initData: string) {
        const parsed = new URLSearchParams(initData)
        const hash = parsed.get('hash')
        parsed.delete('hash')

        const dataCheckString = Array.from(parsed.entries())
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([key, value]) => `${key}=${value}`)
            .join('\n')

        const secretKey = crypto
            .createHmac('sha256', 'WebAppData')
            .update(this.configService.getOrThrow<string>('TELEGRAM_BOT_TOKEN'))
            .digest()

        const calculatedHash = crypto.createHmac('sha256', secretKey).update(dataCheckString).digest('hex')

        if (calculatedHash !== hash) {
            throw new Error('Invalid Telegram data')
        }

        const userJson = parsed.get('user')
        if (!userJson) {
            throw new Error('No user data')
        }

        const userData = JSON.parse(userJson)

        let user = await this.prisma.user.findUnique({
            where: { telegramId: userData.id },
        })

        if (!user) {
            user = await this.prisma.user.create({
                data: {
                    telegramId: userData.id,
                    firstName: userData.first_name,
                    username: userData.username,
                    isPremium: userData.is_premium || false,
                },
            })
        }

        // Generate JWT token
        const payload: JwtPayload = {
            sub: user.id,
            telegramId: user.telegramId,
        }

        const accessToken = this.jwtService.sign(payload)

        return {
            accessToken,
            user: {
                id: user.id,
                telegramId: user.telegramId,
                firstName: user.firstName,
                username: user.username,
            },
        }
    }
}
