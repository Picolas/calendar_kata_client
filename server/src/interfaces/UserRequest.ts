import { Request } from 'express';

export interface UserRequest extends Request {
    user?: DecodedUser;
}

export interface DecodedUser {
    userId: number;
    iat: number;
    exp: number;
}