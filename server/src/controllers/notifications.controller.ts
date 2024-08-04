import { NotificationsService } from "../services/notifications.service";
import { Response } from "express";
import { UserRequest } from "../interfaces/UserRequest";
import {PartialNotification} from "../interfaces/Notification";
import {Server} from "socket.io";

export class NotificationsController {
    private notificationsService = new NotificationsService();
    private static instance: NotificationsController;
    private io: Server;

    private constructor(io: Server) {
        this.io = io;
    }

    public static getInstance(io: Server): NotificationsController {
        if (!NotificationsController.instance) {
            NotificationsController.instance = new NotificationsController(io);
        }
        return NotificationsController.instance;
    }

    public sendNotification(userId: number, notification: PartialNotification): void {
        const jsonNotification = JSON.stringify(notification);
        this.io.to(`user_${userId}`).emit('notification', jsonNotification);
    }

    public getUserNotifications = async (req: UserRequest, res: Response): Promise<void> => {
        try {
            const userId = req.user?.userId!;
            if (!userId) {
                res.status(400).json({ message: 'User not found' });
                return;
            }

            const notifications = await this.notificationsService.getNotifications(userId);
            notifications.reverse();
            res.status(200).json(notifications);
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ message: err.message });
        }
    }

    public getUnreadNotifications = async (req: UserRequest, res: Response): Promise<void> => {
        try {
            const userId = req.user?.userId!;
            if (!userId) {
                res.status(400).json({ message: 'User not found' });
                return;
            }

            const notifications = await this.notificationsService.getUnreadNotifications(userId);
            notifications.reverse();
            res.status(200).json(notifications);
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ message: err.message });
        }
    }

    public readNotification = async (req: UserRequest, res: Response): Promise<void> => {
        try {
            const notificationId = parseInt(req.params.id, 10);
            const notification = await this.notificationsService.getNotificationById(notificationId);

            if (notification.user?.id !== req.user?.userId) {
                res.status(403).json({ message: 'Forbidden' });
                return;
            }

            await this.notificationsService.markAsRead(notificationId);
            res.status(204).send();
        } catch (error) {
            const err = error as Error;
            res.status(500).json({message: err.message});
        }
    }

    public async createNotification(userId: number, content: string): Promise<void> {
        const notification = await this.notificationsService.createNotification(userId, content);
        this.sendNotification(userId, notification);
    }
}