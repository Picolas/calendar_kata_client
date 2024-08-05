import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class ErrorStateService {
	error$ = new BehaviorSubject<string | null>(null);

	getError() {
		return this.error$.asObservable();
	}

	setError(error: string | null) {
		this.error$.next(error);
	}
}
