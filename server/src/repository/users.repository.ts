import { injectable } from 'inversify';
import { PrismaClient, User } from '@prisma/client';
import { IUsersRepository } from '../interfaces/Repository/IUsersRepository';
import {UpdateUserDto} from "../dtos/UpdateUserDto";

@injectable()
export class UsersRepository implements IUsersRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    public async findAll(): Promise<User[]> {
        return this.prisma.user.findMany();
    }

    public async findById(id: number): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { id } });
    }

    public async findUsersByEmails(emails: string[]): Promise<User[]> {
        return this.prisma.user.findMany({
            where: {
                email: {
                    in: emails
                }
            }
        });
    }

    public async update(id: number, userData: UpdateUserDto): Promise<User> {
        return this.prisma.user.update({ where: { id }, data: userData });
    }

    public async delete(id: number): Promise<void> {
        await this.prisma.user.delete({ where: { id } });
    }

    public async search(query: string): Promise<User[]> {
        return this.prisma.user.findMany({
            where: {
                OR: [
                    { name: { contains: query, mode: 'insensitive' } },
                    { email: { contains: query, mode: 'insensitive' } }
                ]
            }
        });
    }
}