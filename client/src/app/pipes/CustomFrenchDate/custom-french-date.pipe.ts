import {Pipe, PipeTransform} from '@angular/core';
import {PartialFormatMap} from "../../interfaces/FormatMap";

@Pipe({
	name: 'customFrenchDate',
	standalone: true
})
export class CustomFrenchDatePipe implements PipeTransform {

	formatMap: PartialFormatMap = {
		'dd': '2-digit',
		'd': 'numeric',
		'mm': '2-digit',
		'm': 'numeric',
		'yyyy': 'numeric',
		'MMMM': 'long',
		'ddd': 'short',
		'dddd': 'long',
	}

	transform(date: Date | undefined | null, format: string = 'dd/mm/yyyy'): string | null {
		if (!date) {
			return null;
		}
		date = new Date(date);

		const formatPieces = format.match(/(d+|m+|y+|MMMM|ddd|dddd)/g);

		const dateOptions: Intl.DateTimeFormatOptions = {
			day: undefined,
			month: undefined,
			year: undefined,
			weekday: undefined
		};

		formatPieces?.forEach((piece) => {
			if (this.formatMap[piece]) {
				if (['d', 'dd'].includes(piece)) {
					dateOptions.day = this.formatMap[piece] as "2-digit" | "numeric";
				}
				if (['m', 'mm', 'MMMM'].includes(piece)) {
					dateOptions.month = this.formatMap[piece] as "2-digit" | "numeric" | "long";
				}
				if (['yyyy'].includes(piece)) {
					dateOptions.year = this.formatMap[piece] as "numeric";
				}
				if (['ddd', 'dddd'].includes(piece)) {
					dateOptions.weekday = this.formatMap[piece] as "short" | "long";
				}
			}
		});

		return date.toLocaleDateString('fr-FR', dateOptions);
	}
}
