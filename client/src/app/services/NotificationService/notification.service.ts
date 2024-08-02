import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {PartialNotification} from "../../interfaces/Notification";
import {HttpClient} from "@angular/common/http";
import {WebSocketService} from "../WebSockerService/web-socket.service";
import {API_URL} from "../../constants/constants";

@Injectable({
	providedIn: 'root'
})
export class NotificationService {
	private apiUrl = `${API_URL}/notifications`;
	private notifications$ = new BehaviorSubject<PartialNotification[]>([]);

	constructor(private http: HttpClient, private wsService: WebSocketService) {
		this.wsService.getMessages().subscribe((message) => {
			this.notifications$.next([...this.notifications$.value, message]);
		});
	}

	getNotifications() {
		return this.http.get(`${this.apiUrl}`);
	}
}
