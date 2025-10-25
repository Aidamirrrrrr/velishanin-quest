import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'

import type { PrismaService } from '../../prisma/prisma.service'
import type { ConfigService } from '@nestjs/config'
import type { Request } from 'express'

export interface JwtPayload {
    sub: number
    telegramId: number | bigint
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private prisma: PrismaService,
        private configService: ConfigService
    ) {
        const cookieName = configService.getOrThrow<string>('JWT_COOKIE_NAME')

        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => {
                    return request?.cookies?.[cookieName]
                },
            ]),
            ignoreExpiration: false,
            secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
        })
    }

    public async validate(payload: JwtPayload) {
        const user = await this.prisma.user.findUnique({
            where: { id: payload.sub },
        })

        if (!user) {
            throw new UnauthorizedException('User not found')
        }

        return {
            id: user.id,
            telegramId: user.telegramId,
            firstName: user.firstName,
            username: user.username,
        }
    }
}
