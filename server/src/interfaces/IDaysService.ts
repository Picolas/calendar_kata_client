import { Day } from './Day';

export interface IDaysService {
    getDays(userId: number, startDate: Date, endDate: Date): Promise<Day[]>;
}