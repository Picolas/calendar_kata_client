import { Response } from 'express';
import { UserRequest } from "../UserRequest";

export interface INotificationsController {
    getUserNotifications(req: UserRequest, res: Response): Promise<void>;
    getUnreadNotifications(req: UserRequest, res: Response): Promise<void>;
    markAsRead(req: UserRequest, res: Response): Promise<void>;
    deleteNotification(req: UserRequest, res: Response): Promise<void>;
}