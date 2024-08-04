import {Routes} from '@angular/router';
import {AuthGuard} from "./guards/auth.guard";

export const routes: Routes = [
	{
		path: '',
		loadComponent: () => import('./feature/calendar/index.component').then(mod => mod.IndexComponent),
		canActivate: [AuthGuard]
	},
	{
		path: 'events',
		loadComponent: () => import('./feature/events/index/index.component').then(mod => mod.IndexComponent),
		canActivate: [AuthGuard]
	},
	{
		path: 'events/add',
		loadComponent: () => import('./feature/events/create/create.component').then(mod => mod.CreateComponent),
		canActivate: [AuthGuard]
	},
	{
		path: 'login',
		loadComponent: () => import('./feature/login/login.component').then(mod => mod.LoginComponent)
	},
	{
		path: 'register',
		loadComponent: () => import('./feature/register/register.component').then(mod => mod.RegisterComponent)
	},
	{path: '**', redirectTo: ''}
];
