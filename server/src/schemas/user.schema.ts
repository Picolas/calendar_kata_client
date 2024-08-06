import { z } from 'zod';

export const getUserByIdSchema = z.object({
    id: z.string().regex(/^\d+$/).transform(Number),
});

export const updateUserSchema = z.object({
    name: z.string().min(1).optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
});

export const deleteUserSchema = getUserByIdSchema;