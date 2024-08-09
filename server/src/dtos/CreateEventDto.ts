import {IsArray, IsEmail, IsISO8601, IsNumber, IsString} from "class-validator";
import {IsBeforeEndDate} from "../decorators/IsBeforeEndDate";

export class CreateEventDto {
    @IsString()
    title!: string;

    @IsString()
    description!: string;

    @IsISO8601()
    @IsBeforeEndDate('endDate', { message: 'Start date must be before end date' })
    startDate!: string | Date;

    @IsISO8601()
    endDate!: string | Date;

    @IsNumber()
    creatorId!: number;

    @IsArray()
    @IsEmail({}, { each: true })
    inUser?: string[] | number[];
}