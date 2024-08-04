import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {CookieService} from 'ngx-cookie-service';
import {API_PATH, API_URL} from '../../constants/constants';
import {PartialUser} from "../../interfaces/User";

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private apiUrl = `${API_URL}${API_PATH}/auth`;
	private tokenKey = 'authToken';
	private userKey = 'user';
	user: PartialUser | null = null;

	constructor(private http: HttpClient, private cookieService: CookieService) {
	}

	login(email: string, password: string): Observable<any> {
		return this.http.post<any>(`${this.apiUrl}/login`, {email, password}).pipe(
			tap(response => {
				if (response.token) {
					this.cookieService.set(this.tokenKey, response.token, {
						path: '/',
						secure: true,
						sameSite: 'Strict',
						expires: new Date(new Date().getTime() + 3600 * 1000)
					});
				}
				if (response.user) {
					const userJson = JSON.stringify(response.user);
					this.cookieService.set(this.userKey, userJson, {
						path: '/',
						secure: true,
						sameSite: 'Strict',
					});
					this.user = response.user;
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
		this.cookieService.delete(this.userKey, '/');
	}

	isAuthenticated(): boolean {
		return this.cookieService.check(this.tokenKey);
	}

	getToken(): string | null {
		return this.cookieService.get(this.tokenKey);
	}

	refreshToken(): Observable<any> {
		return this.http.post<any>(`${this.apiUrl}/refresh-token`, {}).pipe(
			tap((response) => {
				if (response.token) {
					this.cookieService.set(this.tokenKey, response.token, {
						path: '/',
						secure: true,
						sameSite: 'Strict',
						expires: new Date(new Date().getTime() + 3600 * 1000)
					});
				}
				if (response.token.userId) {
					this.user!.id = response.token.userId;
				}
			}),
			catchError(error => {
				console.error('Refresh token error:', error);
				return of({error: 'Refresh token failed. Please log in again.'});
			})
		);
	}

	getUser(): PartialUser | null {
		if (this.user === null) {
			const user = this.cookieService.get(this.userKey);
			if (user) {
				this.user = JSON.parse(user);
			} else {
				this.logout();
			}
		}
		return this.user;
	}
}
