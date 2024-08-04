import {Component, OnInit} from '@angular/core';
import {CalendarComponent} from "./calendar/calendar.component";
import {DaysService} from "../../services/DaysService/days.service";
import {PartialDay} from "../../interfaces/Day";
import {PopupEventComponent} from "../../shared/popup-event/popup-event.component";
import {RefreshDaysService} from "../../services/RefreshDaysService/refresh-days.service";
import {AuthService} from "../../services/AuthService/auth.service";
import {EventService} from "../../services/EventService/event.service";
import {switchMap} from "rxjs/operators";
import {PartialUser} from "../../interfaces/User";

@Component({
	selector: 'app-calendar-index',
	standalone: true,
	imports: [
		CalendarComponent,
		PopupEventComponent
	],
	templateUrl: './index.component.html',
	styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit {
	days: PartialDay[] = [];
	month: Date = new Date();
	user: PartialUser | null = null;

	constructor(private daysService: DaysService, private refreshDaysService: RefreshDaysService, private authService: AuthService, private eventService: EventService) {
	}

	ngOnInit() {
		this.user = this.authService.getUser()!;

		this.daysService.getDays(this.month, this.user?.id!).subscribe((response: any) => {
			this.days = response.days;
		});

		this.refreshDaysService.getRefreshEventsSubject().pipe(
			switchMap(({startDate, endDate}) => this.daysService.getDays(this.month, this.user?.id!!))
		).subscribe((response: any) => {
			this.days = response.days;
		});
	}

	onMonthChange(month: Date) {
		this.month = month;
		this.daysService.getDays(this.month, this.user?.id!!).subscribe((response: any) => {
			this.days = response.days;
		});
	}
}
