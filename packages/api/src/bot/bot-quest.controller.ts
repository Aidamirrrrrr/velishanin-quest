import { Controller, Post, Body } from '@nestjs/common'

import type { BotSubmitQuestDto } from './dto/bot-submit-quest.dto'
import { QuestService } from '../quest/quest.service'

@Controller('api/bot/quest')
export class BotQuestController {
    constructor(private readonly questService: QuestService) {}

    @Post('submit')
    public async submitQuest(@Body() body: BotSubmitQuestDto) {
        return this.questService.submitQuest(body.telegramId, body.questId, body.answers)
    }
}
