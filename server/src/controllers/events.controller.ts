import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { IEventsService } from '../interfaces/IEventsService';
import { INotificationsService } from '../interfaces/INotificationsService';
import { TYPES } from '../constants/types';
import { UserRequest } from '../interfaces/UserRequest';
import {IUsersService} from "../interfaces/IUsersService";

@injectable()
export class EventsController {
    constructor(
        @inject(TYPES.EventsService) private eventsService: IEventsService,
        @inject(TYPES.NotificationsService) private notificationsService: INotificationsService,
        @inject(TYPES.UsersService) private usersService: IUsersService
    ) {}

    public getAllEvents = async (req: Request, res: Response): Promise<void> => {
        try {
            const events = await this.eventsService.findAllEvents();
            res.status(200).json(events);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    };

    public getEventById = async (req: Request, res: Response): Promise<void> => {
        try {
            const eventId = parseInt(req.params.id, 10);
            const event = await this.eventsService.findEventById(eventId);
            res.status(200).json(event);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    };

    public createEvent = async (req: UserRequest, res: Response): Promise<void> => {
        try {
            const userId = req.user?.userId!;
            const eventData = req.body;
            eventData.creator = { id: userId };

            const usersEmail = eventData.inUser;
            eventData.inUser = [];
            for (const user of usersEmail) {
                const tempUser = await this.usersService.getUserByEmail(user?.email!);
                if (tempUser) {
                    eventData.inUser.push(user);
                }
            }

            const newEvent = await this.eventsService.createEvent(eventData);
            const users = await this.eventsService.getUsersForEvent(newEvent.id!);

            users.forEach(user => {
                this.notificationsService.createNotification(user.id!, `Vous avez été ajouté à l'événement ${newEvent.title}.`);
            });

            res.status(201).json(newEvent);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    };

    public updateEvent = async (req: UserRequest, res: Response): Promise<void> => {
        try {
            const eventId = parseInt(req.params.id, 10);
            const userId = req.user!.userId!;
            const updatedData = req.body;

            const updatedEvent = await this.eventsService.updateEvent(eventId, updatedData);
            const users = await this.eventsService.getUsersForEvent(eventId);

            users.forEach(user => {
                this.notificationsService.createNotification(user.id!, `L'événement ${updatedEvent.title} a été mis à jour.`);
            });

            const creator = await this.eventsService.getEventCreator(eventId);
            await this.notificationsService.createNotification(creator.id!, `Votre événement ${updatedEvent.title} a été mis à jour.`);

            res.status(200).json(updatedEvent);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    };

    public deleteEvent = async (req: UserRequest, res: Response): Promise<void> => {
        try {
            const eventId = parseInt(req.params.id, 10);
            const userId = req.user?.userId!;

            const event = await this.eventsService.findEventById(eventId);
            const users = await this.eventsService.getUsersForEvent(eventId);

            const deletedEvent = await this.eventsService.deleteEvent(eventId, userId);
            if (!deletedEvent) {
                res.status(404).json({ message: 'Event not found or you do not have permission to delete it' });
                return;
            }

            users.forEach(user => {
                this.notificationsService.createNotification(user.id!, `L'événement ${event.title} a été annulé.`);
            });

            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    };

    public getEventsOnInterval = async (req: UserRequest, res: Response): Promise<void> => {
        try {
            const userId = req.user?.userId!;
            const startDate = new Date(req.params.startDate);
            const endDate = new Date(req.params.endDate);

            const events = await this.eventsService.findEventsByPeriod(userId, startDate, endDate);
            res.status(200).json(events);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

    public getUserEventsOfDay = async (req: Request, res: Response): Promise<void> => {
        try {
            const userId = parseInt(req.params.userId, 10);
            const date = req.params.date;
            const events = await this.eventsService.getUserEventsOfDay(userId, date);
            res.status(200).json(events);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

    public getUserEvents = async (req: UserRequest, res: Response): Promise<void> => {
        try {
            const userId = req.user?.userId!;
            const events = await this.eventsService.getUserEvents(userId);

            events.sort((a, b) => {
                const dateA = new Date(a.startDate!);
                const dateB = new Date(b.startDate!);
                return dateA.getTime() - dateB.getTime();
            });

            res.status(200).json(events);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }
}