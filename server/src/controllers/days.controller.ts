import { Response } from 'express';
import { DaysUtils } from '../utils/DaysUtils';
import { UsersService } from '../services/users.service';
import {UserRequest} from "../interfaces/UserRequest";
import {EventsService} from "../services/events.service";
import {inject, injectable} from "inversify";
import {TYPES} from "../constants/types";
import {IDaysService} from "../interfaces/Service/IDaysService";
import {GetDaysDto} from "../dtos/GetDaysDto";
import {validate} from "class-validator";
import {DayDto} from "../dtos/DayDto";
import {IDaysController} from "../interfaces/Controller/IDaysController";

@injectable()
export class DaysController implements IDaysController {
    constructor(@inject(TYPES.DaysService) private daysService: IDaysService) {}

    public getDays = async (req: UserRequest, res: Response): Promise<void> => {
        try {
            const getDaysDto = new GetDaysDto();
            getDaysDto.month = req.body.month;
            getDaysDto.userId = req.user?.userId!;

            const errors = await validate(getDaysDto);
            if (errors.length > 0) {
                res.status(400).json({ errors: errors.map(error => Object.values(error.constraints!)) });
                return;
            }

            const monthDate = new Date(getDaysDto.month);
            const days: DayDto[] = await this.daysService.getDaysForMonth(getDaysDto.userId, monthDate);

            res.status(200).json({ days });
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ message: err.message });
        }
    };
}