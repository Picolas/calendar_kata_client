import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/AuthService/auth.service";
import {catchError, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {ErrorComponent} from "../../shared/error/error.component";
import {ErrorStateService} from "../../services/ErrorStateService/error-state.service";

@Component({
	selector: 'app-register',
	standalone: true,
	imports: [
		FormsModule,
		ReactiveFormsModule,
		ErrorComponent
	],
	templateUrl: './register.component.html',
	styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
	nameCtrl: FormControl;
	emailCtrl: FormControl;
	passwordCtrl: FormControl;
	registerForm: FormGroup<{
		name: FormControl,
		email: FormControl,
		password: FormControl
	}>;
	error: string | null = null;

	constructor(private router: Router, private fb: FormBuilder, private authService: AuthService, private errorStateService: ErrorStateService) {
		this.nameCtrl = this.fb.control('', Validators.required);
		this.emailCtrl = this.fb.control('', [Validators.required, Validators.email]);
		this.passwordCtrl = this.fb.control('', Validators.required);

		this.registerForm = this.fb.group({
			name: this.nameCtrl,
			email: this.emailCtrl,
			password: this.passwordCtrl
		});
	}

	ngOnInit() {
		this.errorStateService.getError().subscribe((error: any) => {
			this.error = error;
		});
	}

	onSubmit() {
		this.authService.register(this.nameCtrl.value, this.emailCtrl.value, this.passwordCtrl.value).pipe(
			catchError(error => {
				this.errorStateService.setError(error.error.message);
				console.error('Registration error:', error);
				return of(null);
			}),
			switchMap(response => {
				if (response.error) {
					this.errorStateService.setError(response.error);
					return of(null);
				} else {
					if (response) {
						return this.authService.login(this.emailCtrl.value, this.passwordCtrl.value);
					}
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
				this.errorStateService.setError('Erreur lors de l\'inscription.');
			}
		});
	}

	onClickLogin() {
		this.router.navigate(['/login']);
	}
}
