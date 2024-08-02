import { Router } from 'express';
import { UsersController } from '../controllers/users.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const usersController = new UsersController();

router.get('/', authMiddleware, usersController.getAllUsers);
router.get('/:id', authMiddleware, usersController.getUserById);
router.put('/:id', authMiddleware, usersController.updateUser);
router.delete('/:id', authMiddleware, usersController.deleteUser);

export default router;