import { inject, injectable } from 'inversify';
import { TYPES } from '../constants/types';
import { INotificationsService } from '../interfaces/Service/INotificationsService';
import { INotificationsRepository } from '../interfaces/Repository/INotificationsRepository';
import { plainToInstance } from 'class-transformer';
import {NotificationDto} from "../dtos/NotificationDto";
import {CreateNotificationDto} from "../dtos/CreateNotificationDto";
import {ISocketService} from "../interfaces/Service/ISocketService";

@injectable()
export class NotificationsService implements INotificationsService {
    constructor(
        @inject(TYPES.NotificationsRepository) private notificationsRepository: INotificationsRepository,
        @inject(TYPES.SocketService) private socketService: ISocketService
    ) {}

    public async createNotification(userId: number, content: string): Promise<NotificationDto> {
        const notificationData = new CreateNotificationDto();
        notificationData.userId = userId;
        notificationData.content = content;
        const newNotification = await this.notificationsRepository.create(notificationData);

        this.socketService.emitToUser(userId, 'notification', notificationData);

        return plainToInstance(NotificationDto, newNotification, { excludeExtraneousValues: true });
    }

    public async getNotifications(userId: number): Promise<NotificationDto[]> {
        const notifications = await this.notificationsRepository.findByUserId(userId);
        return plainToInstance(NotificationDto, notifications, { excludeExtraneousValues: true });
    }

    public async getUnreadNotifications(userId: number): Promise<NotificationDto[]> {
        const notifications = await this.notificationsRepository.findUnreadByUserId(userId);
        return plainToInstance(NotificationDto, notifications, { excludeExtraneousValues: true });
    }

    public async markAsRead(notificationId: number, userId: number): Promise<NotificationDto> {
        const notification = await this.notificationsRepository.findById(notificationId);
        if (!notification) {
            throw new Error('Notification not found');
        }
        if (notification.userId !== userId) {
            throw new Error('You do not have permission to update this notification');
        }
        const updatedNotification = await this.notificationsRepository.update(notificationId, { read: true });
        return plainToInstance(NotificationDto, updatedNotification, { excludeExtraneousValues: true });
    }

    public async deleteNotification(notificationId: number, userId: number): Promise<boolean> {
        const notification = await this.notificationsRepository.findById(notificationId);
        if (!notification) {
            throw new Error('Notification not found');
        }
        if (notification.userId !== userId) {
            throw new Error('You do not have permission to delete this notification');
        }
        await this.notificationsRepository.delete(notificationId);
        return true;
    }
}