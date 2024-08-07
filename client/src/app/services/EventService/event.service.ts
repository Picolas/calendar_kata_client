import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_PATH, API_URL} from '../../constants/constants';
import {UpdateEventDto} from '../../dtos/UpdateEventDto';
import {CreateEventDto} from "../../dtos/CreateEventDto";
import {PartialEvent} from "../../interfaces/Event";

@Injectable({
	providedIn: 'root'
})
export class EventService {
	private apiUrl = `${API_URL}${API_PATH}/events`;

	constructor(private http: HttpClient) {
	}

	createEvent(createEventDto: CreateEventDto): Observable<PartialEvent> {
		return this.http.post<PartialEvent>(this.apiUrl, createEventDto);
	}

	getEvents(): Observable<PartialEvent[]> {
		return this.http.get<PartialEvent[]>(this.apiUrl, {});
	}

	updateEvent(id: number, updateEventDto: UpdateEventDto): Observable<PartialEvent> {
		console.log('updateEventDto', updateEventDto);
		return this.http.put<PartialEvent>(`${this.apiUrl}/${id}`, updateEventDto);
	}

	deleteEvent(id: number): Observable<void> {
		return this.http.delete<void>(`${this.apiUrl}/${id}`);
	}
}
