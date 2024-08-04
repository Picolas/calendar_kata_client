import {Component, OnInit} from '@angular/core';
import {CalendarComponent} from "../../calendar/calendar/calendar.component";
import {EventService} from "../../../services/EventService/event.service";
import {PartialEvent} from "../../../interfaces/Event";
import {PopupEventComponent} from "../../../shared/popup-event/popup-event.component";
import {EventComponent} from "../../../shared/event/event.component";

@Component({
	selector: 'app-index',
	standalone: true,
	imports: [
		CalendarComponent,
		PopupEventComponent,
		EventComponent,
	],
	templateUrl: './index.component.html',
	styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit {
	events: PartialEvent[] = [];

	constructor(private eventService: EventService) {
	}

	ngOnInit(): void {
		this.eventService.getEvents().subscribe((events: any) => {
			console.log(events);
			this.events = events;
		});
	}

}
