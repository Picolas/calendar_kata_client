import express, {Router} from 'express';
import {Container} from "inversify";
import {configureEventsRoutes} from "./events.route";
import {configureDaysRoutes} from "./days.route";
import {configureAuthRoutes} from "./auth.route";
import {configureUsersRoutes} from "./users.route";
import {configureNotificationsRoutes} from "./notifications.route";

const configureRoutes = (app: express.Application, container: Container) => {
    const apiRouter = Router();
    app.use('/api', apiRouter);

    const authRouter = Router();
    const usersRouter = Router();
    const eventsRouter = Router();
    const daysRouter = Router();
    const notificationsRouter = Router();

    configureAuthRoutes(authRouter, container);
    configureUsersRoutes(usersRouter, container);
    configureEventsRoutes(eventsRouter, container);
    configureDaysRoutes(daysRouter, container);
    configureNotificationsRoutes(notificationsRouter, container);

    apiRouter.use('/auth', authRouter);
    apiRouter.use('/users', usersRouter);
    apiRouter.use('/events', eventsRouter);
    apiRouter.use('/days', daysRouter);
    apiRouter.use('/notifications', notificationsRouter);
};

export default configureRoutes;