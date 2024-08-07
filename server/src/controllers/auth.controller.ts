import {Request, Response} from 'express';
import {inject, injectable} from "inversify";
import {TYPES} from "../constants/types";
import {IAuthService} from "../interfaces/Service/IAuthService";
import {LoginDto} from "../dtos/LoginDto";
import {validate} from "class-validator";
import {RegisterDto} from "../dtos/RegisterDto";
import {IAuthController} from "../interfaces/Controller/IAuthController";

@injectable()
export class AuthController implements IAuthController {
    constructor(@inject(TYPES.AuthService) private authService: IAuthService) {
    }

    public login = async (req: Request, res: Response): Promise<void> => {
        try {
            const loginDto = new LoginDto();
            Object.assign(loginDto, req.body);

            const errors = await validate(loginDto);
            if (errors.length > 0) {
                res.status(400).json({ errors: errors.map(error => Object.values(error.constraints!)) });
                return;
            }

            const result = await this.authService.login(loginDto);
            res.status(200).json(result);
        } catch (error) {
            const err = error as Error;
            res.status(401).json({ message: err.message });
        }
    };

    public register = async (req: Request, res: Response): Promise<void> => {
        try {
            const registerDto = new RegisterDto();
            Object.assign(registerDto, req.body);

            const errors = await validate(registerDto);
            if (errors.length > 0) {
                res.status(400).json({ errors: errors.map(error => Object.values(error.constraints!)) });
                return;
            }

            const newUser = await this.authService.register(registerDto);
            res.status(201).json(newUser);
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ message: err.message });
        }
    };

    public logout = async (req: Request, res: Response): Promise<void> => {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                throw new Error('Token not found');
            }

            await this.authService.logout(token);
            res.clearCookie('Authorization').status(204).send();
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ message: err.message });
        }
    };

    public refreshToken = async (req: Request, res: Response): Promise<void> => {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                throw new Error('Token not found');
            }
            const newToken = this.authService.refreshToken(token);
            res.status(200).json({ token: newToken });
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ message: err.message });
        }
    };
}