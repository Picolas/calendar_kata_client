import {Injectable} from '@angular/core';
import {PartialUser} from "../../interfaces/User";
import {Subject} from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class WebSocketService {
	private webSocket: WebSocket | undefined;
	private webSocketSubject$: Subject<any> = new Subject<any>();

	connect(url: string, user: PartialUser) {
		this.webSocket = new WebSocket(url);

		this.webSocket.onopen = () => {
			console.log('WebSocket connection established');
		};

		this.webSocket.onmessage = (event) => {
			const message = JSON.parse(event.data);
			this.webSocketSubject$.next(message);
		};

		this.webSocket.onclose = () => {
			console.log('WebSocket connection closed');
		};
	}

	getMessages() {
		return this.webSocketSubject$.asObservable();
	}

	sendMessage(message: any) {
		if (!this.webSocket) {
			throw new Error('WebSocket is not connected');
		}
		this.webSocket.send(JSON.stringify(message));
	}
}
