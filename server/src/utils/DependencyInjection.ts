import { Container } from 'inversify';
import { EventsService } from '../services/events.service';
import { NotificationsService } from '../services/notifications.service';
import { AuthService } from '../services/auth.service';
import { EventsController } from '../controllers/events.controller';
import { NotificationsController } from '../controllers/notifications.controller';
import { AuthController } from '../controllers/auth.controller';
import { DaysController } from '../controllers/days.controller';
import { IEventsService } from '../interfaces/IEventsService';
import { INotificationsService } from '../interfaces/INotificationsService';
import { IAuthService } from '../interfaces/IAuthService';
import { TYPES } from '../constants/types';
import * as http from 'http';
import { SocketController } from '../controllers/socket.controller';
import { appConfig } from '../config/app.config';
import {IUsersService} from "../interfaces/IUsersService";
import {UsersService} from "../services/users.service";
import {UsersController} from "../controllers/users.controller";
import {PrismaClient} from "@prisma/client";
import {Server} from "socket.io";

export const configureContainer = (httpServer: http.Server) => {
    const container = new Container();

    // Services
    container.bind<IEventsService>(TYPES.EventsService).to(EventsService);
    container.bind<INotificationsService>(TYPES.NotificationsService).to(NotificationsService);
    container.bind<IAuthService>(TYPES.AuthService).to(AuthService);
    container.bind<IUsersService>(TYPES.UsersService).to(UsersService);

    // Controllers
    container.bind<EventsController>(TYPES.EventsController).to(EventsController);
    container.bind<NotificationsController>(TYPES.NotificationsController).to(NotificationsController).inSingletonScope();
    container.bind<AuthController>(TYPES.AuthController).to(AuthController);
    container.bind<DaysController>(TYPES.DaysController).to(DaysController);
    container.bind<UsersController>(TYPES.UsersController).to(UsersController);

    // Socket.IO
    container.bind<http.Server>(TYPES.HttpServer).toConstantValue(httpServer);
    container.bind<string[]>(TYPES.CorsOrigins).toConstantValue(Array.isArray(appConfig.cors.origin) ? appConfig.cors.origin : [appConfig.cors.origin]);
    container.bind<SocketController>(TYPES.SocketController).to(SocketController).inSingletonScope();
    container.bind<Server>(TYPES.SocketIO).toDynamicValue(() => {
        const socketController = container.get<SocketController>(TYPES.SocketController);
        return socketController.getIO();
    });

    // Prisma
    container.bind<PrismaClient>(TYPES.PrismaClient).toConstantValue(new PrismaClient());

    return container;
};