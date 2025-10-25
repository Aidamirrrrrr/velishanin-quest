import { Controller, Get, Param } from '@nestjs/common'

import { UserService } from './user.service'

@Controller('api/user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get(':telegramId')
    public async getUserStats(@Param('telegramId') telegramId: string) {
        return this.userService.getUserStats(parseInt(telegramId, 10))
    }
}
