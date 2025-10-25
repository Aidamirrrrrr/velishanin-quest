import { Type } from 'class-transformer'
import { IsString, IsNotEmpty, IsArray, ValidateNested, IsNumber } from 'class-validator'

export class AnswerDto {
    @IsString()
    @IsNotEmpty()
    public questionId: string

    @IsNumber()
    public selectedOption: number
}

export class SubmitQuestDto {
    @IsString()
    @IsNotEmpty()
    public questId: string

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => AnswerDto)
    public answers: AnswerDto[]
}
