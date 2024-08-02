import {PartialUser} from "./User";

export interface Notification {
    id: number;
    content: string;
    read: boolean;
    user: PartialUser;
    createdAt: Date;
}

export type PartialNotification = Partial<Notification>;