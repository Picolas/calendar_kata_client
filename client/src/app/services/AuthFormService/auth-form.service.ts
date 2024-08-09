import {Injectable} from '@angular/core';
import {LoginDto} from "../../dtos/LoginDto";
import {AuthService} from "../AuthService/auth.service";
import {HotToastService} from "@ngxpert/hot-toast";
import {Observable, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {RegisterDto} from "../../dtos/RegisterDto";

@Injectable({
	providedIn: 'root'
})
export class AuthFormService {

	constructor(
		private authService: AuthService,
		private toast: HotToastService
	) {
	}

	login(loginDto: LoginDto): Observable<any> {
		return this.authService.login(loginDto.email, loginDto.password).pipe(
			tap(() => {
				this.toast.success('Connexion réussie');
			}),
			catchError(this.handleError)
		);
	}

	register(registerDto: RegisterDto): Observable<any> {
		return this.authService.register(registerDto.name, registerDto.email, registerDto.password).pipe(
			tap(() => {
				this.toast.success('Inscription réussie');
			}),
			catchError(this.handleError)
		);
	}

	private handleError(error: any): Observable<never> {
		console.error('Error in AuthFormService', error);
		this.toast.error(error.error.message || 'Une erreur est survenue');
		return throwError(() => error);
	}
}
