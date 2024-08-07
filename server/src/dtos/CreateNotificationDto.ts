import { IsNumber, IsString, IsBoolean } from 'class-validator';

export class CreateNotificationDto {
    @IsNumber()
    userId!: number;

    @IsString()
    content!: string;

    @IsBoolean()
    read: boolean = false;
}