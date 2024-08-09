import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ErrorComponent} from "../../shared/error/error.component";
import {ErrorStateService} from "../../services/ErrorStateService/error-state.service";
import {InputComponent} from "../../shared/input/input.component";
import {ButtonComponent} from "../../shared/button/button.component";
import {FormComponent} from "../../shared/form/form.component";
import {AuthMapper} from "../../mappers/AuthMapper";
import {AuthFormService} from "../../services/AuthFormService/auth-form.service";

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
	loginForm: FormGroup;
	error: string | null = null;

	constructor(private router: Router, private fb: FormBuilder, private authFormService: AuthFormService, private errorStateService: ErrorStateService) {
		this.loginForm = this.fb.group({
			email: this.fb.control('', [Validators.required, Validators.email]),
			password: this.fb.control('', Validators.required),
		});
	}

	ngOnInit() {
		this.errorStateService.getError().subscribe((error: any) => {
			this.error = error;
		});
	}

	onSubmit() {
		if (this.loginForm.invalid) {
			return;
		}
		const loginDto = AuthMapper.toLoginDto(this.loginForm.value);
		this.authFormService.login(loginDto).subscribe({
			next: () => {
				this.router.navigate(['/']);
			},
			error: (error) => {
				this.error = error.error.message || 'La connexion a échoué. Veuillez vérifier vos identifiants et réessayer.';
			}
		});
	}

	onClickRegister() {
		this.router.navigate(['/register']);
	}
}
