import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { configureContainer } from './utils/DependencyInjection';
import { errorHandler } from './middlewares/error.middleware';
import configureRoutes from './routes/configure.routes';
import { appConfig } from './config/app.config';
import { TYPES } from './constants/types';
import { SocketController } from './controllers/socket.controller';

const app = express();
const httpServer = createServer(app);

app.use(cors(appConfig.cors));
app.use(express.json());

const container = configureContainer(httpServer);

const socketController = container.get<SocketController>(TYPES.SocketController);
const io = socketController.getIO();

configureRoutes(app, container);

app.use(errorHandler);

httpServer.listen(appConfig.port, () => {
    console.log(`Server is running on http://localhost:${appConfig.port}`);
});