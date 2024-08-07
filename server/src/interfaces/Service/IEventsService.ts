import {EventDto} from "../../dtos/EventDto";
import {CreateEventDto} from "../../dtos/CreateEventDto";
import {UpdateEventDto} from "../../dtos/UpdateEventDto";
import {UserDto} from "../../dtos/UserDto";

export interface IEventsService {
    findAllEvents(): Promise<EventDto[]>;
    findEventById(id: number): Promise<EventDto | null>;
    createEvent(eventData: CreateEventDto): Promise<EventDto>;
    updateEvent(id: number, eventData: UpdateEventDto, userId: number): Promise<EventDto>;
    deleteEvent(id: number, userId: number): Promise<boolean>;
    getUsersForEvent(eventId: number): Promise<UserDto[]>;
    findEventsByPeriod(userId: number, startDate: Date, endDate: Date): Promise<EventDto[]>;
    getUserEventsOfDay(userId: number, date: string): Promise<EventDto[]>;
    getUserEvents(userId: number): Promise<EventDto[]>;
}