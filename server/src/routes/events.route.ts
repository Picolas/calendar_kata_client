import { Router } from 'express';
import { EventsController } from '../controllers/events.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const eventsController = new EventsController();

router.get('/', authMiddleware, eventsController.getAllEvents);
router.get('/:id', authMiddleware, eventsController.getEventById);
router.post('/', authMiddleware, eventsController.createEvent);
router.put('/:id', authMiddleware, eventsController.updateEvent);
router.delete('/:id', authMiddleware, eventsController.deleteEvent);
router.get('/user/:userId/:day', authMiddleware, eventsController.getUserEventsOfDay);
router.get('/interval/:startDate/:endDate', authMiddleware, eventsController.getEventsOnInterval);

export default router;