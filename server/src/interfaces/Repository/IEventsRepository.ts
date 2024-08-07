import { Event, User } from "@prisma/client";
import {CreateEventDto} from "../../dtos/CreateEventDto";
import {UpdateEventDto} from "../../dtos/UpdateEventDto";

export interface IEventsRepository {
    findAll(): Promise<(Event & { inUser: User[] })[]>;
    findById(id: number): Promise<Event & { inUser: User[] } | null>;
    create(eventData: CreateEventDto): Promise<Event & { inUser: User[] }>;
    update(id: number, eventData: UpdateEventDto): Promise<Event & { inUser: User[] }>;
    delete(id: number): Promise<void>;
    getUsersForEvent(eventId: number): Promise<User[]>;
    findByPeriod(userId: number, startDate: Date, endDate: Date): Promise<(Event & { inUser: User[] })[]>;
    getUserEventsOfDay(userId: number, date: string): Promise<(Event & { inUser: User[] })[]>;
    getUserEvents(userId: number): Promise<(Event & { inUser: User[] })[]>;
}