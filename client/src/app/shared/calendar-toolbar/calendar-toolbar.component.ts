import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DatePipe} from "@angular/common";
import {CustomFrenchDatePipe} from "../../pipes/CustomFrenchDate/custom-french-date.pipe";

@Component({
	selector: 'app-calendar-toolbar',
	standalone: true,
	imports: [
		DatePipe,
		CustomFrenchDatePipe
	],
	templateUrl: './calendar-toolbar.component.html',
	styleUrl: './calendar-toolbar.component.css'
})
export class CalendarToolbarComponent {
	@Input() month: Date = new Date();
	@Output() onPreviousMonth = new EventEmitter<void>();
	@Output() onNextMonth = new EventEmitter<void>();

	onClickPreviousMonth() {
		this.onPreviousMonth.emit();
	}

	onClickNextMonth() {
		this.onNextMonth.emit();
	}

}
