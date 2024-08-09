import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ErrorComponent} from "../../shared/error/error.component";
import {ErrorStateService} from "../../services/ErrorStateService/error-state.service";
import {ButtonComponent} from "../../shared/button/button.component";
import {InputComponent} from "../../shared/input/input.component";
import {FormComponent} from "../../shared/form/form.component";
import {AuthMapper} from "../../mappers/AuthMapper";
import {AuthFormService} from "../../services/AuthFormService/auth-form.service";

@Component({
	selector: 'app-register',
	standalone: true,
	imports: [
		FormsModule,
		ReactiveFormsModule,
		ErrorComponent,
		ButtonComponent,
		InputComponent,
		FormComponent
	],
	templateUrl: './register.component.html',
	styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
	registerForm: FormGroup;
	error: string | null = null;

	constructor(private router: Router, private fb: FormBuilder, private authFormService: AuthFormService, private errorStateService: ErrorStateService) {
		this.registerForm = this.fb.group({
			name: this.fb.control('', Validators.required),
			email: this.fb.control('', [Validators.required, Validators.email]),
			password: this.fb.control('', Validators.required)
		});
	}

	ngOnInit() {
		this.errorStateService.getError().subscribe((error: any) => {
			this.error = error;
		});
	}

	onSubmit() {
		if (this.registerForm.invalid) {
			return;
		}
		const registerDto = AuthMapper.toRegisterDto(this.registerForm.value);
		this.authFormService.register(registerDto).subscribe({
			next: () => {
				this.router.navigate(['/']);
			},
			error: (error) => {
				this.error = error.error.message || 'L\'inscription a échoué. Veuillez vérifier vos identifiants et réessayer.';
			}
		});
	}

	onClickLogin() {
		this.router.navigate(['/login']);
	}
}
