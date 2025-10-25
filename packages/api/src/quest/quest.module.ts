import { Module } from '@nestjs/common'

import { QuestController } from './quest.controller'
import { QuestService } from './quest.service'

@Module({
    controllers: [QuestController],
    providers: [QuestService],
    exports: [QuestService],
})
export class QuestModule {}
