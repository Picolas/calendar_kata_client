import { Exclude, Expose } from 'class-transformer';

export class UserDto {
    @Expose()
    id!: number;

    @Expose()
    name!: string;

    @Expose()
    email!: string;

    @Expose()
    createdAt!: Date;

    @Exclude()
    password!: string;

    constructor(partial: Partial<UserDto>) {
        Object.assign(this, partial);
    }
}