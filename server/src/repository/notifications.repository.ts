import { injectable } from "inversify";
import { PrismaClient, Notification } from "@prisma/client";
import { INotificationsRepository } from "../interfaces/Repository/INotificationsRepository";
import {CreateNotificationDto} from "../dtos/CreateNotificationDto";

@injectable()
export class NotificationsRepository implements INotificationsRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    public async create(notificationData: CreateNotificationDto): Promise<Notification> {
        return this.prisma.notification.create({ data: notificationData });
    }

    public async findByUserId(userId: number): Promise<Notification[]> {
        return this.prisma.notification.findMany({ where: { userId } });
    }

    public async findUnreadByUserId(userId: number): Promise<Notification[]> {
        return this.prisma.notification.findMany({ where: { userId, read: false } });
    }

    public async findById(id: number): Promise<Notification | null> {
        return this.prisma.notification.findUnique({ where: { id } });
    }

    public async update(id: number, data: Partial<Notification>): Promise<Notification> {
        return this.prisma.notification.update({ where: { id }, data });
    }

    public async delete(id: number): Promise<void> {
        await this.prisma.notification.delete({ where: { id } });
    }
}