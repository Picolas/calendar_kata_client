import {Component, Input, Optional, Self} from '@angular/core';
import {ControlValueAccessor, NgControl} from "@angular/forms";

@Component({
	selector: 'app-input',
	standalone: true,
	imports: [],
	templateUrl: './input.component.html',
	styleUrl: './input.component.css'
})
export class InputComponent implements ControlValueAccessor {
	@Input() label: string = '';
	@Input() type: string = 'text';
	@Input() placeholder: string = '';
	@Input() id: string = '';
	@Input() required: boolean = false;

	value: string = '';
	isDisabled: boolean = false;

	constructor(@Optional() @Self() public ngControl: NgControl) {
		if (this.ngControl) {
			this.ngControl.valueAccessor = this;
		}
	}

	onChange: any = () => {
	};
	onTouch: any = () => {
	};

	writeValue(value: string): void {
		this.value = value;
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouch = fn;
	}

	setDisabledState(isDisabled: boolean): void {
		this.isDisabled = isDisabled;
	}

	onInputChange(event: Event): void {
		const value = (event.target as HTMLInputElement).value;
		this.onChange(value);
		this.onTouch();
	}

	get invalid(): boolean {
		return this.ngControl ? this.ngControl.invalid! : false;
	}

	get showError(): boolean {
		if (!this.ngControl) {
			return false;
		}
		const {dirty, touched} = this.ngControl;
		return this.invalid ? (dirty! || touched!) : false;
	}

	get errors(): string[] {
		if (!this.ngControl || !this.ngControl.errors) {
			return [];
		}
		return Object.keys(this.ngControl.errors).map(key => {
			switch (key) {
				case 'required':
					return 'Ce champ est requis.';
				case 'email':
					return 'Veuillez entrer une adresse email valide.';
				default:
					return `Erreur de validation : ${key}`;
			}
		});
	}
}
