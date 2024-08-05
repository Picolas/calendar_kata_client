import { PrismaClient } from '@prisma/client';
import {Event, PartialEvent} from '../interfaces/Event';
import {DaysUtils} from "../utils/DaysUtils";
import {PartialUser} from "../interfaces/User";

export class EventsService {
    private prisma = new PrismaClient();

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

    public async updateEvent(eventId: number, data: PartialEvent): Promise<PartialEvent> {
        const event = await this.prisma.event.findUnique({ where: { id: eventId } });
        if (!event) {
            throw new Error('Event not found');
        }
        const { id, creator,createdAt, inUser, showHeader, ...updateData } = data; // Exclude `id` and `createdAt` from the update data
        const updatedEvent = await this.prisma.event.update({
            where: { id: eventId },
            data: {
                ...updateData,
                //creator: data.creator ? { connect: { id: data.creator.id } } : undefined,
                /*
                inUser: data.inUser ? {
                    create: data.inUser.map(user => ({ user: { connect: { id: user.id } } })),
                } : undefined,
                 */
            },
            include: {
                creator: {
                    select: this.userDetails
                },
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
            include: this.eventDetails
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
            include: this.eventDetails
        });

        // also add events where the user is in the inUser relation
        const userEvents = await this.prisma.usersOnEvents.findMany({
            where: {
                userId,
            },
            include: {
                event: {
                    include: {
                        creator: {
                            select: this.userDetails
                        },
                        inUser: {
                            select: {
                                user: {
                                    select: this.userDetails,
                                },
                            },
                        },
                    },
                },
            },
        });

        const userEventsData = userEvents.map(userEvent => userEvent.event);
        const allEvents = [...events, ...userEventsData];

        return allEvents.map(event => ({
            ...event,
            inUser: event.inUser.map(userEvent => userEvent.user),
        }));
    }

    public async getUsersForEvent(eventId: number): Promise<PartialUser[]> {
        const users = await this.prisma.usersOnEvents.findMany({
            where: {
                eventId,
            },
            include: {
                user: {
                    select: this.userDetails
                },
            },
        });

        return users.map(userEvent => ({
            id: userEvent.user.id,
            name: userEvent.user.name,
            email: userEvent.user.email,
            createdAt: userEvent.user.createdAt,
        }));
    }

    public async checkUserCreatedEvent(eventId: number, userId: number): Promise<boolean> {
        const event = await this.prisma.event.findUnique({ where: { id: eventId } });
        if (!event) {
            throw new Error('Event not found');
        }
        return event.creatorId === userId;
    }

    public async getEventCreator(eventId: number): Promise<PartialUser> {
        const event = await this.prisma.event.findUnique({ where: { id: eventId } });
        if (!event) {
            throw new Error('Event not found');
        }

        const creator = await this.prisma.user.findUnique({ where: { id: event.creatorId } });
        if (!creator) {
            throw new Error('Event creator not found');
        }

        return {
            id: creator.id,
            name: creator.name,
            email: creator.email,
            createdAt: creator.createdAt,
        };
    }

    public async getUserEvents(userId: number): Promise<PartialEvent[]> {
        const events = await this.prisma.event.findMany({
            where: {
                OR: [
                    {
                        creatorId: userId,
                    },
                    {
                        inUser: {
                            some: {
                                userId,
                            },
                        },
                    },
                ],
            },
            include: {
                creator: {
                    select: this.userDetails
                },
                inUser: {
                    include: {
                        user: {
                            select: this.userDetails
                        },
                    },
                },
            },
        });
        return events.map(event => ({
            ...event,
            inUser: event.inUser.map(userEvent => userEvent.user),
        }));
    }

    private userDetails = {
            id: true,
            name: true,
            email: true,
            createdAt: true,
    }

    private eventDetails = {
        creator: {
            select: this.userDetails
        },
        inUser: {
            include: {
                user: {
                    select: this.userDetails
                }
            }
        }
    }
}