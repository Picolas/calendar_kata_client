import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {CookieService} from 'ngx-cookie-service';
import {API_URL} from '../../constants/constants';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private apiUrl = `${API_URL}/auth`;
	private tokenKey = 'authToken';

	constructor(private http: HttpClient, private cookieService: CookieService) {
	}

	login(email: string, password: string): Observable<any> {
		return this.http.post<any>(`${this.apiUrl}/login`, {email, password}).pipe(
			tap(response => {
				if (response.token.token) {
					this.cookieService.set(this.tokenKey, response.token.token, {
						path: '/',
						secure: true,
						sameSite: 'Strict',
						expires: new Date(new Date().getTime() + 3600 * 1000)
					});
				}
			}),
			catchError(error => {
				console.error('Login error:', error);
				return of({error: 'Login failed. Please check your credentials and try again.'});
			})
		);
	}

	register(name: string, email: string, password: string): Observable<any> {
		return this.http.post<any>(`${this.apiUrl}/register`, {name, email, password}).pipe(
			tap(response => {
				if (response.token) {
					this.cookieService.set(this.tokenKey, response.token, {
						path: '/',
						secure: true,
						sameSite: 'Strict',
						expires: new Date(new Date().getTime() + 3600 * 1000)
					});
				}
			}),
			catchError(error => {
				console.error('Registration error:', error);
				return of({error: 'Registration failed. Please check your details and try again.'});
			})
		);
	}

	logout(): void {
		this.cookieService.delete(this.tokenKey, '/');
	}

	isAuthenticated(): boolean {
		return this.cookieService.check(this.tokenKey);
	}

	getToken(): string | null {
		return this.cookieService.get(this.tokenKey);
	}

	refreshToken(): Observable<any> {
		return this.http.post<any>(`${this.apiUrl}/refresh-token`, {}).pipe(
			tap(response => {
				if (response.token.token) {
					this.cookieService.set(this.tokenKey, response.token.token, {
						path: '/',
						secure: true,
						sameSite: 'Strict',
						expires: new Date(new Date().getTime() + 3600 * 1000)
					});
				}
			}),
			catchError(error => {
				console.error('Refresh token error:', error);
				return of({error: 'Refresh token failed. Please log in again.'});
			})
		);
	}
}
