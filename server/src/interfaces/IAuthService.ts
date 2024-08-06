export interface IAuthService {
    login(email: string, password: string): Promise<{ token: string; user: any }>;
    register(name: string, email: string, password: string): Promise<any>;
    logout(token: string): Promise<void>;
    refreshToken(token: string): string;
}