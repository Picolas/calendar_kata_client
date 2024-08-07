import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { IEventsService } from '../interfaces/Service/IEventsService';
import { TYPES } from '../constants/types';
import { UserRequest } from '../interfaces/UserRequest';
import {CreateEventDto} from "../dtos/CreateEventDto";
import {validate} from "class-validator";
import {UpdateEventDto} from "../dtos/UpdateEventDto";
import {IEventsController} from "../interfaces/Controller/IEventsController";

@injectable()
export class EventsController implements IEventsController {
    constructor(
        @inject(TYPES.EventsService) private eventsService: IEventsService
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
            const createEventDto = new CreateEventDto();
            Object.assign(createEventDto, req.body);
            createEventDto.creatorId = req.user?.userId!;

            const errors = await validate(createEventDto);
            if (errors.length > 0) {
                res.status(400).json({ errors: errors.map(error => Object.values(error.constraints!)) });
                return;
            }

            const newEvent = await this.eventsService.createEvent(createEventDto);
            res.status(201).json(newEvent);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    };

    public updateEvent = async (req: UserRequest, res: Response): Promise<void> => {
        try {
            const eventId = parseInt(req.params.id, 10);
            const userId = req.user!.userId!;

            const updateEventDto = new UpdateEventDto();
            Object.assign(updateEventDto, req.body);

            const errors = await validate(updateEventDto);
            if (errors.length > 0) {
                res.status(400).json({ errors: errors.map(error => Object.values(error.constraints!)) });
                return;
            }

            const updatedEvent = await this.eventsService.updateEvent(eventId, updateEventDto, userId);
            res.status(200).json(updatedEvent);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    };

    public deleteEvent = async (req: UserRequest, res: Response): Promise<void> => {
        try {
            const eventId = parseInt(req.params.id, 10);
            const userId = req.user?.userId!;

            await this.eventsService.deleteEvent(eventId, userId);
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
            res.status(200).json(events);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }
}