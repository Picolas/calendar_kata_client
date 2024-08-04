import { Express } from 'express';
import { Server as SocketIOServer } from 'socket.io';
import authRoute from './auth.route';
import usersRoute from './users.route';
import eventsRoute from './events.route';
import daysRoute from './days.route';
import notificationsRoute from './notifications.route';

const configureRoutes = (app: Express, io: SocketIOServer) => {
    const api = '/api';

    app.use(`${api}/auth`, authRoute);
    app.use(`${api}/users`, usersRoute);
    app.use(`${api}/events`, eventsRoute(io));
    app.use(`${api}/days`, daysRoute);
    app.use(`${api}/notifications`, notificationsRoute(io));
};

export default configureRoutes;