import {Event, PartialEvent} from "./Event";

export interface Day {
	id: string;
	date: Date;
	events: PartialEvent[];
	isLastDay: boolean;
	isToday: boolean;
}

export type PartialDay = Partial<Day>;
