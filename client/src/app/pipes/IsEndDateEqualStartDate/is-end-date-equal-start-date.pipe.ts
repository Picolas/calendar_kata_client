import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
	name: 'isEndDateEqualStartDate',
	standalone: true
})
export class IsEndDateEqualStartDatePipe implements PipeTransform {

	transform(startDate?: any, endDate?: any): boolean {
		if (!startDate && !endDate) {
			return false;
		}
		startDate = new Date(startDate);
		endDate = new Date(endDate);
		return Boolean(startDate && endDate && (startDate.getDate() === endDate.getDate() && startDate.getMonth() === endDate.getMonth() && startDate.getFullYear() === endDate.getFullYear()));
	}

}
