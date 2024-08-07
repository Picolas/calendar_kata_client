import {Injectable} from '@angular/core';
import {io, Socket} from "socket.io-client";
import {API_URL} from "../../constants/constants";
import {Observable} from "rxjs";
import {PartialNotification} from "../../interfaces/Notification";

@Injectable({
	providedIn: 'root'
})
export class SocketService {
	private socket: Socket;

	constructor() {
		this.socket = io(API_URL);
		this.socket.on('connect', () => {
			console.log('connected to server');
		});
	}

	subscribeToNotifications(userId: number) {
		this.socket.emit('subscribe', userId);
	}

	getNotifications(): Observable<PartialNotification> {
		return new Observable(observer => {
			this.socket.on('notification', (notification: PartialNotification) => {
				observer.next(notification);
			});
		});
	}
}
