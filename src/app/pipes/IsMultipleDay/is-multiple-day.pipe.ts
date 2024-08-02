import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
	name: 'isMultipleDay',
	standalone: true
})
export class IsMultipleDayPipe implements PipeTransform {

	transform(startDate: any, endDate: any): boolean {
		const start = new Date(startDate);
		const end = new Date(endDate);
		start.setHours(0, 0, 0, 0);
		end.setHours(0, 0, 0, 0);
		return Boolean(startDate && endDate && (start.getDate() !== end.getDate() || start.getMonth() !== end.getMonth() || start.getFullYear() !== end.getFullYear()));
	}

}
