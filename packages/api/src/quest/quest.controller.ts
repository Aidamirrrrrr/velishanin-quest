import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common'

import { QuestService } from './quest.service'
import { CurrentUser, type CurrentUserData } from '../auth/decorators/current-user.decorator'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

import type { SubmitQuestDto } from './dto/submit-quest.dto'

@Controller('api/quest')
export class QuestController {
    constructor(private readonly questService: QuestService) {}

    @Get(':id')
    public async getQuest(@Param('id') id: string) {
        return this.questService.getQuestById(id)
    }

    @Post('submit')
    @UseGuards(JwtAuthGuard)
    public async submitQuest(@CurrentUser() user: CurrentUserData, @Body() body: SubmitQuestDto) {
        return this.questService.submitQuest(
            Number(user.telegramId),
            user.firstName,
            user.username || undefined,
            body.questId,
            body.answers
        )
    }
}
