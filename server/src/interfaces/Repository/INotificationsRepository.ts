import { Notification } from "@prisma/client";
import {CreateNotificationDto} from "../../dtos/CreateNotificationDto";

export interface INotificationsRepository {
    create(notificationData: CreateNotificationDto): Promise<Notification>;
    findByUserId(userId: number): Promise<Notification[]>;
    findUnreadByUserId(userId: number): Promise<Notification[]>;
    findById(id: number): Promise<Notification | null>;
    update(id: number, data: Partial<Notification>): Promise<Notification>;
    delete(id: number): Promise<void>;
}