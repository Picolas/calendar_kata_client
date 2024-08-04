import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";

import {routes} from './app.routes';
import {authInterceptor} from "./interceptors/AuthInterceptor/auth.interceptor";
import {provideHotToastConfig} from "@ngxpert/hot-toast";

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({eventCoalescing: true}),
		provideRouter(routes),
		provideHttpClient(
			withInterceptors([
				authInterceptor
			])
		),
		provideHotToastConfig({
			duration: 4000,
			autoClose: true,
			position: 'top-right',
		}),
		CookieService,
	]
};
