import {Component, OnInit} from '@angular/core';
import {PartialDay} from "../../interfaces/Day";
import {IsEndDateEqualStartDatePipe} from "../../pipes/IsEndDateEqualStartDate/is-end-date-equal-start-date.pipe";
import {DatePipe} from "@angular/common";
import {EventPopupService} from "../../services/EventPopupService/event-popup.service";
import {EventService} from "../../services/EventService/event.service";
import {catchError} from "rxjs/operators";
import {of} from "rxjs";
import {EventUserComponent} from "../event-user/event-user.component";
import {EditEventComponent} from "../edit-event/edit-event.component";
import {IsMultipleDayPipe} from "../../pipes/IsMultipleDay/is-multiple-day.pipe";
import {RefreshDaysService} from "../../services/RefreshDaysService/refresh-days.service";
import {AuthService} from "../../services/AuthService/auth.service";
import {PartialUser} from "../../interfaces/User";
import {ErrorStateService} from "../../services/ErrorStateService/error-state.service";
import {UpdateEventDto} from "../../dtos/UpdateEventDto";
import {PartialEvent} from "../../interfaces/Event";

@Component({
	selector: 'app-popup-event',
	standalone: true,
	imports: [
		IsEndDateEqualStartDatePipe,
		DatePipe,
		EventUserComponent,
		EditEventComponent,
		IsMultipleDayPipe
	],
	templateUrl: './popup-event.component.html',
	styleUrl: './popup-event.component.css'
})
export class PopupEventComponent implements OnInit {
	event: PartialEvent | null = null;
	day: PartialDay | null = null;
	isOpen = false;
	isEditOpen = false;
	user: PartialUser | null = null;

	constructor(
		private eventPopupService: EventPopupService,
		private eventService: EventService,
		private refreshDaysService: RefreshDaysService,
		private authService: AuthService,
		private errorStateService: ErrorStateService,
	) {
	}

	ngOnInit() {
		this.eventPopupService.getIsOpen().subscribe(isOpen => this.isOpen = isOpen);
		this.eventPopupService.getEvent().subscribe((event) => {
			this.event = event;
			this.isEditOpen = false;
		});

		this.user = this.authService.getUser();
	}

	editEvent() {
		this.isEditOpen = !this.isEditOpen;
	}

	updateEvent(updatedEvent: UpdateEventDto) {
		if (!this.event || !this.event.id) return;

		updatedEvent.startDate = new Date(updatedEvent.startDate!).toISOString();
		updatedEvent.endDate = new Date(updatedEvent.endDate!).toISOString();

		this.eventService.updateEvent(this.event.id, updatedEvent).pipe(
			catchError(error => {
				console.error('PopupEventComponent.updateEvent', error);
				this.errorStateService.setError(error.error.message);
				return of(null);
			})
		).subscribe(event => {
			if (event) {
				this.event = event;
				this.isEditOpen = false;
				this.refreshDaysService.refreshEvents(new Date(event.startDate!), new Date(event.endDate!));
			}
		});
	}

	deleteEvent() {
		if (confirm('Êtes vous sûr ?') && this.event && this.event.id) {
			this.eventService.deleteEvent(this.event.id).pipe(
				catchError(error => {
					console.error('PopupEventComponent.deleteEvent', error);
					this.errorStateService.setError(error.error.message);
					return of(null);
				}),
			).subscribe(() => {
				this.event = null;
				this.eventPopupService.setEvent(null);
				this.eventPopupService.closeModal();
				this.refreshDaysService.refreshEvents(new Date(), new Date());
			});
		}
	}

	hasParticipant() {
		return this.event && this.event.inUser && this.event.inUser.length > 0;
	}

	closeEvent() {
		this.eventPopupService.closeModal();
	}
}
