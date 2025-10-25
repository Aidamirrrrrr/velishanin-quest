import { Controller, Get, Query } from '@nestjs/common'

import { LeaderboardService } from './leaderboard.service'

@Controller('api/leaderboard')
export class LeaderboardController {
    constructor(private readonly leaderboardService: LeaderboardService) {}

    @Get()
    public async getLeaderboard(@Query('limit') limit?: string) {
        const limitNum = limit ? parseInt(limit, 10) : 10
        return this.leaderboardService.getLeaderboard(limitNum)
    }
}
