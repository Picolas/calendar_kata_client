import { inject, injectable } from 'inversify';
import { TYPES } from '../constants/types';
import { IUsersService } from '../interfaces/Service/IUsersService';
import { IUsersRepository } from '../interfaces/Repository/IUsersRepository';
import { plainToInstance } from 'class-transformer';
import {UserDto} from "../dtos/UserDto";
import {UpdateUserDto} from "../dtos/UpdateUserDto";

@injectable()
export class UsersService implements IUsersService {
    constructor(@inject(TYPES.UsersRepository) private usersRepository: IUsersRepository) {}

    public async getAllUsers(): Promise<UserDto[]> {
        const users = await this.usersRepository.findAll();
        return plainToInstance(UserDto, users, { excludeExtraneousValues: true });
    }

    public async getUserById(id: number): Promise<UserDto> {
        const user = await this.usersRepository.findById(id);
        if (!user) {
            throw new Error('User not found');
        }
        return plainToInstance(UserDto, user, { excludeExtraneousValues: true });
    }

    public async updateUser(id: number, userData: UpdateUserDto): Promise<UserDto> {
        const existingUser = await this.usersRepository.findById(id);
        if (!existingUser) {
            throw new Error('User not found');
        }
        const updatedUser = await this.usersRepository.update(id, userData);
        return plainToInstance(UserDto, updatedUser, { excludeExtraneousValues: true });
    }

    public async deleteUser(id: number): Promise<void> {
        const existingUser = await this.usersRepository.findById(id);
        if (!existingUser) {
            throw new Error('User not found');
        }
        await this.usersRepository.delete(id);
    }

    public async searchUsers(query: string): Promise<UserDto[]> {
        const users = await this.usersRepository.search(query);
        return plainToInstance(UserDto, users, { excludeExtraneousValues: true });
    }
}