import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {PartialEvent} from "../../interfaces/Event";

@Injectable({
	providedIn: 'root'
})
export class EventPopupService {
	private isOpen$ = new BehaviorSubject<boolean>(false);
	private event$ = new BehaviorSubject<PartialEvent | null>(null);

	getIsOpen() {
		return this.isOpen$.asObservable();
	}

	setIsOpen(isOpen: boolean) {
		this.isOpen$.next(isOpen);
	}

	openModal() {
		this.setIsOpen(true);
	}

	closeModal() {
		this.setIsOpen(false);
	}

	getEvent() {
		return this.event$.asObservable();
	}

	setEvent(event: PartialEvent | null) {
		this.event$.next(event);
	}
}
