import {Component, Input} from '@angular/core';
import {PartialDay} from "../../interfaces/Day";
import {EventPopupService} from "../../services/EventPopupService/event-popup.service";
import {PartialEvent} from "../../interfaces/Event";
import {IsMultipleDayPipe} from "../../pipes/IsMultipleDay/is-multiple-day.pipe";
import {DatePipe} from "@angular/common";

@Component({
	selector: 'app-day-event',
	standalone: true,
	imports: [
		IsMultipleDayPipe,
		DatePipe
	],
	templateUrl: './day-event.component.html',
	styleUrl: './day-event.component.css'
})
export class DayEventComponent {
	@Input() event: PartialEvent | null = null;
	@Input() day: PartialDay | null = null;

	constructor(private eventPopupService: EventPopupService) {
	}

	onClickEvent(event: UIEvent) {
		event.preventDefault();
		this.eventPopupService.setEvent(this.event);
		this.eventPopupService.openModal();
	}
}
