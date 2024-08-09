import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/AuthService/auth.service";
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs';
import {ErrorComponent} from "../../shared/error/error.component";
import {ErrorStateService} from "../../services/ErrorStateService/error-state.service";
import {InputComponent} from "../../shared/input/input.component";
import {ButtonComponent} from "../../shared/button/button.component";
import {FormComponent} from "../../shared/form/form.component";

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [
		ReactiveFormsModule,
		ErrorComponent,
		InputComponent,
		ButtonComponent,
		FormComponent
	],
	templateUrl: './login.component.html',
	styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
	emailCtrl: FormControl;
	passwordCtrl: FormControl;
	loginForm: FormGroup<{
		email: FormControl,
		password: FormControl
	}>;
	error: string | null = null;

	constructor(private router: Router, private fb: FormBuilder, private authService: AuthService, private errorStateService: ErrorStateService) {
		this.emailCtrl = this.fb.control('', [Validators.required, Validators.email]);
		this.passwordCtrl = this.fb.control('', Validators.required);

		this.loginForm = this.fb.group({
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
		this.authService.login(this.emailCtrl.value, this.passwordCtrl.value).pipe(
			catchError(error => {
				this.error = 'La connexion a échoué. Veuillez vérifier vos d\'identifiants et réessayer.';
				console.error('Login bis:', error);
				return of(null);
			})
		).subscribe({
			next: (response) => {
				if (response) {
					this.router.navigate(['/']);
				}
			},
			error: (error) => {
				this.error = 'La connexion a échoué. Veuillez vérifier vos d\'identifiants et réessayer.';
				console.log(this.error);
				console.error('Login error:', error);
			}
		});
	}

	onClickRegister() {
		this.router.navigate(['/register']);
	}
}
