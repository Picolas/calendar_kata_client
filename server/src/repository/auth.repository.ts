import { injectable } from "inversify";
import { IAuthRepository } from "../interfaces/Repository/IAuthRepository";
import { PrismaClient, User } from "@prisma/client";
import {RegisterDto} from "../dtos/RegisterDto";

@injectable()
export class AuthRepository implements IAuthRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    public async findByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { email } });
    }

    public async findById(id: number): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { id } });
    }

    public async create(userData: RegisterDto): Promise<User> {
        return this.prisma.user.create({ data: userData });
    }

    public async invalidateToken(token: string): Promise<void> {
        // invalider le token
        // ajout blacklist token dans la bdd
    }
}