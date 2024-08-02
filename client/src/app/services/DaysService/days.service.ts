import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PartialDay} from "../../interfaces/Day";
import {API_URL} from "../../constants/constants";

@Injectable({
	providedIn: 'root'
})
export class DaysService {
	private apiUrl = `${API_URL}/days`;

	constructor(private http: HttpClient) {
	}

	getDays(month: Date, userId: number): Observable<PartialDay[]> {
		return this.http.post<PartialDay[]>(this.apiUrl, {month, userId});
	}
}
