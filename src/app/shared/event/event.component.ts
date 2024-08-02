import {Component} from '@angular/core';
import {PartialEvent} from "../../interfaces/Event";
import {PartialDay} from "../../interfaces/Day";
import {IsEndDateEqualStartDatePipe} from "../../pipes/IsEndDateEqualStartDate/is-end-date-equal-start-date.pipe";
import { DatePipe } from "@angular/common";
import {EventPopupService} from "../../services/EventPopupService/event-popup.service";
import {EventService} from "../../services/EventService/event.service";
import {catchError} from "rxjs/operators";
import {EMPTY} from "rxjs";
import {EventUserComponent} from "../event-user/event-user.component";
import {EditEventComponent} from "../edit-event/edit-event.component";
import {IsMultipleDayPipe} from "../../pipes/IsMultipleDay/is-multiple-day.pipe";
import {RefreshDaysService} from "../../services/RefreshDaysService/refresh-days.service";

@Component({
	selector: 'app-event',
	standalone: true,
	imports: [
    IsEndDateEqualStartDatePipe,
    DatePipe,
    EventUserComponent,
    EditEventComponent,
    IsMultipleDayPipe
],
	templateUrl: './event.component.html',
	styleUrl: './event.component.css'
})
export class EventComponent {
	event: PartialEvent | null = null;
	day: PartialDay | null = null;
	isOpen = false;
	isEditOpen = false;

	constructor(private eventPopupService: EventPopupService, private eventService: EventService, private refreshDaysService: RefreshDaysService) {
	}

	ngOnInit() {
		this.eventPopupService.getIsOpen().subscribe(isOpen => this.isOpen = isOpen);
		this.eventPopupService.getEvent().subscribe((event) => {
			this.event = event
			this.isEditOpen = false;
		});
	}

	editEvent() {
		this.isEditOpen = !this.isEditOpen;
	}

	deleteEvent() {
		if (confirm('Êtes vous sûr ?')) {
			this.eventService.deleteEvent(this.event!.id!).pipe(
				catchError(error => {
					console.error('EventComponent.deleteEvent', error);
					return EMPTY;
				}),
			).subscribe(() => {
				this.event = null;
				this.eventPopupService.setEvent(null);
				this.eventPopupService.closeModal();
				this.refreshDaysService.refreshDays();
			});
		}
	}

	hasParticipant() {
		return this.event!.inUser!.length > 0;
	}

	closeEvent() {
		this.eventPopupService.closeModal();
	}
}
