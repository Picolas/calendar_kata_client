import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
	name: 'isPastDay',
	standalone: true
})
export class IsPastDayPipe implements PipeTransform {

	transform(date: any): boolean {
		date = new Date(date);
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		return Boolean(date && (date < today));
	}

}
