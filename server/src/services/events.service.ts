import { PrismaClient } from '@prisma/client';
import {Event, PartialEvent} from '../interfaces/Event';
import {DaysUtils} from "../utils/DaysUtils";

export class EventsService {
    private prisma = new PrismaClient();

    public async findAllEvents(): Promise<PartialEvent[]> {
        return this.prisma.event.findMany({
            include: {
                creator: true,
                inUser: {
                    include: {
                        user: true,
                    },
                },
            },
        }).then(events => events.map(event => ({
            ...event,
            inUser: event.inUser.map(userEvent => userEvent.user),
        })));
    }

    public async findEventById(eventId: number): Promise<PartialEvent> {
        const event = await this.prisma.event.findUnique({
            where: { id: eventId },
            include: {
                creator: true,
                inUser: {
                    include: {
                        user: true,
                    },
                },
            },
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
                ...data,
                creator: { connect: { id: data.creator.id } },
                inUser: {
                    create: data.inUser.map(user => ({ user: { connect: { id: user.id } } })),
                },
                createdAt: new Date(),
            },
            include: {
                creator: true,
                inUser: {
                    include: {
                        user: true,
                    },
                },
            },
        });
        return {
            ...event,
            inUser: event.inUser.map(userEvent => userEvent.user),
        };
    }

    public async updateEvent(eventId: number, data: PartialEvent): Promise<PartialEvent> {
        const event = await this.prisma.event.findUnique({ where: { id: eventId } });
        if (!event) {
            throw new Error('Event not found');
        }
        const { id, createdAt, inUser, showHeader, ...updateData } = data; // Exclude `id` and `createdAt` from the update data
        const updatedEvent = await this.prisma.event.update({
            where: { id: eventId },
            data: {
                ...updateData,
                creator: data.creator ? { connect: { id: data.creator.id } } : undefined,
                /*
                inUser: data.inUser ? {
                    create: data.inUser.map(user => ({ user: { connect: { id: user.id } } })),
                } : undefined,
                 */
            },
            include: {
                creator: true,
                /*
                inUser: {
                    include: {
                        user: true,
                    },
                },
                 */
            },
        });
        return {
            ...updatedEvent,
            //inUser: updatedEvent.inUser.map(userEvent => userEvent.user),
        };
    }

    public async deleteEvent(eventId: number, userId: number): Promise<PartialEvent> {
        const event = await this.prisma.event.findUnique({ where: { id: eventId } });
        if (!event) {
            throw new Error('Event not found');
        }

        await this.prisma.usersOnEvents.deleteMany({ where: { eventId } });

        const deletedEvent = await this.prisma.event.delete({ where: { id: eventId } });
        return {
            ...deletedEvent,
        };
    }

    public async getUserEventsOfDay(userId: number, date: string): Promise<PartialEvent[]> {
        const start = DaysUtils.getStartOfDay(new Date(date));
        const end = DaysUtils.getEndOfDay(new Date(date));

        const events = await this.prisma.event.findMany({
            where: {
                creatorId: userId,
                startDate: {
                    gte: start,
                },
                endDate: {
                    lte: end,
                },
            },
            include: {
                creator: true,
                inUser: {
                    include: {
                        user: true,
                    },
                },
            },
        });

        return events.map(event => ({
            ...event,
            inUser: event.inUser.map(userEvent => userEvent.user),
        }));
    }

    public async findEventsByPeriod(userId: number, startDate: Date, endDate: Date): Promise<PartialEvent[]> {
        const events = await this.prisma.event.findMany({
            where: {
                creatorId: userId,
                OR: [
                    {
                        startDate: {
                            gte: startDate,
                            lte: endDate,
                        },
                    },
                    {
                        endDate: {
                            gte: startDate,
                            lte: endDate,
                        },
                    },
                ],
            },
            include: {
                creator: true,
                inUser: {
                    select: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                                createdAt: true,
                            },
                        },
                    },
                },
            },
        });

        return events.map(event => ({
            id: event.id,
            title: event.title,
            description: event.description,
            startDate: event.startDate,
            endDate: event.endDate,
            createdAt: event.createdAt,
            creator: {
                id: event.creator.id,
                name: event.creator.name,
                email: event.creator.email,
                createdAt: event.creator.createdAt,
            },
            inUser: event.inUser.map(userRelation => ({
                id: userRelation.user.id,
                name: userRelation.user.name,
                email: userRelation.user.email,
                createdAt: userRelation.user.createdAt,
            })),
        }));
    }
}