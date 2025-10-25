import { Module } from '@nestjs/common'

import { BotQuestController } from './bot-quest.controller'
import { QuestModule } from '../quest/quest.module'

@Module({
    imports: [QuestModule],
    controllers: [BotQuestController],
})
export class BotModule {}
