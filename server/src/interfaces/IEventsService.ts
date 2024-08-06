import { Event, PartialEvent } from './Event';
import { User } from './User';

export interface IEventsService {
    findAllEvents(): Promise<PartialEvent[]>;
    findEventById(eventId: number): Promise<PartialEvent>;
    createEvent(eventData: Omit<Event, 'id' | 'createdAt'>): Promise<PartialEvent>;
    updateEvent(eventId: number, updatedData: Partial<Event>): Promise<PartialEvent>;
    deleteEvent(eventId: number, userId: number): Promise<boolean>;
    findEventsByPeriod(userId: number, startDate: Date, endDate: Date): Promise<PartialEvent[]>;
    getUserEventsOfDay(userId: number, date: string): Promise<PartialEvent[]>;
    getUserEvents(userId: number): Promise<PartialEvent[]>;
    getUsersForEvent(eventId: number): Promise<User[]>;
    getEventCreator(eventId: number): Promise<User>;
}