import { injectable } from "inversify";
import { IEventsRepository } from "../interfaces/Repository/IEventsRepository";
import { PrismaClient, Event, User } from "@prisma/client";
import { CreateEventDto } from "../dtos/CreateEventDto";
import { UpdateEventDto } from "../dtos/UpdateEventDto";

@injectable()
export class EventsRepository implements IEventsRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    public async findAll(): Promise<(Event & { inUser: User[] })[]> {
        const events = await this.prisma.event.findMany({
            include: { creator: true, inUser: { include: { user: true } } }
        });
        return events.map(event => ({
            ...event,
            inUser: event.inUser.map(userEvent => userEvent.user)
        }));
    }

    public async findById(id: number): Promise<Event & { inUser: User[] } | null> {
        const event = await this.prisma.event.findUnique({
            where: { id },
            include: { creator: true, inUser: { include: { user: true } } }
        });
        if (!event) return null;
        return {
            ...event,
            inUser: event.inUser.map(userEvent => userEvent.user)
        };
    }

    public async create(eventData: CreateEventDto): Promise<Event & { inUser: User[] }> {
        const { creatorId, inUser, ...restEventData } = eventData;
        const event = await this.prisma.event.create({
            data: {
                ...restEventData,
                creator: { connect: { id: creatorId } },
                inUser: {
                    create: inUser ? inUser.map(userId => ({ userId: Number(userId) })) : []
                }
            },
            include: { creator: true, inUser: { include: { user: true } } }
        });
        return {
            ...event,
            inUser: event.inUser.map(userEvent => userEvent.user)
        };
    }

    public async update(id: number, eventData: UpdateEventDto): Promise<Event & { inUser: User[] }> {
        const { inUser, ...restEventData } = eventData;
        let updateData: any = {
            ...restEventData
        };

        if (inUser) {
            updateData.inUser = {
                deleteMany: {},
                create: inUser.map(userId => ({ userId: Number(userId) }))
            };
        }

        const event = await this.prisma.event.update({
            where: { id },
            data: updateData,
            include: { creator: true, inUser: { include: { user: true } } }
        });
        return {
            ...event,
            inUser: event.inUser.map(userEvent => userEvent.user)
        };
    }

    public async delete(id: number): Promise<void> {
        await this.prisma.$transaction(async (prisma) => {
            // delete users on events
            await prisma.usersOnEvents.deleteMany({
                where: { eventId: id }
            });

            // delete event
            await prisma.event.delete({
                where: { id }
            });
        });
    }

    public async getUsersForEvent(eventId: number): Promise<User[]> {
        const event = await this.prisma.event.findUnique({
            where: { id: eventId },
            include: { inUser: { include: { user: true } } }
        });
        return event ? event.inUser.map(userEvent => userEvent.user) : [];
    }

    public async findByPeriod(userId: number, startDate: Date, endDate: Date): Promise<(Event & { inUser: User[] })[]> {
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
            include: {
                creator: true,
                inUser: {
                    include: {
                        user: true
                    }
                }
            }
        }).then(events => events.map(event => ({
            ...event,
            inUser: event.inUser.map(userEvent => userEvent.user)
        })));
    }

    public async getUserEventsOfDay(userId: number, date: string): Promise<(Event & { inUser: User[] })[]> {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        const events = await this.prisma.event.findMany({
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
            include: { creator: true, inUser: { include: { user: true } } }
        });
        return events.map(event => ({
            ...event,
            inUser: event.inUser.map(userEvent => userEvent.user)
        }));
    }

    public async getUserEvents(userId: number): Promise<(Event & { inUser: User[] })[]> {
        const events = await this.prisma.event.findMany({
            where: {
                OR: [
                    { creatorId: userId },
                    { inUser: { some: { userId: userId } } }
                ]
            },
            include: { creator: true, inUser: { include: { user: true } } }
        });
        return events.map(event => ({
            ...event,
            inUser: event.inUser.map(userEvent => userEvent.user)
        }));
    }
}