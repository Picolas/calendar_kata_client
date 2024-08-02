import {Component, OnInit} from '@angular/core';
import {CalendarComponent} from "./calendar/calendar.component";
import {DaysService} from "../../services/DaysService/days.service";
import {PartialDay} from "../../interfaces/Day";
import {EventComponent} from "../../shared/event/event.component";
import {RefreshDaysService} from "../../services/RefreshDaysService/refresh-days.service";
import {AuthService} from "../../services/AuthService/auth.service";
import {EventService} from "../../services/EventService/event.service";
import {switchMap} from "rxjs/operators";

@Component({
	selector: 'app-calendar-index',
	standalone: true,
	imports: [
		CalendarComponent,
		EventComponent
	],
	templateUrl: './index.component.html',
	styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit {
	days: PartialDay[] = [];
	month: Date = new Date();
	userId: number | null = null;

	constructor(private daysService: DaysService, private refreshDaysService: RefreshDaysService, private authService: AuthService, private eventService: EventService) {
	}

	ngOnInit() {
		this.userId = this.authService.getUserId()!;

		this.daysService.getDays(this.month, this.userId!).subscribe((response: any) => {
			this.days = response.days;
		});

		/*
		this.refreshDaysService.getRefreshDaysSubject().subscribe(() => {
			this.daysService.getDays(this.month, this.userId!).subscribe((response: any) => {
				this.days = response.days;
			});
		});
		 */

		this.refreshDaysService.getRefreshEventsSubject().pipe(
			switchMap(({startDate, endDate}) => this.daysService.getDays(this.month, this.userId!))
		).subscribe((response: any) => {
			this.days = response.days;
		});
	}

	onMonthChange(month: Date) {
		this.month = month;
		this.daysService.getDays(this.month, this.userId!).subscribe((response: any) => {
			this.days = response.days;
		});
	}
}
