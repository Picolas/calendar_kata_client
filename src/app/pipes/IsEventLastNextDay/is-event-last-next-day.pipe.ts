import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
	name: 'isEventLastNextDay',
	standalone: true
})
export class IsEventLastNextDayPipe implements PipeTransform {

	transform(dayDate: any, endDate: any): boolean {
		// check if eventEndDate is >= dayDate
		const day = new Date(dayDate);
		const end = new Date(endDate);

		day.setHours(0, 0, 0, 0);
		end.setHours(0, 0, 0, 0);

		return Boolean(day && end && (end.getDate() === day.getDate() + 1 && end.getMonth() === day.getMonth() && end.getFullYear() === day.getFullYear()));
	}

}
