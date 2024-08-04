import {Component, Input} from '@angular/core';
import {PartialEvent} from "../../interfaces/Event";
import {IsEndDateEqualStartDatePipe} from "../../pipes/IsEndDateEqualStartDate/is-end-date-equal-start-date.pipe";
import {DatePipe} from "@angular/common";
import {EventUserComponent} from "../event-user/event-user.component";
import {EditEventComponent} from "../edit-event/edit-event.component";
import {IsMultipleDayPipe} from "../../pipes/IsMultipleDay/is-multiple-day.pipe";
import {AuthService} from "../../services/AuthService/auth.service";
import {PartialUser} from "../../interfaces/User";

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
	@Input() event: PartialEvent | null = null;
	user: PartialUser | null = null;

	constructor(private authService: AuthService) {
	}

	ngOnInit() {
		this.user = this.authService.getUser();
	}

	hasParticipant() {
		return this.event!.inUser!.length > 0;
	}
}
