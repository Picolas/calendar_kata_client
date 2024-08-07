import { IsDateString, IsNumber } from 'class-validator';

export class GetDaysDto {
    @IsDateString()
    month!: string;

    @IsNumber()
    userId!: number;
}