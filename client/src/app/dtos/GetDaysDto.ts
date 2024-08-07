export class GetDaysDto {
	month: string;
	userId: number;

	constructor(month: Date, userId: number) {
		this.month = month.toISOString();
		this.userId = userId;
	}
}
