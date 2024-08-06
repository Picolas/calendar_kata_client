import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PartialUser, User } from '../interfaces/User';
import dotenv from "dotenv";
import {DecodedUser} from "../interfaces/UserRequest";
import {inject, injectable} from "inversify";
import {TYPES} from "../constants/types";
import {IAuthService} from "../interfaces/IAuthService";
dotenv.config();

@injectable()
export class AuthService implements IAuthService {
    public jwtSecret = process.env.JWT_SECRET!;

    constructor(@inject(TYPES.PrismaClient) private prisma: PrismaClient) {}

    public async register(name: string, email: string, password: string): Promise<PartialUser> {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (user) {
            throw new Error('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await this.prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        return this.stripPassword(newUser);
    }

    public async login(email: string, password: string): Promise<{ token: string, cookie: string, user: PartialUser }> {
        const user = await this.prisma.user.findUnique({ where: { email } });

        const isPasswordValid = user && await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }

        const token = this.createToken(user);
        const cookie = this.createCookie(token);

        return { token, cookie, user: this.stripPassword(user) };
    }

    public async logout(token: string) {
        console.log('logout', token);
    }

    public createToken(user: User) {
        return jwt.sign({ userId: user.id }, this.jwtSecret, { expiresIn: '1h' });
    }

    public createCookie(token: string) {
        return `Authorization=${token}; HttpOnly; Path=/; Max-Age=3600`;
    }

    public verifyToken(token: string): DecodedUser {
        try {
            return jwt.verify(token, this.jwtSecret) as DecodedUser;
        } catch (error) {
            throw new Error('Invalid token');
        }
    }

    public refreshToken(token: string) {
        const decodedUser = this.verifyToken(token);
        return this.createToken({ id: decodedUser.userId } as User);
    }

    private stripPassword(user: PartialUser) {
        const { password: _, ...partialUser } = user;
        return partialUser;
    }
}