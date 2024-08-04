import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { PartialUser, User } from '../interfaces/User';

export class UsersService {
    public prisma = new PrismaClient();

    public async findAllUsers(): Promise<PartialUser[]> {
        const users = await this.prisma.user.findMany();
        return users.map(this.withoutPassword);
    }

    public async findUserById(userId: number): Promise<PartialUser> {
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

    private withoutPassword({ password: _, ...rest }: User): PartialUser {
        return rest;
    }
}