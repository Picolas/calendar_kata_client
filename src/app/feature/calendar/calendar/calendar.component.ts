// src/app/feature/calendar/calendar/calendar.component.ts
import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {DayComponent} from "../../../shared/day/day.component";
import {PartialDay} from "../../../interfaces/Day";
import {WeeksComponent} from "../../../shared/weeks/weeks.component";
import {DatePipe, NgForOf} from "@angular/common";

@Component({
	selector: 'app-calendar',
	standalone: true,
	imports: [
		DayComponent,
		WeeksComponent,
		DatePipe,
		NgForOf
	],
	templateUrl: './calendar.component.html',
	styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnDestroy {
	@Input() days: PartialDay[] = [];
	@Input() month: Date = new Date();
	@Output() monthChange = new EventEmitter<Date>();

	onClickPreviousMonth() {
		this.month = new Date(this.month.getFullYear(), this.month.getMonth() - 1, 1);
		this.monthChange.emit(this.month);
	}

	onClickNextMonth() {
		this.month = new Date(this.month.getFullYear(), this.month.getMonth() + 1, 1);
		this.monthChange.emit(this.month);
	}

	ngOnDestroy() {
	}
}