import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'

import { AuthModule } from './auth/auth.module'
import { BotModule } from './bot/bot.module'
import { LeaderboardModule } from './leaderboard/leaderboard.module'
import { PrismaModule } from './prisma/prisma.module'
import { QuestModule } from './quest/quest.module'
import { UserModule } from './user/user.module'

@Module({
    imports: [
        AuthModule,
        BotModule,
        ConfigModule.forRoot({ isGlobal: true }),
        ThrottlerModule.forRoot([
            {
                ttl: 60000,
                limit: 100,
            },
        ]),
        LeaderboardModule,
        PrismaModule,
        QuestModule,
        UserModule,
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
    ],
})
export class AppModule {}
