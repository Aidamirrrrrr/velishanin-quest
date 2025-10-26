import { Type } from 'class-transformer'
import { IsNumber, IsString, IsNotEmpty, IsArray, ValidateNested } from 'class-validator'

class BotAnswerDto {
    @IsString()
    @IsNotEmpty()
    public questionId: string

    @IsNumber()
    public selectedOption: number
}

export class BotSubmitQuestDto {
    @IsNumber()
    public telegramId: number

    @IsString()
    @IsNotEmpty()
    public firstName: string

    @IsString()
    public username?: string

    @IsString()
    @IsNotEmpty()
    public questId: string

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => BotAnswerDto)
    public answers: BotAnswerDto[]
}
