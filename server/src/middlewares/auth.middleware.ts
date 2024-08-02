import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import {DecodedUser, UserRequest} from "../interfaces/UserRequest";
dotenv.config();

export const authMiddleware = (req: UserRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const jwtSecret = process.env.JWT_SECRET!
    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded as DecodedUser;

        console.log(decoded)
        next();
    } catch (err) {
        console.error('Token verification error:', err);
        res.status(400).json({ message: 'Invalid token.' });
    }
};