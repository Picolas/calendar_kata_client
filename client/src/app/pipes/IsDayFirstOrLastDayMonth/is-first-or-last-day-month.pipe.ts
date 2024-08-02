import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
	name: 'isFirstOrLastDayMonth',
	standalone: true
})
export class IsFirstOrLastDayMonthPipe implements PipeTransform {

	transform(date?: any): boolean {
		date = new Date(date);
		return Boolean(date && (date.getDate() === 1 || date.getDate() === new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()));
	}

}
