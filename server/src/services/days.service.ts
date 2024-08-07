import { inject, injectable } from 'inversify';
import { IDaysService } from '../interfaces/Service/IDaysService';
import { IEventsRepository } from '../interfaces/Repository/IEventsRepository';
import { IUsersRepository } from '../interfaces/Repository/IUsersRepository';
import { TYPES } from '../constants/types';
import { DaysUtils } from '../utils/DaysUtils';
import {plainToInstance} from "class-transformer";
import {EventDto} from "../dtos/EventDto";
import {DayDto} from "../dtos/DayDto";

@injectable()
export class DaysService implements IDaysService {
    constructor(
        @inject(TYPES.UsersRepository) private usersRepository: IUsersRepository,
        @inject(TYPES.EventsRepository) private eventsRepository: IEventsRepository
    ) {}

    public async getDaysForMonth(userId: number, month: Date): Promise<DayDto[]> {
        const user = await this.usersRepository.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        const { startDate, endDate } = DaysUtils.getPeriodDays(month);
        const events = await this.eventsRepository.findByPeriod(userId, startDate, endDate);

        const eventDtos = plainToInstance(EventDto, events, { excludeExtraneousValues: true });

        const days = DaysUtils.getDays(month, eventDtos);
        return plainToInstance(DayDto, days, {
            excludeExtraneousValues: true
        });
    }
}