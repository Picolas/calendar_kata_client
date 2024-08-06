import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { PartialUser, User } from '../interfaces/User';
import {inject, injectable} from "inversify";
import {TYPES} from "../constants/types";
import {IUsersService} from "../interfaces/IUsersService";

@injectable()
export class UsersService implements IUsersService {
    constructor(@inject(TYPES.PrismaClient) private prisma: PrismaClient) {}

    public async getAllUsers(): Promise<PartialUser[]> {
        const users = await this.prisma.user.findMany();
        return users.map(this.withoutPassword);
    }

    public async getUserByEmail(email: string): Promise<PartialUser | null> {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) {
            return null;
        }
        return this.withoutPassword(user);
    }

    public async getUserById(userId: number): Promise<PartialUser> {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new Error('User not found');
        }
        return this.withoutPassword(user);
    }

    public async updateUser(userId: number, data: PartialUser): Promise<PartialUser> {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new Error('User not found');
        }

        const hashedPassword = data.password ? await bcrypt.hash(data.password, 10) : undefined;
        const updatedUser = await this.prisma.user.update({
            where: { id: userId },
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword,
            },
        });

        return this.withoutPassword(updatedUser);
    }

    public async deleteUser(userId: number): Promise<PartialUser> {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new Error('User not found');
        }
        const deletedUser = await this.prisma.user.delete({ where: { id: userId } });

        return this.withoutPassword(deletedUser);
    }

    public async findUserByEmail(email: string): Promise<PartialUser | null> {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) {
            return null;
        }

        return this.withoutPassword(user);
    }

    public async searchUsers(query: string): Promise<PartialUser[]> {
        return this.prisma.user.findMany({
            where: {
                OR: [
                    { email: { contains: query, mode: 'insensitive' } },
                    { name: { contains: query, mode: 'insensitive' } }
                ]
            },
            select: {
                id: true,
                email: true,
                name: true
            }
        });
    }

    private withoutPassword({ password: _, ...rest }: User): PartialUser {
        return rest;
    }
}