export interface User {
	id: number;
	name: string;
	email: string;
	createdAt: Date;
}

export type PartialUser = Partial<User>;
