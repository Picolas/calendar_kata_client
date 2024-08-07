import {UserDto} from "../../dtos/UserDto";
import {UpdateUserDto} from "../../dtos/UpdateUserDto";

export interface IUsersService {
    getAllUsers(): Promise<UserDto[]>;
    getUserById(id: number): Promise<UserDto>;
    updateUser(id: number, userData: UpdateUserDto): Promise<UserDto>;
    deleteUser(id: number): Promise<void>;
    searchUsers(query: string): Promise<UserDto[]>;
}