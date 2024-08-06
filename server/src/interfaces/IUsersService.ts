import {PartialUser, User} from './User';

export interface IUsersService {
    getAllUsers(): Promise<PartialUser[]>;
    getUserById(userId: number): Promise<PartialUser>;
    updateUser(userId: number, data: PartialUser): Promise<PartialUser>;
    deleteUser(userId: number): Promise<PartialUser>;
    getUserByEmail(email: string): Promise<PartialUser | null>;
}