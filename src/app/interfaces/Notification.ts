import {PartialUser, User} from "./User";

export interface Notification {
    id: string;
    content: string;
    userId: string;
    user: PartialUser;
    createdAt: Date;
}

export type PartialNotification = Partial<Notification>;