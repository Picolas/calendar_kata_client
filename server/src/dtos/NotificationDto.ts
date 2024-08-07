import { Expose } from 'class-transformer';

export class NotificationDto {
    @Expose()
    id!: number;

    @Expose()
    userId!: number;

    @Expose()
    content!: string;

    @Expose()
    read!: boolean;

    @Expose()
    createdAt!: Date;
}