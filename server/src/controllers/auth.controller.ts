import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController {
    private authService = new AuthService();

    public login = async (req: Request, res: Response): Promise<void> => {
        try {
            const { email, password } = req.body;
            const token = await this.authService.login(email, password);
            res.status(200).json({ token });
        } catch (error) {
            const err = error as Error;
            res.status(401).json({ message: err.message });
        }
    };

    public register = async (req: Request, res: Response): Promise<void> => {
        try {
            const { name, email, password } = req.body;

            const newUser = await this.authService.register(name, email, password);
            res.status(201).json(newUser);
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ message: err.message });
        }
    };

    public logout = async (req: Request, res: Response): Promise<void> => {
        try {
            const token = req.headers.authorization;
            if (!token) {
                throw new Error('Token not found');
            }

            await this.authService.logout(token);

            res.clearCookie('Authorization');
            res.status(204).send();
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ message: err.message });
        }
    };

    public refreshToken = async (req: Request, res: Response): Promise<void> => {
        try {
            const authorization = req.headers.authorization;
            if (!authorization) {
                throw new Error('Authorization not found');
            }

            const token = authorization.split(' ')[1];
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