import {PartialUser} from "./User";

export interface Notification {
	id: number;
	content: string;
	read: boolean;
	userId: string;
	user: PartialUser;
	createdAt: Date;
}

export type PartialNotification = Partial<Notification>;
