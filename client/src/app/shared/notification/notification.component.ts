import {Component, HostListener, Input} from '@angular/core';
import {PartialNotification} from "../../interfaces/Notification";
import {NotificationService} from "../../services/NotificationService/notification.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
	selector: 'app-notification',
	standalone: true,
	imports: [],
	templateUrl: './notification.component.html',
	styleUrl: './notification.component.css'
})
export class NotificationComponent {
	@Input() notification: PartialNotification | null = null;
	hoverContent = false;
	markAsRead = takeUntilDestroyed();

	constructor(private notificationService: NotificationService) {
	}

	@HostListener('mouseenter')
	onEnter() {
		this.hoverContent = true;
	}

	@HostListener('mouseleave')
	onLeave() {
		this.hoverContent = false;
	}

	onClickMarkAsRead() {
		this.notificationService.markAsRead(this.notification!).pipe(this.markAsRead).subscribe(
			() => {
				this.notification!.read = true;
				this.notificationService.readNotification(this.notification!);
			}
		);
	}
}
