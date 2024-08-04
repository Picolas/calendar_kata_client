import {Component, Input} from '@angular/core';
import {PartialNotification} from "../../interfaces/Notification";
import {NotificationService} from "../../services/NotificationService/notification.service";

@Component({
	selector: 'app-notification',
	standalone: true,
	imports: [],
	templateUrl: './notification.component.html',
	styleUrl: './notification.component.css'
})
export class NotificationComponent {
	@Input() notification: PartialNotification | null = null;

	constructor(private notificationService: NotificationService) {
	}

	onClickMarkAsRead() {
		this.notificationService.markAsRead(this.notification!).subscribe(
			() => {
				this.notification!.read = true;
				this.notificationService.readNotification(this.notification!);
			}
		);
	}
}
