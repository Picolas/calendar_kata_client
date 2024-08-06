import {PrismaClient} from "@prisma/client";
import {PartialNotification} from "../interfaces/Notification";
import {inject, injectable} from "inversify";
import {INotificationsService} from "../interfaces/INotificationsService";
import {TYPES} from "../constants/types";

@injectable()
export class NotificationsService implements INotificationsService {
    constructor(@inject(TYPES.PrismaClient) private prisma: PrismaClient) {}

    public async createNotification(userId: number, content: string): Promise<PartialNotification> {
        return this.prisma.notification.create({
            data: {
                content,
                userId,
            },
        });
    }

    public async getNotifications(userId: number): Promise<PartialNotification[]> {
        return this.prisma.notification.findMany({
            where: {
                userId,
            },
        });
    }

    public async getUnreadNotifications(userId: number): Promise<PartialNotification[]> {
        return this.prisma.notification.findMany({
            where: {
                userId,
                read: false,
            },
        });
    }

    public async markAsRead(notificationId: number): Promise<void> {
        await this.prisma.notification.update({
            where: { id: notificationId },
            data: { read: true },
        });
    }

    public async getNotificationById(notificationId: number): Promise<PartialNotification> {
        const notification = await this.prisma.notification.findUnique({
            where: { id: notificationId },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        createdAt: true,
                    },
                },
            }
        });
        if (!notification) {
            throw new Error('Notification not found');
        }
        return notification;
    }

}