import {Router} from "express";
import {authMiddleware} from "../middlewares/auth.middleware";
import {NotificationsController} from "../controllers/notifications.controller";
import {Server as SocketIOServer} from "socket.io";

const notificationsRoute = (io: SocketIOServer) => {
    const router = Router();
    const notificationsController = NotificationsController.getInstance(io);

    router.get('/', authMiddleware, notificationsController.getUserNotifications);
    router.get('/unread', authMiddleware, notificationsController.getUnreadNotifications);
    router.patch('/:id', authMiddleware, notificationsController.readNotification);

    return router;
};

export default notificationsRoute;
