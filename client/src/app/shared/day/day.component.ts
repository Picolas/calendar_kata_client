import {Component, Input} from '@angular/core';
import {PartialDay} from "../../interfaces/Day";
import {IsPastDayPipe} from "../../pipes/IsPastDay/is-past-day.pipe";
import {IsDayTodayPipe} from "../../pipes/IsDayToday/is-day-today.pipe";
import {IsFirstOrLastDayMonthPipe} from "../../pipes/IsDayFirstOrLastDayMonth/is-first-or-last-day-month.pipe";
import {CustomFrenchDatePipe} from "../../pipes/CustomFrenchDate/custom-french-date.pipe";
import {DatePipe} from "@angular/common";
import {DayEventComponent} from "../day-event/day-event.component";

@Component({
	selector: 'app-day',
	standalone: true,
	imports: [
		IsPastDayPipe,
		IsDayTodayPipe,
		IsFirstOrLastDayMonthPipe,
		CustomFrenchDatePipe,
		DatePipe,
		DayEventComponent
	],
	templateUrl: './day.component.html',
	styleUrl: './day.component.css'
})
export class DayComponent {
	@Input({required: true}) day: PartialDay | null = null;

	onClickDay(event: UIEvent) {
		event.preventDefault();
		console.log('DayComponent.onClickDay', event);
	}
}
