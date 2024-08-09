import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {PartialEvent} from '../../interfaces/Event';
import {UpdateEventDto} from '../../dtos/UpdateEventDto';
import {InputComponent} from "../input/input.component";
import {FormComponent} from "../form/form.component";
import {ButtonComponent} from "../button/button.component";
import {EventMapper} from "../../mappers/EventMapper";
import {dateOrderValidator} from "../../validators/date-order.validator";

@Component({
	selector: 'app-edit-event',
	standalone: true,
	imports: [ReactiveFormsModule, InputComponent, FormComponent, ButtonComponent],
	templateUrl: './edit-event.component.html',
	styleUrl: './edit-event.component.css'
})
export class EditEventComponent implements OnInit {
	@Input() event: PartialEvent | null = null;
	@Output() onSubmit = new EventEmitter<UpdateEventDto>();

	eventForm: FormGroup;

	constructor(private fb: FormBuilder) {
		this.eventForm = this.fb.group({
			title: ['', Validators.required],
			description: ['', Validators.required],
			startDate: ['', Validators.required],
			endDate: ['', Validators.required],
			inUser: this.fb.array([])
		}, {validators: dateOrderValidator()});
	}

	ngOnInit() {
		if (this.event) {
			const startDate = new Date(this.event.startDate!);
			const endDate = new Date(this.event.endDate!);

			this.eventForm.patchValue({
				title: this.event.title,
				description: this.event.description,
				startDate: startDate.toISOString().substring(0, 16),
				endDate: endDate.toISOString().substring(0, 16)
			});

			this.event.inUser?.forEach(user => this.inUser.push(this.fb.control(user.email)));
		}
	}

	get inUser() {
		return this.eventForm.get('inUser') as FormArray;
	}

	addParticipant() {
		this.inUser.push(this.fb.control('', [Validators.required, Validators.email]));
	}

	removeParticipant(index: number) {
		this.inUser.removeAt(index);
	}

	onSubmitForm() {
		if (this.eventForm.invalid) {
			return;
		}

		const updatedEventDto = EventMapper.toUpdateDto(this.eventForm.value);
		this.onSubmit.emit(updatedEventDto);
	}
}
