import { Router } from 'express';
import {authMiddleware} from "../middlewares/auth.middleware";
import {DaysController} from "../controllers/days.controller";


const router = Router();
const daysController = new DaysController();

router.post('/', authMiddleware, daysController.getDays);

export default router;