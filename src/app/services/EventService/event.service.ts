import {Injectable} from '@angular/core';
import {API_URL} from "../../constants/constants";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PartialEvent} from "../../interfaces/Event";

@Injectable({
	providedIn: 'root'
})
export class EventService {
	private apiUrl = `${API_URL}/events`;

	constructor(private http: HttpClient) {
	}

	getEvents(userId: number): Observable<any> {
		return this.http.get(`${this.apiUrl}/${userId}`);
	}

	getEvent(eventId: number): Observable<any> {
		return this.http.get(`${this.apiUrl}/event/${eventId}`);
	}

	getEventsOnInterval(startDate: string, endDate: string): Observable<any> {
		return this.http.get(`${this.apiUrl}/interval/${startDate}/${endDate}`);
	}

	getUserEventsOfDay(userId: number, day: string): Observable<any> {
		return this.http.get(`${this.apiUrl}/user/${userId}/${day}`);
	}

	createEvent(event: PartialEvent): Observable<any> {
		return this.http.post(`${this.apiUrl}`, event);
	}

	updateEvent(event: PartialEvent): Observable<any> {
		return this.http.put(`${this.apiUrl}/${event.id}`, event);
	}

	deleteEvent(eventId: number): Observable<any> {
		return this.http.delete(`${this.apiUrl}/${eventId}`);
	}
}
