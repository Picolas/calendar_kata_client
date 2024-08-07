import {Component, OnInit} from '@angular/core';
import {CalendarComponent} from "./calendar/calendar.component";
import {DaysService} from "../../services/DaysService/days.service";
import {PartialDay} from "../../interfaces/Day";
import {PopupEventComponent} from "../../shared/popup-event/popup-event.component";
import {RefreshDaysService} from "../../services/RefreshDaysService/refresh-days.service";
import {AuthService} from "../../services/AuthService/auth.service";
import {EventService} from "../../services/EventService/event.service";
import {catchError, switchMap} from "rxjs/operators";
import {PartialUser} from "../../interfaces/User";
import {ErrorComponent} from "../../shared/error/error.component";
import {ErrorStateService} from "../../services/ErrorStateService/error-state.service";
import {of} from "rxjs";

@Component({
	selector: 'app-calendar-index',
	standalone: true,
	imports: [
		CalendarComponent,
		PopupEventComponent,
		ErrorComponent
	],
	templateUrl: './index.component.html',
	styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit {
	days: PartialDay[] = [];
	month: Date = new Date();
	user: PartialUser | null = null;
	error: string | null = null;

	constructor(private daysService: DaysService, private refreshDaysService: RefreshDaysService, private authService: AuthService, private eventService: EventService, private errorStateService: ErrorStateService) {
	}

	ngOnInit() {
		this.user = this.authService.getUser();
		if (!this.user || !this.user.id) {
			this.errorStateService.setError('User not authenticated');
			return;
		}

		this.fetchDays();

		this.refreshDaysService.getRefreshEventsSubject().pipe(
			switchMap(async () => this.fetchDays())
		).subscribe();

		this.errorStateService.getError().subscribe((error: string | null) => {
			this.error = error;
		});
	}

	onMonthChange(month: Date) {
		this.month = month;
		this.fetchDays();
	}

	private fetchDays() {
		if (!this.user || !this.user.id) {
			return of(null);
		}
		return this.daysService.getDays(this.month, this.user.id).pipe(
			catchError((error) => {
				this.errorStateService.setError(error.error.message || 'An error occurred');
				return of({days: []});
			})
		).subscribe((response: { days: PartialDay[] } | null) => {
			if (response) {
				this.days = response.days;
			}
		});
	}
}
