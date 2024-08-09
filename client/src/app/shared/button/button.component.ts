import {booleanAttribute, Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
	selector: 'app-button',
	standalone: true,
	imports: [
		NgClass
	],
	templateUrl: './button.component.html',
	styleUrl: './button.component.css'
})
export class ButtonComponent {
	@Input() type: 'button' | 'submit' | 'reset' = 'button';
	@Input() disabled: boolean = false;
	@Input() class: string = '';
	@Input() text: string = '';
	@Input({transform: booleanAttribute}) useDefaultClasses: boolean = true;
	@Output() onClick = new EventEmitter<void>();

	defaultClasses: string = 'text-slate-50 py-0.5 px-2 bg-slate-800 hover:bg-slate-700 rounded-md cursor-pointer';

	handleClick() {
		this.onClick.emit();
	}
}
