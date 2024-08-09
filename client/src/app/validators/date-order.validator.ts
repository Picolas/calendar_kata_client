import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function dateOrderValidator(): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const startDate = control.get('startDate')?.value;
		const endDate = control.get('endDate')?.value;

		if (startDate && endDate && new Date(startDate) >= new Date(endDate)) {
			return {dateOrder: true};
		}

		return null;
	};
}