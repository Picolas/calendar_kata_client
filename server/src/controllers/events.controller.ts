import { Request, Response } from 'express';
import {EventsService} from "../services/events.service";
import {UserRequest} from "../interfaces/UserRequest";
import {NotificationsController} from "./notifications.controller";
import {Server} from "socket.io";
import {UsersService} from "../services/users.service";

export class EventsController {
    private eventsService = new EventsService();
    private usersService = new UsersService();
    private notificationsController: NotificationsController;

    constructor(io: Server) {
        this.notificationsController = NotificationsController.getInstance(io);
    }

    public getAllEvents = async (req: Request, res: Response): Promise<void> => {
        try {
            const events = await this.eventsService.findAllEvents();
            res.status(200).json(events);
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ message: err.message });
        }
    };

    public getEventById = async (req: Request, res: Response): Promise<void> => {
        try {
            const eventId = parseInt(req.params.id, 10);
            const event = await this.eventsService.findEventById(eventId);
            event ? res.status(200).json(event) : res.status(404).json({ message: 'Event not found' });
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ message: err.message });
        }
    };

    public createEvent = async (req: UserRequest, res: Response): Promise<void> => {
        try {
            const userId = req.user?.userId!;
            const eventData = req.body;

            const user = await this.usersService.findUserById(userId);
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            const addUsers = [];
            for (const email of eventData.inUser) {
                const tempUser = await this.usersService.findUserByEmail(email);
                if (tempUser) {
                    addUsers.push(tempUser);
                }
            }

            eventData.creator = user;
            eventData.inUser = addUsers;
            eventData.startDate = new Date(eventData.startDate);
            eventData.endDate = new Date(eventData.endDate);
            this.validateDates(eventData.startDate, eventData.endDate);

            console.log(eventData);

            const newEvent = await this.eventsService.createEvent(eventData);
            const users = await this.eventsService.getUsersForEvent(newEvent.id!);
            users.forEach(user => {
                this.notificationsController.createNotification(user.id!, `Vous avez été ajouté à l'évênement ${newEvent.title}.`)
            });
            res.status(201).json(newEvent);
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ message: err.message });
        }
    };

    public updateEvent = async (req: UserRequest, res: Response): Promise<void> => {
        try {
            const eventId = parseInt(req.params.id, 10);
            const userId = req.user!.userId!;
            const updatedData = req.body;

            const event = await this.findEventAndCheckUser(eventId, userId);

            updatedData.startDate = new Date(updatedData.startDate);
            updatedData.endDate = new Date(updatedData.endDate);
            this.validateDates(updatedData.startDate, updatedData.endDate);

            const updatedEvent = await this.eventsService.updateEvent(eventId, updatedData);
            const users = await this.eventsService.getUsersForEvent(eventId);
            users.forEach(user => {
                this.notificationsController.createNotification(user.id!, `L'événement ${updatedEvent.title} a été mis à jour.`)
            });

            const creator = await this.eventsService.getEventCreator(eventId);
            await this.notificationsController.createNotification(creator.id!, `Votre événement ${updatedEvent.title} a été mis à jour.`);
            res.status(200).json(updatedEvent);
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ message: err.message });
        }
    };

    public deleteEvent = async (req: UserRequest, res: Response): Promise<void> => {
        try {
            const eventId = parseInt(req.params.id, 10);
            const userId = req.user?.userId!;
            const event = await this.findEventAndCheckUser(eventId, userId);

            const users = await this.eventsService.getUsersForEvent(event.id!);
            const deletedEvent = await this.eventsService.deleteEvent(event.id!, userId);
            if (!deletedEvent) {
                res.status(404).json({ message: 'Event not found' });
                return;
            }

            users.forEach(user => {
                this.notificationsController.createNotification(user.id!, `L'évênement ${event.title} à été annulé.`)
            });
            res.status(204).send();
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ message: err.message });
        }
    };

    public getEventsOnInterval = async (req: UserRequest, res: Response): Promise<void> => {
        try {
            const userId = req.user?.userId;
            const startDate = new Date(req.params.startDate);
            const endDate = new Date(req.params.endDate);
            this.validateDates(startDate, endDate);

            const events = await this.eventsService.findEventsByPeriod(userId!, startDate, endDate);
            res.status(200).json(events);
        } catch (error) {
            const err = error as Error;
            res.status(500).json({message: err.message});
        }
    }

    public getUserEventsOfDay = async (req: Request, res: Response): Promise<void> => {
        try {
            const userId = parseInt(req.params.userId, 10);
            const date = req.params.date;
            const events = await this.eventsService.getUserEventsOfDay(userId, date);
            res.status(200).json(events);
        } catch (error) {
            const err = error as Error;
            res.status(500).json({message: err.message});
        }
    }

    public getUserEvents = async (req: UserRequest, res: Response): Promise<void> => {
        try {
            const userId = req.user?.userId!;
            const events = await this.eventsService.getUserEvents(userId);

            events.sort((a, b) => {
                const dateA = new Date(a.startDate!);
                const dateB = new Date(b.startDate!);
                if (dateA < dateB) return -1;
                if (dateA > dateB) return 1;
                return 0;
            });
            res.status(200).json(events);
        } catch (error) {
            const err = error as Error;
            res.status(500).json({message: err.message});
        }
    }

    private validateDates(startDate: Date, endDate: Date) {
        if (endDate < startDate) {
            throw new Error('End date must be after start date');
        }
    }

    private async findEventAndCheckUser(eventId: number, userId: number) {
        const event = await this.eventsService.findEventById(eventId);
        if (!event) throw new Error('Event not found');
        if (event.creator?.id !== userId) throw new Error('Forbidden');
        return event;
    }
}