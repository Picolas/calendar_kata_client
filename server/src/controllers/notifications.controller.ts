import { Response } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../constants/types";
import { INotificationsController } from "../interfaces/Controller/INotificationsController";
import { INotificationsService } from "../interfaces/Service/INotificationsService";
import { UserRequest } from "../interfaces/UserRequest";

@injectable()
export class NotificationsController implements INotificationsController {
    constructor(
        @inject(TYPES.NotificationsService) private notificationsService: INotificationsService,
    ) {}

    public getUserNotifications = async (req: UserRequest, res: Response): Promise<void> => {
        try {
            const userId = req.user?.userId!;
            const notifications = await this.notificationsService.getNotifications(userId);
            res.status(200).json(notifications);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

    public getUnreadNotifications = async (req: UserRequest, res: Response): Promise<void> => {
        try {
            const userId = req.user?.userId!;
            const notifications = await this.notificationsService.getUnreadNotifications(userId);
            res.status(200).json(notifications);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

    public markAsRead = async (req: UserRequest, res: Response): Promise<void> => {
        try {
            const userId = req.user?.userId!;
            const notificationId = parseInt(req.params.id, 10);
            const updatedNotification = await this.notificationsService.markAsRead(notificationId, userId);
            res.status(200).json(updatedNotification);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

    public deleteNotification = async (req: UserRequest, res: Response): Promise<void> => {
        try {
            const userId = req.user?.userId!;
            const notificationId = parseInt(req.params.id, 10);
            await this.notificationsService.deleteNotification(notificationId, userId);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }
}