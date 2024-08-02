import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PartialUser, User } from '../interfaces/User';
import dotenv from "dotenv";
import {DecodedUser} from "../interfaces/UserRequest";
dotenv.config();

export class AuthService {
    public prisma = new PrismaClient();
    public jwtSecret = process.env.JWT_SECRET!;

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

        const { password: _, ...partialUser } = newUser;
        return partialUser;
    }

    public async login(email: string, password: string): Promise<{ token: string, cookie: string, user: PartialUser }> {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('Invalid email or password');
        }
        const token = this.createToken(user);
        const cookie = this.createCookie(token);

        const { password: _, ...partialUser } = user;
        return { token, cookie, user: partialUser };
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

    public verifyToken(token: string) {
        try {
            return jwt.verify(token, this.jwtSecret);
        } catch (error) {
            throw new Error('Invalid token');
        }
    }

    public refreshToken(token: string) {
        const decoded = this.verifyToken(token) as DecodedUser;
        return this.createToken({ id: decoded.userId } as User);
    }
}