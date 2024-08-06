import { Router } from 'express';
import {authMiddleware} from "../middlewares/auth.middleware";
import {DaysController} from "../controllers/days.controller";
import {Container} from "inversify";
import {TYPES} from "../constants/types";

export const configureDaysRoutes = (router: Router, container: Container) => {
    const daysController = container.get<DaysController>(TYPES.DaysController);

    router.post('/', authMiddleware, daysController.getDays);

    return router;
};