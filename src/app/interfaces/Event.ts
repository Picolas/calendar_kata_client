import {PartialUser} from "./User";

export interface Event {
	id: number;
	title: string;
	description: string;
	startDate: Date;
	endDate: Date;
	createdAt: Date;
	creator: PartialUser;
	inUser: PartialUser[];
	showHeader: boolean;
}

export type PartialEvent = Partial<Event>;
