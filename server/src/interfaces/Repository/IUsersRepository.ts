import { User } from '@prisma/client';
import {UpdateUserDto} from "../../dtos/UpdateUserDto";

export interface IUsersRepository {
    findAll(): Promise<User[]>;
    findById(id: number): Promise<User | null>;
    findUsersByEmails(emails: string[]): Promise<User[]>;
    update(id: number, userData: UpdateUserDto): Promise<User>;
    delete(id: number): Promise<void>;
    search(query: string): Promise<User[]>;
}