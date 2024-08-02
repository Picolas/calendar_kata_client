import {Component, OnInit} from '@angular/core';
import {NotificationService} from "../../services/NotificationService/notification.service";
import {PartialNotification} from "../../interfaces/Notification";
import {NotificationsComponent} from "../../shared/notifications/notifications.component";

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [
		NotificationsComponent
	],
	templateUrl: './header.component.html',
	styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
	notifications: PartialNotification[] = [];
	isOpenNotifications = false;

	constructor(private notificationService: NotificationService) {
	}

	ngOnInit() {
		this.notificationService.getNotifications().subscribe((response: any) => {
			this.notifications = response;
		});
	}

	onClickOpenNotifications() {
		this.isOpenNotifications = !this.isOpenNotifications;
	}
}
