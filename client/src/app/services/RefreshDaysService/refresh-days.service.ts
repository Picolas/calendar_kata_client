import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class RefreshDaysService {
	private refreshDaysSubject$ = new Subject<any>;
	private refreshEventsSubject$ = new Subject<{ startDate: Date, endDate: Date }>();

	refreshDays(): void {
		this.refreshDaysSubject$.next(true);
	}

	refreshEvents(startDate: Date, endDate: Date): void {
		this.refreshEventsSubject$.next({startDate, endDate});
	}

	getRefreshEventsSubject() {
		return this.refreshEventsSubject$;
	}

	getRefreshDaysSubject() {
		return this.refreshDaysSubject$;
	}
}
