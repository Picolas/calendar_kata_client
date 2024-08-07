import { Day } from '../Day';
import {DayDto} from "../../dtos/DayDto";

export interface IDaysService {
    getDaysForMonth(userId: number, month: Date): Promise<DayDto[]>;
}