import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';

export const validate = (schema: AnyZodObject) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log('Request body:', req.body);
            const validatedBody = await schema.parseAsync(req.body);
            console.log('Validated body:', validatedBody);
            req.body = validatedBody;
            return next();
        } catch (error) {
            console.log('Validation error:', error);
            return res.status(400).json(error);
        }
    };