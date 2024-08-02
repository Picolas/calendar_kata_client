import {Component, Input} from '@angular/core';
import {PartialUser} from "../../interfaces/User";
import {NgIf} from "@angular/common";

@Component({
	selector: 'app-event-user',
	standalone: true,
	imports: [
		NgIf
	],
	templateUrl: './event-user.component.html',
	styleUrl: './event-user.component.css'
})
export class EventUserComponent {
	@Input() user: PartialUser | null = null;
	showFullDetails = false;

	onClickShowFullDetails() {
		this.showFullDetails = !this.showFullDetails;
	}
}
