import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/AuthService/auth.service";
import {catchError, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Component({
	selector: 'app-register',
	standalone: true,
	imports: [
		FormsModule,
		ReactiveFormsModule
	],
	templateUrl: './register.component.html',
	styleUrl: './register.component.css'
})
export class RegisterComponent {
	nameCtrl: FormControl;
	emailCtrl: FormControl;
	passwordCtrl: FormControl;
	registerForm: FormGroup<{
		name: FormControl,
		email: FormControl,
		password: FormControl
	}>;
	errorMessage: string | null = null;

	constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) {
		this.nameCtrl = this.fb.control('', Validators.required);
		this.emailCtrl = this.fb.control('', [Validators.required, Validators.email]);
		this.passwordCtrl = this.fb.control('', Validators.required);

		this.registerForm = this.fb.group({
			name: this.nameCtrl,
			email: this.emailCtrl,
			password: this.passwordCtrl
		});
	}

	onSubmit() {
		this.authService.register(this.nameCtrl.value, this.emailCtrl.value, this.passwordCtrl.value).pipe(
			catchError(error => {
				this.errorMessage = 'Registration failed. Please check your credentials and try again.';
				console.error('Registration error:', error);
				return of(null);
			}),
			switchMap(response => {
				if (response) {
					return this.authService.login(this.emailCtrl.value, this.passwordCtrl.value);
				}
				return of(null);
			})
		).subscribe({
			next: (response) => {
				if (response) {
					this.router.navigate(['/']);
				}
			},
			error: (error) => {
				console.error('Registration error:', error);
			}
		});
	}

	onClickLogin() {
		this.router.navigate(['/login']);
	}
}
