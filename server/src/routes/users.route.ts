import { Router } from 'express';
import { UsersController } from '../controllers/users.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import {Container} from "inversify";
import {TYPES} from "../constants/types";

export const configureUsersRoutes = (router: Router, container: Container) => {
    const usersController = container.get<UsersController>(TYPES.UsersController);

    router.get('/search', usersController.searchUsers);
    router.get('/', authMiddleware, usersController.getAllUsers);
    router.get('/:id', authMiddleware, usersController.getUserById);
    router.put('/:id', authMiddleware, usersController.updateUser);
    router.delete('/:id', authMiddleware, usersController.deleteUser);


    return router;
};
