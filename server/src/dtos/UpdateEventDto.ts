import {IsArray, IsEmail, IsISO8601, IsString} from "class-validator";

export class UpdateEventDto {
    @IsString()
    title?: string;

    @IsString()
    description?: string;

    @IsISO8601()
    startDate?: string | Date;

    @IsISO8601()
    endDate?: string | Date;

    @IsArray()
    @IsEmail({}, { each: true })
    inUser?: string[] | number[];
}