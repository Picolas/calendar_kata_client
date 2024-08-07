import {NotificationDto} from "../../dtos/NotificationDto";

export interface INotificationsService {
    createNotification(userId: number, content: string): Promise<NotificationDto>;
    getNotifications(userId: number): Promise<NotificationDto[]>;
    getUnreadNotifications(userId: number): Promise<NotificationDto[]>;
    markAsRead(notificationId: number, userId: number): Promise<NotificationDto>;
    deleteNotification(notificationId: number, userId: number): Promise<boolean>;
}