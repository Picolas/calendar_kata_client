import {Component, OnInit} from '@angular/core';
import {PartialDay} from "../../interfaces/Day";
import {IsEndDateEqualStartDatePipe} from "../../pipes/IsEndDateEqualStartDate/is-end-date-equal-start-date.pipe";
import {DatePipe} from "@angular/common";
import {EventPopupService} from "../../services/EventPopupService/event-popup.service";
import {EventUserComponent} from "../event-user/event-user.component";
import {EditEventComponent} from "../edit-event/edit-event.component";
import {IsMultipleDayPipe} from "../../pipes/IsMultipleDay/is-multiple-day.pipe";
import {RefreshDaysService} from "../../services/RefreshDaysService/refresh-days.service";
import {AuthService} from "../../services/AuthService/auth.service";
import {PartialUser} from "../../interfaces/User";
import {ErrorStateService} from "../../services/ErrorStateService/error-state.service";
import {UpdateEventDto} from "../../dtos/UpdateEventDto";
import {PartialEvent} from "../../interfaces/Event";
import {EventFormService} from "../../services/EventFormService/event-form.service";

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
		private eventFormService: EventFormService,
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

		this.eventFormService.updateEvent(this.event.id, updatedEvent).subscribe({
			next: (event) => {
				this.event = event;
				this.isEditOpen = false;
				this.refreshDaysService.refreshEvents(new Date(event.startDate!), new Date(event.endDate!));
			},
			error: (error) => {
				console.error('PopupEventComponent.updateEvent', error);
				this.errorStateService.setError(error.error.message);
			}
		});
	}

	deleteEvent() {
		if (confirm('Êtes vous sûr de vouloir supprimer cet évênement ?') && this.event && this.event.id) {
			this.eventFormService.deleteEvent(this.event.id).subscribe({
				next: () => {
					this.event = null;
					this.eventPopupService.setEvent(null);
					this.eventPopupService.closeModal();
					this.refreshDaysService.refreshEvents(new Date(), new Date());
				},
				error: (error) => {
					console.error('PopupEventComponent.deleteEvent', error);
					this.errorStateService.setError(error.error.message);
				}
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
