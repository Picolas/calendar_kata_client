import {PartialNotification} from "./Notification";

export interface INotificationsService {
    createNotification(userId: number, content: string): Promise<PartialNotification>;
    getNotifications(userId: number): Promise<PartialNotification[]>;
    getUnreadNotifications(userId: number): Promise<PartialNotification[]>;
    markAsRead(notificationId: number): Promise<void>;
    getNotificationById(notificationId: number): Promise<PartialNotification>;
}