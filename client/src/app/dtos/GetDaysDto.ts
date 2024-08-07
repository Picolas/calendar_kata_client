export class GetDaysDto {
	month: string;
	userId: number;

	constructor(month: Date, userId: number) {
		this.month = new Date(Date.UTC(month.getFullYear(), month.getMonth(), 1)).toISOString();
		this.userId = userId;
	}
}
