import {inject, injectable} from 'inversify';
import { PrismaClient } from '@prisma/client';
import { IEventsService } from '../interfaces/IEventsService';
import { Event, PartialEvent } from '../interfaces/Event';
import { User } from '../interfaces/User';
import {TYPES} from "../constants/types";

@injectable()
export class EventsService implements IEventsService {
    constructor(@inject(TYPES.PrismaClient) private prisma: PrismaClient) {}

    private eventDetails = {
        creator: true,
        inUser: {
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        createdAt: true,
                    }
                }
            }
        }
    };

    public async findAllEvents(): Promise<PartialEvent[]> {
        return this.prisma.event.findMany({
            include: this.eventDetails,
        }).then(events => events.map(event => ({
            ...event,
            inUser: event.inUser.map(userEvent => userEvent.user),
        })));
    }

    public async findEventById(eventId: number): Promise<PartialEvent> {
        const event = await this.prisma.event.findUnique({
            where: { id: eventId },
            include: this.eventDetails,
        });
        if (!event) {
            throw new Error('Event not found');
        }
        return {
            ...event,
            inUser: event.inUser.map(userEvent => userEvent.user),
        };
    }

    public async createEvent(data: Omit<Event, 'id' | 'createdAt'>): Promise<PartialEvent> {
        const event = await this.prisma.event.create({
            data: {
                title: data.title,
                description: data.description,
                startDate: new Date(data.startDate).toISOString(),
                endDate: new Date(data.endDate).toISOString(),
                creator: { connect: { id: data.creator.id } },
                inUser: {
                    create: data.inUser.map(user => ({ user: { connect: { id: user.id } } })),
                },
                createdAt: new Date(),
            },
            include: this.eventDetails
        });
        return {
            ...event,
            inUser: event.inUser.map(userEvent => userEvent.user),
        };
    }

    public async updateEvent(eventId: number, data: Partial<Event>): Promise<PartialEvent> {
        const event = await this.prisma.event.update({
            where: { id: eventId },
            data: {
                title: data.title,
                description: data.description,
                startDate: data.startDate ? new Date(data.startDate).toISOString() : undefined,
                endDate: data.endDate ? new Date(data.endDate).toISOString() : undefined,
                inUser: data.inUser ? {
                    deleteMany: {},
                    create: data.inUser.map(user => ({ user: { connect: { id: user.id } } })),
                } : undefined,
            },
            include: this.eventDetails
        });
        return {
            ...event,
            inUser: event.inUser.map(userEvent => userEvent.user),
        };
    }

    public async deleteEvent(eventId: number, userId: number): Promise<boolean> {
        const event = await this.prisma.event.findUnique({
            where: { id: eventId },
            include: { creator: true }
        });

        if (!event || event.creator.id !== userId) {
            return false;
        }

        await this.prisma.event.delete({ where: { id: eventId } });
        return true;
    }

    public async getUsersForEvent(eventId: number): Promise<User[]> {
        const event = await this.prisma.event.findUnique({
            where: { id: eventId },
            include: { inUser: { include: { user: true } } }
        });
        return event ? event.inUser.map(userEvent => userEvent.user) : [];
    }

    public async getEventCreator(eventId: number): Promise<User> {
        const event = await this.prisma.event.findUnique({
            where: { id: eventId },
            include: { creator: true }
        });
        if (!event) {
            throw new Error('Event not found');
        }
        return event.creator;
    }

    public async findEventsByPeriod(userId: number, startDate: Date, endDate: Date): Promise<PartialEvent[]> {
        return this.prisma.event.findMany({
            where: {
                OR: [
                    { creatorId: userId },
                    { inUser: { some: { userId: userId } } }
                ],
                AND: [
                    { startDate: { gte: startDate } },
                    { endDate: { lte: endDate } }
                ]
            },
            include: this.eventDetails
        }).then(events => events.map(event => ({
            ...event,
            inUser: event.inUser.map(userEvent => userEvent.user),
        })));
    }

    public async getUserEventsOfDay(userId: number, date: string): Promise<PartialEvent[]> {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        return this.prisma.event.findMany({
            where: {
                OR: [
                    { creatorId: userId },
                    { inUser: { some: { userId: userId } } }
                ],
                AND: [
                    { startDate: { gte: startOfDay } },
                    { endDate: { lte: endOfDay } }
                ]
            },
            include: this.eventDetails
        }).then(events => events.map(event => ({
            ...event,
            inUser: event.inUser.map(userEvent => userEvent.user),
        })));
    }

    public async getUserEvents(userId: number): Promise<PartialEvent[]> {
        return this.prisma.event.findMany({
            where: {
                OR: [
                    { creatorId: userId },
                    { inUser: { some: { userId: userId } } }
                ]
            },
            include: this.eventDetails
        }).then(events => events.map(event => ({
            ...event,
            inUser: event.inUser.map(userEvent => userEvent.user),
        })));
    }
}