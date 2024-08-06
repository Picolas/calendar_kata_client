import { Router } from 'express';
import { EventsController } from '../controllers/events.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import {Container} from "inversify";
import {TYPES} from "../constants/types";
import {validate} from "../middlewares/validation.middleware";
import {
    createEventSchema,
    deleteEventSchema,
    getEventByIdSchema, getEventsOnIntervalSchema,
    getUserEventsOfDaySchema,
    updateEventSchema
} from "../schemas/event.schema";

export const configureEventsRoutes = (router: Router, container: Container) => {
    const eventsController = container.get<EventsController>(TYPES.EventsController);

    // TODO: Add validation : validate(getEventByIdSchema) after authMiddleware etc

    router.get('/', authMiddleware, eventsController.getAllEvents);
    router.get('/events', authMiddleware, eventsController.getUserEvents);
    router.get('/:id', authMiddleware, eventsController.getEventById);
    router.post('/', authMiddleware, eventsController.createEvent);
    router.put('/:id', authMiddleware, eventsController.updateEvent);
    router.delete('/:id', authMiddleware, eventsController.deleteEvent);
    router.get('/user/:userId/:day', authMiddleware, eventsController.getUserEventsOfDay);
    router.get('/interval/:startDate/:endDate', authMiddleware, eventsController.getEventsOnInterval);

    return router;
};