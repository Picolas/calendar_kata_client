import { z } from 'zod';

export const readNotificationSchema = z.object({
    id: z.string().regex(/^\d+$/).transform(Number),
});