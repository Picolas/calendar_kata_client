import { Request, Response } from 'express';
import { UsersService } from '../services/users.service';
import {inject, injectable} from "inversify";
import {TYPES} from "../constants/types";

@injectable()
export class UsersController {

    constructor(@inject(TYPES.UsersService) private usersService: UsersService) {
    }

    public getAllUsers = async (req: Request, res: Response): Promise<void> => {
        try {
            const users = await this.usersService.getAllUsers();
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

            const user = await this.usersService.getUserById(userId);
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

    public searchUsers = async (req: Request, res: Response): Promise<void> => {
        try {
            const query = req.query.q as string;
            if (!query) {
                res.status(400).json({ message: 'Query parameter is required' });
                return;
            }
            const users = await this.usersService.searchUsers(query);
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    };
}