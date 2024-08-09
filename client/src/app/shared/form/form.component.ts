import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
	selector: 'app-form',
	standalone: true,
	imports: [
		ReactiveFormsModule
	],
	templateUrl: './form.component.html',
	styleUrl: './form.component.css'
})
export class FormComponent {
	@Input() formGroup!: FormGroup;
	@Output() submitForm = new EventEmitter<void>();

	onSubmit() {
		if (!this.formGroup.valid) {
			return;
		}
		this.submitForm.emit();
	}
}
