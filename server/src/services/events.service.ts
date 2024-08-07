import { inject, injectable } from 'inversify';
import { IEventsService } from '../interfaces/Service/IEventsService';
import { IEventsRepository } from '../interfaces/Repository/IEventsRepository';
import { TYPES } from '../constants/types';
import { UserDto } from '../dtos/UserDto';
import { plainToInstance } from 'class-transformer';
import { EventDto } from "../dtos/EventDto";
import { CreateEventDto } from "../dtos/CreateEventDto";
import { UpdateEventDto } from "../dtos/UpdateEventDto";
import {INotificationsService} from "../interfaces/Service/INotificationsService";
import {IUsersRepository} from "../interfaces/Repository/IUsersRepository";

@injectable()
export class EventsService implements IEventsService {
    constructor(
        @inject(TYPES.EventsRepository) private eventsRepository: IEventsRepository,
        @inject(TYPES.NotificationsService) private notificationsService: INotificationsService,
        @inject(TYPES.UsersRepository) private usersRepository: IUsersRepository
    ) {}

    public async findAllEvents(): Promise<EventDto[]> {
        const events = await this.eventsRepository.findAll();
        return plainToInstance(EventDto, events, { excludeExtraneousValues: true });
    }

    public async findEventById(id: number): Promise<EventDto | null> {
        const event = await this.eventsRepository.findById(id);
        if (!event) {
            throw new Error('Event not found');
        }
        return plainToInstance(EventDto, event, { excludeExtraneousValues: true });
    }

    public async createEvent(eventData: CreateEventDto): Promise<EventDto> {
        eventData.startDate = new Date(eventData.startDate);
        eventData.endDate = new Date(eventData.endDate);

        if (eventData.inUser) {
            const users = await this.usersRepository.findUsersByEmails(eventData.inUser as string[]);
            eventData.inUser = users.filter(user => user.id !== eventData.creatorId).map(user => user.id);
        }

        const newEvent = await this.eventsRepository.create(eventData);
        const eventDto = plainToInstance(EventDto, newEvent, { excludeExtraneousValues: true });

        const users = await this.getUsersForEvent(newEvent.id);
        users.forEach(user => {
            this.notificationsService.createNotification(user.id!, `Vous avez été ajouté à l'événement ${newEvent.title}.`);
        });

        return eventDto;
    }

    public async updateEvent(id: number, eventData: UpdateEventDto, userId: number): Promise<EventDto> {
        const event = await this.eventsRepository.findById(id);
        if (!event) {
            throw new Error('Event not found');
        }
        if (event.creatorId !== userId) {
            throw new Error('You do not have permission to update this event');
        }

        if (eventData.startDate) {
            eventData.startDate = new Date(eventData.startDate);
        }
        if (eventData.endDate) {
            eventData.endDate = new Date(eventData.endDate);
        }

        if (eventData.inUser) {
            const users = await this.usersRepository.findUsersByEmails(eventData.inUser as string[]);
            eventData.inUser = users.filter(user => user.id !== event.creatorId).map(user => user.id);
        }

        const updatedEvent = await this.eventsRepository.update(id, eventData);
        const eventDto = plainToInstance(EventDto, updatedEvent, { excludeExtraneousValues: true });

        const users = await this.getUsersForEvent(id);
        users.forEach(user => {
            this.notificationsService.createNotification(user.id!, `L'événement ${updatedEvent.title} a été mis à jour.`);
        });

        return eventDto;
    }

    public async deleteEvent(id: number, userId: number): Promise<boolean> {
        const event = await this.eventsRepository.findById(id);
        if (!event) {
            throw new Error('Event not found');
        }
        if (event.creatorId !== userId) {
            throw new Error('You do not have permission to delete this event');
        }

        const users = await this.getUsersForEvent(id);
        await this.eventsRepository.delete(id);

        users.forEach(user => {
            this.notificationsService.createNotification(user.id!, `L'événement ${event.title} a été annulé.`);
        });

        return true;
    }

    public async getUsersForEvent(eventId: number): Promise<UserDto[]> {
        const users = await this.eventsRepository.getUsersForEvent(eventId);
        return plainToInstance(UserDto, users, { excludeExtraneousValues: true });
    }

    public async findEventsByPeriod(userId: number, startDate: Date, endDate: Date): Promise<EventDto[]> {
        const events = await this.eventsRepository.findByPeriod(userId, startDate, endDate);
        return plainToInstance(EventDto, events, { excludeExtraneousValues: true });
    }

    public async getUserEventsOfDay(userId: number, date: string): Promise<EventDto[]> {
        const events = await this.eventsRepository.getUserEventsOfDay(userId, date);
        return plainToInstance(EventDto, events, { excludeExtraneousValues: true });
    }

    public async getUserEvents(userId: number): Promise<EventDto[]> {
        const events = await this.eventsRepository.getUserEvents(userId);
        const sortedEvents = events.sort((a, b) => {
            const dateA = new Date(a.startDate!);
            const dateB = new Date(b.startDate!);
            return dateA.getTime() - dateB.getTime();
        });
        return plainToInstance(EventDto, sortedEvents, { excludeExtraneousValues: true });
    }
}