import { Request, Response } from 'express';
import {EventsService} from "../services/events.service";
import {UserRequest} from "../interfaces/UserRequest";

export class EventsController {
    private eventsService = new EventsService();

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
            if (event) {
                res.status(200).json(event);
            } else {
                res.status(404).json({ message: 'Event not found' });
            }
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ message: err.message });
        }
    };

    public createEvent = async (req: Request, res: Response): Promise<void> => {
        try {
            const eventData = req.body;
            const newEvent = await this.eventsService.createEvent(eventData);
            res.status(201).json(newEvent);
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ message: err.message });
        }
    };

    public updateEvent = async (req: Request, res: Response): Promise<void> => {
        try {
            const eventId = parseInt(req.params.id, 10);
            const updatedData = req.body;
            const updatedEvent = await this.eventsService.updateEvent(eventId, updatedData);

            //const notificationsController = new NotificationsController();

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

            await this.eventsService.deleteEvent(eventId, userId);
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
}