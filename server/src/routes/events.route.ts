import { Router } from 'express';
import { EventsController } from '../controllers/events.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { Server as SocketIOServer } from 'socket.io';

const eventsRoute = (io: SocketIOServer) => {
    const router = Router();
    const eventsController = new EventsController(io);

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

export default eventsRoute;