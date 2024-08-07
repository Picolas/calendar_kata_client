import {IsArray, IsEmail, IsISO8601, IsNumber, IsString} from "class-validator";

export class CreateEventDto {
    @IsString()
    title!: string;

    @IsString()
    description!: string;

    @IsISO8601()
    startDate!: string | Date;

    @IsISO8601()
    endDate!: string | Date;

    @IsNumber()
    creatorId!: number;

    @IsArray()
    @IsEmail({}, { each: true })
    inUser?: string[] | number[];
}