import {compare, hash} from 'bcryptjs';
import {sign, verify} from 'jsonwebtoken';
import dotenv from "dotenv";
import {inject, injectable} from "inversify";
import {TYPES} from "../constants/types";
import {IAuthService} from "../interfaces/Service/IAuthService";
import {LoginDto} from "../dtos/LoginDto";
import {UserDto} from "../dtos/UserDto";
import {IAuthRepository} from "../interfaces/Repository/IAuthRepository";
import {RegisterDto} from "../dtos/RegisterDto";
import {plainToInstance} from "class-transformer";
dotenv.config();

@injectable()
export class AuthService implements IAuthService {
    public jwtSecret = process.env.JWT_SECRET!;

    constructor(@inject(TYPES.AuthRepository) private authRepository: IAuthRepository) {}

    public async login(loginDto: LoginDto): Promise<{ user: UserDto; token: string }> {
        const user = await this.authRepository.findByEmail(loginDto.email);
        if (!user || !(await compare(loginDto.password, user.password))) {
            throw new Error('Invalid credentials');
        }

        const token = this.generateToken(user.id);
        const userDto = plainToInstance(UserDto, user, { excludeExtraneousValues: true });

        return { user: userDto, token };
    }

    public async register(registerDto: RegisterDto): Promise<UserDto> {
        const existingUser = await this.authRepository.findByEmail(registerDto.email);
        if (existingUser) {
            throw new Error('User already exists');
        }

        const hashedPassword = await hash(registerDto.password, 10);
        const newUser = await this.authRepository.create({
            ...registerDto,
            password: hashedPassword
        });

        return plainToInstance(UserDto, newUser, { excludeExtraneousValues: true });
    }

    public async logout(token: string): Promise<void> {
        await this.authRepository.invalidateToken(token);
    }

    public async refreshToken(token: string): Promise<string> {
        try {
            const decoded = verify(token, process.env.JWT_SECRET!) as { userId: number };
            const user = await this.authRepository.findById(decoded.userId);
            if (!user) {
                throw new Error('User not found');
            }
            return this.generateToken(user.id);
        } catch (error) {
            throw new Error('Invalid token');
        }
    }

    private generateToken(userId: number): string {
        return sign({ userId }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    }
}