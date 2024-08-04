import {Component, OnInit} from '@angular/core';
import {PartialNotification} from "../../interfaces/Notification";
import {NotificationsComponent} from "../../shared/notifications/notifications.component";
import {AuthService} from "../../services/AuthService/auth.service";
import {PartialUser} from "../../interfaces/User";
import {SocketService} from "../../services/SocketService/socket.service";
import {NotificationService} from "../../services/NotificationService/notification.service";
import {HotToastService} from "@ngxpert/hot-toast";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [
		NotificationsComponent,
		RouterLink,
		RouterLinkActive
	],
	templateUrl: './header.component.html',
	styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
	notifications: PartialNotification[] = [];
	isOpenNotifications = false;
	user: PartialUser | null = null;

	constructor(private socketService: SocketService, private authService: AuthService, private notificationService: NotificationService, private toast: HotToastService) {
	}

	ngOnInit() {
		this.user = this.authService.getUser();
		
		if (this.user && this.authService.getToken()) {
			this.notificationService.getUnreadNotifications().subscribe((notifications: any) => {
				this.notificationService.setNotifications(notifications);
			});

			this.socketService.subscribeToNotifications(this.user.id!);

			this.socketService.getNotifications().subscribe((jsonNotification: any) => {
				const notification = JSON.parse(jsonNotification) as PartialNotification;
				this.notifications.unshift(notification);
				this.toast.info(notification.content);
				this.notificationService.setNotifications(this.notifications);
			});

			this.notificationService.getNotificationsSubject().subscribe((notifications: any) => {
				notifications = notifications.filter((notification: PartialNotification) => !notification.read);
				this.notifications = notifications;
			});
		}
	}

	onClickOpenNotifications() {
		this.isOpenNotifications = !this.isOpenNotifications;
	}
}
