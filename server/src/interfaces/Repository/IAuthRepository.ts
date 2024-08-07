import { User } from "@prisma/client";
import {RegisterDto} from "../../dtos/RegisterDto";

export interface IAuthRepository {
    findByEmail(email: string): Promise<User | null>;
    findById(id: number): Promise<User | null>;
    create(userData: RegisterDto): Promise<User>;
    invalidateToken(token: string): Promise<void>;
}