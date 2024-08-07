import { Response } from 'express';
import {UserRequest} from "../UserRequest";

export interface IDaysController {
    getDays(req: UserRequest, res: Response): Promise<void>;
}