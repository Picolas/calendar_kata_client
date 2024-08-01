import {Component, OnInit} from '@angular/core';
import {CalendarComponent} from "./calendar/calendar.component";
import {DaysService} from "../../services/DaysService/days.service";
import {PartialDay} from "../../interfaces/Day";

@Component({
	selector: 'app-calendar-index',
	standalone: true,
	imports: [
		CalendarComponent
	],
	templateUrl: './index.component.html',
	styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit {
	days: PartialDay[] = [];
	month: Date = new Date();

	constructor(private daysService: DaysService) {
	}

	ngOnInit() {
		this.daysService.getDays(this.month, 1).subscribe((response: any) => {
			this.days = response.days;
		});
	}

	onMonthChange(month: Date) {
		console.log('month', month);
		this.month = month;
		this.daysService.getDays(this.month, 1).subscribe((response: any) => {
			this.days = response.days;
		});
	}
}
