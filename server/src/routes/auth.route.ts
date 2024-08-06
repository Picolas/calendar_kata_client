import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import {authMiddleware} from "../middlewares/auth.middleware";
import {Container} from "inversify";
import {TYPES} from "../constants/types";

export const configureAuthRoutes = (router: Router, container: Container) => {
    const authController = container.get<AuthController>(TYPES.AuthController);

    router.post('/login', authController.login);
    router.post('/register', authController.register);
    router.post('/logout', authMiddleware, authController.logout);
    router.post('/refresh-token', authController.refreshToken);

    return router;
};