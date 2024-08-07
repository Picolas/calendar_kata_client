import { Request, Response } from 'express';

export interface IUsersController {
    getAllUsers(req: Request, res: Response): Promise<void>;
    getUserById(req: Request, res: Response): Promise<void>;
    updateUser(req: Request, res: Response): Promise<void>;
    deleteUser(req: Request, res: Response): Promise<void>;
    searchUsers(req: Request, res: Response): Promise<void>;
}