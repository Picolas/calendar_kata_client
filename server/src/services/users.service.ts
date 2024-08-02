import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { PartialUser, User } from '../interfaces/User';

export class UsersService {
    public prisma = new PrismaClient();

    public async findAllUsers(): Promise<PartialUser[]> {
        return this.prisma.user.findMany().then(users => users.map(user => {
            const { password: _, ...partialUser } = user;
            return partialUser;
        }));
    }

    public async findUserById(userId: number): Promise<PartialUser> {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new Error('User not found');
        }

        const { password: _, ...partialUser } = user;
        return partialUser;
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

        const { password: _, ...partialUser } = updatedUser;
        return partialUser;
    }

    public async deleteUser(userId: number): Promise<PartialUser> {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new Error('User not found');
        }
        const deletedUser = await this.prisma.user.delete({ where: { id: userId } });

        const { password: _, ...partialUser } = deletedUser;
        return partialUser;
    }
}