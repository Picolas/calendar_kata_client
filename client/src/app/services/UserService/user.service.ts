import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PartialUser} from '../../interfaces/User';
import {API_PATH, API_URL} from "../../constants/constants";

@Injectable({
	providedIn: 'root'
})
export class UserService {
	private apiUrl = `${API_URL}${API_PATH}/users`;

	constructor(private http: HttpClient) {
	}

	searchUsers(query: string): Observable<PartialUser[]> {
		return this.http.get<PartialUser[]>(`${this.apiUrl}/search?q=${query}`);
	}
}
