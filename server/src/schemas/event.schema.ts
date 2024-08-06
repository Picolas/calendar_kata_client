import { z } from 'zod';

export const createEventSchema = z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    startDate: z.string(),
    endDate: z.string(),
    inUser: z.array(z.string()).optional()
});

export const updateEventSchema = createEventSchema.partial().omit({ inUser: true });

export const getEventByIdSchema = z.object({
    id: z.string().regex(/^\d+$/).transform(Number),
});

export const deleteEventSchema = getEventByIdSchema;

export const getEventsOnIntervalSchema = z.object({
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
});

export const getUserEventsOfDaySchema = z.object({
    userId: z.string().regex(/^\d+$/).transform(Number),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});