import {Injectable} from '@angular/core';
import {Observable, throwError} from "rxjs";
import {CreateEventDto} from "../../dtos/CreateEventDto";
import {UpdateEventDto} from "../../dtos/UpdateEventDto";
import {EventService} from "../EventService/event.service";
import {HotToastService} from "@ngxpert/hot-toast";
import {catchError, tap} from "rxjs/operators";

@Injectable({
	providedIn: 'root'
})
export class EventFormService {
	constructor(
		private eventService: EventService,
		private toast: HotToastService
	) {
	}

	createEvent(event: CreateEventDto): Observable<any> {
		return this.eventService.createEvent(event).pipe(
			tap(() => {
				this.toast.success(`L'événement ${event.title} a bien été créé`);
			}),
			catchError(this.handleError)
		);
	}

	updateEvent(id: number, event: UpdateEventDto): Observable<any> {
		return this.eventService.updateEvent(id, event).pipe(
			tap(() => {
				this.toast.success(`L'événement ${event.title} a bien été mis à jour`);
			}),
			catchError(this.handleError)
		);
	}

	deleteEvent(id: number): Observable<any> {
		return this.eventService.deleteEvent(id).pipe(
			tap(() => {
				this.toast.success(`L'événement a bien été supprimé`);
			}),
			catchError(this.handleError)
		);
	}

	private handleError(error: any): Observable<never> {
		console.error('Error in EventFormService', error);
		this.toast.error(error.error.message || 'Une erreur est survenue');
		return throwError(() => error);
	}
}
