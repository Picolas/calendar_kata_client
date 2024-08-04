import { Request, Response } from 'express';
import { UsersService } from '../services/users.service';

export class UsersController {
    private usersService = new UsersService();

    public getAllUsers = async (req: Request, res: Response): Promise<void> => {
        try {
            const users = await this.usersService.findAllUsers();
            res.status(200).json(users);
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ message: err.message });
        }
    };

    public getUserById = async (req: Request, res: Response): Promise<void> => {
        try {
            const userId = parseInt(req.params.id, 10);
            if (!userId) {
                res.status(400).json({ message: 'User ID is required' });
                return;
            }

            const user = await this.usersService.findUserById(userId);
            user ? res.status(200).json(user) : res.status(404).json({ message: 'User not found' });
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ message: err.message });
        }
    };

    public updateUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const userId = parseInt(req.params.id, 10);
            if (!userId) {
                res.status(400).json({ message: 'User ID is required' });
                return;
            }

            const updatedData = req.body;
            const updatedUser = await this.usersService.updateUser(userId, updatedData);
            res.status(200).json(updatedUser);
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ message: err.message });
        }
    };

    public deleteUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const userId = parseInt(req.params.id, 10);
            if (!userId) {
                res.status(400).json({ message: 'User ID is required' });
                return;
            }

            await this.usersService.deleteUser(userId);
            res.status(204).send();
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ message: err.message });
        }
    };
}