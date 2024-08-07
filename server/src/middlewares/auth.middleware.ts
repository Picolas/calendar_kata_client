import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import { DecodedUser, UserRequest } from "../interfaces/UserRequest";
dotenv.config();

const errorMessage = 'Access denied. No token provided.';

export const authMiddleware = (req: UserRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: errorMessage });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: errorMessage });
    }

    const jwtSecret = process.env.JWT_SECRET!
    try {
        const decoded = jwt.verify(token, jwtSecret) as DecodedUser & { exp: number };

        // check if token has expired
        const currentTimestamp = Math.floor(Date.now() / 1000);
        if (decoded.exp && decoded.exp < currentTimestamp) {
            return res.status(401).json({ message: 'Token has expired.' });
        }

        req.user = decoded;
        next();
    } catch (err) {
        console.error('Token verification error:', err);
        res.status(400).json({ message: 'Invalid token.' });
    }
};