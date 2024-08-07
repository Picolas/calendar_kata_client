import { Router } from 'express';
import { EventsController } from '../controllers/events.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import {Container} from "inversify";
import {TYPES} from "../constants/types";

export const configureEventsRoutes = (router: Router, container: Container) => {
    const eventsController = container.get<EventsController>(TYPES.EventsController);

    router.get('/', authMiddleware, eventsController.getAllEvents);
    router.post('/', authMiddleware, eventsController.createEvent);
    router.get('/events', authMiddleware, eventsController.getUserEvents);
    router.get('/:id', authMiddleware, eventsController.getEventById);
    router.put('/:id', authMiddleware, eventsController.updateEvent);
    router.delete('/:id', authMiddleware, eventsController.deleteEvent);
    router.get('/user/:userId/:day', authMiddleware, eventsController.getUserEventsOfDay);
    router.get('/interval/:startDate/:endDate', authMiddleware, eventsController.getEventsOnInterval);

    return router;
};