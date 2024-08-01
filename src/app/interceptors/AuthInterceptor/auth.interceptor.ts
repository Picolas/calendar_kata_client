import {HttpHandlerFn, HttpRequest} from '@angular/common/http';
import {AuthService} from "../../services/AuthService/auth.service";
import {inject} from "@angular/core";
import {throwError} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
	const authService = inject(AuthService);
	const authToken = authService.getToken();
	let cloned = req;

	if (authToken) {
		cloned = req.clone({
			setHeaders: {
				Authorization: `Bearer ${authToken}`
			}
		});
	}

	return next(cloned).pipe(
		catchError(error => {
			if (error.status === 401) {
				return authService.refreshToken().pipe(
					switchMap(() => {
						const newToken = authService.getToken();
						cloned = req.clone({
							setHeaders: {
								Authorization: `Bearer ${newToken}`
							}
						});
						return next(cloned);
					})
				);
			}
			return throwError(error);
		})
	);
};
