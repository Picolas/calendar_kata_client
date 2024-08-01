import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
	name: 'isEventLastNextDay',
	standalone: true
})
export class IsEventLastNextDayPipe implements PipeTransform {

	transform(dayDate: any, endDate: any): boolean {
		// check if eventEndDate is > dayDate
		const day = new Date(dayDate);
		const end = new Date(endDate);

		return Boolean(day && end && (end.getDate() === day.getDate() + 1 && end.getMonth() === day.getMonth() && end.getFullYear() === day.getFullYear()));
	}

}
