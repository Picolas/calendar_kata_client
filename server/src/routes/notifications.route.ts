import {Router} from "express";
import {authMiddleware} from "../middlewares/auth.middleware";
import {NotificationsController} from "../controllers/notifications.controller";

const router = Router();
const notificationsController = new NotificationsController();

router.get('/', authMiddleware, notificationsController.getUserNotifications);
router.get('/unread', authMiddleware, notificationsController.getUnreadNotifications);

export default router;