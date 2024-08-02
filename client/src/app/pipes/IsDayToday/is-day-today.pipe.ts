import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
	name: 'isDayToday',
	standalone: true
})
export class IsDayTodayPipe implements PipeTransform {

	transform(date: any): boolean {
		date = new Date(date);
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		return Boolean(date && (date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()));
	}

}
