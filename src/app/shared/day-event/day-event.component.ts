import {booleanAttribute, Component, Input, OnInit} from '@angular/core';
import {PartialEvent} from "../../interfaces/Event";
import {PartialDay} from "../../interfaces/Day";
import {DatePipe, NgClass, NgIf} from "@angular/common";
import {MAX_EVENT_UNTIL_REDUCE} from "../../constants/constants";
import {IsEndDateEqualStartDatePipe} from "../../pipes/IsEndDateEqualStartDate/is-end-date-equal-start-date.pipe";
import {IsEventLastPreviousDayPipe} from "../../pipes/IsEventLastPreviousDay/is-event-last-previous-day.pipe";
import {IsEventLastNextDayPipe} from "../../pipes/IsEventLastNextDay/is-event-last-next-day.pipe";

@Component({
	selector: 'app-day-event',
	standalone: true,
	imports: [
		NgClass,
		NgIf,
		DatePipe,
		IsEndDateEqualStartDatePipe,
		IsEventLastPreviousDayPipe,
		IsEventLastNextDayPipe
	],
	templateUrl: './day-event.component.html',
	styleUrl: './day-event.component.css'
})
export class DayEventComponent implements OnInit {
	@Input() event: PartialEvent | null = null;
	@Input() day: PartialDay | null = null;
	@Input({transform: booleanAttribute}) showDescription = false;

	protected readonly maxEventUntilReduce = MAX_EVENT_UNTIL_REDUCE;


	ngOnInit() {
		console.log('DayEventComponent.ngOnInit', this.event);
	}

	onClickEvent(event: UIEvent) {
		event.preventDefault();
		console.log('DayEventComponent.onClickEvent', event);
	}
}
