import {NotificationsService} from "../services/notifications.service";
import {WebSocket, Server} from "ws";
import {Response} from "express";
import {UserRequest} from "../interfaces/UserRequest";

interface UserWebSocket extends WebSocket {
    userId?: number;
}

export class NotificationsController {
    private notificationsService = new NotificationsService();
    private clients: Set<UserWebSocket> = new Set();

    constructor(private wss?: Server) {
        if (wss !== undefined) {
            this.wss?.on('connection', (ws: WebSocket) => {
                this.clients.add(ws);

                ws.on('close', () => {
                    this.clients.delete(ws);
                });

                this.handleWebSocket(ws);
            });
        }
    }

    public handleWebSocket = (ws: WebSocket): void => {
        ws.on('message', (message: string) => {
            const data = JSON.parse(message);

            if (data.type === 'notification_read') {
                this.handleNotificationRead(ws, data);
            }
        });
    };

    public handleNotificationRead = (ws: WebSocket, data: any): void => {
        this.notificationsService.markAsRead(data.notificationId).then(() => {
            this.sendNotificationToUser(data.userId, { type: 'notification_read', notificationId: data.notificationId });
        });
    }

    public broadcastNotification(notification: any): void {
        this.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(notification));
            }
        });
    }

    public sendNotificationToUser(userId: number, notification: any): void {
        this.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN && client.userId === userId) {
                client.send(JSON.stringify(notification));
            }
        });
    }

    public getUserNotifications = async (req: UserRequest, res: Response): Promise<void> => {
        try {
            const userId = req.user?.userId!;
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
            const notifications = await this.notificationsService.getUnreadNotifications(userId);
            res.status(200).json(notifications);
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ message: err.message });
        }
    }

    public createNotification = async (req: UserRequest, res: Response): Promise<void> => {
        try {
            const { content } = req.body;
            const userId = req.user?.userId!;
            await this.notificationsService.createNotification(userId, content);

            this.sendNotificationToUser(userId, { type: 'notification_created', content });
            res.status(201).send();
        } catch (error) {
            const err = error as Error;
            res.status(500).json({message: err.message});
        }
    }
}