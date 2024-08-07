import { Expose, Type } from 'class-transformer';
import { EventDto } from './EventDto';

export class DayDto {
    @Expose()
    id!: string;

    @Expose()
    date!: Date;

    @Expose()
    @Type(() => EventDto)
    events!: EventDto[];

    @Expose()
    isLastDay!: boolean;

    @Expose()
    isToday!: boolean;

    constructor(partial: Partial<DayDto>) {
        Object.assign(this, partial);
    }
}