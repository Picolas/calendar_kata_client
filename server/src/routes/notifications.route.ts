import {Router} from "express";
import {authMiddleware} from "../middlewares/auth.middleware";
import {NotificationsController} from "../controllers/notifications.controller";
import {Server as SocketIOServer} from "socket.io";
import {Container} from "inversify";
import {TYPES} from "../constants/types";

export const configureNotificationsRoutes = (router: Router, container: Container) => {
    const notificationsController = container.get<NotificationsController>(TYPES.NotificationsController);

    router.get('/', authMiddleware, notificationsController.getUserNotifications);
    router.get('/unread', authMiddleware, notificationsController.getUnreadNotifications);
    router.patch('/:id', authMiddleware, notificationsController.readNotification);

    return router;
};