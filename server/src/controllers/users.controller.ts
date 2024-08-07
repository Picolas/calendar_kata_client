import { Request, Response } from 'express';
import {inject, injectable} from "inversify";
import {TYPES} from "../constants/types";
import {IUsersController} from "../interfaces/Controller/IUsersController";
import {IUsersService} from "../interfaces/Service/IUsersService";
import {UpdateUserDto} from "../dtos/UpdateUserDto";
import {validate} from "class-validator";

@injectable()
export class UsersController implements IUsersController {
    constructor(@inject(TYPES.UsersService) private usersService: IUsersService) {}

    public getAllUsers = async (req: Request, res: Response): Promise<void> => {
        try {
            const users = await this.usersService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    };

    public getUserById = async (req: Request, res: Response): Promise<void> => {
        try {
            const userId = parseInt(req.params.id, 10);
            const user = await this.usersService.getUserById(userId);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    };

    public updateUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const userId = parseInt(req.params.id, 10);
            const updateUserDto = new UpdateUserDto();
            Object.assign(updateUserDto, req.body);

            const errors = await validate(updateUserDto);
            if (errors.length > 0) {
                res.status(400).json({ errors: errors.map(error => Object.values(error.constraints!)) });
                return;
            }

            const updatedUser = await this.usersService.updateUser(userId, updateUserDto);
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    };

    public deleteUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const userId = parseInt(req.params.id, 10);
            await this.usersService.deleteUser(userId);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    };

    public searchUsers = async (req: Request, res: Response): Promise<void> => {
        try {
            const query = req.query.q as string;
            const users = await this.usersService.searchUsers(query);
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    };
}