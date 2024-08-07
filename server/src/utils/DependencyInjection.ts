import { Container } from 'inversify';
import { EventsService } from '../services/events.service';
import { NotificationsService } from '../services/notifications.service';
import { AuthService } from '../services/auth.service';
import { EventsController } from '../controllers/events.controller';
import { NotificationsController } from '../controllers/notifications.controller';
import { AuthController } from '../controllers/auth.controller';
import { DaysController } from '../controllers/days.controller';
import { IEventsService } from '../interfaces/Service/IEventsService';
import { INotificationsService } from '../interfaces/Service/INotificationsService';
import { IAuthService } from '../interfaces/Service/IAuthService';
import { TYPES } from '../constants/types';
import * as http from 'http';
import { appConfig } from '../config/app.config';
import {IUsersService} from "../interfaces/Service/IUsersService";
import {UsersService} from "../services/users.service";
import {UsersController} from "../controllers/users.controller";
import {PrismaClient} from "@prisma/client";
import {IUsersRepository} from "../interfaces/Repository/IUsersRepository";
import {IEventsRepository} from "../interfaces/Repository/IEventsRepository";
import {EventsRepository} from "../repository/events.repository";
import {INotificationsRepository} from "../interfaces/Repository/INotificationsRepository";
import {NotificationsRepository} from "../repository/notifications.repository";
import {IDaysService} from "../interfaces/Service/IDaysService";
import {DaysService} from "../services/days.service";
import {IAuthRepository} from "../interfaces/Repository/IAuthRepository";
import {AuthRepository} from "../repository/auth.repository";
import {IEventsController} from "../interfaces/Controller/IEventsController";
import {IAuthController} from "../interfaces/Controller/IAuthController";
import {IDaysController} from "../interfaces/Controller/IDaysController";
import {IUsersController} from "../interfaces/Controller/IUsersController";
import {UsersRepository} from "../repository/users.repository";
import {ISocketService} from "../interfaces/Service/ISocketService";
import {SocketService} from "../services/socket.service";
import {INotificationsController} from "../interfaces/Controller/INotificationsController";

export const configureContainer = (httpServer: http.Server) => {
    const container = new Container();

    // Services
    container.bind<IEventsService>(TYPES.EventsService).to(EventsService);
    container.bind<INotificationsService>(TYPES.NotificationsService).to(NotificationsService);
    container.bind<IAuthService>(TYPES.AuthService).to(AuthService);
    container.bind<IUsersService>(TYPES.UsersService).to(UsersService);
    container.bind<IDaysService>(TYPES.DaysService).to(DaysService);

    // Controllers
    container.bind<IEventsController>(TYPES.EventsController).to(EventsController);
    container.bind<INotificationsController>(TYPES.NotificationsController).to(NotificationsController).inSingletonScope();
    container.bind<IAuthController>(TYPES.AuthController).to(AuthController);
    container.bind<IDaysController>(TYPES.DaysController).to(DaysController);
    container.bind<IUsersController>(TYPES.UsersController).to(UsersController);

    // Repositories
    container.bind<IUsersRepository>(TYPES.UsersRepository).to(UsersRepository);
    container.bind<IEventsRepository>(TYPES.EventsRepository).to(EventsRepository);
    container.bind<INotificationsRepository>(TYPES.NotificationsRepository).to(NotificationsRepository);
    container.bind<IAuthRepository>(TYPES.AuthRepository).to(AuthRepository);

    // Socket.IO
    container.bind<http.Server>(TYPES.HttpServer).toConstantValue(httpServer);
    container.bind<string[]>(TYPES.CorsOrigins).toConstantValue(Array.isArray(appConfig.cors.origin) ? appConfig.cors.origin : [appConfig.cors.origin]);
    container.bind<ISocketService>(TYPES.SocketService).to(SocketService).inSingletonScope();

    // Prisma
    container.bind<PrismaClient>(TYPES.PrismaClient).toConstantValue(new PrismaClient());

    return container;
};