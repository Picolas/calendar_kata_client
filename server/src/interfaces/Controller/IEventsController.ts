import { Request, Response } from 'express';
import { UserRequest } from "../UserRequest";

export interface IEventsController {
    getAllEvents(req: Request, res: Response): Promise<void>;
    getEventById(req: Request, res: Response): Promise<void>;
    createEvent(req: UserRequest, res: Response): Promise<void>;
    updateEvent(req: UserRequest, res: Response): Promise<void>;
    deleteEvent(req: UserRequest, res: Response): Promise<void>;
    getUserEvents(req: UserRequest, res: Response): Promise<void>;
    getUserEventsOfDay(req: Request, res: Response): Promise<void>;
    getEventsOnInterval(req: UserRequest, res: Response): Promise<void>;
}