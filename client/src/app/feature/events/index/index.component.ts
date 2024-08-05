import {Component, OnInit} from '@angular/core';
import {CalendarComponent} from "../../calendar/calendar/calendar.component";
import {EventService} from "../../../services/EventService/event.service";
import {PartialEvent} from "../../../interfaces/Event";
import {PopupEventComponent} from "../../../shared/popup-event/popup-event.component";
import {EventComponent} from "../../../shared/event/event.component";
import {ErrorComponent} from "../../../shared/error/error.component";
import {catchError} from "rxjs/operators";

@Component({
	selector: 'app-index',
	standalone: true,
	imports: [
		CalendarComponent,
		PopupEventComponent,
		EventComponent,
		ErrorComponent,
	],
	templateUrl: './index.component.html',
	styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit {
	events: PartialEvent[] = [];
	error = null;

	constructor(private eventService: EventService) {
	}

	ngOnInit(): void {
		this.eventService.getEvents().pipe(
			catchError((error) => {
				this.error = error.error.message;
				return error;
			}),
		).subscribe((events: any) => {
			this.events = events;
		});
	}

}
