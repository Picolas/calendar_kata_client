import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
	name: 'isEventLastPreviousDay',
	standalone: true
})
export class IsEventLastPreviousDayPipe implements PipeTransform {

	transform(dayDate: any, startDate: any): boolean {
		// check if startDate is < dayDate
		const day = new Date(dayDate);
		const start = new Date(startDate);

		return Boolean(day && start && (start.getDate() === day.getDate() - 1 && start.getMonth() === day.getMonth() && start.getFullYear() === day.getFullYear()));
	}

}
