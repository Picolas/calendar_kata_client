import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {PartialNotification} from "../../interfaces/Notification";
import {HttpClient} from "@angular/common/http";
import {API_PATH, API_URL} from "../../constants/constants";

@Injectable({
	providedIn: 'root'
})
export class NotificationService {
	private apiUrl = `${API_URL}${API_PATH}/notifications`;
	private notifications$ = new BehaviorSubject<PartialNotification[]>([]);

	constructor(private http: HttpClient) {
	}

	getNotifications() {
		return this.http.get(`${this.apiUrl}`);
	}

	getUnreadNotifications() {
		return this.http.get(`${this.apiUrl}/unread`);
	}

	markAsRead(notification: PartialNotification) {
		return this.http.patch(`${this.apiUrl}/${notification.id}`, {});
	}

	readNotification(notification: PartialNotification) {
		const notifications = this.notifications$.value;
		const index = notifications.findIndex(n => n.id === notification.id);
		notifications[index] = notification;
		this.notifications$.next(notifications);
	}

	getNotificationsSubject() {
		return this.notifications$.asObservable();
	}

	setNotifications(notifications: PartialNotification[]) {
		this.notifications$.next(notifications.sort((a, b) => {
			return new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime();
		}));
	}
}
