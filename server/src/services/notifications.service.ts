import {PrismaClient} from "@prisma/client";
import {PartialNotification} from "../interfaces/Notification";

export class NotificationsService {
    private prisma = new PrismaClient();

    public async createNotification(userId: number, content: string): Promise<void> {
        await this.prisma.notification.create({
            data: {
                content,
                userId,
                createdAt: new Date(),
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

}