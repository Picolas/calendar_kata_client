import { Exclude, Expose, Type } from 'class-transformer';
import { UserDto } from './UserDto';
import {IsArray, IsDate, ValidateNested} from "class-validator";

export class EventDto {
    @Expose()
    id!: number;

    @Expose()
    title!: string;

    @Expose()
    description!: string;

    @Expose()
    @IsDate()
    @Type(() => Date)
    startDate!: Date;

    @Expose()
    @IsDate()
    @Type(() => Date)
    endDate!: Date;

    @Expose()
    createdAt!: Date;

    @Expose()
    @ValidateNested()
    @Type(() => UserDto)
    creator!: UserDto;

    @Expose()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UserDto)
    inUser!: UserDto[];

    constructor(partial: Partial<EventDto>) {
        Object.assign(this, partial);
    }
}