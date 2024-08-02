import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/AuthService/auth.service";
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [
		ReactiveFormsModule
	],
	templateUrl: './login.component.html',
	styleUrl: './login.component.css'
})
export class LoginComponent {
	emailCtrl: FormControl;
	passwordCtrl: FormControl;
	loginForm: FormGroup<{
		email: FormControl,
		password: FormControl
	}>;
	errorMessage: string | null = null;

	constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) {
		this.emailCtrl = this.fb.control('', [Validators.required, Validators.email]);
		this.passwordCtrl = this.fb.control('', Validators.required);

		this.loginForm = this.fb.group({
			email: this.emailCtrl,
			password: this.passwordCtrl
		});
	}

	onSubmit() {
		this.authService.login(this.emailCtrl.value, this.passwordCtrl.value).pipe(
			catchError(error => {
				this.errorMessage = 'Login failed. Please check your credentials and try again.';
				console.error('Login error:', error);
				return of(null);
			})
		).subscribe({
			next: (response) => {
				if (response) {
					this.router.navigate(['/']);
				}
			},
			error: (error) => {
				console.error('Login error:', error);
			}
		});
	}

	onClickRegister() {
		this.router.navigate(['/register']);
	}
}
