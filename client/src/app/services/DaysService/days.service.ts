import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PartialDay} from "../../interfaces/Day";
import {API_PATH, API_URL} from "../../constants/constants";
import {GetDaysDto} from "../../dtos/GetDaysDto";

@Injectable({
	providedIn: 'root'
})
export class DaysService {
	private apiUrl = `${API_URL}${API_PATH}/days`;

	constructor(private http: HttpClient) {
	}

	getDays(month: Date, userId: number): Observable<{ days: PartialDay[] }> {
		const getDaysDto = new GetDaysDto(month, userId);
		return this.http.post<{ days: PartialDay[] }>(this.apiUrl, getDaysDto);
	}
}
