import {Component, Input} from '@angular/core';
import {PartialNotification} from "../../interfaces/Notification";
import {NotificationComponent} from "../notification/notification.component";

@Component({
	selector: 'app-notifications',
	standalone: true,
	imports: [
		NotificationComponent
	],
	templateUrl: './notifications.component.html',
	styleUrl: './notifications.component.css'
})
export class NotificationsComponent {
	@Input() notifications: PartialNotification[] = [];
	@Input() isOpen = false;

}
