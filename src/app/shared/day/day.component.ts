import {Component, Input} from '@angular/core';
import { DatePipe } from "@angular/common";
import {DayEventComponent} from "../day-event/day-event.component";
import {PartialDay} from "../../interfaces/Day";
import {IsDayTodayPipe} from "../../pipes/IsDayToday/is-day-today.pipe";
import {IsPastDayPipe} from "../../pipes/IsPastDay/is-past-day.pipe";
import {IsFirstOrLastDayMonthPipe} from "../../pipes/IsDayFirstOrLastDayMonth/is-first-or-last-day-month.pipe";

@Component({
	selector: 'app-day',
	standalone: true,
	imports: [
    DayEventComponent,
    DatePipe,
    IsPastDayPipe,
    IsDayTodayPipe,
    IsFirstOrLastDayMonthPipe,
    IsDayTodayPipe,
    IsPastDayPipe,
    IsFirstOrLastDayMonthPipe
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
