import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {PartialDay} from "../../../interfaces/Day";
import {WeeksComponent} from "../../../shared/weeks/weeks.component";
import {DayComponent} from "../../../shared/day/day.component";
import {CalendarToolbarComponent} from "../../../shared/calendar-toolbar/calendar-toolbar.component";

@Component({
	selector: 'app-calendar',
	standalone: true,
	imports: [
		WeeksComponent,
		DayComponent,
		CalendarToolbarComponent
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
