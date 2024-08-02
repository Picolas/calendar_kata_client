import {Component, Input} from '@angular/core';
import {PartialNotification} from "../../interfaces/Notification";

@Component({
	selector: 'app-notification',
	standalone: true,
	imports: [],
	templateUrl: './notification.component.html',
	styleUrl: './notification.component.css'
})
export class NotificationComponent {
	@Input() notification: PartialNotification | null = null;

	onClickMarkAsRead() {
		console.log(`Mark as read ${this.notification!.id}`);
	}
}
