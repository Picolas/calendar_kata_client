import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { configureContainer } from './utils/DependencyInjection';
import { errorHandler } from './middlewares/error.middleware';
import configureRoutes from './routes/configure.routes';
import { appConfig } from './config/app.config';

const app = express();
const httpServer = createServer(app);

app.use(cors(appConfig.cors));
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', appConfig.cors.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

const container = configureContainer(httpServer);

configureRoutes(app, container);

app.use(errorHandler);

httpServer.listen(appConfig.port, () => {
    console.log(`Server is running on http://localhost:${appConfig.port}`);
});