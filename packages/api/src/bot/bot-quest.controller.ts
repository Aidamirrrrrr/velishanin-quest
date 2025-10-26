import { Controller, Post, Body } from '@nestjs/common'

import { QuestService } from '../quest/quest.service'

import type { BotSubmitQuestDto } from './dto/bot-submit-quest.dto'

@Controller('api/bot/quest')
export class BotQuestController {
    constructor(private readonly questService: QuestService) { }

    @Post('submit')
    public async submitQuest(@Body() body: BotSubmitQuestDto) {
        return this.questService.submitQuest(
            body.telegramId,
            body.firstName,
            body.username,
            body.questId,
            body.answers
        )
    }
}
