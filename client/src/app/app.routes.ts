import {Routes} from '@angular/router';
import {IndexComponent} from "./feature/calendar/index.component";
import {LoginComponent} from "./feature/login/login.component";
import {RegisterComponent} from "./feature/register/register.component";
import {AuthGuard} from "./guards/auth.guard";

export const routes: Routes = [
	{path: '', component: IndexComponent, canActivate: [AuthGuard]},
	{path: 'login', component: LoginComponent},
	{path: 'register', component: RegisterComponent},
	{path: '**', redirectTo: ''}
];
