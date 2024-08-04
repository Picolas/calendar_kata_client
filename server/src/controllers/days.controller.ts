import { Response } from 'express';
import { DaysUtils } from '../utils/DaysUtils';
import { UsersService } from '../services/users.service';
import {UserRequest} from "../interfaces/UserRequest";
import {EventsService} from "../services/events.service";


export class DaysController {
    private usersService = new UsersService();
    private eventsService = new EventsService();

    public getDays = async (req: UserRequest, res: Response): Promise<void> => {
        try {
            const { month } = req.body;
            const userId = req.user?.userId;

            if (!month || !userId) {
                res.status(400).json({
                    message: !month ? 'Month date is required' : 'UserId is required'
                });
                return;
            }

            const user = await this.usersService.findUserById(userId!);
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            const monthDate = new Date(month);
            const { startDate, endDate } = DaysUtils.getPeriodDays(monthDate);
            const events = await this.eventsService.findEventsByPeriod(user.id!, startDate, endDate);
            const days = DaysUtils.getDays(monthDate, events);

            res.status(200).json({ days });
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ message: err.message });
        }
    };
}