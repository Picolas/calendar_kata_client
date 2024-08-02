import {booleanAttribute, Component, HostListener, Input, OnInit} from '@angular/core';
import {PartialEvent} from "../../interfaces/Event";
import {PartialDay} from "../../interfaces/Day";
import { DatePipe, NgClass } from "@angular/common";
import {MAX_EVENT_UNTIL_REDUCE} from "../../constants/constants";
import {IsEndDateEqualStartDatePipe} from "../../pipes/IsEndDateEqualStartDate/is-end-date-equal-start-date.pipe";
import {IsEventLastPreviousDayPipe} from "../../pipes/IsEventLastPreviousDay/is-event-last-previous-day.pipe";
import {IsEventLastNextDayPipe} from "../../pipes/IsEventLastNextDay/is-event-last-next-day.pipe";
import {RandomColorPipe} from "../../pipes/RandomColor/random-color.pipe";
import {EventPopupService} from "../../services/EventPopupService/event-popup.service";
import {IsMultipleDayPipe} from "../../pipes/IsMultipleDay/is-multiple-day.pipe";

@Component({
	selector: 'app-day-event',
	standalone: true,
	imports: [
    NgClass,
    DatePipe,
    IsEndDateEqualStartDatePipe,
    IsEventLastPreviousDayPipe,
    IsEventLastNextDayPipe,
    RandomColorPipe,
    IsMultipleDayPipe
],
	templateUrl: './day-event.component.html',
	styleUrl: './day-event.component.css'
})
export class DayEventComponent implements OnInit {
	@Input() event: PartialEvent | null = null;
	@Input() day: PartialDay | null = null;
	@Input({transform: booleanAttribute}) showDescription = false;

	protected readonly maxEventUntilReduce = MAX_EVENT_UNTIL_REDUCE;

	constructor(private eventPopupService: EventPopupService) {
	}

	ngOnInit() {
		//console.log('DayEventComponent.ngOnInit', this.event);
	}

	// double click event
	@HostListener('dblclick', ['$event'])
	onDoubleClickEvent(event: UIEvent) {
		event.preventDefault();
		this.eventPopupService.setEvent(this.event);
		this.eventPopupService.openModal();

	}

	onClickEvent(event: UIEvent) {
		event.preventDefault();
		this.eventPopupService.setEvent(this.event);
		this.eventPopupService.openModal();
	}
}
