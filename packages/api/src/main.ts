import { Logger, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import helmet from 'helmet'

import { AppModule } from './app.module'

async function bootstrap() {
    const logger = new Logger(bootstrap.name)
    const app = await NestFactory.create(AppModule)
    const configService = app.get(ConfigService)

    app.use(helmet())
    app.use(cookieParser())

    const corsOrigin = configService.getOrThrow<string>('CORS_ORIGIN')

    app.enableCors({
        origin: corsOrigin.includes(',') ? corsOrigin.split(',').map((o) => o.trim()) : corsOrigin,
        credentials: true,
    })

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
        })
    )

    const port = parseInt(configService.getOrThrow<string>('PORT'), 10)
    await app.listen(port)

    logger.log(`API server running on http://localhost:${port}`)
}

bootstrap()
