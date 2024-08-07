import {LoginDto} from "../../dtos/LoginDto";
import {UserDto} from "../../dtos/UserDto";
import {RegisterDto} from "../../dtos/RegisterDto";

export interface IAuthService {
    login(loginDto: LoginDto): Promise<{ user: UserDto; token: string }>;
    register(registerDto: RegisterDto): Promise<UserDto>;
    logout(token: string): Promise<void>;
    refreshToken(token: string): Promise<string>;
}